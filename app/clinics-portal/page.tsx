"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Bell,
  FileText,
  Building2,
  Plus,
  Stethoscope,
  AlertTriangle,
  MessageSquare,
  CheckCircle,
  Map,
  AlertCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPlaceholder } from "@/components/map-placeholder"

// Types for our data
interface Clinic {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  email: string
  numberOfDoctors: number
  numberOfPatients: number
  imageUrl?: string
}

interface Doctor {
  id: string
  name: string
  specialization: string
  clinicId: string
  patients: number
  status: "Available" | "In Appointment" | "On Leave" | "Unavailable"
  imageUrl?: string
}

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  condition: string
  status: "Stable" | "Needs Attention" | "Critical" | "Improving"
  lastVisit: string
  assignedDoctorId: string
  clinicId: string
  imageUrl?: string
  location?: {
    lat: number
    lng: number
    lastUpdated: string
  }
  wearingLifeSuit: boolean
}

interface Appointment {
  id: string
  patientId: string
  doctorId: string
  clinicId: string
  date: string
  time: string
  type: "Check-up" | "Follow-up" | "Emergency" | "Consultation"
  status: "Scheduled" | "Completed" | "Cancelled" | "No-show"
}

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  timestamp: string
  read: boolean
}

interface Message {
  id: string
  senderId: string
  senderName: string
  senderType: "doctor" | "patient" | "admin"
  recipientId: string
  recipientName: string
  recipientType: "doctor" | "patient" | "admin"
  content: string
  timestamp: string
  read: boolean
}

interface Report {
  id: string
  title: string
  description: string
  type: "Patient" | "Doctor" | "Financial" | "Operational"
  createdAt: string
  status: "Draft" | "Generated" | "Reviewed"
  url?: string
}

interface Contact {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  imageUrl?: string
}

