import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Clock, Heart, LineChart, Pill, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import HealthMetricsChart from "@/components/health-metrics-chart"
import UpcomingAppointments from "@/components/upcoming-appointments"
import MedicationReminders from "@/components/medication-reminders"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Clock className="mr-2 h-4 w-4" />
            View History
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72 BPM</div>
                <p className="text-xs text-muted-foreground">Normal range</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120/80</div>
                <p className="text-xs text-muted-foreground">Normal range</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Oxygen Level</CardTitle>
                <LineChart className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">Normal range</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                <LineChart className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.6°F</div>
                <p className="text-xs text-muted-foreground">Normal range</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>Your vital signs over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <HealthMetricsChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>You have 3 appointments scheduled</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingAppointments />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Medication Reminders</CardTitle>
                <CardDescription>Your medication schedule for today</CardDescription>
              </CardHeader>
              <CardContent>
                <MedicationReminders />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>AI Health Insights</CardTitle>
                <CardDescription>Personalized recommendations based on your health data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 rounded-md border p-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Heart className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Cardiovascular Health</p>
                      <p className="text-sm text-muted-foreground">
                        Your heart rate has been stable. Consider adding 30 minutes of moderate exercise to your
                        routine.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 rounded-md border p-4">
                    <div className="rounded-full bg-green-100 p-2">
                      <Pill className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Medication Adherence</p>
                      <p className="text-sm text-muted-foreground">
                        You've been consistent with your medication schedule. Keep up the good work!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 rounded-md border p-4">
                    <div className="rounded-full bg-yellow-100 p-2">
                      <User className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Preventive Care</p>
                      <p className="text-sm text-muted-foreground">
                        It's time for your annual check-up. Would you like to schedule an appointment?
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Schedule Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Detailed Vital Signs</CardTitle>
              <CardDescription>Comprehensive view of your health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Detailed vitals monitoring content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>Schedule and manage your healthcare appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Appointment management interface will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Medication Management</CardTitle>
              <CardDescription>Track and manage your prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Medication management interface will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
