"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Briefcase, Building2 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()

  // TODO: Replace with actual user role from auth context
  // For now, we'll show a role selection page
  const userRole = null // This should come from authentication

  useEffect(() => {
    // If user role is known, redirect to appropriate dashboard
    if (userRole === "freelancer") {
      router.push("/freelancer")
    } else if (userRole === "umkm") {
      router.push("/umkm")
    }
  }, [userRole, router])

  // Show role selection if no role is set
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="max-w-4xl w-full px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-main mb-4">
            Selamat Datang di KaryaHub
          </h1>
          <p className="text-lg text-text-muted">
            Pilih dashboard yang ingin Anda akses
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Freelancer Dashboard */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-3">
                Dashboard Freelancer
              </h2>
              <p className="text-text-muted mb-6">
                Kelola proposal, cari lowongan, dan pantau penghasilan Anda
              </p>
              <Button 
                className="w-full" 
                onClick={() => router.push("/freelancer")}
              >
                Masuk sebagai Freelancer
              </Button>
            </div>
          </Card>

          {/* UMKM Dashboard */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-3">
                Dashboard UMKM
              </h2>
              <p className="text-text-muted mb-6">
                Buat lowongan, kelola proyek, dan temukan talenta terbaik
              </p>
              <Button 
                variant="accent"
                className="w-full" 
                onClick={() => router.push("/umkm")}
              >
                Masuk sebagai UMKM
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            Belum punya akun?{" "}
            <a 
              href="/register" 
              className="text-primary hover:underline font-medium"
            >
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
