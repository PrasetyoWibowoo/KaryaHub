"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Sparkles,
  ShieldCheck,
  Star,
  Plus,
  ExternalLink,
  FileText,
  CheckCircle2,
  Edit3,
  X,
  Briefcase,
  Layers,
  Banknote,
  ArrowRight,
  TrendingUp,
  Share2,
  Lock,
  BadgeCheck,
  User,
  Clock,
  Wallet
} from "lucide-react"

const INITIAL_UMKM_PROFILE = {
  companyName: "TechStartup Inc",
  ownerName: "Hendra Wijaya",
  industry: "Teknologi & Inkubator Bisnis Retail",
  verifiedBadge: "Mitra Terverifikasi SDG 8",
  email: "umkm@karyahub.id",
  phone: "+62 821-5556-6778",
  location: "Jakarta Selatan, DKI Jakarta",
  website: "https://techstartup.id",
  bio: "TechStartup Inc adalah inkubator dan akselerator usaha mikro retail lokal yang berfokus mendampingi digitalisasi produk unggulan nusantara. Kami bermitra aktif dengan talenta muda vokasi untuk membangun solusi digital terjangkau, amanah, dan berdampak sosial nyata bagi kemandirian ekonomi daerah.",
  businessType: "PT Perorangan / UMKM Binaan",
  yearEstablished: "2021",
  nibNumber: "1234.5678.9012.3456",
  stats: {
    totalJobsPosted: 6,
    activeJobs: 2,
    completedJobs: 4,
    talentsHired: 5,
    totalEscrowDeposited: "Rp 32.500.000",
    freelancerSatisfaction: 4.9
  }
}

const POSTED_PROJECTS = [
  {
    id: "1",
    title: "Desain UI/UX & Prototipe Toko Online Mobile",
    category: "UI/UX Design",
    budget: "Rp 5.000.000",
    status: "IN_PROGRESS",
    freelancer: "John Doe",
    deadline: "10 hari lagi",
    escrowStatus: "HELD_IN_ESCROW"
  },
  {
    id: "2",
    title: "Pembuatan Website Company Profile & Katalog Produk UMKM",
    category: "Web Development",
    budget: "Rp 8.500.000",
    status: "IN_PROGRESS",
    freelancer: "Budi Pratama",
    deadline: "14 hari lagi",
    escrowStatus: "HELD_IN_ESCROW"
  },
  {
    id: "3",
    title: "Foto Produk Katalog & Produksi 10 Video Reels / TikTok",
    category: "Foto & Video",
    budget: "Rp 3.500.000",
    status: "COMPLETED",
    freelancer: "Siti Rahma",
    deadline: "Selesai",
    escrowStatus: "RELEASED"
  }
]

const FREELANCER_REVIEWS = [
  {
    id: "rev-1",
    freelancerName: "John Doe",
    role: "Full Stack & UI/UX Specialist",
    rating: 5,
    date: "10 Oktober 2024",
    comment: "TechStartup Inc adalah mitra UMKM yang sangat kooperatif. Brief pekerjaan sangat jelas, pembayaran escrow Midtrans langsung diamankan di awal, dan proses approval milestone sangat cepat."
  },
  {
    id: "rev-2",
    freelancerName: "Siti Rahma",
    role: "Content Creator & Photographer",
    rating: 5,
    date: "15 September 2024",
    comment: "Sangat menyenangkan bekerja sama dengan Pak Hendra. Feedback revisi terarah dan dana escrow langsung dicairkan begitu deliverable final diserahkan."
  }
]

