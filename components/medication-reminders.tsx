import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Pill } from "lucide-react"

export default function MedicationReminders() {
  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      time: "8:00 AM",
      taken: true,
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      time: "12:00 PM",
      taken: false,
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      time: "8:00 PM",
      taken: false,
    },
  ]

  return (
    <div className="space-y-4">
      {medications.map((medication) => (
        <div key={medication.id} className="flex items-center space-x-4 rounded-md border p-3">
          <div className="flex-shrink-0">
            <Checkbox id={`medication-${medication.id}`} checked={medication.taken} />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center">
              <label
                htmlFor={`medication-${medication.id}`}
                className={`text-sm font-medium leading-none ${
                  medication.taken ? "line-through text-muted-foreground" : ""
                }`}
              >
                {medication.name}
              </label>
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{medication.dosage}</span>
            </div>
            <div className="flex items-center pt-1">
              <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{medication.time}</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Pill className={`h-4 w-4 ${medication.taken ? "text-muted-foreground" : "text-blue-500"}`} />
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        Manage Medications
      </Button>
    </div>
  )
}
