"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MapPin, Search, Phone, Clock, Star, Mail, ExternalLink, Navigation, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PharmaciesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null)
  const [filterDistance, setFilterDistance] = useState("all")
  const [filterRating, setFilterRating] = useState("all")
  const [filterServices, setFilterServices] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for pharmacies
  const pharmacies = [
    {
      id: "pharm-1",
      name: "HealthPlus Pharmacy",
      address: "123 Main Street, Anytown, USA",
      phone: "(555) 123-4567",
      email: "info@healthpluspharmacy.com",
      website: "https://healthpluspharmacy.com",
      hours: "Mon-Fri: 8am-8pm, Sat: 9am-5pm, Sun: Closed",
      distance: 1.2,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=200&width=400",
      logo: "/placeholder.svg?height=80&width=80",
      services: [
        "Prescription Filling",
        "Medication Counseling",
        "Immunizations",
        "Health Screenings",
        "Home Delivery",
      ],
      insuranceAccepted: ["Medicare", "Medicaid", "Blue Cross", "Aetna", "Cigna", "UnitedHealthcare"],
      about:
        "HealthPlus Pharmacy is a full-service pharmacy dedicated to providing personalized care and comprehensive medication management services to our community. Our team of experienced pharmacists is committed to ensuring your health and wellness.",
      medicationCount: 1250,
      featured: true,
    },
    {
      id: "pharm-2",
      name: "MediCare Pharmacy",
      address: "456 Oak Avenue, Anytown, USA",
      phone: "(555) 234-5678",
      email: "contact@medicarepharmacy.com",
      website: "https://medicarepharmacy.com",
      hours: "Mon-Sat: 9am-9pm, Sun: 10am-6pm",
      distance: 0.8,
      rating: 4.6,
      reviews: 98,
      image: "/placeholder.svg?height=200&width=400",
      logo: "/placeholder.svg?height=80&width=80",
      services: ["Prescription Filling", "Medication Counseling", "Immunizations", "Compounding", "Drive-Thru"],
      insuranceAccepted: ["Medicare", "Medicaid", "Blue Cross", "Cigna", "UnitedHealthcare"],
      about:
        "MediCare Pharmacy offers a wide range of pharmaceutical services with a focus on patient education and preventive care. We strive to be your trusted healthcare partner.",
      medicationCount: 980,
      featured: true,
    },
    {
      id: "pharm-3",
      name: "QuickCare Pharmacy",
      address: "789 Pine Road, Anytown, USA",
      phone: "(555) 345-6789",
      email: "help@quickcarepharmacy.com",
      website: "https://quickcarepharmacy.com",
      hours: "Mon-Fri: 8am-10pm, Sat-Sun: 9am-8pm",
      distance: 1.5,
      rating: 4.5,
      reviews: 76,
      image: "/placeholder.svg?height=200&width=400",
      logo: "/placeholder.svg?height=80&width=80",
      services: ["Prescription Filling", "24/7 Emergency Service", "Home Delivery", "Online Refills"],
      insuranceAccepted: ["Medicare", "Blue Cross", "Aetna", "Cigna"],
      about:
        "QuickCare Pharmacy provides fast, reliable pharmaceutical services with a focus on convenience and accessibility. Our 24/7 emergency service ensures you always have access to essential medications.",
      medicationCount: 850,
      featured: false,
    },
    {
      id: "pharm-4",
      name: "CityHealth Pharmacy",
      address: "101 Maple Street, Anytown, USA",
      phone: "(555) 456-7890",
      email: "info@cityhealthpharmacy.com",
      website: "https://cityhealthpharmacy.com",
      hours: "Mon-Fri: 7am-9pm, Sat: 8am-7pm, Sun: 9am-5pm",
      distance: 2.1,
      rating: 4.7,
      reviews: 112,
      image: "/placeholder.svg?height=200&width=400",
      logo: "/placeholder.svg?height=80&width=80",
      services: [
        "Prescription Filling",
        "Medication Therapy Management",
        "Immunizations",
        "Health Screenings",
        "Specialty Medications",
      ],
      insuranceAccepted: ["Medicare", "Medicaid", "Blue Cross", "Aetna", "Cigna", "UnitedHealthcare", "Humana"],
      about:
        "CityHealth Pharmacy specializes in comprehensive medication management and personalized care. Our pharmacists work closely with your healthcare providers to ensure optimal treatment outcomes.",
      medicationCount: 1450,
      featured: true,
    },
    {
      id: "pharm-5",
      name: "Community Care Pharmacy",
      address: "222 Elm Boulevard, Anytown, USA",
      phone: "(555) 567-8901",
      email: "support@communitycarepharmacy.com",
      website: "https://communitycarepharmacy.com",
      hours: "Mon-Fri: 9am-7pm, Sat: 10am-4pm, Sun: Closed",
      distance: 3.2,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=400",
      logo: "/placeholder.svg?height=80&width=80",
      services: ["Prescription Filling", "Medication Counseling", "Diabetes Care", "Compounding", "Home Delivery"],
      insuranceAccepted: ["Medicare", "Medicaid", "Blue Cross", "Aetna", "Cigna"],
      about:
        "Community Care Pharmacy is a locally-owned pharmacy committed to serving our community with personalized care and comprehensive pharmaceutical services. We take pride in knowing our customers by name.",
      medicationCount: 1100,
      featured: false,
    },
  ]

  // Filter pharmacies based on search query and filters
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    // Search filter
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()))

    // Distance filter
    const matchesDistance =
      filterDistance === "all" ||
      (filterDistance === "1" && pharmacy.distance <= 1) ||
      (filterDistance === "3" && pharmacy.distance <= 3) ||
      (filterDistance === "5" && pharmacy.distance <= 5)

    // Rating filter
    const matchesRating =
      filterRating === "all" ||
      (filterRating === "4.5" && pharmacy.rating >= 4.5) ||
      (filterRating === "4" && pharmacy.rating >= 4) ||
      (filterRating === "3.5" && pharmacy.rating >= 3.5)

    // Services filter
    const matchesServices =
      filterServices === "all" ||
      (filterServices === "delivery" && pharmacy.services.includes("Home Delivery")) ||
      (filterServices === "24h" && pharmacy.services.includes("24/7 Emergency Service")) ||
      (filterServices === "compounding" && pharmacy.services.includes("Compounding"))

    return matchesSearch && matchesDistance && matchesRating && matchesServices
  })

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Find a Pharmacy</h1>
      <p className="text-muted-foreground mb-6">Browse and compare local pharmacies for your medication needs</p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search pharmacies by name, location, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border rounded-lg bg-gray-50">
          <div>
            <Label htmlFor="distance" className="text-sm">
              Distance
            </Label>
            <Select value={filterDistance} onValueChange={setFilterDistance}>
              <SelectTrigger id="distance">
                <SelectValue placeholder="Filter by distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Distances</SelectItem>
                <SelectItem value="1">Within 1 mile</SelectItem>
                <SelectItem value="3">Within 3 miles</SelectItem>
                <SelectItem value="5">Within 5 miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="rating" className="text-sm">
              Rating
            </Label>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger id="rating">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="services" className="text-sm">
              Services
            </Label>
            <Select value={filterServices} onValueChange={setFilterServices}>
              <SelectTrigger id="services">
                <SelectValue placeholder="Filter by services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="delivery">Home Delivery</SelectItem>
                <SelectItem value="24h">24/7 Emergency Service</SelectItem>
                <SelectItem value="compounding">Compounding</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {filteredPharmacies.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No pharmacies found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            {/* Featured Pharmacies */}
            {filteredPharmacies.some((p) => p.featured) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Featured Pharmacies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPharmacies
                    .filter((p) => p.featured)
                    .map((pharmacy) => (
                      <Card key={pharmacy.id} className="overflow-hidden">
                        <div className="relative h-40 w-full">
                          <Image
                            src={pharmacy.image || "/placeholder.svg"}
                            alt={pharmacy.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-blue-500">Featured</Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={pharmacy.logo || "/placeholder.svg"} alt={pharmacy.name} />
                              <AvatarFallback>{pharmacy.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                              <CardDescription className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {pharmacy.distance} miles away
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center mb-2">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{pharmacy.rating}</span>
                            <span className="text-muted-foreground text-sm ml-1">({pharmacy.reviews} reviews)</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 flex items-start">
                            <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{pharmacy.hours}</span>
                          </p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {pharmacy.services.slice(0, 3).map((service, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {pharmacy.services.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{pharmacy.services.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" onClick={() => setSelectedPharmacy(pharmacy)}>
                            View Details
                          </Button>
                          <Button asChild>
                            <Link href="/patient-portal/pharmacy">Browse Medications</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* All Pharmacies */}
            <div>
              <h2 className="text-xl font-bold mb-4">All Pharmacies</h2>
              <div className="space-y-4">
                {filteredPharmacies.map((pharmacy) => (
                  <Card key={pharmacy.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-40 md:h-auto md:w-48 flex-shrink-0">
                        <Image
                          src={pharmacy.image || "/placeholder.svg"}
                          alt={pharmacy.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={pharmacy.logo || "/placeholder.svg"} alt={pharmacy.name} />
                              <AvatarFallback>{pharmacy.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-bold">{pharmacy.name}</h3>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {pharmacy.distance} miles away
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{pharmacy.rating}</span>
                            <span className="text-muted-foreground text-sm ml-1">({pharmacy.reviews} reviews)</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                          <p className="text-sm flex items-start">
                            <Phone className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{pharmacy.phone}</span>
                          </p>
                          <p className="text-sm flex items-start">
                            <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{pharmacy.hours.split(",")[0]}...</span>
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {pharmacy.services.slice(0, 4).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {pharmacy.services.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{pharmacy.services.length - 4} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 justify-end">
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
                            <Navigation className="h-4 w-4 mr-2" />
                            Directions
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-initial"
                            onClick={() => setSelectedPharmacy(pharmacy)}
                          >
                            View Details
                          </Button>
                          <Button size="sm" className="flex-1 sm:flex-initial" asChild>
                            <Link href="/patient-portal/pharmacy">Browse Medications</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Pharmacy Detail Dialog */}
      <Dialog open={!!selectedPharmacy} onOpenChange={() => setSelectedPharmacy(null)}>
        {selectedPharmacy && (
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={selectedPharmacy.logo || "/placeholder.svg"} alt={selectedPharmacy.name} />
                  <AvatarFallback>{selectedPharmacy.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-xl">{selectedPharmacy.name}</DialogTitle>
                  <DialogDescription className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {selectedPharmacy.distance} miles away • {selectedPharmacy.medicationCount}+ medications available
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="relative h-48 w-full rounded-md overflow-hidden my-4">
              <Image
                src={selectedPharmacy.image || "/placeholder.svg"}
                alt={selectedPharmacy.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid gap-4">
              <div>
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm">{selectedPharmacy.about}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{selectedPharmacy.address}</span>
                    </p>
                    <p className="text-sm flex items-start">
                      <Phone className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{selectedPharmacy.phone}</span>
                    </p>
                    <p className="text-sm flex items-start">
                      <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{selectedPharmacy.email}</span>
                    </p>
                    <p className="text-sm flex items-start">
                      <ExternalLink className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <a
                        href={selectedPharmacy.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedPharmacy.website.replace("https://", "")}
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Hours of Operation</h4>
                  <p className="text-sm whitespace-pre-line">{selectedPharmacy.hours.split(", ").join("\n")}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPharmacy.services.map((service, index) => (
                    <Badge key={index} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Insurance Accepted</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPharmacy.insuranceAccepted.map((insurance, index) => (
                    <Badge key={index} variant="secondary">
                      {insurance}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium text-lg">{selectedPharmacy.rating}</span>
                  <span className="text-muted-foreground ml-1">({selectedPharmacy.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="sm:flex-1" asChild>
                <Link
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedPharmacy.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Link>
              </Button>
              <Button className="sm:flex-1" asChild>
                <Link href="/patient-portal/pharmacy">Browse Medications</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
