import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import {
  Briefcase,
  FileCheck2,
  Wallet,
  ChevronRight,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      <Navbar />

      <div className="mx-auto flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Dashboard Left Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="rounded-lg border border-border-default bg-bg-surface p-4 shadow-xs sticky top-20">
              {/* User Identity Snippet */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border-default">
                <div className="h-10 w-10 rounded-full bg-navy-950 text-lime-500 font-bold flex items-center justify-center text-sm">
                  AR
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-navy-950 truncate">
                    Aditya Rizky
                  </h4>
                  <p className="text-xs text-text-secondary truncate">
                    Mahasiswa TI · Semester 6
                  </p>
                </div>
              </div>

              {/* Sidebar Navigation */}
              <nav className="space-y-1 text-sm font-medium">
                <Link
                  href="/freelancer"
                  className="flex items-center justify-between px-3 py-2 rounded-md bg-navy-950 text-lime-500 font-semibold"
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="h-4 w-4" />
                    <span>Ringkasan Karier</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/freelancer/ats-checker"
                  className="flex items-center justify-between px-3 py-2 rounded-md text-text-secondary hover:text-navy-950 hover:bg-bg-subtle transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 className="h-4 w-4 text-text-muted" />
                    <span>ATS CV Checker</span>
                  </div>
                  <span className="text-[10px] font-bold bg-lime-500/20 text-navy-950 px-1.5 py-0.5 rounded">
                    78%
                  </span>
                </Link>

                <Link
                  href="/freelancer/my-proposals"
                  className="flex items-center justify-between px-3 py-2 rounded-md text-text-secondary hover:text-navy-950 hover:bg-bg-subtle transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="h-4 w-4 text-text-muted" />
                    <span>Proposal Saya</span>
                  </div>
                  <span className="text-xs font-semibold text-text-muted">
                    2
                  </span>
                </Link>

                <Link
                  href="/freelancer/wallet"
                  className="flex items-center justify-between px-3 py-2 rounded-md text-text-secondary hover:text-navy-950 hover:bg-bg-subtle transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Wallet className="h-4 w-4 text-text-muted" />
                    <span>Dompet Escrow</span>
                  </div>
                </Link>
              </nav>

              {/* Quick Status Callout */}
              <div className="mt-6 p-3 rounded-md bg-bg-subtle border border-border-default text-xs text-text-secondary">
                <p className="font-semibold text-navy-950 mb-1">
                  SDG 8: Peluang Terbuka
                </p>
                <p className="text-[11px] leading-relaxed">
                  2 lowongan baru sesuai dengan skill kamu baru saja ditambahkan oleh UMKM lokal.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Workspace */}
          <main id="main-content" className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
