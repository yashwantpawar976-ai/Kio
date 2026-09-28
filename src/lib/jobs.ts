import type { CompressResult, OutputMime } from "@/lib/compress";

export type JobStatus = "queued" | "working" | "done" | "error";

export type Job = {
  id: string;
  file: File;
  status: JobStatus;
  originalBytes: number;
  previewUrl: string;
  resultBytes?: number;
  resultBlob?: Blob;
  resultName?: string;
  resultUrl?: string;
  width?: number;
  height?: number;
  outWidth?: number;
  outHeight?: number;
  error?: string;
  note?: string;
  mime?: OutputMime;
};

export function applyResult(
  job: Job,
  result: CompressResult,
  resultName: string,
): Job {
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
    error: undefined,
  };
}

export function revokeJob(job: Job) {
  URL.revokeObjectURL(job.previewUrl);
  if (job.resultUrl) URL.revokeObjectURL(job.resultUrl);
}
