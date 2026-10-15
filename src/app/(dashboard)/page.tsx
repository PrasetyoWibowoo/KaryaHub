"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Briefcase, Building2, Sparkles, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>KaryaHub Portal Seleksi Demo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-950 tracking-tight mb-2">
            Pilih Ruang Kerja Anda
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Akses dashboard simulasi langsung sebagai Talenta Vokasi (Freelancer) atau Pelaku Usaha (Mitra UMKM).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Freelancer Card */}
          <Card 
            variant="glass-interactive"
            onClick={() => router.push("/freelancer")}
            className="p-8 group relative overflow-hidden flex flex-col justify-between border-white/90 hover:border-emerald-400/60"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 text-emerald-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Briefcase className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Talenta Vokasi
                </span>
              </div>

              <h2 className="text-2xl font-bold font-display text-slate-950 mb-2 group-hover:text-emerald-700 transition-colors">
                Dashboard Freelancer
              </h2>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Akses AI ATS CV Evaluator, lamar lowongan nyata dari UMKM lokal, dan pantau saldo escrow penghasilan Anda secara aman.
              </p>
            </div>

            <Button 
              variant="black"
              className="w-full text-xs font-bold h-11"
              onClick={(e) => {
                e.stopPropagation()
                router.push("/freelancer")
              }}
            >
              <span>Masuk sebagai Freelancer</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-emerald-400" />
            </Button>
          </Card>

          {/* UMKM Card */}
          <Card 
            variant="glass-interactive"
            onClick={() => router.push("/umkm")}
            className="p-8 group relative overflow-hidden flex flex-col justify-between border-white/90 hover:border-indigo-400/60"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 text-indigo-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                  Pemberi Kerja
                </span>
              </div>

              <h2 className="text-2xl font-bold font-display text-slate-950 mb-2 group-hover:text-indigo-700 transition-colors">
                Dashboard Mitra UMKM
              </h2>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Posting lowongan digitalisasi usaha Anda, screening pelamar dengan ranking skor ATS otomatis, dan amankan dana via Rekening Bersama.
              </p>
            </div>

            <Button 
              variant="outline"
              className="w-full text-xs font-bold h-11 bg-white hover:bg-slate-950 hover:text-white"
              onClick={(e) => {
                e.stopPropagation()
                router.push("/umkm")
              }}
            >
              <span>Masuk sebagai Mitra UMKM</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

