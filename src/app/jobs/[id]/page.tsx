"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Building2,
  Send,
  BookmarkPlus,
  Share2,
  CheckCircle,
  CheckCircle2,
  Users,
  Star,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react"

// Mock data - in production, fetch from API based on params.id
const JOB_DETAIL = {
  id: "1",
  title: "Desain UI/UX untuk Aplikasi Mobile Toko Online",
  employerName: "Toko Berkah Jaya",
  employerLogo: null,
  employerRating: 4.8,
  employerJobsPosted: 12,
  budget: 5000000,
  category: "UI/UX Design",
  skills: ["Figma", "UI Design", "Prototyping", "User Research", "Mobile Design"],
  location: "Remote",
  postedAt: "2 hari lalu",
  deadline: "7 hari lagi",
  applicants: 8,
  status: "OPEN",
  description: `Kami adalah UMKM yang bergerak di bidang retail fashion lokal dan sedang mengembangkan aplikasi mobile untuk toko online kami. Kami mencari desainer UI/UX yang berpengalaman untuk membantu kami menciptakan pengalaman belanja yang menarik dan mudah digunakan.

## Yang Kami Butuhkan
- Desain UI/UX lengkap untuk aplikasi mobile (iOS & Android)
- User flow dan wireframe
- High-fidelity mockup dan prototype interaktif
- Design system dan component library`,
  requirements: [
    "Minimal 2 tahun pengalaman UI/UX design",
    "Portfolio yang menunjukkan project e-commerce/retail",
    "Mahir menggunakan Figma",
    "Memahami prinsip user-centered design"
  ],
  timeline: "2-3 minggu",
  workingHours: "Fleksibel",
  projectType: "Fixed Price"
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  use(params)
  const router = useRouter()
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [proposalData, setProposalData] = useState({
    coverLetter: "",
    proposedBudget: "",
    estimatedDays: "",
    portfolioLinks: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [proposalSuccess, setProposalSuccess] = useState(false)

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false)
      setProposalSuccess(true)
      setShowProposalForm(false)
      setTimeout(() => setProposalSuccess(false), 4000)
    }, 1200)
  }

  return (
    <div className="flex min-h-screen bg-surface-alt/40">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <DashboardTopbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Link href="/jobs">
            <Button variant="ghost" size="sm" className="mb-5 text-slate-600 hover:text-slate-950 font-bold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Cari Proyek
            </Button>
          </Link>

          {proposalSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Proposal Anda berhasil diajukan ke klien! Anda dapat memantau statusnya di menu <strong>Proposal Saya</strong>.</span>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Badge variant="success" className="mb-3">{JOB_DETAIL.status}</Badge>
                    <h1 className="text-3xl font-bold text-text-heading mb-2">{JOB_DETAIL.title}</h1>
                    <div className="flex items-center gap-4 text-text-muted text-sm flex-wrap">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{JOB_DETAIL.employerName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span>{JOB_DETAIL.employerRating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Posted {JOB_DETAIL.postedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm"><BookmarkPlus className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm"><Share2 className="w-4 h-4" /></Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Budget</p>
                    <p className="font-bold text-primary text-lg">Rp {JOB_DETAIL.budget.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Deadline</p>
                    <p className="font-semibold text-text-heading">{JOB_DETAIL.deadline}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Location</p>
                    <p className="font-semibold text-text-heading flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{JOB_DETAIL.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Applicants</p>
                    <p className="font-semibold text-text-heading flex items-center gap-1">
                      <Users className="w-3 h-3" />{JOB_DETAIL.applicants} applied
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {JOB_DETAIL.skills.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold text-text-heading mb-4">Deskripsi Proyek</h2>
                <div className="prose prose-sm max-w-none text-text-body whitespace-pre-line">
                  {JOB_DETAIL.description}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold text-text-heading mb-4">Persyaratan</h2>
                <ul className="space-y-3">
                  {JOB_DETAIL.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-text-body">{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {showProposalForm && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-text-heading mb-4">Kirim Proposal</h2>
                  <form onSubmit={handleSubmitProposal} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-heading mb-2">Cover Letter</label>
                      <textarea value={proposalData.coverLetter}
                        onChange={(e) => setProposalData({ ...proposalData, coverLetter: e.target.value })}
                        placeholder="Jelaskan mengapa Anda cocok untuk proyek ini..." rows={6}
                        className="w-full px-4 py-3 bg-white border-2 border-border rounded-xl text-text-heading focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none" required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-text-heading mb-2">Budget (Rp)</label>
                        <input type="number" value={proposalData.proposedBudget}
                          onChange={(e) => setProposalData({ ...proposalData, proposedBudget: e.target.value })}
                          placeholder="5000000"
                          className="w-full h-12 px-4 bg-white border-2 border-border rounded-xl focus:border-primary outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-text-heading mb-2">Days</label>
                        <input type="number" value={proposalData.estimatedDays}
                          onChange={(e) => setProposalData({ ...proposalData, estimatedDays: e.target.value })}
                          placeholder="14"
                          className="w-full h-12 px-4 bg-white border-2 border-border rounded-xl focus:border-primary outline-none" required />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setShowProposalForm(false)} className="flex-1">Batal</Button>
                      <Button type="submit" isLoading={isSubmitting} className="flex-1">
                        <Send className="w-4 h-4 mr-2" />Kirim Proposal
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="p-6 sticky top-24">
                <Button className="w-full mb-4" size="lg" onClick={() => setShowProposalForm(true)} disabled={showProposalForm}>
                  <Send className="w-4 h-4 mr-2" />Kirim Proposal
                </Button>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-text-muted">Project Type</span>
                    <span className="font-semibold text-text-heading">{JOB_DETAIL.projectType}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-text-muted">Timeline</span>
                    <span className="font-semibold text-text-heading">{JOB_DETAIL.timeline}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-text-muted">Working Hours</span>
                    <span className="font-semibold text-text-heading">{JOB_DETAIL.workingHours}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-text-heading mb-4">Tentang Employer</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-heading">{JOB_DETAIL.employerName}</p>
                    <div className="flex items-center gap-1 text-sm text-text-muted">
                      <Star className="w-3 h-3 fill-warning text-warning" />
                      <span>{JOB_DETAIL.employerRating} rating</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Jobs Posted</span>
                    <span className="font-semibold text-text-heading">{JOB_DETAIL.employerJobsPosted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Member Since</span>
                    <span className="font-semibold text-text-heading">Jan 2024</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">Lihat Profile</Button>
              </Card>

              <Card className="p-6 bg-info-light border-info/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-text-heading mb-2">Tips Keamanan</h4>
                    <ul className="text-sm text-text-body space-y-1">
                      <li>• Jangan transfer uang di luar platform</li>
                      <li>• Gunakan sistem escrow untuk keamanan</li>
                      <li>• Komunikasi melalui platform</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
