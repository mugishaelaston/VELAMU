import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json()

    // In a real app, you would validate credentials against a database
    // For this example, we'll accept any non-empty email and password
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Generate a token based on user type
    // In a real app, this would be a JWT with proper encryption
    const token = `${userType}_token_${Date.now()}`

    // Set the auth cookie
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return NextResponse.json({
      success: true,
      userType,
      redirectTo:
        userType === "patient"
          ? "/patient-portal"
          : userType === "doctor"
            ? "/doctors-portal"
            : userType === "clinic"
              ? "/clinics-portal"
              : "/admin-portal",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
