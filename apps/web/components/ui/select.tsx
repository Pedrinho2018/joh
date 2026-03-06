import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-2xl border border-line bg-panel px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
