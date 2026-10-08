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

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

export function SkillsBarChart({ data }: SkillsBarChartProps) {
  const chartData = data.map(item => ({
    skill: item.skill,
    jobs: item.jobs,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="skill" 
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <YAxis 
          tick={{ fill: '#64748b', fontSize: 12 }}
          label={{ value: 'Jobs', angle: -90, position: 'insideLeft', fill: '#64748b' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e2e8f0',
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
