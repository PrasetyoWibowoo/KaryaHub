"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Lock, CheckCircle, Clock, AlertCircle, DollarSign, Shield, Calendar, FileText } from "lucide-react"

const ESCROW_TRANSACTIONS = [
  { id: "1", jobTitle: "Desain UI/UX untuk Aplikasi Mobile", freelancer: "John Doe", amount: 5000000, status: "HELD_IN_ESCROW", createdAt: "2024-10-05", projectStatus: "IN_PROGRESS", daysRemaining: 12 },
  { id: "2", jobTitle: "Website Company Profile", freelancer: "Jane Smith", amount: 7500000, status: "RELEASED", createdAt: "2024-09-28", releasedAt: "2024-10-03", projectStatus: "COMPLETED" },
  { id: "3", jobTitle: "Social Media Content", freelancer: "Alex Johnson", amount: 3500000, status: "PENDING", createdAt: "2024-10-06", projectStatus: "WAITING_PAYMENT" },
  { id: "4", jobTitle: "Logo Design", freelancer: "Sarah Williams", amount: 4000000, status: "REFUNDED", createdAt: "2024-09-20", refundedAt: "2024-09-25", projectStatus: "CANCELLED", reason: "Project cancelled by employer" }
]

export default function EscrowStatusPage() {
  const getStatusBadge = (status: string) => {
    const variants: any = {
      PENDING: <Badge variant="warning"><Clock className="w-3 h-3 mr-1" />Pending Payment</Badge>,
      HELD_IN_ESCROW: <Badge variant="info"><Lock className="w-3 h-3 mr-1" />Held in Escrow</Badge>,
      RELEASED: <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" />Released</Badge>,
      REFUNDED: <Badge variant="error"><AlertCircle className="w-3 h-3 mr-1" />Refunded</Badge>
    }
    return variants[status]
  }

  const stats = {
    totalLocked: ESCROW_TRANSACTIONS.filter(t => t.status === "HELD_IN_ESCROW").reduce((sum, t) => sum + t.amount, 0),
    totalReleased: ESCROW_TRANSACTIONS.filter(t => t.status === "RELEASED").reduce((sum, t) => sum + t.amount, 0),
    pending: ESCROW_TRANSACTIONS.filter(t => t.status === "PENDING").length,
    active: ESCROW_TRANSACTIONS.filter(t => t.status === "HELD_IN_ESCROW").length
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-heading">Status Escrow</h1>
        <p className="text-text-muted mt-1">Pantau keamanan transaksi dan pembayaran proyek Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 md:col-span-2 bg-gradient-to-br from-info to-primary text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-2">Total Locked in Escrow</p>
              <h2 className="text-3xl font-bold">Rp {stats.totalLocked.toLocaleString('id-ID')}</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-white/90">Dana aman tersimpan hingga proyek selesai</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-text-muted mb-1">Active</p><p className="text-2xl font-bold text-info">{stats.active}</p></div>
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center"><Shield className="w-5 h-5 text-info" /></div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-text-muted mb-1">Released</p><p className="text-xl font-bold text-success">Rp {(stats.totalReleased/1000000).toFixed(1)}M</p></div>
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-success" /></div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-info-light border-info/20">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-text-heading mb-2">Bagaimana Escrow Bekerja?</h3>
            <ul className="text-sm text-text-body space-y-1">
              <li>1. Dana dikunci saat proyek dimulai</li>
              <li>2. Freelancer submit deliverables</li>
              <li>3. Review dan approve hasil kerja</li>
              <li>4. Dana otomatis di-release setelah approval</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-text-heading">Riwayat Transaksi Escrow</h2>
        {ESCROW_TRANSACTIONS.map((e) => (
          <Card key={e.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusBadge(e.status)}
                  <span className="text-xs text-text-muted">Created {e.createdAt}</span>
                </div>
                <h3 className="text-lg font-bold text-text-heading mb-1">{e.jobTitle}</h3>
                <p className="text-sm text-text-muted">Freelancer: <span className="font-semibold text-text-heading">{e.freelancer}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-surface-alt rounded-lg mb-4">
              <div>
                <p className="text-xs text-text-muted mb-1">Amount</p>
                <p className="font-bold text-primary text-lg flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />Rp {e.amount.toLocaleString('id-ID')}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Project Status</p>
                <p className="font-semibold text-text-heading">{e.projectStatus.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">{e.releasedAt ? 'Released' : e.refundedAt ? 'Refunded' : 'Days Remaining'}</p>
                <p className="font-semibold text-text-heading">{e.releasedAt || e.refundedAt || `${e.daysRemaining || 0} days`}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Transaction ID</p>
                <p className="font-mono text-xs text-text-heading">ESC-{e.id}</p>
              </div>
            </div>

            {e.reason && (
              <div className="p-3 bg-error-light border border-error/20 rounded-lg mb-4">
                <p className="text-sm text-error font-semibold">Reason: {e.reason}</p>
              </div>
            )}

            {e.status === "HELD_IN_ESCROW" && (
              <div className="flex gap-2">
                <Button size="sm" variant="default">Release Payment</Button>
                <Button size="sm" variant="outline">Request Refund</Button>
                <Button size="sm" variant="ghost"><FileText className="w-4 h-4 mr-2" />View Details</Button>
              </div>
            )}

            {e.status === "PENDING" && (
              <Button size="sm" className="w-full">Complete Payment via Midtrans</Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}



