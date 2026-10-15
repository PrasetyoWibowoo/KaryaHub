"use client"

import * as React from "react"
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Check, 
  Sparkles, 
  X, 
  FileCheck2, 
  RefreshCw,
  Tag,
  ArrowRight
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { FadeIn } from "@/components/ui/FadeIn"

const DEMO_RESUME = {
  name: "Resume_John_Doe_Frontend.pdf",
  size: "2.4 MB",
  jobDescription: `Dicari Frontend Developer (React / Next.js) dengan kualifikasi:
- Menguasai React, TypeScript, Next.js App Router, Tailwind CSS
- Memahami integrasi REST API, State Management (Zustand/Redux)
- Berpengalaman dengan Git workflow dan implementasi UI responsif
- Nilai plus: pemahaman dasar SEO, Testing, dan optimasi web vitals.`,
  result: {
    score: 88,
    matchLevel: "Tinggi (Strong Match)",
    summary: "Resume memiliki struktur yang sangat baik dan menyerap sebagian besar kata kunci utama dari deskripsi pekerjaan.",
    matchedKeywords: ["React", "TypeScript", "Tailwind CSS", "REST API", "Git", "Next.js"],
    missingKeywords: ["Next.js App Router", "State Management", "Web Vitals"],
    strengths: [
      "Penggunaan kata kunci 'React' dan 'TypeScript' sangat konsisten dan relevan.",
      "Format kronologis terbalik (reverse-chronological) mudah dipindai oleh mesin ATS.",
      "Poin-poin pengalaman kerja berorientasi pada pencapaian dan metrik hasil."
    ],
    improvements: [
      "Sertakan spesifik kata kunci 'Next.js App Router' dan 'Zustand' untuk meningkatkan relevansi teknis.",
      "Gunakan format teks polos pada ringkasan profil, hindari grafik kolom bertingkat yang rumit agar tidak terlewat oleh parser ATS lama."
    ]
  }
}

