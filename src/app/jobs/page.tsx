"use client"

import { Sidebar } from "@/components/dashboard/Sidebar"
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar"
import { JobsExplorerView } from "@/components/jobs/JobsExplorerView"
import { Suspense } from "react"

export default function JobsPage() {
  return (
    <div className="dashboard-shell min-h-screen bg-background flex relative overflow-x-hidden">
      {/* Ambient glass chromatic underglows */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed -top-24 -left-20 w-96 h-96 rounded-full bg-indigo-500/12 blur-[100px] z-0" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed top-1/4 -right-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] z-0" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed -bottom-24 left-1/3 w-[32rem] h-[32rem] rounded-full bg-sky-500/08 blur-[130px] z-0" 
      />

      <Sidebar />
      <main className="dashboard-main flex-1 flex flex-col min-h-screen relative z-10">
        <DashboardTopbar />
        <div className="dashboard-page-content flex-1">
          <Suspense fallback={<div className="min-h-[24rem]" aria-busy="true" />}>
            <JobsExplorerView />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
