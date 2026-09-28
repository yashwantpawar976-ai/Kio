export type OutputMime = "image/jpeg" | "image/webp";

export type CompressResult = {
  blob: Blob;
  width: number;
  height: number;
  outWidth: number;
  outHeight: number;
  quality: number;
  keptOriginal: boolean;
  note?: string;
};

const IMAGE_EXTS = new Set([
  "png",
  "jpg",
  "jpeg",
  "jpe",
  "jfif",
  "webp",
  "gif",
  "bmp",
  "svg",
  "avif",
  "tif",
  "tiff",
  "heic",
  "heif",
  "ico",
]);

const MAX_PIXELS = 16_000_000;
const MIN_EDGE = 32;
const QUALITY_ITERS = 8;

export function isProbablyImage(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTS.has(ext);
}

function safeBaseName(originalName: string): string {
  return (
    originalName
      .replace(/\.[^.]+$/, "")
      .replace(/[^\w.\-()[\] ]+/g, "")
      .trim() || "image"
  );
}

export function resultFileName(
  originalName: string,
  mime: string,
  bytes: number,
  keptOriginal = false,
): string {
  const base = safeBaseName(originalName);
  const kb = Math.max(1, Math.round(bytes / 1000));
  if (keptOriginal) {
    const ext = originalName.split(".").pop()?.toLowerCase() || "jpg";
    return `${base}-${kb}kb.${ext}`;
  }
  const ext = mime === "image/webp" ? "webp" : "jpg";
  return `${base}-${kb}kb.${ext}`;
}

type Source = { width: number; height: number; draw: CanvasImageSource };

async function loadSource(file: File): Promise<Source> {
  try {
    const bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    } as ImageBitmapOptions);
    return {
      width: bitmap.width,
      height: bitmap.height,
      draw: bitmap,
    };
  } catch {
    const img = await loadHtmlImage(file);
    return { width: img.naturalWidth, height: img.naturalHeight, draw: img };
  }
}

function loadHtmlImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (!img.naturalWidth) {
        reject(new Error("Could not read this image."));
        return;
      }
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(
        new Error(
          "This file isn’t a readable image in this browser. Try PNG, JPG, or WebP.",
        ),
      );
    };
    img.src = url;
  });
}

function capDimensions(
  width: number,
  height: number,
): { width: number; height: number } {
  const pixels = width * height;
  if (pixels <= MAX_PIXELS) return { width, height };
  const scale = Math.sqrt(MAX_PIXELS / pixels);
  return {
    width: Math.max(MIN_EDGE, Math.round(width * scale)),
    height: Math.max(MIN_EDGE, Math.round(height * scale)),
  };
}

function encodeCanvas(
  canvas: HTMLCanvasElement,
  mime: OutputMime,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not encode this image."));
          return;
        }
        resolve(blob);
      },
      mime,
      quality,
    );
  });
}

function drawToCanvas(
  source: Source,
  width: number,
  height: number,
  mime: OutputMime,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: mime === "image/webp" });
  if (!ctx) throw new Error("Canvas is not available in this browser.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (mime === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(source.draw, 0, 0, width, height);
  return canvas;
}

function guessScale(originalBytes: number, targetBytes: number): number {
  if (originalBytes <= targetBytes * 1.15) return 1;
  const ratio = targetBytes / originalBytes;
  return Math.min(1, Math.max(0.12, Math.sqrt(ratio) * 1.4));
}

async function probeWebp(): Promise<boolean> {
  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 2;
  try {
    const blob = await encodeCanvas(canvas, "image/webp", 0.8);
    return blob.type === "image/webp" && blob.size > 0;
  } catch {
    return false;
  }
}

let webpSupported: boolean | null = null;

export async function supportsWebp(): Promise<boolean> {
  if (webpSupported === null) webpSupported = await probeWebp();
  return webpSupported;
}

export async function compressToTarget(
  file: File,
  targetBytes: number,
  mime: OutputMime,
): Promise<CompressResult> {
  const source = await loadSource(file);
  const width = source.width;
  const height = source.height;
  if (!width || !height) {
    throw new Error("This image has no dimensions.");
  }

  const sameFamily =
    (mime === "image/jpeg" && /jpe?g/i.test(file.type || file.name)) ||
    (mime === "image/webp" &&
      (file.type === "image/webp" || /\.webp$/i.test(file.name)));

  if (file.size <= targetBytes && sameFamily) {
    if (source.draw instanceof ImageBitmap) source.draw.close();
    return {
      blob: file,
      width,
      height,
      outWidth: width,
      outHeight: height,
      quality: 1,
      keptOriginal: true,
      note: "Already within the target size.",
    };
  }

  if (mime === "image/webp" && !(await supportsWebp())) {
    mime = "image/jpeg";
  }

  const capped = capDimensions(width, height);
  let scale = guessScale(file.size, targetBytes);
  let w = Math.max(MIN_EDGE, Math.round(capped.width * scale));
  let h = Math.max(MIN_EDGE, Math.round(capped.height * scale));

  let best: { blob: Blob; w: number; h: number; q: number } | null = null;

  for (let attempt = 0; attempt < 10; attempt++) {
    const canvas = drawToCanvas(source, w, h, mime);
    let lo = 0.08;
    let hi = 0.92;
    let localBest: { blob: Blob; q: number } | null = null;

    for (let i = 0; i < QUALITY_ITERS; i++) {
      const q = i === 0 ? 0.78 : (lo + hi) / 2;
      const blob = await encodeCanvas(canvas, mime, q);
      if (blob.size <= targetBytes) {
        localBest = { blob, q };
        lo = q;
      } else {
        hi = q;
      }
    }

    if (!localBest) {
      const floor = await encodeCanvas(canvas, mime, 0.08);
      if (floor.size <= targetBytes) localBest = { blob: floor, q: 0.08 };
    }

    if (localBest) {
      best = { blob: localBest.blob, w, h, q: localBest.q };
      const headroom = targetBytes - localBest.blob.size;
      if (headroom < targetBytes * 0.12 || scale >= 0.999) break;
      const bump = Math.min(1, scale * 1.12);
      if (bump <= scale + 0.01) break;
      scale = bump;
      w = Math.max(MIN_EDGE, Math.round(capped.width * scale));
      h = Math.max(MIN_EDGE, Math.round(capped.height * scale));
      continue;
    }

    scale *= 0.82;
    w = Math.max(MIN_EDGE, Math.round(capped.width * scale));
    h = Math.max(MIN_EDGE, Math.round(capped.height * scale));
    if (w <= MIN_EDGE && h <= MIN_EDGE) {
      const canvasTiny = drawToCanvas(source, MIN_EDGE, MIN_EDGE, mime);
      const tiny = await encodeCanvas(canvasTiny, mime, 0.08);
      best = { blob: tiny, w: MIN_EDGE, h: MIN_EDGE, q: 0.08 };
      break;
    }
  }

  if (source.draw instanceof ImageBitmap) source.draw.close();

  if (!best) {
    throw new Error("Could not compress this image to the target size.");
  }

  const note =
    file.type === "image/gif"
      ? "Animated GIFs become a still frame."
      : best.blob.size > targetBytes
        ? "Closest size — this image could not fit under the target."
        : undefined;

  return {
    blob: best.blob,
    width,
    height,
    outWidth: best.w,
    outHeight: best.h,
    quality: best.q,
    keptOriginal: false,
    note,
  };
}
