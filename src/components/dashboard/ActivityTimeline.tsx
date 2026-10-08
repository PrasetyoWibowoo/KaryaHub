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

const iconMap = {
  applied: Clock,
  accepted: CheckCircle2,
  submitted: Send,
}

const colorMap = {
  applied: "text-accent bg-accent/10",
  accepted: "text-success bg-success/10",
  submitted: "text-primary bg-primary/10",
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = iconMap[activity.type]
        const colors = colorMap[activity.type]
        
        return (
          <div key={index} className="flex gap-4">
            <div className={`w-10 h-10 rounded-full ${colors} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-heading truncate">
                {activity.title}
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                {activity.time}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
