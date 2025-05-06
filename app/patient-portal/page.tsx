"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  Heart,
  Activity,
  Thermometer,
  Droplets,
  MessageSquare,
  Bell,
  Pill,
  ChevronRight,
  BarChart3,
  Settings,
  Plus,
  CheckCircle,
  FileText,
  Upload,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PatientPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [date, setDate] = useState<Date>()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isMessagesOpen, setIsMessagesOpen] = useState(false)
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false)
  const [isUploadRecordDialogOpen, setIsUploadRecordDialogOpen] = useState(false)

  const [newMessage, setNewMessage] = useState({
    recipient: "",
    subject: "",
    content: "",
  })

  const [newAppointment, setNewAppointment] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  })

  // Mock user data
  const user = {
    id: "patient-1",
    name: "John Smith",
    age: 35,
    avatar: "/placeholder.svg?height=128&width=128",
    vitalSigns: {
      heartRate: 68,
      bloodPressure: "118/75",
      temperature: 98.4,
      oxygenLevel: 97,
    },
    upcomingAppointments: [
      {
        id: 1,
        doctor: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        date: "2025-04-15",
        time: "10:00 AM",
        type: "Follow-up",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        doctor: "Dr. Michael Chen",
        specialty: "General Practitioner",
        date: "2025-04-28",
        time: "2:30 PM",
        type: "Annual Physical",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    medications: [
      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", time: "Evening", refill: "10 days left" },
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        time: "Morning & Evening",
        refill: "5 days left",
      },
    ],
    healthGoals: {
      steps: { current: 8500, target: 10000 },
      weight: { current: 185, target: 175 },
      sleep: { current: 6.5, target: 8 },
    },
    recentMessages: [
      {
        id: 1,
        from: "Dr. Sarah Johnson",
        message: "Your recent test results look good. Let's discuss them at your next appointment.",
        time: "Yesterday",
        read: false,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        from: "Nurse Williams",
        message: "Just a reminder to schedule your flu shot this month.",
        time: "3 days ago",
        read: true,
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    notifications: [
      {
        id: 1,
        title: "Appointment Reminder",
        message: "You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM.",
        type: "info",
        time: "2 hours ago",
        read: false,
      },
      {
        id: 2,
        title: "Medication Reminder",
        message: "Time to take your evening dose of Atorvastatin.",
        type: "reminder",
        time: "5 hours ago",
        read: true,
      },
      {
        id: 3,
        title: "Health Goal Achieved",
        message: "Congratulations! You've reached your step goal for today.",
        type: "success",
        time: "Yesterday",
        read: false,
      },
    ],
    medicalRecords: [
      {
        id: 1,
        title: "Annual Physical Results",
        doctor: "Dr. Michael Chen",
        date: "2025-03-10",
        type: "Lab Results",
        fileUrl: "#",
      },
      {
        id: 2,
        title: "Cardiology Consultation",
        doctor: "Dr. Sarah Johnson",
        date: "2025-02-15",
        type: "Clinical Notes",
        fileUrl: "#",
      },
      {
        id: 3,
        title: "Chest X-Ray",
        doctor: "Dr. Robert Kim",
        date: "2025-01-20",
        type: "Imaging",
        fileUrl: "#",
      },
    ],
    doctors: [
      {
        id: "doctor-1",
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "doctor-2",
        name: "Dr. Michael Chen",
        specialty: "General Practice",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "doctor-3",
        name: "Dr. Robert Kim",
        specialty: "Pulmonology",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    lifeSuitData: {
      heartRateHistory: [65, 68, 72, 70, 68, 67, 65, 68, 70, 72, 75, 73],
      bloodPressureHistory: [
        { systolic: 118, diastolic: 75 },
        { systolic: 120, diastolic: 78 },
        { systolic: 117, diastolic: 76 },
        { systolic: 119, diastolic: 77 },
        { systolic: 121, diastolic: 79 },
        { systolic: 118, diastolic: 75 },
      ],
      oxygenLevelHistory: [97, 98, 97, 96, 97, 98, 99, 98, 97, 97, 96, 97],
      temperatureHistory: [98.4, 98.6, 98.5, 98.4, 98.3, 98.4, 98.6, 98.7, 98.6, 98.5, 98.4, 98.4],
      sleepData: {
        deepSleep: 2.5,
        lightSleep: 4.0,
        remSleep: 1.5,
        awake: 0.5,
      },
      activityData: {
        steps: [8500, 9200, 7800, 10200, 8900, 9500, 8700],
        caloriesBurned: [2100, 2300, 1950, 2500, 2200, 2350, 2150],
        activeMinutes: [45, 60, 40, 75, 55, 65, 50],
      },
    },
  }

  const unreadNotifications = user.notifications.filter((n) => !n.read).length
  const unreadMessages = user.recentMessages.filter((m) => !m.read).length

  const handleSendMessage = () => {
    // In a real app, this would send the message to the backend
    console.log("Sending message:", newMessage)
    setIsNewMessageOpen(false)
    setNewMessage({
      recipient: "",
      subject: "",
      content: "",
    })
  }

  const handleScheduleAppointment = () => {
    // In a real app, this would send the appointment request to the backend
    console.log("Scheduling appointment:", newAppointment)
    setIsAppointmentDialogOpen(false)
    setNewAppointment({
      doctor: "",
      date: "",
      time: "",
      reason: "",
    })
  }

  const handleUploadRecord = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would upload the file to the backend
    console.log("Uploading medical record")
    setIsUploadRecordDialogOpen(false)
  }

  const markNotificationAsRead = (id: number) => {
    // In a real app, this would update the notification status in the backend
    console.log("Marking notification as read:", id)
  }

  const markMessageAsRead = (id: number) => {
    // In a real app, this would update the message status in the backend
    console.log("Marking message as read:", id)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
            <p className="text-muted-foreground">Your personal health dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h4 className="font-medium">Notifications</h4>
              </div>
              <ScrollArea className="h-80">
                {user.notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No notifications</div>
                ) : (
                  user.notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b ${notification.read ? "" : "bg-blue-50"}`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-2">
                        {notification.type === "info" && <Bell className="h-5 w-5 text-blue-500 shrink-0" />}
                        {notification.type === "reminder" && <Clock className="h-5 w-5 text-yellow-500 shrink-0" />}
                        {notification.type === "success" && <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />}
                        <div>
                          <h5 className="font-medium">{notification.title}</h5>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
              <div className="p-2 border-t">
                <Button variant="ghost" size="sm" className="w-full">
                  Mark all as read
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={isMessagesOpen} onOpenChange={setIsMessagesOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
                {unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {unreadMessages}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b flex justify-between items-center">
                <h4 className="font-medium">Messages</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsMessagesOpen(false)
                    setIsNewMessageOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="h-80">
                {user.recentMessages.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No messages</div>
                ) : (
                  user.recentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border-b ${message.read ? "" : "bg-blue-50"}`}
                      onClick={() => markMessageAsRead(message.id)}
                    >
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.from} />
                          <AvatarFallback>{message.from[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium">{message.from}</h5>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
              <div className="p-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setIsMessagesOpen(false)
                    setIsNewMessageOpen(true)
                  }}
                >
                  New Message
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Doctor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Heart className="h-4 w-4 mr-2 text-red-500" />
              Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.vitalSigns.heartRate} BPM</div>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Activity className="h-4 w-4 mr-2 text-blue-500" />
              Blood Pressure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.vitalSigns.bloodPressure}</div>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Thermometer className="h-4 w-4 mr-2 text-yellow-500" />
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.vitalSigns.temperature}°F</div>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Droplets className="h-4 w-4 mr-2 text-green-500" />
              Oxygen Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.vitalSigns.oxygenLevel}%</div>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Image src="/images/doctor-patient.png" alt="Doctor and Patient" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
            <div className="p-8 text-white max-w-lg">
              <h2 className="text-2xl font-bold mb-2">Your Life Suit is Connected</h2>
              <p className="mb-4">
                Your wearable health monitor is actively tracking your vital signs and sending real-time data to your
                healthcare team.
              </p>
              <Button className="bg-white text-blue-600 hover:bg-blue-50" onClick={() => setActiveTab("life-suit")}>
                View Life Suit Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} className="space-y-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="life-suit">Life Suit Data</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Health Trends</CardTitle>
                <CardDescription>Your vital signs over the past week</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Health trends chart will appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Goals</CardTitle>
                <CardDescription>Your progress towards daily targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Steps</span>
                    <span className="text-sm font-medium">
                      {user.healthGoals.steps.current} / {user.healthGoals.steps.target}
                    </span>
                  </div>
                  <Progress
                    value={(user.healthGoals.steps.current / user.healthGoals.steps.target) * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Weight (lbs)</span>
                    <span className="text-sm font-medium">
                      {user.healthGoals.weight.current} / {user.healthGoals.weight.target}
                    </span>
                  </div>
                  <Progress
                    value={
                      100 -
                      ((user.healthGoals.weight.current - user.healthGoals.weight.target) /
                        user.healthGoals.weight.target) *
                        100
                    }
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Sleep (hours)</span>
                    <span className="text-sm font-medium">
                      {user.healthGoals.sleep.current} / {user.healthGoals.sleep.target}
                    </span>
                  </div>
                  <Progress
                    value={(user.healthGoals.sleep.current / user.healthGoals.sleep.target) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Update Goals
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled doctor visits</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#" onClick={() => setActiveTab("appointments")}>
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-start space-x-4 rounded-md border p-3">
                      <Avatar>
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.doctor} />
                        <AvatarFallback>
                          {appointment.doctor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{appointment.doctor}</p>
                        <p className="text-xs text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center pt-2">
                          <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                          <Clock className="ml-3 mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{appointment.time}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsAppointmentDialogOpen(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Medications</CardTitle>
                  <CardDescription>Your current prescriptions</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#" onClick={() => setActiveTab("medications")}>
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.medications.map((medication, index) => (
                    <div key={index} className="flex items-start space-x-4 rounded-md border p-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Pill className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{medication.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {medication.dosage}, {medication.frequency}
                        </p>
                        <div className="flex items-center pt-2">
                          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{medication.time}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {medication.refill}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Pill className="h-4 w-4 mr-2" />
                  Request Refill
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled doctor visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.upcomingAppointments.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-muted-foreground">No upcoming appointments</p>
                    <Button className="mt-4" onClick={() => setIsAppointmentDialogOpen(true)}>
                      Schedule New Appointment
                    </Button>
                  </div>
                ) : (
                  user.upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.doctor} />
                        <AvatarFallback>
                          {appointment.doctor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{appointment.doctor}</h4>
                            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          </div>
                          <Badge>{appointment.type}</Badge>
                        </div>
                        <div className="mt-2 flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{new Date(appointment.date).toLocaleDateString()}</span>
                          <Clock className="ml-4 mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsAppointmentDialogOpen(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New Appointment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Your prescribed medications and refill status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.medications.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-muted-foreground">No current medications</p>
                  </div>
                ) : (
                  user.medications.map((medication, index) => (
                    <div key={index} className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Pill className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{medication.name}</h4>
                            <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                          </div>
                          <Badge variant="outline">{medication.refill}</Badge>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm">
                            <span className="font-medium">Frequency:</span> {medication.frequency}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Time:</span> {medication.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Request Refill
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View Medication History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>Your health documents and test results</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsUploadRecordDialogOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Record
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.medicalRecords.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-muted-foreground">No medical records found</p>
                    <Button className="mt-4" onClick={() => setIsUploadRecordDialogOpen(true)}>
                      Upload Medical Record
                    </Button>
                  </div>
                ) : (
                  user.medicalRecords.map((record) => (
                    <div key={record.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{record.title}</h4>
                            <p className="text-sm text-muted-foreground">By {record.doctor}</p>
                          </div>
                          <Badge>{record.type}</Badge>
                        </div>
                        <div className="mt-2 flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Request Records from Doctor
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communication with your healthcare team</CardDescription>
              </div>
              <Button size="sm" onClick={() => setIsNewMessageOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.recentMessages.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-muted-foreground">No messages found</p>
                    <Button className="mt-4" onClick={() => setIsNewMessageOpen(true)}>
                      Send New Message
                    </Button>
                  </div>
                ) : (
                  user.recentMessages.map((message) => (
                    <div key={message.id} className={`rounded-md border p-4 ${message.read ? "" : "bg-blue-50"}`}>
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.from} />
                          <AvatarFallback>{message.from[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{message.from}</h4>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <p className="mt-1">{message.message}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Mark as {message.read ? "Unread" : "Read"}
                        </Button>
                        <Button size="sm">Reply</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsNewMessageOpen(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Compose New Message
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="life-suit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Life Suit Data</CardTitle>
              <CardDescription>Real-time health monitoring from your wearable device</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Vital Signs History</h3>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Vital signs chart will appear here</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Sleep Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Deep Sleep</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.lifeSuitData.sleepData.deepSleep} hrs</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Light Sleep</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.lifeSuitData.sleepData.lightSleep} hrs</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">REM Sleep</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.lifeSuitData.sleepData.remSleep} hrs</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Awake</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.lifeSuitData.sleepData.awake} hrs</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Activity Tracking</h3>
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Activity tracking chart will appear here</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Download Data</Button>
              <Button variant="outline">Share with Doctor</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Message Dialog */}
      <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <DialogDescription>Send a message to your healthcare provider.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Select
                value={newMessage.recipient}
                onValueChange={(value) => setNewMessage({ ...newMessage, recipient: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a recipient" />
                </SelectTrigger>
                <SelectContent>
                  {user.doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} ({doctor.specialty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewMessageOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Appointment Dialog */}
      <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>Book an appointment with your healthcare provider.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select
                value={newAppointment.doctor}
                onValueChange={(value) => setNewAppointment({ ...newAppointment, doctor: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {user.doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} ({doctor.specialty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Textarea
                id="reason"
                rows={3}
                value={newAppointment.reason}
                onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAppointmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleAppointment}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Medical Record Dialog */}
      <Dialog open={isUploadRecordDialogOpen} onOpenChange={setIsUploadRecordDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Medical Record</DialogTitle>
            <DialogDescription>Upload a medical document or test result to your records.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUploadRecord}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Document Title</Label>
                <Input id="title" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lab-results">Lab Results</SelectItem>
                    <SelectItem value="imaging">Imaging</SelectItem>
                    <SelectItem value="clinical-notes">Clinical Notes</SelectItem>
                    <SelectItem value="prescription">Prescription</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <Input id="file" type="file" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadRecordDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
