"use client"

import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamic import with SSR disabled for the register form
const RegisterFormNoSSR = dynamic(() => import("./register-form"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
})

export default function RegisterClient() {
  return <RegisterFormNoSSR />
}
