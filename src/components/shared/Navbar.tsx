"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Briefcase } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-black tracking-tight text-text-heading hover:text-primary transition-colors">
          <Briefcase className="w-7 h-7 text-primary" />
          <span>KaryaHub</span>
        </Link>

        <div className="hidden md:flex items-center bg-white/80 backdrop-blur-md border border-border/50 rounded-full p-1 shadow-soft">
          <Link href="#about" className="px-6 py-2.5 text-sm font-semibold text-text-muted hover:text-text-heading transition-colors">About</Link>
          <Link href="#features" className="px-6 py-2.5 text-sm font-semibold text-text-muted hover:text-text-heading transition-colors">Features</Link>
          <Link href="#faqs" className="px-6 py-2.5 text-sm font-semibold text-text-muted hover:text-text-heading transition-colors">FAQs</Link>
          <Link href="/jobs">
            <Button variant="black" className="rounded-full px-5 py-2.5 ml-2 text-sm h-auto flex items-center gap-2">
              Find jobs <span className="font-bold -rotate-45 text-accent">→</span>
            </Button>
          </Link>
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
