import { HeartbeatThrobber } from "@/components/heartbeat-throbber"

export default function RootLoading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 z-50">
      <HeartbeatThrobber size="xl" showText />
      <p className="mt-4 text-xl font-medium text-blue-800">Loading...</p>
    </div>
  )
}
