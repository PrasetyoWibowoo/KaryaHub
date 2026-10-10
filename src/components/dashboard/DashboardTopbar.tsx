"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, BriefcaseBusiness, FileCheck2, FileText, LayoutDashboard, MessageSquare, Search, Wallet, Users, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardTopbar() {
  const pathname = usePathname()
  const isUmkm = pathname.startsWith("/umkm")

  const tabs = isUmkm
    ? [
        { label: "Overview", href: "/umkm", icon: LayoutDashboard },
        { label: "Applicants", href: "/umkm/manage-jobs", icon: Users },
        { label: "Projects", href: "/umkm/manage-jobs", icon: BriefcaseBusiness },
        { label: "Escrow", href: "/umkm/escrow-status", icon: MessageSquare },
        { label: "Post Job", href: "/umkm/create-job", icon: PlusCircle },
      ]
    : [
        { label: "Overview", href: "/freelancer", icon: LayoutDashboard },
        { label: "Find Jobs", href: "/jobs", icon: BriefcaseBusiness },
        { label: "Proposals", href: "/freelancer/my-proposals", icon: FileText },
        { label: "ATS Checker", href: "/freelancer/ats-checker", icon: FileCheck2 },
        { label: "Wallet", href: "/freelancer/wallet", icon: Wallet },
      ]

  return (
    <header className="dashboard-topbar">
      <Link href="/" className="dashboard-topbar-brand">
        <span className="dashboard-topbar-mark">K</span>
        <span>KaryaHub</span>
      </Link>

      <nav aria-label="Workspace navigation" className="dashboard-tabs">
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (label === "Overview" && pathname === (isUmkm ? "/umkm" : "/freelancer"))

          return (
            <Link
              key={label}
              href={href}
              className={cn("dashboard-tab", active && "dashboard-tab-active")}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="dashboard-topbar-actions">
        <button type="button" className="dashboard-icon-button" aria-label="Search workspace">
          <Search className="h-4 w-4" aria-hidden="true" />
        </button>
        <button type="button" className="dashboard-icon-button" aria-label="View notifications">
          <Bell className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="dashboard-avatar" aria-label="Signed in user">JD</div>
      </div>
    </header>
  )
}
