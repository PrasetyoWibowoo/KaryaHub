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
  User,
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
  UploadCloud,
  Briefcase,
  Award,
  ArrowRight,
  Share2,
  Download,
  Calendar,
  Clock,
  Wallet,
  Target,
  BadgeCheck,
  Building2,
  Code2,
  Palette,
  Database,
  Layers
} from "lucide-react"

interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  linkUrl: string
  imageUrl: string
  isVerified: boolean
  tags: string[]
  completedDate?: string
}

interface ReviewItem {
  id: string
  clientName: string
  clientRole: string
  clientCompany: string
  rating: number
  date: string
  comment: string
  projectTitle: string
}

const INITIAL_PROFILE = {
  fullName: "John Doe",
  title: "Full Stack & UI/UX Specialist",
  verifiedBadge: "Vokasi Unggulan SDG 8",
  email: "freelancer@karyahub.id",
  phone: "+62 812-3456-7890",
  location: "Yogyakarta, D.I. Yogyakarta",
  portfolioUrl: "https://johndoe-portfolio.vercel.app",
  githubUrl: "https://github.com/johndoe-dev",
  bio: "Lulusan vokasi IT berdedikasi tinggi dengan fokus pada pengembangan aplikasi web modern yang cepat, aman, dan berpusat pada pengguna. Telah menyelesaikan lebih dari 14 proyek digitalisasi UMKM mulai dari katalog ekspor hingga sistem POS dan integrasi payment gateway Midtrans.",
  status: "Open to Work",
  education: "D4 Teknik Informatika - Politeknik Negeri",
  experienceYears: "3+ Tahun Pengalaman",
  stats: {
    completedProjects: 14,
    rating: 4.9,
    totalReviews: 12,
    escrowEarned: "Rp 52.000.000",
    atsScore: 88,
    onTimeDelivery: "100%"
  },
  skills: [
    { name: "React / Next.js 14", level: "Mahir", percent: 92, category: "Frontend" },
    { name: "TypeScript", level: "Mahir", percent: 88, category: "Language" },
    { name: "Tailwind CSS", level: "Mahir", percent: 95, category: "Styling" },
    { name: "UI/UX & Figma", level: "Mahir", percent: 90, category: "Design" },
    { name: "Node.js & Express", level: "Menengah", percent: 80, category: "Backend" },
    { name: "PostgreSQL & Prisma", level: "Menengah", percent: 78, category: "Database" },
    { name: "Midtrans Payment Gateway", level: "Menengah", percent: 85, category: "Integration" },
    { name: "REST API & GraphQL", level: "Menengah", percent: 82, category: "Backend" },
    { name: "SEO & Web Vitals", level: "Menengah", percent: 75, category: "Optimization" }
  ],
  certifications: [
    { name: "Sertifikasi Kompetensi Pengembang Web Madya", issuer: "Badan Nasional Sertifikasi Profesi (BNSP)", year: "2024" },
    { name: "Vokasi Unggulan Digital Transformation", issuer: "Program Kemitraan SDG 8 Kemendikbudristek", year: "2023" }
  ]
}

