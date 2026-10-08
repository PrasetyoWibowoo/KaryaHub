"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, TrendingUp, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/ui/FadeIn"
import { HeroScrollList } from "@/components/ui/HeroScrollList"

const roles = [
  "UI/UX Designer",
  "Web Developer",
  "Content Writer",
  "Digital Marketer",
  "Graphic Designer",
  "Video Editor",
  "Mobile Developer",
  "Data Analyst",
  "Social Media Manager",
]

const locations = [
  "Jakarta, Indonesia",
  "Surabaya, Indonesia",
  "Bandung, Indonesia",
  "Yogyakarta, Indonesia",
  "Medan, Indonesia",
  "Semarang, Indonesia",
  "Bali, Indonesia",
  "Makassar, Indonesia",
  "Solo, Indonesia",
]

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-12 overflow-hidden flex flex-col items-center text-center">
      {/* Left side — Roles scroller */}
      <div className="absolute left-0 top-[38%] -translate-y-1/2 hidden lg:flex items-center pl-6 pointer-events-none">
        <HeroScrollList
          items={roles}
          align="left"
          indicator={
            <span className="text-base font-bold text-text-heading">▶</span>
          }
          intervalMs={2200}
          stepDuration={0.6}
        />
      </div>

      {/* Right side — Locations scroller */}
      <div className="absolute right-0 top-[38%] -translate-y-1/2 hidden lg:flex items-center pr-6 pointer-events-none">
        <HeroScrollList
          items={locations}
          align="right"
          indicator={
            <span className="text-base leading-none">📍</span>
          }
          intervalMs={2700}
          stepDuration={0.6}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center mt-10">
        <FadeIn>
          <div className="relative inline-block mb-6">
            <h1 className="font-display text-[5rem] sm:text-[6rem] md:text-[7rem] lg:text-[8rem] font-bold tracking-tighter text-text-heading leading-[0.95]">
              Job That<br />
              Match You, Not<br />
              Other Way<br />
              Around
            </h1>
            {/* The 3D Folder illusion */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -top-10 left-[-20px] bg-white w-20 h-24 rounded-lg shadow-sm border border-border transform -rotate-[15deg]"></div>
                <div className="absolute -top-12 left-[10px] bg-white w-20 h-24 rounded-lg shadow-sm border border-border transform rotate-[10deg]"></div>
                <div className="absolute -top-8 left-[30px] bg-white w-20 h-24 rounded-lg shadow-sm border border-border transform rotate-[25deg]"></div>
                <div className="w-32 h-24 sm:w-40 sm:h-28 bg-primary rounded-2xl rounded-tr-3xl shadow-2xl relative z-10 border-t-[12px] border-primary-hover">
                  <div className="absolute -top-4 right-8 w-12 h-6 bg-primary-hover rounded-t-lg"></div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xl text-text-muted mb-12 max-w-md mx-auto leading-relaxed font-medium">
            Job matches, alerts, and easy applications to get hired faster.
          </p>

          <Button variant="black" size="lg" className="px-10 py-7 text-lg rounded-full shadow-2xl font-bold mb-32" asChild>
            <Link href="/demo">
              Book a Demo
            </Link>
          </Button>
        </FadeIn>
      </div>

      {/* The paragraph below the hero */}
      <div className="max-w-4xl mx-auto px-4 mt-8 w-full">
        <FadeIn delay={0.2} className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <img src="https://i.pravatar.cc/100?img=11" className="w-14 h-14 rounded-full border-[3px] border-white shadow-sm mb-3" alt="Founder" />
            <div className="text-sm font-semibold text-text-muted">Founder • <span className="text-text-heading font-bold">CEO KaryaHub</span></div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-medium leading-[1.3] text-center tracking-tight max-w-[90%] mx-auto">
            <span className="text-text-heading">With smart algorithms, personalized job matches, and a clean, user-first design, we take the stress out of your job hunt. Whether you're starting fresh or looking for your next big move, our platform </span>
            <span className="text-text-muted">helps you discover the right opportunities, stay updated in real-time, and apply with ease, so you can focus on what truly matters: getting hired.</span>
          </h2>
          
          <div className="mt-16 bg-white rounded-3xl p-5 shadow-card flex items-center gap-5 border border-border w-[350px] hover:shadow-card-hover transition-all duration-300">
            <div className="text-3xl bg-primary-light w-14 h-14 rounded-xl flex items-center justify-center">👏</div>
            <div className="text-left flex-1">
              <div className="font-bold text-text-heading text-base mb-1">Platform Terpercaya</div>
              <div className="text-[13px] text-text-muted">KaryaHub digunakan di seluruh Indonesia.</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
