import { Download, LoaderCircle, TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, formatPixels, kbToBytes, percentSaved } from "@/lib/bytes";
import { cn } from "@/lib/utils";
import type { Job } from "@/lib/jobs";

type JobCardProps = {
  job: Job;
  targetKb: number;
  onDownload: (job: Job) => void;
  onRemove: (id: string) => void;
};

export function JobCard({ job, targetKb, onDownload, onRemove }: JobCardProps) {
  const target = kbToBytes(targetKb);
  const result = job.resultBytes ?? 0;
  const ratio = job.status === "done" ? Math.min(1, result / target) : 0;
  const over = job.status === "done" && result > target;

  return (
    <article className="rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]">
      <div className="flex gap-3">
        <Thumb src={job.resultUrl ?? job.previewUrl} alt="" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <h3 className="min-w-0 flex-1 truncate text-sm font-medium text-fg">
              {job.resultName ?? job.file.name}
            </h3>
            <button
              type="button"
              className="relative -mr-1 -mt-1 size-9 shrink-0 text-subtle after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 hover:text-fg"
              aria-label={`Remove ${job.file.name}`}
              onClick={() => onRemove(job.id)}
            >
              <X className="mx-auto size-4" strokeWidth={1.75} />
            </button>
          </div>

          <p className="mt-0.5 font-mono text-xs text-muted tabular-nums">
            {job.status === "working" && (
              <span className="kilo-working inline-flex items-center gap-1.5">
                <LoaderCircle className="size-3 animate-spin" />
                Compressing
              </span>
            )}
            {job.status === "queued" && "Waiting"}
            {job.status === "error" && (
              <span className="inline-flex items-center gap-1 text-danger">
                <TriangleAlert className="size-3" />
                Failed
              </span>
            )}
            {job.status === "done" && job.resultBytes != null && (
              <>
                {formatBytes(job.originalBytes)}
                <span className="text-subtle"> → </span>
                {formatBytes(job.resultBytes)}
                {job.resultBytes < job.originalBytes && (
                  <span className="text-ok">
                    {" "}
                    −{percentSaved(job.originalBytes, job.resultBytes)}
                  </span>
                )}
              </>
            )}
          </p>

          {job.status === "done" && job.outWidth && job.outHeight ? (
            <p className="mt-0.5 font-mono text-xs text-subtle tabular-nums">
              {formatPixels(job.width ?? 0, job.height ?? 0)}
              {job.outWidth !== job.width || job.outHeight !== job.height
                ? ` → ${formatPixels(job.outWidth, job.outHeight)}`
                : null}
            </p>
          ) : null}
        </div>
      </div>

      {job.status === "done" ? (
        <div className="mt-4">
          <div className="h-1 overflow-hidden rounded-full bg-surface-2">
            <div
              className={cn("h-full rounded-full", over ? "bg-warn" : "bg-ok")}
              style={{ width: `${Math.max(6, ratio * 100)}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-muted">
              {job.note ??
                (over
                  ? "Over target — this is the smallest encode"
                  : `Fits ${targetKb} KB`)}
            </p>
            <Button size="sm" onClick={() => onDownload(job)}>
              <Download className="size-3.5" strokeWidth={1.8} />
              Save
            </Button>
          </div>
        </div>
      ) : null}

      {job.status === "error" && job.error ? (
        <p className="mt-3 text-sm leading-relaxed text-danger">{job.error}</p>
      ) : null}
    </article>
  );
}

function Thumb({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="size-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-surface-2">
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <div className="size-full bg-surface-2" />
      )}
    </div>
  );
}
