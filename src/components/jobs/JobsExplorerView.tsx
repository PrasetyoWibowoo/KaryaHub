"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { JobCard, JobItemData } from "./JobCard"
import { Button } from "@/components/ui/Button"
import { 
  Search, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  X, 
  Layers, 
  Filter, 
  Sparkles, 
  SlidersHorizontal,
  Bookmark,
  LayoutGrid,
  List,
  CheckCircle2,
  ShieldCheck,
  Send,
  Building2,
  Calendar,
  Banknote
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const EXPLORER_JOBS: JobItemData[] = [
  {
    id: "1",
    title: "Desain UI/UX untuk Aplikasi Mobile Toko Online",
    employerName: "Toko Berkah Jaya",
    budget: 5000000,
    category: "UI/UX Design",
    skills: ["Figma", "UI Design", "Prototyping", "User Research"],
    location: "Remote",
    postedAt: "2 hari lalu",
    deadline: "4 hari lagi",
    matchScore: 95,
    verified: true,
    description: "UMKM fashion lokal membutuhkan redesign pengalaman checkout dan katalog mobile e-commerce."
  },
  {
    id: "2",
    title: "Website Company Profile untuk UMKM Furniture",
    employerName: "Mebel Jati Mas",
    budget: 8000000,
    category: "Web Development",
    skills: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
    location: "Hybrid - Yogyakarta",
    postedAt: "5 hari lalu",
    deadline: "10 hari lagi",
    matchScore: 88,
    verified: true,
    description: "Pembuatan website katalog interaktif furniture ekspor dengan sistem inquiry WhatsApp dan integrasi Midtrans."
  },
  {
    id: "3",
    title: "Social Media Content Creation & Management",
    employerName: "Kedai Kopi Nusantara",
    budget: 3500000,
    category: "Content Creation",
    skills: ["Instagram", "Copywriting", "Canva", "Social Media Marketing"],
    location: "Remote",
    postedAt: "1 hari lalu",
    deadline: "3 hari lagi",
    matchScore: 82,
    verified: true,
    description: "Produksi 15 feed instagram bertema kopi lokal dan manajemen konten mingguan."
  },
  {
    id: "4",
    title: "Sistem Inventory & POS untuk Toko Retail",
    employerName: "Warung Mitra Sejahtera",
    budget: 12000000,
    category: "Full Stack Development",
    skills: ["Node.js", "PostgreSQL", "React", "API Development"],
    location: "Remote",
    postedAt: "3 hari lalu",
    deadline: "14 hari lagi",
    matchScore: 94,
    verified: true,
    description: "Pengembangan sistem kasir web-based terintegrasi barcode scanner dan laporan laba rugi bulanan."
  },
  {
    id: "5",
    title: "Logo & Brand Identity untuk Startup F&B",
    employerName: "Dapur Ibu",
    budget: 4000000,
    category: "Graphic Design",
    skills: ["Adobe Illustrator", "Branding", "Logo Design", "Brand Guidelines"],
    location: "Remote",
    postedAt: "4 hari lalu",
    deadline: "5 hari lagi",
    matchScore: 90,
    verified: true,
    description: "Rebranding packaging dan visual identity untuk lini produk sambal kemasan ekspor."
  },
  {
    id: "6",
    title: "Video Editing untuk Konten Promosi Produk",
    employerName: "Batik Heritage",
    budget: 2500000,
    category: "Video Production",
    skills: ["Adobe Premiere", "After Effects", "Video Editing", "Reels/TikTok"],
    location: "Remote",
    postedAt: "6 hari lalu",
    deadline: "6 hari lagi",
    matchScore: 85,
    verified: false,
    description: "Editing 5 reel video sinematik proses pembatikan manual untuk kampanye hari batik."
  },
  {
    id: "7",
    title: "Aplikasi Kasir Android untuk Restoran Padang",
    employerName: "Rumah Makan Minang Jaya",
    budget: 9500000,
    category: "Mobile Development",
    skills: ["React Native", "Android", "Bluetooth Printer", "Firebase"],
    location: "Jakarta",
    postedAt: "1 hari lalu",
    deadline: "8 hari lagi",
    matchScore: 91,
    verified: true,
    description: "Aplikasi POS tablet restoran dengan fitur cetak struk thermal dan rekap omzet harian."
  },
  {
    id: "8",
    title: "Optimasi SEO & Digital Ads UMKM Roti",
    employerName: "Bakery Sejahtera Rasa",
    budget: 4500000,
    category: "Digital Marketing",
    skills: ["Google Ads", "Meta Ads", "SEO", "Local Business"],
    location: "Bandung",
    postedAt: "3 hari lalu",
    deadline: "12 hari lagi",
    matchScore: 86,
    verified: true,
    description: "Kampanye digital marketing lokal untuk meningkatkan pesanan katering dan roti ulang tahun."
  }
]

const CATEGORIES = [
  "Semua Kategori",
  "UI/UX Design",
  "Web Development",
  "Mobile Development",
  "Full Stack Development",
  "Graphic Design",
  "Content Creation",
  "Video Production",
  "Digital Marketing"
]

const LOCATIONS = ["Semua Lokasi", "Remote", "Hybrid - Yogyakarta", "Jakarta", "Bandung"]

const BUDGET_OPTIONS = [
  { id: "all", label: "Semua Budget" },
  { id: "under-5m", label: "< Rp 5 Juta" },
  { id: "5m-10m", label: "Rp 5 - 10 Juta" },
  { id: "above-10m", label: "> Rp 10 Juta" },
]

export function JobsExplorerView() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua Kategori")
  const [selectedLocation, setSelectedLocation] = useState<string>("Semua Lokasi")
  const [budgetRange, setBudgetRange] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") ?? "")
  const [sortBy, setSortBy] = useState<string>("match")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(["1"]))
  const [toastNotice, setToastNotice] = useState<string | null>(null)
  const [quickApplyJob, setQuickApplyJob] = useState<JobItemData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applyForm, setApplyForm] = useState({
    proposedBudget: "",
    estimatedDays: "7",
    coverLetter: ""
  })

  const showToast = (msg: string) => {
    setToastNotice(msg)
    setTimeout(() => setToastNotice(null), 3500)
  }

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        showToast("Proyek dihapus dari simpanan")
      } else {
        next.add(id)
        showToast("Proyek berhasil disimpan ke bookmark")
      }
      return next
    })
  }

  const clearFilters = () => {
    setSelectedCategory("Semua Kategori")
    setSelectedLocation("Semua Lokasi")
    setBudgetRange("all")
    setSearchQuery("")
  }

  const filteredJobs = useMemo(() => {
    return EXPLORER_JOBS.filter((job) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = job.title.toLowerCase().includes(q)
        const matchEmployer = job.employerName.toLowerCase().includes(q)
        const matchSkill = job.skills.some((s) => s.toLowerCase().includes(q))
        const matchCategory = job.category.toLowerCase().includes(q)
        if (!matchTitle && !matchEmployer && !matchSkill && !matchCategory) return false
      }
      if (selectedCategory !== "Semua Kategori" && job.category !== selectedCategory) return false
      if (selectedLocation !== "Semua Lokasi") {
        if (!job.location?.toLowerCase().includes(selectedLocation.toLowerCase())) return false
      }
      if (budgetRange === "under-5m" && job.budget >= 5000000) return false
      if (budgetRange === "5m-10m" && (job.budget < 5000000 || job.budget > 10000000)) return false
      if (budgetRange === "above-10m" && job.budget <= 10000000) return false
      return true
    }).sort((a, b) => {
      if (sortBy === "match") return (b.matchScore || 0) - (a.matchScore || 0)
      if (sortBy === "budget-desc") return b.budget - a.budget
      if (sortBy === "budget-asc") return a.budget - b.budget
      return Number(b.id) - Number(a.id)
    })
  }, [searchQuery, selectedCategory, selectedLocation, budgetRange, sortBy])

  const handleOpenQuickApply = (job: JobItemData) => {
    setQuickApplyJob(job)
    setApplyForm({
      proposedBudget: job.budget.toString(),
      estimatedDays: "7",
      coverLetter: `Halo ${job.employerName}, saya sangat tertarik dan berpengalaman untuk mengeksekusi proyek "${job.title}". Siap mulai segera dengan proteksi Escrow KaryaHub.`
    })
  }

  const handleSubmitQuickApply = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      const jobName = quickApplyJob?.title
      setQuickApplyJob(null)
      showToast(`Proposal untuk "${jobName}" berhasil dikirim! Pantau status di menu Proposal Saya.`)
    }, 900)
  }
  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastNotice}</span>
          </div>
          <Link href="/freelancer/my-proposals" className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline shrink-0 ml-3">
            Lihat Proposal Saya →
          </Link>
        </div>
      )}

      {/* Header & Control Center */}
      <div className="p-6 md:p-7 rounded-3xl glass-card relative overflow-hidden border border-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Escrow Terlindungi
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {EXPLORER_JOBS.length} Proyek Aktif Terbuka
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-950">
              Cari & Lamar Proyek UMKM
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Jelajahi proyek riil dari pelaku usaha lokal. Ajukan penawaran harga secara transparan dan nikmati kepastian pencairan dana melalui Rekening Bersama Midtrans.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Bookmark className="w-4 h-4 fill-amber-500" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Disimpan</span>
                <span className="text-sm font-extrabold text-slate-950">{bookmarkedIds.size} Proyek</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="mt-6 pt-5 border-t border-slate-200/60 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kata kunci, skill (Figma, React), atau nama UMKM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-9 bg-white/80 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-3 bg-white/80 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            >
              <option value="match">Urutkan: Skor Cocok ATS</option>
              <option value="budget-desc">Budget Tertinggi</option>
              <option value="budget-asc">Budget Terendah</option>
              <option value="newest">Terbaru Ditambahkan</option>
            </select>

            {/* View Mode Toggle */}
            <div className="h-11 p-1 bg-white/80 border border-slate-200/90 rounded-xl flex items-center gap-1 relative">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-lg transition-colors relative z-10 cursor-pointer select-none",
                  viewMode === "grid" ? "text-white" : "text-slate-500 hover:text-slate-950"
                )}
                title="Tampilan Grid"
              >
                {viewMode === "grid" && (
                  <motion.div
                    layoutId="jobsViewModePill"
                    className="absolute inset-0 rounded-lg bg-slate-950 shadow-xs -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-lg transition-colors relative z-10 cursor-pointer select-none",
                  viewMode === "list" ? "text-white" : "text-slate-500 hover:text-slate-950"
                )}
                title="Tampilan List"
              >
                {viewMode === "list" && (
                  <motion.div
                    layoutId="jobsViewModePill"
                    className="absolute inset-0 rounded-lg bg-slate-950 shadow-xs -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar relative">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat
          const count = cat === "Semua Kategori" 
            ? EXPLORER_JOBS.length 
            : EXPLORER_JOBS.filter((j) => j.category === cat).length
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "relative px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 z-10 cursor-pointer select-none",
                isActive
                  ? "text-white"
                  : "bg-white/80 hover:bg-slate-50 text-slate-600 hover:text-slate-950 border border-slate-200/80 shadow-xs"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="jobsCategoryActivePill"
                  className="absolute inset-0 rounded-xl bg-slate-950 shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.8 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
              <span className={cn(
                "text-[10px] px-1.5 py-0.2 rounded-full font-bold relative z-10 transition-colors",
                isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              )}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Main Grid: Filters Rail & Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Rail (3 cols) */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                Filter Lanjutan
              </span>
              {(selectedCategory !== "Semua Kategori" || selectedLocation !== "Semua Lokasi" || budgetRange !== "all" || searchQuery) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[11px] font-bold text-rose-600 hover:text-rose-800"
                >
                  Reset
                </button>
              )}
            </div>

            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2.5">Rentang Budget</span>
              <div className="space-y-1.5">
                {BUDGET_OPTIONS.map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-slate-950">
                    <input
                      type="radio"
                      name="budget-filter"
                      checked={budgetRange === opt.id}
                      onChange={() => setBudgetRange(opt.id)}
                      className="accent-slate-950 w-3.5 h-3.5"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2.5">Lokasi Kerja</span>
              <div className="space-y-1.5">
                {LOCATIONS.map((loc) => (
                  <label key={loc} className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-slate-950">
                    <input
                      type="radio"
                      name="location-filter"
                      checked={selectedLocation === loc}
                      onChange={() => setSelectedLocation(loc)}
                      className="accent-slate-950 w-3.5 h-3.5"
                    />
                    <span>{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tips Keamanan</span>
              </div>
              <p className="text-[11px] text-emerald-800/90 leading-snug">
                Semua proyek dijamin rekening penampung resmi. Jangan menerima transaksi di luar sistem KaryaHub.
              </p>
            </div>
          </div>
        </aside>


        {/* Right Content: Job Cards (9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <span className="text-xs font-bold text-slate-700">
              Menampilkan {filteredJobs.length} proyek yang cocok
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedCategory !== "Semua Kategori" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                  {selectedCategory}
                  <button type="button" onClick={() => setSelectedCategory("Semua Kategori")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedLocation !== "Semua Lokasi" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                  {selectedLocation}
                  <button type="button" onClick={() => setSelectedLocation("Semua Lokasi")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {budgetRange !== "all" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                  {BUDGET_OPTIONS.find((b) => b.id === budgetRange)?.label}
                  <button type="button" onClick={() => setBudgetRange("all")}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white/70 border border-dashed border-slate-200 text-center space-y-3">
              <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-950">Tidak ada proyek yang sesuai</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Coba sesuaikan kata kunci pencarian, rentang budget, atau pilih semua kategori.
              </p>
              <Button variant="outline" size="sm" onClick={clearFilters} className="text-xs font-bold">
                Reset Semua Filter
              </Button>
            </div>
          ) : (
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className={cn(
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4" 
                  : "space-y-3"
              )}
            >
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  viewMode={viewMode}
                  isBookmarked={bookmarkedIds.has(job.id)}
                  onToggleBookmark={toggleBookmark}
                  onQuickApply={handleOpenQuickApply}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>


      {/* Quick Apply Proposal Modal */}
      <AnimatePresence>
        {quickApplyJob && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/60">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Ajukan Proposal Cepat
                  </span>
                  <h3 className="text-base font-bold text-slate-950 line-clamp-1 mt-0.5">
                    {quickApplyJob.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Klien: <strong className="text-slate-800">{quickApplyJob.employerName}</strong> • Budget: <strong className="text-emerald-700">Rp {quickApplyJob.budget.toLocaleString("id-ID")}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickApplyJob(null)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitQuickApply} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Penawaran Biaya (Rp)
                    </label>
                    <input
                      type="number"
                      value={applyForm.proposedBudget}
                      onChange={(e) => setApplyForm({ ...applyForm, proposedBudget: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Estimasi Pengerjaan (Hari)
                    </label>
                    <input
                      type="number"
                      value={applyForm.estimatedDays}
                      onChange={(e) => setApplyForm({ ...applyForm, estimatedDays: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Catatan Singkat / Cover Letter
                  </label>
                  <textarea
                    rows={4}
                    value={applyForm.coverLetter}
                    onChange={(e) => setApplyForm({ ...applyForm, coverLetter: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                    placeholder="Ceritakan portfolio relevan Anda..."
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dana UMKM akan diamankan di Rekening Escrow sebelum Anda mulai bekerja.</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setQuickApplyJob(null)}
                    className="text-xs font-bold"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="black"
                    size="sm"
                    isLoading={isSubmitting}
                    className="text-xs font-bold cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    Kirim Proposal Sekarang
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
