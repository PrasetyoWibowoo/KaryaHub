import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"

export async function GET(request: NextRequest) {
  try {
    const { session } = await requireAuth()
    const targetUserId = session?.user?.id

    if (!targetUserId) {
      return ok([
        {
          id: "notif-1",
          title: "Dana Escrow Diamankan",
          message: "Dana proyek Rp 5.000.000 telah diamankan di Rekening Bersama Midtrans.",
          link: "/freelancer/projects",
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        },
        {
          id: "notif-2",
          title: "Proposal Diterima!",
          message: "Toko Berkah Jaya telah menerima proposal Anda untuk proyek Desain Mobile App.",
          link: "/freelancer/my-proposals",
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
        },
        {
          id: "notif-3",
          title: "Hasil Scan ATS Siap",
          message: "Skor CV Anda mencapai 88% (Strong Match) dengan rekomendasi kata kunci baru.",
          link: "/freelancer/ats-checker",
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
        }
      ])
    }

    const notifs = await prisma.notifications.findMany({
      where: { userId: targetUserId },
      orderBy: { createdAt: "desc" }
    })

    return ok(notifs)
  } catch (err) {
    logger.error("Failed to fetch notifications", { err })
    return fail("Gagal memuat notifikasi", 500)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { session } = await requireAuth()
    const body = await request.json().catch(() => ({}))
    const { id, markAllRead } = body

    if (session?.user?.id) {
      if (markAllRead) {
        await prisma.notifications.updateMany({
          where: { userId: session.user.id },
          data: { isRead: true }
        })
      } else if (id) {
        await prisma.notifications.update({
          where: { id },
          data: { isRead: true }
        })
      }
    }

    return ok({ message: "Notifikasi diperbarui" })
  } catch (err) {
    logger.error("Failed to update notifications", { err })
    return fail("Gagal memperbarui notifikasi", 500)
  }
}
