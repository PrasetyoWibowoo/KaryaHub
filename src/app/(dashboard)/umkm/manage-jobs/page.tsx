"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Briefcase, Users, Eye, Edit, Trash2, PlusCircle, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const JOBS = [
  { id: "1", title: "Desain UI/UX untuk Aplikasi Mobile", status: "OPEN", budget: 5000000, applicants: 8, views: 45, postedAt: "2 hari lalu", deadline: "7 hari lagi" },
  { id: "2", title: "Website Company Profile", status: "IN_PROGRESS", budget: 8000000, applicants: 12, views: 67, postedAt: "1 minggu lalu", deadline: "14 hari lagi", freelancer: "John Doe" },
  { id: "3", title: "Social Media Content Creation", status: "COMPLETED", budget: 3500000, applicants: 15, views: 89, postedAt: "2 minggu lalu", completedAt: "3 hari lalu", freelancer: "Jane Smith" },
  { id: "4", title: "Logo & Brand Identity", status: "CANCELLED", budget: 4000000, applicants: 6, views: 34, postedAt: "3 minggu lalu" }
]

export default function ManageJobsPage() {
  const router = useRouter()
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredJobs = JOBS.filter(j => {
    const matchesStatus = filterStatus === "ALL" || j.status === filterStatus
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    const variants: any = { OPEN: <Badge variant="success">Open</Badge>, IN_PROGRESS: <Badge variant="warning">In Progress</Badge>, COMPLETED: <Badge variant="primary">Completed</Badge>, CANCELLED: <Badge variant="error">Cancelled</Badge> }
    return variants[status]
  }

  const stats = { total: JOBS.length, open: JOBS.filter(j => j.status === "OPEN").length, inProgress: JOBS.filter(j => j.status === "IN_PROGRESS").length, completed: JOBS.filter(j => j.status === "COMPLETED").length }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-heading">Kelola Proyek</h1>
          <p className="text-text-muted mt-1">Pantau dan kelola semua proyek yang Anda posting</p>
        </div>
        <Button onClick={() => router.push('/umkm/create-job')}>
          <PlusCircle className="w-4 h-4 mr-2" />Post New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-text-muted mb-1">Total</p><p className="text-2xl font-bold">{stats.total}</p></div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Briefcase className="w-5 h-5 text-primary" /></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-text-muted mb-1">Open</p><p className="text-2xl font-bold text-success">{stats.open}</p></div>
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center"><Eye className="w-5 h-5 text-success" /></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-text-muted mb-1">In Progress</p><p className="text-2xl font-bold text-warning">{stats.inProgress}</p></div>
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center"><Users className="w-5 h-5 text-warning" /></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-text-muted mb-1">Completed</p><p className="text-2xl font-bold text-primary">{stats.completed}</p></div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Briefcase className="w-5 h-5 text-primary" /></div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari proyek..."
              className="w-full h-10 pl-10 pr-4 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["ALL", "OPEN", "IN_PROGRESS", "COMPLETED"].map(f => (
              <Button key={f} variant={filterStatus === f ? "default" : "outline"} size="sm" onClick={() => setFilterStatus(f)}>
                {f === "ALL" ? "All" : f === "IN_PROGRESS" ? "Progress" : f}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusBadge(job.status)}
                  <span className="text-xs text-text-muted">Posted {job.postedAt}</span>
                </div>
                <h3 className="text-lg font-bold text-text-heading mb-1">{job.title}</h3>
                {job.freelancer && <p className="text-sm text-text-muted">Freelancer: <span className="font-semibold text-text-heading">{job.freelancer}</span></p>}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-surface-alt rounded-lg">
              <div><p className="text-xs text-text-muted mb-1">Budget</p><p className="font-semibold text-primary">Rp {job.budget.toLocaleString('id-ID')}</p></div>
              <div><p className="text-xs text-text-muted mb-1">Applicants</p><p className="font-semibold text-text-heading flex items-center gap-1"><Users className="w-4 h-4" />{job.applicants}</p></div>
              <div><p className="text-xs text-text-muted mb-1">Views</p><p className="font-semibold text-text-heading flex items-center gap-1"><Eye className="w-4 h-4" />{job.views}</p></div>
              <div><p className="text-xs text-text-muted mb-1">Deadline</p><p className="font-semibold text-text-heading">{job.deadline || job.completedAt || '-'}</p></div>
            </div>
            <div className="flex gap-2">
              <Button variant="default" size="sm" onClick={() => router.push(`/umkm/manage-jobs/${job.id}`)}>
                <Eye className="w-4 h-4 mr-2" />View Details
              </Button>
              {job.status === "OPEN" && (
                <>
                  <Button variant="outline" size="sm"><Edit className="w-4 h-4 mr-2" />Edit</Button>
                  <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}



