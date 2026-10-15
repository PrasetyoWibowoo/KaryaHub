import { getDocumentProxy, extractText as unpdfExtractText } from 'unpdf'
import { SCORE_CONFIG, ATSExtractError, type ATSScanResult, type ATSFeedback } from '@/types/ats'

export { ATSExtractError } from '@/types/ats'

export const { scoreVersion, weights, keywordTarget, clampMaxChars } = SCORE_CONFIG

export async function extractText(buffer: Buffer | Uint8Array): Promise<string> {
  const data = buffer instanceof Buffer ? new Uint8Array(buffer) : buffer
  try {
    const pdf = await getDocumentProxy(data)
    const { text } = await unpdfExtractText(pdf, { mergePages: true })

    const t = (text ?? '').toString().trim()
    if (t.length === 0) throw new ATSExtractError('EMPTY')
    if (t.length < 200 && !/\b[a-z]{3,}\b/i.test(t)) throw new ATSExtractError('IMAGE_ONLY')
    return t.length > clampMaxChars ? t.slice(0, clampMaxChars) : t
  } catch (err: unknown) {
    if (err instanceof ATSExtractError) throw err
    const msg = err instanceof Error ? err.message : String(err)
    if (/encrypted|password|permission/i.test(msg)) throw new ATSExtractError('ENCRYPTED', msg)
    throw new ATSExtractError('UNREADABLE', msg)
  }
}

function esc(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const ALIAS: Record<string, string> = {
  nextjs: 'next\\.js',
  js: 'javascript',
  ts: 'typescript',
  postgres: 'postgresql',
}

export function calculateScore(text: string, skills: string[]): ATSScanResult {
  const lower = text.toLowerCase()
  const t = text.length > clampMaxChars ? text.slice(0, clampMaxChars) : text

  const uniqSkills = [...new Set(skills.map((s) => s.trim()).filter(Boolean))]

  // ponytail: boundary-aware + alias + escape. Upgrade: normalize di seed bila alias makin banyak.
  let matched = 0
  const matchedKeywords: string[] = []
  const missingKeywords: string[] = []

  for (const s of uniqSkills) {
    const key = s.toLowerCase()
    const aliasPat = ALIAS[key]
    const pat = aliasPat ?? esc(s)
    const re = new RegExp(`(?<![a-z0-9+#.])${pat}(?![a-z0-9+#])`, 'i')
    if (re.test(t)) {
      matched++
      matchedKeywords.push(s)
    } else {
      missingKeywords.push(s)
    }
  }

  const keyword = uniqSkills.length === 0 ? 0 : Math.round((matched / Math.min(uniqSkills.length, keywordTarget)) * 100)

  const sections: Array<{ id: string; re: RegExp }> = [
    { id: 'pendidikan', re: /\b(pendidikan|education)\b/i },
    { id: 'pengalaman', re: /\b(pengalaman|experience|proyek|project|magang|internship|organisasi|organization)\b/i },
    { id: 'keahlian', re: /\b(keahlian|skills?)\b/i },
    { id: 'kontak', re: /[\w.+-]+@[\w.-]+\.[a-z]{2,}|\+?62|0\d{9,}/i },
    { id: 'ringkasan', re: /\b(ringkasan|summary|profil|profile)\b/i },
  ]

  const detectedSections: string[] = []
  const missingSections: string[] = []
  let structureHits = 0
  for (const sec of sections) {
    if (sec.re.test(lower)) {
      detectedSections.push(sec.id)
      structureHits++
    } else {
      missingSections.push(sec.id)
    }
  }
  const structure = Math.min(structureHits * 20, 100)

  const rawQuant = t.match(/(?:rp\s?[\d.,]+|\d+%|\d+\s*(?:juta|ribu|proyek|klien|users?|clients?|projects?))/gi) ?? []
  const seen = new Set<string>()
  const quantAchievements: string[] = []
  for (const q of rawQuant) {
    const k = q.toLowerCase().trim()
    if (/^(?:19|20)\d{2}$/.test(k)) continue
    if (!seen.has(k)) {
      seen.add(k)
      quantAchievements.push(q.trim())
      if (quantAchievements.length >= 5) break
    }
  }
  const quant = Math.min(quantAchievements.length * 20, 100)

  // ponytail: each link type counted once. Upgrade: validate URL format if needed.
  const foundLinks: string[] = []
  let links = 0
  if (/github\.com\//i.test(t)) {
    foundLinks.push('github')
    links += 33
  }
  if (/linkedin\.com\/in\//i.test(t)) {
    foundLinks.push('linkedin')
    links += 33
  }
  if (/behance\.net|dribbble\.com|portofolio|portfolio/i.test(t) || /https?:\/\/\S+/i.test(t)) {
    if (!/github\.com\//i.test(t) || /https?:\/\/(?!.*github\.com)[^\s]+/i.test(t) || /behance\.net|dribbble\.com|portofolio|portfolio/i.test(t)) {
      const hasPortfolio =
        /behance\.net|dribbble\.com|portofolio|portfolio/i.test(t) ||
        /https?:\/\/[^\s]+/i.test(t)
      if (hasPortfolio) {
        const isOnlyGithubLinkedin = foundLinks.length === 2 && !/behance\.net|dribbble\.com|portofolio|portfolio/i.test(t)
        const hasOtherUrl = /https?:\/\/(?!.*(?:github\.com|linkedin\.com))([^\s]+)/i.test(t)
        if (!isOnlyGithubLinkedin || hasOtherUrl || /behance\.net|dribbble\.com|portofolio|portfolio/i.test(t)) {
          foundLinks.push('portfolio')
          links += 34
        }
      }
    }
  }
  links = Math.min(links, 100)

  const total = Math.round(keyword * weights.keyword + structure * weights.structure + quant * weights.quant + links * weights.links)
  const atsScore = Math.max(0, Math.min(100, total))

  const band: ATSFeedback['band'] =
    atsScore >= 80 ? 'Kuat' : atsScore >= 60 ? 'Baik' : atsScore >= 40 ? 'Cukup' : 'Lemah'

  const improvements: string[] = []
  if (keyword < 50 && uniqSkills.length > 0) improvements.push(`Tambahkan ${Math.min(3, missingKeywords.length)} keyword relevan: ${missingKeywords.slice(0, 3).join(', ')}`)
  if (structure < 60) improvements.push(`Lengkapi bagian yang hilang: ${missingSections.join(', ')}`)
  if (quant === 0) improvements.push('Tambahkan pencapaian terukur (mis. "meningkatkan traffic 30%" atau "Rp 5 jt/bulan")')
  if (links < 50) improvements.push('Tambahkan tautan portofolio (GitHub, LinkedIn, atau Behance/Dribbble)')
  if (atsScore < 40) improvements.push('Perjelas ringkasan profil dan susun pengalaman secara kronologis')

  const feedback: ATSFeedback = {
    summary: `Skor ATS ${atsScore} — ${band}. ${atsScore >= 60 ? 'CV sudah baik, tinggal poles sedikit.' : atsScore >= 40 ? 'CV cukup, perlu perbaikan struktur dan keyword.' : 'CV perlu perbaikan signifikan.'}`,
    improvements: improvements.slice(0, 5),
    matchedKeywords,
    missingKeywords,
    detectedSections,
    missingSections,
    quantAchievements,
    foundLinks,
    scoreVersion: SCORE_CONFIG.scoreVersion,
    band,
  }

  const scoreBreakdown = { keyword, structure, quant, links, total: atsScore }

  return { atsScore, feedback, scoreBreakdown }
}
