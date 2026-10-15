"use client"

import Link from "next/link"
import { MapPin, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/ui/FadeIn"
import { HeroScrollList } from "@/components/ui/HeroScrollList"

const roles = [
  "UI/UX Designer",
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Content Writer",
  "Digital Marketer",
  "Graphic Designer",
  "Video Editor",
  "SEO Specialist",
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
            <h1 className="font-display text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold tracking-tighter text-text-heading leading-[0.95]">
              Karya Nyata,<br />
              Dampak Nyata<br />
              untuk UMKM<br />
              & Talenta Lokal
            </h1>
          </div>

          <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Platform yang menghubungkan UMKM dengan talenta vokasi muda melalui proyek nyata. 
            Harga terjangkau, sistem escrow aman, dan AI ATS Evaluator untuk semua.
          </p>

          <Button variant="black" size="lg" className="px-10 py-7 text-lg rounded-full shadow-2xl font-bold mb-32" asChild>
            <Link href="/jobs">
              Mulai Cari Proyek →
            </Link>
          </Button>
        </FadeIn>
      </div>

      {/* The paragraph below the hero */}
      <div className="max-w-4xl mx-auto px-4 mt-8 w-full">
        <FadeIn delay={0.2} className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold font-display text-lg shadow-sm">
                K
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-950 leading-none">Inisiatif SDG Goal 8</div>
                <div className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                  Decent Work & Economic Growth
                </div>
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-500">
              Membangun Ekosistem Ketenagakerjaan Berkelanjutan • <span className="text-slate-950 font-bold">KaryaHub</span>
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-medium leading-[1.3] text-center tracking-tight max-w-[90%] mx-auto">
            <span className="text-text-heading">Lebih dari 60% UMKM kesulitan transformasi digital karena keterbatasan anggaran. Di sisi lain, ribuan talenta vokasi butuh proyek nyata untuk membangun portofolio. </span>
            <span className="text-text-muted">KaryaHub menghubungkan keduanya melalui sistem micro-jobs dengan escrow terpercaya, plus AI ATS Evaluator untuk meningkatkan daya saing CV freelancer.</span>
          </h2>
          
          <div className="mt-16 bg-white rounded-3xl p-5 sm:p-6 shadow-card flex items-center gap-4 sm:gap-5 border border-slate-200/80 max-w-[420px] w-full hover:shadow-card-hover hover:border-slate-300 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="font-bold text-slate-950 text-sm sm:text-base mb-0.5 flex items-center gap-1.5">
                <span>Transaksi Aman & Terproteksi</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-xs text-slate-500 leading-relaxed">
                Sistem Rekening Bersama (Escrow Midtrans) melindungi hak kerja talenta dan anggaran UMKM.
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
