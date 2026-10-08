import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import type { Role } from "@prisma/client"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, phone, role, ...additionalData } = body

    // Validate required fields
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user with profile
    const user = await prisma.users.create({
      data: {
        email,
        passwordHash,
        fullName: name,
        role: role.toUpperCase() as Role,
        profiles: {
          create: {
            phoneNumber: phone,
            bio: additionalData.bio || additionalData.description,
            companyName: additionalData.companyName,
            portfolioUrl: additionalData.portfolio || additionalData.website
          }
        }
      },
      include: {
        profiles: true
      }
    })

    // Handle skills for freelancers
    if (role === "freelancer" && additionalData.skills?.length > 0) {
      for (const skillName of additionalData.skills) {
        // Find or create skill
        const skill = await prisma.skills.upsert({
          where: { name: skillName },
          update: {},
          create: { name: skillName }
        })

        // Link skill to user
        await prisma.user_skills.create({
          data: {
            userId: user.id,
            skillId: skill.id
          }
        })
      }
    }

    return NextResponse.json(
      { 
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    )
  }
}
