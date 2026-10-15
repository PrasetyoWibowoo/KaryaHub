"use client"

import { Button } from "@/components/ui/Button"
import { Building2, Clock, MapPin, ShieldCheck, Bookmark, Sparkles, ArrowRight, Send, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface JobItemData {
  id: string
  title: string
  employerName: string
  budget: number
  category: string
  skills: string[]
  location?: string
  postedAt?: string
  deadline?: string
  matchScore?: number
  verified?: boolean
  description?: string
}

interface JobCardProps extends JobItemData {
  isBookmarked?: boolean
  onToggleBookmark?: (id: string) => void
  onQuickApply?: (job: JobItemData) => void
  viewMode?: "grid" | "list"
}

export function JobCard(props: JobCardProps) {
  const {
    id, title, employerName, budget, category, skills,
    location = "Remote", postedAt = "2 hari lalu", deadline,
    matchScore = 88, verified = true, isBookmarked = false,
    onToggleBookmark, onQuickApply, viewMode = "grid"
  } = props

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className={cn(
      "group p-5 rounded-2xl bg-white/85 hover:bg-white border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex justify-between relative",
      viewMode === "list" ? "flex-col md:flex-row md:items-center gap-4" : "flex-col"
    )}>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">{category}</span>
            {matchScore && (
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-600" />{matchScore}% Cocok
              </span>
            )}
          </div>
          {viewMode === "grid" && (
            <button
              type="button"
              onClick={() => onToggleBookmark?.(id)}
              className={cn("w-8 h-8 rounded-lg border flex items-center justify-center transition-all shrink-0", isBookmarked ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-white border-slate-200 text-slate-400 hover:text-slate-800")}
              title="Simpan Proyek"
            >
              <Bookmark className={cn("w-3.5 h-3.5", isBookmarked && "fill-amber-500")} />
            </button>
          )}
        </div>

        <Link href={`/jobs/${id}`} className="block group-hover:text-emerald-700 transition-colors">
          <h3 className="text-base font-bold text-slate-950 tracking-tight leading-snug line-clamp-2 mb-1.5">{title}</h3>
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />{employerName}
            {verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{location}</span>
          <span>•</span>
          <span>{postedAt}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {skills.slice(0, 4).map((skill) => (
            <span key={skill} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">{skill}</span>
          ))}
          {skills.length > 4 && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-400">+{skills.length - 4}</span>
          )}
        </div>
      </div>

      <div className={cn(
        viewMode === "list" 
          ? "flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0"
          : "pt-3.5 border-t border-slate-100"
      )}>
        <div className={cn(viewMode === "grid" ? "flex items-center justify-between mb-3" : "text-left md:text-right")}>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />Escrow Terjamin
            </span>
            <p className="text-lg font-extrabold text-slate-950">{formatRupiah(budget)}</p>
          </div>
          {deadline && (
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{deadline}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {viewMode === "list" && (
            <button
              type="button"
              onClick={() => onToggleBookmark?.(id)}
              className={cn("w-8.5 h-8.5 rounded-lg border flex items-center justify-center transition-all", isBookmarked ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-white border-slate-200 text-slate-400 hover:text-slate-800")}
              title="Simpan Proyek"
            >
              <Bookmark className={cn("w-3.5 h-3.5", isBookmarked && "fill-amber-500")} />
            </button>
          )}
          {onQuickApply && (
            <Button variant="outline" size="sm" onClick={() => onQuickApply(props)} className="text-xs h-8.5 font-bold bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border-slate-200 hover:border-slate-300 shadow-xs">
              <Send className="w-3 h-3 mr-1 text-slate-600" />Lamar
            </Button>
          )}
          <Link href={`/jobs/${id}`} className={cn(!onQuickApply && viewMode === "grid" ? "w-full" : "shrink-0")}>
            <Button variant="black" size="sm" className="w-full text-xs h-8.5 px-3 font-bold">
              Detail<ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
