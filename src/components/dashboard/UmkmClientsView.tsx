"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Star, 
  FileCode2, 
  X, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

export interface ConnectedFreelancer {
  id: string
  name: string
  avatar: string
  role: string
  rating: number
  completedJobs: number
  skills: string[]
  project: {
    id: string
    title: string
    category: string
    budget: number
    escrowStatus: "LOCKED" | "RELEASED"
    progress: number
    deadline: string
    startedDate: string
    latestDeliverable: {
      title: string
      url: string
      type: "github" | "figma" | "document"
      submittedAt: string
      notes: string
    }
  }
}

const CONNECTED_TALENTS: ConnectedFreelancer[] = [
  {
    id: "john-doe",
    name: "John Doe",
    avatar: "JD",
    role: "Full Stack & Frontend Developer",
    rating: 4.9,
    completedJobs: 18,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    project: {
      id: "proj-1",
      title: "Website Redesign & E-Commerce Integration",
      category: "Web Development",
      budget: 5000000,
      escrowStatus: "LOCKED",
      progress: 65,
      deadline: "2 hari lagi (14 Okt 2024)",
      startedDate: "1 Okt 2024",
      latestDeliverable: {
        title: "Pull Request #14 - Modul Checkout & Integrasi Payment",
        url: "https://github.com/example/karyahub-store/pull/14",
        type: "github",
        submittedAt: "Kemarin, 16:45",
        notes: "Frontend page checkout dan integrasi sandbox Midtrans sudah siap di-review."
      }
    }
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    avatar: "JS",
    role: "Mobile App Engineer (React Native)",
    rating: 4.8,
    completedJobs: 12,
    skills: ["React Native", "Expo", "Redux", "PostgreSQL"],
    project: {
      id: "proj-2",
      title: "Mobile App Toko Mitra UMKM (Android & iOS)",
      category: "Mobile App",
      budget: 8000000,
      escrowStatus: "LOCKED",
      progress: 40,
      deadline: "1 minggu lagi (19 Okt 2024)",
      startedDate: "28 Sep 2024",
      latestDeliverable: {
        title: "Build APK Staging v0.4.0 & API Specs",
        url: "https://expo.dev/artifacts/build-0.4.0.apk",
        type: "document",
        submittedAt: "2 hari lalu",
        notes: "Sistem login, catalog browsing, dan keranjang belanja sudah bisa dicoba."
      }
    }
  },
  {
    id: "alex-johnson",
    name: "Alex Johnson",
    avatar: "AJ",
    role: "Senior UI/UX & Brand Designer",
    rating: 5.0,
    completedJobs: 24,
    skills: ["Figma", "UI/UX", "Packaging Design", "Vector"],
    project: {
      id: "proj-3",
      title: "Redesain Logo & Desain Kemasan Produk Kopi",
      category: "Design & Branding",
      budget: 3500000,
      escrowStatus: "LOCKED",
      progress: 90,
      deadline: "Besok (13 Okt 2024)",
      startedDate: "5 Okt 2024",
      latestDeliverable: {
        title: "Figma Master Design & Ready-to-Print Packaging Vector",
        url: "https://figma.com/file/demo-packaging-coffee",
        type: "figma",
        submittedAt: "Hari ini, 09:15",
        notes: "Semua varian rasa (Arabica, Robusta, Cold Brew) sudah selesai sesuai panduan."
      }
    }
  }
]

interface UmkmClientsViewProps {
  onOpenChat?: (contactId: string) => void
}

