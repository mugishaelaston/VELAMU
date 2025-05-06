import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MessageSquare, Star, Video } from "lucide-react"

export default function DoctorsPage() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.9,
      reviews: 124,
      availability: "Available Today",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "General Practitioner",
      experience: "10 years",
      rating: 4.7,
      reviews: 98,
      availability: "Available Tomorrow",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      experience: "12 years",
      rating: 4.8,
      reviews: 112,
      availability: "Available Today",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Dermatologist",
      experience: "8 years",
      rating: 4.6,
      reviews: 87,
      availability: "Available Today",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Dr. Olivia Martinez",
      specialty: "Pediatrician",
      experience: "14 years",
      rating: 4.9,
      reviews: 156,
      availability: "Available Tomorrow",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      specialty: "Orthopedic Surgeon",
      experience: "18 years",
      rating: 4.8,
      reviews: 132,
      availability: "Available Next Week",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>

      <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-6 mb-8">
        <div className="md:col-span-2 lg:col-span-3">
          <Input placeholder="Search by name, specialty, or condition" />
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button className="w-full">Search</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                <AvatarFallback>
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{doctor.name}</CardTitle>
                <CardDescription>{doctor.specialty}</CardDescription>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p>
                  <span className="font-medium">Experience:</span> {doctor.experience}
                </p>
                <p className="mt-1">
                  <span className="font-medium">Availability:</span> {doctor.availability}
                </p>
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
              <Button size="sm">
                <Video className="h-4 w-4 mr-2" />
                Consult
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
