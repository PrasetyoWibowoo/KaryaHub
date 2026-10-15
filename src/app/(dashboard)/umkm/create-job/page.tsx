"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Briefcase, ArrowLeft, Eye, CheckCircle2 } from "lucide-react"
import { CreateJobStep1 } from "@/components/dashboard/umkm/CreateJobStep1"
import { CreateJobStep2 } from "@/components/dashboard/umkm/CreateJobStep2"
import { CreateJobStep3 } from "@/components/dashboard/umkm/CreateJobStep3"
import { JobLivePreview } from "@/components/dashboard/umkm/JobLivePreview"

export default function CreateJobPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [submittedSuccess, setSubmittedSuccess] = useState(false)

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("branding")
  const [experienceLevel, setExperienceLevel] = useState("Menengah (Intermediate)")
  const [description, setDescription] = useState("")
  const [deliverables, setDeliverables] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Figma", "Branding"])
  const [budget, setBudget] = useState("3500000")
  const [estimatedDays, setEstimatedDays] = useState("14")
  const [paymentType, setPaymentType] = useState<"fixed" | "milestone">("fixed")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedSuccess(true)
      setTimeout(() => router.push("/umkm/manage-jobs"), 1500)
    }, 1200)
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/umkm/manage-jobs" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-2 font-medium">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Kelola Proyek
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight">Posting Proyek Baru UMKM</h1>
              <p className="text-sm text-text-muted">Publikasikan kebutuhan digitalisasi bisnis Anda dan temukan talenta terverifikasi.</p>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="gap-2 self-start sm:self-auto">
          <Eye className="w-4 h-4" /> {showPreview ? "Tutup Preview" : "Lihat Preview"}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 p-2 bg-surface rounded-2xl border border-border/80">
        {[
          { step: 1, label: "Informasi Dasar" },
          { step: 2, label: "Deskripsi & Skill" },
          { step: 3, label: "Budget & Escrow" },
        ].map((item) => (
          <button
            key={item.step}
            type="button"
            onClick={() => setCurrentStep(item.step as 1 | 2 | 3)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              currentStep === item.step ? "bg-primary text-white font-semibold shadow-sm shadow-primary/20" : "text-text-muted hover:bg-surface-alt font-medium"
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${currentStep === item.step ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
              {item.step}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs uppercase tracking-wider opacity-80 leading-none">Langkah {item.step}</p>
              <p className="text-sm font-semibold truncate">{item.label}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={showPreview ? "lg:col-span-2 space-y-6" : "lg:col-span-3 space-y-6"}>
          {submittedSuccess ? (
            <Card className="p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-text-heading">Proyek Berhasil Dipublikasikan!</h2>
              <p className="text-text-muted max-w-md mx-auto text-sm">
                Proyek Anda kini aktif di feed KaryaHub dan siap menerima penawaran proposal dari freelancer terverifikasi.
              </p>
              <Badge variant="success" className="px-3 py-1">Mengalihkan ke halaman Kelola Proyek...</Badge>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <CreateJobStep1
                  title={title}
                  setTitle={setTitle}
                  category={category}
                  setCategory={setCategory}
                  experienceLevel={experienceLevel}
                  setExperienceLevel={setExperienceLevel}
                  onNext={() => setCurrentStep(2)}
                />
              )}
              {currentStep === 2 && (
                <CreateJobStep2
                  description={description}
                  setDescription={setDescription}
                  deliverables={deliverables}
                  setDeliverables={setDeliverables}
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                  onBack={() => setCurrentStep(1)}
                  onNext={() => setCurrentStep(3)}
                />
              )}
              {currentStep === 3 && (
                <CreateJobStep3
                  paymentType={paymentType}
                  setPaymentType={setPaymentType}
                  budget={budget}
                  setBudget={setBudget}
                  estimatedDays={estimatedDays}
                  setEstimatedDays={setEstimatedDays}
                  isSubmitting={isSubmitting}
                  onBack={() => setCurrentStep(2)}
                  onPreview={() => setShowPreview(true)}
                />
              )}
            </form>
          )}
        </div>

        {showPreview && (
          <div className="lg:col-span-1 space-y-4 sticky top-20">
            <JobLivePreview
              title={title}
              category={category}
              budget={budget}
              estimatedDays={estimatedDays}
              paymentType={paymentType}
              description={description}
              selectedSkills={selectedSkills}
            />
          </div>
        )}
      </div>
    </div>
  )
}
