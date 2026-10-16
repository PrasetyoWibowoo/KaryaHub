import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-helpers"
import { extractTextFromPDF, scoreResume, DEFAULT_KEYWORDS } from "@/lib/ats-engine"
import { ATSExtractError } from "@/types/ats"
import { logger } from "@/lib/logger"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    const { error, session } = await requireAuth()
    if (error) return error

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const keywordsRaw = formData.get("keywords") as string | null
    const jobDescription = formData.get("jobDescription") as string | null

    if (!file) {
      return fail("No file provided", 400)
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return fail("Only PDF files are accepted", 400)
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return fail("File size must be less than 5MB", 400)
    }

    // Extract text from PDF
    const buffer = await file.arrayBuffer()
    let resumeText: string
    try {
      resumeText = await extractTextFromPDF(buffer)
    } catch (err) {
      if (err instanceof ATSExtractError) {
        return fail(err.message, 422)
      }
      return fail("Failed to process PDF file", 500)
    }

    // Parse keywords
    let keywords: string[] = DEFAULT_KEYWORDS
    if (keywordsRaw) {
      try {
        keywords = JSON.parse(keywordsRaw)
      } catch {
        keywords = keywordsRaw.split(",").map((k) => k.trim()).filter(Boolean)
      }
    } else if (jobDescription) {
      // Extract basic keywords from job description
      const words = jobDescription.split(/\s+/)
      const unique = [...new Set(words.filter((w) => w.length > 3))]
      keywords = unique.slice(0, 20)
    }

    // Score the resume
    const result = scoreResume(resumeText, keywords)

    // Save to database
    const atsRecord = await prisma.resumes_ats.create({
      data: {
        fileUrl: `ats-scan-${Date.now()}.pdf`,
        atsScore: result.score,
        feedbackAnalysis: JSON.parse(JSON.stringify(result)),
        users: { connect: { id: session!.user.id } },
      },
    })

    logger.info("ATS scan completed", {
      userId: session!.user.id,
      score: result.score,
      recordId: atsRecord.id,
    })

    return ok({
      id: atsRecord.id,
      score: result.score,
      breakdown: result.breakdown,
      feedback: result.feedback,
      version: result.version,
    })
  } catch (err) {
    logger.error("POST /api/ats/scan failed", err)
    return fail("Internal server error", 500)
  }
}
