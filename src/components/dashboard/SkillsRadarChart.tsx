"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"

interface SkillData {
  skill: string
  level: number
  jobs: number
}

interface SkillsRadarChartProps {
  data: SkillData[]
  height?: number
}

export function SkillsRadarChart({ data, height = 230 }: SkillsRadarChartProps) {
  const chartData = data.map(item => ({
    skill: item.skill,
    value: item.level,
  }))

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            stroke="#E5E7EB"
          />
          <Radar 
            name="Skill Level" 
            dataKey="value" 
            stroke="#4F46E5" 
            fill="#6366F1" 
            fillOpacity={0.3} 
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload
                return (
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-border shadow-card text-xs">
                    <p className="font-bold text-text-heading mb-1">{item.skill}</p>
                    <p className="text-text-muted flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
                      Tingkat Keahlian: <span className="font-semibold text-indigo-600">{item.value}%</span>
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
