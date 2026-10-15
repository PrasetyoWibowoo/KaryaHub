"use client"

import { QrCode, Building, Smartphone, CreditCard, Clock, Copy, Check, ShieldCheck } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

interface EscrowPaymentMethodsProps {
  paymentMethod: "qris" | "va" | "ewallet" | "card"
  setPaymentMethod: (m: "qris" | "va" | "ewallet" | "card") => void
  selectedBank: "bca" | "mandiri" | "bri" | "bni"
  setSelectedBank: (b: "bca" | "mandiri" | "bri" | "bni") => void
  timerFormatted: string
  copiedVa: boolean
  onCopyVa: () => void
  vaNumber: string
}

export function EscrowPaymentMethods({
  paymentMethod,
  setPaymentMethod,
  selectedBank,
  setSelectedBank,
  timerFormatted,
  copiedVa,
  onCopyVa,
  vaNumber
}: EscrowPaymentMethodsProps) {
  return (
    <div className="space-y-6">
      <Card hover={false} className="p-6 space-y-5 shadow-soft border-border/80">
        <div className="flex items-center justify-between pb-3 border-b border-border/70">
          <div>
            <h2 className="text-lg font-bold font-display text-text-heading">Metode Pembayaran</h2>
            <p className="text-xs text-text-muted mt-0.5">Pilih saluran pembayaran resmi yang didukung Midtrans</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Sisa Waktu: <strong>{timerFormatted}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: "qris" as const, label: "QRIS", icon: QrCode },
            { id: "va" as const, label: "VA Bank", icon: Building },
            { id: "ewallet" as const, label: "E-Wallet", icon: Smartphone },
            { id: "card" as const, label: "Kartu Bank", icon: CreditCard },
          ].map((m) => {
            const Icon = m.icon
            const active = paymentMethod === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[70px] ${
                  active
                    ? "bg-slate-950 text-white border-slate-950 shadow-md"
                    : "bg-surface-alt/70 hover:bg-surface border-border text-text-muted hover:text-text-heading"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-emerald-400" : "text-slate-500"}`} />
                <span className="text-xs font-bold mt-2">{m.label}</span>
              </button>
            )
          })}
        </div>

        {paymentMethod === "qris" && (
          <div className="p-6 rounded-2xl bg-surface-alt/60 border border-border text-center space-y-3">
            <div className="w-44 h-44 mx-auto bg-slate-950 rounded-2xl p-4 flex flex-col items-center justify-center text-white relative">
              <QrCode className="w-32 h-32 text-white" />
              <div className="text-[10px] font-bold text-emerald-400 tracking-wider">MIDTRANS QRIS</div>
            </div>
            <p className="text-xs text-text-muted">Scan QR di atas menggunakan BCA Mobile, Livin, GoPay, OVO, atau Dana.</p>
          </div>
        )}

        {paymentMethod === "va" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "bca" as const, name: "BCA VA" },
                { id: "mandiri" as const, name: "Mandiri Bill" },
                { id: "bri" as const, name: "BRI BRIVA" },
                { id: "bni" as const, name: "BNI VA" },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBank(b.id)}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                    selectedBank === b.id ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-border bg-surface text-text-muted"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-surface-alt border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-text-muted block">Nomor VA {selectedBank.toUpperCase()}:</span>
                <span className="font-mono text-base font-extrabold text-text-heading">{vaNumber}</span>
              </div>
              <Button variant="outline" size="sm" onClick={onCopyVa} className="text-xs font-bold">
                {copiedVa ? <><Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> Tersalin</> : <><Copy className="w-3.5 h-3.5 mr-1" /> Salin VA</>}
              </Button>
            </div>
          </div>
        )}

        {paymentMethod === "ewallet" && (
          <div className="p-4 rounded-xl bg-surface-alt border border-border space-y-2 text-xs">
            <label className="font-bold text-text-heading block">Nomor Ponsel GoPay / OVO / DANA:</label>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-white border border-border rounded-xl font-bold text-text-muted">+62</span>
              <input type="text" defaultValue="812-3456-7890" className="flex-1 px-3 py-2 bg-white border border-border rounded-xl font-semibold focus:outline-none" />
            </div>
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="p-4 rounded-xl bg-surface-alt border border-border space-y-2 text-xs">
            <input type="text" placeholder="4000 1234 5678 9010" className="w-full px-3 py-2 bg-white border border-border rounded-xl font-mono focus:outline-none" />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="MM / YY" className="w-full px-3 py-2 bg-white border border-border rounded-xl font-mono focus:outline-none" />
              <input type="text" placeholder="CVV" className="w-full px-3 py-2 bg-white border border-border rounded-xl font-mono focus:outline-none" />
            </div>
          </div>
        )}
      </Card>

      <Card hover={false} className="p-5 bg-emerald-500/06 border-emerald-500/20 space-y-2">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Proteksi Rekening Bersama (Escrow) Midtrans</span>
        </div>
        <p className="text-xs text-emerald-950/80 leading-relaxed">
          Dana Anda tersimpan di penampungan bersama KaryaHub. Freelancer baru dapat menerima pembayaran setelah Anda meninjau dan menyetujui hasil pengerjaan (deliverables).
        </p>
      </Card>
    </div>
  )
}
