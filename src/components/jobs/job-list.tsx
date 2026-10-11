import * as React from "react";
import { Job } from "@/types/job";
import { JobCard } from "./job-card";
import { EmptyState } from "@/components/shared/empty-state";

export interface JobListProps {
  jobs: Job[];
  isLoading?: boolean;
}

export const JobList: React.FC<JobListProps> = ({ jobs, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-48 rounded-lg border border-border-default bg-bg-surface p-5 skeleton-shimmer"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        title="Belum ada lowongan yang sesuai"
        description="Coba sesuaikan kata kunci pencarian atau ubah filter kategori untuk melihat peluang lainnya."
        actionLabel="Reset Semua Filter"
        actionHref="/jobs"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
