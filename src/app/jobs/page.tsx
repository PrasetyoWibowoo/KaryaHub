"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { JobCard } from "@/components/jobs/JobCard"
import { Search, Briefcase, MapPin, DollarSign, X, Layers } from "lucide-react"

const DUMMY_JOBS = [
  {
    id: "1",
    title: "Desain UI/UX untuk Aplikasi Mobile Toko Online",
    employerName: "Toko Berkah Jaya",
    budget: 5000000,
    category: "UI/UX Design",
    skills: ["Figma", "UI Design", "Prototyping", "User Research"],
    location: "Remote",
    postedAt: "2 hari lalu",
    deadline: "7 hari lagi"
  },
  {
    id: "2",
    title: "Website Company Profile untuk UMKM Furniture",
    employerName: "Mebel Jati Mas",
    budget: 8000000,
    category: "Web Development",
    skills: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
    location: "Hybrid - Yogyakarta",
    postedAt: "5 hari lalu"
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
    deadline: "3 hari lagi"
  },
  {
    id: "4",
    title: "Sistem Inventory & POS untuk Toko Retail",
    employerName: "Warung Mitra Sejahtera",
    budget: 12000000,
    category: "Full Stack Development",
    skills: ["Node.js", "PostgreSQL", "React", "API Development"],
    location: "Remote",
    postedAt: "3 hari lalu"
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
    deadline: "5 hari lagi"
  },
  {
    id: "6",
    title: "Video Editing untuk Konten Promosi Produk",
    employerName: "Batik Heritage",
    budget: 2500000,
    category: "Video Production",
    skills: ["Adobe Premiere", "After Effects", "Video Editing", "Motion Graphics"],
    location: "Remote",
    postedAt: "6 hari lalu"
  }
]

const CATEGORIES = [
  "UI/UX Design",
  "Web Development",
  "Mobile Development",
  "Graphic Design",
  "Content Creation",
  "Video Production",
  "Digital Marketing",
  "Full Stack Development"
]

const LOCATIONS = ["Remote", "Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali"]

export default function JobsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [budgetRange, setBudgetRange] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedLocation("all")
    setBudgetRange("all")
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Navigation Sidebar */}
      <Sidebar />

      {/* Main Content with left margin for sidebar */}
      <div className="jobs-page-content">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="jobs-layout gap-6">
            {/* Filter Sidebar - Sticky */}
            <aside className="jobs-filter shrink-0">
            <div className="jobs-filter-panel bg-surface border border-border rounded-xl p-5">
              {/* Filter Header */}
              <div className="mb-6 pb-4 border-b border-border">
                <h2 className="text-lg font-bold text-text-heading mb-1">Filter Proyek</h2>
                <p className="text-xs text-text-muted">Temukan proyek yang sesuai</p>
              </div>

            {/* Search */}
            <div className="mb-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Cari proyek..."
                  className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== "all" || selectedLocation !== "all" || budgetRange !== "all") && (
              <div className="mb-5 pb-5 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-text-heading">Filter Aktif</span>
                  <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCategory !== "all" && (
                    <Badge variant="primary" className="flex items-center gap-1 text-xs py-0.5">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory("all")}><X className="w-3 h-3" /></button>
                    </Badge>
                  )}
                  {selectedLocation !== "all" && (
                    <Badge variant="primary" className="flex items-center gap-1 text-xs py-0.5">
                      {selectedLocation}
                      <button onClick={() => setSelectedLocation("all")}><X className="w-3 h-3" /></button>
                    </Badge>
                  )}
                  {budgetRange !== "all" && (
                    <Badge variant="primary" className="flex items-center gap-1 text-xs py-0.5">
                      {budgetRange}
                      <button onClick={() => setBudgetRange("all")}><X className="w-3 h-3" /></button>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm text-text-heading">Kategori</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === "all"}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-body group-hover:text-text-heading transition-colors">Semua Kategori</span>
                </label>
                {CATEGORIES.map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-body group-hover:text-text-heading transition-colors">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Location Filter */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm text-text-heading">Lokasi</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="location"
                    value="all"
                    checked={selectedLocation === "all"}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-body group-hover:text-text-heading transition-colors">Semua Lokasi</span>
                </label>
                {LOCATIONS.map((location) => (
                  <label key={location} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="location"
                      value={location}
                      checked={selectedLocation === location}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-body group-hover:text-text-heading transition-colors">{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget Range Filter */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm text-text-heading">Budget</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="budget"
                    value="all"
                    checked={budgetRange === "all"}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-body group-hover:text-text-heading transition-colors">Semua Budget</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="budget"
                    value="< Rp 5 juta"
                    checked={budgetRange === "< Rp 5 juta"}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-body group-hover:text-text-heading transition-colors">&lt; Rp 5 juta</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="budget"
                    value="Rp 5 - 10 juta"
                    checked={budgetRange === "Rp 5 - 10 juta"}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-body group-hover:text-text-heading transition-colors">Rp 5 - 10 juta</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="budget"
                    value="> Rp 10 juta"
                    checked={budgetRange === "> Rp 10 juta"}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-body group-hover:text-text-heading transition-colors">&gt; Rp 10 juta</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - Job Listings */}
        <main className="flex-1 min-w-0">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-heading mb-2">Cari Proyek UMKM</h1>
            <p className="text-text-muted">Bergabunglah dengan UMKM lokal dan bantu mereka berkembang dengan keahlian digitalmu</p>
          </div>

          {/* Stats and Sort Bar */}
          <div className="flex items-center justify-between mb-6 bg-surface border border-border rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 text-text-muted">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-semibold">{DUMMY_JOBS.length} proyek tersedia</span>
            </div>
            <select className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-medium text-text-heading focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Terbaru</option>
              <option>Budget Tertinggi</option>
              <option>Deadline Terdekat</option>
              <option>Paling Relevan</option>
            </select>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {DUMMY_JOBS.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Muat Lebih Banyak Proyek
            </Button>
          </div>
        </main>
          </div>
        </div>
      </div>
    </div>
  )
}