export function UmkmClientsView({ onOpenChat }: UmkmClientsViewProps) {
  const [selectedDeliverable, setSelectedDeliverable] = useState<ConnectedFreelancer | null>(null)
  const [filterQuery, setFilterQuery] = useState("")
  const [reviewToast, setReviewToast] = useState<string | null>(null)

  const filteredTalents = CONNECTED_TALENTS.filter(t => 
    t.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.project.title.toLowerCase().includes(filterQuery.toLowerCase())
  )

  const totalBudgetLocked = CONNECTED_TALENTS.reduce((acc, curr) => acc + curr.project.budget, 0)

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="border-b border-border/80 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/60 text-indigo-700 mb-2">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Talenta & Proyek Terhubung</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-text-heading tracking-tight">
            Freelancer & Kolaborator Aktif
          </h1>
          <p className="text-sm text-text-muted mt-1 max-w-xl">
            Pantau siapa saja talenta yang sedang mengerjakan proyek UMKM Anda, progres pekerjaan, dan koordinasi langsung via chat.
          </p>
        </div>

        <Link href="/umkm?tab=inbox">
          <Button variant="black" className="shadow-md hover:shadow-lg transition-all shrink-0">
            <MessageSquare className="w-4 h-4 mr-2" />
            Buka Semua Chat
          </Button>
        </Link>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Freelancer Aktif</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Vokasi
            </span>
          </div>
          <p className="text-2xl font-extrabold text-slate-950 tracking-tight">{CONNECTED_TALENTS.length} Orang</p>
          <p className="text-xs text-indigo-600 font-medium mt-2 pt-2 border-t border-slate-100">Terverifikasi & Bekerja</p>
        </Card>

        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Dana Terkunci Escrow</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Midtrans
            </span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 tracking-tight">Rp {totalBudgetLocked.toLocaleString('id-ID')}</p>
          <p className="text-xs text-emerald-600 font-medium mt-2 pt-2 border-t border-slate-100 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Aman di Rekber Resmi
          </p>
        </Card>

        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Proyek Berjalan</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              On-Track
            </span>
          </div>
          <p className="text-2xl font-extrabold text-slate-950 tracking-tight">{CONNECTED_TALENTS.length} Kontrak</p>
          <p className="text-xs text-blue-600 font-medium mt-2 pt-2 border-t border-slate-100">Sesuai Timeline Kerja</p>
        </Card>

        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Deliverables Review</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Persetujuan
            </span>
          </div>
          <p className="text-2xl font-extrabold text-amber-700 tracking-tight">3 Hasil Kerja</p>
          <p className="text-xs text-amber-600 font-medium mt-2 pt-2 border-t border-slate-100">Siap Ditinjau & Disetujui</p>
        </Card>
      </div>

      {/* List of Connected Freelancers & Projects */}
      <div className="space-y-4">
        {filteredTalents.map((talent) => (
          <Card key={talent.id} className="p-6 transition-all hover:border-indigo-200 shadow-soft">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Column: Talent Info */}
              <div className="flex items-start gap-4 min-w-[280px]">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
                  {talent.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-text-heading">{talent.name}</h3>
                    <span className="inline-flex items-center text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-1" />
                      {talent.rating}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted font-medium mt-0.5">{talent.role}</p>
                  <p className="text-[11px] text-text-muted mt-1">{talent.completedJobs} proyek terselesaikan sebelumnya</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {talent.skills.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-surface-alt border border-border text-text-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Column: Connected Project Details */}
              <div className="flex-1 lg:border-l lg:border-r border-border/80 lg:px-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {talent.project.category}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Deadline: <strong>{talent.project.deadline}</strong>
                  </span>
                </div>

                <h4 className="font-bold text-text-heading text-base mb-1.5">
                  {talent.project.title}
                </h4>

                <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
                  <span>Progres Pengerjaan</span>
                  <span className="font-bold text-text-heading">{talent.project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all"
                    style={{ width: `${talent.project.progress}%` }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-text-heading">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Rp {talent.project.budget.toLocaleString('id-ID')}</span>
                    <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                      Escrow Terkunci
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDeliverable(talent)}
                    className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold flex items-center gap-1 underline underline-offset-2"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    Lihat Hasil Kerja Terakhir →
                  </button>
                </div>
              </div>

              {/* Right Column: Direct Actions */}
              <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                <Link 
                  href={`/umkm?tab=inbox&contact=${talent.id}`}
                  className="flex-1 lg:flex-initial"
                >
                  <Button 
                    variant="black" 
                    size="sm" 
                    className="w-full text-xs font-semibold shadow-sm"
                    onClick={() => onOpenChat && onOpenChat(talent.id)}
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                    Kirim Pesan
                  </Button>
                </Link>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 lg:flex-initial text-xs"
                  onClick={() => setSelectedDeliverable(talent)}
                >
                  Review Hasil
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Deliverable Review Modal */}
      <AnimatePresence>
        {selectedDeliverable && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="w-full max-w-lg"
            >
              <Card hover={false} className="w-full p-6 bg-surface shadow-2xl relative">
                <button
                  type="button"
                  onClick={() => setSelectedDeliverable(null)}
                  className="absolute right-4 top-4 p-1.5 rounded-lg text-text-muted hover:text-text-heading hover:bg-surface-alt transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-4">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                    Review Deliverable Proyek
                  </span>
                  <h3 className="text-lg font-bold font-display text-text-heading mt-0.5">
                    {selectedDeliverable.project.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    Dikerjakan oleh: <strong className="text-text-heading">{selectedDeliverable.name}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-alt border border-border mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-text-heading">
                      {selectedDeliverable.project.latestDeliverable.title}
                    </span>
                    <span className="text-text-muted">
                      {selectedDeliverable.project.latestDeliverable.submittedAt}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    "{selectedDeliverable.project.latestDeliverable.notes}"
                  </p>
                  <div className="pt-2">
                    <a 
                      href={selectedDeliverable.project.latestDeliverable.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Buka Tautan Deliverable di Tab Baru
                    </a>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="flex gap-2">
                    <Button 
                      variant="black" 
                      className="flex-1 text-xs cursor-pointer"
                      onClick={() => {
                        setReviewToast(`Deliverable untuk ${selectedDeliverable.project.title} telah disetujui! Status proyek diperbarui.`)
                        setTimeout(() => setReviewToast(null), 3500)
                        setSelectedDeliverable(null)
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                      Setujui Deliverable
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-xs cursor-pointer"
                      onClick={() => {
                        setReviewToast(`Catatan revisi telah berhasil dikirimkan ke ${selectedDeliverable.name}.`)
                        setTimeout(() => setReviewToast(null), 3500)
                        setSelectedDeliverable(null)
                      }}
                    >
                      Minta Revisi
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs text-text-muted cursor-pointer"
                    onClick={() => setSelectedDeliverable(null)}
                  >
                    Tutup
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reviewToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 p-4 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{reviewToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
