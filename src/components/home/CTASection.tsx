"use client"

import Link from "next/link"
import React from "react"
import { FadeIn } from "@/components/ui/FadeIn"

interface SkillItem {
  name: string
  type: string
}

// Crisp inline SVG icons matching the reference image
function SkillIcon({ type }: { type: string }) {
  switch (type) {
    case "webflow":
      return (
        <div className="w-6 h-6 rounded-md bg-[#146EF5]/10 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 text-[#146EF5]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.8 6.6c-1.3 0-2.3.8-2.8 1.9L13.8 14l-2.1-5.6c.7-.6 1.1-1.4 1.1-2.4 0-1.8-1.5-3.3-3.3-3.3-1.6 0-3 1.1-3.3 2.6L2 19.3h4.6l2.1-6 2.3 6h4.3l4.8-12.7z" />
          </svg>
        </div>
      )
    case "all3d":
      return (
        <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center shrink-0 font-black text-[10px] text-purple-700 tracking-tighter">
          All³
        </div>
      )
    case "duo":
      return (
        <div className="w-6 h-6 rounded-lg bg-[#58CC02] flex items-center justify-center shrink-0 p-1 shadow-xs">
          <div className="w-full h-full bg-white/20 rounded-md flex items-center justify-around px-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white flex items-center justify-center">
              <span className="w-0.5 h-0.5 rounded-full bg-slate-900" />
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white flex items-center justify-center">
              <span className="w-0.5 h-0.5 rounded-full bg-slate-900" />
            </span>
          </div>
        </div>
      )
    case "flame":
      return (
        <div className="w-6 h-6 rounded-lg bg-[#FF5722] flex items-center justify-center shrink-0 shadow-xs">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9.5 5.5 8 8.5 8 11.5c0 4.1 3.4 7.5 7.5 7.5 1.1 0 2.2-.2 3.1-.7-1-3.6.4-6.3 1.4-8.3-2.5 5.4-8 5-8 5 0-2 1.5-4.5 3-6.5-2.5 1.5-5 4.5-5 8 0 3.9 3.1 7 7 7s7-3.1 7-7c0-6-6-10.5-6-14.5z" />
          </svg>
        </div>
      )
    case "bmw":
      return (
        <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center shrink-0 overflow-hidden bg-white shadow-xs">
          <div className="w-full h-full grid grid-cols-2 grid-rows-2">
            <div className="bg-[#0066B1]" />
            <div className="bg-white" />
            <div className="bg-white" />
            <div className="bg-[#0066B1]" />
          </div>
        </div>
      )
    case "flutter":
      return (
        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M14.3 2L4 12.3l3.2 3.2L19.5 3.2h-5.2z" fill="#02569B" />
            <path d="M14.3 12.8L9.2 17.9l3.2 3.2 5.1-5.1h-3.2z" fill="#0175C2" />
            <path d="M11.9 15.2l2.4 2.4-5.1 5.1h-5.2l7.5-7.5h.4z" fill="#29B6F6" />
          </svg>
        </div>
      )
    case "cube":
      return (
        <div className="w-6 h-6 rounded-lg bg-[#84CC16] flex items-center justify-center shrink-0 shadow-xs">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2zm0 2.3L6.1 7.6 12 11l5.9-3.4L12 4.3zM5.5 9v6.5l5.5 3.1v-6.5L5.5 9zm13 0l-5.5 3.1v6.5l5.5-3.1V9z" />
          </svg>
        </div>
      )
    case "opera":
      return (
        <div className="w-6 h-6 rounded-full bg-[#FF1B2D] flex items-center justify-center shrink-0 shadow-xs">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-white" />
        </div>
      )
    case "aperture":
      return (
        <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shrink-0 shadow-xs text-amber-950">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
            <line x1="9.69" y1="8" x2="21.17" y2="8" />
            <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
            <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
            <line x1="14.31" y1="16" x2="2.83" y2="16" />
            <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
          </svg>
        </div>
      )
    case "cross":
      return (
        <div className="w-6 h-6 rounded-md bg-cyan-400 flex items-center justify-center shrink-0 shadow-xs">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      )
    case "h_glyph":
      return (
        <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 font-serif italic font-bold text-orange-600 text-sm">
          h
        </div>
      )
    case "dragon":
      return (
        <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center shrink-0 text-white shadow-xs">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 00-6.88 17.23L4 21l3.5-.88A10 10 0 1012 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          </svg>
        </div>
      )
    case "ribbon":
      return (
        <div className="w-6 h-6 rounded-lg bg-rose-500 flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-xs">
          R
        </div>
      )
    case "g_circle":
      return (
        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 font-bold text-xs border border-emerald-300">
          G
        </div>
      )
    case "smiley":
      return (
        <div className="w-6 h-6 rounded-full bg-amber-300 flex items-center justify-center shrink-0 text-amber-900 shadow-xs">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
      )
    case "finance":
      return (
        <div className="w-6 h-6 rounded-lg bg-sky-100 flex items-center justify-center shrink-0 text-sky-600 font-bold">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="M18 9l-5 5-4-4-4 4" />
          </svg>
        </div>
      )
    case "glidden":
      return (
        <div className="w-7 h-4 rounded-full bg-teal-50 border border-teal-500/40 flex items-center justify-center shrink-0 text-[7px] font-bold text-teal-700">
          Glidden
        </div>
      )
    case "cart":
      return (
        <div className="w-6 h-6 rounded-lg bg-sky-100 flex items-center justify-center shrink-0 text-sky-600">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
      )
    case "pen":
      return (
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-600">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          </svg>
        </div>
      )
    case "seo":
      return (
        <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center shrink-0 text-white text-[8px] font-bold shadow-xs">
          SEO
        </div>
      )
    default:
      return (
        <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 text-xs font-semibold">
          ✦
        </div>
      )
  }
}

