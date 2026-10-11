import * as React from "react";
import { ATSFeedbackItem } from "@/types/ats";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface FeedbackListProps {
  feedbacks: ATSFeedbackItem[];
  missingKeywords: string[];
}

export const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbacks,
  missingKeywords,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Missing Keyword Opportunities */}
      {missingKeywords.length > 0 && (
        <div className="rounded-lg border border-border-default bg-bg-surface p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-navy-950">
              Kata Kunci Industri Yang Belum Ditemukan
            </h4>
            <span className="text-xs text-text-secondary">
              Disarankan untuk ditambahkan ke riwayat proyek
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((kw, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200"
              >
                + {kw}
              </span>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-text-secondary">
            <span>Ingin melatih skill di atas lewat proyek nyata?</span>
            <Link href="/jobs" className="font-bold text-navy-950 hover:underline flex items-center gap-1">
              Cari Proyek Latihan
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      {/* 2. Feedback Detailed Checklist */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-navy-950">
          Rekomendasi Tindakan Perbaikan
        </h4>

        {feedbacks.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-border-default bg-bg-surface p-4 space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {item.category === "critical" ? (
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                ) : item.category === "warning" ? (
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
                <span className="text-xs font-bold text-navy-950">
                  {item.title}
                </span>
              </div>
              <Badge variant="outline" size="sm">
                {item.section}
              </Badge>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed pl-6">
              {item.description}
            </p>

            <div className="ml-6 mt-1 rounded-md bg-bg-subtle p-2.5 border border-border-default/60 text-xs">
              <strong className="font-semibold text-navy-950">Saran Tindakan: </strong>
              <span className="text-text-secondary">{item.recommendation}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
