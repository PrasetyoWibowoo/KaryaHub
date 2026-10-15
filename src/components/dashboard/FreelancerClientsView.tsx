"use client"

import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Building2, 
  Briefcase, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Upload, 
  X, 
  CheckCircle2,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

export interface ConnectedClient {
  id: string
  name: string
  avatar: string
  owner: string
  location: string
  category: string
  project: {
    id: string
    title: string
    budget: number
    escrowStatus: "SECURED" | "RELEASED"
    progress: number
    deadline: string
    startedDate: string
    milestone: string
  }
}

const CONNECTED_CLIENTS: ConnectedClient[] = [
  {
    id: "toko-berkah-jaya",
    name: "Toko Berkah Jaya",
    avatar: "TB",
    owner: "Bpk. H. Rahmat",
    location: "Bandung, Jawa Barat",
    category: "Retail & E-Commerce",
    project: {
      id: "proj-1",
      title: "Desain UI/UX untuk Aplikasi Mobile Toko Online",
      budget: 5000000,
      escrowStatus: "SECURED",
      progress: 75,
      deadline: "4 hari lagi (16 Okt 2024)",
      startedDate: "2 Okt 2024",
      milestone: "Desain Prototype & Design Tokens"
    }
  },
  {
    id: "mebel-jati-mas",
    name: "Mebel Jati Mas",
    avatar: "MJ",
    owner: "Ibu Kartika",
    location: "Jepara, Jawa Tengah",
    category: "Manufaktur & Furnitur",
    project: {
      id: "proj-2",
      title: "Website Company Profile untuk UMKM Furniture",
      budget: 7500000,
      escrowStatus: "SECURED",
      progress: 50,
      deadline: "10 hari lagi (22 Okt 2024)",
      startedDate: "28 Sep 2024",
      milestone: "Integrasi Katalog Produk & SEO"
    }
  },
  {
    id: "warung-mitra-sejahtera",
    name: "Warung Mitra Sejahtera",
    avatar: "WM",
    owner: "Bpk. Hendra",
    location: "Surabaya, Jawa Timur",
    category: "F&B & Retail POS",
    project: {
      id: "proj-3",
      title: "Sistem Inventory & POS Berbasis Web",
      budget: 12000000,
      escrowStatus: "SECURED",
      progress: 95,
      deadline: "1 hari lagi (13 Okt 2024)",
      startedDate: "15 Sep 2024",
      milestone: "Pengujian Thermal Printer & UAT"
    }
  }
]

interface FreelancerClientsViewProps {
  onOpenChat?: (contactId: string) => void
}

