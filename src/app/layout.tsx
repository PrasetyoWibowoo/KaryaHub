import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "KaryaHub — Platform Freelance & UMKM AI-Powered Indonesia",
  description: "Hubungkan talenta lokal unggulan dengan UMKM melalui teknologi AI. Escrow aman, ATS Checker cerdas, dan ekosistem kerja yang mendukung SDG 8.",
  keywords: ["freelance", "UMKM", "AI", "Indonesia", "escrow", "talenta lokal"],
  openGraph: {
    title: "KaryaHub — Platform Freelance & UMKM AI-Powered",
    description: "Ekosistem digital untuk talenta lokal dan UMKM Indonesia",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <AuthProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
