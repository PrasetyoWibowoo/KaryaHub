import { ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-shell min-h-screen bg-background flex">
      <Sidebar />
      <main className="dashboard-main flex-1 flex flex-col min-h-screen">
        <DashboardTopbar />
        <div className="dashboard-page-content p-8 pt-6 flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
