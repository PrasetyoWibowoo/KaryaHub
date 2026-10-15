export const SCORE_CONFIG = {
  scoreVersion: 1,
  weights: { keyword: 0.4, structure: 0.3, quant: 0.2, links: 0.1 },
  keywordTarget: 10,
  clampMaxChars: 200_000,
} as const

export interface ATSFeedback {
  summary: string
  improvements: string[]
  matchedKeywords: string[]
  missingKeywords: string[]
  detectedSections: string[]
  missingSections: string[]
  quantAchievements: string[]
  foundLinks: string[]
  scoreVersion: number
  band: 'Lemah' | 'Cukup' | 'Baik' | 'Kuat'
}

export interface ScoreBreakdown {
  keyword: number
  structure: number
  quant: number
  links: number
  total: number
}

export interface ATSScanResult {
  atsScore: number
  feedback: ATSFeedback
  scoreBreakdown: ScoreBreakdown
}

export class ATSExtractError extends Error {
  code: 'EMPTY' | 'ENCRYPTED' | 'IMAGE_ONLY' | 'UNREADABLE'
  constructor(code: ATSExtractError['code'], message?: string) {
    super(message ?? code)
    this.name = 'ATSExtractError'
    this.code = code
  }
}

// ponytail: legacy frontend types kept for backward-compat with existing UI components (feedback-list, sample-cv-data).
// Upgrade: migrate UI to ATSFeedback when P6 frontend is built.
/** @deprecated Use ATSFeedback */
export interface ATSFeedbackItem {
  id: string
  category: 'critical' | 'warning' | 'positive'
  section: 'Format' | 'Keywords' | 'Experience' | 'Skills' | 'Contact'
  title: string
  description: string
  recommendation: string
}

/** @deprecated Use ATSScanResult */
export interface ATSAnalysisResult {
  overallScore: number
  tier: 'needs_work' | 'good' | 'exceptional'
  breakdown: { formatCompatibility: number; keywordMatch: number; contentRelevance: number; readabilityScore: number }
  detectedSkills: string[]
  missingIndustryKeywords: string[]
  feedbacks: ATSFeedbackItem[]
  scannedAt: string
}

/** @deprecated */
export interface CareerReadiness {
  score: number
  verifiedSkillsCount: number
  atsScore: number
  portfolioProjectsCount: number
  nextRecommendedAction: { title: string; description: string; actionLabel: string; actionUrl: string }
}
