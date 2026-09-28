import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as ImagePlus, i as LoaderCircle, n as TriangleAlert, o as Download, r as Shield, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cb1i2s5C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium select-none transition-[opacity,transform,box-shadow,background-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface-2 text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "text-muted hover:bg-surface-2 hover:text-fg",
			danger: "bg-danger/15 text-danger hover:bg-danger/25"
		},
		size: {
			sm: "h-9 rounded-[var(--radius-xs)] px-3 text-sm",
			md: "h-11 rounded-[var(--radius-sm)] px-4 text-sm",
			lg: "h-12 rounded-[var(--radius-md)] px-5 text-base",
			icon: "size-11 rounded-[var(--radius-sm)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function DropZone({ disabled, onFiles }) {
	const [over, setOver] = (0, import_react.useState)(false);
	const take = (0, import_react.useCallback)((list) => {
		if (!list) return;
		const files = Array.from(list);
		if (files.length) onFiles(files);
	}, [onFiles]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("relative flex min-h-52 cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-xl)] px-6 py-10 text-center shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]", over ? "bg-surface-2 shadow-[var(--shadow-border-hover)]" : "bg-surface", disabled && "pointer-events-none opacity-50"),
		onDragEnter: (e) => {
			e.preventDefault();
			setOver(true);
		},
		onDragOver: (e) => {
			e.preventDefault();
			setOver(true);
		},
		onDragLeave: () => setOver(false),
		onDrop: (e) => {
			e.preventDefault();
			setOver(false);
			take(e.dataTransfer.files);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/*,.heic,.heif,.avif,.svg,.tif,.tiff",
				multiple: true,
				className: "sr-only",
				disabled,
				onChange: (e) => {
					take(e.target.files);
					e.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-12 items-center justify-center rounded-[var(--radius-md)] bg-surface-2 text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {
					className: "size-5",
					strokeWidth: 1.6,
					"aria-hidden": true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base font-medium text-fg",
				children: over ? "Drop to compress" : "Drop images here"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "max-w-xs text-sm leading-relaxed text-muted",
				children: "PNG, JPG, WebP, GIF, SVG, or BMP. Paste with Ctrl+V. Nothing is uploaded."
			})
		]
	});
}
/** SI kilobyte — matches typical upload caps that say "100 KB". */
var BYTES_PER_KB = 1e3;
function kbToBytes(kb) {
	return Math.round(kb * BYTES_PER_KB);
}
function formatBytes(bytes) {
	if (bytes < 1e3) return `${bytes} B`;
	if (bytes < 1e6) {
		const kb = bytes / 1e3;
		return kb < 10 ? `${kb.toFixed(1)} KB` : `${Math.round(kb)} KB`;
	}
	const mb = bytes / 1e6;
	return mb < 10 ? `${mb.toFixed(2)} MB` : `${mb.toFixed(1)} MB`;
}
function formatPixels(width, height) {
	return `${width}×${height}`;
}
function percentSaved(original, result) {
	if (original <= 0 || result >= original) return "0%";
	return `${Math.round((1 - result / original) * 100)}%`;
}
function JobCard({ job, targetKb, onDownload, onRemove }) {
	const target = kbToBytes(targetKb);
	const result = job.resultBytes ?? 0;
	const ratio = job.status === "done" ? Math.min(1, result / target) : 0;
	const over = job.status === "done" && result > target;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
					src: job.resultUrl ?? job.previewUrl,
					alt: ""
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "min-w-0 flex-1 truncate text-sm font-medium text-fg",
								children: job.resultName ?? job.file.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "relative -mr-1 -mt-1 size-9 shrink-0 text-subtle after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 hover:text-fg",
								"aria-label": `Remove ${job.file.name}`,
								onClick: () => onRemove(job.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									className: "mx-auto size-4",
									strokeWidth: 1.75
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 font-mono text-xs text-muted tabular-nums",
							children: [
								job.status === "working" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "kilo-working inline-flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }), "Compressing"]
								}),
								job.status === "queued" && "Waiting",
								job.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 text-danger",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3" }), "Failed"]
								}),
								job.status === "done" && job.resultBytes != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									formatBytes(job.originalBytes),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-subtle",
										children: " → "
									}),
									formatBytes(job.resultBytes),
									job.resultBytes < job.originalBytes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-ok",
										children: [
											" ",
											"−",
											percentSaved(job.originalBytes, job.resultBytes)
										]
									})
								] })
							]
						}),
						job.status === "done" && job.outWidth && job.outHeight ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 font-mono text-xs text-subtle tabular-nums",
							children: [formatPixels(job.width ?? 0, job.height ?? 0), job.outWidth !== job.width || job.outHeight !== job.height ? ` → ${formatPixels(job.outWidth, job.outHeight)}` : null]
						}) : null
					]
				})]
			}),
			job.status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 overflow-hidden rounded-full bg-surface-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full rounded-full", over ? "bg-warn" : "bg-ok"),
						style: { width: `${Math.max(6, ratio * 100)}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: job.note ?? (over ? "Over target — this is the smallest encode" : `Fits ${targetKb} KB`)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => onDownload(job),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							className: "size-3.5",
							strokeWidth: 1.8
						}), "Save"]
					})]
				})]
			}) : null,
			job.status === "error" && job.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-danger",
				children: job.error
			}) : null
		]
	});
}
function Thumb({ src, alt }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "size-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-surface-2",
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: "size-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-full bg-surface-2" })
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-11 w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-surface-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, {
			className: "block size-5 rounded-full bg-fg shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
			"aria-label": "Target size"
		})]
	});
}
var PRESETS = [
	50,
	100,
	200,
	500
];
function TargetControl({ kb, onKb, onKbCommit, mime, onMime, webpOk }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-5xl leading-none tracking-tight text-fg tabular-nums sm:text-6xl",
					children: [kb, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 font-sans text-lg font-medium text-muted",
						children: "KB"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pb-1 font-mono text-xs text-subtle tabular-nums",
					children: formatBytes(kbToBytes(kb))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				className: "mt-5",
				min: 20,
				max: 500,
				step: 5,
				value: [kb],
				onValueChange: (v) => onKb(v[0] ?? 100),
				onValueCommit: (v) => onKbCommit(v[0] ?? 100)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						onKb(preset);
						onKbCommit(preset);
					},
					className: cn("h-9 rounded-full px-3.5 text-sm font-medium transition-[background-color,color] duration-150", preset === kb ? "bg-accent text-accent-fg" : "bg-surface-2 text-muted hover:text-fg"),
					children: [preset, " KB"]
				}, preset))
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs font-medium tracking-wide text-subtle uppercase",
			children: "Output"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatButton, {
				active: mime === "image/jpeg",
				label: "JPEG",
				hint: "Works everywhere",
				onClick: () => onMime("image/jpeg")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatButton, {
				active: mime === "image/webp",
				label: "WebP",
				hint: webpOk ? "Smaller files" : "Not supported",
				disabled: !webpOk,
				onClick: () => onMime("image/webp")
			})]
		})] })]
	});
}
function FormatButton({ active, label, hint, disabled, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled,
		onClick,
		className: cn("flex h-14 flex-col items-start justify-center rounded-[var(--radius-md)] px-4 text-left transition-[box-shadow,background-color] duration-150 disabled:opacity-40", active ? "bg-surface-2 shadow-[var(--shadow-border-hover)]" : "bg-surface shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-fg",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted",
			children: hint
		})]
	});
}
var IMAGE_EXTS = /* @__PURE__ */ new Set([
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
	"ico"
]);
var MAX_PIXELS = 16e6;
var MIN_EDGE = 32;
var QUALITY_ITERS = 8;
function isProbablyImage(file) {
	if (file.type.startsWith("image/")) return true;
	const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
	return IMAGE_EXTS.has(ext);
}
function safeBaseName(originalName) {
	return originalName.replace(/\.[^.]+$/, "").replace(/[^\w.\-()[\] ]+/g, "").trim() || "image";
}
function resultFileName(originalName, mime, bytes, keptOriginal = false) {
	const base = safeBaseName(originalName);
	const kb = Math.max(1, Math.round(bytes / 1e3));
	if (keptOriginal) return `${base}-${kb}kb.${originalName.split(".").pop()?.toLowerCase() || "jpg"}`;
	return `${base}-${kb}kb.${mime === "image/webp" ? "webp" : "jpg"}`;
}
async function loadSource(file) {
	try {
		const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
		return {
			width: bitmap.width,
			height: bitmap.height,
			draw: bitmap
		};
	} catch {
		const img = await loadHtmlImage(file);
		return {
			width: img.naturalWidth,
			height: img.naturalHeight,
			draw: img
		};
	}
}
function loadHtmlImage(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(url);
			if (!img.naturalWidth) {
				reject(/* @__PURE__ */ new Error("Could not read this image."));
				return;
			}
			resolve(img);
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("This file isn’t a readable image in this browser. Try PNG, JPG, or WebP."));
		};
		img.src = url;
	});
}
function capDimensions(width, height) {
	const pixels = width * height;
	if (pixels <= MAX_PIXELS) return {
		width,
		height
	};
	const scale = Math.sqrt(MAX_PIXELS / pixels);
	return {
		width: Math.max(MIN_EDGE, Math.round(width * scale)),
		height: Math.max(MIN_EDGE, Math.round(height * scale))
	};
}
function encodeCanvas(canvas, mime, quality) {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (!blob) {
				reject(/* @__PURE__ */ new Error("Could not encode this image."));
				return;
			}
			resolve(blob);
		}, mime, quality);
	});
}
function drawToCanvas(source, width, height, mime) {
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
function guessScale(originalBytes, targetBytes) {
	if (originalBytes <= targetBytes * 1.15) return 1;
	const ratio = targetBytes / originalBytes;
	return Math.min(1, Math.max(.12, Math.sqrt(ratio) * 1.4));
}
async function probeWebp() {
	const canvas = document.createElement("canvas");
	canvas.width = 2;
	canvas.height = 2;
	try {
		const blob = await encodeCanvas(canvas, "image/webp", .8);
		return blob.type === "image/webp" && blob.size > 0;
	} catch {
		return false;
	}
}
var webpSupported = null;
async function supportsWebp() {
	if (webpSupported === null) webpSupported = await probeWebp();
	return webpSupported;
}
async function compressToTarget(file, targetBytes, mime) {
	const source = await loadSource(file);
	const width = source.width;
	const height = source.height;
	if (!width || !height) throw new Error("This image has no dimensions.");
	const sameFamily = mime === "image/jpeg" && /jpe?g/i.test(file.type || file.name) || mime === "image/webp" && (file.type === "image/webp" || /\.webp$/i.test(file.name));
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
			note: "Already within the target size."
		};
	}
	if (mime === "image/webp" && !await supportsWebp()) mime = "image/jpeg";
	const capped = capDimensions(width, height);
	let scale = guessScale(file.size, targetBytes);
	let w = Math.max(MIN_EDGE, Math.round(capped.width * scale));
	let h = Math.max(MIN_EDGE, Math.round(capped.height * scale));
	let best = null;
	for (let attempt = 0; attempt < 10; attempt++) {
		const canvas = drawToCanvas(source, w, h, mime);
		let lo = .08;
		let hi = .92;
		let localBest = null;
		for (let i = 0; i < QUALITY_ITERS; i++) {
			const q = i === 0 ? .78 : (lo + hi) / 2;
			const blob = await encodeCanvas(canvas, mime, q);
			if (blob.size <= targetBytes) {
				localBest = {
					blob,
					q
				};
				lo = q;
			} else hi = q;
		}
		if (!localBest) {
			const floor = await encodeCanvas(canvas, mime, .08);
			if (floor.size <= targetBytes) localBest = {
				blob: floor,
				q: .08
			};
		}
		if (localBest) {
			best = {
				blob: localBest.blob,
				w,
				h,
				q: localBest.q
			};
			if (targetBytes - localBest.blob.size < targetBytes * .12 || scale >= .999) break;
			const bump = Math.min(1, scale * 1.12);
			if (bump <= scale + .01) break;
			scale = bump;
			w = Math.max(MIN_EDGE, Math.round(capped.width * scale));
			h = Math.max(MIN_EDGE, Math.round(capped.height * scale));
			continue;
		}
		scale *= .82;
		w = Math.max(MIN_EDGE, Math.round(capped.width * scale));
		h = Math.max(MIN_EDGE, Math.round(capped.height * scale));
		if (w <= MIN_EDGE && h <= MIN_EDGE) {
			best = {
				blob: await encodeCanvas(drawToCanvas(source, MIN_EDGE, MIN_EDGE, mime), mime, .08),
				w: MIN_EDGE,
				h: MIN_EDGE,
				q: .08
			};
			break;
		}
	}
	if (source.draw instanceof ImageBitmap) source.draw.close();
	if (!best) throw new Error("Could not compress this image to the target size.");
	const note = file.type === "image/gif" ? "Animated GIFs become a still frame." : best.blob.size > targetBytes ? "Closest size — this image could not fit under the target." : void 0;
	return {
		blob: best.blob,
		width,
		height,
		outWidth: best.w,
		outHeight: best.h,
		quality: best.q,
		keptOriginal: false,
		note
	};
}
function downloadBlob(blob, name) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function applyResult(job, result, resultName) {
	if (job.resultUrl) URL.revokeObjectURL(job.resultUrl);
	return {
		...job,
		status: "done",
		resultBlob: result.blob,
		resultBytes: result.blob.size,
		resultName,
		resultUrl: URL.createObjectURL(result.blob),
		width: result.width,
		height: result.height,
		outWidth: result.outWidth,
		outHeight: result.outHeight,
		note: result.note,
		error: void 0
	};
}
function revokeJob(job) {
	URL.revokeObjectURL(job.previewUrl);
	if (job.resultUrl) URL.revokeObjectURL(job.resultUrl);
}
var CRC_TABLE = /* @__PURE__ */ new Uint32Array(256);
for (let i = 0; i < 256; i++) {
	let c = i;
	for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
	CRC_TABLE[i] = c >>> 0;
}
function crc32(data) {
	let c = 4294967295;
	for (let i = 0; i < data.length; i++) c = CRC_TABLE[(c ^ data[i]) & 255] ^ c >>> 8;
	return (c ^ 4294967295) >>> 0;
}
function dosDateTime(date) {
	return {
		time: date.getHours() << 11 | date.getMinutes() << 5 | date.getSeconds() >> 1,
		date: date.getFullYear() - 1980 << 9 | date.getMonth() + 1 << 5 | date.getDate()
	};
}
function encodeName(name) {
	const safe = name.replace(/[/\\]/g, "-").slice(0, 180);
	return new TextEncoder().encode(safe);
}
function toBlobPart(data) {
	return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
}
async function zipBlobs(files) {
	const now = dosDateTime(/* @__PURE__ */ new Date());
	const locals = [];
	const centrals = [];
	let offset = 0;
	const used = /* @__PURE__ */ new Set();
	for (const file of files) {
		let name = file.name || "file";
		if (used.has(name)) {
			const dot = name.lastIndexOf(".");
			const base = dot > 0 ? name.slice(0, dot) : name;
			const ext = dot > 0 ? name.slice(dot) : "";
			let n = 2;
			while (used.has(`${base}-${n}${ext}`)) n += 1;
			name = `${base}-${n}${ext}`;
		}
		used.add(name);
		const data = new Uint8Array(await file.blob.arrayBuffer());
		const nameBytes = encodeName(name);
		const crc = crc32(data);
		const local = new Uint8Array(30 + nameBytes.length + data.length);
		const lv = new DataView(local.buffer);
		lv.setUint32(0, 67324752, true);
		lv.setUint16(4, 20, true);
		lv.setUint16(8, 0, true);
		lv.setUint16(10, now.time, true);
		lv.setUint16(12, now.date, true);
		lv.setUint32(14, crc, true);
		lv.setUint32(18, data.length, true);
		lv.setUint32(22, data.length, true);
		lv.setUint16(26, nameBytes.length, true);
		local.set(nameBytes, 30);
		local.set(data, 30 + nameBytes.length);
		locals.push(local);
		const central = new Uint8Array(46 + nameBytes.length);
		const cv = new DataView(central.buffer);
		cv.setUint16(4, 20, true);
		cv.setUint32(0, 33639248, true);
		cv.setUint16(6, 20, true);
		cv.setUint16(10, 0, true);
		cv.setUint16(12, now.time, true);
		cv.setUint16(14, now.date, true);
		cv.setUint32(16, crc, true);
		cv.setUint32(20, data.length, true);
		cv.setUint32(24, data.length, true);
		cv.setUint16(28, nameBytes.length, true);
		cv.setUint32(42, offset, true);
		central.set(nameBytes, 46);
		centrals.push(central);
		offset += local.length;
	}
	const centralSize = centrals.reduce((n, b) => n + b.length, 0);
	const eocd = /* @__PURE__ */ new Uint8Array(22);
	const ev = new DataView(eocd.buffer);
	ev.setUint32(0, 101010256, true);
	ev.setUint16(8, files.length, true);
	ev.setUint16(10, files.length, true);
	ev.setUint32(12, centralSize, true);
	ev.setUint32(16, offset, true);
	const parts = [
		...locals.map(toBlobPart),
		...centrals.map(toBlobPart),
		toBlobPart(eocd)
	];
	return new Blob(parts, { type: "application/zip" });
}
var MAX_FILES = 16;
var DEFAULT_KB = 100;
function Home() {
	const [kb, setKb] = (0, import_react.useState)(DEFAULT_KB);
	const [mime, setMime] = (0, import_react.useState)("image/jpeg");
	const [webpOk, setWebpOk] = (0, import_react.useState)(true);
	const [jobs, setJobs] = (0, import_react.useState)([]);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const jobsRef = (0, import_react.useRef)([]);
	jobsRef.current = jobs;
	const committedKb = (0, import_react.useRef)(DEFAULT_KB);
	const runId = (0, import_react.useRef)(0);
	const working = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		supportsWebp().then((ok) => {
			if (!cancelled) setWebpOk(ok);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			jobsRef.current.forEach(revokeJob);
		};
	}, []);
	const addFiles = (0, import_react.useCallback)((files) => {
		const images = files.filter(isProbablyImage);
		const skipped = files.length - images.length;
		if (!images.length) {
			setNotice(skipped > 0 ? "Kilo compresses images — try a PNG, JPG, WebP, GIF, or SVG." : null);
			return;
		}
		setJobs((prev) => {
			const room = Math.max(0, MAX_FILES - prev.length);
			const taken = images.slice(0, room);
			if (images.length > room) setNotice(`Only ${MAX_FILES} images at a time.`);
			else if (skipped > 0) setNotice(`${skipped} file${skipped === 1 ? "" : "s"} skipped — images only.`);
			else setNotice(null);
			return [...prev, ...taken.map((file) => ({
				id: crypto.randomUUID(),
				file,
				status: "queued",
				originalBytes: file.size,
				previewUrl: URL.createObjectURL(file)
			}))];
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const onPaste = (e) => {
			const items = e.clipboardData?.files;
			if (items && items.length) addFiles(Array.from(items));
		};
		window.addEventListener("paste", onPaste);
		return () => window.removeEventListener("paste", onPaste);
	}, [addFiles]);
	(0, import_react.useEffect)(() => {
		if (working.current) return;
		const job = jobs.find((j) => j.status === "queued");
		if (!job) return;
		working.current = true;
		const token = runId.current;
		const targetKb = committedKb.current;
		const targetMime = mime;
		setJobs((prev) => prev.map((j) => j.id === job.id ? {
			...j,
			status: "working"
		} : j));
		compressToTarget(job.file, kbToBytes(targetKb), targetMime).then((result) => {
			if (token !== runId.current) return;
			const name = resultFileName(job.file.name, result.keptOriginal ? job.file.type : targetMime, result.blob.size, result.keptOriginal);
			setJobs((prev) => prev.map((j) => j.id === job.id ? applyResult(j, result, name) : j));
		}).catch((err) => {
			if (token !== runId.current) return;
			const message = err instanceof Error ? err.message : "Could not compress this image.";
			setJobs((prev) => prev.map((j) => j.id === job.id ? {
				...j,
				status: "error",
				error: message
			} : j));
		}).finally(() => {
			if (token !== runId.current) return;
			working.current = false;
			setJobs((prev) => [...prev]);
		});
	}, [jobs, mime]);
	function rerunAll() {
		runId.current += 1;
		working.current = false;
		setJobs((prev) => prev.map((j) => {
			if (j.resultUrl) URL.revokeObjectURL(j.resultUrl);
			return {
				...j,
				status: "queued",
				resultBlob: void 0,
				resultBytes: void 0,
				resultName: void 0,
				resultUrl: void 0,
				error: void 0,
				note: void 0
			};
		}));
	}
	function onKbCommit(next) {
		setKb(next);
		const changed = next !== committedKb.current;
		committedKb.current = next;
		if (changed && jobsRef.current.length) rerunAll();
	}
	function onMimeChange(next) {
		if (next === mime) return;
		setMime(next);
		if (jobsRef.current.length) rerunAll();
	}
	function removeJob(id) {
		setJobs((prev) => {
			const found = prev.find((j) => j.id === id);
			if (found) revokeJob(found);
			return prev.filter((j) => j.id !== id);
		});
	}
	function downloadJob(job) {
		if (!job.resultBlob || !job.resultName) return;
		downloadBlob(job.resultBlob, job.resultName);
	}
	async function downloadAll() {
		const done = jobs.filter((j) => j.status === "done" && j.resultBlob && j.resultName);
		if (!done.length) return;
		if (done.length === 1) {
			downloadJob(done[0]);
			return;
		}
		downloadBlob(await zipBlobs(done.map((j) => ({
			name: j.resultName,
			blob: j.resultBlob
		}))), `kilo-${committedKb.current}kb.zip`);
	}
	const doneCount = jobs.filter((j) => j.status === "done").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pt-8 pb-28 sm:max-w-xl sm:px-6 sm:pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "kilo-enter flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl leading-none tracking-tight text-fg",
						children: "Kilo"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-1.5 text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
						className: "size-3.5",
						strokeWidth: 1.75,
						"aria-hidden": true
					}), "Stays on this device"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "kilo-enter-2 mt-10 sm:mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-4xl leading-tight tracking-tight text-fg sm:text-5xl",
					children: [
						"Any image.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"One hundred kilobytes."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-base leading-relaxed text-muted",
					children: "Drop a PNG, JPG, or anything else that is a picture. Kilo shrinks it to your target size — 100 KB by default — without leaving the browser."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "kilo-enter-3 mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TargetControl, {
					kb,
					onKb: setKb,
					onKbCommit,
					mime,
					onMime: onMimeChange,
					webpOk
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropZone, { onFiles: addFiles }), notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-warn",
					children: notice
				}) : null]
			}),
			jobs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6 flex flex-col gap-3",
				"aria-live": "polite",
				children: jobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobCard, {
					job,
					targetKb: committedKb.current,
					onDownload: downloadJob,
					onRemove: removeJob
				}, job.id))
			}) : null,
			doneCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-bg via-bg/90 to-transparent px-4 pt-10 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto mx-auto max-w-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full",
						size: "lg",
						onClick: () => void downloadAll(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							className: "size-4",
							strokeWidth: 1.8
						}), doneCount === 1 ? "Download image" : `Download ${doneCount} images`]
					})
				})
			}) : null
		]
	});
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-8 text-fg",
		"aria-hidden": true,
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "32",
			height: "32",
			rx: "8",
			className: "fill-surface-2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M11 8v16M11 16l10-8M11 16l10 8",
			stroke: "currentColor",
			strokeWidth: "2.2",
			strokeLinecap: "square"
		})]
	});
}
//#endregion
export { Home as component };
