import {
    SCORE_CONFIG,
    ATSExtractError,
    type ATSScanResult,
    type ScoreBreakdown,
    type ATSFeedback,
} from '@/types/ats'

/* ---------- helpers ---------- */

function clamp(v: number, min = 0, max = 100) {
    return Math.max(min, Math.min(max, Math.round(v)))
}

/* ---------- text extraction ---------- */

export async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
    try {
        const { extractText } = await import('unpdf')
        const result = await extractText(new Uint8Array(buffer))
        const fullText = Array.isArray(result.text) ? result.text.join('\n') : String(result.text)
        if (!fullText || fullText.trim().length < 30) {
            throw new ATSExtractError('PDF text too short or unreadable')
        }
        return fullText.slice(0, SCORE_CONFIG.clampMaxChars)
    } catch (err) {
        if (err instanceof ATSExtractError) throw err
        throw new ATSExtractError(
            `Failed to extract text from PDF: ${err instanceof Error ? err.message : String(err)}`,
        )
    }
}

/* ---------- scoring ---------- */

const SECTION_HEADINGS = [
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'summary',
    'objective',
    'work history',
    'achievements',
    'pengalaman',
    'pendidikan',
    'keahlian',
    'sertifikasi',
    'ringkasan',
    'proyek',
]

const QUANT_PATTERNS = [
    /\d+\s*%/g,
    /\$[\d,.]+/g,
    /rp[\s.]?[\d,.]+/gi,
    /\d+\s*(tahun|year|month|bulan)/gi,
    /\d+\s*(project|proyek|client|klien)/gi,
    /\d+\+?\s*(team|tim|member|anggota)/gi,
]

const LINK_PATTERNS = [
    /https?:\/\/[^\s]+/g,
    /linkedin\.com/gi,
    /github\.com/gi,
    /gitlab\.com/gi,
    /behance\.net/gi,
    /dribbble\.com/gi,
    /portfolio/gi,
]

export function scoreResume(
    resumeText: string,
    jobKeywords: string[],
): ATSScanResult {
    const lower = resumeText.toLowerCase()
    const words = lower.split(/\s+/)

    // 1. Keyword matching
    const matched: string[] = []
    const missing: string[] = []

    for (const kw of jobKeywords) {
        const kwLower = kw.toLowerCase()
        if (lower.includes(kwLower)) {
            matched.push(kw)
        } else {
            missing.push(kw)
        }
    }

    const keywordScore =
        jobKeywords.length > 0
            ? clamp((matched.length / Math.max(jobKeywords.length, SCORE_CONFIG.keywordTarget)) * 100)
            : 50

    // 2. Structure score
    let structureHits = 0
    for (const heading of SECTION_HEADINGS) {
        if (lower.includes(heading)) structureHits++
    }
    const structureScore = clamp((structureHits / 5) * 100) // expect at least 5 sections

    // 3. Quantitative achievements
    let quantHits = 0
    for (const pat of QUANT_PATTERNS) {
        const matches = lower.match(pat)
        if (matches) quantHits += matches.length
    }
    const quantScore = clamp((quantHits / 4) * 100) // expect at least 4 quant items

    // 4. Links / portfolio
    let linkHits = 0
    for (const pat of LINK_PATTERNS) {
        const matches = lower.match(pat)
        if (matches) linkHits += matches.length
    }
    const linkScore = clamp((linkHits / 2) * 100) // expect at least 2 links

    const breakdown: ScoreBreakdown = {
        keyword: keywordScore,
        structure: structureScore,
        quant: quantScore,
        links: linkScore,
    }

    const { weights } = SCORE_CONFIG
    const totalScore = clamp(
        breakdown.keyword * weights.keyword +
        breakdown.structure * weights.structure +
        breakdown.quant * weights.quant +
        breakdown.links * weights.links,
    )

    // Build feedback
    const strengths: string[] = []
    const improvements: string[] = []

    if (keywordScore >= 70) strengths.push('Good keyword match with job requirements')
    else improvements.push('Add more relevant keywords from the job description')

    if (structureScore >= 60) strengths.push('Well-structured CV with clear sections')
    else improvements.push('Add clear section headings (Experience, Education, Skills, etc.)')

    if (quantScore >= 50) strengths.push('Includes quantifiable achievements')
    else improvements.push('Add measurable achievements (percentages, numbers, metrics)')

    if (linkScore >= 50) strengths.push('Includes portfolio/professional links')
    else improvements.push('Add links to your portfolio, GitHub, or LinkedIn')

    if (words.length > 200 && words.length < 1200)
        strengths.push('CV length is appropriate')
    else if (words.length <= 200)
        improvements.push('CV seems too short — add more detail')
    else improvements.push('CV is quite long — consider being more concise')

    const feedback: ATSFeedback = {
        matchedKeywords: matched,
        missingKeywords: missing,
        strengths,
        improvements,
    }

    return {
        score: totalScore,
        breakdown,
        feedback,
        version: SCORE_CONFIG.scoreVersion,
    }
}

/* ---------- default keywords when none provided ---------- */

export const DEFAULT_KEYWORDS = [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'SQL',
    'Git',
    'REST API',
    'HTML',
    'CSS',
    'Tailwind',
    'Communication',
    'Problem Solving',
    'Teamwork',
]
