"use client"

import { useState } from "react"
import { FadeIn } from "@/components/ui/FadeIn"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote: "Yang paling saya suka, KaryaHub merekomendasikan proyek yang benar-benar sesuai dengan keahlian saya. Pencarian kerja jadi lebih fokus dan efisien.",
    name: "Erma Rahmawati",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/100?img=5"
  },
  {
    quote: "Sebagai UMKM, kami kesulitan menemukan developer yang terjangkau. KaryaHub menghubungkan kami dengan talenta lokal berkualitas dengan harga yang sesuai budget.",
    name: "Budi Santoso",
    role: "Owner, Warung Kopi Kenangan",
    avatar: "https://i.pravatar.cc/100?img=12"
  },
  {
    quote: "AI ATS Evaluator sangat membantu! CV saya yang tadinya jarang dilirik sekarang dapat respons dari banyak UMKM. Fitur ini game-changer buat fresh graduate seperti saya.",
    name: "Dina Marlina",
    role: "Fresh Graduate - Mobile Developer",
    avatar: "https://i.pravatar.cc/100?img=9"
  },
  {
    quote: "Sistem Escrow memberikan rasa aman. Sebagai freelancer, saya tidak takut lagi tidak dibayar. UMKM juga merasa aman karena dana baru keluar kalau proyek selesai.",
    name: "Ahmad Fauzi",
    role: "Full Stack Developer",
    avatar: "https://i.pravatar.cc/100?img=14"
  }
]

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="mb-4 flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-primary w-8' : 'bg-border'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
          <h2 className="text-[1.75rem] sm:text-[2rem] font-medium leading-[1.4] mb-14 max-w-[90%] mx-auto text-text-heading tracking-tight min-h-[140px] flex items-center justify-center">
            {current.quote}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-3xl mx-auto gap-4">
            <div className="flex items-center gap-4">
              <img src={current.avatar} alt={current.name} className="w-12 h-12 rounded-full shadow-sm" />
              <div className="text-left">
                <div className="font-bold text-text-heading text-sm mb-0.5">{current.name}</div>
                <div className="text-text-muted text-[13px] font-medium">{current.role}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handlePrev}
                className="w-11 h-11 bg-white border border-border rounded-full flex items-center justify-center shadow-soft hover:border-border-strong transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-text-heading" />
              </button>
              <button 
                onClick={handleNext}
                className="w-11 h-11 bg-black rounded-full flex items-center justify-center shadow-sm hover:bg-neutral-800 transition-all duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
