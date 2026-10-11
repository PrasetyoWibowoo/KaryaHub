import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { MOCK_JOBS } from "@/constants/sample-cv-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobMatchScore } from "@/components/jobs/job-match-score";
import { ApplyProposalModal } from "@/components/jobs/apply-proposal-modal";
import { formatRupiah } from "@/lib/utils";
import {
  Building2,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const job = MOCK_JOBS.find((j) => j.id === resolvedParams.id);

  if (!job) {
    notFound();
  }

  const typeLabel =
    job.type === "INTERNSHIP"
      ? "Magang Mahasiswa"
      : job.type === "PROJECT"
      ? "Micro-Job Terverifikasi"
      : "Freelance";

  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      <Navbar />

      <main id="main-content" className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Back navigation */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-navy-950 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Pencarian Lowongan</span>
        </Link>

        {/* Top Header Card */}
        <Card className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6 border-b border-border-default/70">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default" size="sm">
                  {typeLabel}
                </Badge>
                <Badge variant="outline" size="sm">
                  {job.workplace === "REMOTE"
                    ? "Remote (Bisa dari mana saja)"
                    : job.workplace === "HYBRID"
                    ? "Hybrid"
                    : "Onsite"}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                <span className="flex items-center gap-1 font-semibold text-navy-950">
                  <Building2 className="h-4 w-4 text-text-muted" />
                  {job.companyName || job.employerName}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-text-muted" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-text-muted" />
                  Durasi: {job.duration}
                </span>
              </div>
            </div>

            {/* Compensation & CTA */}
            <div className="flex flex-col md:items-end gap-3 shrink-0">
              <div className="text-left md:text-right">
                <span className="text-xs font-medium text-text-secondary block">
                  Estimasi Honorarium / Budget
                </span>
                <span className="text-2xl font-extrabold text-navy-950">
                  {formatRupiah(job.budget)}
                </span>
              </div>

              <ApplyProposalModal
                jobTitle={job.title}
                companyName={job.companyName || job.employerName}
              />
            </div>
          </div>

          {/* Contextual Match Score in Job Detail */}
          <div className="mt-6 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
              Kesesuaian dengan Profil Anda
            </h4>
            <JobMatchScore analysis={job.matchScore} showDetails />
          </div>
        </Card>

        {/* Content Bento: Job Details (Left) + Employer Trust (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <Card className="p-6 space-y-3">
              <h3 className="text-base font-bold text-navy-950">
                Deskripsi Pekerjaan
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {job.description}
              </p>
            </Card>

            {/* Requirements */}
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-navy-950">
                Kriteria & Kebutuhan Proyek
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-navy-950 mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Right Column: Escrow & Employer Safety */}
          <div className="space-y-4">
            <Card className="p-5 bg-navy-950 text-text-inverse border-navy-800 space-y-3">
              <div className="flex items-center gap-2 text-lime-500 text-xs font-bold uppercase">
                <ShieldCheck className="h-4 w-4" />
                <span>Proteksi Escrow KaryaHub</span>
              </div>
              <p className="text-xs text-navy-200 leading-relaxed">
                Dana proyek ini dijamin dan ditahan di rekening bersama resmi Midtrans/KaryaHub sebelum kamu mulai bekerja.
              </p>
              <div className="text-[11px] text-navy-200 pt-2 border-t border-navy-800">
                ✓ Pembayaran dijamin cair setelah milestone disetujui.
              </div>
            </Card>

            <Card className="p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950">
                Keahlian Yang Dibutuhkan
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((s) => (
                  <Badge key={s.id} variant="neutral" size="sm">
                    {s.name}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
