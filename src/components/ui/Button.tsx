"use client"

import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "primary" | "outline" | "ghost" | "accent" | "black" | "default"
  isLoading?: boolean
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const variants = {
      primary: "bg-primary text-white hover:bg-primary-hover shadow-primary border border-transparent hover:-translate-y-0.5 active:scale-[0.97]",
      default: "bg-primary text-white hover:bg-primary-hover shadow-primary border border-transparent hover:-translate-y-0.5 active:scale-[0.97]",
      outline: "border-2 border-border text-text-heading bg-surface hover:border-primary hover:text-primary active:scale-[0.97]",
      ghost: "bg-transparent text-text-body hover:text-text-heading hover:bg-surface-alt active:scale-[0.97]",
      accent: "bg-accent text-white hover:bg-accent-hover shadow-soft active:scale-[0.97]",
      black: "bg-black text-white hover:bg-black-hover shadow-lg border border-transparent hover:-translate-y-0.5 active:scale-[0.97]",
    }

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 py-2 text-sm",
      lg: "h-14 px-8 py-3 text-base",
    }

    return (
      <Comp
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Slottable>{children}</Slottable>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }

