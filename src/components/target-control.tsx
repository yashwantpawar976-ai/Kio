import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { kbToBytes, formatBytes } from "@/lib/bytes";
import type { OutputMime } from "@/lib/compress";

const PRESETS = [50, 100, 200, 500];

type TargetControlProps = {
  kb: number;
  onKb: (kb: number) => void;
  onKbCommit: (kb: number) => void;
  mime: OutputMime;
  onMime: (mime: OutputMime) => void;
  webpOk: boolean;
};

export function TargetControl({
  kb,
  onKb,
  onKbCommit,
  mime,
  onMime,
  webpOk,
}: TargetControlProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-end justify-between gap-3">
          <p className="font-mono text-5xl leading-none tracking-tight text-fg tabular-nums sm:text-6xl">
            {kb}
            <span className="ml-2 font-sans text-lg font-medium text-muted">KB</span>
          </p>
          <p className="pb-1 font-mono text-xs text-subtle tabular-nums">
            {formatBytes(kbToBytes(kb))}
          </p>
        </div>
        <Slider
          className="mt-5"
          min={20}
          max={500}
          step={5}
          value={[kb]}
          onValueChange={(v) => onKb(v[0] ?? 100)}
          onValueCommit={(v) => onKbCommit(v[0] ?? 100)}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                onKb(preset);
                onKbCommit(preset);
              }}
              className={cn(
                "h-9 rounded-full px-3.5 text-sm font-medium transition-[background-color,color] duration-150",
                preset === kb
                  ? "bg-accent text-accent-fg"
                  : "bg-surface-2 text-muted hover:text-fg",
              )}
            >
              {preset} KB
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium tracking-wide text-subtle uppercase">
          Output
        </p>
        <div className="grid grid-cols-2 gap-2">
          <FormatButton
            active={mime === "image/jpeg"}
            label="JPEG"
            hint="Works everywhere"
            onClick={() => onMime("image/jpeg")}
          />
          <FormatButton
            active={mime === "image/webp"}
            label="WebP"
            hint={webpOk ? "Smaller files" : "Not supported"}
            disabled={!webpOk}
            onClick={() => onMime("image/webp")}
          />
        </div>
      </div>
    </div>
  );
}

function FormatButton({
  active,
  label,
  hint,
  disabled,
  onClick,
}: {
  active: boolean;
  label: string;
  hint: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-14 flex-col items-start justify-center rounded-[var(--radius-md)] px-4 text-left transition-[box-shadow,background-color] duration-150 disabled:opacity-40",
        active
          ? "bg-surface-2 shadow-[var(--shadow-border-hover)]"
          : "bg-surface shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
      )}
    >
      <span className="text-sm font-medium text-fg">{label}</span>
      <span className="text-xs text-muted">{hint}</span>
    </button>
  );
}
