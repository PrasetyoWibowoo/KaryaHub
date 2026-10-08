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
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="month" 
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <YAxis 
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '12px'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="applicants" 
          stroke="#6366f1" 
          strokeWidth={2}
          name="Applicants"
        />
        <Line 
          type="monotone" 
          dataKey="hired" 
          stroke="#10b981" 
          strokeWidth={2}
          name="Hired"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
