import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Content: Stacked Resume Cards & Large Two-Tone Heading */}
        <div className="max-w-4xl">
          
          {/* Overlapping Document Cards Illustration */}
          <div className="relative w-32 h-26 mb-6 sm:mb-8 select-none">
            {/* Back Card (tilted left) */}
            <div className="absolute left-1 top-1 w-18 h-22 sm:w-20 sm:h-24 bg-white rounded-2xl border border-slate-200/90 shadow-[0_8px_20px_rgba(0,0,0,0.03)] -rotate-10 p-3 flex flex-col justify-end gap-1.5 transition-transform hover:-rotate-12">
              <div className="w-9 h-1.5 bg-slate-200/80 rounded-full" />
              <div className="w-11 h-1.5 bg-slate-200/60 rounded-full" />
              <div className="w-7 h-1.5 bg-slate-200/50 rounded-full" />
            </div>

            {/* Front Card (overlapping, slight tilt right) */}
            <div className="absolute left-8 top-0 w-20 h-24 sm:w-22 sm:h-26 bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_28px_rgba(0,0,0,0.06)] rotate-3 p-3.5 flex flex-col justify-between z-10 transition-transform hover:rotate-6">
              {/* Avatar circle silhouette */}
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              {/* Resume content placeholder lines */}
              <div className="space-y-1.5 mt-2">
                <div className="w-12 h-1.5 bg-slate-300/80 rounded-full" />
                <div className="w-10 h-1.5 bg-slate-200/80 rounded-full" />
                <div className="w-7 h-1.5 bg-slate-200/60 rounded-full" />
              </div>
            </div>
          </div>

          {/* Heading with exact bold black & soft gray hierarchy */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold tracking-tight leading-[1.08] select-none">
            <span className="text-slate-950 font-extrabold">Find A Job </span>
            <span className="text-slate-400 font-bold">That Is</span>
            <br />
            <span className="text-slate-400 font-bold">Relevant To You Now</span>
          </h2>
        </div>

        {/* Bottom Bar: Links and Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-20 sm:mt-28 md:mt-32 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-6 sm:gap-9 font-medium text-slate-800">
            <Link href="/legal" className="hover:text-slate-950 transition-colors">
              Legal
            </Link>
            <Link href="/faq" className="hover:text-slate-950 transition-colors">
              Help Center
            </Link>
            <Link href="/terms" className="hover:text-slate-950 transition-colors">
              Term &amp; Conditions
            </Link>
          </div>
          <div className="font-medium text-slate-600 sm:text-slate-500">
            &copy;2025 Joblynx All Right Reserved
          </div>
        </div>

      </div>
    </footer>
  )
}
