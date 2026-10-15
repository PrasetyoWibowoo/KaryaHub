"use client"

import { useState, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { HireCandidateModal } from "@/components/dashboard/umkm/HireCandidateModal"
import { CandidateCard, Candidate } from "@/components/dashboard/umkm/CandidateCard"

const JOB_DATA = {
  id: "1",
  title: "Desain UI/UX & Prototipe Toko Online Mobile",
  category: "UI/UX Design",
  status: "OPEN",
  budget: 5000000,
  postedAt: "05 Okt 2024",
  deadline: "20 Okt 2024",
  applicantsCount: 3,
  description:
    "Kami membutuhkan perombakan UI/UX komprehensif untuk aplikasi belanja online produk herbal UMKM kami di Android dan iOS. Target luaran meliputi wireframe, interaksi prototype Figma siap uji, dan aset siap handoff ke tim developer.",
  deliverables: [
    "Design System & Color Tokens (Figma)",
    "Wireflow lengkap 25+ halaman utama",
    "Prototipe interaktif clickable",
    "Asset export @1x, @2x, @3x & Icon pack SVG",
  ],
}

const INITIAL_APPLICANTS: Candidate[] = [
  {
    id: "c1",
    name: "Budi Pratama",
    avatar: "B",
    role: "Senior Product Designer",
    location: "Bandung, Jawa Barat",
    atsScore: 94,
    proposedBudget: 4800000,
    estimatedDays: 12,
    coverLetter:
      "Halo! Saya berpengalaman 4+ tahun merancang antarmuka mobile e-commerce UMKM di Indonesia. Portofolio saya mencakup aplikasi retail dengan kenaikan konversi checkout 35%. Siap menyelesaikan sesuai timeline Anda.",
    skills: [
      { name: "Figma", matched: true },
      { name: "UI/UX", matched: true },
      { name: "Prototyping", matched: true },
      { name: "Design System", matched: true },
      { name: "E-Commerce", matched: true },
    ],
    portfolioUrl: "https://behance.net",
    appliedAt: "1 hari lalu",
    status: "PENDING",
  },
  {
    id: "c2",
    name: "Siti Rahmawati",
    avatar: "S",
    role: "UI Designer & Visual Artist",
    location: "Yogyakarta",
    atsScore: 88,
    proposedBudget: 5000000,
    estimatedDays: 14,
    coverLetter:
      "Sangat tertarik dengan branding produk herbal UMKM ini! Saya memiliki spesialisasi desain clean & friendly untuk audiens lokal Indonesia. Figma master siap rapi dengan auto-layout.",
    skills: [
      { name: "Figma", matched: true },
      { name: "Mobile UI", matched: true },
      { name: "Iconography", matched: true },
      { name: "Design System", matched: true },
    ],
    portfolioUrl: "https://dribbble.com",
    appliedAt: "2 hari lalu",
    status: "PENDING",
  },
  {
    id: "c3",
    name: "Alex Wijaya",
    avatar: "A",
    role: "UX Researcher & Mobile Dev",
    location: "Jakarta Selatan",
    atsScore: 81,
    proposedBudget: 4500000,
    estimatedDays: 16,
    coverLetter:
      "Menawarkan paket desain siap implementasi React Native. Saya bisa mendampingi proses implementasi agar developer tidak kesulitan menerjemahkan desain.",
    skills: [
      { name: "Figma", matched: true },
      { name: "User Flow", matched: true },
      { name: "React Native", matched: false },
    ],
    portfolioUrl: "https://github.com",
    appliedAt: "3 hari lalu",
    status: "PENDING",
  },
]

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const jobId = use(params).id

  const [applicants, setApplicants] = useState<Candidate[]>(INITIAL_APPLICANTS)
  const [filterType, setFilterType] = useState<"ALL" | "TOP_MATCH" | "UNDER_BUDGET">("ALL")
  const [candidateToHire, setCandidateToHire] = useState<Candidate | null>(null)

  const handleHireConfirm = (candidateId: string) => {
    setApplicants((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: "HIRED" } : c))
    )
  }

  const handleReject = (candidateId: string) => {
    if (confirm("Tolak proposal dari kandidat ini?")) {
      setApplicants((prev) =>
        prev.map((c) => (c.id === candidateId ? { ...c, status: "REJECTED" } : c))
      )
    }
  }

  const filteredCandidates = applicants.filter((c) => {
    if (filterType === "TOP_MATCH") return c.atsScore >= 90
    if (filterType === "UNDER_BUDGET") return c.proposedBudget <= JOB_DATA.budget
    return true
  })

  return (
    <div className="space-y-6 pb-16">
      <div>
        <Link
          href="/umkm/manage-jobs"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-3 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Proyek
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="success" className="font-semibold">{JOB_DATA.status}</Badge>
              <Badge variant="neutral">{JOB_DATA.category}</Badge>
              <span className="text-xs text-text-muted">ID: PROJ-{jobId}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight">{JOB_DATA.title}</h1>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-text-muted block">Alokasi Budget</span>
            <span className="text-2xl font-extrabold text-primary">Rp {JOB_DATA.budget.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-text-heading text-base">Deskripsi & Ruang Lingkup Pekerjaan</h3>
        <p className="text-sm text-text-body leading-relaxed">{JOB_DATA.description}</p>
        <div className="pt-2 border-t border-border">
          <p className="text-xs font-semibold text-text-heading mb-2">Target Luaran (Deliverables):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-muted">
            {JOB_DATA.deliverables.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-text-heading">Evaluasi Pelamar ({filteredCandidates.length})</h2>
            <p className="text-xs text-text-muted">Skor ATS dihitung otomatis berdasarkan kesesuaian skill & portofolio kandidat.</p>
          </div>
          <div className="flex gap-1.5">
            {[
              { id: "ALL", label: "Semua Pelamar" },
              { id: "TOP_MATCH", label: "ATS Match >90%" },
              { id: "UNDER_BUDGET", label: "Sesuai Budget" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterType === f.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface text-text-muted hover:bg-surface-alt border border-border"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              jobId={jobId}
              onHire={(c) => setCandidateToHire(c)}
              onReject={handleReject}
            />
          ))}
        </div>
      </div>
      <HireCandidateModal
        isOpen={Boolean(candidateToHire)}
        candidate={candidateToHire}
        jobTitle={JOB_DATA.title}
        onClose={() => setCandidateToHire(null)}
        onConfirmHire={handleHireConfirm}
      />
    </div>
  )
}
