import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getUserRoleFromToken, hasAccessToPath } from "./lib/auth"

// Define the paths that require authentication
const PROTECTED_PATHS = ["/patient-portal", "/doctors-portal", "/clinics-portal", "/admin-portal"]

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

    // Get user role from token
    const userRole = getUserRoleFromToken(authToken)

    // Check if user has access to this path
    const hasAccess = hasAccessToPath(userRole, pathname)

    if (!hasAccess) {
      // Redirect to unauthorized page
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  return NextResponse.next()
}

// Add pharmacy portal to protected routes
export const config = {
  matcher: [
    "/patient-portal/:path*",
    "/doctors-portal/:path*",
    "/clinics-portal/:path*",
    "/pharmacy-portal/:path*",
    "/unauthorized",
  ],
}
