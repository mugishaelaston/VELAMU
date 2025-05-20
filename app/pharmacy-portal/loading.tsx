import { HeartbeatThrobber } from "@/components/heartbeat-throbber"

export default function PharmacyPortalLoading() {
  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <HeartbeatThrobber size="lg" showText={true} text="Loading Pharmacy Portal..." />
    </div>
  )
}
