"use client"

import * as React from "react"
import { UploadCloud, CheckCircle2, AlertCircle, FileText, Check } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { FadeIn } from "@/components/ui/FadeIn"

export default function ATSCheckerPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasResult, setHasResult] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleScan = () => {
    setIsLoading(true)
    // Mock API call
    setTimeout(() => {
      setIsLoading(false)
      setHasResult(true)
    }, 2000)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <FadeIn>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-main mb-2">AI ATS Resume Checker</h1>
        <p className="text-text-muted">
          Pindai resume Anda menggunakan AI untuk melihat kecocokannya dengan deskripsi pekerjaan target.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Kolom Kiri: Upload Area */}
        <div className="space-y-6">
          <Card 
            className="border-dashed border-2 border-border bg-surface/30 hover:border-primary/50 transition-colors p-10 flex flex-col items-center justify-center text-center cursor-pointer min-h-[240px]"
            onClick={triggerFileInput}
          >
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
              <UploadCloud className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-text-main mb-1">Drag & drop PDF resume Anda di sini</h3>
            <p className="text-sm text-text-muted mb-4">Maksimal ukuran file: 5MB</p>
            <Button variant="outline" type="button" onClick={(e) => {
              e.stopPropagation()
              triggerFileInput()
            }}>
              Pilih File
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.doc,.docx"
            />
          </Card>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-main block">
              Job Description Target
            </label>
            <textarea 
              className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors min-h-[120px] resize-none"
              placeholder="Paste deskripsi lowongan pekerjaan di sini agar AI dapat mencocokkan kata kunci..."
            />
          </div>

          <Button 
            className="w-full h-12 text-base" 
            onClick={handleScan}
            isLoading={isLoading}
          >
            {isLoading ? "Menganalisis Resume..." : "Scan Resume Sekarang"}
          </Button>
        </div>

        {/* Kolom Kanan: Result Area */}
        <div>
          {!hasResult && !isLoading && (
            <Card className="h-full flex flex-col items-center justify-center p-8 text-center bg-surface/30 opacity-70">
              <FileText className="h-12 w-12 text-text-muted mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-text-main mb-2">Belum ada hasil</h3>
              <p className="text-sm text-text-muted">
                Unggah resume dan masukkan deskripsi pekerjaan untuk melihat analisis kecocokan dari sistem ATS kami.
              </p>
            </Card>
          )}

          {hasResult && (
            <FadeIn>
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6 border-b border-border pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-text-main mb-1">Hasil Analisis ATS</h3>
                    <p className="text-sm text-text-muted">resume-frontend-dev.pdf</p>
                  </div>
                  <Badge variant="success" className="text-sm px-3 py-1">
                    Skor: 85/100
                  </Badge>
                </div>

                {/* Progress Bar Visual */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-main font-medium">Tingkat Kecocokan</span>
                    <span className="text-primary font-bold">Tinggi</span>
                  </div>
                  <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[85%] transition-all duration-1000" />
                  </div>
                </div>

                {/* List Feedback */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-text-main flex items-center gap-2 mb-3">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Kekuatan Resume Anda
                    </h4>
                    <ul className="space-y-2">
                      <li className="text-sm text-text-muted flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        Penggunaan keyword "React" dan "TypeScript" sangat relevan.
                      </li>
                      <li className="text-sm text-text-muted flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        Struktur pengalaman kerja terbaca jelas oleh mesin (reverse-chronological).
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-text-main flex items-center gap-2 mb-3">
                      <AlertCircle className="h-4 w-4 text-orange-400" />
                      Saran Perbaikan
                    </h4>
                    <ul className="space-y-2">
                      <li className="text-sm text-text-muted flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5 mx-1.5" />
                        Tambahkan kata kunci "Next.js App Router" yang sering muncul di job description.
                      </li>
                      <li className="text-sm text-text-muted flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5 mx-1.5" />
                        Ubah format tabel ke teks biasa. ATS mungkin kesulitan membaca teks di dalam kolom tabel.
                      </li>
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
