"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ProjectPipelineConsole } from "@/components/dashboard/ProjectPipelineConsole"
import { cn } from "@/lib/utils"
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  MessageSquare, 
  ArrowUpRight, 
  ShieldCheck, 
  Search, 
  Filter, 
  Calendar, 
  Building2, 
  FileText, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  CheckCircle,
  FileCheck2,
  Lock,
  ArrowRight,
  TrendingUp,
  X
} from "lucide-react"

interface Milestone {
  id: string
  title: string
  status: "APPROVED" | "IN_PROGRESS" | "REVIEW" | "PENDING"
  percent: number
  payout: number
  date?: string
  dueDate?: string
}

interface ProjectContract {
  id: string
  title: string
  client: string
  clientRating: number
  category: string
  budget: number
  escrowStatus: "LOCKED_SAFE" | "RELEASED"
  startDate: string
  deadline: string
  totalProgress: number
  status: "IN_PROGRESS" | "REVIEW" | "COMPLETED"
  currentMilestone: string
  milestones: Milestone[]
}

const INITIAL_PROJECTS: ProjectContract[] = [
  {
    id: "proj-1",
    title: "Desain UI/UX untuk Aplikasi Mobile Toko Online",
    client: "Toko Berkah Jaya",
    clientRating: 4.8,
    category: "UI/UX & Mobile",
    budget: 5000000,
    escrowStatus: "LOCKED_SAFE",
    startDate: "10 Okt 2026",
    deadline: "24 Okt 2026 (7 hari lagi)",
    totalProgress: 75,
    status: "IN_PROGRESS",
    currentMilestone: "Milestone 3: Interactive High-Fi Prototype Figma",
    milestones: [
      { id: "m-1", title: "User Flow, Wireframe & Arsitektur Informasi", status: "APPROVED", percent: 100, payout: 1250000, date: "12 Okt 2026" },
      { id: "m-2", title: "Design System, Typography & Component Kit", status: "APPROVED", percent: 100, payout: 1250000, date: "15 Okt 2026" },
      { id: "m-3", title: "High-Fidelity Prototype Mobile (iOS & Android)", status: "IN_PROGRESS", percent: 75, payout: 1500000, dueDate: "19 Okt 2026" },
      { id: "m-4", title: "Handover Asset, Spec Dev & Design Token Export", status: "PENDING", percent: 0, payout: 1000000, dueDate: "24 Okt 2026" },
    ]
  },
  {
    id: "proj-2",
    title: "Website Company Profile & Katalog Furniture UMKM",
    client: "Mebel Jati Mas",
    clientRating: 4.9,
    category: "Web Development",
    budget: 7500000,
    escrowStatus: "LOCKED_SAFE",
    startDate: "5 Okt 2026",
    deadline: "26 Okt 2026 (10 hari lagi)",
    totalProgress: 50,
    status: "IN_PROGRESS",
    currentMilestone: "Milestone 2: Integrasi Katalog Produk & WhatsApp Checkout Flow",
    milestones: [
      { id: "m-21", title: "Setup Next.js, Tailwind CSS & Responsive Homepage", status: "APPROVED", percent: 100, payout: 2500000, date: "11 Okt 2026" },
      { id: "m-22", title: "Integrasi Katalog Produk & WhatsApp Checkout Flow", status: "IN_PROGRESS", percent: 50, payout: 2500000, dueDate: "20 Okt 2026" },
      { id: "m-23", title: "Formulir Kontak, SEO Lokal & Setup Domain Custom", status: "PENDING", percent: 0, payout: 2500000, dueDate: "26 Okt 2026" },
    ]
  },
  {
    id: "proj-3",
    title: "Automasi Rekap Transaksi & POS Kasir Web UMKM",
    client: "Warung Mitra Sejahtera",
    clientRating: 5.0,
    category: "Software Development",
    budget: 12000000,
    escrowStatus: "LOCKED_SAFE",
    startDate: "14 Okt 2026",
    deadline: "14 Nov 2026 (28 hari lagi)",
    totalProgress: 20,
    status: "IN_PROGRESS",
    currentMilestone: "Milestone 1: Perancangan Skema Database PostgreSQL & Modul Stok",
    milestones: [
      { id: "m-31", title: "Database Schema & Modul Manajemen Stok Bahan", status: "IN_PROGRESS", percent: 60, payout: 4000000, dueDate: "22 Okt 2026" },
      { id: "m-32", title: "Modul Kasir Kas Cepat & Cetak Struk Bluetooth", status: "PENDING", percent: 0, payout: 4000000, dueDate: "02 Nov 2026" },
      { id: "m-33", title: "Dashboard Laporan Keuangan Real-time & Deploy", status: "PENDING", percent: 0, payout: 4000000, dueDate: "14 Nov 2026" },
    ]
  },
  {
    id: "proj-4",
    title: "Rebranding Identitas Visual & Kemasan Produk Kopi",
    client: "Kopi Kenangan Senja",
    clientRating: 4.7,
    category: "Branding & Desain",
    budget: 3500000,
    escrowStatus: "RELEASED",
    startDate: "20 Sep 2026",
    deadline: "5 Okt 2026",
    totalProgress: 100,
    status: "COMPLETED",
    currentMilestone: "Proyek Selesai & Dana Dicairkan ke Dompet",
    milestones: [
      { id: "m-41", title: "Eksplorasi Konsep Logo & Brand Guidelines", status: "APPROVED", percent: 100, payout: 1500000, date: "26 Sep 2026" },
      { id: "m-42", title: "Mockup Kemasan Sachet, Paper Cup & Pouch", status: "APPROVED", percent: 100, payout: 2000000, date: "05 Okt 2026" },
    ]
  }
]

