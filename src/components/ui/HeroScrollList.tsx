"use client"

import { useId, useMemo } from "react"

interface HeroScrollListProps {
  items: string[]
  align?: "left" | "right"
  indicator: React.ReactNode
  intervalMs?: number
  stepDuration?: number
}

// Dimensions — exact layout specifications
const ITEM_H = 20 // font line-height in px
const GAP = 34 // gap between items
const STEP = ITEM_H + GAP // 54px per slot
// Container height that centers item-index 2 (the middle slot) exactly at 50%
// containerH/2 = STEP*2 + ITEM_H/2 → containerH = STEP*4 + ITEM_H = 236px
const CONTAINER_H = STEP * 4 + ITEM_H // 236px

export function HeroScrollList({
  items,
  align = "left",
  indicator,
  intervalMs = 2200,
  stepDuration = 0.6,
}: HeroScrollListProps) {
  const n = items.length
  const rawId = useId()
  // Clean unique id for CSS animation rule
  const animId = useMemo(
    () => `hero-scroll-${align}-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [align, rawId]
  )

  // Buffer: arrange so that items[0] starts aligned with the indicator at Slot 2 (index 2).
  // Slot 0: items[n-2]
  // Slot 1: items[n-1]
  // Slot 2: items[0]  <-- ALIGNED WITH INDICATOR AT START
  // Followed by 2 full copies of items for seamless infinite wrap.
  const repeated = useMemo(() => {
    if (n < 2) return items
    return [
      items[n - 2],
      items[n - 1],
      ...items,
      ...items,
      ...items,
    ]
  }, [items, n])

  // Total loop duration in seconds
  const totalDuration = (n * intervalMs) / 1000

  // Generate seamless CSS keyframes
  const keyframesCSS = useMemo(() => {
    if (n <= 1) return ""
    const stepPercent = 100 / n
    const transPercent = Math.min((stepDuration / totalDuration) * 100, stepPercent * 0.4)
    let css = `@keyframes ${animId} {\n`
    for (let i = 0; i < n; i++) {
      const tStart = (i * stepPercent).toFixed(3)
      const tHoldEnd = ((i + 1) * stepPercent - transPercent).toFixed(3)
      const tNext = ((i + 1) * stepPercent).toFixed(3)
      const yCurrent = -(i * STEP)
      const yNext = -((i + 1) * STEP)
      css += `  ${tStart}% { transform: translateY(${yCurrent}px); }\n`
      css += `  ${tHoldEnd}% { transform: translateY(${yCurrent}px); animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }\n`
      css += `  ${tNext}% { transform: translateY(${yNext}px); }\n`
    }
    css += `}\n`
    css += `@media (prefers-reduced-motion: reduce) {\n  .${animId}-track { animation: none !important; }\n}\n`
    return css
  }, [n, animId, stepDuration, totalDuration])

  const isRight = align === "right"

  return (
    <div className={`flex ${isRight ? "flex-row-reverse" : "flex-row"} items-center gap-3 select-none`}>
      {keyframesCSS && (
        <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />
      )}

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
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <div
          className={`flex flex-col ${animId}-track ${isRight ? "items-end" : "items-start"}`}
          style={{
            animation: n > 1 ? `${animId} ${totalDuration}s infinite linear` : "none",
            willChange: "transform",
          }}
        >
          {repeated.map((item, i) => (
            <div
              key={i}
              className={`whitespace-nowrap select-none text-[13px] font-bold text-text-heading ${
                isRight ? "text-right" : "text-left"
              }`}
              style={{ height: ITEM_H, lineHeight: `${ITEM_H}px`, marginBottom: GAP }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