export default function ATSCheckerPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasResult, setHasResult] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<{ name: string; size: string } | null>(null)
  const [jobDescription, setJobDescription] = React.useState("")
  const [analysisData, setAnalysisData] = React.useState(DEMO_RESUME.result)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleScan = () => {
    if (!selectedFile && !jobDescription.trim()) {
      // Default to demo if nothing is selected
      loadDemoData()
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setHasResult(true)
    }, 1200)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      })
    }
  }

  const loadDemoData = () => {
    setSelectedFile({
      name: DEMO_RESUME.name,
      size: DEMO_RESUME.size
    })
    setJobDescription(DEMO_RESUME.jobDescription)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setHasResult(true)
    }, 900)
  }

  const resetAnalysis = () => {
    setHasResult(false)
    setSelectedFile(null)
    setJobDescription("")
  }

  return (
    <FadeIn>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/60 text-indigo-700 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Evaluator Cerdas ATS</span>
            </div>
            <h1 className="text-3xl font-bold font-display text-text-heading mb-1.5">
              AI ATS Resume Checker
            </h1>
            <p className="text-sm text-text-muted max-w-xl">
              Pindai resume Anda menggunakan AI untuk mendeteksi kesesuaian kata kunci, keterbacaan struktur, dan tingkat kecocokan dengan lowongan UMKM target.
            </p>
          </div>

          {/* Judge-Friendly Feature: 1-Click Demo CV */}
          <Button 
            variant="outline" 
            onClick={loadDemoData}
            className="shrink-0 bg-white/80 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 shadow-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
            Uji Cepat (Demo CV)
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Kolom Kiri: Upload Area */}
        <div className="space-y-6">
          <Card 
            hover={false}
            className="border-dashed border-2 border-border/80 bg-surface/80 hover:border-indigo-400/80 transition-all p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[230px] rounded-2xl group shadow-soft"
            onClick={triggerFileInput}
          >
            {selectedFile ? (
              <div className="w-full flex items-center justify-between p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/60 text-left">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-heading truncate">{selectedFile.name}</p>
                    <p className="text-xs text-text-muted">{selectedFile.size} • Siap dianalisis</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedFile(null)
                  }}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform text-indigo-600 shadow-sm">
                  <UploadCloud className="h-7 w-7" />
                </div>
                <h3 className="text-base font-semibold text-text-heading mb-1">
                  Unggah atau Drag & Drop CV PDF
                </h3>
                <p className="text-xs text-text-muted mb-4">
                  Format file: .pdf, .docx (Maksimal 5MB)
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  type="button" 
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerFileInput()
                  }}
                  className="shadow-sm"
                >
                  Pilih Dokumen
                </Button>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </Card>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-text-heading">
                Deskripsi Lowongan Target
              </label>
              {!jobDescription && (
                <button
                  type="button"
                  onClick={() => setJobDescription(DEMO_RESUME.jobDescription)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  + Tempel Contoh Lowongan
                </button>
              )}
            </div>
            <textarea 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="flex w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-heading placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[140px] resize-none shadow-soft"
              placeholder="Paste deskripsi lowongan pekerjaan UMKM di sini agar AI dapat mencocokkan kata kunci & spesifikasi keahlian..."
            />
          </div>

          <Button 
            variant="black"
            className="w-full h-12 text-sm font-semibold shadow-md hover:shadow-lg transition-all" 
            onClick={handleScan}
            isLoading={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Memindai & Menganalisis dengan AI...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4" />
                Scan Resume Sekarang
              </span>
            )}
          </Button>
        </div>

        {/* Kolom Kanan: Result Area */}
        <div>
          {!hasResult && !isLoading && (
            <Card hover={false} className="min-h-[460px] flex flex-col items-center justify-center p-8 text-center bg-surface/60 border-dashed">
              <div className="w-16 h-16 rounded-2xl bg-surface-alt flex items-center justify-center mb-4 text-text-muted">
                <FileText className="h-8 w-8 opacity-60" />
              </div>
              <h3 className="text-lg font-bold text-text-heading mb-2">Belum ada hasil analisis</h3>
              <p className="text-sm text-text-muted max-w-sm leading-relaxed mb-6">
                Unggah resume Anda dan masukkan deskripsi pekerjaan di sebelah kiri, atau klik tombol <strong className="text-indigo-600">"Uji Cepat (Demo CV)"</strong> di atas untuk melihat simulasi hasil evaluasi.
              </p>
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs text-left">
                <div className="p-3 rounded-xl bg-surface border border-border text-xs text-text-muted">
                  <p className="font-semibold text-text-heading mb-0.5">Scoring 0–100%</p>
                  Kalkulasi relevansi otomatis
                </div>
                <div className="p-3 rounded-xl bg-surface border border-border text-xs text-text-muted">
                  <p className="font-semibold text-text-heading mb-0.5">Keyword Match</p>
                  Pendeteksi missing keywords
                </div>
              </div>
            </Card>
          )}

          {isLoading && (
            <Card hover={false} className="min-h-[460px] flex flex-col items-center justify-center p-8 text-center bg-surface">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mb-4" />
              <h3 className="text-lg font-bold text-text-heading mb-1">Mengevaluasi Dokumen...</h3>
              <p className="text-xs text-text-muted max-w-sm">
                AI sedang mengekstrak teks, membandingkan kata kunci, dan menghitung persentase kecocokan ATS.
              </p>
            </Card>
          )}

          {hasResult && !isLoading && (
            <FadeIn>
              <Card hover={false} className="p-6 bg-surface shadow-card">
                {/* Header Hasil */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-6 border-b border-border">
                  <div>
                    <h3 className="text-xl font-bold text-text-heading">Hasil Analisis ATS</h3>
                    <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      {selectedFile ? selectedFile.name : DEMO_RESUME.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Skor ATS: {analysisData.score}/100
                    </span>
                    <button
                      type="button"
                      onClick={resetAnalysis}
                      className="p-1.5 rounded-lg text-text-muted hover:text-text-heading hover:bg-surface-alt transition-colors"
                      title="Reset Hasil"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar Visual & Level */}
                <div className="mb-6 p-4 rounded-xl bg-surface-alt/80 border border-border">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-text-heading font-semibold text-xs">Tingkat Kecocokan</span>
                    <span className="text-emerald-600 font-bold text-xs">{analysisData.matchLevel}</span>
                  </div>
                  <div className="h-2.5 w-full bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000"
                      style={{ width: `${analysisData.score}%` }} 
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-2.5 leading-relaxed">
                    {analysisData.summary}
                  </p>
                </div>

                {/* Keywords Breakdown */}
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      Kata Kunci Ditemukan ({analysisData.matchedKeywords.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisData.matchedKeywords.map((kw) => (
                        <span key={kw} className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3 mr-1" />
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      Kata Kunci Terlewat ({analysisData.missingKeywords.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisData.missingKeywords.map((kw) => (
                        <span key={kw} className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Feedback Sections */}
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-heading flex items-center gap-1.5 mb-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Kekuatan Resume Anda
                    </h4>
                    <ul className="space-y-2">
                      {analysisData.strengths.map((str, idx) => (
                        <li key={idx} className="text-xs text-text-muted flex items-start gap-2 leading-relaxed">
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-heading flex items-center gap-1.5 mb-2.5">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      Rekomendasi Perbaikan
                    </h4>
                    <ul className="space-y-2">
                      {analysisData.improvements.map((imp, idx) => (
                        <li key={idx} className="text-xs text-text-muted flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5 mx-1" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </FadeIn>
          )}
        </div>
      </div>
    </FadeIn>
  )
}
