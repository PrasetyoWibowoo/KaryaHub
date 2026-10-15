"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Banknote, 
  Clock, 
  CheckCircle, 
  Download, 
  Calendar, 
  ShieldCheck, 
  Building, 
  CreditCard, 
  X, 
  FileSpreadsheet,
  Check
} from "lucide-react"

const WALLET_DATA = { 
  balance: 25000000, 
  pendingPayment: 8000000, 
  totalEarned: 52000000, 
  transactionsThisMonth: 15 
}

const TRANSACTIONS = [
  { id: "1", type: "credit" as const, amount: 5000000, description: "Pembayaran Proyek - Toko Berkah Jaya", date: "5 Okt 2024", status: "completed" as const, project: "Desain UI/UX Mobile App" },
  { id: "2", type: "debit" as const, amount: 500000, description: "Penarikan Dana ke Rekening BCA", date: "3 Okt 2024", status: "completed" as const, reference: "WD-20241003-001" },
  { id: "3", type: "credit" as const, amount: 7500000, description: "Pembayaran Proyek - Mebel Jati Mas", date: "1 Okt 2024", status: "completed" as const, project: "Website Company Profile" },
  { id: "4", type: "pending" as const, amount: 3500000, description: "Escrow Ditahan - Dapur Ibu", date: "28 Sep 2024", status: "pending" as const, project: "Logo & Brand Identity" },
  { id: "5", type: "pending" as const, amount: 4500000, description: "Escrow Ditahan - Warung Mitra", date: "25 Sep 2024", status: "pending" as const, project: "Sistem Inventory POS" }
]

