"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, User, Stethoscope, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterClinicPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Clinic Information
    clinicName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    description: "",

    // Admin Information
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPhone: "",
    adminPassword: "",
    adminConfirmPassword: "",

    // Additional Details
    specialties: [] as string[],
    numberOfDoctors: "",
    establishedYear: "",
    acceptingNewPatients: true,
    insuranceAccepted: [] as string[],

    // Terms
    agreeTerms: false,
    agreePrivacy: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.clinicName.trim()) newErrors.clinicName = "Clinic name is required"
      if (!formData.address.trim()) newErrors.address = "Address is required"
      if (!formData.city.trim()) newErrors.city = "City is required"
      if (!formData.state.trim()) newErrors.state = "State is required"
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
    }

    if (step === 2) {
      if (!formData.adminFirstName.trim()) newErrors.adminFirstName = "First name is required"
      if (!formData.adminLastName.trim()) newErrors.adminLastName = "Last name is required"
      if (!formData.adminEmail.trim()) {
        newErrors.adminEmail = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
        newErrors.adminEmail = "Email is invalid"
      }
      if (!formData.adminPassword) {
        newErrors.adminPassword = "Password is required"
      } else if (formData.adminPassword.length < 8) {
        newErrors.adminPassword = "Password must be at least 8 characters"
      }
      if (formData.adminPassword !== formData.adminConfirmPassword) {
        newErrors.adminConfirmPassword = "Passwords do not match"
      }
    }

    if (step === 3) {
      if (!formData.numberOfDoctors.trim()) newErrors.numberOfDoctors = "Number of doctors is required"
      if (!formData.establishedYear.trim()) newErrors.establishedYear = "Established year is required"
    }

    if (step === 4) {
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = "You must agree to the terms and conditions"
      }
      if (!formData.agreePrivacy) {
        newErrors.agreePrivacy = "You must agree to the privacy policy"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(currentStep)) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to clinics portal after successful registration
      router.push("/clinics-portal")
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ form: "Registration failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image and Info */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-900/90 z-10"></div>
        <Image
          src="/images/medical-team.png"
          alt="Medical team"
          fill
          className="object-cover object-center opacity-80 z-0"
        />
        <div className="relative z-20 flex flex-col justify-center items-center p-12 text-white">
          <h1 className="text-4xl font-bold mb-6">Register Your Clinic</h1>
          <p className="text-xl mb-8 max-w-md text-center">
            Join MY HEALTH network and provide your patients with the best healthcare experience
          </p>

          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep >= 1 ? "bg-white text-blue-600" : "bg-blue-400 text-white"}`}
                >
                  1
                </div>
                <span className={currentStep >= 1 ? "font-semibold" : ""}>Clinic Information</span>
              </div>
              <div className="h-12 border-l-2 border-blue-400 ml-4"></div>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep >= 2 ? "bg-white text-blue-600" : "bg-blue-400 text-white"}`}
                >
                  2
                </div>
                <span className={currentStep >= 2 ? "font-semibold" : ""}>Admin Account</span>
              </div>
              <div className="h-12 border-l-2 border-blue-400 ml-4"></div>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep >= 3 ? "bg-white text-blue-600" : "bg-blue-400 text-white"}`}
                >
                  3
                </div>
                <span className={currentStep >= 3 ? "font-semibold" : ""}>Additional Details</span>
              </div>
              <div className="h-12 border-l-2 border-blue-400 ml-4"></div>
            </div>

            <div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep >= 4 ? "bg-white text-blue-600" : "bg-blue-400 text-white"}`}
                >
                  4
                </div>
                <span className={currentStep >= 4 ? "font-semibold" : ""}>Review & Submit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center mb-2">
              <Building2 className="h-6 w-6 mr-2 text-blue-600" />
              <CardTitle className="text-2xl">Clinic Registration</CardTitle>
            </div>
            <CardDescription>
              {currentStep === 1 && "Enter your clinic's basic information"}
              {currentStep === 2 && "Create an administrator account for your clinic"}
              {currentStep === 3 && "Tell us more about your clinic's services"}
              {currentStep === 4 && "Review your information and complete registration"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Clinic Information */}
              {currentStep === 1 && (
                <>
                  <Alert className="bg-blue-50 border-blue-200 mb-6">
                    <AlertDescription className="text-blue-800">
                      Please start by entering your clinic's name and basic information.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="clinicName" className="text-lg font-medium">
                      What is your clinic's name? *
                    </Label>
                    <Input
                      id="clinicName"
                      name="clinicName"
                      placeholder="Enter your clinic's name"
                      value={formData.clinicName}
                      onChange={handleChange}
                      className={`text-lg ${errors.clinicName ? "border-red-500" : ""}`}
                      autoFocus
                    />
                    {errors.clinicName && <p className="text-red-500 text-xs">{errors.clinicName}</p>}
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        className={errors.state ? "border-red-500" : ""}
                      />
                      {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={errors.zipCode ? "border-red-500" : ""}
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        className={errors.country ? "border-red-500" : ""}
                      />
                      {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="clinic@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://www.yourclinic.com"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Clinic Description (Optional)</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell us about your clinic..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                </>
              )}

              {/* Step 2: Admin Account */}
              {currentStep === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminFirstName">First Name *</Label>
                      <Input
                        id="adminFirstName"
                        name="adminFirstName"
                        placeholder="First name"
                        value={formData.adminFirstName}
                        onChange={handleChange}
                        className={errors.adminFirstName ? "border-red-500" : ""}
                      />
                      {errors.adminFirstName && <p className="text-red-500 text-xs">{errors.adminFirstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminLastName">Last Name *</Label>
                      <Input
                        id="adminLastName"
                        name="adminLastName"
                        placeholder="Last name"
                        value={formData.adminLastName}
                        onChange={handleChange}
                        className={errors.adminLastName ? "border-red-500" : ""}
                      />
                      {errors.adminLastName && <p className="text-red-500 text-xs">{errors.adminLastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email Address *</Label>
                    <Input
                      id="adminEmail"
                      name="adminEmail"
                      type="email"
                      placeholder="admin@example.com"
                      value={formData.adminEmail}
                      onChange={handleChange}
                      className={errors.adminEmail ? "border-red-500" : ""}
                    />
                    {errors.adminEmail && <p className="text-red-500 text-xs">{errors.adminEmail}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminPhone">Phone Number (Optional)</Label>
                    <Input
                      id="adminPhone"
                      name="adminPhone"
                      placeholder="(555) 123-4567"
                      value={formData.adminPhone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Password *</Label>
                    <Input
                      id="adminPassword"
                      name="adminPassword"
                      type="password"
                      value={formData.adminPassword}
                      onChange={handleChange}
                      className={errors.adminPassword ? "border-red-500" : ""}
                    />
                    {errors.adminPassword && <p className="text-red-500 text-xs">{errors.adminPassword}</p>}
                    <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminConfirmPassword">Confirm Password *</Label>
                    <Input
                      id="adminConfirmPassword"
                      name="adminConfirmPassword"
                      type="password"
                      value={formData.adminConfirmPassword}
                      onChange={handleChange}
                      className={errors.adminConfirmPassword ? "border-red-500" : ""}
                    />
                    {errors.adminConfirmPassword && (
                      <p className="text-red-500 text-xs">{errors.adminConfirmPassword}</p>
                    )}
                  </div>
                </>
              )}

              {/* Step 3: Additional Details */}
              {currentStep === 3 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="specialties">Specialties (Select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "General Practice",
                        "Pediatrics",
                        "Cardiology",
                        "Dermatology",
                        "Orthopedics",
                        "Neurology",
                        "Gynecology",
                        "Ophthalmology",
                      ].map((specialty) => (
                        <div key={specialty} className="flex items-center space-x-2">
                          <Checkbox
                            id={`specialty-${specialty}`}
                            checked={formData.specialties.includes(specialty)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData((prev) => ({
                                  ...prev,
                                  specialties: [...prev.specialties, specialty],
                                }))
                              } else {
                                setFormData((prev) => ({
                                  ...prev,
                                  specialties: prev.specialties.filter((s) => s !== specialty),
                                }))
                              }
                            }}
                          />
                          <label
                            htmlFor={`specialty-${specialty}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {specialty}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="numberOfDoctors">Number of Doctors *</Label>
                      <Input
                        id="numberOfDoctors"
                        name="numberOfDoctors"
                        type="number"
                        min="1"
                        placeholder="e.g., 5"
                        value={formData.numberOfDoctors}
                        onChange={handleChange}
                        className={errors.numberOfDoctors ? "border-red-500" : ""}
                      />
                      {errors.numberOfDoctors && <p className="text-red-500 text-xs">{errors.numberOfDoctors}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="establishedYear">Year Established *</Label>
                      <Input
                        id="establishedYear"
                        name="establishedYear"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        placeholder="e.g., 2010"
                        value={formData.establishedYear}
                        onChange={handleChange}
                        className={errors.establishedYear ? "border-red-500" : ""}
                      />
                      {errors.establishedYear && <p className="text-red-500 text-xs">{errors.establishedYear}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptingNewPatients"
                        checked={formData.acceptingNewPatients}
                        onCheckedChange={(checked) => {
                          handleCheckboxChange("acceptingNewPatients", checked === true)
                        }}
                      />
                      <label
                        htmlFor="acceptingNewPatients"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Currently accepting new patients
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insuranceAccepted">Insurance Plans Accepted (Select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "Medicare",
                        "Medicaid",
                        "Blue Cross",
                        "Aetna",
                        "Cigna",
                        "UnitedHealthcare",
                        "Humana",
                        "Kaiser",
                      ].map((insurance) => (
                        <div key={insurance} className="flex items-center space-x-2">
                          <Checkbox
                            id={`insurance-${insurance}`}
                            checked={formData.insuranceAccepted.includes(insurance)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData((prev) => ({
                                  ...prev,
                                  insuranceAccepted: [...prev.insuranceAccepted, insurance],
                                }))
                              } else {
                                setFormData((prev) => ({
                                  ...prev,
                                  insuranceAccepted: prev.insuranceAccepted.filter((i) => i !== insurance),
                                }))
                              }
                            }}
                          />
                          <label
                            htmlFor={`insurance-${insurance}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {insurance}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                        Clinic Information
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Clinic Name</p>
                          <p className="font-medium">{formData.clinicName}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="font-medium">{formData.phone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Website</p>
                          <p className="font-medium">{formData.website || "Not provided"}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Address</p>
                          <p className="font-medium">
                            {formData.address}, {formData.city}, {formData.state} {formData.zipCode}, {formData.country}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        Administrator
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Name</p>
                          <p className="font-medium">
                            {formData.adminFirstName} {formData.adminLastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="font-medium">{formData.adminEmail}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="font-medium">{formData.adminPhone || "Not provided"}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                        Clinic Details
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Number of Doctors</p>
                          <p className="font-medium">{formData.numberOfDoctors}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Year Established</p>
                          <p className="font-medium">{formData.establishedYear}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Accepting New Patients</p>
                          <p className="font-medium">{formData.acceptingNewPatients ? "Yes" : "No"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Specialties</p>
                          <p className="font-medium">
                            {formData.specialties.length > 0 ? formData.specialties.join(", ") : "None selected"}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Insurance Accepted</p>
                          <p className="font-medium">
                            {formData.insuranceAccepted.length > 0
                              ? formData.insuranceAccepted.join(", ")
                              : "None selected"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => {
                            handleCheckboxChange("agreeTerms", checked === true)
                          }}
                        />
                        <label
                          htmlFor="agreeTerms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            terms and conditions
                          </Link>
                        </label>
                      </div>
                      {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms}</p>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreePrivacy"
                          checked={formData.agreePrivacy}
                          onCheckedChange={(checked) => {
                            handleCheckboxChange("agreePrivacy", checked === true)
                          }}
                        />
                        <label
                          htmlFor="agreePrivacy"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <Link href="/privacy" className="text-blue-600 hover:underline">
                            privacy policy
                          </Link>
                        </label>
                      </div>
                      {errors.agreePrivacy && <p className="text-red-500 text-xs">{errors.agreePrivacy}</p>}
                    </div>

                    {errors.form && (
                      <div className="bg-red-50 p-3 rounded border border-red-200">
                        <p className="text-red-600 text-sm">{errors.form}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handlePrevStep}>
                Previous
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
            )}
            {currentStep < 4 ? (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Registering..." : "Complete Registration"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
