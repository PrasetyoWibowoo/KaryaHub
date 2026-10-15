"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Suspense, useEffect, useState, type FormEvent } from "react"
import { 
  Bell, 
  LayoutDashboard, 
  MessageSquare, 
  Search, 
  ArrowRightLeft, 
  ShieldCheck, 
  ChevronRight,
  X,
  Briefcase,
  Wallet,
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
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false)
        setIsNotificationsOpen(false)
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

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

  const isPrimaryTab =
    pathname === "/freelancer" ||
    pathname === "/freelancer/projects" ||
    pathname === "/freelancer/wallet" ||
    pathname === "/umkm" ||
    pathname === "/umkm/manage-jobs" ||
    pathname === "/umkm/escrow-status"

  const handleToggle = () => {
    router.push(isFreelancer ? "/umkm" : "/freelancer")
  }

  const inboxHref = isUmkm ? "/umkm?tab=inbox" : "/freelancer?tab=inbox"
  const searchTarget = isUmkm ? "/umkm/manage-jobs" : "/jobs"
  const quickSearchItems = isUmkm
    ? [
        { label: "Kelola proyek & pelamar", href: "/umkm/manage-jobs" },
        { label: "Posting proyek baru", href: "/umkm/create-job" },
        { label: "Pantau escrow", href: "/umkm/escrow-status" },
      ]
    : [
        { label: "Cari proyek baru", href: "/jobs" },
        { label: "Proposal saya", href: "/freelancer/my-proposals" },
        { label: "Scan CV dengan ATS", href: "/freelancer/ats-checker" },
      ]
  const notifications = isUmkm
    ? [
        { title: "Proposal baru masuk", detail: "2 talenta mengajukan proposal untuk proyek aktif.", time: "12 menit lalu" },
        { title: "Milestone siap ditinjau", detail: "John Doe mengirim deliverable terbaru.", time: "1 jam lalu" },
      ]
    : [
        { title: "Proposal diterima", detail: "Toko Berkah Jaya mengundang Anda ke tahap berikutnya.", time: "18 menit lalu" },
        { title: "Escrow diperbarui", detail: "Dana proyek Website Furniture sudah diamankan.", time: "2 jam lalu" },
      ]

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    router.push(`${searchTarget}?q=${encodeURIComponent(query)}`)
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  return (
    <header className="dashboard-topbar relative">
      {/* Left: Role indicator badge, Escrow status, and subpage context */}
      <div className="flex-1 flex items-center justify-start gap-2.5 min-w-0">
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

        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Escrow Aktif</span>
        </div>

        {!isPrimaryTab && subpageInfo && (
          <div className="hidden 2xl:flex items-center gap-1.5 text-xs text-slate-400 font-semibold truncate max-w-[140px]">
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-300" />
            <span className="text-slate-800 font-bold truncate">
              {subpageInfo.title}
            </span>
          </div>
        )}
      </div>

      {/* Center: The Floating 3-Button Navbar strictly centered */}
      <div className="hidden md:flex items-center justify-center shrink-0 px-2 pointer-events-auto">
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
                    stiffness: 200,
                    damping: 25,
                    mass: 0.85,
                  }}
                />
              )}
              <Icon 
                className={cn(
                  "h-3.5 w-3.5 shrink-0 transition-colors duration-300 group-hover:scale-110 relative z-10",
                  isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-900"
                )} 
                aria-hidden="true" 
              />
              <span className="hidden xl:inline relative z-10 transition-colors duration-300">{label}</span>
              <span className="xl:hidden relative z-10 transition-colors duration-300">{label.replace(" Saya", "").replace(" & Progress", "").replace(" Talenta", "").replace(" Bisnis", "")}</span>
              {isActive && (
                <motion.span 
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5 relative z-10 shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{
                    scale: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
                    opacity: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
                    default: { duration: 0.35, ease: "easeOut" }
                  }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right: Actions, Demo Switch, Messages & User Menu */}
      <div className="flex-1 flex items-center justify-end min-w-0">
        <div className="dashboard-topbar-actions shrink-0">

        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 shadow-xs transition-all hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950 hover:shadow-sm active:scale-[0.98]"
          title="Beralih peran demo secara instan"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">
            {isFreelancer ? "Ke Mode UMKM" : "Ke Mode Freelancer"}
          </span>
          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
            Demo
          </span>
        </button>

        {/* Quick Messages */}
        <div>
          <Link
            href={inboxHref}
            className="dashboard-icon-button relative transition-transform hover:scale-105 active:scale-95"
            aria-label="Buka Chat & Diskusi"
            title="Buka Pusat Pesan & Diskusi"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsSearchOpen(true)
            setIsNotificationsOpen(false)
          }}
          className="dashboard-icon-button transition-transform hover:scale-105 active:scale-95"
          aria-label="Search workspace"
          aria-expanded={isSearchOpen}
        >
          <Search className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            setIsNotificationsOpen((open) => !open)
            setIsSearchOpen(false)
          }}
          className="dashboard-icon-button relative transition-transform hover:scale-105 active:scale-95"
          aria-label="View notifications"
          aria-expanded={isNotificationsOpen}
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {hasUnreadNotifications && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500" />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsProfileOpen((open) => !open)
            setIsSearchOpen(false)
            setIsNotificationsOpen(false)
          }}
          className="dashboard-avatar ring-2 ring-white/80 shadow-xs transition-transform hover:scale-105 active:scale-95"
          aria-label="Signed in user"
          aria-expanded={isProfileOpen}
          title={isUmkm ? "TechStartup Inc (UMKM)" : "John Doe (Freelancer)"}
        >
          {isUmkm ? "TS" : "JD"}
        </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/20 px-4 pt-20 backdrop-blur-[2px]" onMouseDown={() => setIsSearchOpen(false)}>
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Cari di workspace"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <form onSubmit={submitSearch} className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
              <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <input
                autoFocus
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={isUmkm ? "Cari proyek, pelamar, atau status..." : "Cari proyek, skill, atau kategori..."}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button type="button" onClick={() => setIsSearchOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Tutup pencarian">
                <X className="h-4 w-4" />
              </button>
            </form>
            <div className="p-2">
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Akses cepat</p>
              {quickSearchItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => {
                    router.push(item.href)
                    setIsSearchOpen(false)
                  }}
                  className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
                >
                  <ArrowRightLeft className="mr-2.5 h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isNotificationsOpen && (
        <div className="absolute right-4 top-[calc(100%+0.5rem)] z-40 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl" role="dialog" aria-label="Notifikasi">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <p className="text-sm font-bold text-slate-950">Notifikasi</p>
              <p className="text-[11px] text-slate-500">Update penting dari workspace Anda</p>
            </div>
            <button type="button" onClick={() => setHasUnreadNotifications(false)} className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800">
              Tandai dibaca
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {notifications.map((notification) => (
              <button key={notification.title} type="button" onClick={() => setIsNotificationsOpen(false)} className="block w-full px-4 py-3 text-left transition-colors hover:bg-slate-50">
                <div className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  <span className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900">{notification.title}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{notification.detail}</span>
                    <span className="mt-1.5 block text-[10px] font-semibold text-slate-400">{notification.time}</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isProfileOpen && (
        <div className="absolute right-4 top-[calc(100%+0.5rem)] z-40 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl" role="menu" aria-label="Menu profil">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-slate-950">{isUmkm ? "TechStartup Inc" : "John Doe"}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">{isUmkm ? "Mitra UMKM Terverifikasi" : "Full Stack & UI/UX Specialist"}</p>
          </div>
          <div className="p-2">
            <Link href={isUmkm ? "/umkm" : "/freelancer"} onClick={() => setIsProfileOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950">
              Ringkasan workspace
            </Link>
            <Link href={isUmkm ? "/umkm?tab=clients" : "/freelancer?tab=clients"} onClick={() => setIsProfileOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950">
              Profil & relasi
            </Link>
            <button type="button" onClick={() => setIsProfileOpen(false)} className="mt-1 w-full rounded-xl border-t border-slate-100 px-3 py-2.5 text-left text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800">
              Tutup menu
            </button>
          </div>
        </div>
      )}
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
