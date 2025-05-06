import { MapPin, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface Location {
  lat: number
  lng: number
  lastUpdated: string
}

interface Patient {
  id: string
  name: string
  status: "Stable" | "Needs Attention" | "Critical" | "Improving"
  location?: Location
}

interface MapPlaceholderProps {
  patients: Patient[]
}

export function MapPlaceholder({ patients }: MapPlaceholderProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Maps Feature Coming Soon</AlertTitle>
        <AlertDescription>
          The patient location tracking feature will be available once Google Maps integration is set up.
        </AlertDescription>
      </Alert>

      <div className="flex-1 border rounded-lg bg-gray-50 p-4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Patient Locations (List View)</h3>
          <Button variant="outline" size="sm" disabled>
            <MapPin className="h-4 w-4 mr-2" />
            Enable Maps
          </Button>
        </div>

        {patients.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-muted-foreground">No patients with location data available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {patients.map((patient) => (
              <Card key={patient.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{patient.name}</h4>
                    <p
                      className={`text-sm ${
                        patient.status === "Critical"
                          ? "text-red-500"
                          : patient.status === "Needs Attention"
                            ? "text-yellow-500"
                            : "text-green-500"
                      }`}
                    >
                      {patient.status}
                    </p>
                    {patient.location && (
                      <div className="text-sm text-muted-foreground mt-1">
                        <p>
                          Coordinates: {patient.location.lat.toFixed(4)}, {patient.location.lng.toFixed(4)}
                        </p>
                        <p>Last updated: {new Date(patient.location.lastUpdated).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
