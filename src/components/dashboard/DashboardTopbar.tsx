"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Suspense } from "react"
import { 
  Bell, 
  LayoutDashboard, 
  MessageSquare, 
  Search, 
  ArrowRightLeft, 
  ShieldCheck, 
  ChevronRight,
  Briefcase,
  Wallet,
  FileText,
  Building2,
  Sparkles
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const routeTitles: Record<string, { title: string; section: string }> = {
  "/freelancer": { title: "Ikhtisar Talenta", section: "Freelancer" },
  "/freelancer/projects": { title: "Proyek & Progress", section: "Freelancer" },
  "/jobs": { title: "Katalog Proyek UMKM", section: "Freelancer" },
  "/freelancer/ats-checker": { title: "AI ATS Evaluator", section: "Freelancer" },
  "/freelancer/my-proposals": { title: "Proposal Saya", section: "Freelancer" },
  "/freelancer/wallet": { title: "Dompet & Escrow", section: "Freelancer" },
  "/freelancer/wallet/withdraw": { title: "Tarik Dana ke Bank", section: "Freelancer" },
  "/umkm": { title: "Ikhtisar Bisnis", section: "UMKM" },
  "/umkm/create-job": { title: "Posting Proyek Baru", section: "UMKM" },
  "/umkm/manage-jobs": { title: "Kelola Proyek & Pelamar", section: "UMKM" },
  "/umkm/escrow-status": { title: "Rekening Bersama Escrow", section: "UMKM" },
  "/umkm/payment": { title: "Pembayaran Escrow Midtrans", section: "UMKM" },
}

function TopbarContent() {
  const pathname = usePathname()
  const router = useRouter()

  const isUmkm = pathname.startsWith("/umkm")
  const isFreelancer = pathname.startsWith("/freelancer") || pathname.startsWith("/jobs")

  // Role-specific distinct 3-button navigation
  const umkmNavItems = [
    {
      label: "Dasbor Bisnis",
      href: "/umkm",
      icon: LayoutDashboard,
      isActive: pathname === "/umkm",
    },
    {
      label: "Kelola Proyek",
      href: "/umkm/manage-jobs",
      icon: Briefcase,
      isActive: pathname.startsWith("/umkm/manage-jobs") || pathname === "/umkm/create-job",
    },
    {
      label: "Rekening Escrow",
      href: "/umkm/escrow-status",
      icon: ShieldCheck,
      isActive: pathname.startsWith("/umkm/escrow-status") || pathname.startsWith("/umkm/payment"),
    },
  ]

  const freelancerNavItems = [
    {
      label: "Workspace Talenta",
      href: "/freelancer",
      icon: LayoutDashboard,
      isActive: pathname === "/freelancer",
    },
    {
      label: "Proyek & Progress",
      href: "/freelancer/projects",
      icon: Briefcase,
      isActive: pathname.startsWith("/freelancer/projects"),
    },
    {
      label: "Dompet & Escrow",
      href: "/freelancer/wallet",
      icon: Wallet,
      isActive: pathname.startsWith("/freelancer/wallet"),
    },
  ]

  const navItems = isUmkm ? umkmNavItems : freelancerNavItems

  let subpageInfo = routeTitles[pathname]
  if (!subpageInfo) {
    if (pathname.startsWith("/umkm/manage-jobs/")) {
      subpageInfo = { title: "Detail Proyek & Pelamar", section: "UMKM" }
    } else if (pathname.startsWith("/umkm/escrow-status/pay/")) {
      subpageInfo = { title: "Pembayaran Escrow Midtrans", section: "UMKM" }
    } else if (pathname.startsWith("/umkm/escrow-status/release/")) {
      subpageInfo = { title: "Pencairan Dana Escrow", section: "UMKM" }
    } else if (pathname.startsWith("/freelancer/projects")) {
      subpageInfo = { title: "Proyek & Progress", section: "Freelancer" }
    } else if (pathname.startsWith("/freelancer/my-proposals")) {
      subpageInfo = { title: "Proposal Saya", section: "Freelancer" }
    } else if (pathname.startsWith("/jobs/")) {
      subpageInfo = { title: "Detail Proyek & Proposal", section: "Freelancer" }
    } else if (pathname.startsWith("/freelancer/wallet/withdraw")) {
      subpageInfo = { title: "Tarik Saldo ke Rekening", section: "Freelancer" }
    } else if (pathname.startsWith("/freelancer")) {
      subpageInfo = { title: "Workspace Freelancer", section: "Freelancer" }
    } else if (pathname.startsWith("/umkm")) {
      subpageInfo = { title: "Workspace UMKM", section: "UMKM" }
    }
  }

  const handleToggle = () => {
    router.push(isFreelancer ? "/umkm" : "/freelancer")
  }

  const inboxHref = isUmkm ? "/umkm?tab=inbox" : "/freelancer?tab=inbox"

  return (
    <header className="dashboard-topbar">
      {/* Left: Role indicator badge and subpage context */}
      <div className="flex items-center gap-2 min-w-0 shrink-0">
        <div className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shrink-0 shadow-xs",
          isUmkm 
            ? "bg-emerald-500/10 text-emerald-800 border-emerald-500/25" 
            : "bg-indigo-500/10 text-indigo-800 border-indigo-500/25"
        )}>
          {isUmkm ? (
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          )}
          <span className="hidden sm:inline font-bold">
            {isUmkm ? "UMKM Workspace" : "Freelancer Workspace"}
          </span>
        </div>

        {subpageInfo && pathname !== "/umkm" && pathname !== "/freelancer" && (
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 font-semibold truncate max-w-[130px] 2xl:max-w-xs">
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-300" />
            <span className="text-slate-800 font-bold truncate">
              {subpageInfo.title}
            </span>
          </div>
        )}
      </div>

      {/* Center: The Floating 3-Button Navbar with Bouncy Sliding Pill */}
      <div className="hidden md:flex items-center justify-center flex-1 px-3 min-w-0 pointer-events-auto">
        <nav aria-label="Dashboard Primary Navigation" className="dashboard-floating-nav max-w-fit relative">
          {navItems.map(({ label, href, icon: Icon, isActive }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                "dashboard-floating-tab group relative z-0",
                isActive && "dashboard-floating-tab-active text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="topbarFloatingActivePill"
                  className="absolute inset-0 rounded-full bg-slate-950 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.35)] -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 27,
                    mass: 0.8,
                  }}
                />
              )}
              <Icon 
                className={cn(
                  "h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:scale-110 relative z-10",
                  isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-900"
                )} 
                aria-hidden="true" 
              />
              <span className="hidden xl:inline relative z-10">{label}</span>
              <span className="xl:hidden relative z-10">{label.replace(" Saya", "").replace(" & Progress", "").replace(" Talenta", "").replace(" Bisnis", "")}</span>
              {isActive && (
                <motion.span 
                  layoutId="topbarActiveDot"
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5 relative z-10"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right: Actions, Demo Switch, Messages & User Menu */}
      <div className="dashboard-topbar-actions shrink-0">
        <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Escrow Aktif</span>
        </div>

        <motion.button
          type="button"
          onClick={handleToggle}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm"
          title="Beralih peran demo secara instan"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">
            {isFreelancer ? "Ke Mode UMKM" : "Ke Mode Freelancer"}
          </span>
          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
            Demo
          </span>
        </motion.button>

        {/* Quick Messages */}
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
          <Link
            href={inboxHref}
            className="dashboard-icon-button relative"
            aria-label="Buka Chat & Diskusi"
            title="Buka Pusat Pesan & Diskusi"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500" />
          </Link>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.06 }} 
          whileTap={{ scale: 0.94 }}
          type="button" 
          className="dashboard-icon-button" 
          aria-label="Search workspace"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.06 }} 
          whileTap={{ scale: 0.94 }}
          type="button" 
          className="dashboard-icon-button relative" 
          aria-label="View notifications"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500" />
        </motion.button>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="dashboard-avatar ring-2 ring-white/80 shadow-xs cursor-pointer" 
          aria-label="Signed in user"
          title={isUmkm ? "TechStartup Inc (UMKM)" : "John Doe (Freelancer)"}
        >
          {isUmkm ? "TS" : "JD"}
        </motion.div>
      </div>
    </header>
  )
}

export function DashboardTopbar() {
  return (
    <Suspense fallback={null}>
      <TopbarContent />
    </Suspense>
  )
}