export default function UmkmProfilePage() {
  const [profile, setProfile] = useState(INITIAL_UMKM_PROFILE)
  const [activeTab, setActiveTab] = useState<"about" | "projects" | "escrow" | "reviews">("about")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ ...profile })
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setSaveSuccessNotice(msg)
    setTimeout(() => setSaveSuccessNotice(null), 3000)
  }

  const handleSaveProfile = () => {
    setProfile({ ...editForm })
    setIsEditing(false)
    showToast("Profil usaha berhasil diperbarui!")
  }

  return (
    <div className="space-y-6 pb-12 w-full">
      {/* Toast Alert */}
      <AnimatePresence>
        {saveSuccessNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccessNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. EXECUTIVE UMKM HEADER (Pristine, Clean, Light-Mode) */}
      <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.03)] p-6 sm:p-8 overflow-hidden">
        {/* Soft Ambient Underglow */}
        <div 
          aria-hidden="true"
          className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-emerald-500/08 blur-[90px] pointer-events-none" 
        />
        <div 
          aria-hidden="true"
          className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-teal-500/08 blur-[90px] pointer-events-none" 
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Avatar & Main Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-md ring-4 ring-slate-100">
                TS
              </div>
              <span 
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-500/20 shadow-xs" 
                title="Akun Terverifikasi"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 tracking-tight">
                  {profile.companyName}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{profile.verifiedBadge}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                  <ShieldCheck className="w-3 h-3 text-indigo-600" />
                  <span>NIB Terdaftar</span>
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-slate-700">
                {profile.industry} <span className="text-slate-300 mx-1.5">•</span> <span className="text-xs font-normal text-slate-500">Pemilik: {profile.ownerName}</span>
              </p>

              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-500 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {profile.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {profile.phone}
                </span>
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-600 font-semibold hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{profile.website.replace("https://", "")}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard.writeText(window.location.href)
                  showToast("Tautan profil UMKM berhasil disalin!")
                }
              }}
              className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs h-9 px-3.5"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              Bagikan
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setEditForm({ ...profile })
                setIsEditing(true)
              }}
              className="rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs h-9 px-4 shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1.5" />
              Edit Profil Usaha
            </Button>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE KPI DECK (4 Clean Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Lowongan</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-display text-slate-950">{profile.stats.totalJobsPosted}</span>
            <span className="text-xs text-slate-400 font-medium">Proyek</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">Sedang Berjalan</span>
            <span className="font-bold text-indigo-600">{profile.stats.activeJobs} Proyek Aktif</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Talenta Direkrut</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <User className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-display text-slate-950">{profile.stats.talentsHired}</span>
            <span className="text-xs text-slate-400 font-medium">Talenta Vokasi</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">Proyek Rampung</span>
            <span className="font-bold text-emerald-600">{profile.stats.completedJobs} Selesai</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Escrow Disalurkan</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-display text-slate-950">{profile.stats.totalEscrowDeposited}</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">Midtrans Gateway</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 100% Aman
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Kepuasan Talenta</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-display text-slate-950">{profile.stats.freelancerSatisfaction}</span>
            <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">Kredibilitas Mitra</span>
            <span className="font-bold text-amber-600">Sangat Tepercaya</span>
          </div>
        </div>
      </div>

      {/* 3. MODERN SEGMENTED TABS NAVIGATOR */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/70 overflow-x-auto">
        {[
          { id: "about", label: "Tentang Usaha & Legalitas", icon: Building2 },
          { id: "projects", label: `Lowongan Proyek (${POSTED_PROJECTS.length})`, icon: Briefcase },
          { id: "escrow", label: "Riwayat Escrow Midtrans", icon: ShieldCheck },
          { id: "reviews", label: `Ulasan Talenta (${FREELANCER_REVIEWS.length})`, icon: Star },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl transition-all shrink-0",
                isActive
                  ? "bg-white text-slate-950 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-emerald-600" : "text-slate-400")} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* 4. TAB CONTENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 2-Column Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* TAB 1: ABOUT */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display text-slate-950">Profil Bisnis UMKM</h3>
                      <p className="text-[11px] text-slate-500">Misi, latar belakang usaha, dan komitmen kemitraan vokasi</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditForm({ ...profile })
                      setIsEditing(true)
                    }}
                    className="text-xs text-slate-600 hover:text-slate-950 font-semibold"
                  >
                    <Edit3 className="w-3.5 h-3.5 mr-1" />
                    Ubah
                  </Button>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Bentuk Usaha</p>
                    <p className="text-xs font-bold text-slate-900 mt-1">{profile.businessType}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Nomor Induk Berusaha (NIB)</p>
                    <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {profile.nibNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lowongan Unggulan Berjalan */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display text-slate-950">Proyek Aktif Terbaru</h3>
                      <p className="text-[11px] text-slate-500">Proyek yang sedang dikerjakan bersama talenta vokasi</p>
                    </div>
                  </div>
                  <Link href="/umkm/manage-jobs">
                    <Button variant="ghost" size="sm" className="text-xs text-indigo-600 font-bold hover:text-indigo-700">
                      Kelola Semua &rarr;
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  {POSTED_PROJECTS.slice(0, 2).map((job) => (
                    <div key={job.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{job.title}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">
                            {job.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Talenta: <strong className="text-slate-700">{job.freelancer}</strong> • Batas Waktu: {job.deadline}
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0">
                        <span className="font-extrabold text-slate-900">{job.budget}</span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Escrow Diamankan
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold font-display text-slate-950">Daftar Lowongan Proyek Bisnis</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Semua proyek yang dipublikasikan oleh {profile.companyName}.</p>
                  </div>
                  <Link href="/umkm/create-job">
                    <Button size="sm" className="rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs h-9 px-4">
                      <Plus className="w-3.5 h-3.5 mr-1.5" />
                      Posting Proyek Baru
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  {POSTED_PROJECTS.map((job) => (
                    <div key={job.id} className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{job.title}</h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                              {job.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Pelaksana: <strong className="text-slate-800">{job.freelancer}</strong> • Tenggat: {job.deadline}
                          </p>
                        </div>
                        <span className="font-extrabold text-sm text-slate-900 sm:text-right">
                          {job.budget}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1",
                          job.escrowStatus === "RELEASED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-indigo-50 text-indigo-800 border border-indigo-200"
                        )}>
                          <ShieldCheck className="w-3 h-3" />
                          {job.escrowStatus === "RELEASED" ? "Dana Escrow Telah Dicairkan" : "Dana Escrow Ditahan Aman"}
                        </span>
                        <Link href="/umkm/manage-jobs" className="text-xs font-bold text-indigo-600 hover:underline">
                          Lihat Detail &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ESCROW */}
          {activeTab === "escrow" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold font-display text-slate-950">Rekening Bersama Escrow Midtrans</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Sistem perlindungan transaksi dua pihak sesuai regulasi keuangan digital.</p>
                  </div>
                  <Link href="/umkm/escrow-status">
                    <Button size="sm" variant="outline" className="text-xs font-bold rounded-xl">
                      Buka Dasbor Escrow Penuh
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Dana Ditahan Aktif</span>
                    <p className="text-xl font-extrabold text-slate-950 mt-1">Rp 13.500.000</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">2 Proyek sedang pengerjaan</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase">Telah Berhasil Cair</span>
                    <p className="text-xl font-extrabold text-emerald-800 mt-1">Rp 19.000.000</p>
                    <p className="text-[11px] text-emerald-600 mt-0.5">4 Milestone selesai disetujui</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/70">
                    <span className="text-[11px] font-bold text-indigo-700 uppercase">Tingkat Keberhasilan</span>
                    <p className="text-xl font-extrabold text-indigo-800 mt-1">100%</p>
                    <p className="text-[11px] text-indigo-600 mt-0.5">0 sengketa atau pembatalan</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/80 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-900">Jaminan Garansi Hasil Kerja</p>
                    <p className="text-slate-600 leading-relaxed">
                      Dana UMKM aman disimpan di rekening escrow Midtrans hingga deliverable proyek disetujui sepenuhnya oleh pemilik usaha.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold font-display text-slate-950">Ulasan dari Talenta Vokasi</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Tanggapan independen talenta mengenai kolaborasi dan kepatuhan pembayaran.</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9 / 5.0 (Kepuasan Talenta)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {FREELANCER_REVIEWS.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{rev.freelancerName}</p>
                          <p className="text-[11px] text-slate-500">{rev.role}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-xs font-bold text-slate-800 ml-1">{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 italic leading-relaxed">
                        &quot;{rev.comment}&quot;
                      </p>
                      <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          {/* SDG Goal 8 Impact Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 border border-emerald-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Mitra Binaan SDG Goal 8</h4>
                <p className="text-[10px] text-slate-500">Decent Work & Economic Growth</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              UMKM ini berkomitmen memberikan upah layak, kejelasan lingkup proyek, dan memberdayakan lulusan vokasi sebagai mitra utama transformasi usaha.
            </p>
            <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600">Standar Pembayaran</span>
              <span className="flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Midtrans Escrow
              </span>
            </div>
          </div>

          {/* Quick Contact & Details Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Informasi Kantor & Kontak</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Email Resmi</span>
                <span className="font-bold text-slate-900">{profile.email}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Nomor WhatsApp</span>
                <span className="font-bold text-slate-900">{profile.phone}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Wilayah Usaha</span>
                <span className="font-bold text-slate-900">{profile.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tahun Berdiri</span>
                <span className="font-bold text-slate-900">{profile.yearEstablished}</span>
              </div>
            </div>
          </div>

          {/* Quick Post Job Action */}
          <div className="p-6 rounded-3xl bg-slate-950 text-white shadow-xl space-y-3">
            <h4 className="text-sm font-bold font-display">Perlu Tenaga Kerja Baru?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Posting kebutuhan proyek Anda sekarang dan terima proposal dari talenta vokasi terkurasi dalam hitungan jam.
            </p>
            <Link href="/umkm/create-job" className="block pt-1">
              <Button size="sm" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl h-9">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Posting Lowongan Kerja
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold font-display text-slate-950">Edit Informasi Profil Usaha UMKM</h3>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Usaha / Perusahaan</label>
                  <Input
                    value={editForm.companyName}
                    onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Pemilik / Penanggung Jawab</label>
                  <Input
                    value={editForm.ownerName}
                    onChange={(e) => setEditForm({ ...editForm, ownerName: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bidang Industri</label>
                  <Input
                    value={editForm.industry}
                    onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Usaha</label>
                    <Input
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp</label>
                    <Input
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Alamat Domisili Usaha</label>
                  <Input
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Website Resmi</label>
                  <Input
                    value={editForm.website}
                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat Usaha</label>
                  <textarea
                    rows={4}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="text-xs font-semibold">
                  Batal
                </Button>
                <Button size="sm" onClick={handleSaveProfile} className="text-xs font-bold bg-slate-950 text-white rounded-xl">
                  Simpan Perubahan
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
