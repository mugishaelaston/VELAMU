import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define the paths that require authentication
const PROTECTED_PATHS = ["/patient-portal", "/doctors-portal", "/clinics-portal", "/admin-portal"]

// Define the paths that require specific roles
const ROLE_PATHS = {
  patient: ["/patient-portal"],
  doctor: ["/doctors-portal"],
  clinic: ["/clinics-portal"],
  admin: ["/admin-portal"],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path))

  if (isProtectedPath) {
    // Check if user is authenticated
    const authToken = request.cookies.get("auth_token")?.value

    if (!authToken) {
      // Redirect to login page if not authenticated
      const url = new URL("/login", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }

    // In a real app, you would verify the token and check the user's role
    // For this example, we'll simulate role checking

    // Simulate getting user role from token
    const userRole = getUserRoleFromToken(authToken)

    // Check if user has access to this path
    const hasAccess = checkRoleAccess(userRole, pathname)

    if (!hasAccess) {
      // Redirect to unauthorized page
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  return NextResponse.next()
}

// Simulate getting user role from token
function getUserRoleFromToken(token: string): string {
  // In a real app, you would decode and verify the JWT token
  // For this example, we'll use a simple check based on the token value
  if (token === "patient_token") return "patient"
  if (token === "doctor_token") return "doctor"
  if (token === "clinic_token") return "clinic"
  if (token === "admin_token") return "admin"

  // Default role
  return "patient"
}

// Check if the user's role has access to the path
function checkRoleAccess(role: string, pathname: string): boolean {
  // Check if the path is restricted to specific roles
  for (const [roleKey, paths] of Object.entries(ROLE_PATHS)) {
    if (paths.some((path) => pathname.startsWith(path))) {
      // This path is restricted to a specific role
      return role === roleKey
    }
  }

  // If not specifically restricted, allow access
  return true
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - login, register pages
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|login|register).*)",
  ],
}
