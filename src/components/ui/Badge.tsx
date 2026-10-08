import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "pending" | "neutral" | "primary" | "warning" | "error" | "info" | "outline"
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary/20",
    success: "bg-success-light text-success border border-success/20",
    pending: "bg-warning-light text-warning border border-warning/20",
    warning: "bg-warning-light text-warning border border-warning/20",
    error: "bg-error-light text-error border border-error/20",
    info: "bg-info-light text-info border border-info/20",
    neutral: "bg-surface-alt text-text-muted border border-border",
    outline: "bg-transparent text-text-body border border-border",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
