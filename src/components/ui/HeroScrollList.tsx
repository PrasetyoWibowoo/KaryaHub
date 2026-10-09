"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, animate, useReducedMotion } from "framer-motion"

interface HeroScrollListProps {
  items: string[]
  align?: "left" | "right"
  indicator: React.ReactNode
  intervalMs?: number
  stepDuration?: number
}

// Dimensions — must be consistent
const ITEM_H   = 20  // font line-height in px
const GAP      = 34  // gap between items
const STEP     = ITEM_H + GAP   // 54px per slot
// Container height that centers item-index 2 (the middle one) exactly at 50%
// containerH/2 = STEP*2 + ITEM_H/2 → containerH = STEP*4 + ITEM_H = 236
const CONTAINER_H = STEP * 4 + ITEM_H // 236px

export function HeroScrollList({
  items,
  align = "left",
  indicator,
  intervalMs = 2200,
  stepDuration = 0.6,
}: HeroScrollListProps) {
  const n = items.length
  const shouldReduceMotion = useReducedMotion()
  // Triple: [copy A | copy B | copy C]
  // We start viewing copy B. Each step we move DOWN (+STEP).
  // After n steps we've moved to copy C — instantly reset to copy B (same content).
  const repeated  = [...items, ...items, ...items]
  const singleH   = n * STEP

  // Start: top of copy B = -(singleH)   (negative because motion y=0 is top)
  // But for DOWN scroll (column moves down), we START at copy C and move toward copy A:
  // startY = -(singleH * 2), each step += STEP, reset to -(singleH) when curY reaches -(singleH)
  // Simpler: start at -(singleH), each step adds +STEP, after n steps → y=0 → reset to -(singleH*2) → same view
  const startY = -singleH
  const y = useMotionValue(startY)
  const curY   = useRef(startY)
  const steps  = useRef(0)
  const timer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    y.set(startY)
    curY.current = startY
    steps.current = 0
    if (shouldReduceMotion) return

    let animation: ReturnType<typeof animate> | undefined
    function tick() {
      const target = curY.current + STEP  // move DOWN by one slot
      steps.current++

      animation = animate(y, target, {
        duration: stepDuration,
        ease: [0.25, 0.46, 0.45, 0.94],
        onComplete: () => {
          curY.current = target
          // After one full set, silently jump back to identical position in middle copy
          if (steps.current >= n) {
            steps.current = 0
            y.set(startY)
            curY.current = startY
          }
        },
      })

      timer.current = setTimeout(tick, intervalMs)
    }

    timer.current = setTimeout(tick, intervalMs)
    return () => {
      if (timer.current) clearTimeout(timer.current)
      animation?.stop()
    }
  }, [shouldReduceMotion, startY, stepDuration, intervalMs, n, y])

  const isRight = align === "right"

  return (
    <div className={`flex ${isRight ? "flex-row-reverse" : "flex-row"} items-center gap-3`}>
      {/* Indicator — vertically centered with the container */}
      <div className="flex-shrink-0 flex items-center" style={{ height: CONTAINER_H }}>
        {indicator}
      </div>

      {/* Masked scrolling column */}
      <div
        className="relative overflow-hidden"
        style={{
          height: CONTAINER_H,
          width: 185,
          maskImage:      "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:"linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <motion.div
          style={{ y, willChange: "transform" }}
          className={`flex flex-col ${isRight ? "items-end" : "items-start"}`}
        >
          {repeated.map((item, i) => (
            <div
              key={i}
              className={`whitespace-nowrap select-none text-[13px] font-bold text-text-heading ${isRight ? "text-right" : "text-left"}`}
              style={{ height: ITEM_H, lineHeight: `${ITEM_H}px`, marginBottom: GAP }}
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
