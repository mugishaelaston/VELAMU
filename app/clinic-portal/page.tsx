"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Users,
  UserPlus,
  Calendar,
  Bell,
  FileText,
  Activity,
  Filter,
  MoreHorizontal,
  ChevronDown,
  MessageSquare,
  Video,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"

export default function ClinicPortalPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for patients
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 42,
      gender: "Female",
      condition: "Hypertension",
      lastVisit: "2025-04-02",
      nextAppointment: "2025-04-15",
      status: "Stable",
      compliance: 85,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 65,
      gender: "Male",
      condition: "Diabetes Type 2",
      lastVisit: "2025-04-05",
      nextAppointment: "2025-04-12",
      status: "Needs Attention",
      compliance: 62,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      age: 29,
      gender: "Female",
      condition: "Asthma",
      lastVisit: "2025-03-28",
      nextAppointment: "2025-04-28",
      status: "Stable",
      compliance: 93,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Robert Kim",
      age: 58,
      gender: "Male",
      condition: "Coronary Artery Disease",
      lastVisit: "2025-04-01",
      nextAppointment: "2025-04-08",
      status: "Critical",
      compliance: 78,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Olivia Martinez",
      age: 34,
      gender: "Female",
      condition: "Pregnancy",
      lastVisit: "2025-04-06",
      nextAppointment: "2025-04-20",
      status: "Stable",
      compliance: 100,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. James Wilson",
      specialty: "Cardiology",
      patients: 42,
      appointments: 8,
      availability: "Available",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Dr. Lisa Chen",
      specialty: "Endocrinology",
      patients: 38,
      appointments: 6,
      availability: "In Appointment",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Dr. Marcus Johnson",
      specialty: "Pulmonology",
      patients: 35,
      appointments: 5,
      availability: "Available",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Dr. Sophia Patel",
      specialty: "Obstetrics",
      patients: 45,
      appointments: 7,
      availability: "On Leave",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Mock data for appointments
  const appointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      doctor: "Dr. James Wilson",
      date: "2025-04-15",
      time: "10:00 AM",
      type: "Follow-up",
      status: "Confirmed",
      patientAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      patient: "Michael Chen",
      doctor: "Dr. Lisa Chen",
      date: "2025-04-12",
      time: "2:30 PM",
      type: "Check-up",
      status: "Confirmed",
      patientAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      patient: "Robert Kim",
      doctor: "Dr. James Wilson",
      date: "2025-04-08",
      time: "9:15 AM",
      type: "Urgent",
      status: "Confirmed",
      patientAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      patient: "Olivia Martinez",
      doctor: "Dr. Sophia Patel",
      date: "2025-04-20",
      time: "11:30 AM",
      type: "Prenatal",
      status: "Pending",
      patientAvatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter mb-1">Clinic Portal</h1>
          <p className="text-muted-foreground">Manage your patients, doctors, and appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">248</div>
            <p className="text-sm text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-sm text-muted-foreground">3 urgent consultations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Patient Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <p className="text-sm text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Image src="/images/clinic-dashboard.png" alt="Clinic Dashboard" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
            <div className="p-8 text-white max-w-lg">
              <h2 className="text-2xl font-bold mb-2">Welcome to MY HEALTH Clinic Portal</h2>
              <p className="mb-4">
                Monitor your patients' health in real-time, manage appointments, and collaborate with your medical team
                all in one place.
              </p>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">Take a Tour</Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="patients" className="space-y-8">
        <TabsList>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Status <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Stable</DropdownMenuItem>
                  <DropdownMenuItem>Needs Attention</DropdownMenuItem>
                  <DropdownMenuItem>Critical</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="border rounded-lg">
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium">
              <div className="col-span-4">Patient</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Compliance</div>
              <div className="col-span-2">Next Appointment</div>
              <div className="col-span-2">Actions</div>
            </div>
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                <div className="col-span-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={patient.avatar} alt={patient.name} />
                    <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {patient.age}, {patient.gender} • {patient.condition}
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
                          : "bg-red-500"
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <Progress value={patient.compliance} className="h-2" />
                    <span className="text-sm">{patient.compliance}%</span>
                  </div>
                </div>
                <div className="col-span-2 text-sm">{new Date(patient.nextAppointment).toLocaleDateString()}</div>
                <div className="col-span-2 flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/clinic-portal/patients/${patient.id}`}>View</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Archive Patient</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {filteredPatients.length} of {patients.length} patients
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4">
          <div className="flex justify-between mb-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Doctor
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <Card key={doctor.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={doctor.avatar} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.split(" ")[1][0]}</AvatarFallback>
                    </Avatar>
                    <Badge
                      className={
                        doctor.availability === "Available"
                          ? "bg-green-500"
                          : doctor.availability === "In Appointment"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }
                    >
                      {doctor.availability}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Patients</div>
                      <div className="font-medium">{doctor.patients}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Today</div>
                      <div className="font-medium">{doctor.appointments} appts</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
              <Button variant="outline">Today</Button>
              <Button variant="outline">This Week</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>

          <div className="border rounded-lg">
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium">
              <div className="col-span-3">Patient</div>
              <div className="col-span-3">Doctor</div>
              <div className="col-span-2">Date & Time</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Actions</div>
            </div>
            {appointments.map((appointment) => (
              <div key={appointment.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                <div className="col-span-3 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={appointment.patientAvatar} alt={appointment.patient} />
                    <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{appointment.patient}</div>
                </div>
                <div className="col-span-3">{appointment.doctor}</div>
                <div className="col-span-2">
                  <div>{new Date(appointment.date).toLocaleDateString()}</div>
                  <div className="text-sm text-muted-foreground">{appointment.time}</div>
                </div>
                <div className="col-span-2">
                  <Badge
                    variant={appointment.type === "Urgent" ? "default" : "outline"}
                    className={appointment.type === "Urgent" ? "bg-red-500" : ""}
                  >
                    {appointment.type}
                  </Badge>
                </div>
                <div className="col-span-2 flex gap-2">
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    Join
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem>Add Notes</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>Age and gender distribution of patients</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Demographics chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Appointment Trends</CardTitle>
                <CardDescription>Number of appointments over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Appointment trends chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Common Conditions</CardTitle>
                <CardDescription>Most frequent patient conditions</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Conditions chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Treatment Outcomes</CardTitle>
                <CardDescription>Success rates for various treatments</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Outcomes chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-[200px] rounded-lg overflow-hidden">
          <Image src="/images/doctor-examining.png" alt="Doctor examining patient" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-lg font-bold mb-1">Remote Patient Monitoring</h3>
              <p className="text-sm">Track patient vitals in real-time with our IoT integration</p>
              <Button variant="link" className="text-white p-0 mt-1">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="relative h-[200px] rounded-lg overflow-hidden">
          <Image src="/images/medical-team.png" alt="Medical team collaboration" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-lg font-bold mb-1">Team Collaboration</h3>
              <p className="text-sm">Coordinate care with your medical team through secure messaging</p>
              <Button variant="link" className="text-white p-0 mt-1">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
