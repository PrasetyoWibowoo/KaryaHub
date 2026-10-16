export const SCORE_CONFIG = {
    scoreVersion: 1,
    weights: { keyword: 0.4, structure: 0.3, quant: 0.2, links: 0.1 },
    keywordTarget: 10,
    clampMaxChars: 200_000,
} as const

export interface ATSFeedback {
    matchedKeywords: string[]
    missingKeywords: string[]
    strengths: string[]
    improvements: string[]
}

export interface ScoreBreakdown {
    keyword: number
    structure: number
    quant: number
    links: number
}

export interface ATSScanResult {
    score: number
    breakdown: ScoreBreakdown
    feedback: ATSFeedback
    version: number
}

export class ATSExtractError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ATSExtractError'
    }
}
