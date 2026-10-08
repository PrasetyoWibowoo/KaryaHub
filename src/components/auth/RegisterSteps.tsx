"use client"

import { Check } from "lucide-react"

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
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              currentStep >= step.number
                ? 'bg-primary text-white shadow-primary'
                : 'bg-surface-alt text-text-muted'
            }`}>
              {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
            </div>
            <span className={`text-xs mt-2 font-semibold ${currentStep >= step.number ? 'text-text-heading' : 'text-text-muted'}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-20 h-1 mx-2 mb-6 rounded-full transition-all ${
              currentStep > step.number ? 'bg-primary' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

