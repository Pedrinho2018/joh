"use client";

import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function FormStatus({
  message,
  error,
  loading,
}: {
  message?: string;
  error?: boolean;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm text-muted animate-pulse">
        <Loader2 size={16} className="animate-spin" />
        <span>Processando...</span>
      </div>
    );
  }

  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl px-4 py-3 text-sm transition-all duration-300",
        error
          ? "border border-red-500/30 bg-red-500/10 text-red-400"
          : "border border-accent/30 bg-accent/10 text-accent animate-in fade-in slide-in-from-bottom-2"
      )}
    >
      {error ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
      <span>{message}</span>
    </div>
  );
}
