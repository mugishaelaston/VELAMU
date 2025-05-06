"use client"
import { ChartContainer, ChartTooltip, ChartLegend, ChartLegendItem } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  {
    date: "Mon",
    heartRate: 72,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    oxygenLevel: 98,
  },
  {
    date: "Tue",
    heartRate: 74,
    bloodPressureSystolic: 122,
    bloodPressureDiastolic: 82,
    oxygenLevel: 97,
  },
  {
    date: "Wed",
    heartRate: 76,
    bloodPressureSystolic: 125,
    bloodPressureDiastolic: 83,
    oxygenLevel: 98,
  },
  {
    date: "Thu",
    heartRate: 73,
    bloodPressureSystolic: 121,
    bloodPressureDiastolic: 79,
    oxygenLevel: 99,
  },
  {
    date: "Fri",
    heartRate: 75,
    bloodPressureSystolic: 123,
    bloodPressureDiastolic: 81,
    oxygenLevel: 98,
  },
  {
    date: "Sat",
    heartRate: 71,
    bloodPressureSystolic: 119,
    bloodPressureDiastolic: 78,
    oxygenLevel: 97,
  },
  {
    date: "Sun",
    heartRate: 70,
    bloodPressureSystolic: 118,
    bloodPressureDiastolic: 77,
    oxygenLevel: 98,
  },
]

export default function HealthMetricsChart() {
  return (
    <ChartContainer className="h-[300px]">
      <ChartLegend>
        <ChartLegendItem name="Heart Rate" color="#ef4444" />
        <ChartLegendItem name="Blood Pressure (Systolic)" color="#3b82f6" />
        <ChartLegendItem name="Blood Pressure (Diastolic)" color="#60a5fa" />
        <ChartLegendItem name="Oxygen Level" color="#22c55e" />
      </ChartLegend>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<ChartTooltip />} />
          <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="bloodPressureSystolic" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="bloodPressureDiastolic" stroke="#60a5fa" strokeWidth={2} />
          <Line type="monotone" dataKey="oxygenLevel" stroke="#22c55e" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
