"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, Menu, X, User } from "lucide-react"
import LogoutButton from "./logout-button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const authToken = document.cookie.split("; ").find((row) => row.startsWith("auth_token="))

      setIsLoggedIn(!!authToken)
    }

    checkAuth()

    // Listen for storage events (for when logout happens in another tab)
    window.addEventListener("storage", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
    }
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl hidden md:inline-block">MY HEALTH</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-blue-600" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/features"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/features") ? "text-blue-600" : "text-muted-foreground"
            }`}
          >
            Features
          </Link>
          <Link
            href="/devices"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/devices") ? "text-blue-600" : "text-muted-foreground"
            }`}
          >
            Devices
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/pricing") ? "text-blue-600" : "text-muted-foreground"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/about") ? "text-blue-600" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/contact") ? "text-blue-600" : "text-muted-foreground"
            }`}
          >
            Contact
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Portals
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/patient-portal">Patient Portal</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/doctors-portal">Doctors Portal</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/clinics-portal">Clinics Portal</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <LogoutButton />
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" size="sm" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-blue-600" : "text-muted-foreground"
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/features"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/features") ? "text-blue-600" : "text-muted-foreground"
                }`}
                onClick={closeMenu}
              >
                Features
              </Link>
              <Link
                href="/devices"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/devices") ? "text-blue-600" : "text-muted-foreground"
                }`}
                onClick={closeMenu}
              >
                Devices
              </Link>
              <Link
                href="/pricing"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/pricing") ? "text-blue-600" : "text-muted-foreground"
                }`}
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/about") ? "text-blue-600" : "text-muted-foreground"
                }`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/contact") ? "text-blue-600" : "text-muted-foreground"
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>

              <div className="pt-2 border-t">
                <p className="text-sm font-medium mb-2">Portals</p>
                <div className="space-y-2 pl-2">
                  <Link
                    href="/patient-portal"
                    className="block text-sm text-muted-foreground hover:text-primary"
                    onClick={closeMenu}
                  >
                    Patient Portal
                  </Link>
                  <Link
                    href="/doctors-portal"
                    className="block text-sm text-muted-foreground hover:text-primary"
                    onClick={closeMenu}
                  >
                    Doctors Portal
                  </Link>
                  <Link
                    href="/clinics-portal"
                    className="block text-sm text-muted-foreground hover:text-primary"
                    onClick={closeMenu}
                  >
                    Clinics Portal
                  </Link>
                </div>
              </div>
            </nav>

            <div className="pt-4 border-t flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={closeMenu}
                  >
                    Settings
                  </Link>
                  <div className="pt-2">
                    <LogoutButton variant="outline" className="w-full" />
                  </div>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/login" onClick={closeMenu}>
                      Login
                    </Link>
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/register" onClick={closeMenu}>
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
