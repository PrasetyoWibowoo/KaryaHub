import Link from "next/link"
import { FadeIn } from "@/components/ui/FadeIn"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Code2, CheckCircle2, Briefcase } from "lucide-react"

export function JoinUsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-heading tracking-tight mb-4">
            Platform untuk Semua
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Apakah Anda talenta yang mencari peluang, atau UMKM yang butuh keahlian? KaryaHub adalah tempatnya.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Untuk Freelancer */}
          <FadeIn delay={0.1}>
            <Card className="p-10 h-full flex flex-col border border-border shadow-sm hover:shadow-card bg-white relative overflow-hidden group">
              <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Code2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-text-heading text-2xl mb-4">Untuk Freelancer</h3>
              <p className="text-text-muted leading-relaxed mb-8 flex-1">
                Dapatkan proyek yang sesuai dengan keahlian Anda. Platform kami dilengkapi ATS checker otomatis dan pembayaran aman via Escrow.
              </p>
              <ul className="space-y-3 mb-8">
                {["Profil terverifikasi & portofolio", "Proposal proyek tanpa batas", "ATS Checker gratis"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-text-main font-medium">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-full" asChild>
                <Link href="/register?role=freelancer">Daftar sebagai Freelancer</Link>
              </Button>
            </Card>
          </FadeIn>

          {/* Untuk UMKM */}
          <FadeIn delay={0.2}>
            <Card className="p-10 h-full flex flex-col bg-black text-white border-transparent shadow-card hover:shadow-card-hover relative overflow-hidden group">
              <div className="w-14 h-14 bg-accent-light rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display font-bold text-white text-2xl mb-4">Untuk UMKM</h3>
              <p className="text-white/80 leading-relaxed mb-8 flex-1">
                Kembangkan bisnis Anda dengan talenta terbaik. Posting proyek gratis dan temukan profesional yang tepat dalam 48 jam.
              </p>
              <ul className="space-y-3 mb-8">
                {["Posting proyek gratis & mudah", "Talenta lokal terverifikasi", "Pembayaran aman terlindungi"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/90 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="accent" className="w-full rounded-full border-none font-bold" asChild>
                <Link href="/register?role=umkm">Daftarkan UMKM Anda</Link>
              </Button>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
