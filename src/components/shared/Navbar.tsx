"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navButtonVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -2, scale: 1.03 },
}

const navArrowVariants = {
  rest: { rotate: -45 },
  hover: { rotate: 0 },
}

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY
      // Hanya muncul saat di paling atas (<= 40px)
      // Hilang saat di-scroll ke bawah
      // Saat di-scroll ke atas, TIDAK muncul jika belum sampai ke paling atas
      if (cur <= 40) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setMobileOpen(false)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out transform ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold font-display text-sm shadow-sm group-hover:scale-105 transition-transform">
            K
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg font-bold text-slate-950 tracking-tight font-display flex items-center gap-1.5 leading-none">
              KaryaHub
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-1 leading-none">
              SDG 8 • Decent Work
            </span>
          </div>
        </Link>
        {/* Center Floating Pill Navigation with Sliding Hover Indicator */}
        <div 
          onMouseLeave={() => setHoveredNav(null)}
          className="hidden lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2 items-center bg-white/80 backdrop-blur-md border border-border/50 rounded-full p-1.5 shadow-soft relative"
        >
          {[
            { label: "Tentang", href: "#about" },
            { label: "Fitur", href: "#features" },
            { label: "Tanya Jawab", href: "#faqs" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredNav(item.label)}
              className="relative px-5 py-2 text-sm font-semibold text-text-muted hover:text-text-heading transition-colors duration-200"
            >
              {hoveredNav === item.label && (
                <motion.div
                  layoutId="navbarCenterHoverPill"
                  className="absolute inset-0 rounded-full bg-slate-100/90 -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}

          {/* Floating Pill Action Button: Cari Proyek */}
          <motion.div
            className="inline-flex ml-1.5"
            initial="rest"
            whileHover="hover"
            variants={navButtonVariants}
            transition={{ type: "spring", stiffness: 360, damping: 20 }}
          >
            <Link href="/jobs">
              <span className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm hover:shadow-md transition-all">
                Cari Proyek
                <motion.span
                  aria-hidden="true"
                  className="font-bold text-accent"
                  variants={navArrowVariants}
                  transition={{ type: "spring", stiffness: 360, damping: 18 }}
                >
                  →
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Clean Floating Right Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-950 bg-white/80 hover:bg-slate-100 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-sm transition-all"
            >
              Masuk
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold text-white bg-slate-950 hover:bg-slate-800 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.2)] transition-all"
            >
              Daftar Sekarang
            </Link>
          </motion.div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 flex items-center justify-center text-slate-700 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Floating Mobile Drawer */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="lg:hidden overflow-hidden mx-4 sm:mx-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/70 shadow-xl"
      >
        <div className="p-4 flex flex-col gap-2">
          <Link
            href="#about"
            onClick={() => setMobileOpen(false)}
            className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 transition-colors"
          >
            Tentang
          </Link>
          <Link
            href="#features"
            onClick={() => setMobileOpen(false)}
            className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 transition-colors"
          >
            Fitur
          </Link>
          <Link
            href="#faqs"
            onClick={() => setMobileOpen(false)}
            className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 transition-colors"
          >
            Tanya Jawab
          </Link>
          <Link
            href="/jobs"
            onClick={() => setMobileOpen(false)}
            className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 transition-colors"
          >
            Cari Proyek ↗
          </Link>
          <div className="flex gap-2.5 pt-3 mt-1 border-t border-slate-100">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 shadow-xs transition-all"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-full text-sm font-bold text-white bg-slate-950 hover:bg-slate-800 shadow-sm transition-all"
            >
              Daftar
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}
