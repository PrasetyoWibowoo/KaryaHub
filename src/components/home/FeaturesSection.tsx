import { FadeIn } from "@/components/ui/FadeIn"
import { Card } from "@/components/ui/Card"
import { Code2, Palette, Filter, ShieldCheck } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-surface-alt relative border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-heading tracking-tight mb-4">
            Fitur Unggulan untuk UMKM & Talenta Lokal
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            AI ATS Evaluator gratis, sistem Escrow aman, dan talenta terverifikasi. Semua dalam satu platform untuk kesuksesan Anda.
          </p>
        </FadeIn>

        {/* Outer grid — both columns get same height via items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Find Jobs That Fit You — flex-1 so it takes available space */}
            <FadeIn delay={0.1} className="flex-1 flex flex-col">
              <Card className="p-10 pb-0 bg-white border-none shadow-sm hover:shadow-card transition-shadow overflow-hidden flex-1 flex flex-col rounded-[2.5rem]">
                <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
                  <div className="w-[85%] bg-white rounded-3xl shadow-card p-6 transform -translate-y-2 border border-gray-50 relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-10 h-10 rounded-full bg-error-light flex items-center justify-center text-error font-bold text-xs"><Palette className="w-5 h-5"/></div>
                      <div>
                        <div className="font-bold text-base text-text-heading">Mobile App Developer</div>
                        <div className="text-xs text-text-muted mt-0.5">Warung Kopi Kenangan</div>
                      </div>
                    </div>
                    <p className="text-sm text-text-heading font-medium leading-relaxed mb-6">
                      Dibutuhkan developer untuk aplikasi mobile loyalty program dengan fitur QR code dan rewards.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 bg-surface-alt rounded-full text-xs font-bold text-text-muted border border-border">Mid-Level</span>
                      <span className="px-3 py-1.5 bg-surface-alt rounded-full text-xs font-bold text-text-muted border border-border">Project</span>
                      <span className="px-3 py-1.5 bg-surface-alt rounded-full text-xs font-bold text-text-muted border border-border">Remote</span>
                    </div>
                  </div>
                  <div className="absolute w-[80%] h-24 bg-white/60 rounded-3xl shadow-sm border border-white top-10 translate-y-8 scale-95 z-0 blur-[1px]"></div>
                </div>
                <div className="pb-10 pt-4">
                  <h3 className="text-[1.75rem] font-bold text-text-heading mb-3">Proyek dari UMKM Lokal</h3>
                  <p className="text-text-muted text-base leading-relaxed pr-8">
                    Dapatkan proyek nyata dari UMKM Indonesia yang membutuhkan keahlian Anda. Harga terjangkau, dampak nyata.
                  </p>
                </div>
              </Card>
            </FadeIn>

            {/* Analyze Your Preferences — flex-1 to match */}
            <FadeIn delay={0.2} className="flex-1 flex flex-col">
              <Card className="p-10 pt-0 bg-white border-none shadow-sm hover:shadow-card transition-shadow overflow-hidden flex-1 flex flex-col-reverse rounded-[2.5rem]">
                <div className="pt-8">
                  <h3 className="text-[1.75rem] font-bold text-text-heading mb-3">AI ATS Evaluator Gratis</h3>
                  <p className="text-text-muted text-base leading-relaxed pr-8">
                    Analisa CV Anda dengan AI dan dapatkan saran untuk meningkatkan peluang diterima hingga 3x lipat.
                  </p>
                </div>
                <div className="flex-1 flex items-end justify-center relative pb-8 border-b border-border/60 min-h-[180px]">
                  <div className="w-[85%] bg-surface-alt rounded-t-3xl border-x border-t border-border/80 p-5 h-[140px] relative flex flex-col items-center justify-end overflow-hidden">
                    <div className="absolute top-5 w-14 h-14 bg-white rounded-full flex items-center justify-center z-10 border border-border shadow-sm">
                      <img src="https://i.pravatar.cc/100?img=12" className="w-12 h-12 rounded-full" alt="User" />
                    </div>
                    <div className="absolute top-5 left-[35%] w-5 h-5 border-t-[3px] border-l-[3px] rounded-tl-md border-text-muted"></div>
                    <div className="absolute top-5 right-[35%] w-5 h-5 border-t-[3px] border-r-[3px] rounded-tr-md border-text-muted"></div>
                    <div className="absolute bottom-[4.5rem] left-[35%] w-5 h-5 border-b-[3px] border-l-[3px] rounded-bl-md border-text-muted"></div>
                    <div className="absolute bottom-[4.5rem] right-[35%] w-5 h-5 border-b-[3px] border-r-[3px] rounded-br-md border-text-muted"></div>
                    <div className="w-full h-10 bg-success-light rounded-lg border border-success/20 mt-auto opacity-70 relative overflow-hidden flex items-center px-4">
                       <div className="text-[10px] font-bold text-primary flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Analyze Data...</div>
                       <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary/40 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Easily Manage Documents */}
            <FadeIn delay={0.3} className="flex-1 flex flex-col">
              <Card className="p-10 pb-0 bg-white border-none shadow-sm hover:shadow-card transition-shadow overflow-hidden flex-1 flex flex-col rounded-[2.5rem]">
                <div className="flex-1 flex items-center justify-center relative gap-6 pt-4 min-h-[180px]">
                  <div className="w-20 h-28 bg-white rounded-xl shadow-card border border-gray-50 flex flex-col justify-end p-3 -rotate-12 translate-y-6">
                    <div className="w-full h-[3px] bg-gray-100 mb-2 rounded"></div>
                    <div className="w-3/4 h-[3px] bg-gray-100 mb-4 rounded"></div>
                    <div className="bg-accent-light text-accent text-[10px] font-bold px-2 py-1 rounded w-fit">DOC</div>
                  </div>
                  <div className="w-24 h-32 bg-white rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col justify-end p-3 z-10 transform scale-110">
                    <div className="w-full h-[3px] bg-gray-100 mb-2 rounded"></div>
                    <div className="w-full h-[3px] bg-gray-100 mb-2 rounded"></div>
                    <div className="w-2/3 h-[3px] bg-gray-100 mb-5 rounded"></div>
                    <div className="bg-error-light text-error text-[10px] font-bold px-2 py-1 rounded w-fit">PDF</div>
                  </div>
                  <div className="w-20 h-28 bg-white rounded-xl shadow-card border border-gray-50 flex flex-col justify-end p-3 rotate-12 translate-y-4">
                    <div className="w-full h-[3px] bg-gray-100 mb-2 rounded"></div>
                    <div className="w-4/5 h-[3px] bg-gray-100 mb-4 rounded"></div>
                    <div className="bg-black text-[10px] text-white font-bold px-2 py-1 rounded w-fit">DOC</div>
                  </div>
                </div>
                <div className="pb-10 pt-4">
                  <h3 className="text-[1.75rem] font-bold text-text-heading mb-3">Kelola Dokumen dengan Mudah</h3>
                  <p className="text-text-muted text-base leading-relaxed pr-8">
                    Simpan dan kelola resume, surat lamaran, portofolio, dan dokumen proyek dari satu tempat.
                  </p>
                </div>
              </Card>
            </FadeIn>

            {/* Escrow Payment Aman */}
            <FadeIn delay={0.4} className="flex-1 flex flex-col">
              <Card className="p-10 pb-0 bg-white border-none shadow-sm hover:shadow-card transition-shadow overflow-hidden flex-1 flex flex-col-reverse rounded-[2.5rem]">
                <div className="pb-8 pt-6">
                  <h3 className="text-[1.75rem] font-bold text-text-heading mb-3">Escrow Payment Aman</h3>
                  <p className="text-text-muted text-base leading-relaxed pr-8">
                    Dana ditahan di rekening bersama Midtrans sampai proyek selesai dan disetujui. UMKM dan talenta sama-sama terlindungi.
                  </p>
                </div>
                <div className="flex-1 flex flex-col justify-center relative border-b border-border/60 min-h-[170px] p-2">
                  <div className="bg-surface-alt/70 border border-border rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-text-heading">Midtrans Escrow Vault</p>
                          <p className="text-[10px] text-text-muted">ID: ESC-2024-8842</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Dana Terkunci 100%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-border/60">
                      <span className="text-text-muted font-medium">Nilai Kontrak Kerja:</span>
                      <strong className="text-text-heading font-extrabold">Rp 5.000.000</strong>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Otomatis cair setelah konfirmasi persetujuan deliverable</span>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            {/* Connect Folio */}
            <FadeIn delay={0.5}>
              <Card className="p-8 px-10 bg-white border-none shadow-sm hover:shadow-card transition-shadow flex items-center justify-between rounded-[2.5rem]" style={{ minHeight: 120 }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-950 rounded-2xl shadow-md flex items-center justify-center text-white font-bold text-base transform -rotate-6">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 bg-emerald-600 rounded-2xl shadow-md flex items-center justify-center text-white font-bold text-xs transform translate-y-1">
                    Figma
                  </div>
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl shadow-md flex items-center justify-center text-white transform rotate-6">
                    <Palette className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                    Terverifikasi Vokasi
                  </div>
                  <h3 className="text-xl font-bold text-text-heading leading-tight">
                    Portofolio Nyata
                  </h3>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}