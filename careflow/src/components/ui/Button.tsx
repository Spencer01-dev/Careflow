"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variants = {
  primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg border-transparent",
  secondary: "bg-teal-500 hover:bg-teal-600 text-white shadow-md hover:shadow-lg border-transparent",
  outline: "bg-transparent hover:bg-emerald-50 text-emerald-600 border-emerald-600",
  ghost: "bg-transparent hover:bg-slate-100 text-slate-700 border-transparent",
  danger: "bg-red-500 hover:bg-red-600 text-white shadow-md border-transparent",
  success: "bg-green-500 hover:bg-green-600 text-white shadow-md border-transparent",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
  xl: "px-8 py-4 text-lg gap-3",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, icon, iconPosition = "left", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-xl border transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={size === "sm" ? 14 : 16} />
        ) : (
          iconPosition === "left" && icon
        )}
        {children}
        {!loading && iconPosition === "right" && icon}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
