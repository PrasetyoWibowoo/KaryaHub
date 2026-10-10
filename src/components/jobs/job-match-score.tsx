import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { JobMatchAnalysis } from "@/types/job";
import { CheckCircle2, AlertCircle } from "lucide-react";

export interface JobMatchScoreProps {
  analysis?: JobMatchAnalysis;
  showDetails?: boolean;
}

export const JobMatchScore: React.FC<JobMatchScoreProps> = ({
  analysis,
  showDetails = false,
}) => {
  if (!analysis) return null;

  const { score, tier, matchedSkills, missingSkills } = analysis;

  const badgeVariant =
    tier === "high"
      ? "match-high"
      : tier === "mid"
      ? "match-mid"
      : "match-low";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Badge variant={badgeVariant} size="sm">
          {score}% Kecocokan
        </Badge>
        <span className="text-[11px] text-text-secondary font-medium">
          {tier === "high"
            ? "Sangat cocok dengan profilmu"
            : tier === "mid"
            ? "Cukup relevan"
            : "Memerlukan skill tambahan"}
        </span>
      </div>

      {showDetails && (
        <div className="mt-2 space-y-1.5 rounded-md bg-bg-subtle p-3 text-xs border border-border-default/60">
          {matchedSkills.length > 0 && (
            <div className="flex items-start gap-1.5 text-text-primary">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>
                <strong className="font-semibold">Skill cocok:</strong>{" "}
                {matchedSkills.join(", ")}
              </span>
            </div>
          )}
          {missingSkills.length > 0 && (
            <div className="flex items-start gap-1.5 text-text-secondary">
              <AlertCircle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
              <span>
                <strong className="font-semibold text-text-primary">Perlu dipelajari:</strong>{" "}
                {missingSkills.join(", ")}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
