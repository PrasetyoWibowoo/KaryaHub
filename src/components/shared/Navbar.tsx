"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Briefcase } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show navbar when at top (within 50px)
      if (currentScrollY < 50) {
        setIsVisible(true)
      } 
      // Hide when scrolling down, show when scrolling up
      else {
        setIsVisible(currentScrollY < lastScrollY.current)
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-black tracking-tight text-text-heading hover:text-primary transition-colors">
          <Briefcase className="w-7 h-7 text-primary" />
          <span>KaryaHub</span>
        </Link>

        <div className="hidden lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2 items-center bg-white/80 backdrop-blur-md border border-border/50 rounded-full p-1 shadow-soft">
          <Link href="#about" className="px-6 py-2.5 text-sm font-semibold text-text-muted hover:text-text-heading transition-colors">About</Link>
          <Link href="#features" className="px-6 py-2.5 text-sm font-semibold text-text-muted hover:text-text-heading transition-colors">Features</Link>
          <Link href="#faqs" className="px-6 py-2.5 text-sm font-semibold text-text-muted hover:text-text-heading transition-colors">FAQs</Link>
          <motion.div
            className="inline-flex ml-2"
            initial="rest"
            whileHover="hover"
            variants={navButtonVariants}
            transition={{ type: "spring", stiffness: 360, damping: 20 }}
          >
            <Link href="/jobs">
            <Button variant="black" className="rounded-full px-5 py-2.5 text-sm h-auto flex items-center gap-2">
              Find jobs
              <motion.span
                aria-hidden="true"
                className="font-bold text-accent"
                variants={navArrowVariants}
                transition={{ type: "spring", stiffness: 360, damping: 18 }}
              >
                →
              </motion.span>
            </Button>
            </Link>
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="primary" className="rounded-2xl px-8 h-12 font-bold shadow-sm">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="rounded-2xl px-8 h-12 font-bold bg-white shadow-sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
