"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Sparkles, Target } from "lucide-react"

export const CATEGORIES = [
  { id: "ui-ux", label: "UI/UX Design", icon: "🎨" },
  { id: "web-dev", label: "Website & Ecommerce", icon: "💻" },
  { id: "branding", label: "Branding & Kemasan", icon: "📦" },
  { id: "social-media", label: "Konten Medsos & Reels", icon: "📱" },
  { id: "marketing", label: "Digital Ads & SEO", icon: "📈" },
  { id: "photo-video", label: "Foto & Video Produk", icon: "📸" },
  { id: "copywriting", label: "Copywriting & Artikel", icon: "✍️" },
  { id: "consulting", label: "Konsultasi Bisnis", icon: "💼" },
]

interface Step1Props {
  title: string
  setTitle: (v: string) => void
  category: string
  setCategory: (v: string) => void
  experienceLevel: string
  setExperienceLevel: (v: string) => void
  onNext: () => void
}

export function CreateJobStep1({
  title,
  setTitle,
  category,
  setCategory,
  experienceLevel,
  setExperienceLevel,
  onNext,
}: Step1Props) {
  return (
    <Card className="p-6 sm:p-8 space-y-6">
      <div className="border-b border-border/70 pb-4">
        <h2 className="text-lg font-bold text-text-heading flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" /> Informasi Dasar Proyek
        </h2>
        <p className="text-xs text-text-muted mt-1">
          Berikan judul yang jelas dan pilih kategori yang paling mencerminkan target luaran pekerjaan.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-heading mb-2">
          Judul Proyek <span className="text-error">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Redesain Kemasan Kopi Drip & Visual Branding Instagram"
          className="w-full h-11 px-4 rounded-xl border border-border bg-surface text-text-heading text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
        />
        <p className="text-xs text-text-muted mt-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          Tips: Sebutkan objek pekerjaan dan industri usaha Anda secara spesifik.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-heading mb-2">
          Kategori Industri / Pekerjaan <span className="text-error">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`p-3 rounded-xl border text-left transition flex flex-col gap-1.5 ${
                  isSelected
                    ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                    : "border-border/80 bg-surface hover:bg-surface-alt text-text-body"
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="text-xs font-medium leading-snug">{cat.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-heading mb-2">
          Ekspektasi Level Pengalaman Talenta
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { level: "Pemula (Junior)", desc: "Tugas mendasar, hemat biaya", time: "Portofolio Awal" },
            { level: "Menengah (Intermediate)", desc: "Kualitas teruji, mandiri", time: "1-3 Thn Pengalaman" },
            { level: "Mahir (Senior/Expert)", desc: "Standar tinggi & konsultasi", time: "3+ Thn Pengalaman" },
          ].map((lvl) => (
            <div
              key={lvl.level}
              onClick={() => setExperienceLevel(lvl.level)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                experienceLevel === lvl.level
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border/80 bg-surface hover:bg-surface-alt"
              }`}
            >
              <p className="text-sm font-bold text-text-heading">{lvl.level}</p>
              <p className="text-xs text-text-muted mt-0.5">{lvl.desc}</p>
              <Badge variant="neutral" className="mt-2 text-[10px]">{lvl.time}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-border/70">
        <Button
          type="button"
          onClick={onNext}
          disabled={!title.trim()}
          className="px-6"
        >
          Lanjut ke Detail & Skill →
        </Button>
      </div>
    </Card>
  )
}
