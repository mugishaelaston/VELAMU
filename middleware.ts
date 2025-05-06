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

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