export function FreelancerClientsView({ onOpenChat }: FreelancerClientsViewProps) {
  const [selectedSubmit, setSelectedSubmit] = useState<ConnectedClient | null>(null)
  const [deliverableUrl, setDeliverableUrl] = useState("")
  const [deliverableNotes, setDeliverableNotes] = useState("")
  const [submitToast, setSubmitToast] = useState<string | null>(null)

  const totalContract = CONNECTED_CLIENTS.reduce((acc, curr) => acc + curr.project.budget, 0)

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitToast(`Deliverable berhasil dikirimkan ke ${selectedSubmit?.name}! Klien menerima notifikasi review.`)
    setTimeout(() => setSubmitToast(null), 3500)
    setSelectedSubmit(null)
    setDeliverableUrl("")
    setDeliverableNotes("")
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="border-b border-border/80 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/60 text-indigo-700 mb-2">
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Klien UMKM Terhubung</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-text-heading tracking-tight">
            Klien & Proyek Berjalan
          </h1>
          <p className="text-sm text-text-muted mt-1 max-w-xl">
            Pantau seluruh pelaku UMKM yang mempekerjakan Anda, status kontrak escrow, dan serahkan hasil kerja tepat waktu.
          </p>
        </div>

        <Link href="/freelancer?tab=inbox">
          <Button variant="black" className="shadow-md hover:shadow-lg transition-all shrink-0">
            <MessageSquare className="w-4 h-4 mr-2" />
            Buka Inbox Chat
          </Button>
        </Link>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Klien UMKM Aktif</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Aktif
            </span>
          </div>
          <p className="text-2xl font-extrabold text-slate-950 tracking-tight">{CONNECTED_CLIENTS.length} Pelaku Usaha</p>
          <p className="text-xs text-indigo-600 font-medium mt-2 pt-2 border-t border-slate-100">Kontrak Aktif Berjalan</p>
        </Card>

        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Nilai Kontrak</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Escrow Aman
            </span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 tracking-tight">Rp {totalContract.toLocaleString('id-ID')}</p>
          <p className="text-xs text-emerald-600 font-medium mt-2 pt-2 border-t border-slate-100 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Diamankan di Escrow
          </p>
        </Card>

        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Deadline Terdekat</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Perhatian
            </span>
          </div>
          <p className="text-2xl font-extrabold text-amber-700 tracking-tight">1 Hari Lagi</p>
          <p className="text-xs text-amber-600 font-medium mt-2 pt-2 border-t border-slate-100 truncate">
            Sistem Inventory POS (Warung Mitra)
          </p>
        </Card>
      </div>

      {/* List of Connected Clients */}
      <div className="space-y-4">
        {CONNECTED_CLIENTS.map((client) => (
          <Card key={client.id} className="p-6 transition-all hover:border-indigo-200 shadow-soft">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Column: Client Profile */}
              <div className="flex items-start gap-4 min-w-[280px]">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
                  {client.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-base text-text-heading">{client.name}</h3>
                  <p className="text-xs text-text-muted mt-0.5 font-medium">Owner: {client.owner}</p>
                  <p className="text-[11px] text-text-muted flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-indigo-600" />
                    {client.location}
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-alt border border-border text-text-muted">
                    {client.category}
                  </span>
                </div>
              </div>

              {/* Middle Column: Project Info */}
              <div className="flex-1 lg:border-l lg:border-r border-border/80 lg:px-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {client.project.milestone}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Batas Waktu: <strong>{client.project.deadline}</strong>
                  </span>
                </div>

                <h4 className="font-bold text-text-heading text-base mb-1.5">
                  {client.project.title}
                </h4>

                <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
                  <span>Progres Pengerjaan</span>
                  <span className="font-bold text-text-heading">{client.project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                    style={{ width: `${client.project.progress}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-text-heading">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Nilai Kontrak: Rp {client.project.budget.toLocaleString('id-ID')}</span>
                  <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                    Escrow Aktif
                  </span>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                <Link 
                  href={`/freelancer?tab=inbox&contact=${client.id}`}
                  className="flex-1 lg:flex-initial"
                >
                  <Button 
                    variant="black" 
                    size="sm" 
                    className="w-full text-xs font-semibold shadow-sm"
                    onClick={() => onOpenChat && onOpenChat(client.id)}
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                    Kirim Pesan
                  </Button>
                </Link>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 lg:flex-initial text-xs"
                  onClick={() => setSelectedSubmit(client)}
                >
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  Kirim Hasil Kerja
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Submit Deliverable */}
      {selectedSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <Card hover={false} className="w-full max-w-lg p-6 bg-surface shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedSubmit(null)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-text-muted hover:text-text-heading hover:bg-surface-alt transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                Serahkan Hasil Pekerjaan (Deliverable)
              </span>
              <h3 className="text-lg font-bold font-display text-text-heading mt-0.5">
                {selectedSubmit.project.title}
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Klien Penerima: <strong className="text-text-heading">{selectedSubmit.name}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmitDeliverable} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-heading mb-1.5">
                  Tautan File Hasil Kerja (GitHub PR, Figma, Drive, atau Link Demo) <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/... atau https://figma.com/..."
                  value={deliverableUrl}
                  onChange={(e) => setDeliverableUrl(e.target.value)}
                  className="w-full h-11 px-3.5 bg-surface-alt border border-border rounded-xl text-sm text-text-heading placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-heading mb-1.5">
                  Catatan untuk Klien UMKM <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Jelaskan ringkasan fitur yang diselesaikan, cara pengujian, dan instruksi peninjauan..."
                  value={deliverableNotes}
                  onChange={(e) => setDeliverableNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-surface-alt border border-border rounded-xl text-sm text-text-heading placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 text-xs text-emerald-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Setelah klien menyetujui hasil kerja, dana escrow sebesar Rp {selectedSubmit.project.budget.toLocaleString('id-ID')} akan otomatis dicairkan ke saldo dompet Anda.</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedSubmit(null)}
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  variant="black" 
                  size="sm"
                >
                  Kirimkan ke Klien
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {submitToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{submitToast}</span>
        </div>
      )}
    </div>
  )
}
