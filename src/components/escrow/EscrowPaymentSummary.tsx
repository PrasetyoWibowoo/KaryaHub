"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Lock, Clock } from "lucide-react"

interface EscrowJobPayload {
  id: string
  code: string
  title: string
  freelancerName: string
  freelancerRole: string
  amount: number
  estimatedDays: number
  deliverables: string[]
}

interface EscrowPaymentSummaryProps {
  job: EscrowJobPayload
  isProcessing: boolean
  onSimulatePayment: () => void
}

export function EscrowPaymentSummary({
  job,
  isProcessing,
  onSimulatePayment
}: EscrowPaymentSummaryProps) {
  return (
    <Card hover={false} className="p-6 space-y-5 shadow-soft border-border/80 sticky top-24">
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <span className="text-xs font-extrabold uppercase tracking-wider text-text-muted">
          Ringkasan Deposit Proyek
        </span>
        <span className="font-mono text-xs font-bold text-primary">{job.code}</span>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-text-heading text-sm sm:text-base leading-snug">
          {job.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="font-semibold text-text-heading">{job.freelancerName}</span>
          <span>•</span>
          <span>{job.freelancerRole}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg font-semibold mt-1">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Estimasi Pengerjaan: <strong>{job.estimatedDays} Hari</strong></span>
        </div>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-border/60">
        <span className="text-xs font-bold text-text-heading block">Luaran Target (Deliverables):</span>
        <ul className="text-[11px] text-text-muted space-y-1">
          {job.deliverables.map((item, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2 pt-3 border-t border-border/70 text-xs">
        <div className="flex justify-between">
          <span className="text-text-muted">Nilai Kontrak Proyek:</span>
          <span className="font-bold text-text-heading">Rp {job.amount.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-emerald-700 font-medium">
          <span className="flex items-center gap-1">
            <span>Biaya Platform KaryaHub:</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 rounded text-emerald-800 font-bold">Subsidi SDG 8</span>
          </span>
          <span>Rp 0</span>
        </div>
        <div className="flex justify-between text-emerald-700 font-medium">
          <span>Biaya Payment Gateway Midtrans:</span>
          <span>Rp 0 (Gratis)</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-border font-bold">
          <span className="text-sm text-text-heading">Total Deposit Escrow:</span>
          <span className="text-xl font-extrabold text-emerald-700">Rp {job.amount.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Button
          onClick={onSimulatePayment}
          disabled={isProcessing}
          variant="black"
          className="w-full h-12 text-xs font-bold shadow-md shadow-slate-950/15"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Memverifikasi Pembayaran Sandbox...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              Bayar & Kunci Dana di Escrow
            </span>
          )}
        </Button>
        <p className="text-[10px] text-text-muted text-center leading-relaxed">
          Menekan tombol di atas akan memvalidasi transfer sandbox Midtrans dan mengaktifkan proteksi rekening penampung bersama.
        </p>
      </div>
    </Card>
  )
}
