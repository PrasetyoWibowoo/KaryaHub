import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ className, hover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-2xl shadow-card",
        hover && "hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300",
        className
      )}
      {...props}
    />
  )
}
