"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"
import {
  Lock,
  CheckCircle,
  Clock,
  AlertCircle,
  Shield,
  Download,
  HelpCircle,
  CreditCard,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Check
} from "lucide-react"
import { EscrowReleaseModal } from "@/components/dashboard/umkm/EscrowReleaseModal"

interface EscrowTransaction {
  id: string
  code: string
  jobTitle: string
  freelancer: string
  amount: number
  status: "HELD_IN_ESCROW" | "RELEASED" | "PENDING" | "REFUNDED"
  createdAt: string
  releasedAt?: string
  refundedAt?: string
  projectStatus: string
  daysRemaining?: number
  reason?: string
}

const INITIAL_ESCROWS: EscrowTransaction[] = [
  {
    id: "1",
    code: "ESC-2024-001",
    jobTitle: "Desain UI/UX & Prototipe Toko Online Mobile",
    freelancer: "Budi Pratama",
    amount: 5000000,
    status: "HELD_IN_ESCROW",
    createdAt: "05 Okt 2024",
    projectStatus: "IN_PROGRESS",
    daysRemaining: 8,
  },
  {
    id: "2",
    code: "ESC-2024-002",
    jobTitle: "Pembuatan Website Company Profile UMKM",
    freelancer: "Siti Rahma",
    amount: 7500000,
    status: "RELEASED",
    createdAt: "28 Sep 2024",
    releasedAt: "08 Okt 2024",
    projectStatus: "COMPLETED",
  },
  {
    id: "3",
    code: "ESC-2024-003",
    jobTitle: "Produksi 10 Video Reels & Konten TikTok",
    freelancer: "Alex Wijaya",
    amount: 3500000,
    status: "PENDING",
    createdAt: "10 Okt 2024",
    projectStatus: "WAITING_PAYMENT",
  },
  {
    id: "4",
    code: "ESC-2024-004",
    jobTitle: "Redesain Logo & Kemasan Kopi Drip",
    freelancer: "Dian Permata",
    amount: 4000000,
    status: "REFUNDED",
    createdAt: "15 Sep 2024",
    refundedAt: "20 Sep 2024",
    projectStatus: "CANCELLED",
    reason: "Freelancer mengundurkan diri karena kendala teknis (Refund Penuh 100%)",
  },
]

