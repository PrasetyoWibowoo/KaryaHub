import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { DocumentType } from "@/generated/prisma"

export async function GET(request: NextRequest) {
  try {
    const { session } = await requireAuth()
    const targetUserId = session?.user?.id

    if (!targetUserId) {
      return ok([
        {
          id: "doc-1",
          title: "Resume_John_Doe_FullStack_2026.pdf",
          fileUrl: "/sample-cv.pdf",
          type: "CV",
          createdAt: new Date().toISOString()
        },
        {
          id: "doc-2",
          title: "Standard_Cover_Letter_KaryaHub.pdf",
          fileUrl: "/sample-cover-letter.pdf",
          type: "COVER_LETTER",
          createdAt: new Date().toISOString()
        }
      ])
    }

    const docs = await prisma.user_documents.findMany({
      where: { userId: targetUserId },
      orderBy: { createdAt: "desc" }
    })

    return ok(docs)
  } catch (err) {
    logger.error("Failed to fetch documents", { err })
    return fail("Gagal memuat dokumen", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error, session } = await requireAuth()
    const body = await request.json()
    const { title, fileUrl, type } = body

    if (!title || !fileUrl) {
      return fail("Judul dan file URL wajib diisi", 400)
    }

    if (error || !session?.user?.id) {
      return ok({
        id: `doc-${Date.now()}`,
        title,
        fileUrl,
        type: type || "CV",
        createdAt: new Date().toISOString()
      }, 201)
    }

    const doc = await prisma.user_documents.create({
      data: {
        userId: session.user.id,
        title,
        fileUrl,
        type: type === "CV" ? DocumentType.CV : type === "COVER_LETTER" ? DocumentType.COVER_LETTER : DocumentType.OTHER
      }
    })

    return ok(doc, 201)
  } catch (err) {
    logger.error("Failed to create document", { err })
    return fail("Gagal menyimpan dokumen", 500)
  }
}
