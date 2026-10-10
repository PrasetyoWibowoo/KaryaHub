import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KaryaHub — Platform Karier & Micro-Job Generasi Muda",
  description:
    "Jembatan karier mahasiswa, fresh graduate, dan UMKM. Temukan proyek riil, evaluasi CV ATS, dan bangun portofolio terverifikasi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-lime-500 focus:text-navy-950 focus:rounded-md focus:font-semibold focus:shadow-md"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
