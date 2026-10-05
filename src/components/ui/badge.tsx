import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "neutral"
    | "match-high"
    | "match-mid"
    | "match-low"
    | "outline"
    | "success"
    | "warning";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-semibold tracking-wide uppercase rounded-full transition-colors select-none";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] leading-tight",
    md: "px-2.5 py-1 text-xs leading-none",
  };

  const variantStyles = {
    default: "bg-navy-950 text-bg-base",
    neutral: "bg-bg-subtle text-text-secondary border border-border-default",
    "match-high": "bg-lime-500 text-navy-950 font-bold",
    "match-mid": "bg-navy-950 text-bg-base font-bold",
    "match-low": "bg-bg-subtle text-text-secondary font-semibold",
    outline: "border border-border-default text-text-secondary bg-transparent",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
