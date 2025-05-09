"use client"

import { useState, useEffect } from "react"
import { HeartbeatThrobber } from "./heartbeat-throbber"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface SplashScreenProps {
  duration?: number
  redirectTo?: string
  onComplete?: () => void
}

export function SplashScreen({ duration = 5000, redirectTo = "/", onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateProgress = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)

      setProgress(newProgress)

      if (currentTime < endTime) {
        requestAnimationFrame(updateProgress)
      } else {
        if (onComplete) {
          onComplete()
        } else if (redirectTo) {
          router.push(redirectTo)
        }
      }
    }

    const animationId = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [duration, redirectTo, router, onComplete])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 z-50">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-8">
          <Image
            src="/images/my-health-logo.png"
            alt="MY HEALTH"
            width={200}
            height={200}
            priority
            className="animate-pulse"
          />
        </div>

        <HeartbeatThrobber size="xl" showText />

        <p className="mt-4 text-xl font-medium text-blue-800">Starting MY HEALTH...</p>

        <div className="w-full mt-8 bg-blue-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="mt-2 text-sm text-blue-600">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}
