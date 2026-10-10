import * as React from "react";
import Link from "next/link";
import {
  MOCK_CAREER_READINESS,
  MOCK_JOBS,
} from "@/constants/sample-cv-data";
import { Card } from "@/components/ui/card";
import { CareerReadinessRing, Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobCard } from "@/components/jobs/job-card";
import {
  ArrowRight,
  Sparkles,
  FileCheck2,
  Target,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function FreelancerDashboardPage() {
  const readiness = MOCK_CAREER_READINESS;
  const recommendedJobs = MOCK_JOBS.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* 1. Personalized Greeting with Clear Next Objective */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950 tracking-tight">
            Halo, Aditya 👋
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Kesiapan kariermu saat ini berada di level <strong className="text-navy-950">Siap Magang</strong>. Selesaikan 1 langkah berikutnya untuk membuka 18 peluang.
          </p>
        </div>

        <Link href="/jobs">
          <Button variant="primary" size="md" className="gap-2 shrink-0">
            <span>Eksplor Lowongan Baru</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* 2. Primary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Bento 1: Career Readiness Ring & Metrics (7 cols on md) */}
        <Card className="md:col-span-7 flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Indikator Kesiapan Kerja
              </span>
              <Badge variant="match-high" size="sm">
                Top 15% Mahasiswa
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 my-2">
              <CareerReadinessRing score={readiness.score} size={110} strokeWidth={9} />

              <div className="flex-1 w-full space-y-3">
                <Progress
                  value={readiness.atsScore}
                  label="Kesesuaian ATS Resume"
                  showValue
                />
                <Progress
                  value={(readiness.verifiedSkillsCount / 8) * 100}
                  label="Skill Terverifikasi (6 dari 8)"
                  showValue
                />
                <Progress
                  value={(readiness.portfolioProjectsCount / 3) * 100}
                  label="Portofolio Proyek Riil (2 dari 3)"
                  showValue
                />
              </div>
            </div>
          </div>

          {/* Action trigger tied to the score */}
          <div className="mt-5 pt-4 border-t border-border-default/60 flex items-center justify-between text-xs">
            <span className="text-text-secondary">
              Target berikutnya: <strong>Verifikasi 1 Skill Tambahan</strong> (+12% skor)
            </span>
            <Link
              href="/freelancer/ats-checker"
              className="font-bold text-navy-950 hover:underline inline-flex items-center gap-1"
            >
              Evaluasi CV
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Card>

        {/* Bento 2: Direct Action Banner (What should I do next?) (5 cols on md) */}
        <Card className="md:col-span-5 bg-navy-950 text-text-inverse border-navy-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-lime-500 text-xs font-bold uppercase tracking-wider mb-3">
              <Target className="h-4 w-4" />
              <span>Rekomendasi Langkah Selanjutnya</span>
            </div>

            <h3 className="text-lg font-bold text-bg-base leading-snug">
              {readiness.nextRecommendedAction.title}
            </h3>

            <p className="mt-2 text-xs text-navy-200 leading-relaxed">
              {readiness.nextRecommendedAction.description}
            </p>

            <div className="mt-4 rounded-md bg-navy-900/80 p-3 border border-navy-800 text-xs text-navy-100 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-lime-500 shrink-0" />
              <span>Peluang UMKM siap merekrut mahasiswa dengan skill ini.</span>
            </div>
          </div>

          <div className="mt-5 pt-3">
            <Link href={readiness.nextRecommendedAction.actionUrl}>
              <Button
                variant="primary"
                size="md"
                className="w-full justify-between"
              >
                <span>{readiness.nextRecommendedAction.actionLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* 3. Recommended Jobs Section (Targeted based on user profile) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-navy-950">
              Peluang Rekomendasi Teratas
            </h2>
            <p className="text-xs text-text-secondary">
              Disaring otomatis berdasarkan kecocokan CV ATS dan skill kamu.
            </p>
          </div>
          <Link
            href="/jobs"
            className="text-xs font-bold text-navy-950 hover:underline flex items-center gap-1"
          >
            Lihat Semua Lowongan
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      {/* 4. Active Applications & Micro-milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Active Proposals Pipeline */}
        <Card className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-border-default mb-4">
            <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
              <Clock className="h-4 w-4 text-text-muted" />
              <span>Status Lamaran & Proposal Aktif</span>
            </h3>
            <Link
              href="/freelancer/my-proposals"
              className="text-xs font-semibold text-text-secondary hover:text-navy-950"
            >
              Semua (2)
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {/* Proposal 1 */}
            <div className="p-3 rounded-md bg-bg-subtle border border-border-default flex items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-navy-950">
                  Redesign E-Commerce Batik Solo
                </h4>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  Batik Sekar Wangi · Diajukan 2 hari lalu
                </p>
              </div>
              <Badge variant="warning" size="sm">
                Menunggu Review
              </Badge>
            </div>

            {/* Proposal 2 */}
            <div className="p-3 rounded-md bg-bg-subtle border border-border-default flex items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-navy-950">
                  UI/UX Audit Landing Page
                </h4>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  Kopi Kenangan Digital · Diajukan 5 hari lalu
                </p>
              </div>
              <Badge variant="success" size="sm">
                Diterima
              </Badge>
            </div>
          </div>
        </Card>

        {/* ATS Checker Quick Insight */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border-default mb-4">
              <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-text-muted" />
                <span>Kesehatan CV Terakhir</span>
              </h3>
              <Badge variant="match-mid" size="sm">
                Skor 78/100
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-text-secondary">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Format ramah ATS standar industri berhasil dilewati.</span>
              </div>
              <div className="flex items-start gap-2 text-text-secondary">
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Tambahkan kata kunci <strong>Design System</strong> untuk menaikkan skor ke 85+.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-default/60">
            <Link href="/freelancer/ats-checker">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Pindai Ulang CV Terbaru
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