export default function EscrowStatusPage() {
  const [transactions, setTransactions] = useState<EscrowTransaction[]>(INITIAL_ESCROWS)
  const [filterStatus, setFilterStatus] = useState<string>("ALL")
  const [selectedForRelease, setSelectedForRelease] = useState<EscrowTransaction | null>(null)
  const [invoiceNotice, setInvoiceNotice] = useState<string | null>(null)

  const handleReleaseConfirm = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId
          ? { ...t, status: "RELEASED", releasedAt: "Hari ini", projectStatus: "COMPLETED" }
          : t
      )
    )
  }

  const filtered = transactions.filter((t) => {
    if (filterStatus === "ALL") return true
    return t.status === filterStatus
  })

  const stats = {
    totalLocked: transactions
      .filter((t) => t.status === "HELD_IN_ESCROW")
      .reduce((sum, t) => sum + t.amount, 0),
    totalReleased: transactions
      .filter((t) => t.status === "RELEASED")
      .reduce((sum, t) => sum + t.amount, 0),
    activeCount: transactions.filter((t) => t.status === "HELD_IN_ESCROW").length,
    pendingCount: transactions.filter((t) => t.status === "PENDING").length,
  }

  const getStatusBadge = (status: EscrowTransaction["status"]) => {
    switch (status) {
      case "HELD_IN_ESCROW":
        return <Badge variant="warning" className="gap-1 font-semibold"><Lock className="w-3 h-3" /> Dana Terkunci di Escrow</Badge>
      case "RELEASED":
        return <Badge variant="success" className="gap-1 font-semibold"><CheckCircle className="w-3 h-3" /> Dana Selesai Dicairkan</Badge>
      case "PENDING":
        return <Badge variant="info" className="gap-1 font-semibold"><Clock className="w-3 h-3" /> Menunggu Pembayaran Midtrans</Badge>
      case "REFUNDED":
        return <Badge variant="error" className="gap-1 font-semibold"><AlertCircle className="w-3 h-3" /> Refunded / Dikembalikan</Badge>
    }
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight">Status Escrow & Pembayaran Aman</h1>
          <p className="text-sm text-text-muted mt-1">Pembayaran aman — dana baru dicairkan setelah hasil kerja Anda setujui.</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold">
          <Shield className="w-4 h-4" /> Escrow Protection Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main Escrow Obsidian-Emerald Card */}
        <div className="p-6 md:col-span-2 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-radial from-emerald-500/15 to-transparent pointer-events-none rounded-full blur-2xl" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-300">Total Terkunci di Escrow</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Terproteksi
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-xs">Rp {stats.totalLocked.toLocaleString("id-ID")}</h2>
            <p className="text-xs text-slate-300 mt-1">Dana aman di rekening bersama resmi Midtrans KaryaHub</p>
          </div>
        </div>

        {/* Released Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Telah Dicairkan</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Selesai
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Rp {stats.totalReleased.toLocaleString("id-ID")}
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Telah ditransfer ke rekening freelancer</span>
          </p>
        </div>

        {/* Active Projects Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Proyek Aktif</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Berjalan
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {stats.activeCount} Transaksi
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Milestone dalam proses pengerjaan</span>
          </p>
        </div>
      </div>

      <Card className="p-4 bg-primary/5 border-primary/20 space-y-2">
        <h3 className="text-sm font-bold text-text-heading flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> Alur Perlindungan Escrow KaryaHub
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 bg-surface rounded-xl border border-border">
            <span className="font-bold block text-text-heading">1. Deposit Awal</span>
            <span className="text-[11px] text-text-muted">Dana dikunci via Midtrans</span>
          </div>
          <div className="p-2.5 bg-surface rounded-xl border border-border">
            <span className="font-bold block text-text-heading">2. Pengerjaan</span>
            <span className="text-[11px] text-text-muted">Freelancer mengeksekusi tugas</span>
          </div>
          <div className="p-2.5 bg-surface rounded-xl border border-border">
            <span className="font-bold block text-text-heading">3. Review Hasil</span>
            <span className="text-[11px] text-text-muted">Pemeriksaan & revisi luaran</span>
          </div>
          <div className="p-2.5 bg-surface rounded-xl border border-border">
            <span className="font-bold block text-text-heading">4. Pencairan</span>
            <span className="text-[11px] text-text-muted">Dana cair ke dompet talenta</span>
          </div>
        </div>
      </Card>

      <div className="flex gap-2 border-b border-border/70 pb-3 overflow-x-auto">
        {[
          { id: "ALL", label: "Semua Transaksi" },
          { id: "HELD_IN_ESCROW", label: "Terkunci (Held)" },
          { id: "RELEASED", label: "Selesai Dicairkan" },
          { id: "PENDING", label: "Menunggu Pembayaran" },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilterStatus(f.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all",
              filterStatus === f.id
                ? "bg-slate-950 text-white shadow-xs"
                : "bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200/90"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((t) => (
          <Card key={t.id} className="p-6 space-y-4 hover:border-primary/40 transition">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getStatusBadge(t.status)}
                  <span className="font-mono text-xs text-text-muted">{t.code}</span>
                  <span className="text-xs text-text-muted">• Dibuat {t.createdAt}</span>
                </div>
                <h3 className="text-base font-bold text-text-heading">{t.jobTitle}</h3>
                <p className="text-xs text-text-muted">Freelancer: <span className="font-semibold text-text-heading">{t.freelancer}</span></p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs text-text-muted">Nominal Transaksi</p>
                <p className="text-lg font-extrabold text-primary">Rp {t.amount.toLocaleString("id-ID")}</p>
              </div>
            </div>

            {t.reason && (
              <div className="p-3 bg-error-light border border-error/20 rounded-xl text-xs text-error font-medium">
                Catatan: {t.reason}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
              <div className="text-xs text-text-muted">
                {t.releasedAt && <span>Dicairkan pada: <strong className="text-text-heading">{t.releasedAt}</strong></span>}
                {t.refundedAt && <span>Dikembalikan pada: <strong className="text-text-heading">{t.refundedAt}</strong></span>}
                {t.status === "HELD_IN_ESCROW" && <span>Sisa waktu pengerjaan: <strong className="text-amber-600">{t.daysRemaining} hari</strong></span>}
              </div>

              <div className="flex items-center gap-2">
                {t.status === "HELD_IN_ESCROW" && (
                  <Link href={`/umkm/escrow-status/release/${t.id}`}>
                    <Button size="sm" variant="black" className="gap-1.5 text-xs font-bold shadow-xs">
                      Cairkan Dana (Release) <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    </Button>
                  </Link>
                )}
                {t.status === "PENDING" && (
                  <Link href={`/umkm/escrow-status/pay/${t.id}`}>
                    <Button size="sm" variant="black" className="gap-1.5 text-xs font-bold shadow-xs">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Bayar via Midtrans
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1.5 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border-slate-200/90 shadow-xs" 
                  onClick={() => {
                    setInvoiceNotice(`Bukti Escrow #${t.code} siap diunduh (PDF resmi).`)
                    setTimeout(() => setInvoiceNotice(null), 3000)
                  }}
                >
                  <Download className="w-3.5 h-3.5" /> Bukti Escrow
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {invoiceNotice && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs font-bold animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{invoiceNotice}</span>
        </div>
      )}

      <EscrowReleaseModal
        isOpen={Boolean(selectedForRelease)}
        transaction={selectedForRelease}
        onClose={() => setSelectedForRelease(null)}
        onConfirm={handleReleaseConfirm}
      />
    </div>
  )
}
