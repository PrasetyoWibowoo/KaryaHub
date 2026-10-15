"use client"

import { useState, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  ArrowLeft, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  FileCode2, 
  Award
} from "lucide-react"

export default function EscrowReleasePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const transactionId = use(params).id || "1"

  const [rating, setRating] = useState(5)
  const [selectedTags, setSelectedTags] = useState<string[]>(["Pengerjaan Tepat Waktu", "Kualitas Desain Tinggi"])
  const [feedback, setFeedback] = useState("Hasil pekerjaan sangat memuaskan, desain responsif, dan komunikasi sangat cepat.")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleRelease = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1200)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/80 pb-5">
        <div className="space-y-1">
          <Link
            href="/umkm/escrow-status"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Status Escrow
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-text-heading tracking-tight">
            Pencairan Dana Escrow (Release)
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Evaluasi luaran deliverable dan setujui transfer dana dari rekening penampung ke dompet freelancer.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-xs font-bold shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verifikasi Deliverable KaryaHub</span>
        </div>
      </div>

      {isSuccess ? (
        <Card hover={false} className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-xl border-emerald-200 bg-surface">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-display text-text-heading">Proyek Selesai & Dana Diteruskan</h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Dana sebesar <strong>Rp 5.000.000</strong> telah ditransfer ke dompet saldo Budi Pratama beserta rating bintang {rating} dan ulasan resmi Anda.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-surface-alt border border-border text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">Nomor Transaksi:</span>
              <span className="font-mono font-bold text-text-heading">REL-KH-202410-0914</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Freelancer Penerima:</span>
              <span className="font-semibold text-text-heading">Budi Pratama</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border font-bold">
              <span>Nominal Dicairkan:</span>
              <span className="text-emerald-700 text-sm">Rp 5.000.000</span>
            </div>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="black" onClick={() => router.push("/umkm/escrow-status")} className="text-xs font-bold">
              Kembali ke Status Escrow
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Card hover={false} className="p-6 space-y-4 shadow-soft border-border/80">
              <div className="flex items-center gap-2 pb-3 border-b border-border/70">
                <FileCode2 className="w-4 h-4 text-primary" />
                <h2 className="text-base font-bold font-display text-text-heading">
                  Pemeriksaan Hasil Kerja (Deliverables)
                </h2>
              </div>
              <div className="p-4 rounded-xl bg-surface-alt border border-border space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-text-heading">Figma Master Files & Prototype Klik UI</span>
                  <span className="text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full text-[10px]">Lengkap</span>
                </div>
                <p className="text-text-muted leading-relaxed">
                  Semua wireframe, UI mobile iOS & Android, token warna, serta paket ekspor SVG telah diserahkan dan siap diinspeksi.
                </p>
                <a href="https://figma.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline">
                  <ExternalLink className="w-3.5 h-3.5" /> Buka Tautan Figma di Tab Baru
                </a>
              </div>
            </Card>

            <Card hover={false} className="p-6 space-y-4 shadow-soft border-border/80">
              <div className="flex items-center gap-2 pb-3 border-b border-border/70">
                <Award className="w-4 h-4 text-amber-500" />
                <h2 className="text-base font-bold font-display text-text-heading">Beri Penilaian & Ulasan Talenta</h2>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 transition-all text-xs font-bold ${
                        rating >= s ? "bg-amber-500/10 border-amber-500/40 text-amber-600" : "bg-surface border-border text-text-muted"
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      <span>{s} Bintang</span>
                    </button>
                  ))}
                </div>
                <div className="space-y-1 pt-2">
                  <label className="text-xs font-bold text-text-heading block">Testimoni / Catatan:</label>
                  <textarea
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full p-3 bg-surface-alt border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <Card hover={false} className="p-6 space-y-5 shadow-soft border-border/80 sticky top-24">
              <span className="text-xs font-extrabold uppercase tracking-wider text-text-muted block pb-3 border-b border-border/70">
                Ringkasan Pencairan Escrow
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">Proyek:</span>
                  <span className="font-bold text-text-heading text-right">Desain UI/UX Mobile App</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Freelancer:</span>
                  <span className="font-semibold text-text-heading">Budi Pratama</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border font-bold">
                  <span className="text-sm text-text-heading">Total Dana Dicairkan:</span>
                  <span className="text-xl font-extrabold text-emerald-700">Rp 5.000.000</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  onClick={handleRelease}
                  disabled={isSubmitting}
                  variant="black"
                  className="w-full h-12 text-xs font-bold shadow-md"
                >
                  {isSubmitting ? "Memproses Transfer Escrow..." : "Ya, Setujui & Cairkan Dana Escrow"}
                </Button>
                <p className="text-[10px] text-text-muted text-center leading-relaxed">
                  Pencairan ini bersifat final dan otomatis mentransfer dana dari penampungan KaryaHub ke dompet freelancer.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
