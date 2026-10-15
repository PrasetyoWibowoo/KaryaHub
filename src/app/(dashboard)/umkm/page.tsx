"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ProjectStatusChart } from "@/components/dashboard/ProjectStatusChart"
import { ApplicantTrendChart } from "@/components/dashboard/ApplicantTrendChart"
import { 
  PlusCircle, 
  Briefcase, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  FileText,
  ArrowRight
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { UmkmClientsView } from "@/components/dashboard/UmkmClientsView"
import { DashboardInboxView } from "@/components/dashboard/DashboardInboxView"
import { 
  ShieldCheck,
  Building2,
  Sparkles,
  Zap,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  FileCheck2,
  Lock
} from "lucide-react"

// Mock data
const umkmData = {
  name: "TechStartup Inc",
  verifiedBadge: "Mitra UMKM Terverifikasi",
  stats: {
    activeProjects: 8,
    totalApplicants: 124,
    budgetSpent: 45000000,
    escrowLocked: 12500000,
    hiredFreelancers: 15,
  },
  projectStatus: [
    { name: "Completed", value: 12 },
    { name: "In Progress", value: 8 },
    { name: "Reviewing", value: 5 },
    { name: "Cancelled", value: 2 },
  ],
  applicantTrend: [
    { month: "Jan", applicants: 45, hired: 8 },
    { month: "Feb", applicants: 52, hired: 10 },
    { month: "Mar", applicants: 61, hired: 12 },
    { month: "Apr", applicants: 78, hired: 15 },
    { month: "May", applicants: 85, hired: 18 },
    { month: "Jun", applicants: 124, hired: 22 },
  ],
  activeProjects: [
    { 
      id: 1, 
      title: "Website Redesign & Integrasi Midtrans", 
      freelancer: "John Doe",
      avatar: "JD",
      status: "In Progress",
      progress: 65,
      deadline: "2 hari lagi (14 Okt)",
      budget: 5000000
    },
    { 
      id: 2, 
      title: "Mobile App Mitra UMKM (React Native)", 
      freelancer: "Jane Smith",
      avatar: "JS",
      status: "In Progress",
      progress: 40,
      deadline: "1 minggu lagi (19 Okt)",
      budget: 8000000
    },
  ],
  recentApplicants: [
    {
      id: 1,
      name: "Alex Johnson",
      job: "Senior UI/UX & Brand Designer",
      skills: ["Figma", "UI/UX", "Packaging Design"],
      matchScore: 92,
      proposedBudget: 4800000,
      duration: "14 hari",
    },
    {
      id: 2,
      name: "Sarah Williams",
      job: "Full Stack Engineer (Next.js)",
      skills: ["React", "TypeScript", "PostgreSQL"],
      matchScore: 88,
      proposedBudget: 5200000,
      duration: "12 hari",
    },
  ]
}

function UmkmDashboardContent() {
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "overview"
  const defaultContact = searchParams.get("contact") || undefined

  if (currentTab === "clients") {
    return <UmkmClientsView />
  }

  if (currentTab === "inbox") {
    return <DashboardInboxView role="umkm" defaultContactId={defaultContact} />
  }

  return (
    <div className="space-y-5 pb-12">
      {/* Compact Executive Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Escrow Protection Aktif
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-zinc-300 border border-white/15">
              <Building2 className="w-3 h-3 text-indigo-400" />
              {umkmData.verifiedBadge}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
            Workspace UMKM: {umkmData.name}
          </h1>
          <p className="text-xs text-zinc-300 max-w-xl line-clamp-1 sm:line-clamp-none">
            Kelola proyek digitalisasi usaha Anda secara terpusat, rekrut talenta vokasi terbaik, dan tinjau skor ATS pelamar.
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10 shrink-0">
          <Link href="/umkm/escrow-status">
            <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white hover:text-white border-white/20 text-xs font-semibold h-9 px-3.5">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Status Escrow
            </Button>
          </Link>
          <Link href="/umkm/create-job">
            <Button variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white border-none text-xs font-bold h-9 px-4 shadow-sm">
              <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
              Posting Proyek
            </Button>
          </Link>
        </div>
      </div>

      {/* 4-Pillar Unified Workspace Deck */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
      >
        {/* Pillar 1: Anggaran & Escrow */}
        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Anggaran Diamankan</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-emerald-600" /> Rekber Aktif
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-950 tracking-tight">
              Rp {umkmData.stats.budgetSpent.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Rp {umkmData.stats.escrowLocked.toLocaleString("id-ID")} terkunci di proyek aktif
            </p>
          </div>
          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
            <Link href="/umkm/escrow-status" className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center gap-1">
              Pantau Escrow <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
            </Link>
          </div>
        </Card>

        {/* Pillar 2: Proyek Aktif */}
        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Proyek Berjalan</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                2 Kontrak
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-950 tracking-tight">
              {umkmData.stats.activeProjects} Proyek Aktif
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Progress Rata-rata</span>
                <span className="font-bold text-slate-900">65%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-slate-900 rounded-full" style={{ width: "65%" }} />
              </div>
            </div>
          </div>
          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
            <Link href="/umkm/manage-jobs" className="text-xs font-bold text-slate-800 hover:text-indigo-600 flex items-center gap-1">
              Kelola Proyek <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
            </Link>
          </div>
        </Card>

        {/* Pillar 3: Pelamar & AI ATS */}
        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pipeline Pelamar</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Auto-Ranked
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-950 tracking-tight">
              {umkmData.stats.totalApplicants} Pelamar Masuk
            </p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <FileCheck2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              Skor ATS match tertinggi: <strong className="text-indigo-700">94%</strong>
            </p>
          </div>
          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
            <Link href="/umkm/manage-jobs" className="text-xs font-bold text-slate-800 hover:text-indigo-600 flex items-center gap-1">
              Review Ranking ATS <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
            </Link>
          </div>
        </Card>

        {/* Pillar 4: SDG 8 Vokasi Impact */}
        <Card hover={false} className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Talenta Vokasi Direkrut</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5 text-emerald-600" /> +28% MoM
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-950 tracking-tight">
              {umkmData.stats.hiredFreelancers} Talenta Aktif
            </p>
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
              Dampak positif ekonomi vokasi (SDG Goal 8)
            </p>
          </div>
          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
            <Link href="/umkm?tab=clients" className="text-xs font-bold text-slate-800 hover:text-slate-950 flex items-center gap-1">
              Daftar Talenta <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Main Grid: Projects & Applicants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Active Projects & Applicant Growth Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-950">Proyek Berjalan & Milestone Kerja</h2>
                <p className="text-xs text-slate-500 mt-0.5">Pantau progress freelancer dan tinjau kiriman deliverable</p>
              </div>
              <Link href="/umkm/manage-jobs">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-slate-600 hover:text-slate-950">
                  Kelola Semua
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3.5">
              {umkmData.activeProjects.map((project) => (
                <div key={project.id} className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2.5">
                    <div>
                      <h3 className="font-bold text-sm text-slate-950 leading-snug">{project.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                          {project.avatar}
                        </span>
                        <span>Freelancer: <strong className="text-slate-800">{project.freelancer}</strong></span>
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0 self-start">
                      Rp {project.budget.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Progress Pengerjaan</span>
                      <span className="font-bold text-slate-950">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className="h-full bg-slate-900 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Tenggat: <strong className="text-slate-800">{project.deadline}</strong>
                    </span>
                    <Link href="/umkm?tab=clients">
                      <Button variant="black" size="sm" className="text-xs h-8 px-3">
                        <CheckCircle2 className="w-3 h-3 mr-1.5 text-emerald-400" />
                        Tinjau Deliverable
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Applicant Growth Trend Chart */}
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Tren Pelamar Masuk vs Perekrutan
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Pertumbuhan minat talenta vokasi terhadap lowongan usaha Anda</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Semester 1
              </span>
            </div>
            <ApplicantTrendChart data={umkmData.applicantTrend} />
          </Card>
        </div>

        {/* Right Column: Top Candidates with ATS & Project Status (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Top Candidates with ATS Score */}
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-950">Pelamar Teratas (Screener ATS)</h2>
                <p className="text-xs text-slate-500 mt-0.5">Kandidat dengan tingkat kecocokan resume tertinggi</p>
              </div>
              <Link href="/umkm/manage-jobs">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-slate-600 hover:text-slate-950">
                  Semua
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {umkmData.recentApplicants.map((applicant) => (
                <div key={applicant.id} className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 hover:border-slate-300 transition-all">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h3 className="font-bold text-sm text-slate-950">{applicant.name}</h3>
                      <p className="text-xs text-slate-500">{applicant.job}</p>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      ATS {applicant.matchScore}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs my-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500">Pengajuan: <strong className="text-slate-900">Rp {applicant.proposedBudget.toLocaleString("id-ID")}</strong></span>
                    <span className="text-slate-500">Durasi: <strong className="text-slate-900">{applicant.duration}</strong></span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {applicant.skills.map((s) => (
                      <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href="/umkm/manage-jobs/1" className="flex-1">
                      <Button variant="black" size="sm" className="w-full text-xs h-8 font-bold">
                        <CheckCircle className="w-3 h-3 mr-1 text-emerald-400" />
                        Terima & Rekrut
                      </Button>
                    </Link>
                    <Link href="/umkm/manage-jobs/1">
                      <Button variant="outline" size="sm" className="text-xs h-8 bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border-slate-200 hover:border-slate-300 font-semibold">
                        Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Project Status Pie Chart */}
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-950">Status Keseluruhan Proyek</h2>
              <span className="text-[11px] font-semibold text-slate-500">Distribusi Portfolio</span>
            </div>
            <ProjectStatusChart data={umkmData.projectStatus} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function UMKMDashboard() {
  return (
    <Suspense fallback={null}>
      <UmkmDashboardContent />
    </Suspense>
  )
}