export default function ClinicsPortalPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {})
  const [confirmMessage, setConfirmMessage] = useState("")

  // State for data
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [emergencyAlerts, setEmergencyAlerts] = useState<Patient[]>([])

  // State for dialogs
  const [isAddClinicOpen, setIsAddClinicOpen] = useState(false)
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false)
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false)
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isMessagesOpen, setIsMessagesOpen] = useState(false)
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)

  // State for new items
  const [newClinic, setNewClinic] = useState<Omit<Clinic, "id">>({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    numberOfDoctors: 0,
    numberOfPatients: 0,
  })

  const [newDoctor, setNewDoctor] = useState<Omit<Doctor, "id">>({
    name: "",
    specialization: "",
    clinicId: "",
    patients: 0,
    status: "Available",
  })

  const [newPatient, setNewPatient] = useState<Omit<Patient, "id">>({
    name: "",
    age: 0,
    gender: "",
    condition: "",
    status: "Stable",
    lastVisit: new Date().toISOString().split("T")[0],
    assignedDoctorId: "",
    clinicId: "",
    wearingLifeSuit: false,
  })

  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, "id">>({
    patientId: "",
    doctorId: "",
    clinicId: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    type: "Check-up",
    status: "Scheduled",
  })

  const [newMessage, setNewMessage] = useState({
    recipientId: "",
    recipientType: "doctor",
    content: "",
  })

  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    type: "Patient" as const,
  })

  const [newContact, setNewContact] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
  })

  // Mock data for demonstration
  useEffect(() => {
    // Simulate some mock data for demonstration
    const mockClinic: Clinic = {
      id: "clinic-1",
      name: "HealthFirst Medical Center",
      address: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      phone: "(415) 555-1234",
      email: "info@healthfirst.com",
      numberOfDoctors: 3,
      numberOfPatients: 5,
    }

    const mockDoctors: Doctor[] = [
      {
        id: "doctor-1",
        name: "Dr. Sarah Johnson",
        specialization: "Cardiology",
        clinicId: "clinic-1",
        patients: 3,
        status: "Available",
      },
      {
        id: "doctor-2",
        name: "Dr. Michael Chen",
        specialization: "Neurology",
        clinicId: "clinic-1",
        patients: 2,
        status: "In Appointment",
      },
    ]

    const mockPatients: Patient[] = [
      {
        id: "patient-1",
        name: "John Smith",
        age: 45,
        gender: "Male",
        condition: "Hypertension",
        status: "Stable",
        lastVisit: "2023-04-15",
        assignedDoctorId: "doctor-1",
        clinicId: "clinic-1",
        wearingLifeSuit: true,
        location: {
          lat: 37.7749,
          lng: -122.4194,
          lastUpdated: new Date().toISOString(),
        },
      },
      {
        id: "patient-2",
        name: "Emily Davis",
        age: 62,
        gender: "Female",
        condition: "Diabetes",
        status: "Needs Attention",
        lastVisit: "2023-04-10",
        assignedDoctorId: "doctor-2",
        clinicId: "clinic-1",
        wearingLifeSuit: true,
        location: {
          lat: 37.7833,
          lng: -122.4167,
          lastUpdated: new Date().toISOString(),
        },
      },
      {
        id: "patient-3",
        name: "Robert Johnson",
        age: 78,
        gender: "Male",
        condition: "Heart Disease",
        status: "Critical",
        lastVisit: "2023-04-18",
        assignedDoctorId: "doctor-1",
        clinicId: "clinic-1",
        wearingLifeSuit: true,
        location: {
          lat: 37.7694,
          lng: -122.4862,
          lastUpdated: new Date().toISOString(),
        },
      },
    ]

    const mockNotifications: Notification[] = [
      {
        id: "notif-1",
        title: "Emergency Alert",
        message: "Patient Robert Johnson's vital signs are critical. Immediate attention required.",
        type: "error",
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: "notif-2",
        title: "Appointment Reminder",
        message: "Dr. Sarah Johnson has 3 appointments scheduled for today.",
        type: "info",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
    ]

    const mockMessages: Message[] = [
      {
        id: "msg-1",
        senderId: "doctor-1",
        senderName: "Dr. Sarah Johnson",
        senderType: "doctor",
        recipientId: "admin-1",
        recipientName: "Admin",
        recipientType: "admin",
        content: "Could you please schedule a follow-up appointment for John Smith next week?",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false,
      },
    ]

    setClinics([mockClinic])
    setDoctors(mockDoctors)
    setPatients(mockPatients)
    setNotifications(mockNotifications)
    setMessages(mockMessages)
    setEmergencyAlerts([mockPatients[2]]) // Patient in critical condition
  }, [])

  // Filter data based on search term
  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.state.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle form submissions with confirmation
  const confirmAndExecute = (message: string, action: () => void) => {
    setConfirmMessage(message)
    setConfirmAction(() => action)
    setIsConfirmDialogOpen(true)
  }

  const handleAddClinic = () => {
    const id = `clinic-${Date.now()}`
    setClinics([...clinics, { id, ...newClinic }])
    setNewClinic({
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      numberOfDoctors: 0,
      numberOfPatients: 0,
    })
    setIsAddClinicOpen(false)
    addNotification("Success", "Clinic added successfully", "success")
  }

  const handleAddDoctor = () => {
    const id = `doctor-${Date.now()}`
    setDoctors([...doctors, { id, ...newDoctor }])
    setNewDoctor({
      name: "",
      specialization: "",
      clinicId: "",
      patients: 0,
      status: "Available",
    })
    setIsAddDoctorOpen(false)
    addNotification("Success", "Doctor added successfully", "success")
  }

  const handleAddPatient = () => {
    const id = `patient-${Date.now()}`
    setPatients([...patients, { id, ...newPatient }])
    setNewPatient({
      name: "",
      age: 0,
      gender: "",
      condition: "",
      status: "Stable",
      lastVisit: new Date().toISOString().split("T")[0],
      assignedDoctorId: "",
      clinicId: "",
      wearingLifeSuit: false,
    })
    setIsAddPatientOpen(false)
    addNotification("Success", "Patient added successfully", "success")
  }

  const handleAddAppointment = () => {
    const id = `appointment-${Date.now()}`
    setAppointments([...appointments, { id, ...newAppointment }])
    setNewAppointment({
      patientId: "",
      doctorId: "",
      clinicId: "",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      type: "Check-up",
      status: "Scheduled",
    })
    setIsAddAppointmentOpen(false)
    addNotification("Success", "Appointment scheduled successfully", "success")
  }

  const handleSendMessage = () => {
    const id = `msg-${Date.now()}`
    const recipient = [...doctors, ...patients].find((p) => p.id === newMessage.recipientId)

    if (recipient) {
      const message: Message = {
        id,
        senderId: "admin-1",
        senderName: "Admin",
        senderType: "admin",
        recipientId: newMessage.recipientId,
        recipientName: recipient.name,
        recipientType: newMessage.recipientType as "doctor" | "patient",
        content: newMessage.content,
        timestamp: new Date().toISOString(),
        read: false,
      }

      setMessages([...messages, message])
      setNewMessage({
        recipientId: "",
        recipientType: "doctor",
        content: "",
      })
      setIsNewMessageOpen(false)
      addNotification("Success", "Message sent successfully", "success")
    }
  }

  const handleGenerateReport = () => {
    const id = `report-${Date.now()}`
    const report: Report = {
      id,
      title: newReport.title,
      description: newReport.description,
      type: newReport.type,
      createdAt: new Date().toISOString(),
      status: "Generated",
      url: "#",
    }

    setReports([...reports, report])
    setNewReport({
      title: "",
      description: "",
      type: "Patient",
    })
    setIsReportDialogOpen(false)
    addNotification("Success", "Report generated successfully", "success")
  }

  const handleAddContact = () => {
    const id = `contact-${Date.now()}`
    const contact: Contact = {
      id,
      ...newContact,
    }

    setContacts([...contacts, contact])
    setNewContact({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
    })
    setIsContactDialogOpen(false)
    addNotification("Success", "Contact added successfully", "success")
  }

  const addNotification = (title: string, message: string, type: "info" | "warning" | "error" | "success") => {
    const id = `notif-${Date.now()}`
    const notification: Notification = {
      id,
      title,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false,
    }

    setNotifications([notification, ...notifications])
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markMessageAsRead = (id: string) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)))
  }

  const handleEmergencyResponse = (patientId: string) => {
    // In a real app, this would trigger emergency protocols
    addNotification("Emergency Response", `Emergency response initiated for patient ${patientId}`, "info")
    setEmergencyAlerts(emergencyAlerts.filter((p) => p.id !== patientId))
  }

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length
  const unreadMessagesCount = messages.filter((m) => !m.read).length

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter mb-1">Clinics Portal</h1>
          <p className="text-muted-foreground">Manage your clinics, doctors, and patients</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {unreadNotificationsCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h4 className="font-medium">Notifications</h4>
              </div>
              <ScrollArea className="h-80">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b ${notification.read ? "" : "bg-blue-50"}`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-2">
                        {notification.type === "error" && <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />}
                        {notification.type === "warning" && (
                          <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />
                        )}
                        {notification.type === "success" && <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />}
                        {notification.type === "info" && <Bell className="h-5 w-5 text-blue-500 shrink-0" />}
                        <div>
                          <h5 className="font-medium">{notification.title}</h5>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </p>
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
                {unreadMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {unreadMessagesCount}
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
                {messages.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No messages</div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border-b ${message.read ? "" : "bg-blue-50"}`}
                      onClick={() => markMessageAsRead(message.id)}
                    >
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium">{message.senderName}</h5>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
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

          <Button variant="outline" size="sm" onClick={() => setIsReportDialogOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm" onClick={() => router.push("/register-clinic")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Clinic
          </Button>
        </div>
      </div>

      {emergencyAlerts.length > 0 && (
        <Alert className="mb-8 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-600">Emergency Alert</AlertTitle>
          <AlertDescription>
            <div className="space-y-2">
              {emergencyAlerts.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{patient.name}</span> is in critical condition. Life Suit has detected
                    abnormal vital signs.
                  </div>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleEmergencyResponse(patient.id)}
                  >
                    Respond Now
                  </Button>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {clinics.length === 0 && doctors.length === 0 && patients.length === 0 && (
        <div className="mb-8">
          <Alert>
            <AlertTitle className="text-lg font-semibold">Welcome to the Clinics Portal!</AlertTitle>
            <AlertDescription>
              <p className="mb-4">
                You haven't added any clinics, doctors, or patients yet. Get started by registering your first clinic.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/register-clinic")}>
                Register Your First Clinic
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {clinics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                Total Clinics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{clinics.length}</div>
              <p className="text-sm text-muted-foreground">Registered clinics</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                Total Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{doctors.length}</div>
              <p className="text-sm text-muted-foreground">Across all clinics</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{patients.length}</div>
              <p className="text-sm text-muted-foreground">Active patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Map className="h-5 w-5 mr-2 text-blue-600" />
                Life Suit Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{patients.filter((p) => p.wearingLifeSuit).length}</div>
              <p className="text-sm text-muted-foreground">With GPS tracking</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="dashboard" className="space-y-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="clinics">Clinics</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="tracking">GPS Tracking</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Patient Location Tracking</CardTitle>
                <CardDescription>Real-time GPS tracking of Life Suit patients</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] relative">
                <MapPlaceholder patients={patients.filter((p) => p.wearingLifeSuit && p.location)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Latest alerts and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No notifications</div>
                  ) : (
                    <div className="space-y-4">
                      {notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-md ${
                            notification.type === "error"
                              ? "bg-red-50 border-l-4 border-red-500"
                              : notification.type === "warning"
                                ? "bg-yellow-50 border-l-4 border-yellow-500"
                                : notification.type === "success"
                                  ? "bg-green-50 border-l-4 border-green-500"
                                  : "bg-blue-50 border-l-4 border-blue-500"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {notification.type === "error" && <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />}
                            {notification.type === "warning" && (
                              <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />
                            )}
                            {notification.type === "success" && (
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                            )}
                            {notification.type === "info" && <Bell className="h-5 w-5 text-blue-500 shrink-0" />}
                            <div>
                              <h5 className="font-medium">{notification.title}</h5>
                              <p className="text-sm">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(notification.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => setIsNotificationsOpen(true)}>
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest communications</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No messages</div>
                  ) : (
                    <div className="space-y-4">
                      {messages.slice(0, 5).map((message) => (
                        <div
                          key={message.id}
                          className={`p-3 rounded-md ${message.read ? "bg-gray-50" : "bg-blue-50"}`}
                        >
                          <div className="flex items-start gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-medium">{message.senderName}</h5>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(message.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => setIsMessagesOpen(true)}>
                  View All Messages
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Life Suit GPS Tracking</h2>
              <p className="text-muted-foreground">
                Real-time location tracking for patients wearing Life Suit devices
              </p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter patients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="critical">Critical Patients</SelectItem>
                  <SelectItem value="stable">Stable Patients</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="h-[600px] relative">
                <MapPlaceholder patients={patients.filter((p) => p.wearingLifeSuit && p.location)} />
              </div>
            </CardContent>
          </Card>

          <div className="border rounded-lg">
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium">
              <div className="col-span-3">Patient</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Last Updated</div>
              <div className="col-span-2">Battery</div>
              <div className="col-span-2">Actions</div>
            </div>
            {patients
              .filter((p) => p.wearingLifeSuit)
              .map((patient) => (
                <div key={patient.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                  <div className="col-span-3 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {patient.age}, {patient.gender}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Badge
                      className={
                        patient.status === "Stable"
                          ? "bg-green-500"
                          : patient.status === "Needs Attention"
                            ? "bg-yellow-500"
                            : patient.status === "Critical"
                              ? "bg-red-500"
                              : "bg-blue-500"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </div>
                  <div className="col-span-3">
                    {patient.location ? new Date(patient.location.lastUpdated).toLocaleString() : "N/A"}
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-sm">85%</span>
                    </div>
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <Button variant="outline" size="sm">
                      <Map className="h-4 w-4 mr-2" />
                      Locate
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Alert
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        {/* Other tabs content remains the same */}
      </Tabs>

      {/* New Message Dialog */}
      <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <DialogDescription>Send a message to a doctor or patient.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="recipientType">Recipient Type</Label>
              <Select
                value={newMessage.recipientType}
                onValueChange={(value) => setNewMessage({ ...newMessage, recipientType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="recipientId">Recipient</Label>
              <Select
                value={newMessage.recipientId}
                onValueChange={(value) => setNewMessage({ ...newMessage, recipientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  {newMessage.recipientType === "doctor"
                    ? doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </SelectItem>
                      ))
                    : patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                placeholder="Type your message here..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewMessageOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSendMessage}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>Create a new report for your clinic.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reportTitle">Report Title</Label>
              <Input
                id="reportTitle"
                value={newReport.title}
                onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                placeholder="Monthly Patient Summary"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select
                value={newReport.type}
                onValueChange={(value: "Patient" | "Doctor" | "Financial" | "Operational") =>
                  setNewReport({ ...newReport, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Patient">Patient Report</SelectItem>
                  <SelectItem value="Doctor">Doctor Report</SelectItem>
                  <SelectItem value="Financial">Financial Report</SelectItem>
                  <SelectItem value="Operational">Operational Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reportDescription">Description</Label>
              <Textarea
                id="reportDescription"
                value={newReport.description}
                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                placeholder="Describe what this report should include..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Contact</DialogTitle>
            <DialogDescription>Add a new contact to your directory.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contactName">Full Name</Label>
              <Input
                id="contactName"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="John Smith"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contactRole">Role</Label>
                <Input
                  id="contactRole"
                  value={newContact.role}
                  onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                  placeholder="Emergency Contact"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactDepartment">Department</Label>
                <Input
                  id="contactDepartment"
                  value={newContact.department}
                  onChange={(e) => setNewContact({ ...newContact, department: e.target.value })}
                  placeholder="Emergency Services"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                placeholder="john.smith@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactPhone">Phone</Label>
              <Input
                id="contactPhone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddContact}>
              Add Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>{confirmMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                confirmAction()
                setIsConfirmDialogOpen(false)
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
