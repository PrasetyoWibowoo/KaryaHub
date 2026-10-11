import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileCheck2, LayoutDashboard, Compass } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-default bg-bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-950 text-lime-500 font-extrabold text-lg tracking-tight group-hover:bg-navy-900 transition-colors">
              K
            </div>
            <span className="text-xl font-extrabold tracking-tight text-navy-950">
              Karya<span className="text-lime-500">Hub</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/jobs"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary hover:text-navy-950 hover:bg-bg-subtle rounded-md transition-colors"
            >
              <Compass className="h-4 w-4 text-text-muted" />
              <span>Eksplor Lowongan</span>
            </Link>
            <Link
              href="/freelancer/ats-checker"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary hover:text-navy-950 hover:bg-bg-subtle rounded-md transition-colors"
            >
              <FileCheck2 className="h-4 w-4 text-text-muted" />
              <span>ATS CV Checker</span>
            </Link>
            <Link
              href="/freelancer"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary hover:text-navy-950 hover:bg-bg-subtle rounded-md transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-text-muted" />
              <span>Dashboard Talenta</span>
            </Link>
          </nav>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link href="/freelancer">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Dashboard
            </Button>
          </Link>
          <Link href="/jobs">
            <Button variant="primary" size="sm">
              Cari Peluang
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
