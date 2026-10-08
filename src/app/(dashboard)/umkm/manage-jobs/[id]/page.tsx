"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ArrowLeft, Users, Star, Mail, Phone, CheckCircle, XCircle, Eye, Download, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

const JOB_DATA = {
  id: "1",
  title: "Desain UI/UX untuk Aplikasi Mobile Toko Online",
  status: "OPEN",
  budget: 5000000,
  description: "Kami membutuhkan desainer UI/UX untuk aplikasi mobile e-commerce kami...",
  postedAt: "2024-10-05",
  deadline: "2024-10-20",
  applicants: 8
}

const APPLICANTS = [
  { id: "1", name: "John Doe", atsScore: 92, proposedBudget: 4800000, estimatedDays: 14, coverLetter: "Saya memiliki 5 tahun pengalaman...", skills: ["Figma", "UI/UX", "Prototyping"], portfolio: "https://johndoe.com", email: "john@email.com", phone: "+62812345678", appliedAt: "2 hari lalu" },
  { id: "2", name: "Jane Smith", atsScore: 88, proposedBudget: 5200000, estimatedDays: 12, coverLetter: "Portfolio saya mencakup berbagai project e-commerce...", skills: ["Adobe XD", "Figma", "User Research"], portfolio: "https://janesmith.com", email: "jane@email.com", phone: "+62823456789", appliedAt: "3 hari lalu" },
  { id: "3", name: "Alex Johnson", atsScore: 85, proposedBudget: 4500000, estimatedDays: 16, coverLetter: "Saya tertarik dengan proyek ini...", skills: ["Sketch", "Figma", "Mobile Design"], portfolio: "https://alexj.com", email: "alex@email.com", phone: "+62834567890", appliedAt: "4 hari lalu" }
]

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleAccept = (applicantId: string) => {
    alert(`Accepting applicant ${applicantId}`)
  }

  const handleReject = (applicantId: string) => {
    alert(`Rejecting applicant ${applicantId}`)
  }
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />Back to Jobs
      </Button>

      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Badge variant="success" className="mb-3">{JOB_DATA.status}</Badge>
            <h1 className="text-3xl font-bold text-text-heading mb-2">{JOB_DATA.title}</h1>
            <p className="text-text-muted">Posted on {JOB_DATA.postedAt}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-surface-alt rounded-lg">
          <div>
            <p className="text-xs text-text-muted mb-1">Budget</p>
            <p className="font-bold text-primary text-lg">Rp {JOB_DATA.budget.toLocaleString('id-ID')}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Deadline</p>
            <p className="font-semibold text-text-heading">{JOB_DATA.deadline}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Applicants</p>
            <p className="font-semibold text-text-heading flex items-center gap-1">
              <Users className="w-4 h-4" />{JOB_DATA.applicants}
            </p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-text-heading mb-4">Applicants ({APPLICANTS.length})</h2>
        <div className="space-y-4">
          {APPLICANTS.map((a) => (
            <Card key={a.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{a.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-heading mb-1">{a.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-text-muted mb-2">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{a.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{a.phone}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Applied {a.appliedAt}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {a.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Badge variant={a.atsScore >= 90 ? "success" : a.atsScore >= 80 ? "warning" : "neutral"} className="text-sm">
                  ATS: {a.atsScore}%
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-surface-alt rounded-lg mb-4">
                <div>
                  <p className="text-xs text-text-muted mb-1">Proposed Budget</p>
                  <p className="font-semibold text-primary">Rp {a.proposedBudget.toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Duration</p>
                  <p className="font-semibold text-text-heading">{a.estimatedDays} days</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Portfolio</p>
                  <a href={a.portfolio} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-semibold">
                    View Portfolio
                  </a>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-text-heading mb-2">Cover Letter:</p>
                <p className="text-sm text-text-body">{a.coverLetter}</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleAccept(a.id)} className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />Accept & Hire
                </Button>
                <Button variant="outline" onClick={() => handleReject(a.id)} className="flex-1">
                  <XCircle className="w-4 h-4 mr-2" />Reject
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-2" />View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}



