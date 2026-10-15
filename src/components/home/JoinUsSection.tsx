import Link from "next/link"
import { FadeIn } from "@/components/ui/FadeIn"
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
            <div className="p-8 sm:p-10 h-full rounded-3xl flex flex-col border border-border shadow-sm hover:shadow-card bg-white relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-xs">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-text-heading text-2xl mb-4">Untuk Freelancer</h3>
              <p className="text-text-muted leading-relaxed mb-8 flex-1">
                Dapatkan proyek yang sesuai dengan keahlian Anda. Platform kami dilengkapi ATS checker otomatis dan pembayaran aman via Escrow.
              </p>
              <ul className="space-y-3.5 mb-8">
                {["Profil terverifikasi & portofolio", "Proposal proyek tanpa batas", "ATS Checker gratis"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-text-body font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-full h-11 text-sm font-semibold" asChild>
                <Link href="/register?role=freelancer">Daftar sebagai Freelancer</Link>
              </Button>
            </div>
          </FadeIn>

          {/* Untuk UMKM - Solid Black Card */}
          <FadeIn delay={0.2}>
            <div className="p-8 sm:p-10 h-full rounded-3xl flex flex-col bg-slate-950 text-white border border-slate-900 shadow-xl hover:shadow-2xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5">
              {/* Subtle ambient glow */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-white/15 relative z-10 shadow-xs">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-white text-2xl mb-4 relative z-10">Untuk UMKM</h3>
              <p className="text-slate-300 leading-relaxed mb-8 flex-1 relative z-10">
                Kembangkan bisnis Anda dengan talenta terbaik. Posting proyek gratis dan temukan profesional yang tepat dalam 48 jam.
              </p>
              <ul className="space-y-3.5 mb-8 relative z-10">
                {["Posting proyek gratis & mudah", "Talenta lokal terverifikasi", "Pembayaran aman terlindungi"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/register?role=umkm"
                className="inline-flex w-full items-center justify-center rounded-full h-11 px-6 text-sm font-bold bg-white text-slate-950 hover:bg-slate-100 shadow-sm active:scale-95 transition-all duration-200 relative z-10"
              >
                Daftarkan UMKM Anda
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

