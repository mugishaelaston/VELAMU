import { HeartbeatThrobber } from "@/components/heartbeat-throbber"

export default function ClinicsPortalLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <HeartbeatThrobber size="lg" showText />
      <p className="mt-4 text-muted-foreground">Loading Clinics Portal...</p>
    </div>
  )
}
