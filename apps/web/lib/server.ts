import fs from "node:fs/promises";
import path from "node:path";
import { TicketStatus } from "@prisma/client";
import { ZodError } from "zod";
import { FILE_UPLOAD } from "@/lib/constants";

export function getWorkspaceRoot(): string {
  return path.resolve(process.cwd(), "..", "..");
}

export function getUploadsDir(): string {
  return path.join(process.cwd(), "public", "uploads", "tickets");
}

export async function ensureUploadsDir(): Promise<void> {
  await fs.mkdir(getUploadsDir(), { recursive: true });
}

export function jsonError(message: string, status = 400): Response {
  return Response.json({ error: message }, { status });
}

export function jsonSuccess<T extends Record<string, unknown>>(data: T): Response {
  return Response.json({ ok: true, ...data });
}

export function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof ZodError) return error.issues[0]?.message || fallback;
  if (error instanceof Error) return error.message || fallback;
  return fallback;
}

export function requireFields(obj: Record<string, unknown>, fields: string[]): void {
  for (const field of fields) {
    const value = obj[field];
    if (!value || String(value).trim() === "") {
      throw new Error(`Campo obrigatório: ${field}`);
    }
  }
}

export function nextProtocol(count: number): string {
  const year = new Date().getFullYear();
  return `JHR-${year}-${String(count + 1).padStart(4, "0")}`;
}

export function ticketStatusLabel(status: TicketStatus): string {
  const labels: Record<TicketStatus, string> = {
    OPEN: "Aberto",
    IN_PROGRESS: "Em andamento",
    DONE: "Concluído",
  };
  return labels[status];
}

export function isValidFileExtension(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return FILE_UPLOAD.ALLOWED_EXTENSIONS.includes(ext);
}

export function isValidFileSize(sizeBytes: number): boolean {
  return sizeBytes <= FILE_UPLOAD.MAX_SIZE_MB * 1024 * 1024;
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_");
}
