"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Clock,
  Calendar,
  FileText,
  MessageSquare,
  Video,
  ArrowLeft,
  Plus,
  Download,
  Share2,
  Pill,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const [notes, setNotes] = useState("")

  // Mock patient data
  const patient = {
    id: Number.parseInt(params.id),
    name: "Sarah Johnson",
    age: 42,
    gender: "Female",
    dateOfBirth: "1983-05-15",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    condition: "Hypertension",
    status: "Stable",
    bloodType: "A+",
    allergies: ["Penicillin", "Shellfish"],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily" },
    ],
    vitalSigns: {
      heartRate: 72,
      bloodPressure: "128/82",
      temperature: 98.6,
      oxygenLevel: 98,
    },
    appointments: [
      {
        date: "2025-04-15",
        time: "10:00 AM",
        doctor: "Dr. James Wilson",
        type: "Follow-up",
        status: "Scheduled",
      },
      {
        date: "2025-03-01",
        time: "2:30 PM",
        doctor: "Dr. James Wilson",
        type: "Check-up",
        status: "Completed",
        notes: "Blood pressure slightly elevated. Adjusted medication dosage.",
      },
      {
        date: "2025-02-15",
        time: "11:15 AM",
        doctor: "Dr. Lisa Chen",
        type: "Consultation",
        status: "Completed",
        notes: "Referred to cardiologist for further evaluation.",
      },
    ],
    compliance: 85,
    avatar: "/placeholder.svg?height=128&width=128",
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/clinic-portal">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portal
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Patient Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <Badge className="bg-green-500">Active Patient</Badge>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={patient.avatar} alt={patient.name} />
                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{patient.name}</h2>

              <p className="text-muted-foreground">
                {patient.age}, {patient.gender}
              </p>
              <div className="mt-2 flex items-center">
                <Badge variant="outline" className="mr-2">
                  {patient.bloodType}
                </Badge>
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
            </CardContent>
            <CardFooter className="flex justify-center gap-2 pt-0">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Video Call
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="text-sm text-muted-foreground">Date of Birth</div>
                <div>{new Date(patient.dateOfBirth).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div>{patient.email}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div>{patient.phone}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Address</div>
                <div>{patient.address}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Allergies</CardTitle>
            </CardHeader>
            <CardContent>
              {patient.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No known allergies</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Medications</CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {patient.medications.map((medication, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 mt-1 bg-blue-100 p-1 rounded-full">
                    <Pill className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{medication.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {medication.dosage}, {medication.frequency}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs</CardTitle>
              <CardDescription>Real-time monitoring from Life Suit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Heart className="h-6 w-6 text-red-500 mb-2" />
                  <div className="text-sm text-muted-foreground">Heart Rate</div>
                  <div className="text-2xl font-bold">{patient.vitalSigns.heartRate}</div>
                  <div className="text-xs text-muted-foreground">BPM</div>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Activity className="h-6 w-6 text-blue-500 mb-2" />
                  <div className="text-sm text-muted-foreground">Blood Pressure</div>
                  <div className="text-2xl font-bold">{patient.vitalSigns.bloodPressure}</div>
                  <div className="text-xs text-muted-foreground">mmHg</div>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Thermometer className="h-6 w-6 text-yellow-500 mb-2" />
                  <div className="text-sm text-muted-foreground">Temperature</div>
                  <div className="text-2xl font-bold">{patient.vitalSigns.temperature}</div>
                  <div className="text-xs text-muted-foreground">°F</div>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Droplets className="h-6 w-6 text-green-500 mb-2" />
                  <div className="text-sm text-muted-foreground">Oxygen Level</div>
                  <div className="text-2xl font-bold">{patient.vitalSigns.oxygenLevel}</div>
                  <div className="text-xs text-muted-foreground">%</div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="relative h-[200px] rounded-lg overflow-hidden">
            <Image src="/images/patient-consultation.png" alt="Patient Consultation" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
              <div className="p-6 text-white max-w-md">
                <h2 className="text-xl font-bold mb-2">Remote Monitoring Active</h2>
                <p className="mb-4 text-sm">
                  This patient is using the Life Suit for continuous health monitoring. You'll receive alerts if any
                  vital signs go outside normal ranges.
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  View Life Suit Data
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="appointments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
              <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
              <TabsTrigger value="treatment">Treatment Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Appointment History</h3>
                <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New
                </Button>
              </div>

              <div className="space-y-4">
                {patient.appointments.map((appointment, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                          <CardTitle className="text-base">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </CardTitle>
                        </div>
                        <Badge
                          className={
                            appointment.status === "Scheduled"
                              ? "bg-blue-500"
                              : appointment.status === "Completed"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {appointment.type} with {appointment.doctor}
                      </CardDescription>
                    </CardHeader>
                    {appointment.notes && (
                      <CardContent>
                        <div className="text-sm border-l-2 border-blue-200 pl-3">{appointment.notes}</div>
                      </CardContent>
                    )}
                    {appointment.status === "Scheduled" && (
                      <CardFooter className="pt-0">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            Cancel
                          </Button>
                        </div>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="medical-records" className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Medical Records</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Record
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium">Blood Test Results</div>
                      <div className="text-xs text-muted-foreground">Uploaded on Apr 1, 2025</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium">Echocardiogram Report</div>
                      <div className="text-xs text-muted-foreground">Uploaded on Mar 15, 2025</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium">Annual Physical Results</div>
                      <div className="text-xs text-muted-foreground">Uploaded on Feb 10, 2025</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="Add clinical notes here..."
                  className="min-h-[150px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <Button className="bg-blue-600 hover:bg-blue-700">Save Notes</Button>
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Previous Notes</h3>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Follow-up Consultation</CardTitle>
                      <div className="text-sm text-muted-foreground">Apr 1, 2025</div>
                    </div>
                    <CardDescription>Dr. James Wilson</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Patient reports feeling better after medication adjustment. Blood pressure readings have improved
                      but still monitoring closely. Recommended continued use of home BP monitor and logging readings
                      daily.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Initial Consultation</CardTitle>
                      <div className="text-sm text-muted-foreground">Mar 15, 2025</div>
                    </div>
                    <CardDescription>Dr. Lisa Chen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Patient presented with elevated blood pressure readings over the past month. Family history of
                      hypertension. Started on Lisinopril 10mg daily. Discussed lifestyle modifications including
                      reduced sodium intake and regular exercise.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="treatment" className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Current Treatment Plan</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Update Plan
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Hypertension Management</CardTitle>
                  <CardDescription>Last updated: Apr 1, 2025</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Medications</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Lisinopril 10mg once daily</li>
                      <li>Amlodipine 5mg once daily</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Lifestyle Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>DASH diet (low sodium, high in fruits and vegetables)</li>
                      <li>30 minutes of moderate exercise 5 days per week</li>
                      <li>Limit alcohol consumption</li>
                      <li>Daily blood pressure monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Follow-up Schedule</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Blood pressure check every 2 weeks</li>
                      <li>Office visit in 1 month</li>
                      <li>Blood work in 3 months</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