export default function WalletPage() {
  const [filterType, setFilterType] = useState<"all" | "credit" | "debit" | "pending">("all")
  const [statementNotice, setStatementNotice] = useState<string | null>(null)

  const filteredTransactions = TRANSACTIONS.filter(t => {
    if (filterType === "all") return true
    return t.type === filterType
  })

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200/60 text-emerald-700 mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Escrow Terproteksi</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-text-heading tracking-tight">Dompet Saya</h1>
          <p className="text-sm text-text-muted mt-1 max-w-xl">
            Pantau arus kas saldo escrow, pencairan gaji proyek UMKM, dan riwayat penarikan rekening bank.
          </p>
        </div>
        <Link href="/freelancer/wallet/withdraw">
          <Button 
            variant="black"
            className="shrink-0 shadow-md hover:shadow-lg transition-all"
          >
            <Download className="w-4 h-4 mr-2" />
            Tarik Dana ke Bank
          </Button>
        </Link>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main Balance Obsidian Card */}
        <div className="p-6 md:col-span-2 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-2xl border border-slate-800 shadow-xl">
          <div className="absolute right-0 top-0 w-64 h-64 bg-radial from-indigo-500/20 to-transparent pointer-events-none rounded-full blur-2xl" />

          <div className="flex items-start justify-between mb-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Saldo Tersedia</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Siap Dicairkan
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white drop-shadow-xs">
                Rp {WALLET_DATA.balance.toLocaleString('id-ID')}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
              <Wallet className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/15 relative z-10 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>+12% peningkatan dari bulan lalu</span>
            </div>
            <Link
              href="/freelancer/wallet/withdraw"
              className="inline-flex items-center gap-1 text-white hover:text-emerald-300 font-bold underline underline-offset-4 transition-colors text-left"
            >
              Cairkan ke Bank Sekarang →
            </Link>
          </div>
        </div>

        {/* Pending Escrow Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Escrow Tertahan</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Terkunci Aman
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Rp {WALLET_DATA.pendingPayment.toLocaleString('id-ID')}
            </p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Dicairkan saat deliverable disetujui UMKM.</span>
          </p>
        </div>

        {/* Total Earned Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Pendapatan</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Akumulasi
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Rp {WALLET_DATA.totalEarned.toLocaleString('id-ID')}
            </p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Akumulasi bersih dari seluruh proyek selesai.</span>
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Transaction History (2 Cols) */}
        <Card hover={false} className="lg:col-span-2 p-6 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-border/80">
            <div>
              <h2 className="text-lg font-bold font-display text-text-heading">Riwayat Transaksi</h2>
              <p className="text-xs text-text-muted">Aktivitas pemasukan proyek dan penarikan dana dompet</p>
            </div>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-alt border border-border shrink-0">
              {[
                { id: "all", label: "Semua" },
                { id: "credit", label: "Pemasukan" },
                { id: "debit", label: "Penarikan" },
                { id: "pending", label: "Escrow" },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterType(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    filterType === tab.id
                      ? "bg-white text-text-heading shadow-sm"
                      : "text-text-muted hover:text-text-heading"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <p className="text-sm text-text-muted text-center py-8">Tidak ada transaksi pada filter ini.</p>
            ) : (
              filteredTransactions.map((t) => {
                const isCredit = t.type === "credit"
                const isDebit = t.type === "debit"
                const isPending = t.type === "pending"

                return (
                  <div 
                    key={t.id} 
                    className="flex items-start gap-3.5 p-4 rounded-xl border border-border bg-surface/80 hover:bg-surface-alt/70 hover:border-indigo-200 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                      isCredit ? "bg-emerald-50 border-emerald-200 text-emerald-600" :
                      isDebit ? "bg-rose-50 border-rose-200 text-rose-600" :
                      "bg-amber-50 border-amber-200 text-amber-600"
                    }`}>
                      {isCredit ? <ArrowDownRight className="w-5 h-5" /> :
                       isDebit ? <ArrowUpRight className="w-5 h-5" /> :
                       <Clock className="w-5 h-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="text-sm font-semibold text-text-heading truncate">
                            {t.description}
                          </p>
                          {t.project && (
                            <p className="text-xs text-text-muted mt-0.5">{t.project}</p>
                          )}
                          {t.reference && (
                            <p className="text-xs text-text-muted mt-0.5 font-mono">Ref: {t.reference}</p>
                          )}
                        </div>
                        <p className={`font-bold text-sm sm:text-base flex-shrink-0 ${
                          isCredit ? "text-emerald-600" :
                          isDebit ? "text-rose-600" :
                          "text-amber-600"
                        }`}>
                          {isDebit ? "- " : "+ "}Rp {t.amount.toLocaleString('id-ID')}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-text-muted mt-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-text-muted" />
                          {t.date}
                        </span>
                        <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border">
                          {isCredit ? "Selesai & Cair" : isDebit ? "Terkirim ke Rekening" : "Menunggu Approval UMKM"}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Card>

        {/* Right Column: Quick Actions & Policy Card */}
        <div className="space-y-6">
          <Card hover={false} className="p-6 shadow-soft">
            <h3 className="font-bold font-display text-text-heading mb-4">Aksi Cepat</h3>
            <div className="space-y-2.5">
              <Link href="/freelancer/wallet/withdraw" className="block">
                <Button 
                  className="w-full justify-start text-xs font-semibold h-11 bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border-slate-200/90 shadow-xs" 
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2.5 text-indigo-600" />
                  Tarik Dana ke Rekening Bank
                </Button>
              </Link>
              <Button 
                className="w-full justify-start text-xs font-semibold h-11 bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border-slate-200/90 shadow-xs" 
                variant="outline"
                onClick={() => setFilterType("debit")}
              >
                <CreditCard className="w-4 h-4 mr-2.5 text-emerald-600" />
                Lihat Riwayat Penarikan
              </Button>
              <Button 
                className="w-full justify-start text-xs font-semibold h-11 bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border-slate-200/90 shadow-xs" 
                variant="outline"
                onClick={() => {
                  setStatementNotice("Rekening koran PDF bulan ini siap diunduh.")
                  setTimeout(() => setStatementNotice(null), 3000)
                }}
              >
                <FileSpreadsheet className="w-4 h-4 mr-2.5 text-amber-600" />
                Unduh Rekening Koran (PDF)
              </Button>
            </div>
          </Card>

          <Card hover={false} className="p-6 bg-surface-alt/70 border-border/80 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <Building className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-text-heading">Ketentuan Pencairan Dana</h3>
            </div>
            <ul className="text-xs text-text-muted space-y-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                <span>Minimum penarikan: <strong>Rp 100.000</strong></span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                <span>Biaya administrasi transfer: <strong>Rp 0 (Gratis)</strong></span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                <span>Proses instan 1x24 jam kerja (Senin - Jumat)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                <span>Mendukung: <strong>BCA, Mandiri, BNI, BRI, Bank Jago</strong></span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Toast Notification */}
      {statementNotice && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs font-bold animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{statementNotice}</span>
        </div>
      )}
    </div>
  )
}



