import { FadeIn } from "@/components/ui/FadeIn"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function TestimonialSection() {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-[1.75rem] sm:text-[2rem] font-medium leading-[1.4] mb-14 max-w-[90%] mx-auto text-text-heading tracking-tight">
            “What I love most is how the platform recommends jobs that actually match my skills, not just random listings, it made my job search way more focused and efficient”
          </h2>
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-12 h-12 rounded-full shadow-sm" />
              <div className="text-left">
                <div className="font-bold text-text-heading text-sm mb-0.5">Erma Rahmawati</div>
                <div className="text-text-muted text-[13px] font-medium">Project Manager DC Comics</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center shadow-sm hover:bg-surface-alt transition-colors">
                <ChevronLeft className="w-6 h-6 text-text-heading" />
              </button>
              <button className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center shadow-sm hover:bg-surface-alt transition-colors">
                <ChevronRight className="w-6 h-6 text-text-heading" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
