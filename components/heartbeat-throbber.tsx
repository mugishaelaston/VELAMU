"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"

interface HeartbeatThrobberProps {
  className?: string
  size?: "sm" | "md" | "lg"
  color?: string
  showText?: boolean
}

export function HeartbeatThrobber({
  className,
  size = "md",
  color = "text-blue-600",
  showText = false,
}: HeartbeatThrobberProps) {
  const [beat, setBeat] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBeat((prev) => !prev)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Heart
        className={cn(sizeClasses[size], color, "transition-transform duration-300", beat ? "scale-125" : "scale-100")}
        fill={beat ? "currentColor" : "none"}
      />
      {showText && <span className="text-sm font-medium">Loading...</span>}
    </div>
  )
}
