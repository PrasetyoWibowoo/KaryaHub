"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface ProjectData {
  name: string
  value: number
}

interface ProjectStatusChartProps {
  data: ProjectData[]
}

const COLORS = ['#3F3F46', '#B4534B', '#A1A1AA', '#B91C1C']

export function ProjectStatusChart({ data }: ProjectStatusChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => percent ? `${name} ${(percent * 100).toFixed(0)}%` : name}
          outerRadius={80}
          fill="#71717A"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
