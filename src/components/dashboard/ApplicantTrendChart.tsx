"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface ApplicantData {
  month: string
  applicants: number
  hired: number
}

interface ApplicantTrendChartProps {
  data: ApplicantData[]
}

export function ApplicantTrendChart({ data }: ApplicantTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
        <XAxis 
          dataKey="month" 
          tick={{ fill: '#52525B', fontSize: 12 }}
        />
        <YAxis 
          tick={{ fill: '#52525B', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #E4E4E7',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="applicants" 
          stroke="#27272A" 
          strokeWidth={2}
          name="Applicants"
        />
        <Line 
          type="monotone" 
          dataKey="hired" 
          stroke="#15803D"
          strokeWidth={2}
          name="Hired"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
