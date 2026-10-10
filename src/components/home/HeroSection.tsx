"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"
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
    <section id="about" className="relative pt-36 pb-12 overflow-hidden flex flex-col items-center text-center">
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
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
          }
          intervalMs={2700}
          stepDuration={0.6}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center mt-10">
        <FadeIn>
          <div className="relative inline-block mb-6">
            <h1 className="font-display text-[5rem] sm:text-[6rem] md:text-[7rem] lg:text-[8rem] font-bold tracking-tighter text-text-heading leading-[0.95]">
              Temukan Kerja<br />
              yang Cocok<br />
              untuk Langkah<br />
              Berikutnya
            </h1>
          </div>

          <p className="text-xl text-text-muted mb-12 max-w-md mx-auto leading-relaxed font-medium">
            KaryaHub mempertemukan talenta Indonesia dengan proyek yang sesuai dan membantu UMKM menemukan keahlian yang mereka butuhkan.
          </p>

          <Button variant="black" size="lg" className="px-10 py-7 text-lg rounded-full shadow-2xl font-bold mb-32" asChild>
            <Link href="/jobs">
              Jelajahi Lowongan
            </Link>
          </Button>
        </FadeIn>
      </div>

      {/* The paragraph below the hero */}
      <div className="max-w-4xl mx-auto px-4 mt-8 w-full">
        <FadeIn delay={0.2} className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <img src="https://i.pravatar.cc/100?img=11" className="w-14 h-14 rounded-full border-[3px] border-white shadow-sm mb-3" alt="Founder" />
            <div className="text-sm font-semibold text-text-muted">Dibangun untuk Indonesia • <span className="text-text-heading font-bold">Ekosistem KaryaHub</span></div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-medium leading-[1.3] text-center tracking-tight max-w-[90%] mx-auto">
            <span className="text-text-heading">Dengan pencocokan berbasis keahlian, pencarian yang lebih terarah, dan pengalaman yang sederhana, KaryaHub membantu Anda menemukan peluang kerja tanpa membuang waktu. </span>
            <span className="text-text-muted">Freelancer dapat menyiapkan profil dan proposal dengan lebih percaya diri, sementara UMKM dapat menemukan talenta lokal untuk menyelesaikan proyeknya.</span>
          </h2>
          
          <div className="mt-16 bg-white rounded-3xl p-5 shadow-card flex items-center gap-5 border border-border w-[350px] hover:shadow-card-hover transition-all duration-300">
            <div className="text-3xl bg-primary-light w-14 h-14 rounded-xl flex items-center justify-center">👏</div>
            <div className="text-left flex-1">
              <div className="font-bold text-text-heading text-base mb-1">Dibuat untuk talenta lokal</div>
              <div className="text-[13px] text-text-muted">Satu ruang untuk peluang, proyek, dan kolaborasi.</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
