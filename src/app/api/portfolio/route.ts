import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    if (userId) {
      const portfolios = await prisma.portfolios.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
      })
      return ok(portfolios)
    }

    const { session } = await requireAuth()
    const targetUserId = session?.user?.id

    if (!targetUserId) {
      return ok([
        {
          id: "p1",
          title: "Aplikasi Mobile E-Commerce Fashion Nusantara",
          description: "Redesain alur checkout dan katalog interaktif untuk UMKM fashion lokal, meningkatkan konversi pembelian sebesar 42%.",
          linkUrl: "https://github.com/example/fashion-app",
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60",
          isVerified: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "p2",
          title: "Katalog Web Mebel Ekspor & Integrasi WhatsApp",
          description: "Website company profile responsif dengan katalog visual 3D dan sistem inquiry otomatis ke WhatsApp penjual.",
          linkUrl: "https://mebel-jati-mas.example.com",
          imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60",
          isVerified: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "p3",
          title: "Sistem Point of Sale (POS) Kafe & Warung Kopi",
          description: "Aplikasi kasir ringan berbasis web dengan manajemen stok bahan baku dan laporan harian otomatis.",
          linkUrl: "https://pos-cafe.example.com",
          imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=60",
          isVerified: true,
          createdAt: new Date().toISOString()
        }
      ])
    }

    const portfolios = await prisma.portfolios.findMany({
      where: { userId: targetUserId },
      orderBy: { createdAt: "desc" }
    })

    return ok(portfolios)
  } catch (err) {
    logger.error("Failed to fetch portfolios", { err })
    return fail("Gagal memuat portofolio", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error, session } = await requireAuth()
    const body = await request.json()
    const { title, description, linkUrl, imageUrl } = body

    if (!title) {
      return fail("Judul portofolio wajib diisi", 400)
    }

    if (error || !session?.user?.id) {
      // Demo response
      const newPortfolio = {
        id: `p-${Date.now()}`,
        title,
        description,
        linkUrl,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
        isVerified: true,
        createdAt: new Date().toISOString()
      }
      return ok(newPortfolio, 201)
    }

    const created = await prisma.portfolios.create({
      data: {
        userId: session.user.id,
        title,
        description,
        linkUrl,
        imageUrl,
        isVerified: true
      }
    })

    return ok(created, 201)
  } catch (err) {
    logger.error("Failed to create portfolio", { err })
    return fail("Gagal menambahkan portofolio", 500)
  }
}
