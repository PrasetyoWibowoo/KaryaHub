"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"

interface SkillData {
  skill: string
  level: number
  jobs: number
}

interface SkillsRadarChartProps {
  data: SkillData[]
}

export function SkillsRadarChart({ data }: SkillsRadarChartProps) {
  const chartData = data.map(item => ({
    skill: item.skill,
    value: item.level,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={chartData}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis 
          dataKey="skill" 
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]}
          tick={{ fill: '#64748b', fontSize: 10 }}
        />
        <Radar 
          name="Skill Level" 
          dataKey="value" 
          stroke="#6366f1" 
          fill="#6366f1" 
          fillOpacity={0.6} 
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
