import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video } from "lucide-react"

export default function UpcomingAppointments() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "May 15, 2025",
      time: "10:00 AM",
      type: "Video Consultation",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Practitioner",
      date: "May 22, 2025",
      time: "2:30 PM",
      type: "In-person",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      date: "June 5, 2025",
      time: "11:15 AM",
      type: "Video Consultation",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-start space-x-4 rounded-md border p-3">
          <Avatar>
            <AvatarImage src={appointment.avatar} alt={appointment.doctor} />
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
              <span className="text-xs text-muted-foreground">{appointment.date}</span>
              <Clock className="ml-3 mr-1 h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{appointment.time}</span>
              {appointment.type === "Video Consultation" && (
                <>
                  <Video className="ml-3 mr-1 h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Video</span>
                </>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm">
            {appointment.type === "Video Consultation" ? "Join" : "Details"}
          </Button>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Appointments
      </Button>
    </div>
  )
}
