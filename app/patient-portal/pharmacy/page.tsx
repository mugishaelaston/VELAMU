"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HeartbeatThrobber } from "@/components/heartbeat-throbber"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pill, Search, MapPin, ShoppingCart, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function PatientPharmacyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedMedication, setSelectedMedication] = useState<any>(null)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null)

  // Mock data for medications
  const medications = [
    {
      id: 1,
      name: "Atorvastatin",
      brand: "Lipitor",
      category: "Cholesterol",
      dosage: "20mg",
      form: "Tablet",
      prescription: true,
      image: "/placeholder.svg?height=100&width=100",
      description: "Used to lower cholesterol and to prevent cardiovascular disease.",
      pharmacies: [
        {
          id: "pharm-1",
          name: "HealthPlus Pharmacy",
          distance: "1.2 miles",
          rating: 4.8,
          price: 24.99,
          inStock: true,
          deliveryFee: 0,
          deliveryTime: "Same day",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "pharm-2",
          name: "MediCare Pharmacy",
          distance: "0.8 miles",
          rating: 4.6,
          price: 26.5,
          inStock: true,
          deliveryFee: 2.99,
          deliveryTime: "Next day",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "pharm-3",
          name: "QuickCare Pharmacy",
          distance: "1.5 miles",
          rating: 4.5,
          price: 23.75,
          inStock: false,
          deliveryFee: 0,
          deliveryTime: "2-3 days",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      id: 2,
      name: "Metformin",
      brand: "Glucophage",
      category: "Diabetes",
      dosage: "500mg",
      form: "Tablet",
      prescription: true,
      image: "/placeholder.svg?height=100&width=100",
      description: "First-line medication for the treatment of type 2 diabetes.",
      pharmacies: [
        {
          id: "pharm-2",
          name: "MediCare Pharmacy",
          distance: "0.8 miles",
          rating: 4.6,
          price: 12.5,
          inStock: true,
          deliveryFee: 2.99,
          deliveryTime: "Next day",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "pharm-4",
          name: "CityHealth Pharmacy",
          distance: "2.1 miles",
          rating: 4.7,
          price: 11.99,
          inStock: true,
          deliveryFee: 3.99,
          deliveryTime: "Same day",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      id: 3,
      name: "Ibuprofen",
      brand: "Advil",
      category: "Pain Relief",
      dosage: "200mg",
      form: "Tablet",
      prescription: false,
      image: "/placeholder.svg?height=100&width=100",
      description: "Used for treating pain, fever, and inflammation.",
      pharmacies: [
        {
          id: "pharm-1",
          name: "HealthPlus Pharmacy",
          distance: "1.2 miles",
          rating: 4.8,
          price: 8.99,
          inStock: true,
          deliveryFee: 0,
          deliveryTime: "Same day",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "pharm-2",
          name: "MediCare Pharmacy",
          distance: "0.8 miles",
          rating: 4.6,
          price: 9.5,
          inStock: true,
          deliveryFee: 2.99,
          deliveryTime: "Next day",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "pharm-3",
          name: "QuickCare Pharmacy",
          distance: "1.5 miles",
          rating: 4.5,
          price: 7.99,
          inStock: true,
          deliveryFee: 0,
          deliveryTime: "2-3 days",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "pharm-4",
          name: "CityHealth Pharmacy",
          distance: "2.1 miles",
          rating: 4.7,
          price: 8.49,
          inStock: true,
          deliveryFee: 3.99,
          deliveryTime: "Same day",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      id: 4,
      name: "Amoxicillin",
      brand: "Amoxil",
      category: "Antibiotic",
      dosage: "500mg",
      form: "Capsule",
      prescription: true,
      image: "/placeholder.svg?height=100&width=100",
      description: "Used to treat a number of bacterial infections.",
      pharmacies: [
        {
          id: "pharm-1",
          name: "HealthPlus Pharmacy",
          distance: "1.2 miles",
          rating: 4.8,
          price: 15.75,
          inStock: true,
          deliveryFee: 0,
          deliveryTime: "Same day",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "pharm-4",
          name: "CityHealth Pharmacy",
          distance: "2.1 miles",
          rating: 4.7,
          price: 14.99,
          inStock: true,
          deliveryFee: 3.99,
          deliveryTime: "Same day",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
    {
      id: 5,
      name: "Loratadine",
      brand: "Claritin",
      category: "Allergy",
      dosage: "10mg",
      form: "Tablet",
      prescription: false,
      image: "/placeholder.svg?height=100&width=100",
      description: "Used to treat allergies such as hay fever and hives.",
      pharmacies: [
        {
          id: "pharm-2",
          name: "MediCare Pharmacy",
          distance: "0.8 miles",
          rating: 4.6,
          price: 11.25,
          inStock: true,
          deliveryFee: 2.99,
          deliveryTime: "Next day",
          logo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "pharm-3",
          name: "QuickCare Pharmacy",
          distance: "1.5 miles",
          rating: 4.5,
          price: 10.99,
          inStock: true,
          deliveryFee: 0,
          deliveryTime: "2-3 days",
          logo: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
  ]

  // Mock data for orders
  const orders = [
    {
      id: "ORD-12345",
      date: "2025-04-15",
      pharmacy: "HealthPlus Pharmacy",
      items: [
        { name: "Atorvastatin 20mg", quantity: 30, price: 24.99 },
        { name: "Vitamin D3 1000IU", quantity: 60, price: 15.5 },
      ],
      total: 40.49,
      status: "Delivered",
      deliveryDate: "2025-04-17",
      trackingNumber: "TRK-987654",
    },
    {
      id: "ORD-12346",
      date: "2025-04-20",
      pharmacy: "MediCare Pharmacy",
      items: [{ name: "Metformin 500mg", quantity: 60, price: 12.5 }],
      total: 12.5,
      status: "Processing",
      deliveryDate: "Expected 2025-04-23",
      trackingNumber: "TRK-987655",
    },
    {
      id: "ORD-12347",
      date: "2025-04-22",
      pharmacy: "QuickCare Pharmacy",
      items: [
        { name: "Ibuprofen 200mg", quantity: 24, price: 8.99 },
        { name: "Acetaminophen 500mg", quantity: 24, price: 7.99 },
      ],
      total: 16.98,
      status: "Shipped",
      deliveryDate: "Expected 2025-04-24",
      trackingNumber: "TRK-987656",
    },
  ]

  // Mock data for prescriptions
  const prescriptions = [
    {
      id: "PRE-12345",
      medication: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      doctor: "Dr. Sarah Johnson",
      date: "2025-04-10",
      refills: 3,
      status: "Active",
      pharmacy: "HealthPlus Pharmacy",
    },
    {
      id: "PRE-12346",
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      doctor: "Dr. Michael Chen",
      date: "2025-04-05",
      refills: 5,
      status: "Active",
      pharmacy: "MediCare Pharmacy",
    },
    {
      id: "PRE-12347",
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      doctor: "Dr. Sarah Johnson",
      date: "2025-03-15",
      refills: 0,
      status: "Expired",
      pharmacy: "HealthPlus Pharmacy",
    },
  ]

  // Filter medications based on search query
  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddToCart = (medication: any) => {
    setCartItems([
      ...cartItems,
      {
        ...medication,
        quantity: 1,
        // If pharmacy is not already selected, use the cheapest one
        pharmacy:
          medication.pharmacy || medication.pharmacies.filter((p) => p.inStock).sort((a, b) => a.price - b.price)[0],
      },
    ])
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleOrderSubmit = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setOrderPlaced(true)
      // Reset after showing success
      setTimeout(() => {
        setOrderPlaced(false)
        setCartItems([])
        setIsOrderDialogOpen(false)
      }, 3000)
    }, 2000)
  }

  const handleRefillPrescription = (prescriptionId: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Show success message or update UI
    }, 2000)
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.pharmacy.price, 0).toFixed(2)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Pharmacy</h1>
      <p className="text-muted-foreground mb-6">Browse, order, and track medications</p>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search medications, pharmacies, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <MapPin className="h-4 w-4 mr-2" />
          Nearby
        </Button>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="browse">Browse Medications</TabsTrigger>
          <TabsTrigger value="prescriptions">My Prescriptions</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedications.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No medications found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms</p>
              </div>
            ) : (
              filteredMedications.map((medication) => (
                <Card key={medication.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{medication.name}</CardTitle>
                        <CardDescription>
                          {medication.brand} • {medication.dosage}
                        </CardDescription>
                      </div>
                      <Badge variant={medication.prescription ? "default" : "outline"}>
                        {medication.prescription ? "Prescription" : "OTC"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center mb-4">
                      <div className="h-20 w-20 relative rounded-md overflow-hidden bg-gray-100 mr-4">
                        <Image
                          src={medication.image || "/placeholder.svg"}
                          alt={medication.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          {medication.form} • {medication.category}
                        </p>
                        <p className="text-sm mb-1">
                          Available at {medication.pharmacies.filter((p) => p.inStock).length} pharmacies
                        </p>
                        <p className="text-sm">
                          From{" "}
                          <span className="font-bold">
                            ${Math.min(...medication.pharmacies.map((p) => p.price)).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{medication.description}</p>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Available at these pharmacies:</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {medication.pharmacies.map((pharmacy) => (
                          <div
                            key={pharmacy.id}
                            className={`border rounded-md p-2 ${
                              pharmacy.inStock ? "cursor-pointer hover:border-blue-500" : "opacity-60"
                            }`}
                            onClick={() => {
                              if (pharmacy.inStock) {
                                setSelectedMedication({ ...medication, pharmacy })
                              }
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={pharmacy.logo || "/placeholder.svg"} alt={pharmacy.name} />
                                  <AvatarFallback>{pharmacy.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{pharmacy.name}</p>
                                  <p className="text-xs text-muted-foreground">{pharmacy.distance} away</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">${pharmacy.price.toFixed(2)}</p>
                                {pharmacy.inStock ? (
                                  <span className="text-xs text-green-600 flex items-center">
                                    <CheckCircle className="h-3 w-3 mr-1" /> In Stock
                                  </span>
                                ) : (
                                  <span className="text-xs text-red-500 flex items-center">
                                    <AlertCircle className="h-3 w-3 mr-1" /> Out of Stock
                                  </span>
                                )}
                              </div>
                            </div>
                            {pharmacy.inStock && (
                              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                                <span>Delivery: {pharmacy.deliveryTime}</span>
                                <span>
                                  {pharmacy.deliveryFee === 0
                                    ? "Free Delivery"
                                    : `Delivery Fee: $${pharmacy.deliveryFee.toFixed(2)}`}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedMedication(medication)}>
                      Details
                    </Button>
                    <Button
                      onClick={() => {
                        // Find the cheapest in-stock pharmacy
                        const cheapestPharmacy = medication.pharmacies
                          .filter((p) => p.inStock)
                          .sort((a, b) => a.price - b.price)[0]

                        if (cheapestPharmacy) {
                          handleAddToCart({ ...medication, pharmacy: cheapestPharmacy })
                        }
                      }}
                      disabled={!medication.pharmacies.some((p) => p.inStock) || medication.prescription}
                    >
                      {medication.prescription ? "Need Prescription" : "Add to Cart (Best Price)"}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Prescriptions</CardTitle>
              <CardDescription>Manage and refill your prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No prescriptions found</h3>
                    <p className="text-muted-foreground">Your prescriptions will appear here</p>
                  </div>
                ) : (
                  prescriptions.map((prescription) => (
                    <div key={prescription.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {prescription.medication} {prescription.dosage}
                          </h3>
                          <p className="text-sm text-muted-foreground">{prescription.frequency}</p>
                        </div>
                        <Badge variant={prescription.status === "Active" ? "default" : "outline"}>
                          {prescription.status}
                        </Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Doctor:</span> {prescription.doctor}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date:</span> {prescription.date}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Refills:</span> {prescription.refills}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pharmacy:</span> {prescription.pharmacy}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="mr-2">
                          Details
                        </Button>
                        <Button
                          size="sm"
                          disabled={prescription.status !== "Active" || prescription.refills === 0}
                          onClick={() => handleRefillPrescription(prescription.id)}
                        >
                          Refill
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Request New Prescription</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>Track and manage your medication orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No orders found</h3>
                    <p className="text-muted-foreground">Your orders will appear here</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">Ordered on {order.date}</p>
                        </div>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "outline"
                              : order.status === "Shipped"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-medium pt-2 border-t">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-md text-sm">
                        <div className="flex items-center mb-1">
                          <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{order.pharmacy}</span>
                        </div>
                        <div className="flex items-center mb-1">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{order.deliveryDate}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-muted-foreground mr-2">Tracking:</span>
                          <span>{order.trackingNumber}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="mr-2">
                          Track Order
                        </Button>
                        <Button size="sm">Order Again</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Medication Detail Dialog */}
      {selectedMedication && (
        <Dialog open={!!selectedMedication} onOpenChange={() => setSelectedMedication(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedMedication.name} {selectedMedication.dosage}
              </DialogTitle>
              <DialogDescription>
                {selectedMedication.brand} • {selectedMedication.category}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-start gap-4">
                <div className="h-32 w-32 relative rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={selectedMedication.image || "/placeholder.svg"}
                    alt={selectedMedication.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="mb-2">{selectedMedication.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Form:</span> {selectedMedication.form}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dosage:</span> {selectedMedication.dosage}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Requires Prescription:</span>{" "}
                      {selectedMedication.prescription ? "Yes" : "No"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Available at:</span>{" "}
                      {selectedMedication.pharmacies?.filter((p) => p.inStock).length || 0} pharmacies
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Compare Pharmacies</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {selectedMedication.pharmacies?.map((pharmacy) => (
                    <div
                      key={pharmacy.id}
                      className={`border rounded-md p-3 ${
                        pharmacy.inStock
                          ? selectedMedication.pharmacy?.id === pharmacy.id
                            ? "border-blue-500 bg-blue-50"
                            : "hover:border-blue-500 cursor-pointer"
                          : "opacity-60"
                      }`}
                      onClick={() => {
                        if (pharmacy.inStock) {
                          setSelectedMedication({ ...selectedMedication, pharmacy })
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={pharmacy.logo || "/placeholder.svg"} alt={pharmacy.name} />
                            <AvatarFallback>{pharmacy.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{pharmacy.name}</p>
                            <div className="flex items-center text-sm">
                              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground">{pharmacy.distance}</span>
                              <span className="mx-2">•</span>
                              <span>Rating: {pharmacy.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${pharmacy.price.toFixed(2)}</p>
                          {pharmacy.inStock ? (
                            <span className="text-xs text-green-600 flex items-center justify-end">
                              <CheckCircle className="h-3 w-3 mr-1" /> In Stock
                            </span>
                          ) : (
                            <span className="text-xs text-red-500 flex items-center justify-end">
                              <AlertCircle className="h-3 w-3 mr-1" /> Out of Stock
                            </span>
                          )}
                        </div>
                      </div>

                      {pharmacy.inStock && (
                        <>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Delivery Time:</span> {pharmacy.deliveryTime}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Delivery Fee:</span>{" "}
                              {pharmacy.deliveryFee === 0 ? "Free" : `$${pharmacy.deliveryFee.toFixed(2)}`}
                            </div>
                          </div>

                          {selectedMedication.pharmacy?.id === pharmacy.id && (
                            <div className="mt-2">
                              <Button
                                size="sm"
                                className="w-full"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAddToCart({ ...selectedMedication, pharmacy })
                                  setSelectedMedication(null)
                                }}
                                disabled={selectedMedication.prescription}
                              >
                                {selectedMedication.prescription
                                  ? "Need Prescription"
                                  : "Add to Cart from this Pharmacy"}
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedMedication(null)}>
                Close
              </Button>
              {!selectedMedication.prescription && (
                <Button
                  onClick={() => {
                    // Find the cheapest in-stock pharmacy
                    const cheapestPharmacy = selectedMedication.pharmacies
                      ?.filter((p) => p.inStock)
                      .sort((a, b) => a.price - b.price)[0]

                    if (cheapestPharmacy) {
                      handleAddToCart({ ...selectedMedication, pharmacy: cheapestPharmacy })
                      setSelectedMedication(null)
                    }
                  }}
                  disabled={!selectedMedication.pharmacies?.some((p) => p.inStock) || selectedMedication.prescription}
                >
                  Add to Cart (Best Price)
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Cart/Checkout Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 p-0 shadow-lg"
            onClick={() => setIsOrderDialogOpen(true)}
            disabled={cartItems.length === 0}
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogDescription>Review and complete your order</DialogDescription>
          </DialogHeader>

          {orderPlaced ? (
            <div className="py-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Order Placed Successfully!</h3>
              <p className="text-muted-foreground mb-4">Your order has been placed and will be processed shortly.</p>
              <Button
                onClick={() => {
                  setOrderPlaced(false)
                  setCartItems([])
                  setIsOrderDialogOpen(false)
                }}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="py-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Your cart is empty</h3>
                    <p className="text-muted-foreground">Add medications to your cart to place an order</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 relative rounded-md overflow-hidden bg-gray-100 mr-3">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">
                              {item.name} {item.dosage}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Avatar className="h-4 w-4 mr-1">
                                <AvatarFallback>{item.pharmacy.name[0]}</AvatarFallback>
                              </Avatar>
                              {item.pharmacy.name}
                              <span className="mx-1">•</span>${item.pharmacy.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            &times;
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${calculateTotal()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="address">Delivery Address</Label>
                        <Input id="address" placeholder="Enter your delivery address" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="payment">Payment Method</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="credit-card">Credit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleOrderSubmit} disabled={cartItems.length === 0 || isLoading}>
                  {isLoading ? (
                    <>
                      <HeartbeatThrobber className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
