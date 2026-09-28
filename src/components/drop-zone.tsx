import { useCallback, useState } from "react";
import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

type DropZoneProps = {
  disabled?: boolean;
  onFiles: (files: File[]) => void;
};

export function DropZone({ disabled, onFiles }: DropZoneProps) {
  const [over, setOver] = useState(false);

  const take = useCallback(
    (list: FileList | File[] | null) => {
      if (!list) return;
      const files = Array.from(list);
      if (files.length) onFiles(files);
    },
    [onFiles],
  );

  return (
    <label
      className={cn(
        "relative flex min-h-52 cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-xl)] px-6 py-10 text-center shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
        over ? "bg-surface-2 shadow-[var(--shadow-border-hover)]" : "bg-surface",
        disabled && "pointer-events-none opacity-50",
      )}
      onDragEnter={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        take(e.dataTransfer.files);
      }}
    >
      <input
        type="file"
        accept="image/*,.heic,.heif,.avif,.svg,.tif,.tiff"
        multiple
        className="sr-only"
        disabled={disabled}
        onChange={(e) => {
          take(e.target.files);
          e.target.value = "";
        }}
      />
      <span className="flex size-12 items-center justify-center rounded-[var(--radius-md)] bg-surface-2 text-fg">
        <ImagePlus className="size-5" strokeWidth={1.6} aria-hidden />
      </span>
      <span className="text-base font-medium text-fg">
        {over ? "Drop to compress" : "Drop images here"}
      </span>
      <span className="max-w-xs text-sm leading-relaxed text-muted">
        PNG, JPG, WebP, GIF, SVG, or BMP. Paste with Ctrl+V. Nothing is uploaded.
      </span>
    </label>
  );
}
