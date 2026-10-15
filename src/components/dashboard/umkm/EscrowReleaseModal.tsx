"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ShieldCheck, Star, X, CheckCircle2 } from "lucide-react"

interface EscrowReleaseModalProps {
  isOpen: boolean
  transaction: {
    id: string
    jobTitle: string
    freelancer: string
    amount: number
  } | null
  onClose: () => void
  onConfirm: (transactionId: string, rating: number) => void
}

export function EscrowReleaseModal({
  isOpen,
  transaction,
  onClose,
  onConfirm,
}: EscrowReleaseModalProps) {
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRelease = () => {
    if (!transaction) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onConfirm(transaction.id, rating)
      onClose()
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && transaction && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="w-full max-w-lg"
          >
            <Card className="w-full p-6 space-y-5 bg-surface border-border shadow-2xl relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-1 rounded-lg text-text-muted hover:bg-surface-alt cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-heading">Konfirmasi Pencairan Dana Escrow</h3>
                  <p className="text-xs text-text-muted">Proses ini akan mentransfer dana ke dompet freelancer.</p>
                </div>
              </div>

              <div className="p-4 bg-surface-alt rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">Proyek:</span>
                  <span className="font-bold text-text-heading text-right">{transaction.jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Freelancer Penerima:</span>
                  <span className="font-semibold text-text-heading">{transaction.freelancer}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-text-muted">Nominal Pencairan:</span>
                  <span className="font-extrabold text-primary text-sm">
                    Rp {transaction.amount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-heading mb-2">
                  Beri Penilaian untuk {transaction.freelancer}:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`p-2 rounded-lg border flex items-center gap-1 transition cursor-pointer ${
                        rating >= s
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-500 font-bold"
                          : "bg-surface border-border text-text-muted"
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs">{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <p>
                  Dengan mengonfirmasi, Anda menyatakan bahwa seluruh hasil luaran (deliverables) telah diterima dan disetujui.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={onClose} disabled={isSubmitting} className="bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border-slate-300">
                  Batal
                </Button>
                <Button onClick={handleRelease} disabled={isSubmitting} className="shadow-md shadow-primary/20">
                  {isSubmitting ? "Memproses Pencairan..." : "Ya, Cairkan Dana Sekarang"}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
