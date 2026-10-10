import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MyProposalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-navy-950 tracking-tight">
          Proposal & Lamaran Saya
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Pantau status lamaran kerja dan proyek freelance yang telah diajukan.
        </p>
      </div>

      <div className="space-y-3">
        <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-navy-950">Redesign E-Commerce Batik Solo</h3>
            <p className="text-xs text-text-secondary mt-0.5">Batik Sekar Wangi · Rp 2.200.000</p>
          </div>
          <Badge variant="warning">Menunggu Review</Badge>
        </Card>

        <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-navy-950">UI/UX Designer Intern</h3>
            <p className="text-xs text-text-secondary mt-0.5">Kopi Kenangan Digital · Rp 3.500.000 / bln</p>
          </div>
          <Badge variant="success">Diterima</Badge>
        </Card>
      </div>
    </div>
  );
}
