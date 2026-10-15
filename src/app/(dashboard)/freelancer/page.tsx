"use client"

import Link from "next/link"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { SkillsRadarChart } from "@/components/dashboard/SkillsRadarChart"
import { SkillsBarChart } from "@/components/dashboard/SkillsBarChart"
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline"
import { FreelancerClientsView } from "@/components/dashboard/FreelancerClientsView"
import { DashboardInboxView } from "@/components/dashboard/DashboardInboxView"
import { 
  Briefcase, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles, 
  Target, 
  ShieldCheck, 
  Wallet, 
  FileCheck2, 
  Send, 
  Zap, 
  ArrowUpRight,
  Building2,
  MessageSquare,
  BarChart3,
  Compass
} from "lucide-react"
import { cn } from "@/lib/utils"

const freelancerData = {
  name: "John Doe",
  title: "Full Stack & UI/UX Specialist",
  verifiedBadge: "Vokasi Unggulan",
  stats: {
    walletBalance: 25000000,
    escrowHeld: 8000000,
    atsScore: 88,
    acceptanceRate: 65,
    activeProjectsCount: 3,
    proposalsSent: 18,
  },
  skillsData: [
    { skill: "React", level: 90, jobs: 12 },
    { skill: "TypeScript", level: 85, jobs: 10 },
    { skill: "Node.js", level: 80, jobs: 8 },
    { skill: "Figma", level: 75, jobs: 6 },
    { skill: "Next.js", level: 70, jobs: 5 },
  ],
  activeContracts: [
    {
      id: "1",
      title: "Desain UI/UX untuk Aplikasi Mobile Toko Online",
      client: "Toko Berkah Jaya",
      budget: 5000000,
      progress: 75,
      currentMilestone: "Final Prototype & User Flow",
      deadline: "4 hari lagi",
    },
    {
      id: "2",
      title: "Website Company Profile untuk UMKM Furniture",
      client: "Mebel Jati Mas",
      budget: 7500000,
      progress: 50,
      currentMilestone: "Integrasi Katalog & WhatsApp",
      deadline: "10 hari lagi",
    }
  ],
  recentActivity: [
    { type: "applied" as const, title: "UI/UX Designer needed - Toko Berkah Jaya", time: "2 jam lalu" },
    { type: "accepted" as const, title: "Website Redesign Project - Mebel Jati Mas", time: "1 hari lalu" },
    { type: "submitted" as const, title: "E-Commerce Checkout PR - Warung Mitra", time: "3 hari lalu" },
  ],
  recommendedJobs: [
    { 
      id: 1, 
      title: "React Developer for SaaS Dashboard UMKM", 
      client: "PT Logistik Digital Nusantara",
      budget: "Rp 5.000.000", 
      matchScore: 95,
      skills: ["React", "TypeScript", "Tailwind CSS"]
    },
    { 
      id: 2, 
      title: "Full Stack Engineer - Fintech Mitra Dagang", 
      client: "Koperasi Surya Mandiri",
      budget: "Rp 8.000.000", 
      matchScore: 88,
      skills: ["Next.js", "Node.js", "PostgreSQL"]
    },
  ]
}

