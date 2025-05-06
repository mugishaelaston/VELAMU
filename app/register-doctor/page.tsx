"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Stethoscope, Building2, Calendar, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterDoctorPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    password: "",
    confirmPassword: "",

    // Professional Information
    specialty: "",
    licenseNumber: "",
    npiNumber: "",
    yearsOfExperience: "",
    medicalSchool: "",
    graduationYear: "",
    boardCertifications: [] as string[],
    languages: [] as string[],

    // Clinic Information
    clinicName: "",
    clinicAddress: "",
    clinicCity: "",
    clinicState: "",
    clinicZipCode: "",
    clinicPhone: "",
    clinicEmail: "",

    // Schedule & Availability
    availableDays: [] as string[],
    startTime: "",
    endTime: "",
    appointmentDuration: "30",
    acceptingNewPatients: true,

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

  const handleSelectChange = (name: string, value: string) => {
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

  const handleArrayCheckboxChange = (arrayName: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentArray = prev[arrayName as keyof typeof prev] as string[]

      if (checked) {
        return {
          ...prev,
          [arrayName]: [...currentArray, value],
        }
      } else {
        return {
          ...prev,
          [arrayName]: currentArray.filter((item) => item !== value),
        }
      }
    })
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.password) {
        newErrors.password = "Password is required"
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    if (step === 2) {
      if (!formData.specialty.trim()) newErrors.specialty = "Specialty is required"
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required"
      if (!formData.yearsOfExperience.trim()) newErrors.yearsOfExperience = "Years of experience is required"
    }

    if (step === 3) {
      if (!formData.clinicName.trim()) newErrors.clinicName = "Clinic name is required"
      if (!formData.clinicAddress.trim()) newErrors.clinicAddress = "Clinic address is required"
      if (!formData.clinicCity.trim()) newErrors.clinicCity = "Clinic city is required"
      if (!formData.clinicState.trim()) newErrors.clinicState = "Clinic state is required"
      if (!formData.clinicPhone.trim()) newErrors.clinicPhone = "Clinic phone is required"
    }

    if (step === 4) {
      if (formData.availableDays.length === 0) {
        newErrors.availableDays = "Please select at least one available day"
      }
      if (!formData.startTime.trim()) newErrors.startTime = "Start time is required"
      if (!formData.endTime.trim()) newErrors.endTime = "End time is required"
    }

    if (step === 5) {
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

      // Redirect to doctors portal after successful registration
      router.push("/doctors-portal")
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
          src="/images/doctor-patient.png"
          alt="Doctor with patient"
          fill
          className="object-cover object-center opacity-80 z-0"
        />
        <div className="relative z-20 flex flex-col justify-center items-center p-12 text-white">
          <h1 className="text-4xl font-bold mb-6">Join MY HEALTH Network</h1>
          <p className="text-xl mb-8 max-w-md text-center">
            Connect with patients and provide exceptional care with our comprehensive healthcare platform
          </p>

          <div className="w-full max-w-md">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep >= 1 ? "bg-white text-blue-600" : "bg-blue-400 text-white"}`}
                >
                  1
                </div>
                <span className={currentStep >= 1 ? "font-semibold" : ""}>Personal Information</span>
              </div>
              <div className="h-8 border-l-2 border-blue-400 ml-4"></div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep >= 2 ? "bg-white text-blue-600" : "bg-blue-400 text-white"}`}
                >
                  2
                </div>
                <span className={currentStep >= 2 ? "font-semibold" : ""}>Professional Details</span>
              </div>
              <div className="h-8 border-l-2 border-blue-400 ml-4"></div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep >= 3 ? "bg-white text-blue-600" : "bg-blue-400 text-white"}`}
                >
                  3
                </div>
                <span className={currentStep >= 3 ? "font-semibold" : ""}>Clinic Information</span>
              </div>
              <div className="h-8 border-l-2 border-blue-400 ml-4"></div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep >= 4 ? "bg-white text-blue-600" : "bg-blue-400 text-white"}`}
                >
                  4
                </div>
                <span className={currentStep >= 4 ? "font-semibold" : ""}>Schedule & Availability</span>
              </div>
              <div className="h-8 border-l-2 border-blue-400 ml-4"></div>
            </div>

            <div>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentStep >= 5 ? "bg-white text-blue-600" : "bg-blue-400 text-white"}`}
                >
                  5
                </div>
                <span className={currentStep >= 5 ? "font-semibold" : ""}>Review & Submit</span>
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
              <Stethoscope className="h-6 w-6 mr-2 text-blue-600" />
              <CardTitle className="text-2xl">Doctor Registration</CardTitle>
            </div>
            <CardDescription>
              {currentStep === 1 && "Enter your personal information"}
              {currentStep === 2 && "Tell us about your professional background"}
              {currentStep === 3 && "Provide information about your clinic"}
              {currentStep === 4 && "Set your availability and schedule preferences"}
              {currentStep === 5 && "Review your information and complete registration"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="doctor@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                  </div>
                </>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Medical Specialty *</Label>
                    <Select
                      value={formData.specialty}
                      onValueChange={(value) => handleSelectChange("specialty", value)}
                    >
                      <SelectTrigger className={errors.specialty ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general-practice">General Practice</SelectItem>
                        <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="gynecology">Gynecology</SelectItem>
                        <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="urology">Urology</SelectItem>
                        <SelectItem value="oncology">Oncology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.specialty && <p className="text-red-500 text-xs">{errors.specialty}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Medical License Number *</Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        placeholder="License number"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className={errors.licenseNumber ? "border-red-500" : ""}
                      />
                      {errors.licenseNumber && <p className="text-red-500 text-xs">{errors.licenseNumber}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="npiNumber">NPI Number (if applicable)</Label>
                      <Input
                        id="npiNumber"
                        name="npiNumber"
                        placeholder="NPI number"
                        value={formData.npiNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                      <Input
                        id="yearsOfExperience"
                        name="yearsOfExperience"
                        type="number"
                        min="0"
                        placeholder="e.g., 5"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        className={errors.yearsOfExperience ? "border-red-500" : ""}
                      />
                      {errors.yearsOfExperience && <p className="text-red-500 text-xs">{errors.yearsOfExperience}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Graduation Year</Label>
                      <Input
                        id="graduationYear"
                        name="graduationYear"
                        type="number"
                        min="1950"
                        max={new Date().getFullYear()}
                        placeholder="e.g., 2010"
                        value={formData.graduationYear}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalSchool">Medical School</Label>
                    <Input
                      id="medicalSchool"
                      name="medicalSchool"
                      placeholder="e.g., Harvard Medical School"
                      value={formData.medicalSchool}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="boardCertifications">Board Certifications (Select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "American Board of Internal Medicine",
                        "American Board of Pediatrics",
                        "American Board of Family Medicine",
                        "American Board of Surgery",
                        "American Board of Psychiatry",
                        "American Board of Dermatology",
                      ].map((cert) => (
                        <div key={cert} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cert-${cert}`}
                            checked={formData.boardCertifications.includes(cert)}
                            onCheckedChange={(checked) => {
                              handleArrayCheckboxChange("boardCertifications", cert, checked === true)
                            }}
                          />
                          <label
                            htmlFor={`cert-${cert}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {cert}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="languages">Languages Spoken (Select all that apply)</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        "English",
                        "Spanish",
                        "French",
                        "Mandarin",
                        "Hindi",
                        "Arabic",
                        "Russian",
                        "Portuguese",
                        "Japanese",
                      ].map((lang) => (
                        <div key={lang} className="flex items-center space-x-2">
                          <Checkbox
                            id={`lang-${lang}`}
                            checked={formData.languages.includes(lang)}
                            onCheckedChange={(checked) => {
                              handleArrayCheckboxChange("languages", lang, checked === true)
                            }}
                          />
                          <label
                            htmlFor={`lang-${lang}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {lang}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Clinic Information */}
              {currentStep === 3 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic/Hospital Name *</Label>
                    <Input
                      id="clinicName"
                      name="clinicName"
                      placeholder="Enter your clinic's name"
                      value={formData.clinicName}
                      onChange={handleChange}
                      className={errors.clinicName ? "border-red-500" : ""}
                    />
                    {errors.clinicName && <p className="text-red-500 text-xs">{errors.clinicName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinicAddress">Street Address *</Label>
                    <Input
                      id="clinicAddress"
                      name="clinicAddress"
                      placeholder="123 Main Street"
                      value={formData.clinicAddress}
                      onChange={handleChange}
                      className={errors.clinicAddress ? "border-red-500" : ""}
                    />
                    {errors.clinicAddress && <p className="text-red-500 text-xs">{errors.clinicAddress}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clinicCity">City *</Label>
                      <Input
                        id="clinicCity"
                        name="clinicCity"
                        placeholder="City"
                        value={formData.clinicCity}
                        onChange={handleChange}
                        className={errors.clinicCity ? "border-red-500" : ""}
                      />
                      {errors.clinicCity && <p className="text-red-500 text-xs">{errors.clinicCity}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinicState">State/Province *</Label>
                      <Input
                        id="clinicState"
                        name="clinicState"
                        placeholder="State"
                        value={formData.clinicState}
                        onChange={handleChange}
                        className={errors.clinicState ? "border-red-500" : ""}
                      />
                      {errors.clinicState && <p className="text-red-500 text-xs">{errors.clinicState}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinicZipCode">ZIP/Postal Code *</Label>
                    <Input
                      id="clinicZipCode"
                      name="clinicZipCode"
                      placeholder="ZIP Code"
                      value={formData.clinicZipCode}
                      onChange={handleChange}
                      className={errors.clinicZipCode ? "border-red-500" : ""}
                    />
                    {errors.clinicZipCode && <p className="text-red-500 text-xs">{errors.clinicZipCode}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clinicPhone">Clinic Phone *</Label>
                      <Input
                        id="clinicPhone"
                        name="clinicPhone"
                        placeholder="(555) 123-4567"
                        value={formData.clinicPhone}
                        onChange={handleChange}
                        className={errors.clinicPhone ? "border-red-500" : ""}
                      />
                      {errors.clinicPhone && <p className="text-red-500 text-xs">{errors.clinicPhone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinicEmail">Clinic Email</Label>
                      <Input
                        id="clinicEmail"
                        name="clinicEmail"
                        type="email"
                        placeholder="clinic@example.com"
                        value={formData.clinicEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">
                      <strong>Note:</strong> If your clinic is already registered with MY HEALTH, you can link your
                      profile to the existing clinic during the verification process.
                    </p>
                  </div>
                </>
              )}

              {/* Step 4: Schedule & Availability */}
              {currentStep === 4 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="availableDays">Available Days *</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={`day-${day}`}
                            checked={formData.availableDays.includes(day)}
                            onCheckedChange={(checked) => {
                              handleArrayCheckboxChange("availableDays", day, checked === true)
                            }}
                          />
                          <label
                            htmlFor={`day-${day}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.availableDays && <p className="text-red-500 text-xs">{errors.availableDays}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                        className={errors.startTime ? "border-red-500" : ""}
                      />
                      {errors.startTime && <p className="text-red-500 text-xs">{errors.startTime}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleChange}
                        className={errors.endTime ? "border-red-500" : ""}
                      />
                      {errors.endTime && <p className="text-red-500 text-xs">{errors.endTime}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appointmentDuration">Appointment Duration</Label>
                    <Select
                      value={formData.appointmentDuration}
                      onValueChange={(value) => handleSelectChange("appointmentDuration", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
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

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">
                      <strong>Note:</strong> You can customize your schedule in more detail after registration. This
                      initial schedule will be used to set up your availability in the system.
                    </p>
                  </div>
                </>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 5 && (
                <>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        Personal Information
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Name</p>
                          <p className="font-medium">
                            Dr. {formData.firstName} {formData.lastName}
                          </p>
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
                          <p className="text-muted-foreground">Gender</p>
                          <p className="font-medium">{formData.gender || "Not specified"}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                        Professional Information
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Specialty</p>
                          <p className="font-medium">{formData.specialty}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">License Number</p>
                          <p className="font-medium">{formData.licenseNumber}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Years of Experience</p>
                          <p className="font-medium">{formData.yearsOfExperience}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Medical School</p>
                          <p className="font-medium">{formData.medicalSchool || "Not specified"}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Languages</p>
                          <p className="font-medium">
                            {formData.languages.length > 0 ? formData.languages.join(", ") : "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                        Clinic Information
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Clinic Name</p>
                          <p className="font-medium">{formData.clinicName}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Address</p>
                          <p className="font-medium">
                            {formData.clinicAddress}, {formData.clinicCity}, {formData.clinicState}{" "}
                            {formData.clinicZipCode}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="font-medium">{formData.clinicPhone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="font-medium">{formData.clinicEmail || "Not specified"}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                        Schedule & Availability
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Available Days</p>
                          <p className="font-medium">
                            {formData.availableDays.length > 0 ? formData.availableDays.join(", ") : "None selected"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Hours</p>
                          <p className="font-medium">
                            {formData.startTime} - {formData.endTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Appointment Duration</p>
                          <p className="font-medium">{formData.appointmentDuration} minutes</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Accepting New Patients</p>
                          <p className="font-medium">{formData.acceptingNewPatients ? "Yes" : "No"}</p>
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
            {currentStep < 5 ? (
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
