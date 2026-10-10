import * as React from "react";
import { CareerReadinessRing } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export interface ScoreGaugeProps {
  score: number;
  tier: "needs_work" | "good" | "exceptional";
  breakdown: {
    formatCompatibility: number;
    keywordMatch: number;
    contentRelevance: number;
    readabilityScore: number;
  };
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  tier,
  breakdown,
}) => {
  const tierBadge =
    tier === "exceptional" ? (
      <Badge variant="match-high">Sangat Ramah ATS</Badge>
    ) : tier === "good" ? (
      <Badge variant="match-mid">Cukup Ramah ATS</Badge>
    ) : (
      <Badge variant="warning">Perlu Perbaikan</Badge>
    );

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-lg border border-border-default bg-bg-surface">
      <div className="shrink-0">
        <CareerReadinessRing score={score} size={120} strokeWidth={10} />
      </div>

      <div className="flex-1 w-full space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-navy-950">Skor Evaluasi Resume</h4>
            <p className="text-xs text-text-secondary">
              Persentase kemudahan CV dibaca oleh algoritma seleksi perusahaan.
            </p>
          </div>
          {tierBadge}
        </div>

        {/* 4 Pillars Breakdown Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-md bg-bg-subtle p-2.5 border border-border-default/60">
            <span className="text-[11px] text-text-secondary block">Kesesuaian Format</span>
            <span className="text-sm font-bold text-navy-950">{breakdown.formatCompatibility}%</span>
          </div>
          <div className="rounded-md bg-bg-subtle p-2.5 border border-border-default/60">
            <span className="text-[11px] text-text-secondary block">Kecocokan Kata Kunci</span>
            <span className="text-sm font-bold text-navy-950">{breakdown.keywordMatch}%</span>
          </div>
          <div className="rounded-md bg-bg-subtle p-2.5 border border-border-default/60">
            <span className="text-[11px] text-text-secondary block">Relevansi Pengalaman</span>
            <span className="text-sm font-bold text-navy-950">{breakdown.contentRelevance}%</span>
          </div>
          <div className="rounded-md bg-bg-subtle p-2.5 border border-border-default/60">
            <span className="text-[11px] text-text-secondary block">Keterbacaan Struktur</span>
            <span className="text-sm font-bold text-navy-950">{breakdown.readabilityScore}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
