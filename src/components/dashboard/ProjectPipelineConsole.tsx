"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Layers, Clock, FileCheck2, CheckCircle2, ShieldCheck, Lock, ArrowRight, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export type ProjectFilterStatus = "ALL" | "IN_PROGRESS" | "REVIEW" | "COMPLETED"

interface ProjectPipelineConsoleProps {
  projectsCount: number
  totalActive: number
  totalReview: number
  totalCompleted: number
  totalEscrowProtected: number
  filterStatus: ProjectFilterStatus
  onSelectFilter: (status: ProjectFilterStatus) => void
}

export function ProjectPipelineConsole({
  projectsCount,
  totalActive,
  totalReview,
  totalCompleted,
  totalEscrowProtected,
  filterStatus,
  onSelectFilter,
}: ProjectPipelineConsoleProps) {
  const stages = [
    { id: "ALL" as const, label: "Semua Proyek", caption: "Total Kontrak", count: projectsCount, icon: Layers },
    { id: "IN_PROGRESS" as const, label: "Sedang Berjalan", caption: "Milestone Aktif", count: totalActive, icon: Clock, pulse: true },
    { id: "REVIEW" as const, label: "Menunggu Review", caption: "Tinjauan Klien", count: totalReview, icon: FileCheck2 },
    { id: "COMPLETED" as const, label: "Proyek Selesai", caption: "Arsip Tuntas", count: totalCompleted, icon: CheckCircle2 },
  ]

  const activeLabel = filterStatus === "ALL" 
    ? "Semua Status" 
    : filterStatus === "IN_PROGRESS" 
      ? "Sedang Berjalan" 
      : filterStatus === "REVIEW" 
        ? "Menunggu Review" 
        : "Selesai"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
      {/* Left: The Interactive Pipeline Deck */}
      <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Pipeline Kontrak & Tahapan
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Aktif: <strong className="text-slate-900">{activeLabel}</strong>
            </span>
            {filterStatus !== "ALL" && (
              <button
                type="button"
                onClick={() => onSelectFilter("ALL")}
                className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 underline underline-offset-2 ml-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* 4 Interactive Segmented Pipeline Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative">
          {stages.map((stage) => {
            const isSelected = filterStatus === stage.id
            const Icon = stage.icon
            return (
              <motion.button
                key={stage.id}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectFilter(stage.id)}
                className={cn(
                  "text-left p-3.5 rounded-xl transition-colors duration-200 flex flex-col justify-between relative group select-none min-h-[105px] z-10 cursor-pointer",
                  isSelected
                    ? "text-white"
                    : "bg-slate-50/80 hover:bg-slate-100/90 text-slate-700 hover:text-slate-950 border border-slate-200/70"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="pipelineSelectedStageIndicator"
                    className="absolute inset-0 rounded-xl bg-slate-950 shadow-md ring-1 ring-slate-900 -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 28,
                      mass: 0.8
                    }}
                  />
                )}
                <div className="flex items-center justify-between gap-1 w-full mb-1 relative z-10">
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

                <div className="mt-auto relative z-10">
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
              </motion.button>
            )
          })}
        </div>
      </div>
      {/* Right: The Midtrans Escrow Safety Vault */}
      <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-5 border border-emerald-500/25 shadow-xl relative overflow-hidden flex flex-col justify-between">
        <div className="pointer-events-none absolute -right-6 -top-6 w-28 h-28 rounded-full bg-emerald-500/15 blur-2xl" />
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              MIDTRANS ESCROW VERIFIED
            </span>
            <Lock className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Total Escrow Diamankan
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Rp {totalEscrowProtected.toLocaleString("id-ID")}
            </span>
          </div>
          <p className="text-xs text-slate-300/90 leading-relaxed mt-1.5">
            Dana telah disetor penuh oleh UMKM dan terkunci aman di rekening bersama.
          </p>
        </div>

        <Link 
          href="/freelancer/wallet"
          className="inline-flex items-center justify-between w-full pt-3 mt-3 border-t border-white/10 text-xs font-bold text-emerald-400 hover:text-emerald-300 group transition-colors"
        >
          <span>Buka Saldo & Dompet Escrow</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
