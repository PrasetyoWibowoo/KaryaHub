"use client"

import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"
import { 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText, 
  Banknote, 
  Calendar, 
  Building2, 
  Search,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react"

const PROPOSALS = [
  { 
    id: "1", 
    jobTitle: "Desain UI/UX untuk Aplikasi Mobile Toko Online", 
    employerName: "Toko Berkah Jaya", 
    status: "PENDING", 
    proposedBudget: 5000000, 
    estimatedDays: 14, 
    submittedAt: "2 hari lalu", 
    coverLetter: "Saya memiliki pengalaman 3 tahun dalam UI/UX design dan telah mengerjakan lebih dari 10 aplikasi e-commerce lokal. Pendekatan saya berfokus pada user flow yang ringkas dan konversi checkout yang tinggi.",
    views: 5,
    deliverables: ["Wireframe Low-Fidelity", "Interactive Prototype Figma", "Design System & Asset Export"]
  },
  { 
    id: "2", 
    jobTitle: "Website Company Profile untuk UMKM Furniture", 
    employerName: "Mebel Jati Mas", 
    status: "ACCEPTED", 
    proposedBudget: 7500000, 
    estimatedDays: 21, 
    submittedAt: "5 hari lalu", 
    coverLetter: "Saya tertarik dengan proyek ini karena memiliki portofolio relevan di industri furnitur dan manufaktur kayu. Website akan dibangun menggunakan Next.js dan Tailwind CSS dengan optimasi SEO lokal.",
    views: 12,
    deliverables: ["Desain UI responsif", "Integrasi CMS Katalog Produk", "Deploy Vercel & Setup Domain"]
  },
  { 
    id: "3", 
    jobTitle: "Logo & Brand Identity untuk Startup F&B", 
    employerName: "Dapur Ibu", 
    status: "REJECTED", 
    proposedBudget: 3500000, 
    estimatedDays: 10, 
    submittedAt: "1 minggu lalu", 
    coverLetter: "Portfolio saya menunjukkan berbagai project branding makanan dan minuman nusantara. Saya menyediakan 3 opsi logo konsep beserta pedoman palet warna lengkap.",
    views: 8,
    deliverables: ["3 Konsep Logo", "Brand Guidelines PDF", "Kemasan & Merchandise Mockup"]
  },
  { 
    id: "4", 
    jobTitle: "Sistem Inventory & POS Berbasis Web", 
    employerName: "Warung Mitra Sejahtera", 
    status: "PENDING", 
    proposedBudget: 12000000, 
    estimatedDays: 30, 
    submittedAt: "3 hari lalu", 
    coverLetter: "Saya berpengalaman dalam development sistem POS dan manajemen stok UMKM. Arsitektur menggunakan Next.js App Router, PostgreSQL, dan print struk via thermal printer.",
    views: 3,
    deliverables: ["Modul Kasir & Barcode Scan", "Laporan Penjualan Real-time", "Dokumentasi & Training Pengguna"]
  }
]

export default function MyProposalsPage() {
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProposal, setSelectedProposal] = useState<typeof PROPOSALS[0] | null>(null)
  const [editNotice, setEditNotice] = useState<string | null>(null)

  const filteredProposals = PROPOSALS.filter(p => {
    const matchesStatus = filterStatus === "ALL" || p.status === filterStatus
    const matchesSearch = p.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.employerName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    if (status === "PENDING") {
      return (
        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="w-3 h-3 mr-1" /> Menunggu Review
        </span>
      )
    }
    if (status === "ACCEPTED") {
      return (
        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle className="w-3 h-3 mr-1" /> Diterima
        </span>
      )
    }
    if (status === "REJECTED") {
      return (
        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
          <XCircle className="w-3 h-3 mr-1" /> Belum Terpilih
        </span>
      )
    }
    return null
  }

  const stats = { 
    total: PROPOSALS.length, 
    pending: PROPOSALS.filter(p => p.status === "PENDING").length, 
    accepted: PROPOSALS.filter(p => p.status === "ACCEPTED").length, 
    rejected: PROPOSALS.filter(p => p.status === "REJECTED").length 
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="border-b border-border/80 pb-6">
        <h1 className="text-3xl font-bold font-display text-text-heading tracking-tight">Proposal Saya</h1>
        <p className="text-sm text-text-muted mt-1.5 max-w-xl">
          Pantau status penawaran harga, estimasi pengerjaan, dan respon pelaku UMKM terhadap proposal Anda.
        </p>
      </div>

      {/* Bespoke Proposal Lifecycle Command Console */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] p-4 sm:p-5">
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Pipeline Penawaran & Status
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Aktif: <strong className="text-slate-900">
                {filterStatus === "ALL" ? "Semua Proposal" : filterStatus === "PENDING" ? "Dalam Tinjauan" : filterStatus === "ACCEPTED" ? "Disetujui UMKM" : "Belum Terpilih"}
              </strong>
            </span>
            {filterStatus !== "ALL" && (
              <button
                type="button"
                onClick={() => setFilterStatus("ALL")}
                className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 underline underline-offset-2 ml-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: "ALL", label: "Semua Proposal", count: stats.total, icon: Send, caption: "Total Pengajuan" },
            { id: "PENDING", label: "Dalam Tinjauan", count: stats.pending, icon: Clock, caption: "Review UMKM", pulse: true },
            { id: "ACCEPTED", label: "Disetujui UMKM", count: stats.accepted, icon: CheckCircle, caption: "Siap Kerja" },
            { id: "REJECTED", label: "Belum Terpilih", count: stats.rejected, icon: XCircle, caption: "Arsip Penawaran" },
          ].map((stage) => {
            const isSelected = filterStatus === stage.id
            const Icon = stage.icon
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setFilterStatus(stage.id)}
                className={cn(
                  "text-left p-3.5 rounded-xl transition-all duration-200 flex flex-col justify-between relative group select-none min-h-[105px]",
                  isSelected
                    ? "bg-slate-950 text-white shadow-md ring-1 ring-slate-900"
                    : "bg-slate-50/80 hover:bg-slate-100/90 text-slate-700 hover:text-slate-950 border border-slate-200/70"
                )}
              >
                <div className="flex items-center justify-between gap-1 w-full mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon className={cn(
                      "w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110",
                      isSelected ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-800"
                    )} />
                    <span className={cn(
                      "text-[11px] font-bold truncate",
                      isSelected ? "text-slate-200" : "text-slate-600 group-hover:text-slate-900"
                    )}>
                      {stage.label}
                    </span>
                  </div>
                  {stage.pulse && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
                  )}
                </div>

                <div className="mt-auto">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={cn(
                      "text-2xl sm:text-3xl font-black font-display tracking-tight leading-none",
                      isSelected ? "text-white" : "text-slate-950"
                    )}>
                      {stage.count}
                    </span>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      isSelected ? "text-indigo-400" : "text-slate-500"
                    )}>
                      {isSelected ? "Terpilih" : stage.caption}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Modern Compact Search & Filter Toolbar */}
      <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Cari berdasarkan judul proyek atau nama UMKM..."
            className="w-full h-9.5 pl-10 pr-4 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
          />
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-xs text-slate-500 font-medium">
            Menampilkan <strong className="text-slate-900">{filteredProposals.length}</strong> proposal
          </span>
          {filterStatus !== "ALL" && (
            <button
              type="button"
              onClick={() => setFilterStatus("ALL")}
              className="text-xs font-bold text-rose-600 hover:text-rose-800"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.length === 0 ? (
          <Card hover={false} className="p-12 text-center bg-surface/60 border-dashed">
            <FileText className="w-12 h-12 text-text-muted mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-semibold text-text-heading mb-1">Tidak ada proposal yang sesuai</h3>
            <p className="text-xs text-text-muted">Coba ubah kata kunci pencarian atau ganti filter status di atas</p>
          </Card>
        ) : (
          filteredProposals.map((p) => (
            <Card key={p.id} className="p-6 transition-all hover:border-indigo-200">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    {getStatusBadge(p.status)}
                    <span className="text-xs text-text-muted">• Diajukan {p.submittedAt}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-heading mb-1.5 hover:text-indigo-600 transition-colors">
                    {p.jobTitle}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1 text-text-heading font-medium">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                      {p.employerName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      Dilihat {p.views} kali
                    </span>
                  </div>
                </div>
              </div>

              {/* Proposal Budget & Estimated Timeline */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 p-4 bg-surface-alt/80 rounded-xl border border-border/80">
                <div>
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Penawaran Budget</p>
                  <p className="font-bold text-text-heading flex items-center gap-1.5 text-sm sm:text-base">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    Rp {p.proposedBudget.toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Estimasi Waktu</p>
                  <p className="font-bold text-text-heading flex items-center gap-1.5 text-sm sm:text-base">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    {p.estimatedDays} Hari Kerja
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">Proteksi Escrow</p>
                  <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Dijamin Sistem
                  </p>
                </div>
              </div>

              {/* Cover Letter preview */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-text-heading mb-1">Catatan / Cover Letter:</p>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                  {p.coverLetter}
                </p>
              </div>

              {/* Card Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/60">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-initial"
                  onClick={() => setSelectedProposal(p)}
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Lihat Detail Proposal
                </Button>
                {p.status === "PENDING" && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs text-text-muted hover:text-text-heading"
                    onClick={() => {
                      setEditNotice(`Draf revisi untuk proposal #${p.id} telah dibuka.`)
                      setTimeout(() => setEditNotice(null), 3000)
                    }}
                  >
                    Edit Penawaran
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Detail Proposal Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <Card hover={false} className="w-full max-w-xl p-6 bg-surface shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedProposal(null)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-text-muted hover:text-text-heading hover:bg-surface-alt transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <div className="mb-2">
                {getStatusBadge(selectedProposal.status)}
              </div>
              <h2 className="text-xl font-bold font-display text-text-heading">
                {selectedProposal.jobTitle}
              </h2>
              <p className="text-xs text-text-muted mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                Pemberi Kerja: <strong className="text-text-heading">{selectedProposal.employerName}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-surface-alt mb-5 border border-border">
              <div>
                <p className="text-[11px] text-text-muted uppercase font-semibold">Budget Diajukan</p>
                <p className="text-base font-bold text-text-heading mt-0.5">
                  Rp {selectedProposal.proposedBudget.toLocaleString('id-ID')}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-text-muted uppercase font-semibold">Estimasi Durasi</p>
                <p className="text-base font-bold text-text-heading mt-0.5">
                  {selectedProposal.estimatedDays} Hari Kerja
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-heading mb-1.5">Cover Letter Lengkap</h4>
                <div className="p-3.5 rounded-xl bg-surface border border-border text-xs text-text-body leading-relaxed">
                  {selectedProposal.coverLetter}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-heading mb-1.5">Rencana Deliverables</h4>
                <ul className="space-y-1.5">
                  {selectedProposal.deliverables.map((item, idx) => (
                    <li key={idx} className="text-xs text-text-muted flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedProposal(null)}
              >
                Tutup
              </Button>
            </div>
          </Card>
        </div>
      )}

      {editNotice && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs font-bold animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{editNotice}</span>
        </div>
      )}
    </div>
  )
}



