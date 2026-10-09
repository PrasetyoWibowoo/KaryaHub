"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface SkillData {
  skill: string
  level: number
  jobs: number
}

interface SkillsBarChartProps {
  data: SkillData[]
}

const COLORS = ['#27272A', '#15803D', '#71717A', '#A1A1AA', '#166534']

export function SkillsBarChart({ data }: SkillsBarChartProps) {
  const chartData = data.map(item => ({
    skill: item.skill,
    jobs: item.jobs,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
        <XAxis 
          dataKey="skill" 
          tick={{ fill: '#52525B', fontSize: 12 }}
        />
        <YAxis 
          tick={{ fill: '#52525B', fontSize: 12 }}
          label={{ value: 'Jobs', angle: -90, position: 'insideLeft', fill: '#52525B' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #E4E4E7',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        />
        <Bar dataKey="jobs" radius={[8, 8, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
