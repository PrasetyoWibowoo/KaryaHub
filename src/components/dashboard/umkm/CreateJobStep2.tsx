"use client"

import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Layers, Plus, X } from "lucide-react"

export const SKILL_SUGGESTIONS = [
  "Figma", "Canva", "Next.js", "WordPress", "Shopee Ads", "TikTok Shop",
  "Instagram Reels", "Adobe Illustrator", "Copywriting", "Foto Produk", "CapCut", "Logo Design"
]

interface Step2Props {
  description: string
  setDescription: (v: string) => void
  deliverables: string
  setDeliverables: (v: string) => void
  selectedSkills: string[]
  setSelectedSkills: (v: string[]) => void
  onBack: () => void
  onNext: () => void
}

export function CreateJobStep2({
  description,
  setDescription,
  deliverables,
  setDeliverables,
  selectedSkills,
  setSelectedSkills,
  onBack,
  onNext,
}: Step2Props) {
  const [customInput, setCustomInput] = useState("")

  const addSkill = (s: string) => {
    if (!selectedSkills.includes(s)) setSelectedSkills([...selectedSkills, s])
  }

  const removeSkill = (s: string) => {
    setSelectedSkills(selectedSkills.filter(x => x !== s))
  }

  const addCustom = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (("key" in e && e.key === "Enter") || !("key" in e)) {
      e.preventDefault()
      const t = customInput.trim()
      if (t && !selectedSkills.includes(t)) {
        setSelectedSkills([...selectedSkills, t])
        setCustomInput("")
      }
    }
  }

  return (
    <Card className="p-6 sm:p-8 space-y-6">
      <div className="border-b border-border/70 pb-4">
        <h2 className="text-lg font-bold text-text-heading flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" /> Rincian Kebutuhan & Keahlian
        </h2>
        <p className="text-xs text-text-muted mt-1">Jelaskan target output dan keahlian teknis yang diharapkan.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-heading mb-2">Deskripsi Proyek <span className="text-error">*</span></label>
        <textarea
          rows={5}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Jelaskan kebutuhan Anda: profil usaha, tujuan proyek, referensi & kriteria."
          className="w-full p-4 rounded-xl border border-border bg-surface text-text-heading text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-heading mb-2">Output / Deliverables</label>
        <textarea
          rows={3}
          value={deliverables}
          onChange={(e) => setDeliverables(e.target.value)}
          placeholder="Contoh: File Master Figma, 3 variasi kemasan siap cetak, panduan warna"
          className="w-full p-3.5 rounded-xl border border-border bg-surface text-text-heading text-sm focus:ring-2 focus:ring-primary/20 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-heading mb-1.5">Keahlian yang Dibutuhkan</label>
        <div className="flex flex-wrap gap-2 mb-3 min-h-[36px] p-2 bg-surface-alt rounded-xl border border-border/80">
          {selectedSkills.length === 0 && <span className="text-xs text-text-muted italic py-1 px-1">Belum ada skill yang dipilih</span>}
          {selectedSkills.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-semibold">
              {s}
              <button type="button" onClick={() => removeSkill(s)} className="hover:text-error"><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={addCustom}
            placeholder="Ketik skill lain lalu tekan Enter..."
            className="flex-1 h-9 px-3 rounded-lg border border-border bg-surface text-xs focus:ring-1 focus:ring-primary outline-none"
          />
          <Button type="button" variant="outline" size="sm" onClick={addCustom} className="gap-1 text-xs">
            <Plus className="w-3.5 h-3.5" /> Tambah
          </Button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {SKILL_SUGGESTIONS.map((s) => {
            const added = selectedSkills.includes(s)
            return (
              <button
                key={s}
                type="button"
                onClick={() => added ? removeSkill(s) : addSkill(s)}
                className={`text-xs px-2.5 py-1 rounded-md border transition ${
                  added ? "bg-primary text-white border-primary font-medium" : "bg-surface hover:bg-surface-alt text-text-body border-border/80"
                }`}
              >
                {added ? `✓ ${s}` : `+ ${s}`}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-border/70">
        <Button type="button" variant="outline" onClick={onBack}>← Kembali</Button>
        <Button type="button" onClick={onNext} disabled={!description.trim()} className="px-6">Lanjut ke Budget & Escrow →</Button>
      </div>
    </Card>
  )
}
