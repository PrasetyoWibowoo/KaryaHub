"use client"

import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Users, Eye, ArrowRight, ShieldCheck, Clock, CheckCircle } from "lucide-react"

export interface JobItem {
  id: string
  title: string
  category: string
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  budget: number
  applicants: number
  views: number
  postedAt: string
  deadline?: string
  completedAt?: string
  freelancer?: {
    name: string
    avatar: string
    role: string
    progress: number
  }
}

interface JobCardItemProps {
  job: JobItem
  onCloseJob?: (id: string) => void
}

export function JobCardItem({ job, onCloseJob }: JobCardItemProps) {
  const getStatusBadge = (status: JobItem["status"]) => {
    switch (status) {
      case "OPEN":
        return <Badge variant="success" className="font-semibold">Menerima Pelamar</Badge>
      case "IN_PROGRESS":
        return <Badge variant="warning" className="font-semibold">Sedang Dikerjakan</Badge>
      case "COMPLETED":
        return <Badge variant="primary" className="font-semibold">Selesai</Badge>
      case "CANCELLED":
        return <Badge variant="error" className="font-semibold">Dibatalkan</Badge>
    }
  }

  return (
    <Card className="p-6 transition-all hover:border-primary/40 hover:shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge(job.status)}
            <Badge variant="neutral" className="text-xs">{job.category}</Badge>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Clock className="w-3 h-3" /> Diposting {job.postedAt}
            </span>
          </div>
          <h3 className="text-lg font-bold text-text-heading leading-snug">
            <Link href={`/umkm/manage-jobs/${job.id}`} className="hover:text-primary transition-colors">
              {job.title}
            </Link>
          </h3>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <p className="text-xs text-text-muted">Total Anggaran</p>
          <p className="text-lg font-extrabold text-primary">Rp {job.budget.toLocaleString("id-ID")}</p>
        </div>
      </div>

      {job.freelancer && job.status === "IN_PROGRESS" && (
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                {job.freelancer.name.charAt(0)}
              </div>
              <span className="font-semibold text-text-heading">Freelancer: {job.freelancer.name}</span>
            </div>
            <span className="font-bold text-amber-700 dark:text-amber-400">Progres {job.freelancer.progress}%</span>
          </div>
          <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${job.freelancer.progress}%` }} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-surface-alt rounded-xl text-xs">
        <div>
          <span className="text-text-muted block mb-0.5">Pelamar Masuk</span>
          <span className="font-bold text-text-heading flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" /> {job.applicants} Freelancer
          </span>
        </div>
        <div>
          <span className="text-text-muted block mb-0.5">Dilihat</span>
          <span className="font-bold text-text-heading flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-text-muted" /> {job.views} Kali
          </span>
        </div>
        <div>
          <span className="text-text-muted block mb-0.5">Batas Waktu</span>
          <span className="font-bold text-text-heading">{job.deadline || job.completedAt || "-"}</span>
        </div>
        <div>
          <span className="text-text-muted block mb-0.5">Proteksi Escrow</span>
          <span className="font-bold text-emerald-600 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Terproteksi
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60">
        <div className="flex items-center gap-2">
          <Link href={`/umkm/manage-jobs/${job.id}`}>
            <Button size="sm" variant="black" className="gap-1.5 text-xs font-bold shadow-xs">
              Evaluasi Pelamar ({job.applicants}) <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </Button>
          </Link>
          <Link href="/umkm/escrow-status">
            <Button variant="outline" size="sm" className="text-xs font-semibold">Status Escrow</Button>
          </Link>
        </div>

        {job.status === "OPEN" && onCloseJob && (
          <Button variant="ghost" size="sm" onClick={() => onCloseJob(job.id)} className="text-xs text-error hover:bg-error/10">
            Tutup Lowongan
          </Button>
        )}
      </div>
    </Card>
  )
}