function SkillBadge({ item }: { item: SkillItem }) {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/95 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] backdrop-blur-xs select-none shrink-0 transition-transform hover:scale-105">
      <SkillIcon type={item.type} />
      <span className="text-slate-600 font-medium text-xs sm:text-sm tracking-tight whitespace-nowrap">
        {item.name}
      </span>
    </div>
  )
}

// 5 rows matching the exact visual order in the reference image
const row1: SkillItem[] = [
  { name: "Designer", type: "pen" },
  { name: "E-commerce Manager", type: "cart" },
  { name: "HR Specialist", type: "glidden" },
  { name: "Content Strategist", type: "h_glyph" },
  { name: "Backend Engineer", type: "cube" },
  { name: "Marketing Lead", type: "aperture" },
]

const row2: SkillItem[] = [
  { name: "Webflow Specialist", type: "webflow" },
  { name: "3D Artist", type: "all3d" },
  { name: "UIUX Designer", type: "duo" },
  { name: "Web Developer", type: "flame" },
  { name: "UIUX Designer", type: "bmw" },
  { name: "Webflow Specialist", type: "webflow" },
]

const row3: SkillItem[] = [
  { name: "Flutter Developer", type: "flutter" },
  { name: "UIUX Designer", type: "cube" },
  { name: "Civil Engineer", type: "opera" },
  { name: "Graphic Designer", type: "aperture" },
  { name: "UIUX Designer", type: "cross" },
  { name: "Flutter Developer", type: "flutter" },
]

const row4: SkillItem[] = [
  { name: "Financial Analyst", type: "h_glyph" },
  { name: "UIUX Designer", type: "dragon" },
  { name: "Comics Art", type: "ribbon" },
  { name: "Data Entry Specialist", type: "g_circle" },
  { name: "Financial Analyst", type: "h_glyph" },
  { name: "UIUX Designer", type: "dragon" },
]

const row5: SkillItem[] = [
  { name: "Finance Manager", type: "finance" },
  { name: "Brand Designer", type: "smiley" },
  { name: "SEO Specialist", type: "seo" },
  { name: "Finance Manager", type: "finance" },
  { name: "Brand Designer", type: "smiley" },
]

export function CTASection() {
  return (
    <section className="py-10 sm:py-16 bg-background overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          {/* Main White Card matching reference design */}
          <div className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] bg-white border border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] pt-14 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-8">
            
            {/* Header Content with exact two-line subtitle break */}
            <div className="relative z-20 max-w-2xl mx-auto text-center mb-2 sm:mb-3">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Unlock Your Career Potential
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto mt-3 font-normal leading-relaxed">
                Thousands of professionals have already found the right job
                <br className="hidden sm:inline" /> with us faster, easier, and with less stress
              </p>
              <div className="mt-5 sm:mt-6 flex justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-[#18181B] hover:bg-black text-white font-medium text-xs sm:text-sm px-6 py-2.5 sm:px-7 sm:py-3 transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Radial White Glow behind text and button ensuring legibility as skills float underneath */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse 65% 55% at 50% 22%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.92) 42%, rgba(255, 255, 255, 0) 80%)",
              }}
            />

            {/* Moving Skills Container with dual fading masks ("bagian yang pudar") */}
            <div
              className="relative w-full overflow-hidden select-none pointer-events-none -mt-2 sm:-mt-4 pt-1 pb-4 space-y-3 sm:space-y-4"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              {/* Row 1 - Faded Top Row (scroll left) */}
              <div className="opacity-25 flex gap-3 sm:gap-4 skill-scroll-left-1">
                {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
                  <SkillBadge key={`r1-${idx}`} item={item} />
                ))}
              </div>

              {/* Row 2 - Medium Opacity (scroll right) */}
              <div className="opacity-65 flex gap-3 sm:gap-4 skill-scroll-right-2">
                {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
                  <SkillBadge key={`r2-${idx}`} item={item} />
                ))}
              </div>

              {/* Row 3 - Prominent Center Row (scroll left) */}
              <div className="opacity-100 flex gap-3 sm:gap-4 skill-scroll-left-3">
                {[...row3, ...row3, ...row3, ...row3].map((item, idx) => (
                  <SkillBadge key={`r3-${idx}`} item={item} />
                ))}
              </div>

              {/* Row 4 - Medium Opacity (scroll right) */}
              <div className="opacity-70 flex gap-3 sm:gap-4 skill-scroll-right-4">
                {[...row4, ...row4, ...row4, ...row4].map((item, idx) => (
                  <SkillBadge key={`r4-${idx}`} item={item} />
                ))}
              </div>

              {/* Row 5 - Faded Bottom Row (scroll left) */}
              <div className="opacity-25 flex gap-3 sm:gap-4 skill-scroll-left-5">
                {[...row5, ...row5, ...row5, ...row5].map((item, idx) => (
                  <SkillBadge key={`r5-${idx}`} item={item} />
                ))}
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  )
}
