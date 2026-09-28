/** SI kilobyte — matches typical upload caps that say "100 KB". */
export const BYTES_PER_KB = 1000;

export function kbToBytes(kb: number): number {
  return Math.round(kb * BYTES_PER_KB);
}

export function bytesToKb(bytes: number): number {
  return bytes / BYTES_PER_KB;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1000) return `${bytes} B`;
  if (bytes < 1_000_000) {
    const kb = bytes / 1000;
    return kb < 10 ? `${kb.toFixed(1)} KB` : `${Math.round(kb)} KB`;
  }
  const mb = bytes / 1_000_000;
  return mb < 10 ? `${mb.toFixed(2)} MB` : `${mb.toFixed(1)} MB`;
}

export function formatPixels(width: number, height: number): string {
  return `${width}×${height}`;
}

export function percentSaved(original: number, result: number): string {
  if (original <= 0 || result >= original) return "0%";
  return `${Math.round((1 - result / original) * 100)}%`;
}
