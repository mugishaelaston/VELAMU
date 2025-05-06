import { Loader2 } from "lucide-react"

// Completely disable SSR for the register form
const RegisterFormNoSSR = dynamic(() => import("./register-form"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
})

// This is a static page that doesn't depend on any dynamic data
export const dynamic = "force-static"

export default function RegisterPage() {
  return <RegisterFormNoSSR />
}
