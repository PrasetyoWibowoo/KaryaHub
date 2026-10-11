import * as React from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { JobFilter } from "@/components/jobs/job-filter";
import { JobList } from "@/components/jobs/job-list";
import { MOCK_JOBS } from "@/constants/sample-cv-data";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q?.toLowerCase() || "";
  const category = resolvedParams.category;
  const type = resolvedParams.type;

  let filteredJobs = MOCK_JOBS;

  if (q) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.employerName.toLowerCase().includes(q) ||
        job.skills.some((s) => s.name.toLowerCase().includes(q))
    );
  }

  if (category && category !== "Semua Kategori") {
    filteredJobs = filteredJobs.filter((job) => job.category === category);
  }

  if (type && type !== "ALL") {
    filteredJobs = filteredJobs.filter((job) => job.type === type);
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      <Navbar />

      <main id="main-content" className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
            Eksplor Lowongan & Proyek UMKM
          </h1>
          <p className="mt-1 text-sm text-text-secondary max-w-2xl leading-relaxed">
            Temukan kesempatan magang, micro-job terverifikasi, dan proyek lepas yang sesuai dengan keahlian serta tingkat kesiapan kariermu.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <React.Suspense fallback={<div className="h-20 rounded-md bg-bg-surface skeleton-shimmer" />}>
            <JobFilter />
          </React.Suspense>
        </div>

        {/* Results Counter & Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>
              Menampilkan <strong className="text-navy-950">{filteredJobs.length}</strong> peluang aktif
            </span>
          </div>

          <JobList jobs={filteredJobs} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
