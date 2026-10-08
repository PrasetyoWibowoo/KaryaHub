"use client"

import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Send, Clock, CheckCircle, XCircle, Eye, FileText, DollarSign, Calendar, Building2, Search } from "lucide-react"

const PROPOSALS = [
  { id: "1", jobTitle: "Desain UI/UX untuk Aplikasi Mobile Toko Online", employerName: "Toko Berkah Jaya", status: "PENDING", proposedBudget: 5000000, estimatedDays: 14, submittedAt: "2 hari lalu", coverLetter: "Saya memiliki pengalaman 3 tahun dalam UI/UX design...", views: 5 },
  { id: "2", jobTitle: "Website Company Profile untuk UMKM Furniture", employerName: "Mebel Jati Mas", status: "ACCEPTED", proposedBudget: 7500000, estimatedDays: 21, submittedAt: "5 hari lalu", coverLetter: "Saya tertarik dengan proyek ini karena...", views: 12 },
  { id: "3", jobTitle: "Logo & Brand Identity untuk Startup F&B", employerName: "Dapur Ibu", status: "REJECTED", proposedBudget: 3500000, estimatedDays: 10, submittedAt: "1 minggu lalu", coverLetter: "Portfolio saya menunjukkan berbagai project branding...", views: 8 },
  { id: "4", jobTitle: "Sistem Inventory & POS", employerName: "Warung Mitra Sejahtera", status: "PENDING", proposedBudget: 12000000, estimatedDays: 30, submittedAt: "3 hari lalu", coverLetter: "Saya berpengalaman dalam development sistem POS...", views: 3 }
]

export default function MyProposalsPage() {
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProposals = PROPOSALS.filter(p => {
    const matchesStatus = filterStatus === "ALL" || p.status === filterStatus
    const matchesSearch = p.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    if (status === "PENDING") return <Badge variant="warning"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>
    if (status === "ACCEPTED") return <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" /> Accepted</Badge>
    if (status === "REJECTED") return <Badge variant="error"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>
    return null
  }

  const stats = { total: PROPOSALS.length, pending: PROPOSALS.filter(p => p.status === "PENDING").length, accepted: PROPOSALS.filter(p => p.status === "ACCEPTED").length, rejected: PROPOSALS.filter(p => p.status === "REJECTED").length }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-heading">Proposal Saya</h1>
        <p className="text-text-muted mt-1">Kelola dan pantau semua proposal yang telah Anda kirim</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-text-muted mb-1">Total</p><p className="text-2xl font-bold text-text-heading">{stats.total}</p></div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Send className="w-5 h-5 text-primary" /></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-text-muted mb-1">Pending</p><p className="text-2xl font-bold text-warning">{stats.pending}</p></div>
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center"><Clock className="w-5 h-5 text-warning" /></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-text-muted mb-1">Accepted</p><p className="text-2xl font-bold text-success">{stats.accepted}</p></div>
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-success" /></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-text-muted mb-1">Rejected</p><p className="text-2xl font-bold text-error">{stats.rejected}</p></div>
            <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center"><XCircle className="w-5 h-5 text-error" /></div>
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
          <div className="flex gap-2">
            {["ALL", "PENDING", "ACCEPTED", "REJECTED"].map(f => (
              <Button key={f} variant={filterStatus === f ? "default" : "outline"} size="sm" onClick={() => setFilterStatus(f)}>{f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}</Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredProposals.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-text-heading mb-2">Tidak ada proposal ditemukan</h3>
            <p className="text-text-muted">Coba ubah filter atau cari dengan kata kunci lain</p>
          </Card>
        ) : (
          filteredProposals.map((p) => (
            <Card key={p.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusBadge(p.status)}
                    <span className="text-xs text-text-muted">Submitted {p.submittedAt}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-heading mb-1">{p.jobTitle}</h3>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Building2 className="w-4 h-4" /><span>{p.employerName}</span>
                    <span className="mx-2">•</span><Eye className="w-4 h-4" /><span>{p.views} views</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-surface-alt rounded-lg">
                <div>
                  <p className="text-xs text-text-muted mb-1">Budget</p>
                  <p className="font-semibold text-primary flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />Rp {p.proposedBudget.toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Duration</p>
                  <p className="font-semibold text-text-heading flex items-center gap-1">
                    <Calendar className="w-4 h-4" />{p.estimatedDays} days
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-text-muted font-semibold mb-2">Cover Letter:</p>
                <p className="text-sm text-text-body line-clamp-2">{p.coverLetter}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1"><Eye className="w-4 h-4 mr-2" />View Details</Button>
                {p.status === "PENDING" && <Button variant="ghost" size="sm">Edit</Button>}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}



