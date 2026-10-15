"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { DollarSign, ShieldCheck, CheckCircle2 } from "lucide-react"

export const BUDGET_PRESETS = [
  { label: "Rp 1.5jt", value: 1500000 },
  { label: "Rp 3.5jt", value: 3500000 },
  { label: "Rp 6jt", value: 6000000 },
  { label: "Rp 10jt+", value: 10000000 },
]

interface Step3Props {
  paymentType: "fixed" | "milestone"
  setPaymentType: (v: "fixed" | "milestone") => void
  budget: string
  setBudget: (v: string) => void
  estimatedDays: string
  setEstimatedDays: (v: string) => void
  isSubmitting: boolean
  onBack: () => void
  onPreview: () => void
}

export function CreateJobStep3({
  paymentType,
  setPaymentType,
  budget,
  setBudget,
  estimatedDays,
  setEstimatedDays,
  isSubmitting,
  onBack,
  onPreview,
}: Step3Props) {
  const formatRupiah = (val: string | number) => {
    const num = typeof val === "string" ? parseInt(val.replace(/\D/g, "")) || 0 : val
    return "Rp " + num.toLocaleString("id-ID")
  }

  return (
    <Card className="p-6 sm:p-8 space-y-6">
      <div className="border-b border-border/70 pb-4">
        <h2 className="text-lg font-bold text-text-heading flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" /> Anggaran & Escrow
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setPaymentType("fixed")}
          className={`p-3.5 rounded-xl border text-left transition ${
            paymentType === "fixed" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border/80 bg-surface"
          }`}
        >
          <p className="font-bold text-text-heading text-sm">Fixed Price</p>
          <p className="text-xs text-text-muted mt-0.5">Satu pembayaran akhir</p>
        </button>
        <button
          type="button"
          onClick={() => setPaymentType("milestone")}
          className={`p-3.5 rounded-xl border text-left transition ${
            paymentType === "milestone" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border/80 bg-surface"
          }`}
        >
          <p className="font-bold text-text-heading text-sm">Milestone</p>
          <p className="text-xs text-text-muted mt-0.5">Bertahap per progres</p>
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-heading mb-2">Anggaran Proyek (IDR)</label>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {BUDGET_PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setBudget(p.value.toString())}
              className={`p-2 rounded-xl border text-center text-xs transition ${
                budget === p.value.toString() ? "border-primary bg-primary/10 text-primary font-bold" : "border-border bg-surface"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-sm text-text-muted">Rp</span>
          <input
            type="number"
            min="100000"
            step="50000"
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full h-11 pl-12 pr-4 rounded-xl border border-border bg-surface text-text-heading font-semibold text-base focus:ring-2 focus:ring-primary/20 outline-none"
            placeholder="3500000"
          />
        </div>
        <p className="text-xs text-text-muted mt-1.5">
          Nominal: <span className="font-bold text-primary">{formatRupiah(budget)}</span>
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-heading mb-2">Target Durasi Pengerjaan</label>
        <div className="grid grid-cols-4 gap-2">
          {["3", "7", "14", "30"].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setEstimatedDays(d)}
              className={`p-2 rounded-xl border text-center text-xs transition ${
                estimatedDays === d ? "border-primary bg-primary/10 text-primary font-bold" : "border-border bg-surface"
              }`}
            >
              {d} Hari
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-emerald-500/10 border border-primary/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-text-heading">Garansi Escrow KaryaHub</h4>
          <p className="text-xs text-text-body mt-0.5">
            Dana {formatRupiah(budget)} aman tersimpan dan baru dicairkan setelah hasil pekerjaan disetujui.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/70">
        <Button type="button" variant="outline" onClick={onBack}>← Kembali</Button>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={onPreview}>Pratinjau</Button>
          <Button type="submit" disabled={isSubmitting} className="px-8 shadow-md shadow-primary/20">
            {isSubmitting ? "Mempublikasikan..." : "Publikasikan Proyek"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
