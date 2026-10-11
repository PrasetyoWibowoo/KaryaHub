"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Send } from "lucide-react";

export interface ApplyProposalModalProps {
  jobTitle: string;
  companyName: string;
}

export const ApplyProposalModal: React.FC<ApplyProposalModalProps> = ({
  jobTitle,
  companyName,
}) => {
  const [open, setOpen] = React.useState(false);
  const [pitch, setPitch] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setOpen(false);
      setPitch("");
      setRate("");
    }, 2000);
  };

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto font-bold"
      >
        Ajukan Proposal / Lamar Posisi
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={`Ajukan Lamaran: ${jobTitle}`}
        description={`Kirim proposal langsung kepada tim rekrutmen di ${companyName}.`}
      >
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            <h4 className="text-base font-bold text-navy-950">
              Proposal Berhasil Dikirim!
            </h4>
            <p className="text-xs text-text-secondary max-w-xs">
              Kandidatur kamu telah masuk ke pipeline review UMKM/Perusahaan. Pantau perkembangannya di dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-md bg-bg-subtle p-3 border border-border-default/80 text-xs">
              <span className="font-semibold text-navy-950">CV Aktif Terpilih: </span>
              <span className="text-text-secondary">Aditya_Rizky_CV_ATS.pdf (Skor 78%)</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-text-primary block mb-1">
                Ekspektasi Kompensasi / Tawaran (IDR)
              </label>
              <Input
                placeholder="Contoh: 3500000"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text-primary block mb-1">
                Catatan Singkat / Mini Cover Letter
              </label>
              <textarea
                rows={4}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="Jelaskan secara ringkas pengalaman terkait atau portofolio yang relevan dengan tugas ini..."
                className="w-full rounded-md border border-border-default bg-bg-surface p-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-default/60">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" variant="primary" size="sm" className="gap-1.5">
                <Send className="h-3.5 w-3.5" />
                <span>Kirimkan Lamaran</span>
              </Button>
            </div>
          </form>
        )}
      </Dialog>
    </>
  );
};
