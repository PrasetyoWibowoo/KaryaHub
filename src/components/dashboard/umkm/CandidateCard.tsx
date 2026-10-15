"use client"

import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ExternalLink, ShieldCheck, Sparkles, MessageSquare, XCircle } from "lucide-react"

export interface Candidate {
  id: string
  name: string
  avatar: string
  role: string
  location: string
  atsScore: number
  proposedBudget: number
  estimatedDays: number
  coverLetter: string
  skills: { name: string; matched: boolean }[]
  portfolioUrl: string
  appliedAt: string
  status: "PENDING" | "HIRED" | "REJECTED"
}

interface CandidateCardProps {
  candidate: Candidate
  jobId?: string
  onHire: (c: Candidate) => void
  onReject: (id: string) => void
}

export function CandidateCard({ candidate: c, jobId = "1", onHire, onReject }: CandidateCardProps) {
  return (
    <Card className="p-6 space-y-4 hover:border-primary/40 transition">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center text-lg shrink-0">
            {c.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-text-heading text-base">{c.name}</h3>
              {c.status === "HIRED" && <Badge variant="success">Sedang Direkrut</Badge>}
              {c.status === "REJECTED" && <Badge variant="error">Ditolak</Badge>}
            </div>
            <p className="text-xs text-text-muted">{c.role} • {c.location}</p>
            <span className="text-[11px] text-text-muted mt-0.5 block">Melamar {c.appliedAt}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start">
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
            c.atsScore >= 90
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600"
              : "bg-amber-500/10 border-amber-500/30 text-amber-600"
          }`}>
            <Sparkles className="w-3.5 h-3.5" /> ATS Match {c.atsScore}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-surface-alt rounded-xl text-xs">
        <div>
          <span className="text-text-muted block mb-0.5">Penawaran Biaya</span>
          <span className="font-extrabold text-primary text-sm">Rp {c.proposedBudget.toLocaleString("id-ID")}</span>
        </div>
        <div>
          <span className="text-text-muted block mb-0.5">Estimasi Waktu</span>
          <span className="font-bold text-text-heading">{c.estimatedDays} Hari Kerja</span>
        </div>
        <div>
          <span className="text-text-muted block mb-0.5">Tautan Portofolio</span>
          <a href={c.portfolioUrl} target="_blank" rel="noreferrer" className="text-primary font-semibold hover:underline flex items-center gap-1">
            Lihat Portofolio <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="space-y-1.5 text-xs">
        <p className="font-semibold text-text-heading">Surat Penawaran / Cover Letter:</p>
        <p className="text-text-muted leading-relaxed italic">&ldquo;{c.coverLetter}&rdquo;</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-text-heading mb-1.5">Kesesuaian Skill:</p>
        <div className="flex flex-wrap gap-1.5">
          {c.skills.map((s) => (
            <span
              key={s.name}
              className={`text-xs px-2.5 py-0.5 rounded-md font-medium border ${
                s.matched
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  : "bg-surface border-border text-text-muted"
              }`}
            >
              {s.matched ? `✓ ${s.name}` : s.name}
            </span>
          ))}
        </div>
      </div>

      {c.status === "PENDING" && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
          <div className="flex items-center gap-2">
            <Link href={`/umkm/manage-jobs/${jobId}/hire/${c.id}`}>
              <Button size="sm" variant="black" className="gap-1.5 text-xs font-bold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Terima & Rekrut via Escrow
              </Button>
            </Link>
            <Link href="/umkm?tab=inbox">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
                <MessageSquare className="w-3.5 h-3.5" /> Chat Pelamar
              </Button>
            </Link>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onReject(c.id)} className="text-xs text-error hover:bg-error/10">
            <XCircle className="w-3.5 h-3.5 mr-1" /> Tolak Proposal
          </Button>
        </div>
      )}
    </Card>
  )
}
