import { PrismaClient, Role, JobStatus, ProposalStatus, EscrowStatus, SubmissionStatus, DocumentType } from "../src/generated/prisma"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import * as bcrypt from "bcryptjs"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Starting KaryaHub Database Seeding...")

  // Clear existing data in reverse dependency order
  await prisma.messages.deleteMany()
  await prisma.chat_rooms.deleteMany()
  await prisma.reviews.deleteMany()
  await prisma.notifications.deleteMany()
  await prisma.escrow_transactions.deleteMany()
  await prisma.job_submissions.deleteMany()
  await prisma.proposals.deleteMany()
  await prisma.job_skills.deleteMany()
  await prisma.jobs.deleteMany()
  await prisma.user_skills.deleteMany()
  await prisma.skills.deleteMany()
  await prisma.resumes_ats.deleteMany()
  await prisma.portfolios.deleteMany()
  await prisma.user_documents.deleteMany()
  await prisma.profiles.deleteMany()
  await prisma.users.deleteMany()

  const passwordHash = await bcrypt.hash("password123", 10)

  // 1. Seed Users (Freelancers & UMKMs)
  const freelancerUser = await prisma.users.create({
    data: {
      email: "freelancer@karyahub.id",
      fullName: "John Doe",
      passwordHash,
      role: Role.FREELANCER,
      isVerified: true,
      profiles: {
        create: {
          phoneNumber: "081234567890",
          bio: "Full Stack Developer & UI/UX Specialist lulusan Vokasi Unggulan. Berfokus pada pengembangan aplikasi web modern, Next.js, TypeScript, dan antarmuka ramah pengguna bagi pelaku UMKM Indonesia.",
          location: "Yogyakarta, Indonesia",
          portfolioUrl: "https://johndoe-dev.vercel.app",
          cityCode: "YOG-01"
        }
      }
    }
  })

  const freelancerUser2 = await prisma.users.create({
    data: {
      email: "budi@karyahub.id",
      fullName: "Budi Pratama",
      passwordHash,
      role: Role.FREELANCER,
      isVerified: true,
      profiles: {
        create: {
          phoneNumber: "081298765432",
          bio: "Frontend Engineer & Mobile App Designer dengan pengalaman 3+ tahun membantu UMKM go-digital.",
          location: "Bandung, Indonesia",
          portfolioUrl: "https://budipratama.design",
          cityCode: "BDG-01"
        }
      }
    }
  })

  const umkmUser = await prisma.users.create({
    data: {
      email: "umkm@karyahub.id",
      fullName: "Hendra Wijaya",
      passwordHash,
      role: Role.UMKM,
      isVerified: true,
      profiles: {
        create: {
          companyName: "TechStartup Inc",
          phoneNumber: "082155566778",
          bio: "Inkubator bisnis UMKM retail & manufaktur lokal yang berfokus pada digitalisasi produk unggulan daerah.",
          location: "Jakarta Selatan, Indonesia",
          portfolioUrl: "https://techstartup.id",
          cityCode: "JKT-02"
        }
      }
    }
  })

  const umkmUser2 = await prisma.users.create({
    data: {
      email: "berkah@karyahub.id",
      fullName: "Hj. Siti Aminah",
      passwordHash,
      role: Role.UMKM,
      isVerified: true,
      profiles: {
        create: {
          companyName: "Toko Berkah Jaya",
          phoneNumber: "081377889900",
          bio: "Produsen fashion muslim dan hijab lokal ramah lingkungan dengan jangkauan pasar seluruh Indonesia.",
          location: "Surakarta, Jawa Tengah",
          portfolioUrl: "https://tokoberkahjaya.com",
          cityCode: "SOC-01"
        }
      }
    }
  })

  // 2. Seed Skills
  const skillNames = [
    "Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", 
    "UI/UX Design", "Figma", "REST API", "PostgreSQL", "Midtrans Payment", 
    "SEO Optimization", "Mobile Responsive", "Social Media Management"
  ]
  const skillMap: Record<string, string> = {}
  for (const name of skillNames) {
    const s = await prisma.skills.create({ data: { name } })
    skillMap[name] = s.id
  }

  // Connect Skills to Freelancer
  for (const skill of ["Next.js", "React", "TypeScript", "Tailwind CSS", "UI/UX Design", "Figma"]) {
    await prisma.user_skills.create({
      data: {
        userId: freelancerUser.id,
        skillId: skillMap[skill]
      }
    })
  }

  // 3. Seed Portfolios for Freelancer
  await prisma.portfolios.createMany({
    data: [
      {
        userId: freelancerUser.id,
        title: "Aplikasi Mobile E-Commerce Fashion Nusantara",
        description: "Redesain alur checkout dan katalog interaktif untuk UMKM fashion lokal, meningkatkan konversi pembelian sebesar 42%.",
        linkUrl: "https://github.com/example/fashion-app",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60",
        isVerified: true
      },
      {
        userId: freelancerUser.id,
        title: "Katalog Web Mebel Ekspor & Integrasi WhatsApp",
        description: "Website company profile responsif dengan katalog visual 3D dan sistem inquiry otomatis ke WhatsApp penjual.",
        linkUrl: "https://mebel-jati-mas.example.com",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60",
        isVerified: true
      },
      {
        userId: freelancerUser.id,
        title: "Sistem Point of Sale (POS) Kafe & Warung Kopi",
        description: "Aplikasi kasir ringan berbasis web dengan manajemen stok bahan baku dan laporan harian otomatis.",
        linkUrl: "https://pos-cafe.example.com",
        imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=60",
        isVerified: true
      }
    ]
  })

  // 4. Seed User Documents (CV & Cover Letter)
  await prisma.user_documents.createMany({
    data: [
      {
        userId: freelancerUser.id,
        title: "Resume_John_Doe_FullStack_2026.pdf",
        fileUrl: "https://karyahub.id/uploads/docs/Resume_John_Doe.pdf",
        type: DocumentType.CV
      },
      {
        userId: freelancerUser.id,
        title: "Standard_Cover_Letter_KaryaHub.pdf",
        fileUrl: "https://karyahub.id/uploads/docs/Cover_Letter_John.pdf",
        type: DocumentType.COVER_LETTER
      }
    ]
  })

  // 5. Seed Resumes ATS Scan
  await prisma.resumes_ats.create({
    data: {
      userId: freelancerUser.id,
      fileUrl: "https://karyahub.id/uploads/docs/Resume_John_Doe.pdf",
      atsScore: 88,
      feedbackAnalysis: {
        matchLevel: "Tinggi (Strong Match)",
        summary: "Resume terstruktur rapi, kata kunci teknis selaras dengan standar industri.",
        matchedKeywords: ["React", "TypeScript", "Tailwind CSS", "REST API", "Git", "Next.js"],
        missingKeywords: ["Next.js App Router", "State Management", "Web Vitals"]
      }
    }
  })

  // 6. Seed Jobs
  const job1 = await prisma.jobs.create({
    data: {
      employerId: umkmUser.id,
      title: "Desain UI/UX untuk Aplikasi Mobile Toko Online",
      description: "Kami membutuhkan desainer UI/UX untuk aplikasi mobile toko online retail fashion lokal. Pekerjaan mencakup user flow, wireframe, prototype interaktif Figma, dan asset handoff.",
      category: "UI/UX Design",
      budget: 5000000,
      estimatedHours: 40,
      status: JobStatus.IN_PROGRESS,
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
    }
  })

  const job2 = await prisma.jobs.create({
    data: {
      employerId: umkmUser2.id,
      title: "Website Company Profile untuk UMKM Furniture",
      description: "Pembuatan website katalog interaktif furniture ekspor dengan sistem inquiry WhatsApp dan integrasi Midtrans Sandbox.",
      category: "Web Development",
      budget: 8000000,
      estimatedHours: 60,
      status: JobStatus.OPEN,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    }
  })

  // Link skills to jobs
  for (const s of ["UI/UX Design", "Figma", "Mobile Responsive"]) {
    if (skillMap[s]) {
      await prisma.job_skills.create({ data: { jobId: job1.id, skillId: skillMap[s] } })
    }
  }
  for (const s of ["Next.js", "React", "Tailwind CSS", "SEO Optimization"]) {
    if (skillMap[s]) {
      await prisma.job_skills.create({ data: { jobId: job2.id, skillId: skillMap[s] } })
    }
  }

  // 7. Seed Proposal & Escrow Transaction for Job 1
  const proposal1 = await prisma.proposals.create({
    data: {
      jobId: job1.id,
      freelancerId: freelancerUser.id,
      coverLetter: "Halo TechStartup Inc, saya memiliki pengalaman 3+ tahun mendesain UI/UX e-commerce retail dengan konversi tinggi. Saya siap menyelesaikan milestone tepat waktu.",
      bidAmount: 5000000,
      estimatedDays: 14,
      status: ProposalStatus.ACCEPTED
    }
  })

  await prisma.escrow_transactions.create({
    data: {
      jobId: job1.id,
      proposalId: proposal1.id,
      employerId: umkmUser.id,
      freelancerId: freelancerUser.id,
      amount: 5000000,
      midtransOrderId: "ESC-20261016-001",
      midtransSnapToken: "snap-token-demo-12345",
      paymentStatus: EscrowStatus.HELD_IN_ESCROW,
      paidAt: new Date()
    }
  })

  // 8. Seed Job Submission
  await prisma.job_submissions.create({
    data: {
      jobId: job1.id,
      freelancerId: freelancerUser.id,
      submissionUrl: "https://figma.com/@karyahub/prototype-store",
      notes: "Berikut hasil wireframe dan prototype interaktif halaman checkout mobile toko online.",
      status: SubmissionStatus.PENDING_REVIEW
    }
  })

  // 9. Seed Reviews
  await prisma.reviews.create({
    data: {
      jobId: job1.id,
      reviewerId: umkmUser.id,
      revieweeId: freelancerUser.id,
      rating: 5,
      comment: "Komunikasi sangat responsif, hasil desain melampaui ekspektasi kami. Sangat direkomendasikan untuk UMKM!"
    }
  })

  // 10. Seed Notifications
  await prisma.notifications.createMany({
    data: [
      {
        userId: freelancerUser.id,
        title: "Dana Escrow Diamankan",
        message: "Dana proyek Rp 5.000.000 telah diamankan di Rekening Bersama Midtrans.",
        link: "/freelancer/projects"
      },
      {
        userId: freelancerUser.id,
        title: "Proposal Diterima",
        message: "TechStartup Inc menerima proposal Anda untuk proyek Desain UI/UX Mobile.",
        link: "/freelancer/projects"
      },
      {
        userId: umkmUser.id,
        title: "Hasil Kerja Dikirim",
        message: "John Doe telah mengirimkan deliverable milestone 1 untuk ditinjau.",
        link: "/umkm/manage-jobs"
      }
    ]
  })

  // 11. Seed Chat Room and Messages
  const chatRoom = await prisma.chat_rooms.create({
    data: {
      jobId: job1.id,
      employerId: umkmUser.id,
      freelancerId: freelancerUser.id
    }
  })

  await prisma.messages.createMany({
    data: [
      {
        chatRoomId: chatRoom.id,
        senderId: umkmUser.id,
        content: "Halo John! Terima kasih sudah bersedia mengerjakan proyek ini.",
        isRead: true
      },
      {
        chatRoomId: chatRoom.id,
        senderId: freelancerUser.id,
        content: "Sama-sama Pak Hendra. Saya sedang menyelesaikan user flow pertama.",
        isRead: true
      }
    ]
  })

  console.log("✅ KaryaHub Database Seeding Completed Successfully!")
}

main()
  .catch((e) => {
    console.error("Seeding error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
