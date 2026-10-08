import { FadeIn } from "@/components/ui/FadeIn"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export function CTASection() {
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          <Card className="bg-white border border-border shadow-soft p-12 sm:p-20 relative overflow-hidden rounded-3xl">
            <div className="relative z-10 mb-10">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-heading mb-4">
                Unlock Your Career Potential
              </h2>
              <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">
                Thousands of professionals found their dream job with our tools, you can too.
              </p>
              <Button variant="black" size="lg" className="rounded-full px-8 shadow-card">
                Get Started
              </Button>
            </div>

            {/* Decorative Tag Cloud Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
              <div className="absolute top-10 left-10 bg-surface-alt border border-border px-4 py-2 rounded-full text-xs font-semibold text-text-muted blur-[1px]">UI/UX Designer</div>
              <div className="absolute bottom-12 left-20 bg-surface-alt border border-border px-4 py-2 rounded-full text-xs font-semibold text-text-muted">Frontend Developer</div>
              <div className="absolute top-20 right-16 bg-surface-alt border border-border px-4 py-2 rounded-full text-xs font-semibold text-text-muted blur-[2px]">Product Manager</div>
              <div className="absolute bottom-16 right-32 bg-surface-alt border border-border px-4 py-2 rounded-full text-xs font-semibold text-text-muted">Data Scientist</div>
              <div className="absolute top-1/2 left-4 bg-surface-alt border border-border px-4 py-2 rounded-full text-xs font-semibold text-text-muted blur-[1px]">DevOps Engineer</div>
              <div className="absolute top-1/3 right-4 bg-surface-alt border border-border px-4 py-2 rounded-full text-xs font-semibold text-text-muted">Marketing Director</div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