const INITIAL_PORTFOLIOS: PortfolioItem[] = [
  {
    id: "p1",
    title: "Aplikasi Mobile E-Commerce Fashion Nusantara",
    description: "Redesain menyeluruh pengalaman checkout toko online retail pakaian etnik nusantara, menurunkan bounce rate dan meningkatkan konversi penjualan sebesar 42%.",
    category: "UI/UX & Mobile Design",
    linkUrl: "https://fashion-nusantara.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60",
    isVerified: true,
    tags: ["Figma", "User Research", "Prototyping", "E-Commerce"],
    completedDate: "September 2024"
  },
  {
    id: "p2",
    title: "Katalog Web Mebel Ekspor & Order WhatsApp",
    description: "Situs web responsif dengan fitur pencarian katalog 3D visual serta checkout instan langsung terhubung ke WhatsApp business pemilik usaha.",
    category: "Web Development",
    linkUrl: "https://mebeljatimas.example.com",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60",
    isVerified: true,
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
    completedDate: "Agustus 2024"
  },
  {
    id: "p3",
    title: "Sistem Kasir & Inventory Web POS Kafe",
    description: "Aplikasi kasir ringan berbasis web dengan manajemen stok resep otomatis dan laporan omset harian yang dapat diakses pemilik via smartphone.",
    category: "Full Stack Application",
    linkUrl: "https://pos-kafe.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=60",
    isVerified: true,
    tags: ["React", "Node.js", "PostgreSQL", "Prisma"],
    completedDate: "Juli 2024"
  }
]

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    clientName: "Hendra Wijaya",
    clientRole: "Founder",
    clientCompany: "TechStartup Inc",
    rating: 5,
    date: "8 Oktober 2024",
    comment: "Hasil desain dan integrasi Midtrans sangat rapi dan tepat waktu. Komunikasi sangat responsif dan memahami kebutuhan bisnis kami.",
    projectTitle: "Desain UI/UX & Prototipe Toko Online Mobile"
  },
  {
    id: "r2",
    clientName: "Hj. Siti Aminah",
    clientRole: "Pemilik Usaha",
    clientCompany: "Mebel Jati Mas",
    rating: 5,
    date: "28 September 2024",
    comment: "Website katalog mebel kami sekarang terlihat sangat modern dan mewah. Banyak calon pembeli dari luar kota langsung menghubungi WhatsApp toko. Terima kasih John!",
    projectTitle: "Website Company Profile & Katalog Produk UMKM"
  },
  {
    id: "r3",
    clientName: "Budi Santoso",
    clientRole: "Manager Operasional",
    clientCompany: "Warung Kopi Nusantara",
    rating: 4.8,
    date: "12 September 2024",
    comment: "Pengerjaan sistem kasir sangat solutif untuk kendala stok di lapangan. Sangat merekomendasikan talenta vokasi KaryaHub untuk proyek UMKM.",
    projectTitle: "Sistem Inventory & Kasir Web Warung Kopi"
  }
]

