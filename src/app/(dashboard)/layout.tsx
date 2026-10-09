import { ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/Sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="dashboard-main flex-1 flex flex-col min-h-screen">
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
