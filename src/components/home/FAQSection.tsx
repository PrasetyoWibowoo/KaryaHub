import { FadeIn } from "@/components/ui/FadeIn"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ChevronRight, FileText } from "lucide-react"

export function FAQSection() {
  return (
    <section className="py-24 bg-surface-alt border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-heading tracking-tight mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Find quick answers about our service, features, pricing, and how to get the most out of it.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-4">
            {[
              "What is Joblytics and how does it work?",
              "How do I improve my chances of getting hired?",
              "Is my data secure (resumes, emails, etc.)?",
              "Can I apply for jobs outside my location?"
            ].map((q, i) => (
              <div key={i} className="bg-white border border-border rounded-xl p-5 flex justify-between items-center cursor-pointer hover:border-text-subtle transition-colors shadow-sm">
                <span className="font-semibold text-text-heading">{q}</span>
                <ChevronRight className="w-5 h-5 text-text-muted" />
              </div>
            ))}
          </div>
          <div className="md:col-span-2">
            <Card className="p-8 text-center bg-white h-full flex flex-col justify-center items-center shadow-card">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                  <FileText className="w-5 h-5 text-text-heading" />
                </div>
              </div>
              <h3 className="font-bold text-text-heading text-lg mb-2">Do you have more Questions?</h3>
              <p className="text-text-muted text-sm mb-6">
                For any query, our support team is always ready to help you out.
              </p>
              <Button variant="primary" className="rounded-full w-full">Ask a Question</Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
