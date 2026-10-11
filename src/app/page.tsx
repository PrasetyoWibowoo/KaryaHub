import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { JobCard } from "@/components/jobs/job-card";
import { MOCK_JOBS } from "@/constants/sample-cv-data";
import {
  ArrowRight,
  ShieldCheck,
  FileCheck2,
} from "lucide-react";

export default function HomePage() {
  const featuredJobs = MOCK_JOBS.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* 1. Hero Section - Confident, Editorial & Direct */}
        <section className="relative border-b border-border-default/80 bg-bg-surface py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Editorial Copy */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-subtle px-3 py-1 text-xs font-semibold text-navy-950">
                  <span className="h-2 w-2 rounded-full bg-lime-500" />
                  Peluang Magang & Proyek Nyata Sebelum Wisuda
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight leading-[1.1]">
                  Bangun portofolio riil, bukan sekadar teori kampus.
                </h1>

                <p className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
                  KaryaHub menghubungkan mahasiswa dan lulusan baru dengan UMKM serta startup lokal. Kerjakan micro-job terverifikasi, evaluasi kesiapan CV ATS, dan terima pembayaran dengan proteksi rekening bersama.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link href="/jobs">
                    <Button variant="primary" size="lg" className="font-bold">
                      Eksplor Proyek & Magang
                    </Button>
                  </Link>
                  <Link href="/freelancer/ats-checker">
                    <Button variant="outline" size="lg">
                      Uji Skor CV ATS Gratis
                    </Button>
                  </Link>
                </div>

                {/* SDG 8 Alignment Tagline */}
                <div className="pt-4 flex items-center gap-6 text-xs text-text-secondary border-t border-border-default/60">
                  <div className="flex items-center gap-1.5 font-medium text-navy-950">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Rekening Bersama Midtrans Escrow</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-navy-950">
                    <FileCheck2 className="h-4 w-4 text-navy-950" />
                    <span>Standar CV ATS Industri</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Bento Preview */}
              <div className="lg:col-span-5 space-y-4">
                <Card className="p-6 bg-navy-950 text-text-inverse border-navy-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="match-high">Skor Kesiapan 84%</Badge>
                    <span className="text-xs text-navy-200">Profil Talenta Terverifikasi</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-bg-base">
                      Alur Karier Terarah
                    </h3>
                    <p className="text-xs text-navy-200 mt-1 leading-relaxed">
                      Discover → Build → Experience → Showcase → Get Hired. KaryaHub memandu langkahmu sampai diterima kerja.
                    </p>
                  </div>

                  <div className="rounded-md bg-navy-900 p-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-navy-200">Evaluasi CV Terakhir:</span>
                      <strong className="text-lime-500">78 / 100 (Bagus)</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-navy-200">Peluang Cocok:</span>
                      <strong className="text-bg-base">14 Proyek Aktif</strong>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-4 rounded-lg border border-border-default bg-bg-surface">
                    <span className="text-2xl font-extrabold text-navy-950 block">100%</span>
                    <span className="text-xs text-text-secondary">Dana Terproteksi Escrow</span>
                  </div>
                  <div className="p-4 rounded-lg border border-border-default bg-bg-surface">
                    <span className="text-2xl font-extrabold text-navy-950 block">SDG 8</span>
                    <span className="text-xs text-text-secondary">Pekerjaan Layak Pemuda</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Featured Micro-Jobs / Projects Preview */}
        <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary block mb-1">
                Peluang Terbaru
              </span>
              <h2 className="text-2xl font-extrabold text-navy-950">
                Pekerjaan Nyata untuk Menambah Portofolio
              </h2>
            </div>
            <Link href="/jobs" className="text-xs font-bold text-navy-950 hover:underline flex items-center gap-1">
              Lihat Semua 24+ Lowongan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} featured />
            ))}
          </div>
        </section>

        {/* 3. The 3 Value Pillars */}
        <section className="border-t border-border-default/80 bg-bg-surface py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                Bukan sekadar papan lowongan biasa
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Kami dirancang khusus untuk memecahkan dilema &ldquo;butuh pengalaman untuk dapat kerja, butuh kerja untuk dapat pengalaman&rdquo;.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-md bg-navy-950 text-lime-500 flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-base font-bold text-navy-950">
                  Micro-Job UMKM Riil
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Selesaikan tugas digital berskala 1–4 minggu dari pelaku usaha nyata untuk membangun rekam jejak terverifikasi.
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-md bg-navy-950 text-lime-500 flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-base font-bold text-navy-950">
                  Pemeriksa CV ATS Cerdas
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Ketahui mengapa CV-mu ditolak sebelum melamar. Dapatkan kata kunci industri yang hilang dan saran perbaikan langsung.
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-md bg-navy-950 text-lime-500 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-base font-bold text-navy-950">
                  Pembayaran Terjamin Aman
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Dana pemberi kerja dikunci dalam rekening bersama sebelum kamu mengerjakan proyek. Bebas dari risiko kerja tidak dibayar.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
