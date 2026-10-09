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
        <PolarGrid stroke="#E4E4E7" />
        <PolarAngleAxis 
          dataKey="skill" 
          tick={{ fill: '#52525B', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]}
          tick={{ fill: '#52525B', fontSize: 10 }}
        />
        <Radar 
          name="Skill Level" 
          dataKey="value" 
          stroke="#27272A" 
          fill="#27272A" 
          fillOpacity={0.6} 
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #E4E4E7',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
