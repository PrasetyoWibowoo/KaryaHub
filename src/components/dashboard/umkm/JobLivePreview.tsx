"use client"

import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ShieldCheck, HelpCircle } from "lucide-react"

interface PreviewProps {
  title: string
  category: string
  budget: string
  estimatedDays: string
  paymentType: string
  description: string
  selectedSkills: string[]
}

export function JobLivePreview({
  title,
  category,
  budget,
  estimatedDays,
  paymentType,
  description,
  selectedSkills,
}: PreviewProps) {
  const formatRupiah = (val: string | number) => {
    const num = typeof val === "string" ? parseInt(val.replace(/\D/g, "")) || 0 : val
    return "Rp " + num.toLocaleString("id-ID")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
          Live Pratinjau Lowongan
        </span>
        <Badge variant="primary" className="text-[10px]">Tampilan Freelancer</Badge>
      </div>

      <Card className="p-5 border-primary/40 shadow-lg space-y-4 bg-surface">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="success" className="text-[10px]">OPEN FOR BIDS</Badge>
          <span className="text-[11px] text-text-muted">Baru saja</span>
        </div>

        <div>
          <h3 className="font-bold text-text-heading text-base line-clamp-2">
            {title || "Judul Proyek UMKM Anda Akan Tampil di Sini"}
          </h3>
          <p className="text-xs text-text-muted mt-1">
            Kategori: <span className="font-semibold text-text-heading capitalize">{category.replace("-", " ")}</span>
          </p>
        </div>

        <div className="p-3 bg-surface-alt rounded-xl space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Budget Ditawarkan:</span>
            <span className="font-bold text-primary text-sm">{formatRupiah(budget)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Target Durasi:</span>
            <span className="font-semibold text-text-heading">{estimatedDays} Hari</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Model Pembayaran:</span>
            <span className="font-semibold text-text-heading capitalize">{paymentType}</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-text-heading mb-1.5">Deskripsi Singkat:</p>
          <p className="text-xs text-text-muted line-clamp-3 leading-relaxed">
            {description || "Rincian kebutuhan Anda akan terbaca oleh freelancer terverifikasi."}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-text-heading mb-1.5">Keahlian Dibutuhkan:</p>
          <div className="flex flex-wrap gap-1">
            {selectedSkills.map(s => (
              <span key={s} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-semibold">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-text-muted">
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> Terlindungi Escrow
          </span>
          <span>0 Pelamar</span>
        </div>
      </Card>

      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="leading-snug">
          Deskripsi rinci dan ekspektasi output jelas menerima hingga 4x proposal yang lebih relevan.
        </p>
      </div>
    </div>
  )
}
