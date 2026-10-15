import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  variant?: "default" | "glass" | "glass-elevated" | "glass-interactive" | "dark-glass" | "none"
}

export function Card({ className, hover = true, variant = "glass", ...props }: CardProps) {
  // If className defines custom background colors or dark gradients, avoid applying white .glass-card
  const hasCustomBg = Boolean(className && /(^|\s)(bg-|from-|to-)/.test(className))
  const effectiveVariant = variant === "glass" && hasCustomBg ? "none" : variant

  const variantStyles: Record<string, string> = {
    none: "",
    default: "bg-surface border border-border shadow-card",
    glass: "glass-card",
    "glass-elevated": "glass-panel-elevated",
    "glass-interactive": "glass-card glass-card-hover cursor-pointer",
    "dark-glass": "glass-card-dark",
  }

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variantStyles[effectiveVariant] || "",
        hover && effectiveVariant !== "glass-interactive" && "hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  )
}


