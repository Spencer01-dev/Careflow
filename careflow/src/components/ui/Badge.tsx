"use client";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "primary" | "secondary" | "default";
  size?: "sm" | "md";
  dot?: boolean;
}

const variants = {
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
  primary: "bg-emerald-50 text-emerald-700 border-emerald-200",
  secondary: "bg-teal-50 text-teal-700 border-teal-200",
  default: "bg-slate-100 text-slate-700 border-slate-200",
};

const dotColors = {
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-sky-500",
  primary: "bg-emerald-500",
  secondary: "bg-teal-500",
  default: "bg-slate-400",
};

export default function Badge({ className, variant = "default", size = "sm", dot, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}