export default function FreelancerProjectsPage() {
  const [projects, setProjects] = useState<ProjectContract[]>(INITIAL_PROJECTS)
  const [filterStatus, setFilterStatus] = useState<"ALL" | "IN_PROGRESS" | "REVIEW" | "COMPLETED">("ALL")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("proj-1")
  
  // Deliverable Submission Modal State
  const [modalProject, setModalProject] = useState<ProjectContract | null>(null)
  const [deliverableUrl, setDeliverableUrl] = useState("")
  const [deliverableNotes, setDeliverableNotes] = useState("")
  const [selectedMilestoneId, setSelectedMilestoneId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 4500)
  }

  const handleOpenDeliverableModal = (proj: ProjectContract) => {
    setModalProject(proj)
    const inProgressM = proj.milestones.find(m => m.status === "IN_PROGRESS") || proj.milestones[0]
    setSelectedMilestoneId(inProgressM.id)
    setDeliverableUrl("")
    setDeliverableNotes("")
  }

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault()
    if (!modalProject) return

    setIsSubmitting(true)

    setTimeout(() => {
      setProjects(prev => prev.map(p => {
        if (p.id !== modalProject.id) return p
        const updatedMilestones = p.milestones.map(m => {
          if (m.id === selectedMilestoneId) {
            return { ...m, status: "REVIEW" as const, percent: 100 }
          }
          return m
        })
        return {
          ...p,
          status: "REVIEW" as const,
          milestones: updatedMilestones,
          currentMilestone: "Menunggu Konfirmasi Klien UMKM untuk Rilis Escrow"
        }
      }))

      setIsSubmitting(false)
      setModalProject(null)
      triggerToast(`Deliverable untuk "${modalProject.title}" berhasil diserahkan! Klien telah menerima notifikasi verifikasi escrow.`)
    }, 1000)
  }

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filterStatus === "ALL" || p.status === filterStatus
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Quick statistics
  const totalActive = projects.filter(p => p.status === "IN_PROGRESS").length
  const totalReview = projects.filter(p => p.status === "REVIEW").length
  const totalCompleted = projects.filter(p => p.status === "COMPLETED").length
  const totalEscrowProtected = projects
    .filter(p => p.escrowStatus === "LOCKED_SAFE")
    .reduce((acc, curr) => acc + curr.budget, 0)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-slate-950 text-white shadow-2xl border border-emerald-500/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold leading-relaxed">{toastMessage}</p>
          <button 
            type="button" 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Command Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl glass-card relative overflow-hidden border border-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Workspace Talenta</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Escrow Proteksi Penuh
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-display">
            List Proyek & Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Pantau tahapan pengerjaan proyek aktif, laporkan progres milestone, dan serahkan deliverable ke klien UMKM.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link href="/freelancer/my-proposals">
            <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 text-xs font-bold h-9 border-slate-200 hover:border-slate-300 shadow-xs">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
              Buka Proposal Saya
            </Button>
          </Link>
          <Link href="/jobs">
            <Button variant="black" size="sm" className="text-xs font-bold h-9 shadow-sm">
              <Search className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Cari Proyek Baru
            </Button>
          </Link>
        </div>
      </div>
      <ProjectPipelineConsole
        projectsCount={projects.length}
        totalActive={totalActive}
        totalReview={totalReview}
        totalCompleted={totalCompleted}
        totalEscrowProtected={totalEscrowProtected}
        filterStatus={filterStatus}
        onSelectFilter={setFilterStatus}
      />

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari berdasarkan judul proyek, nama UMKM, atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 text-xs rounded-xl bg-white/90 border border-slate-200/80 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-400 transition-all shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Menampilkan:</span>
          <span className="font-bold text-slate-900">{filteredProjects.length} Kontrak</span>
        </div>
      </div>
      {/* Projects List with Rich Progress Tracker */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Tidak ada proyek yang sesuai</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Coba sesuaikan kata kunci pencarian atau ubah filter status proyek untuk melihat kontrak lainnya.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => { setFilterStatus("ALL"); setSearchQuery(""); }}
              className="mt-4 text-xs font-bold"
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const isExpanded = expandedProjectId === project.id

            return (
              <Card 
                key={project.id} 
                hover={false}
                className="rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
              >
                {/* Main Project Strip */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                          {project.category}
                        </span>

                        {project.status === "IN_PROGRESS" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" /> Sedang Dikerjakan
                          </span>
                        )}

                        {project.status === "REVIEW" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                            <FileCheck2 className="w-3 h-3 text-indigo-600" /> Menunggu Verifikasi Klien
                          </span>
                        )}

                        {project.status === "COMPLETED" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Proyek Selesai
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50/80 text-emerald-700 border border-emerald-200/60">
                          <Lock className="w-2.5 h-2.5 text-emerald-600" /> Midtrans Escrow Safe
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-slate-950 leading-snug">
                        {project.title}
                      </h2>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {project.client}
                        </span>
                        <span>•</span>
                        <span>Dimulai: {project.startDate}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-700 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          Tenggat: {project.deadline}
                        </span>
                      </div>
                    </div>

                    {/* Budget & Payout Summary */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-1 p-3 lg:p-0 rounded-xl bg-slate-50 lg:bg-transparent border lg:border-none border-slate-100 shrink-0">
                      <span className="text-[11px] font-semibold text-slate-500">Nilai Kontrak Escrow</span>
                      <p className="text-lg sm:text-xl font-extrabold text-slate-950">
                        Rp {project.budget.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                  {/* Progress Bar & Milestone Status */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Total Progres Pengerjaan</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 truncate max-w-xs sm:max-w-md">
                          {project.currentMilestone}
                        </span>
                      </div>
                      <span className="font-extrabold text-slate-950 text-sm">
                        {project.totalProgress}%
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          project.totalProgress === 100 ? "bg-emerald-500" : "bg-slate-900"
                        )}
                        style={{ width: `${project.totalProgress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>{project.milestones.filter(m => m.status === "APPROVED").length} dari {project.milestones.length} milestone disetujui</span>
                      <button
                        type="button"
                        onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                        className="font-bold text-slate-800 hover:text-slate-950 flex items-center gap-1 transition-colors"
                      >
                        <span>{isExpanded ? "Tutup Rincian Milestone" : "Lihat Rincian Milestone"}</span>
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  {/* Expandable Milestone Breakdown */}
                  {isExpanded && (
                    <div className="pt-2 space-y-3 border-t border-slate-100 animate-in fade-in duration-200">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Daftar Milestone Pengerjaan & Escrow Payout
                      </span>

                      <div className="space-y-2">
                        {project.milestones.map((m, idx) => (
                          <div 
                            key={m.id}
                            className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                                {m.status === "APPROVED" && (
                                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4" />
                                  </div>
                                )}
                                {m.status === "IN_PROGRESS" && (
                                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                                    {idx + 1}
                                  </div>
                                )}
                                {m.status === "REVIEW" && (
                                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                                    <Clock className="w-3.5 h-3.5" />
                                  </div>
                                )}
                                {m.status === "PENDING" && (
                                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-medium">
                                    {idx + 1}
                                  </div>
                                )}
                              </div>

                              <div>
                                <p className="font-bold text-slate-900">{m.title}</p>
                                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                                  <span>Alokasi Escrow: <strong>Rp {m.payout.toLocaleString("id-ID")}</strong></span>
                                  {m.date && <span>• Disetujui: {m.date}</span>}
                                  {m.dueDate && <span>• Target: {m.dueDate}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                              {m.status === "APPROVED" && (
                                <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Selesai & Dicairkan
                                </span>
                              )}
                              {m.status === "IN_PROGRESS" && (
                                <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                  Sedang Berjalan ({m.percent}%)
                                </span>
                              )}
                              {m.status === "REVIEW" && (
                                <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                  Menunggu Review UMKM
                                </span>
                              )}
                              {m.status === "PENDING" && (
                                <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                                  Tahap Berikutnya
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Actions Footer */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Pembayaran dijamin rekening bersama Midtrans hingga disetujui</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link href="/freelancer?tab=inbox&contact=client-1">
                        <Button variant="outline" size="sm" className="h-8 text-xs font-bold bg-white hover:bg-slate-50">
                          <MessageSquare className="w-3.5 h-3.5 mr-1 text-slate-500" />
                          Chat Klien UMKM
                        </Button>
                      </Link>

                      {project.status !== "COMPLETED" && (
                        <Button 
                          variant="black" 
                          size="sm" 
                          onClick={() => handleOpenDeliverableModal(project)}
                          className="h-8 text-xs font-bold shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                          Serahkan Deliverable
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
      {/* Deliverable Submission Modal */}
      {modalProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Serahkan Hasil Kerja</span>
                <h3 className="text-base font-bold text-slate-950">{modalProject.title}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setModalProject(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitDeliverable} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Pilih Milestone yang Dilaporkan
                </label>
                <select
                  value={selectedMilestoneId}
                  onChange={(e) => setSelectedMilestoneId(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  required
                >
                  {modalProject.milestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title} (Alokasi: Rp {m.payout.toLocaleString("id-ID")})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Tautan File / Deliverable (Figma, GitHub Repo, Google Drive, atau Vercel Preview)
                </label>
                <input
                  type="url"
                  placeholder="https://www.figma.com/file/... atau https://github.com/..."
                  value={deliverableUrl}
                  onChange={(e) => setDeliverableUrl(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Catatan Pengerjaan & Rangkuman untuk Klien
                </label>
                <textarea
                  rows={4}
                  placeholder="Jelaskan perubahan terbaru, instruksi peninjauan file, atau akun demo yang telah Anda siapkan..."
                  value={deliverableNotes}
                  onChange={(e) => setDeliverableNotes(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all resize-none"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-800 flex items-start gap-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  Setelah deliverable diserahkan, klien UMKM memiliki waktu untuk meninjau dan mengonfirmasi pencairan dana escrow langsung ke Saldo Dompet Anda.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setModalProject(null)}
                  className="text-xs font-semibold"
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  variant="black" 
                  size="sm" 
                  isLoading={isSubmitting}
                  className="text-xs font-bold shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  Kirim & Beri Tahu Klien
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

