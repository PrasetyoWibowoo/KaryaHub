"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  Search,
  FileCheck2,
  FileText,
  Wallet,
  PlusCircle,
  Briefcase,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  ArrowRightLeft,
  Building2,
  UserCheck2
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const isFreelancerRoute = pathname.startsWith("/freelancer") || pathname === "/freelancer" || pathname.startsWith("/jobs")
  const isUmkmRoute = pathname.startsWith("/umkm") || pathname === "/umkm"

  // Derive user info from session with fallback to demo data
  const userName = session?.user?.name || (isFreelancerRoute ? "John Doe" : "TechStartup Inc")
  const userInitials = userName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
  const userRoleLabel = isFreelancerRoute ? "Talenta Vokasi" : "Mitra UMKM"

  const freelancerLinks = [
    { name: "Ringkasan", href: "/freelancer", icon: LayoutDashboard, badge: null },
    { name: "Proyek & Progress", href: "/freelancer/projects", icon: Briefcase, badge: "2 Aktif" },
    { name: "Cari Proyek", href: "/jobs", icon: Search, badge: "Katalog" },
    { name: "AI ATS Checker", href: "/freelancer/ats-checker", icon: FileCheck2, badge: "AI" },
    { name: "Proposal Saya", href: "/freelancer/my-proposals", icon: FileText, badge: null },
    { name: "Dompet & Escrow", href: "/freelancer/wallet", icon: Wallet, badge: "Safe" },
    { name: "Profil & Portofolio", href: "/freelancer/profile", icon: UserCheck2, badge: "SDG 8" },
  ]

  const umkmLinks = [
    { name: "Ringkasan Bisnis", href: "/umkm", icon: LayoutDashboard, badge: null },
    { name: "Posting Proyek", href: "/umkm/create-job", icon: PlusCircle, badge: "Cepat" },
    { name: "Kelola Proyek", href: "/umkm/manage-jobs", icon: Briefcase, badge: null },
    { name: "Status Escrow", href: "/umkm/escrow-status", icon: ShieldCheck, badge: "Midtrans" },
    { name: "Profil Usaha", href: "/umkm/profile", icon: Building2, badge: "Mitra" },
  ]

  return (
    <aside className="dashboard-sidebar">
      {/* Brand Header */}
      <div className="h-[4.25rem] flex items-center justify-between px-5 border-b border-white/60 bg-white/40">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold font-display shadow-sm group-hover:scale-105 transition-transform">
            K
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-950 tracking-tight font-display flex items-center gap-1.5">
              KaryaHub
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
              SDG 8 • Decent Work
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4 px-3.5">
        {/* Role Quick Switcher Tile */}
        <div className="p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] ring-1 ring-slate-900/[0.04]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Peran Aktif
            </span>
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border",
              isFreelancerRoute
                ? "bg-indigo-50/80 text-indigo-700 border-indigo-200/80"
                : "bg-emerald-50/80 text-emerald-700 border-emerald-200/80"
            )}>
              {isFreelancerRoute ? <UserCheck2 className="w-2.5 h-2.5" /> : <Building2 className="w-2.5 h-2.5" />}
              {isFreelancerRoute ? "Freelancer" : "Mitra UMKM"}
            </span>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(isFreelancerRoute ? "/umkm" : "/freelancer")}
            className="w-full h-8 px-2.5 rounded-xl bg-slate-900/5 hover:bg-slate-900/10 text-slate-700 hover:text-slate-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-slate-900/5"
            title="Ganti peran akun tanpa registrasi ulang"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>Beralih ke {isFreelancerRoute ? "Mode UMKM" : "Mode Freelancer"}</span>
          </motion.button>
        </div>
        {/* Navigation Section */}
        <div>
          <div className="px-2.5 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isFreelancerRoute ? "Menu Freelancer" : "Menu UMKM"}
            </span>
            <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {isFreelancerRoute ? "Talenta" : "Bisnis"}
            </span>
          </div>

          <nav className="space-y-1">
            {(isFreelancerRoute ? freelancerLinks : umkmLinks).map((link) => {
              const Icon = link.icon
              const isActive = link.href === "/umkm" || link.href === "/freelancer"
                ? pathname === link.href
                : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-200 group relative z-0",
                    isActive
                      ? "text-white font-bold"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/70"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="dashboardSidebarActiveIndicator"
                      className="absolute inset-0 rounded-xl bg-slate-950 shadow-md shadow-slate-950/15 -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                      }}
                    />
                  )}
                  <div className="flex items-center gap-2.5 min-w-0 relative z-10">
                    <Icon className={cn(
                      "w-4 h-4 shrink-0 transition-transform group-hover:scale-110",
                      isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-700"
                    )} />
                    <span className="truncate">{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className={cn(
                      "text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider relative z-10",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    )}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Escrow Trust Micro Card */}
        <div className="mt-auto p-3 rounded-2xl bg-emerald-500/08 border border-emerald-500/20 text-emerald-950">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold">Escrow Terproteksi</span>
          </div>
          <p className="text-[11px] text-emerald-800/80 leading-snug">
            Transaksi aman via Midtrans Sandbox dengan jaminan perlindungan dana kerja.
          </p>
        </div>
      </div>

      {/* User Card & Logout */}
      <div className="p-3.5 border-t border-white/70 bg-white/50 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <Link
            href={isFreelancerRoute ? "/freelancer/profile" : "/umkm/profile"}
            className="flex items-center gap-2.5 min-w-0 group hover:opacity-85 transition-opacity"
            title="Buka Profil Saya"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              {userInitials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-950 truncate group-hover:text-indigo-600 transition-colors">
                {userName}
              </p>
              <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                <span>{userRoleLabel}</span>
                <span className="text-[9px] text-indigo-500 font-bold">• Profil</span>
              </p>
            </div>
          </Link>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={async () => {
              const { signOut } = await import("next-auth/react")
              await signOut({ callbackUrl: "/" })
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Keluar"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </aside>
  )
}
