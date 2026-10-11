import * as React from "react";
import Link from "next/link";
import { Job } from "@/types/job";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobMatchScore } from "./job-match-score";
import { formatCompactRupiah } from "@/lib/utils";
import { Building2, MapPin, Clock, ArrowRight } from "lucide-react";

export interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, featured = false }) => {
  const typeBadgeVariant =
    job.type === "INTERNSHIP"
      ? "default"
      : job.type === "PROJECT"
      ? "neutral"
      : "outline";

  const typeLabel =
    job.type === "INTERNSHIP"
      ? "Magang"
      : job.type === "PROJECT"
      ? "Micro-Job"
      : "Freelance";

  return (
    <Card
      className={`group relative flex flex-col justify-between p-5 transition-all duration-150 hover:border-navy-200 hover:shadow-[0_4px_16px_rgba(13,27,51,0.06)] ${
        featured ? "border-navy-950/20 bg-bg-surface" : "bg-bg-surface"
      }`}
    >
      <div>
        {/* Top Meta: Badges & Compensation */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Badge variant={typeBadgeVariant} size="sm">
              {typeLabel}
            </Badge>
            <span className="text-[11px] font-medium text-text-secondary bg-bg-subtle px-2 py-0.5 rounded-full border border-border-default">
              {job.workplace === "REMOTE"
                ? "Remote"
                : job.workplace === "HYBRID"
                ? "Hybrid"
                : "Onsite"}
            </span>
          </div>

          <span className="text-sm font-bold text-navy-950">
            {formatCompactRupiah(job.budget)}
          </span>
        </div>

        {/* Title & Employer */}
        <h3 className="text-base font-bold text-navy-950 group-hover:text-navy-800 transition-colors line-clamp-1">
          <Link href={`/jobs/${job.id}`} className="focus-visible:outline-none focus-visible:underline">
            {job.title}
          </Link>
        </h3>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
          <span className="flex items-center gap-1 font-medium text-text-primary">
            <Building2 className="h-3.5 w-3.5 text-text-muted" />
            {job.companyName || job.employerName}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-text-muted" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-text-muted" />
            {job.duration}
          </span>
        </div>

        {/* Brief Description */}
        <p className="mt-3 text-xs text-text-secondary line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skills Tag Row */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {job.skills.map((skill) => (
            <span
              key={skill.id}
              className="text-[11px] font-medium bg-bg-subtle text-navy-950 px-2 py-0.5 rounded-md border border-border-default/60"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Match Score & Action */}
      <div className="mt-4 pt-3.5 border-t border-border-default/60 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <JobMatchScore analysis={job.matchScore} />
        </div>

        <Link href={`/jobs/${job.id}`} tabIndex={-1}>
          <Button variant="outline" size="sm" className="gap-1 text-xs h-8 shrink-0">
            <span>Detail</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
