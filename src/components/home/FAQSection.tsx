import { FadeIn } from "@/components/ui/FadeIn"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ChevronRight, FileText } from "lucide-react"

export function FAQSection() {
  return (
    <section id="faqs" className="py-24 bg-surface-alt border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-heading tracking-tight mb-4">
            Punya Pertanyaan? Kami Punya Jawabannya
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Temukan jawaban tentang cara kerja KaryaHub, fitur, keamanan, dan cara mendapatkan hasil terbaik.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-4">
            {[
              "Apa itu KaryaHub dan bagaimana cara kerjanya?",
              "Bagaimana cara meningkatkan peluang mendapatkan proyek?",
              "Apakah data resume dan dokumen saya aman?",
              "Apakah saya bisa mencari proyek dari kota lain?"
            ].map((q, i) => (
              <div key={i} className="bg-white border border-border rounded-xl p-5 flex justify-between items-center cursor-pointer hover:border-text-subtle transition-colors shadow-sm">
                <span className="font-semibold text-text-heading">{q}</span>
                <ChevronRight className="w-5 h-5 text-text-muted" />
              </div>
            ))}
          </div>
          <div className="md:col-span-2">
            <Card className="p-8 text-center bg-white h-full flex flex-col justify-center items-center shadow-card">
              <div className="w-16 h-16 bg-accent-light rounded-2xl flex items-center justify-center mb-6">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-sm">
                  <FileText className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-text-heading text-lg mb-2">Masih punya pertanyaan?</h3>
              <p className="text-text-muted text-sm mb-6">
                Tim kami siap membantu menjelaskan fitur dan alur penggunaan KaryaHub.
              </p>
              <Button variant="primary" className="rounded-full w-full">Hubungi Kami</Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
