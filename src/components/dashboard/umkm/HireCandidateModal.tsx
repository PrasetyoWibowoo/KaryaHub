"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ShieldCheck, CheckCircle2, X, Lock } from "lucide-react"

interface HireCandidateModalProps {
  isOpen: boolean
  candidate: {
    id: string
    name: string
    proposedBudget: number
    estimatedDays: number
  } | null
  jobTitle: string
  onClose: () => void
  onConfirmHire: (candidateId: string) => void
}

export function HireCandidateModal({
  isOpen,
  candidate,
  jobTitle,
  onClose,
  onConfirmHire,
}: HireCandidateModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleHire = () => {
    if (!candidate) return
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      onConfirmHire(candidate.id)
      onClose()
    }, 1200)
  }

  return (
    <AnimatePresence>
      {isOpen && candidate && (
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
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-heading">Mulai Kontrak & Kunci Escrow</h3>
                  <p className="text-xs text-text-muted">Rekrut talenta dan amankan pembayaran di KaryaHub Escrow.</p>
                </div>
              </div>

              <div className="p-4 bg-surface-alt rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">Proyek:</span>
                  <span className="font-bold text-text-heading text-right">{jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Talenta Terpilih:</span>
                  <span className="font-semibold text-text-heading">{candidate.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Durasi Pengerjaan:</span>
                  <span className="font-semibold text-text-heading">{candidate.estimatedDays} Hari</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-text-muted">Nilai Kontrak Escrow:</span>
                  <span className="font-extrabold text-primary text-base">
                    Rp {candidate.proposedBudget.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-primary/10 border border-primary/20 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-primary">
                  <Lock className="w-3.5 h-3.5" /> Proteksi Rekening Bersama (Escrow)
                </div>
                <p className="text-text-body leading-relaxed">
                  Dana akan dikunci di escrow dan baru dapat dicairkan oleh {candidate.name} setelah Anda menyetujui hasil deliverables.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={onClose} disabled={isProcessing}>
                  Batal
                </Button>
                <Button onClick={handleHire} disabled={isProcessing} className="shadow-md shadow-primary/20 cursor-pointer">
                  {isProcessing ? "Mengunci Dana Escrow..." : "Konfirmasi & Kunci Escrow"}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
