import { requireRole } from '@/lib/auth-helpers'
import { ok, fail } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { uploadResume } from '@/lib/storage'
import { extractText, calculateScore, ATSExtractError } from '@/lib/ats-engine'

export const runtime = 'nodejs'

// ponytail: in-memory rate limit per user, max 5 req / 5 min. Upgrade: Redis/Upstash bila multi-replica.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 5 * 60 * 1000

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

const PDF_MAGIC = '%PDF'
const MAX_FILE_BYTES = 5 * 1024 * 1024

export async function POST(req: Request) {
  const { error, session } = await requireRole(['FREELANCER', 'ADMIN'])
  if (error) return error

  if (!checkRateLimit(session!.user.id)) {
    return fail('Terlalu banyak permintaan. Coba lagi dalam beberapa menit.', 429)
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return fail('Request tidak valid.', 400)
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return fail('File harus berformat PDF.', 400)
  }

  if (file.type !== 'application/pdf') {
    return fail('File harus berformat PDF.', 400)
  }

  if (file.size > MAX_FILE_BYTES) {
    const mb = (file.size / (1024 * 1024)).toFixed(1)
    return fail(`File maksimal 5 MB. Ukuran file kamu: ${mb} MB.`, 400)
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  // verify magic bytes server-side — don't trust Content-Type header alone
  if (!buffer.slice(0, 4).toString('ascii').startsWith(PDF_MAGIC)) {
    return fail('File harus berformat PDF.', 400)
  }

  // upload first — stop on failure (architecture.md §8)
  let fileKey: string
  try {
    fileKey = await uploadResume(session!.user.id, buffer)
  } catch (err: unknown) {
    logger.error('ats.scan.upload', err, { userId: session!.user.id })
    return fail('Gagal menyimpan file. Coba beberapa saat lagi.', 500)
  }

  // extract text
  // ponytail: typed catch—ATSExtractError carries code EMPTY/ENCRYPTED/IMAGE_ONLY/UNREADABLE for 422. Generic errors → 500.
  let text: string
  try {
    text = await extractText(buffer)
  } catch (err) {
    if (err instanceof ATSExtractError) {
      const msg =
        err.code === 'ENCRYPTED' || err.code === 'IMAGE_ONLY' || err.code === 'EMPTY'
          ? 'PDF tidak bisa dibaca. Pastikan PDF tidak terproteksi password.'
          : 'PDF tidak bisa dibaca. Pastikan PDF tidak terproteksi password.'
      // save zero-score record for manual review
      await prisma.resumeATS.create({
        data: {
          userId: session!.user.id,
          fileUrl: fileKey,
          atsScore: 0,
          feedbackAnalysis: { error: err.code, requiresManualReview: true },
        },
      })
      return fail(msg, 422)
    }
    logger.error('ats.scan.extract', err, { userId: session!.user.id })
    return fail('Terjadi kesalahan pada server', 500)
  }

  // fetch skills master for keyword scoring
  const skills = await prisma.skill.findMany({ select: { name: true } })
  const skillNames = skills.map((s) => s.name)

  const { atsScore, feedback, scoreBreakdown } = calculateScore(text, skillNames)

  const record = await prisma.resumeATS.create({
    data: {
      userId: session!.user.id,
      fileUrl: fileKey,
      atsScore,
      feedbackAnalysis: { feedback, scoreBreakdown } as unknown as import('@/generated/prisma').Prisma.InputJsonValue,
    },
    select: { id: true, atsScore: true, createdAt: true },
  })

  logger.info('ats.scan.ok', { userId: session!.user.id, atsScore, recordId: record.id })

  return ok('Scan berhasil', { atsScore, feedback, scoreBreakdown }, 201)
}
