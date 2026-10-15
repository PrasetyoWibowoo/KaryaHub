"use client"

import { use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ArrowLeft, ShieldCheck, Sparkles, Calendar, Lock, ArrowRight } from "lucide-react"

const CANDIDATES_DATA: Record<string, any> = {
  c1: {
    name: "Budi Pratama",
    avatar: "B",
    role: "Senior Product Designer",
    location: "Bandung, Jawa Barat",
    atsScore: 94,
    proposedBudget: 4800000,
    estimatedDays: 12,
    coverLetter: "Halo! Saya berpengalaman 4+ tahun merancang antarmuka mobile e-commerce UMKM di Indonesia.",
  },
  c2: {
    name: "Siti Rahmawati",
    avatar: "S",
    role: "UI Designer & Visual Artist",
    location: "Yogyakarta",
    atsScore: 88,
    proposedBudget: 5000000,
    estimatedDays: 14,
    coverLetter: "Sangat tertarik dengan branding produk herbal UMKM ini! Desain clean & friendly siap rapi.",
  },
  c3: {
    name: "Alex Wijaya",
    avatar: "A",
    role: "UX Researcher & Mobile Dev",
    location: "Jakarta Selatan",
    atsScore: 81,
    proposedBudget: 4500000,
    estimatedDays: 16,
    coverLetter: "Menawarkan paket desain siap implementasi React Native.",
  }
}

export default function CandidateHirePage({
  params
}: {
  params: Promise<{ id: string; candidateId: string }>
}) {
  const router = useRouter()
  const { id: jobId = "1", candidateId = "c1" } = use(params)
  const candidate = CANDIDATES_DATA[candidateId] || CANDIDATES_DATA["c1"]

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/80 pb-5">
        <div className="space-y-1">
          <Link
            href={`/umkm/manage-jobs/${jobId}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Pelamar
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-text-heading tracking-tight">
            Perjanjian Kerja & Rekrutmen Talenta
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Tinjau rincian kesepakatan kontrak kerja dan lanjutkan ke penguncian dana di Escrow.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-xs font-bold shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Proteksi Kontrak KaryaHub</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-6">
          <Card hover={false} className="p-6 space-y-4 shadow-soft border-border/80">
            <h2 className="text-base font-bold font-display text-text-heading pb-3 border-b border-border/70">
              Profil Talenta Terpilih
            </h2>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-xl shrink-0">
                {candidate.avatar}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-text-heading text-lg">{candidate.name}</h3>
                  <Badge variant="success" className="text-xs">Terverifikasi</Badge>
                </div>
                <p className="text-xs text-text-muted">{candidate.role} • {candidate.location}</p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mt-1">
                  <Sparkles className="w-3.5 h-3.5" /> Skor ATS Match: {candidate.atsScore}%
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-alt border border-border text-xs space-y-1">
              <p className="font-semibold text-text-heading">Surat Pengantar:</p>
              <p className="text-text-muted italic leading-relaxed">&ldquo;{candidate.coverLetter}&rdquo;</p>
            </div>
          </Card>

          <Card hover={false} className="p-6 space-y-3 bg-emerald-500/06 border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Jaminan Keamanan Rekening Bersama (Escrow)</span>
            </div>
            <p className="text-xs text-emerald-950/80 leading-relaxed">
              Dengan mengonfirmasi kontrak ini, Anda akan mendepositkan dana ke rekening penampung bersama (Midtrans Vault). Dana tidak langsung cair ke freelancer, melainkan hanya dilepas setelah Anda menyetujui hasil deliverable.
            </p>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <Card hover={false} className="p-6 space-y-5 shadow-soft border-border/80 sticky top-24">
            <span className="text-xs font-extrabold uppercase tracking-wider text-text-muted block pb-3 border-b border-border/70">
              Rincian Kontrak Kerja
            </span>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted">Proyek:</span>
                <span className="font-bold text-text-heading text-right">Desain UI/UX Mobile App</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Durasi Pengerjaan:</span>
                <span className="font-bold text-text-heading flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" /> {candidate.estimatedDays} Hari Kerja
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Biaya Jasa:</span>
                <span className="font-bold text-text-heading">Rp {candidate.proposedBudget.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Biaya Platform KaryaHub:</span>
                <span className="font-bold">Rp 0 (Subsidi SDG 8)</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border font-bold">
                <span className="text-sm text-text-heading">Total Dana Escrow:</span>
                <span className="text-xl font-extrabold text-emerald-700">
                  Rp {candidate.proposedBudget.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Link href={`/umkm/escrow-status/pay/${candidateId}`}>
                <Button variant="black" className="w-full h-12 text-xs font-bold shadow-md shadow-slate-950/15 gap-2">
                  <span>Lanjut ke Pembayaran Escrow</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </Button>
              </Link>
              <p className="text-[10px] text-text-muted text-center leading-relaxed">
                Anda akan dialihkan ke halaman metode pembayaran resmi (QRIS, VA Bank, E-Wallet).
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
