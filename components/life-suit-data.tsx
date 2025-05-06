"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Activity, Thermometer, Droplets, Clock, Calendar, Battery, MapPin, Zap } from "lucide-react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface VitalSign {
  timestamp: string
  heartRate: number
  bloodPressureSystolic: number
  bloodPressureDiastolic: number
  temperature: number
  oxygenLevel: number
  steps: number
}

interface LifeSuitDataProps {
  patientId: string
  patientName: string
}

export function LifeSuitData({ patientId, patientName }: LifeSuitDataProps) {
  const [timeRange, setTimeRange] = useState("24h")

  // Mock data - in a real app, this would come from an API
  const mockVitalSigns: VitalSign[] = Array.from({ length: 24 }, (_, i) => {
    const date = new Date()
    date.setHours(date.getHours() - (24 - i))

    return {
      timestamp: date.toISOString(),
      heartRate: 65 + Math.floor(Math.random() * 20),
      bloodPressureSystolic: 115 + Math.floor(Math.random() * 15),
      bloodPressureDiastolic: 75 + Math.floor(Math.random() * 10),
      temperature: 98.2 + Math.random() * 1.0,
      oxygenLevel: 95 + Math.floor(Math.random() * 5),
      steps: i < 8 ? 0 : 100 * Math.floor(Math.random() * 30),
    }
  })

  const formattedData = mockVitalSigns.map((vs) => ({
    ...vs,
    time: new Date(vs.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    date: new Date(vs.timestamp).toLocaleDateString(),
  }))

  const currentVitals = mockVitalSigns[mockVitalSigns.length - 1]

  const batteryLevel = 78
  const lastSyncTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Life Suit Data</h2>
          <p className="text-muted-foreground">Real-time health monitoring for {patientName}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Battery className="h-4 w-4" />
            <span>{batteryLevel}%</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last sync: {lastSyncTime}</span>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Heart className="h-8 w-8 text-red-500 mb-2" />
            <div className="text-sm text-muted-foreground">Heart Rate</div>
            <div className="text-3xl font-bold">{currentVitals.heartRate}</div>
            <div className="text-xs text-muted-foreground">BPM</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Activity className="h-8 w-8 text-blue-500 mb-2" />
            <div className="text-sm text-muted-foreground">Blood Pressure</div>
            <div className="text-3xl font-bold">
              {currentVitals.bloodPressureSystolic}/{currentVitals.bloodPressureDiastolic}
            </div>
            <div className="text-xs text-muted-foreground">mmHg</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Thermometer className="h-8 w-8 text-yellow-500 mb-2" />
            <div className="text-sm text-muted-foreground">Temperature</div>
            <div className="text-3xl font-bold">{currentVitals.temperature.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">°F</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Droplets className="h-8 w-8 text-green-500 mb-2" />
            <div className="text-sm text-muted-foreground">Oxygen Level</div>
            <div className="text-3xl font-bold">{currentVitals.oxygenLevel}</div>
            <div className="text-xs text-muted-foreground">%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Zap className="h-8 w-8 text-purple-500 mb-2" />
            <div className="text-sm text-muted-foreground">Steps</div>
            <div className="text-3xl font-bold">{formattedData.reduce((sum, data) => sum + data.steps, 0)}</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="heart-rate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="heart-rate">Heart Rate</TabsTrigger>
          <TabsTrigger value="blood-pressure">Blood Pressure</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="oxygen">Oxygen Level</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="heart-rate">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate</CardTitle>
              <CardDescription>Beats per minute over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  heartRate: {
                    label: "Heart Rate",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[40, 120]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="heartRate"
                      stroke="var(--color-heartRate)"
                      name="Heart Rate (BPM)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">Normal range: 60-100 BPM at rest</div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="blood-pressure">
          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure</CardTitle>
              <CardDescription>Systolic and diastolic pressure over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  systolic: {
                    label: "Systolic",
                    color: "hsl(var(--chart-1))",
                  },
                  diastolic: {
                    label: "Diastolic",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[40, 160]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="bloodPressureSystolic"
                      stroke="var(--color-systolic)"
                      name="Systolic (mmHg)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bloodPressureDiastolic"
                      stroke="var(--color-diastolic)"
                      name="Diastolic (mmHg)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">Normal range: Below 120/80 mmHg</div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle>Body Temperature</CardTitle>
              <CardDescription>Temperature readings over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  temperature: {
                    label: "Temperature",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[97, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="var(--color-temperature)"
                      name="Temperature (°F)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">Normal range: 97.7-99.5°F</div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="oxygen">
          <Card>
            <CardHeader>
              <CardTitle>Oxygen Saturation</CardTitle>
              <CardDescription>Blood oxygen levels over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  oxygenLevel: {
                    label: "Oxygen Level",
                    color: "hsl(var(--chart-4))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[90, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="oxygenLevel"
                      stroke="var(--color-oxygenLevel)"
                      name="Oxygen Level (%)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">Normal range: 95-100%</div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Level</CardTitle>
              <CardDescription>Steps taken throughout the day</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  steps: {
                    label: "Steps",
                    color: "hsl(var(--chart-5))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="steps"
                      stroke="var(--color-steps)"
                      name="Steps"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">Daily goal: 10,000 steps</div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          View Historical Data
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <MapPin className="h-4 w-4 mr-2" />
          View Location History
        </Button>
      </div>
    </div>
  )
}
