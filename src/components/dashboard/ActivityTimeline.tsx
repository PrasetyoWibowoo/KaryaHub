"use client"

import { CheckCircle2, Clock, Send } from "lucide-react"

interface Activity {
  type: "applied" | "accepted" | "submitted"
  title: string
  time: string
}

interface ActivityTimelineProps {
  activities: Activity[]
}

const configMap = {
  applied: {
    icon: Clock,
    badge: "Melamar",
    iconColor: "text-blue-600 bg-blue-50 border-blue-200",
    badgeStyle: "bg-blue-50 text-blue-700 border-blue-200",
  },
  accepted: {
    icon: CheckCircle2,
    badge: "Diterima",
    iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  submitted: {
    icon: Send,
    badge: "Diserahkan",
    iconColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
    badgeStyle: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (!activities || activities.length === 0) {
    return (
      <p className="text-sm text-text-muted py-4 text-center">Belum ada aktivitas terbaru.</p>
    )
  }

  return (
    <div className="relative space-y-4">
      {activities.map((activity, index) => {
        const itemConfig = configMap[activity.type] || configMap.applied
        const Icon = itemConfig.icon
        const isLast = index === activities.length - 1
        
        return (
          <div key={index} className="relative flex gap-3.5 group">
            {/* Timeline connector line */}
            {!isLast && (
              <span 
                className="absolute left-5 top-10 bottom-0 w-0.5 -ml-px bg-border group-hover:bg-border-strong transition-colors"
                aria-hidden="true" 
              />
            )}
            
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${itemConfig.iconColor}`}>
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <p className="text-sm font-semibold text-text-heading truncate group-hover:text-primary transition-colors">
                  {activity.title}
                </p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${itemConfig.badgeStyle}`}>
                  {itemConfig.badge}
                </span>
              </div>
              <p className="text-xs text-text-muted">
                {activity.time}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
