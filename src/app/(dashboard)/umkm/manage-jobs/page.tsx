"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"
import { Briefcase, Eye, PlusCircle, Search, Filter, CheckCircle2, Clock, Layers, RotateCcw } from "lucide-react"
import { JobCardItem, JobItem } from "@/components/dashboard/umkm/JobCardItem"

const INITIAL_JOBS: JobItem[] = [
  {
    id: "1",
    title: "Desain UI/UX & Prototipe Toko Online Mobile",
    category: "UI/UX Design",
    status: "OPEN",
    budget: 5000000,
    applicants: 8,
    views: 142,
    postedAt: "2 hari lalu",
    deadline: "10 hari lagi",
  },
  {
    id: "2",
    title: "Pembuatan Website Company Profile & Katalog Produk UMKM",
    category: "Web Development",
    status: "IN_PROGRESS",
    budget: 8500000,
    applicants: 14,
    views: 260,
    postedAt: "1 minggu lalu",
    deadline: "14 hari lagi",
    freelancer: {
      name: "Budi Pratama",
      avatar: "B",
      role: "Frontend Developer",
      progress: 65,
    },
  },
  {
    id: "3",
    title: "Foto Produk Katalog & Produksi 10 Video Reels / TikTok",
    category: "Foto & Video",
    status: "COMPLETED",
    budget: 3500000,
    applicants: 11,
    views: 198,
    postedAt: "3 minggu lalu",
    completedAt: "Selesai 4 hari lalu",
    freelancer: {
      name: "Siti Rahma",
      avatar: "S",
      role: "Content Creator",
      progress: 100,
    },
  },
  {
    id: "4",
    title: "Redesain Logo & Panduan Brand Identity Kemasan Jamu",
    category: "Branding",
    status: "CANCELLED",
    budget: 4000000,
    applicants: 5,
    views: 89,
    postedAt: "1 bulan lalu",
  },
]

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>(INITIAL_JOBS)
  const [filterStatus, setFilterStatus] = useState<string>("ALL")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredJobs = jobs.filter((j) => {
    const matchesStatus = filterStatus === "ALL" || j.status === filterStatus
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: jobs.length,
    open: jobs.filter((j) => j.status === "OPEN").length,
    inProgress: jobs.filter((j) => j.status === "IN_PROGRESS").length,
    completed: jobs.filter((j) => j.status === "COMPLETED").length,
  }

  const handleCloseJob = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menutup lowongan proyek ini?")) {
      setJobs(jobs.map((j) => (j.id === id ? { ...j, status: "CANCELLED" } : j)))
    }
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight">Kelola Proyek & Lowongan</h1>
          <p className="text-sm text-text-muted mt-1">Pantau pelamar, proses seleksi, dan status pengerjaan proyek UMKM Anda.</p>
        </div>
        <Link href="/umkm/create-job">
          <Button className="gap-2 shadow-md shadow-primary/20">
            <PlusCircle className="w-4 h-4" /> Posting Proyek Baru
          </Button>
        </Link>
      </div>

      {/* Bespoke Executive Job & Project Pipeline Console */}
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] p-4 sm:p-5">
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Pipeline Rekrutmen & Proyek UMKM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Aktif: <strong className="text-slate-900">
                {filterStatus === "ALL" ? "Semua Proyek" : filterStatus === "OPEN" ? "Menerima Pelamar" : filterStatus === "IN_PROGRESS" ? "Sedang Berjalan" : "Proyek Selesai"}
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
            { id: "ALL", label: "Semua Proyek", count: stats.total, icon: Briefcase, caption: "Total Lowongan" },
            { id: "OPEN", label: "Menerima Pelamar", count: stats.open, icon: Search, caption: "Buka Pelamar", pulse: true },
            { id: "IN_PROGRESS", label: "Sedang Berjalan", count: stats.inProgress, icon: Clock, caption: "Pengerjaan Aktif" },
            { id: "COMPLETED", label: "Proyek Selesai", count: stats.completed, icon: CheckCircle2, caption: "Escrow Dicairkan" },
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
                      isSelected ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-800"
                    )} />
                    <span className={cn(
                      "text-[11px] font-bold truncate",
                      isSelected ? "text-slate-200" : "text-slate-600 group-hover:text-slate-900"
                    )}>
                      {stage.label}
                    </span>
                  </div>
                  {stage.pulse && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
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
                      isSelected ? "text-emerald-400" : "text-slate-500"
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
            placeholder="Cari berdasarkan judul proyek atau kategori..."
            className="w-full h-9.5 pl-10 pr-4 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-xs text-slate-500 font-medium">
            Menampilkan <strong className="text-slate-900">{filteredJobs.length}</strong> proyek
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

      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <Card className="p-12 text-center space-y-3">
            <Layers className="w-12 h-12 text-text-muted mx-auto" />
            <h3 className="text-lg font-bold text-text-heading">Tidak ada proyek yang sesuai</h3>
            <p className="text-sm text-text-muted max-w-sm mx-auto">
              Coba ubah kata kunci pencarian atau ganti status filter di atas.
            </p>
          </Card>
        ) : (
          filteredJobs.map((job) => (
            <JobCardItem key={job.id} job={job} onCloseJob={handleCloseJob} />
          ))
        )}
      </div>
    </div>
  )
}
