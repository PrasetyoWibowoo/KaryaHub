"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  ArrowLeft, 
  Wallet, 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  ArrowRight,
  Clock,
  Sparkles
} from "lucide-react"

export default function FreelancerWithdrawPage() {
  const router = useRouter()
  const availableBalance = 25000000

  const [selectedBank, setSelectedBank] = useState("BCA")
  const [accountNumber, setAccountNumber] = useState("7120-8912-34")
  const [accountName] = useState("JOHN DOE")
  const [amount, setAmount] = useState("5000000")
  const [pin, setPin] = useState("123456")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const quickAmounts = [
    { label: "Rp 500.000", value: 500000 },
    { label: "Rp 1.000.000", value: 1000000 },
    { label: "Rp 5.000.000", value: 5000000 },
    { label: "Rp 10.000.000", value: 10000000 },
    { label: "Tarik Semua", value: availableBalance },
  ]

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1300)
  }

  const numericAmount = Number(amount) || 0

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/80 pb-5">
        <div className="space-y-1">
          <Link
            href="/freelancer/wallet"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dompet & Escrow
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-text-heading tracking-tight">
            Tarik Saldo ke Rekening Bank
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Pindahkan saldo penghasilan proyek Anda ke rekening bank pribadi tanpa potongan biaya.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-xs font-bold shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Transfer BI-FAST Instan</span>
        </div>
      </div>

      {isSuccess ? (
        <Card hover={false} className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-xl border-emerald-200 bg-surface">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-display text-text-heading">Penarikan Saldo Berhasil!</h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Dana sebesar <strong>Rp {numericAmount.toLocaleString("id-ID")}</strong> telah dikirimkan ke rekening <strong>{selectedBank}</strong> Anda.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-surface-alt border border-border text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">ID Referensi:</span>
              <span className="font-mono font-bold text-text-heading">WD-202410-89104</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Rekening Penerima:</span>
              <span className="font-semibold text-text-heading">{selectedBank} • {accountNumber} ({accountName})</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border font-bold">
              <span>Total Diterima:</span>
              <span className="text-emerald-700 text-sm">Rp {numericAmount.toLocaleString("id-ID")}</span>
            </div>
          </div>
          <div className="flex justify-center pt-2">
            <Button variant="black" onClick={() => router.push("/freelancer/wallet")} className="text-xs font-bold">
              Kembali ke Dompet Saldo
            </Button>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleWithdraw} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Card hover={false} className="p-6 space-y-4 shadow-soft border-border/80">
              <h2 className="text-base font-bold font-display text-text-heading pb-3 border-b border-border/70">
                Pilih Rekening Bank Tujuan
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {["BCA", "Mandiri", "BRI", "BNI", "Bank Jago", "SeaBank"].map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      selectedBank === bank
                        ? "border-slate-950 bg-slate-950 text-white shadow-xs font-bold"
                        : "border-slate-200 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 font-semibold"
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-text-heading block mb-1">Nomor Rekening:</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-alt border border-border rounded-xl font-mono text-xs font-bold"
                  />
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <span className="text-emerald-800">Nama Pemilik:</span>
                  <span className="font-bold text-emerald-900">{accountName} ✓ (Terverifikasi)</span>
                </div>
              </div>
            </Card>

            <Card hover={false} className="p-6 space-y-4 shadow-soft border-border/80">
              <h2 className="text-base font-bold font-display text-text-heading pb-3 border-b border-border/70">
                Nominal Penarikan
              </h2>
              <div>
                <label className="text-xs text-text-muted block mb-1">Jumlah Saldo (Rp):</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  max={availableBalance}
                  className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl font-display text-xl font-extrabold text-text-heading"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => setAmount(String(q.value))}
                    className="px-3 py-1.5 rounded-xl border border-border bg-surface hover:bg-surface-alt text-xs font-semibold"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <Card hover={false} className="p-6 space-y-5 shadow-soft border-border/80 sticky top-24">
              <span className="text-xs font-extrabold uppercase tracking-wider text-text-muted block pb-3 border-b border-border/70">
                Ringkasan Penarikan Dana
              </span>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Saldo Dompet Saat Ini:</span>
                  <span className="font-bold text-slate-900">Rp {availableBalance.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Nominal Ditarik:</span>
                  <span className="font-bold text-slate-900">Rp {numericAmount.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Biaya Transfer BI-FAST:</span>
                  <span className="font-bold">Rp 0 (Gratis)</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200 font-bold">
                  <span className="text-sm text-slate-800">Sisa Saldo Dompet:</span>
                  <span className="text-base text-slate-950 font-extrabold">
                    Rp {Math.max(0, availableBalance - numericAmount).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  type="submit"
                  disabled={isProcessing || numericAmount <= 0}
                  variant="black"
                  className="w-full h-12 text-xs font-bold shadow-md"
                >
                  {isProcessing ? "Memproses Transfer BI-FAST..." : "Konfirmasi & Tarik Saldo Sekarang"}
                </Button>
                <p className="text-[10px] text-text-muted text-center leading-relaxed">
                  Proses otomatis 24/7 menggunakan jaringan transfer real-time antar-bank.
                </p>
              </div>
            </Card>
          </div>
        </form>
      )}
    </div>
  )
}
