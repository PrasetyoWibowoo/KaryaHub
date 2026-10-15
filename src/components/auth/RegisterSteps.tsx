"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface Step {
  number: number
  label: string
}

interface RegisterStepsProps {
  currentStep: number
  steps: Step[]
}

export function RegisterSteps({ currentStep, steps }: RegisterStepsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number
        const isActive = currentStep === step.number
        const isCurrentOrPast = currentStep >= step.number

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 relative ${
                  isCurrentOrPast
                    ? 'bg-primary text-white shadow-primary'
                    : 'bg-surface-alt text-text-muted'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStepRing"
                    className="absolute -inset-1 rounded-full border-2 border-primary/40 pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {isCompleted ? <Check className="w-5 h-5" /> : step.number}
              </motion.div>
              <span className={`text-xs mt-2 font-semibold transition-colors duration-200 ${isCurrentOrPast ? 'text-text-heading' : 'text-text-muted'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-20 h-1 mx-2 mb-6 rounded-full bg-border overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

