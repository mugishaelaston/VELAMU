// Authentication utilities for MY HEALTH application

import { cookies } from "next/headers"

// Types for authentication
export type UserRole = "patient" | "doctor" | "clinic" | "admin"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

// Function to check if user is authenticated
export function isAuthenticated(): boolean {
  const cookieStore = cookies()
  const authToken = cookieStore.get("auth_token")

  return !!authToken?.value
}

// Function to get the current user from the auth token
export function getCurrentUser(): AuthUser | null {
  const cookieStore = cookies()
  const authToken = cookieStore.get("auth_token")

  if (!authToken?.value) {
    return null
  }

  try {
    // In a real app, you would decode and verify a JWT token
    // For this example, we'll use a simple approach based on the token value
    const role = getUserRoleFromToken(authToken.value)

    // Return mock user data based on role
    return {
      id: `user-${Date.now()}`,
      name:
        role === "patient"
          ? "John Smith"
          : role === "doctor"
            ? "Dr. Sarah Johnson"
            : role === "clinic"
              ? "HealthFirst Admin"
              : "System Admin",
      email: `${role}@example.com`,
      role: role,
    }
  } catch (error) {
    console.error("Error parsing auth token:", error)
    return null
  }
}

// Function to get user role from token (simplified for demo)
export function getUserRoleFromToken(token: string): UserRole {
  // In a real app, you would decode and verify the JWT token
  // For this example, we'll use a simple check based on the token value
  if (token.includes("patient")) return "patient"
  if (token.includes("doctor")) return "doctor"
  if (token.includes("clinic")) return "clinic"
  if (token.includes("admin")) return "admin"

  // Default role
  return "patient"
}

// Function to check if a user has access to a specific path
export function hasAccessToPath(role: UserRole, pathname: string): boolean {
  // Define path restrictions based on roles
  const ROLE_PATHS: Record<UserRole, string[]> = {
    patient: ["/patient-portal"],
    doctor: ["/doctors-portal"],
    clinic: ["/clinics-portal"],
    admin: ["/admin-portal", "/patient-portal", "/doctors-portal", "/clinics-portal"],
  }

  // Check if the path is restricted to this role
  return ROLE_PATHS[role].some((path) => pathname.startsWith(path))
}
