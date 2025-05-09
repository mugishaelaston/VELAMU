"use client"

import { useEffect } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { useRouter } from "next/navigation"

export default function SplashPage() {
  const router = useRouter()

  // This ensures the splash screen is shown even on direct navigation
  useEffect(() => {
    // Clear any existing initialization flag to force splash screen
    sessionStorage.removeItem("app_initialized")
  }, [])

  return <SplashScreen duration={5000} redirectTo="/" />
}
