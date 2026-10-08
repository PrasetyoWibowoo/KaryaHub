"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { FadeIn } from "@/components/ui/FadeIn"
import { Card } from "@/components/ui/Card"
import { RegisterSteps } from "@/components/auth/RegisterSteps"
import { SkillsInput } from "@/components/ui/SkillsInput"
import { Briefcase, User, Building2, Mail, Lock, ArrowRight, ArrowLeft, Check, Phone, Globe, Sparkles, Users as UsersIcon } from "lucide-react"

type UserType = "freelancer" | "umkm" | null

interface FreelancerFormData {
  name: string
  email: string
  password: string
  phone: string
  skills: string[]  // Changed from string to string[]
  experience: string
  portfolio: string
  bio: string
}

interface UMKMFormData {
  name: string
  email: string
  password: string
  phone: string
  businessType: string
  companySize: string
  industry: string
  website: string
  description: string
}

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<UserType>(null)
  const [freelancerData, setFreelancerData] = useState<FreelancerFormData>({
    name: "", email: "", password: "", phone: "", skills: [], experience: "beginner", portfolio: "", bio: ""
  })
  const [umkmData, setUmkmData] = useState<UMKMFormData>({
    name: "", email: "", password: "", phone: "", businessType: "umkm", companySize: "1-10", industry: "", website: "", description: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { number: 1, label: "Choose Type" },
    { number: 2, label: "Your Info" },
    { number: 3, label: "Complete" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const data = userType === "freelancer" ? freelancerData : umkmData
      
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          role: userType,
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Registration failed")
      }

      // Success - show completion step
      setStep(3)
    } catch (error) {
      console.error("Registration error:", error)
      alert(error instanceof Error ? error.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <Briefcase className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-display text-2xl font-black text-text-heading">KaryaHub</span>
          </Link>

          <RegisterSteps currentStep={step} steps={steps} />

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="font-display text-4xl font-bold text-text-heading tracking-tight mb-3">Join KaryaHub</h1>
                <p className="text-text-muted text-base">Choose how you want to get started</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card onClick={() => setUserType("freelancer")} className={`p-8 cursor-pointer transition-all ${userType === "freelancer" ? "border-2 border-primary shadow-primary bg-primary-light/30" : "hover:border-primary/50"}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${userType === "freelancer" ? "bg-primary" : "bg-surface-alt"}`}>
                    <User className={`w-8 h-8 ${userType === "freelancer" ? "text-white" : "text-text-muted"}`} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-text-heading mb-2">Freelancer</h3>
                  <p className="text-text-muted">Find projects that match your skills and build your portfolio</p>
                  {userType === "freelancer" && <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm"><Check className="w-5 h-5" /> Selected</div>}
                </Card>

                <Card onClick={() => setUserType("umkm")} className={`p-8 cursor-pointer transition-all ${userType === "umkm" ? "border-2 border-primary shadow-primary bg-primary-light/30" : "hover:border-primary/50"}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${userType === "umkm" ? "bg-primary" : "bg-surface-alt"}`}>
                    <Building2 className={`w-8 h-8 ${userType === "umkm" ? "text-white" : "text-text-muted"}`} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-text-heading mb-2">UMKM / Business</h3>
                  <p className="text-text-muted">Post projects and hire talented freelancers for your business</p>
                  {userType === "umkm" && <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm"><Check className="w-5 h-5" /> Selected</div>}
                </Card>
              </div>

              <Button onClick={() => setStep(2)} disabled={!userType} variant="primary" className="w-full h-14 rounded-xl font-bold text-base mt-8">
                Continue <ArrowRight className="ml-2 w-5 h-5 text-accent" />
              </Button>
            </div>
          )}

          {step === 2 && userType === "freelancer" && (
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-primary">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h1 className="font-display text-4xl font-bold text-text-heading tracking-tight mb-3">Create Freelancer Account</h1>
                <p className="text-text-muted text-base">Tell us about yourself and start finding amazing projects</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-text-heading mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input type="text" value={freelancerData.name} onChange={(e) => setFreelancerData({ ...freelancerData, name: e.target.value })} placeholder="John Doe" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-heading mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input type="tel" value={freelancerData.phone} onChange={(e) => setFreelancerData({ ...freelancerData, phone: e.target.value })} placeholder="+62 812 3456 7890" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input type="email" value={freelancerData.email} onChange={(e) => setFreelancerData({ ...freelancerData, email: e.target.value })} placeholder="you@example.com" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input type="password" value={freelancerData.password} onChange={(e) => setFreelancerData({ ...freelancerData, password: e.target.value })} placeholder="••••••••" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" required />
                  </div>
                  <p className="text-xs text-text-subtle mt-1.5">Minimum 8 characters with letters and numbers</p>
                </div>

                <div>
                  <SkillsInput
                    label="Skills"
                    value={freelancerData.skills}
                    onChange={(skills) => setFreelancerData({ ...freelancerData, skills })}
                    placeholder="Type a skill and press Enter"
                    helperText="Add your key skills"
                    required
                    maxSkills={15}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Experience Level *</label>
                  <select value={freelancerData.experience} onChange={(e) => setFreelancerData({ ...freelancerData, experience: e.target.value })} className="w-full h-12 px-4 bg-white border-2 border-border rounded-xl text-text-heading focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none">
                    <option value="beginner">Beginner (0-1 year)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="expert">Expert (3-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Portfolio URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input type="url" value={freelancerData.portfolio} onChange={(e) => setFreelancerData({ ...freelancerData, portfolio: e.target.value })} placeholder="https://yourportfolio.com" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Short Bio</label>
                  <textarea value={freelancerData.bio} onChange={(e) => setFreelancerData({ ...freelancerData, bio: e.target.value })} placeholder="Tell clients about yourself and your expertise..." rows={3} className="w-full px-4 py-3 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none" />
                  <p className="text-xs text-text-subtle mt-1.5">Optional - helps you stand out to clients</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" onClick={() => setStep(1)} variant="outline" className="h-12 rounded-xl font-bold px-6">
                    <ArrowLeft className="mr-2 w-5 h-5" /> Back
                  </Button>
                  <Button type="submit" variant="primary" isLoading={isLoading} className="flex-1 h-12 rounded-xl font-bold text-base group shadow-primary">
                    Create Account <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
              <p className="text-center text-sm text-text-muted mt-6">
                Already have an account? <Link href="/login" className="font-semibold text-primary hover:text-primary-hover">Sign in</Link>
              </p>
            </div>
          )}

          {step === 2 && userType === "umkm" && (
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-primary">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h1 className="font-display text-4xl font-bold text-text-heading tracking-tight mb-3">Create Business Account</h1>
                <p className="text-text-muted text-base">Start hiring talented freelancers for your projects</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-text-heading mb-2">Company Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input type="text" value={umkmData.name} onChange={(e) => setUmkmData({ ...umkmData, name: e.target.value })} placeholder="PT. Example Indonesia" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-heading mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input type="tel" value={umkmData.phone} onChange={(e) => setUmkmData({ ...umkmData, phone: e.target.value })} placeholder="+62 21 1234 5678" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Business Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input type="email" value={umkmData.email} onChange={(e) => setUmkmData({ ...umkmData, email: e.target.value })} placeholder="contact@company.com" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input type="password" value={umkmData.password} onChange={(e) => setUmkmData({ ...umkmData, password: e.target.value })} placeholder="••••••••" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" required />
                  </div>
                  <p className="text-xs text-text-subtle mt-1.5">Minimum 8 characters with letters and numbers</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-text-heading mb-2">Business Type *</label>
                    <select value={umkmData.businessType} onChange={(e) => setUmkmData({ ...umkmData, businessType: e.target.value })} className="w-full h-12 px-4 bg-white border-2 border-border rounded-xl text-text-heading focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none">
                      <option value="umkm">UMKM</option>
                      <option value="startup">Startup</option>
                      <option value="enterprise">Enterprise</option>
                      <option value="individual">Individual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-heading mb-2">Company Size *</label>
                    <select value={umkmData.companySize} onChange={(e) => setUmkmData({ ...umkmData, companySize: e.target.value })} className="w-full h-12 px-4 bg-white border-2 border-border rounded-xl text-text-heading focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none">
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Industry *</label>
                  <div className="relative">
                    <UsersIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input type="text" value={umkmData.industry} onChange={(e) => setUmkmData({ ...umkmData, industry: e.target.value })} placeholder="e.g. Technology, Fashion, F&B" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input type="url" value={umkmData.website} onChange={(e) => setUmkmData({ ...umkmData, website: e.target.value })} placeholder="https://yourcompany.com" className="w-full h-12 pl-12 pr-4 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-heading mb-2">Company Description</label>
                  <textarea value={umkmData.description} onChange={(e) => setUmkmData({ ...umkmData, description: e.target.value })} placeholder="Tell us about your company and what you're looking for..." rows={3} className="w-full px-4 py-3 bg-white border-2 border-border rounded-xl text-text-heading placeholder:text-text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none" />
                  <p className="text-xs text-text-subtle mt-1.5">Optional - helps freelancers understand your business</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" onClick={() => setStep(1)} variant="outline" className="h-12 rounded-xl font-bold px-6">
                    <ArrowLeft className="mr-2 w-5 h-5" /> Back
                  </Button>
                  <Button type="submit" variant="primary" isLoading={isLoading} className="flex-1 h-12 rounded-xl font-bold text-base group shadow-primary">
                    Create Account <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
              <p className="text-center text-sm text-text-muted mt-6">
                Already have an account? <Link href="/login" className="font-semibold text-primary hover:text-primary-hover">Sign in</Link>
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-md mx-auto text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-success/30 animate-pulse-slow">
                <Check className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
              <h1 className="font-display text-4xl font-bold text-text-heading tracking-tight mb-3">Welcome to KaryaHub!</h1>
              <p className="text-text-muted text-base mb-8 leading-relaxed">Your account has been created successfully. Start exploring opportunities and connect with amazing {userType === "freelancer" ? "clients" : "talent"} now!</p>
              <Button variant="primary" className="w-full h-14 rounded-xl font-bold text-base shadow-primary" asChild>
                <Link href="/login">
                  Sign In to Continue <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <p className="text-center text-sm text-text-muted mt-6">
                or <Link href="/" className="font-semibold text-primary hover:text-primary-hover">Back to Home</Link>
              </p>
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  )
}


