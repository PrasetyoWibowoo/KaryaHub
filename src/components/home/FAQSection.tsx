"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDown, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  MessageSquare,
  Mail
} from "lucide-react"
import { FadeIn } from "@/components/ui/FadeIn"

interface FAQItem {
  id: string
  category: "all" | "freelancer" | "umkm" | "escrow" | "ats"
  categoryLabel: string
  question: string
  answer: string
  highlights?: string[]
  badge?: string
}

const CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "freelancer", label: "Untuk Freelancer" },
  { id: "umkm", label: "Untuk Mitra UMKM" },
  { id: "escrow", label: "Escrow & Keamanan" },
  { id: "ats", label: "AI ATS Evaluator" },
]

const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "freelancer",
    categoryLabel: "Alur Kerja",
    question: "Apa itu KaryaHub dan bagaimana cara kerjanya?",
    answer: "KaryaHub adalah platform micro-jobs yang mempertemukan UMKM lokal dengan talenta vokasi muda (mahasiswa & lulusan politeknik/SMK) di bawah payung inisiatif SDG 8. UMKM memposting proyek dengan budget terukur, freelancer mengajukan proposal, dan dana diamankan di Rekening Bersama Escrow Midtrans hingga proyek tuntas disetujui.",
    highlights: [
      "Fokus pada micro-jobs terjangkau dan berdampak nyata bagi UMKM",
      "Perlindungan dana 100% via Rekening Bersama (Escrow Midtrans)",
      "Screening instan bertenaga AI untuk transparansi kualifikasi"
    ],
    badge: "SDG 8 Initiative"
  },
  {
    id: "faq-2",
    category: "escrow",
    categoryLabel: "Keamanan Finansial",
    question: "Bagaimana sistem Rekening Bersama (Escrow) bekerja?",
    answer: "Sistem Escrow menjamin keamanan transaksi kedua belah pihak. Saat proposal disepakati, UMKM mengunci dana di rekening penampung resmi Midtrans. Freelancer mulai bekerja dengan kepastian pembayaran, sedangkan UMKM tenang karena dana baru dicairkan setelah deliverable tuntas disetujui.",
    highlights: [
      "Dana dikunci di awal sebelum pekerjaan dimulai",
      "Pencairan otomatis setelah konfirmasi persetujuan deliverable",
      "Mekanisme mediasi sengketa & refund 100% bila pembatalan sah"
    ],
    badge: "Proteksi 100%"
  },
  {
    id: "faq-3",
    category: "ats",
    categoryLabel: "Teknologi AI",
    question: "Bagaimana AI ATS Evaluator menilai CV & Proposal saya?",
    answer: "AI ATS Checker KaryaHub menganalisis resume PDF Anda terhadap deskripsi proyek UMKM yang dituju. Algoritma mengevaluasi kata kunci teknis, hierarki teks, format tanggal kronologis, dan skor keterbacaan, memberi skor 0-100% serta rekomendasi perbaikan instan.",
    highlights: [
      "Gratis tanpa batasan kuota untuk seluruh talenta vokasi",
      "Analisis kata kunci industri digital, e-commerce, dan kebutuhan UMKM",
      "Peluang lolos seleksi meningkat hingga 3x lipat"
    ],
    badge: "98% Akurasi"
  },
  {
    id: "faq-4",
    category: "freelancer",
    categoryLabel: "Peluang Karier",
    question: "Apakah talenta vokasi tanpa pengalaman kerja formal bisa mendaftar?",
    answer: "Tentu saja! KaryaHub dirancang khusus untuk memvalidasi keahlian praktis siswa SMK, politeknik, dan fresh graduate. Proyek berskala terukur (micro-jobs), memungkinkan Anda membangun portofolio nyata berbayar layak dengan testimoni resmi langsung dari pemilik bisnis UMKM.",
    highlights: [
      "Tidak wajib pengalaman formal bertahun-tahun di perusahaan",
      "Verifikasi kompetensi praktis berbasis portofolio proyek riil",
      "Ulasan dan rating resmi langsung dari pemilik bisnis UMKM"
    ],
    badge: "Talenta Muda"
  },
  {
    id: "faq-5",
    category: "umkm",
    categoryLabel: "Transparansi Biaya",
    question: "Berapa biaya untuk memposting lowongan proyek bagi UMKM?",
    answer: "Memposting lowongan proyek di KaryaHub 100% GRATIS tanpa biaya berlangganan. UMKM hanya membayarkan nominal anggaran yang disepakati langsung untuk talenta pilihan Anda tanpa potongan tersembunyi.",
    highlights: [
      "Gratis posting lowongan tanpa batasan kuota proyek",
      "Akses penuh ke hasil evaluasi dan perankingan pelamar berbasis AI ATS",
      "Dana proyek tetap aman di escrow sampai hasil kerja tervalidasi"
    ],
    badge: "0% Biaya Posting"
  },
  {
    id: "faq-6",
    category: "escrow",
    categoryLabel: "Privasi Data",
    question: "Apakah data resume dan berkas portofolio saya aman?",
    answer: "Keamanan privasi Anda terjamin. Seluruh berkas dienkripsi dengan standar AES-256 dan hanya dapat diakses oleh pihak UMKM yang lowongannya Anda lamar. Kami tidak pernah memperjualbelikan data pengguna.",
    highlights: [
      "Enkripsi dokumen berstandar keamanan tinggi",
      "Kontrol penuh atas berkas yang dibagikan",
      "Kepatuhan ketat terhadap perlindungan data privasi pengguna"
    ],
    badge: "Data Terenkripsi"
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredFaqs = FAQS.filter(
    (faq) => selectedCategory === "all" || faq.category === selectedCategory
  )

  return (
    <section id="faqs" className="py-24 sm:py-32 bg-[#fafbfc] border-y border-slate-200/70 relative overflow-hidden">
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 right-0 w-[32rem] h-[32rem] rounded-full bg-emerald-500/5 blur-[120px]" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -bottom-40 left-0 w-[32rem] h-[32rem] rounded-full bg-indigo-500/5 blur-[120px]" 
      />

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs text-[11px] font-bold tracking-wider uppercase text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pusat Tanya Jawab & Edukasi</span>
          </div>

          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
            Punya Pertanyaan?<br />
            <span className="text-slate-400 font-semibold">Kami Siap Menjawab Semuanya.</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Temukan jawaban transparan tentang alur kerja, proteksi Rekening Bersama Escrow, sistem penilaian AI ATS, dan panduan untuk UMKM maupun talenta vokasi.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setOpenIndex(null)
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-slate-950 text-white shadow-sm scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 border border-slate-200/80"
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.9fr] gap-8 items-start">
          <div className="space-y-3.5">

            {filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={faq.id}
                  className={`group rounded-2xl border bg-white transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-slate-900 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5"
                      : "border-slate-200/85 hover:border-slate-300/90 hover:shadow-xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-extrabold transition-colors ${
                        isOpen ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {faq.categoryLabel}
                          </span>
                          {faq.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                              {faq.badge}
                            </span>
                          )}
                        </div>
                        <h3 className={`text-base font-bold transition-colors leading-snug ${
                          isOpen ? "text-slate-950" : "text-slate-800 group-hover:text-slate-950"
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen 
                        ? "bg-slate-950 border-slate-950 text-white rotate-180" 
                        : "bg-slate-50 border-slate-200 text-slate-500 group-hover:bg-slate-100"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100">
                          <p className="text-sm leading-relaxed text-slate-600 mt-3 font-normal">
                            {faq.answer}
                          </p>

                          {faq.highlights && (
                            <div className="mt-4 pt-4 border-t border-slate-100/80 space-y-2">
                              {faq.highlights.map((h, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5" />
                                  </div>
                                  <span>{h}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          <div className="lg:sticky lg:top-28 space-y-4">
            <div className="rounded-3xl bg-slate-950 text-white p-7 sm:p-8 shadow-[0_24px_50px_-16px_rgba(15,23,42,0.4)] border border-white/10 relative overflow-hidden">
              <div 
                aria-hidden="true" 
                className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-500/15 blur-2xl" 
              />
              <div 
                aria-hidden="true" 
                className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-500/15 blur-2xl" 
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-400 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Tim Support Siaga • Respons &lt; 15 Mnt</span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-white text-slate-950 flex items-center justify-center shadow-lg mb-5 font-bold">
                  <MessageCircle className="w-6 h-6 text-slate-900" />
                </div>

                <h3 className="font-display font-extrabold text-2xl text-white tracking-tight leading-snug">
                  Masih Punya Pertanyaan Lain?
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300 font-normal">
                  Konsultasikan kebutuhan digitalisasi usaha atau alur proyek langsung dengan tim pendamping resmi KaryaHub.
                </p>

                <div className="mt-5 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="flex -space-x-2 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-slate-950 flex items-center justify-center text-[11px] font-bold text-white">
                      IR
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-slate-950 flex items-center justify-center text-[11px] font-bold text-white">
                      BS
                    </div>
                    <div className="w-8 h-8 rounded-full bg-amber-600 border-2 border-slate-950 flex items-center justify-center text-[11px] font-bold text-white">
                      KH
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Tim Pendamping KaryaHub</p>
                    <p className="text-[10px] text-slate-400">Bantuan registrasi, escrow & seleksi talenta</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Tim%20KaryaHub,%20saya%20ingin%20konsultasi%20seputar%20platform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 h-11 px-6 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat WhatsApp (Respons Kilat)</span>
                  </a>

                  <a
                    href="mailto:halo@karyahub.id?subject=Pertanyaan%20seputar%20KaryaHub"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-transparent hover:bg-white/10 text-white border border-white/20 h-11 px-6 text-sm font-semibold transition-all active:scale-[0.98]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email ke halo@karyahub.id</span>
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Garansi Aman 100%
                  </span>
                  <span>Jam Operasional: 08.00 - 20.00 WIB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
