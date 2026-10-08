import { FadeIn } from "@/components/ui/FadeIn"
import { Card } from "@/components/ui/Card"
import { Code2, Palette, Filter } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-24 bg-[#F5FFF4] relative border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-heading tracking-tight mb-4">
            Tools That Work Hard as You
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Explore features that streamline your search and connect you with the right opportunities.
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
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs"><Palette className="w-5 h-5"/></div>
                      <div>
                        <div className="font-bold text-base text-text-heading">Flutter Specialist</div>
                        <div className="text-xs text-text-muted mt-0.5">French's</div>
                      </div>
                    </div>
                    <p className="text-sm text-text-heading font-medium leading-relaxed mb-6">
                      Looking for a flutter specialist who professional experiences, Ensure app can using clearly
                    </p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 bg-surface-alt rounded-full text-xs font-bold text-text-muted border border-border">Senior</span>
                      <span className="px-3 py-1.5 bg-surface-alt rounded-full text-xs font-bold text-text-muted border border-border">Full-time</span>
                      <span className="px-3 py-1.5 bg-surface-alt rounded-full text-xs font-bold text-text-muted border border-border">Remote</span>
                    </div>
                  </div>
                  <div className="absolute w-[80%] h-24 bg-white/60 rounded-3xl shadow-sm border border-white top-10 translate-y-8 scale-95 z-0 blur-[1px]"></div>
                </div>
                <div className="pb-10 pt-4">
                  <h3 className="text-[1.75rem] font-bold text-text-heading mb-3">Find Jobs That Fit You</h3>
                  <p className="text-text-muted text-base leading-relaxed pr-8">
                    Joblynx suggests roles that fit your skills, boosting your chances as a candidate.
                  </p>
                </div>
              </Card>
            </FadeIn>

            {/* Analyze Your Preferences — flex-1 to match */}
            <FadeIn delay={0.2} className="flex-1 flex flex-col">
              <Card className="p-10 pt-0 bg-white border-none shadow-sm hover:shadow-card transition-shadow overflow-hidden flex-1 flex flex-col-reverse rounded-[2.5rem]">
                <div className="pt-8">
                  <h3 className="text-[1.75rem] font-bold text-text-heading mb-3">Analyze Your Preferences</h3>
                  <p className="text-text-muted text-base leading-relaxed pr-8">
                    Explore job types, high-opportunity areas, and track your profile with analytics.
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
                    <div className="w-full h-10 bg-[#E8F8EE] rounded-lg border border-[#BCE8CD] mt-auto opacity-70 relative overflow-hidden flex items-center px-4">
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
                    <div className="bg-blue-500 text-[10px] text-white font-bold px-2 py-1 rounded w-fit">DOC</div>
                  </div>
                  <div className="w-24 h-32 bg-white rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col justify-end p-3 z-10 transform scale-110">
                    <div className="w-full h-[3px] bg-gray-100 mb-2 rounded"></div>
                    <div className="w-full h-[3px] bg-gray-100 mb-2 rounded"></div>
                    <div className="w-2/3 h-[3px] bg-gray-100 mb-5 rounded"></div>
                    <div className="bg-red-500 text-[10px] text-white font-bold px-2 py-1 rounded w-fit">PDF</div>
                  </div>
                  <div className="w-20 h-28 bg-white rounded-xl shadow-card border border-gray-50 flex flex-col justify-end p-3 rotate-12 translate-y-4">
                    <div className="w-full h-[3px] bg-gray-100 mb-2 rounded"></div>
                    <div className="w-4/5 h-[3px] bg-gray-100 mb-4 rounded"></div>
                    <div className="bg-black text-[10px] text-white font-bold px-2 py-1 rounded w-fit">DOC</div>
                  </div>
                </div>
                <div className="pb-10 pt-4">
                  <h3 className="text-[1.75rem] font-bold text-text-heading mb-3">Easily Manage Documents.</h3>
                  <p className="text-text-muted text-base leading-relaxed pr-8">
                    Easily import and export multiple job-related files in one place resumes, cover letters, portfolios, and more.
                  </p>
                </div>
              </Card>
            </FadeIn>

            {/* Find Your Dream Job */}
            <FadeIn delay={0.4} className="flex-1 flex flex-col">
              <Card className="p-10 pb-0 bg-white border-none shadow-sm hover:shadow-card transition-shadow overflow-hidden flex-1 flex flex-col-reverse rounded-[2.5rem]">
                <div className="pb-8 pt-6">
                  <h3 className="text-[1.75rem] font-bold text-text-heading mb-3">Find Your Dream Job, No Noise</h3>
                  <p className="text-text-muted text-base leading-relaxed pr-8">
                    Use accurate and detailed filters to narrow down jobs that truly align with your goals, skills, and location.
                  </p>
                </div>
                <div className="flex-1 flex flex-col justify-center relative border-b border-border/60 min-h-[160px]">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#FCE3BA] border-[3px] border-white font-bold flex items-center justify-center text-sm shadow-sm">a</div>
                        <div className="w-10 h-10 rounded-full bg-[#3B3D4D] border-[3px] border-white font-bold flex items-center justify-center text-sm text-white shadow-sm">G</div>
                        <div className="w-10 h-10 rounded-full bg-[#CCD0FA] border-[3px] border-white font-bold flex items-center justify-center text-sm shadow-sm text-indigo-700">AI</div>
                        <div className="w-10 h-10 rounded-full bg-[#FAD9D9] border-[3px] border-white font-bold flex items-center justify-center text-sm text-red-500 shadow-sm">O</div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-bold text-text-heading bg-white shadow-sm cursor-pointer hover:bg-surface-alt">
                        <Filter className="w-4 h-4" /> Filter
                      </div>
                   </div>
                   <div className="flex gap-4 mb-5 justify-between px-2">
                      <div className="px-4 py-2 bg-white border border-border/80 rounded-full shadow-sm text-[13px] font-bold flex items-center gap-2 text-text-heading">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" className="w-4 h-4" alt="BMW"/> UI/UX Design
                      </div>
                      <div className="px-4 py-2 bg-white border border-border/80 rounded-full shadow-sm text-[13px] font-bold flex items-center gap-2 text-text-heading">
                        <div className="w-4 h-4 bg-[#FF4500] rounded-[4px] flex items-center justify-center text-white text-[10px]">S</div> Brand Designer
                      </div>
                   </div>
                   <div className="flex items-center justify-between text-[13px] text-text-muted font-semibold px-2">
                     <div>Surabaya, Indonesia</div>
                     <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-primary rounded-full"></div> Level Junior</div>
                     <div className="w-6 h-6 bg-[#2B84D3] rounded-full flex items-center justify-center text-white font-bold text-[9px] border-2 border-white shadow-sm">Ps</div>
                   </div>
                </div>
              </Card>
            </FadeIn>

            {/* Connect Folio */}
            <FadeIn delay={0.5}>
              <Card className="p-8 px-10 bg-white border-none shadow-sm hover:shadow-card transition-shadow flex items-center justify-between rounded-[2.5rem]" style={{ minHeight: 120 }}>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-primary rounded-2xl shadow-md flex items-center justify-center transform -rotate-12 z-10"><Code2 className="w-7 h-7 text-white"/></div>
                  <div className="w-14 h-14 bg-[#1769FF] rounded-2xl shadow-md flex items-center justify-center text-white font-bold text-2xl transform -translate-x-5 translate-y-3 z-20 border-2 border-white">Bē</div>
                  <div className="w-14 h-14 bg-[#EA4C89] rounded-2xl shadow-md flex items-center justify-center text-white transform -translate-x-10 -rotate-12 z-0"><Palette className="w-7 h-7"/></div>
                </div>
                <h3 className="text-xl font-bold text-text-heading max-w-[160px] leading-tight text-right">
                  Connect with your portfolio platforms.
                </h3>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}