export default function FreelancerProfilePage() {
  const [profile, setProfile] = useState(INITIAL_PROFILE)
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(INITIAL_PORTFOLIOS)
  const [activeTab, setActiveTab] = useState<"overview" | "portfolios" | "skills" | "documents" | "reviews">("overview")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ ...profile })
  const [showAddPortfolio, setShowAddPortfolio] = useState(false)
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    description: "",
    category: "Web Development",
    linkUrl: "",
    tags: ""
  })
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setSaveSuccessNotice(msg)
    setTimeout(() => setSaveSuccessNotice(null), 3000)
  }

  const handleSaveProfile = () => {
    setProfile({ ...editForm })
    setIsEditing(false)
    showToast("Profil berhasil diperbarui!")
  }

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPortfolio.title.trim()) return

    const item: PortfolioItem = {
      id: `p-${Date.now()}`,
      title: newPortfolio.title,
      description: newPortfolio.description,
      category: newPortfolio.category,
      linkUrl: newPortfolio.linkUrl || "https://karyahub.id",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
      isVerified: true,
      tags: newPortfolio.tags.split(",").map(t => t.trim()).filter(Boolean),
      completedDate: "Baru saja"
    }

    setPortfolios([item, ...portfolios])
    setShowAddPortfolio(false)
    setNewPortfolio({ title: "", description: "", category: "Web Development", linkUrl: "", tags: "" })
    showToast("Portofolio karya baru berhasil ditambahkan!")
  }

  const filteredPortfolios = selectedCategory === "All"
    ? portfolios
    : portfolios.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()))

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

      {/* 1. EXECUTIVE PROFILE HEADER (Pristine, Clean, Light-Mode) */}
      <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.03)] p-6 sm:p-8 overflow-hidden">
        {/* Soft Ambient Underglow */}
        <div 
          aria-hidden="true"
          className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-emerald-500/08 blur-[90px] pointer-events-none" 
        />
        <div 
          aria-hidden="true"
          className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-indigo-500/08 blur-[90px] pointer-events-none" 
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Avatar & Main Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-md ring-4 ring-slate-100">
                JD
              </div>
              <span 
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-500/20 shadow-xs" 
                title="Tersedia & Online"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950 tracking-tight">
                  {profile.fullName}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>{profile.verifiedBadge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{profile.status}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/70">
                  <ShieldCheck className="w-3 h-3 text-teal-600" />
                  <span>Escrow Terverifikasi</span>
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-slate-700">
                {profile.title} <span className="text-slate-300 mx-1.5">•</span> <span className="text-xs font-normal text-slate-500">{profile.education}</span>
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
                {profile.portfolioUrl && (
                  <a
                    href={profile.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 font-semibold hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Portofolio Web</span>
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
                  showToast("Tautan profil berhasil disalin ke clipboard!")
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
              Edit Profil
            </Button>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE KPI DECK (4 Clean Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Rating Klien</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-display text-slate-950">{profile.stats.rating}</span>
            <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">{profile.stats.totalReviews} Ulasan UMKM</span>
            <span className="font-bold text-emerald-600">Kepuasan 100%</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Proyek Selesai</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-display text-slate-950">{profile.stats.completedProjects}</span>
            <span className="text-xs text-slate-400 font-medium">Proyek</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">Ketepatan Waktu</span>
            <span className="font-bold text-indigo-600">{profile.stats.onTimeDelivery}</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Skor CV ATS</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-display text-emerald-600">{profile.stats.atsScore}%</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Tinggi
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">Standar Industri</span>
            <Link href="/freelancer/ats-checker" className="font-bold text-indigo-600 hover:underline">
              Cek Ulang &rarr;
            </Link>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Escrow Cair</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-display text-slate-950">{profile.stats.escrowEarned}</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500">Keamanan Midtrans</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Terproteksi
            </span>
          </div>
        </div>
      </div>

      {/* 3. MODERN SEGMENTED TABS NAVIGATOR */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/70 overflow-x-auto">
        {[
          { id: "overview", label: "Tentang & Bio", icon: User },
          { id: "portfolios", label: `Portofolio Proyek (${portfolios.length})`, icon: Briefcase },
          { id: "skills", label: `Keahlian & Skills (${profile.skills.length})`, icon: Award },
          { id: "documents", label: "Dokumen & CV ATS", icon: FileText },
          { id: "reviews", label: `Ulasan Klien (${INITIAL_REVIEWS.length})`, icon: Star },
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
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Biografi Profesional Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display text-slate-950">Ringkasan Profesional</h3>
                      <p className="text-[11px] text-slate-500">Latar belakang, etos kerja, dan fokus kompetensi vokasi</p>
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
                    Ubah Bio
                  </Button>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>

                {/* Highlight badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                    🎓 {profile.education}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ⚡ Responsif & Siap Kontrak Kerja
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
                    🛡️ Terbiasa Alur Escrow Midtrans
                  </span>
                </div>
              </div>

              {/* Portofolio Unggulan Preview */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display text-slate-950">Portofolio Unggulan</h3>
                      <p className="text-[11px] text-slate-500">Karya nyata terbaru yang telah beroperasi untuk UMKM</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("portfolios")}
                    className="text-xs text-indigo-600 font-bold hover:text-indigo-700"
                  >
                    Lihat Semua ({portfolios.length})
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolios.slice(0, 2).map((item) => (
                    <div 
                      key={item.id} 
                      className="group rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/40 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-40 overflow-hidden relative">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-slate-900 shadow-xs">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-4 space-y-2">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-slate-100">
                        <span className="text-[10px] text-slate-400 font-medium">{item.completedDate}</span>
                        <a 
                          href={item.linkUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:underline"
                        >
                          Lihat Proyek
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Riwayat Kolaborasi & Kontrak Terverifikasi */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <BadgeCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display text-slate-950">Riwayat Kolaborasi Terbaru</h3>
                      <p className="text-[11px] text-slate-500">Penyelesaian kontrak dengan pencairan dana escrow 100%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      title: "Desain UI/UX & Prototipe Toko Online Mobile",
                      client: "Toko Berkah Jaya",
                      date: "Oktober 2024",
                      amount: "Rp 5.000.000",
                      status: "Selesai & Dinilai ⭐ 5.0"
                    },
                    {
                      title: "Website Company Profile & Katalog Produk UMKM",
                      client: "Mebel Jati Mas",
                      date: "September 2024",
                      amount: "Rp 7.500.000",
                      status: "Selesai & Dinilai ⭐ 5.0"
                    },
                    {
                      title: "Sistem Inventory & Kasir Web Warung Kopi",
                      client: "Warung Kopi Nusantara",
                      date: "Agustus 2024",
                      amount: "Rp 6.000.000",
                      status: "Selesai & Dinilai ⭐ 4.8"
                    }
                  ].map((job, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-900">{job.title}</p>
                        <p className="text-[11px] text-slate-500">Klien: {job.client} • {job.date}</p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0">
                        <span className="font-extrabold text-slate-900">{job.amount}</span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {job.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIOS */}
          {activeTab === "portfolios" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold font-display text-slate-950">Galeri Portofolio Hasil Kerja</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Semua karya telah melalui verifikasi keaslian dan pengerjaan untuk UMKM.</p>
                  </div>
                  <Button
                    onClick={() => setShowAddPortfolio(true)}
                    size="sm"
                    className="rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs h-9 px-4 shrink-0 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Tambah Karya Baru
                  </Button>
                </div>

                {/* Filter chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {["All", "Web Development", "UI/UX & Mobile", "Full Stack"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0",
                        selectedCategory === cat
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                      )}
                    >
                      {cat === "All" ? "Semua Kategori" : cat}
                    </button>
                  ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {filteredPortfolios.map((item) => (
                    <div 
                      key={item.id} 
                      className="rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-44 overflow-hidden relative group">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-slate-900 shadow-xs">
                              {item.category}
                            </span>
                            {item.isVerified && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-xs flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                Terverifikasi
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {item.tags.map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-400 font-medium">
                          {item.completedDate || "Selesai"}
                        </span>
                        <a 
                          href={item.linkUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                        >
                          Kunjungi Demo
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-bold font-display text-slate-950">Kompetensi & Penguasaan Teknologi</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Kualifikasi teknis yang diselaraskan dengan kebutuhan digitalisasi UMKM daerah.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profile.skills.map((skill) => (
                    <div key={skill.name} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-900">{skill.name}</p>
                          <span className="text-[10px] text-slate-400 font-medium">{skill.category}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/70">
                          {skill.level} ({skill.percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700" 
                          style={{ width: `${skill.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sertifikasi Resmi */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sertifikasi & Pelatihan Vokasi Resmi</h4>
                  <div className="space-y-2.5">
                    {profile.certifications.map((cert, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-100 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-900">{cert.name}</p>
                          <p className="text-[11px] text-slate-600">{cert.issuer} • Tahun {cert.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold font-display text-slate-950">Manajemen Dokumen & CV ATS</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Dokumen resmi yang telah diverifikasi dan dianalisis mesin ATS.</p>
                  </div>
                  <Link href="/freelancer/ats-checker">
                    <Button size="sm" className="rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold h-9">
                      <Target className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                      Evaluasi ATS Otomatis
                    </Button>
                  </Link>
                </div>

                {/* ATS Breakdown Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-teal-50/30 border border-emerald-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex flex-col items-center justify-center font-extrabold shadow-sm shrink-0">
                      <span className="text-lg leading-none">88</span>
                      <span className="text-[9px] uppercase tracking-wider opacity-90">Skor</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Resume Teroptimasi Standar Vokasi</h4>
                      <p className="text-xs text-slate-600 mt-0.5">Format resume memenuhi standar ATS industri: kata kunci relevan, tata letak bersih, dan riwayat terstruktur.</p>
                    </div>
                  </div>
                  <Link href="/freelancer/ats-checker">
                    <Button size="sm" variant="outline" className="bg-white hover:bg-slate-50 border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl shrink-0">
                      Lihat Hasil Diagnosa
                    </Button>
                  </Link>
                </div>

                {/* File List */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 text-white shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">CV_John_Doe_FullStack_2026.pdf</p>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            CV Utama
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">PDF • 2.4 MB • Diperbarui 3 hari lalu</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => showToast("File CV berhasil diunduh!")}
                        className="text-xs font-semibold rounded-xl bg-white"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" />
                        Unduh PDF
                      </Button>
                      <Link href="/freelancer/ats-checker">
                        <Button size="sm" className="text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white">
                          Scan Ulang
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Standard_Cover_Letter_KaryaHub.pdf</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Template Surat Lamaran Proyek Vokasi • 450 KB</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => showToast("Cover letter berhasil diunduh!")}
                      className="text-xs font-semibold rounded-xl bg-white"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Unduh Dokumen
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold font-display text-slate-950">Ulasan & Testimoni Klien UMKM</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Ulasan transparan setelah dana escrow berhasil dicairkan kepada talenta.</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9 / 5.0 (12 Ulasan)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {INITIAL_REVIEWS.map((review) => (
                    <div key={review.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-slate-950">{review.clientName}</p>
                            <span className="text-[10px] text-slate-300">•</span>
                            <span className="text-[11px] font-semibold text-slate-600">{review.clientCompany}</span>
                          </div>
                          <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">Proyek: {review.projectTitle}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "w-3.5 h-3.5",
                                i < Math.floor(review.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"
                              )} 
                            />
                          ))}
                          <span className="text-xs font-bold text-slate-800 ml-1">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed italic">
                        &quot;{review.comment}&quot;
                      </p>
                      <span className="text-[10px] font-medium text-slate-400 block">{review.date}</span>
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
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-emerald-50/60 border border-indigo-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Dukungan SDG Goal 8</h4>
                <p className="text-[10px] text-slate-500">Decent Work & Economic Growth</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Profil talenta vokasi ini terdaftar dalam program akselerasi digital Kemendikbudristek untuk memberdayakan UMKM nasional dengan standar upah layak dan perlindungan hukum escrow.
            </p>
            <div className="pt-3 border-t border-indigo-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600">Jaminan Transaksi</span>
              <span className="flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Midtrans Escrow
              </span>
            </div>
          </div>

          {/* Quick Skills Summary Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Penguasaan Inti</h4>
              <button 
                onClick={() => setActiveTab("skills")} 
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                Detail
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: "React & Next.js", level: "92%" },
                { name: "UI/UX & Figma", level: "90%" },
                { name: "TypeScript", level: "88%" },
                { name: "Midtrans Payment API", level: "85%" }
              ].map((s) => (
                <div key={s.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{s.name}</span>
                    <span className="font-bold text-emerald-600">{s.level}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: s.level }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Contact & Social Links */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tautan & Media Sosial</h4>
            <div className="space-y-2.5 text-xs">
              <a 
                href={profile.portfolioUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-semibold text-slate-800">Website Portofolio</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a 
                href={profile.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-slate-800" />
                  <span className="font-semibold text-slate-800">GitHub Profile</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a 
                href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/50 transition-colors border border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">WhatsApp Resmi</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
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
                <h3 className="text-base font-bold font-display text-slate-950">Edit Informasi Profil Talenta</h3>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <Input
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gelar / Spesialisasi Utama</label>
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Resmi</label>
                    <Input
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp / HP</label>
                    <Input
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi Domisili</label>
                  <Input
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tautan Portofolio / Website</label>
                  <Input
                    value={editForm.portfolioUrl}
                    onChange={(e) => setEditForm({ ...editForm, portfolioUrl: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Biografi Profesional</label>
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

      {/* ADD PORTFOLIO MODAL */}
      <AnimatePresence>
        {showAddPortfolio && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold font-display text-slate-950">Tambah Portofolio Karya Baru</h3>
                <button 
                  onClick={() => setShowAddPortfolio(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddPortfolio} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Judul Proyek / Karya</label>
                  <Input
                    required
                    placeholder="Contoh: Redesain Aplikasi Mobile Toko Sepatu"
                    value={newPortfolio.title}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={newPortfolio.category}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX & Mobile Design">UI/UX & Mobile Design</option>
                    <option value="Full Stack Application">Full Stack Application</option>
                    <option value="Graphic Design & Branding">Graphic Design & Branding</option>
                    <option value="Social Media Content">Social Media Content</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Deskripsi Hasil Kerja</label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan peran Anda, tantangan yang diselesaikan, dan dampak untuk UMKM..."
                    value={newPortfolio.description}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, description: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tautan Demo / Repository</label>
                  <Input
                    placeholder="https://github.com/... atau https://figma.com/..."
                    value={newPortfolio.linkUrl}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, linkUrl: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tags Keterampilan (Pisahkan dengan koma)</label>
                  <Input
                    placeholder="Figma, React, Tailwind, Next.js"
                    value={newPortfolio.tags}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, tags: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddPortfolio(false)} className="text-xs font-semibold">
                    Batal
                  </Button>
                  <Button type="submit" size="sm" className="text-xs font-bold bg-slate-950 text-white rounded-xl">
                    Tambah ke Portofolio
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
