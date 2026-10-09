"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Search, 
  FileCheck2, 
  FileText, 
  Wallet, 
  PlusCircle, 
  Briefcase, 
  ShieldCheck, 
  LogOut,
  LayoutDashboard
} from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const freelancerLinks = [
    { name: "Dashboard", href: "/freelancer", icon: LayoutDashboard },
    { name: "Cari Lowongan", href: "/jobs", icon: Search },
    { name: "ATS Checker", href: "/freelancer/ats-checker", icon: FileCheck2 },
    { name: "Proposal Saya", href: "/freelancer/my-proposals", icon: FileText },
    { name: "Dompet", href: "/freelancer/wallet", icon: Wallet },
  ]

  const umkmLinks = [
    { name: "Dashboard", href: "/umkm", icon: LayoutDashboard },
    { name: "Buat Lowongan", href: "/umkm/create-job", icon: PlusCircle },
    { name: "Kelola Proyek", href: "/umkm/manage-jobs", icon: Briefcase },
    { name: "Status Escrow", href: "/umkm/escrow-status", icon: ShieldCheck },
  ]

  return (
    <aside className="dashboard-sidebar fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border flex flex-col">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-bold text-text-main tracking-tight">KaryaHub</span>
          <span className="w-2 h-2 rounded-full bg-primary mt-1"></span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-8 px-4">
        {/* Freelancer Menu */}
        <div>
          <h3 className="px-2 text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Menu Freelancer
          </h3>
          <nav className="space-y-1">
            {freelancerLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-text-muted hover:bg-surface/50 hover:text-text-main"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* UMKM Menu */}
        <div>
          <h3 className="px-2 text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Menu UMKM
          </h3>
          <nav className="space-y-1">
            {umkmLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-text-muted hover:bg-surface/50 hover:text-text-main"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Logout Area */}
      <div className="p-4 border-t border-border">
        <button
          onClick={async () => {
            const { signOut } = await import("next-auth/react")
            await signOut({ callbackUrl: "/" })
          }}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:bg-surface/50 hover:text-text-main transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
