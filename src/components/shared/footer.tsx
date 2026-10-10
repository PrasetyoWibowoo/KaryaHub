import * as React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-default bg-bg-surface py-12 text-sm text-text-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-navy-950 text-lime-500 font-extrabold text-sm">
                K
              </div>
              <span className="text-lg font-bold text-navy-950">
                Karya<span className="text-lime-500">Hub</span>
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Jembatan karier mahasiswa, fresh graduate, dan UMKM. Membangun portofolio riil sebelum wisuda.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950">
              Peluang
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/jobs?type=INTERNSHIP" className="hover:text-navy-950">
                  Magang Mahasiswa
                </Link>
              </li>
              <li>
                <Link href="/jobs?type=PROJECT" className="hover:text-navy-950">
                  Micro-Job UMKM
                </Link>
              </li>
              <li>
                <Link href="/jobs?type=FREELANCE" className="hover:text-navy-950">
                  Proyek Freelance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950">
              Pengembangan Karier
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/freelancer/ats-checker" className="hover:text-navy-950">
                  Evaluasi CV ATS
                </Link>
              </li>
              <li>
                <Link href="/freelancer" className="hover:text-navy-950">
                  Kesiapan Karier
                </Link>
              </li>
              <li>
                <Link href="/freelancer/wallet" className="hover:text-navy-950">
                  Sistem Escrow Aman
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950">
              Komitmen KaryaHub
            </h4>
            <p className="mt-3 text-xs leading-relaxed text-text-muted">
              Mendukung SDG 8: Pekerjaan Layak dan Pertumbuhan Ekonomi bagi talenta muda Indonesia.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border-default pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>© {new Date().getFullYear()} KaryaHub Indonesia. Hak cipta dilindungi.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-navy-950">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-navy-950">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
