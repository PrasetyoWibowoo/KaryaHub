"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Download 
} from "lucide-react"
import { EscrowPaymentMethods } from "./EscrowPaymentMethods"
import { EscrowPaymentSummary } from "./EscrowPaymentSummary"

export interface EscrowJobPayload {
  id: string
  code: string
  title: string
  freelancerName: string
  freelancerRole: string
  amount: number
  estimatedDays: number
  deliverables: string[]
}

const DEFAULT_ESCROWS: Record<string, EscrowJobPayload> = {
  "3": {
    id: "3",
    code: "ESC-2024-003",
    title: "Produksi 10 Video Reels & Konten TikTok",
    freelancerName: "Alex Wijaya",
    freelancerRole: "Content Creator & Video Editor",
    amount: 3500000,
    estimatedDays: 14,
    deliverables: [
      "10 Video Reels resolusi 1080x1920 (9:16)",
      "Motion graphics & hook copywriting",
      "Format .mp4 siap posting Instagram & TikTok",
      "Lisensi komersial UMKM tanpa batas waktu"
    ]
  },
  "1": {
    id: "1",
    code: "ESC-2024-001",
    title: "Desain UI/UX & Prototipe Toko Online Mobile",
    freelancerName: "Budi Pratama",
    freelancerRole: "Senior UI/UX Specialist",
    amount: 5000000,
    estimatedDays: 12,
    deliverables: [
      "Design System & Color Tokens Figma",
      "Prototipe interaktif 25+ halaman utama",
      "Aset ekspor @1x, @2x, @3x & Icon pack SVG"
    ]
  },
  "c1": {
    id: "c1",
    code: "ESC-2024-005",
    title: "Desain UI/UX & Prototipe Toko Online Mobile",
    freelancerName: "Budi Pratama",
    freelancerRole: "Senior Product Designer",
    amount: 4800000,
    estimatedDays: 12,
    deliverables: [
      "Design System & Color Tokens (Figma)",
      "Wireflow lengkap 25+ halaman utama",
      "Prototipe interaktif clickable",
      "Asset export & Icon pack SVG"
    ]
  }
}

export function EscrowPaymentView({ escrowId = "3" }: { escrowId?: string }) {
  const router = useRouter()
  const job = DEFAULT_ESCROWS[escrowId] || {
    id: escrowId,
    code: `ESC-2024-00${escrowId}`,
    title: "Kontrak Kerja Talenta Digital UMKM",
    freelancerName: "Talenta Terpilih",
    freelancerRole: "Digital Specialist",
    amount: 3500000,
    estimatedDays: 14,
    deliverables: ["Hasil kerja sesuai brief proyek terlampir"]
  }

  const [paymentMethod, setPaymentMethod] = useState<"qris" | "va" | "ewallet" | "card">("qris")
  const [selectedBank, setSelectedBank] = useState<"bca" | "mandiri" | "bri" | "bni">("bca")
  const [copiedVa, setCopiedVa] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [downloadNotice, setDownloadNotice] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(895)

  useEffect(() => {
    if (timerSeconds <= 0 || isSuccess) return
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [timerSeconds, isSuccess])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const vaNumbers = {
    bca: "8277 0812 3456 7890",
    mandiri: "8890 8123 4567 8901",
    bri: "1024 8123 4567 8902",
    bni: "9880 8123 4567 8903"
  }

  const handleCopyVa = () => {
    navigator.clipboard?.writeText(vaNumbers[selectedBank].replace(/\s/g, ""))
    setCopiedVa(true)
    setTimeout(() => setCopiedVa(false), 2000)
  }

  const handleSimulatePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1400)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/80 pb-5">
        <div className="space-y-1">
          <Link
            href="/umkm/escrow-status"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Status Escrow
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-text-heading tracking-tight">
              Pembayaran & Penguncian Escrow
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
              Midtrans Gateway
            </span>
          </div>
          <p className="text-xs sm:text-sm text-text-muted">
            Amankan dana proyek Anda di rekening penampung bersama KaryaHub sebelum pekerjaan dimulai.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Midtrans Vault</span>
          </div>
        </div>
      </div>
      {isSuccess ? (
        <Card hover={false} className="p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-xl border-emerald-200/80 bg-surface">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
              Escrow Berhasil Terkunci
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-heading">
              Pembayaran Terverifikasi & Aman!
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
              Dana sebesar <strong>Rp {job.amount.toLocaleString("id-ID")}</strong> kini tersimpan aman di rekening penampung bersama KaryaHub dan siap dikerjakan oleh <strong>{job.freelancerName}</strong>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-alt border border-border text-left space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2.5 border-b border-border">
              <span className="text-text-muted">Nomor Transaksi Midtrans:</span>
              <span className="font-mono font-bold text-text-heading">TRX-MIDTRANS-202410-89412</span>
            </div>
            <div className="flex justify-between items-center pb-2.5 border-b border-border">
              <span className="text-text-muted">Kode Escrow Sistem:</span>
              <span className="font-mono font-bold text-primary">{job.code}</span>
            </div>
            <div className="flex justify-between items-center pb-2.5 border-b border-border">
              <span className="text-text-muted">Proyek Target:</span>
              <span className="font-semibold text-text-heading text-right">{job.title}</span>
            </div>
            <div className="flex justify-between items-center pb-2.5 border-b border-border">
              <span className="text-text-muted">Freelancer Penerima:</span>
              <span className="font-semibold text-text-heading">{job.freelancerName}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-text-muted font-bold">Total Dana Diamankan:</span>
              <span className="text-base font-extrabold text-emerald-700">
                Rp {job.amount.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {downloadNotice && (
            <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold rounded-xl">
              ✓ Kuitansi PDF resmi berhasil digenerate dan tersimpan di riwayat berkas.
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setDownloadNotice(true)
                setTimeout(() => setDownloadNotice(false), 3000)
              }}
              className="w-full sm:w-auto text-xs font-bold"
            >
              <Download className="w-4 h-4 mr-2" /> Unduh Kuitansi PDF
            </Button>
            <Button
              variant="black"
              onClick={() => router.push("/umkm/escrow-status")}
              className="w-full sm:w-auto text-xs font-bold shadow-md shadow-slate-900/10"
            >
              Lihat Daftar Status Escrow →
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <EscrowPaymentMethods
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              selectedBank={selectedBank}
              setSelectedBank={setSelectedBank}
              timerFormatted={formatTime(timerSeconds)}
              copiedVa={copiedVa}
              onCopyVa={handleCopyVa}
              vaNumber={vaNumbers[selectedBank]}
            />
          </div>
          <div className="lg:col-span-5">
            <EscrowPaymentSummary
              job={job}
              isProcessing={isProcessing}
              onSimulatePayment={handleSimulatePayment}
            />
          </div>
        </div>
      )}
    </div>
  )
}
