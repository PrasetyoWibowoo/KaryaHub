"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface SkillData {
  skill: string
  level: number
  jobs: number
}

interface SkillsBarChartProps {
  data: SkillData[]
  height?: number
}

const COLORS = ['#27272A', '#15803D', '#71717A', '#A1A1AA', '#166534']

export function SkillsBarChart({ data, height = 230 }: SkillsBarChartProps) {
  const chartData = data.map(item => ({
    skill: item.skill,
    jobs: item.jobs,
  }))

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" vertical={false} />
          <XAxis 
            dataKey="skill" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(99, 102, 241, 0.06)' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload
                return (
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-border shadow-card text-xs">
                    <p className="font-bold text-text-heading mb-1">{item.skill}</p>
                    <p className="text-text-muted flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
                      Peluang Proyek: <span className="font-semibold text-text-heading">{item.jobs} Lowongan</span>
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="jobs" radius={[8, 8, 2, 2]} maxBarSize={48}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                className="transition-opacity hover:opacity-85"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
