"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/FadeIn"
import { Sparkles, Users, Briefcase, TrendingUp, CheckCircle2 } from "lucide-react"

export function LoginVisualSide() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-light via-white to-accent-light relative overflow-hidden items-center justify-center p-12">
      <FadeIn delay={0.2} className="relative z-10 max-w-lg">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-10 -left-10 w-20 h-20 bg-primary rounded-2xl opacity-20" />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-card-hover border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-text-heading">Smart Matching</div>
              <div className="text-sm text-text-muted">AI-Powered</div>
            </div>
          </div>

          <h2 className="font-display text-3xl font-bold text-text-heading mb-4 leading-tight">
            Jobs That Match Your Skills
          </h2>
          
          <p className="text-text-muted leading-relaxed mb-8">
            Connect with opportunities where you'll truly excel.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-success-light rounded-xl p-4 text-center">
              <Users className="w-5 h-5 text-success mx-auto mb-2" />
              <div className="font-bold text-2xl text-text-heading">10K+</div>
              <div className="text-xs text-text-muted">Users</div>
            </div>
            <div className="bg-accent-light rounded-xl p-4 text-center">
              <Briefcase className="w-5 h-5 text-accent mx-auto mb-2" />
              <div className="font-bold text-2xl text-text-heading">5K+</div>
              <div className="text-xs text-text-muted">Jobs</div>
            </div>
            <div className="bg-primary-light rounded-xl p-4 text-center">
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="font-bold text-2xl text-text-heading">95%</div>
              <div className="text-xs text-text-muted">Success</div>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="mt-8 bg-white rounded-2xl p-6 shadow-card border border-border">
          <div className="flex items-start gap-4">
            <img src="https://i.pravatar.cc/100?img=12" className="w-12 h-12 rounded-full border-2 border-primary" alt="User" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-text-heading">Sarah Wijaya</span>
                <span className="px-2 py-0.5 bg-success-light text-success text-xs font-bold rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Hired
                </span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">"Found my dream job in just 2 weeks!"</p>
            </div>
          </div>
        </motion.div>
      </FadeIn>
    </div>
  )
}