function FreelancerDashboardContent() {
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "overview"
  const defaultContact = searchParams.get("contact") || undefined
  const [skillChartTab, setSkillChartTab] = useState<"radar" | "bars">("radar")

  if (currentTab === "clients") {
    return <FreelancerClientsView />
  }

  if (currentTab === "inbox") {
    return <DashboardInboxView role="freelancer" defaultContactId={defaultContact} />
  }

  return (
    <div className="space-y-5 pb-10">
      {/* Compact Executive Command Bar */}
      <div className="p-5 sm:p-6 rounded-2xl glass-card relative overflow-hidden border border-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Tersedia untuk Proyek Baru
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                {freelancerData.verifiedBadge}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display tracking-tight text-slate-950">
              Selamat datang kembali, {freelancerData.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Workspace terpadu talenta vokasi: pantau pencairan escrow, tingkatkan skor ATS resume, dan selesaikan milestone kerja tepat waktu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link href="/freelancer/ats-checker">
              <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 text-xs font-bold h-9 px-3.5 border-slate-200 hover:border-slate-300 shadow-xs">
                <FileCheck2 className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                Scan CV ATS
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="black" size="sm" className="shadow-xs hover:shadow text-xs font-bold h-9 px-4">
                <Target className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Cari Proyek
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Compact 4-Pillar Integrated KPI Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Pillar 1: Wallet & Escrow */}
        <div className="p-4 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Saldo & Escrow</span>
            <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
              Aman
            </span>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              Rp {freelancerData.stats.walletBalance.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
              <span>Escrow tertahan:</span>
              <strong className="text-slate-800 font-bold">Rp {freelancerData.stats.escrowHeld.toLocaleString("id-ID")}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2.5 mt-2.5 border-t border-slate-100">
            <Link href="/freelancer/wallet/withdraw" className="flex-1">
              <button type="button" className="w-full h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-all">
                <span>Tarik Dana</span>
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
              </button>
            </Link>
            <Link href="/freelancer/wallet">
              <button type="button" className="h-7 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-all">
                Riwayat
              </button>
            </Link>
          </div>
        </div>

        {/* Pillar 2: Active Contracts */}
        <div className="p-4 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Proyek Berjalan</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              2 Kontrak
            </span>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              Rp 12.500.000
            </p>
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
              <span>Kemajuan Rata-rata</span>
              <span className="font-bold text-slate-900">62%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
              <div className="h-full bg-slate-900 rounded-full" style={{ width: "62%" }} />
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100">
            <Link href="/freelancer/projects" className="flex items-center justify-between text-[11px] font-bold text-slate-700 hover:text-slate-950">
              <span>Kelola Proyek & Milestone</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Pillar 3: ATS Score */}
        <div className="p-4 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Skor AI ATS</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Strong Match
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-950 text-emerald-400 flex flex-col items-center justify-center font-extrabold text-base shrink-0 shadow-inner">
              <span>{freelancerData.stats.atsScore}%</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-950 truncate">CV Siap Industri</p>
              <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight mt-0.5">
                Format reverse-chronological dan keyword teknologi terdeteksi.
              </p>
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100">
            <Link href="/freelancer/ats-checker" className="flex items-center justify-between text-[11px] font-bold text-indigo-600 hover:text-indigo-800">
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Uji Lowongan Baru</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Pillar 4: Win Rate & Proposals */}
        <div className="p-4 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 shadow-xs transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Proposal & Menang</span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +5% MoM
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                {freelancerData.stats.acceptanceRate}%
              </span>
              <span className="text-xs font-semibold text-slate-500">Persetujuan</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {freelancerData.stats.proposalsSent} proposal terkirim  Respon 1.2 hari
            </p>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100">
            <Link href="/freelancer/my-proposals" className="flex items-center justify-between text-[11px] font-bold text-slate-700 hover:text-slate-950">
              <span>Buka Proposal Saya</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Core Work Grid (7 cols left, 5 cols right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Ongoing Milestones & Top Recommended (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Contracts & Milestone Tracker */}
          <div className="p-5 rounded-2xl bg-white/85 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-950">Proyek Berjalan & Milestone</h2>
                <p className="text-xs text-slate-500 mt-0.5">Pantau batas waktu dan serahkan deliverable tepat waktu</p>
              </div>
              <Link href="/freelancer/projects">
                <button type="button" className="text-xs font-bold text-slate-600 hover:text-slate-950 flex items-center gap-1">
                  <span>Lihat Semua</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </div>

            <div className="space-y-3">
              {freelancerData.activeContracts.map((contract) => (
                <div key={contract.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-all space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-slate-950 leading-snug">{contract.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {contract.client}
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        </span>
                        <span></span>
                        <span>Milestone: <strong className="text-slate-700">{contract.currentMilestone}</strong></span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Escrow Terkunci</span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Rp {contract.budget.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Progres Pengerjaan</span>
                      <span className="font-extrabold text-slate-950">{contract.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200/80 overflow-hidden">
                      <div className="h-full bg-slate-950 rounded-full transition-all" style={{ width: `${contract.progress}%` }} />
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Tenggat: <strong className="text-slate-800">{contract.deadline}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <Link href={`/freelancer?tab=inbox&contact=client-1`}>
                        <button type="button" className="h-7 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 hover:text-slate-950 text-[11px] font-semibold flex items-center gap-1 transition-all">
                          <MessageSquare className="w-3 h-3 text-slate-400" />
                          Chat
                        </button>
                      </Link>
                      <Link href="/freelancer/projects">
                        <Button variant="black" size="sm" className="h-7 text-[11px] px-3 font-bold">
                          <Send className="w-3 h-3 mr-1" />
                          Serahkan Deliverable
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Recommendations for Freelancer */}
          <div className="p-5 rounded-2xl bg-white/85 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-950">Rekomendasi Proyek UMKM</h2>
                <p className="text-xs text-slate-500 mt-0.5">Peluang dengan skor kesesuaian keahlian tertinggi</p>
              </div>
              <Link href="/jobs">
                <button type="button" className="text-xs font-bold text-slate-600 hover:text-slate-950 flex items-center gap-1">
                  <span>Lihat Semua Katalog</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {freelancerData.recommendedJobs.map((job) => (
                <div key={job.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-1.5 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {job.matchScore}% Cocok ATS
                      </span>
                      <span className="text-xs font-bold text-slate-950">{job.budget}</span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-950 line-clamp-1 leading-snug">{job.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{job.client}</p>

                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {job.skills.map((s) => (
                        <span key={s} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={`/jobs/${job.id}`}>
                    <button type="button" className="w-full h-7 rounded-lg bg-white hover:bg-slate-900 hover:text-white border border-slate-200 hover:border-slate-900 text-slate-900 text-[11px] font-bold flex items-center justify-center gap-1 transition-all">
                      <span>Detail & Ajukan</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Skill Matrix & Live Activity (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Compact Combined Skill Matrix */}
          <div className="p-5 rounded-2xl bg-white/85 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-950">Matriks Keahlian & Kebutuhan</h2>
              </div>
              <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-[10px] font-bold relative">
                <button
                  type="button"
                  onClick={() => setSkillChartTab("radar")}
                  className={cn(
                    "relative z-10 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer select-none",
                    skillChartTab === "radar" ? "text-slate-950 font-bold" : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  {skillChartTab === "radar" && (
                    <motion.div
                      layoutId="skillChartActivePill"
                      className="absolute inset-0 rounded-md bg-white shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <Compass className="w-3 h-3" />
                  Radar
                </button>
                <button
                  type="button"
                  onClick={() => setSkillChartTab("bars")}
                  className={cn(
                    "relative z-10 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer select-none",
                    skillChartTab === "bars" ? "text-slate-950 font-bold" : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  {skillChartTab === "bars" && (
                    <motion.div
                      layoutId="skillChartActivePill"
                      className="absolute inset-0 rounded-md bg-white shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <BarChart3 className="w-3 h-3" />
                  Peluang
                </button>
              </div>
            </div>

            {/* Render Compact Chart with smooth transition */}
            <div className="py-1 min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={skillChartTab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  {skillChartTab === "radar" ? (
                    <SkillsRadarChart data={freelancerData.skillsData} height={210} />
                  ) : (
                    <SkillsBarChart data={freelancerData.skillsData} height={210} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Skill Level Progress Strips */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Kompilasi Tingkat Kemahiran</span>
              <div className="space-y-1.5">
                {freelancerData.skillsData.map((s) => (
                  <div key={s.skill} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 w-24 truncate">{s.skill}</span>
                    <div className="flex-1 mx-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: `${s.level}%` }} />
                    </div>
                    <span className="font-bold text-slate-900 text-[11px] w-8 text-right">{s.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compact Activity Timeline */}
          <div className="p-5 rounded-2xl bg-white/85 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-950">Riwayat Aktivitas Terkini</h2>
              <Link href="/freelancer/my-proposals">
                <span className="text-[11px] font-bold text-slate-500 hover:text-slate-900 cursor-pointer">Semua</span>
              </Link>
            </div>
            <ActivityTimeline activities={freelancerData.recentActivity} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FreelancerDashboard() {
  return (
    <Suspense fallback={null}>
      <FreelancerDashboardContent />
    </Suspense>
  )
}
