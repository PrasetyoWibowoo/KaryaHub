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
