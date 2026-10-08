"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Clock, CheckCircle, Download, Calendar } from "lucide-react"

const WALLET_DATA = { balance: 25000000, pendingPayment: 8000000, totalEarned: 52000000, transactionsThisMonth: 15 }

const TRANSACTIONS = [
  { id: "1", type: "credit", amount: 5000000, description: "Payment from Toko Berkah Jaya - UI/UX Project", date: "2024-10-05", status: "completed", project: "Desain UI/UX Mobile App" },
  { id: "2", type: "debit", amount: 500000, description: "Withdrawal to Bank BCA", date: "2024-10-03", status: "completed", reference: "WD-20241003-001" },
  { id: "3", type: "credit", amount: 7500000, description: "Payment from Mebel Jati Mas - Website Project", date: "2024-10-01", status: "completed", project: "Website Company Profile" },
  { id: "4", type: "pending", amount: 3500000, description: "Escrow held - Logo Design Project", date: "2024-09-28", status: "pending", project: "Logo & Brand Identity" },
  { id: "5", type: "pending", amount: 4500000, description: "Escrow held - Mobile App Development", date: "2024-09-25", status: "pending", project: "Mobile App E-commerce" }
]

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-heading">Dompet Saya</h1>
          <p className="text-text-muted mt-1">Kelola pendapatan dan riwayat transaksi Anda</p>
        </div>
        <Button><Download className="w-4 h-4 mr-2" />Tarik Dana</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 md:col-span-2 bg-gradient-to-br from-primary to-primary-hover text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-2">Saldo Tersedia</p>
              <h2 className="text-4xl font-bold">Rp {WALLET_DATA.balance.toLocaleString('id-ID')}</h2>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Wallet className="w-7 h-7" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <TrendingUp className="w-4 h-4" /><span>+12% dari bulan lalu</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Pending</p>
              <p className="text-2xl font-bold text-warning">Rp {WALLET_DATA.pendingPayment.toLocaleString('id-ID')}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Total Earned</p>
              <p className="text-2xl font-bold text-success">Rp {WALLET_DATA.totalEarned.toLocaleString('id-ID')}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-heading">Riwayat Transaksi</h2>
            <Button variant="ghost" size="sm">Lihat Semua</Button>
          </div>

          <div className="space-y-3">
            {TRANSACTIONS.map((t) => (
              <div key={t.id} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-surface-alt transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  t.type === 'credit' ? 'bg-success/10' : t.type === 'debit' ? 'bg-error/10' : 'bg-warning/10'
                }`}>
                  {t.type === 'credit' ? <ArrowDownRight className="w-5 h-5 text-success" /> : 
                   t.type === 'debit' ? <ArrowUpRight className="w-5 h-5 text-error" /> : 
                   <Clock className="w-5 h-5 text-warning" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="font-semibold text-text-heading">{t.description}</p>
                      {t.project && <p className="text-xs text-text-muted mt-0.5">{t.project}</p>}
                    </div>
                    <p className={`font-bold text-lg flex-shrink-0 ${
                      t.type === 'credit' ? 'text-success' : t.type === 'debit' ? 'text-error' : 'text-warning'
                    }`}>
                      {t.type === 'debit' ? '-' : '+'} Rp {t.amount.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{t.date}</span>
                    <Badge variant={t.status === 'completed' ? 'success' : 'warning'} className="text-xs">
                      {t.status === 'completed' ? 'Completed' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-text-heading mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4 mr-2" />Tarik Dana ke Bank
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="w-4 h-4 mr-2" />Riwayat Penarikan
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />Laporan Keuangan
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-info-light border-info/20">
            <h3 className="font-bold text-text-heading mb-2">Info Penarikan</h3>
            <ul className="text-sm text-text-body space-y-2">
              <li>• Minimum penarikan: Rp 100.000</li>
              <li>• Biaya admin: Rp 5.000</li>
              <li>• Proses 1-3 hari kerja</li>
              <li>• Tersedia untuk Bank BCA, Mandiri, BNI, BRI</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}



