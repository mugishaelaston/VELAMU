"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SplashScreen } from "./splash-screen"

interface AppInitializerProps {
  children: React.ReactNode
}

export function AppInitializer({ children }: AppInitializerProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  // Check if this is the first load of the session
  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("app_initialized")
    if (hasLoadedBefore) {
      setShowSplash(false)
      setIsFirstLoad(false)
    } else {
      sessionStorage.setItem("app_initialized", "true")
    }
  }, [])

  if (showSplash && isFirstLoad) {
    return <SplashScreen duration={5000} onComplete={() => setShowSplash(false)} />
  }

  return <>{children}</>
}
