import * as React from "react";
import { Card } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-navy-950 tracking-tight">
          Dompet & Transaksi Escrow
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Proteksi pembayaran aman terintegrasi dengan gateway resmi.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-6 bg-navy-950 text-text-inverse border-navy-800 space-y-2">
          <div className="flex items-center gap-1.5 text-lime-500 text-xs font-bold uppercase">
            <ShieldCheck className="h-4 w-4" />
            <span>Saldo Dalam Escrow</span>
          </div>
          <span className="text-3xl font-extrabold block text-bg-base">Rp 2.200.000</span>
          <p className="text-xs text-navy-200">
            Akan dicairkan otomatis setelah milestone disetujui UMKM.
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-secondary block">
            Saldo Tersedia / Dapat Ditarik
          </span>
          <span className="text-3xl font-extrabold block text-navy-950">Rp 4.500.000</span>
          <p className="text-xs text-text-secondary">
            Dapat ditarik ke rekening bank lokal kapan saja.
          </p>
        </Card>
      </div>
    </div>
  );
}
