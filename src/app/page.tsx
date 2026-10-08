import { Navbar } from "@/components/shared/Navbar"
import { HeroSection } from "@/components/home/HeroSection"
import { FeaturesSection } from "@/components/home/FeaturesSection"
import { JoinUsSection } from "@/components/home/JoinUsSection"
import { FAQSection } from "@/components/home/FAQSection"
import { TestimonialSection } from "@/components/home/TestimonialSection"
import { CTASection } from "@/components/home/CTASection"
import { Footer } from "@/components/shared/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-text-heading">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <JoinUsSection />
      <FAQSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  )
}
