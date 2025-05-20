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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Pill,
  Search,
  Package,
  ShoppingBag,
  Plus,
  Edit,
  Trash,
  Clock,
  AlertCircle,
  BarChart3,
  Users,
  DollarSign,
  FileText,
} from "lucide-react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"

export default function PharmacyPortalPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedMedication, setSelectedMedication] = useState<any>(null)
  const [isAddMedicationDialogOpen, setIsAddMedicationDialogOpen] = useState(false)
  const [isOrderDetailsDialogOpen, setIsOrderDetailsDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for pharmacy
  const pharmacy = {
    id: "pharm-1",
    name: "HealthPlus Pharmacy",
    address: "123 Main Street, Anytown, USA",
    phone: "(555) 123-4567",
    email: "info@healthpluspharmacy.com",
    license: "PHR-12345",
    operatingHours: "Mon-Fri: 8am-8pm, Sat: 9am-5pm, Sun: Closed",
    logo: "/placeholder.svg?height=100&width=100",
  }

  // Mock data for inventory
  const inventory = [
    {
      id: 1,
      name: "Atorvastatin",
      brand: "Lipitor",
      category: "Cholesterol",
      dosage: "20mg",
      form: "Tablet",
      price: 24.99,
      prescription: true,
      image: "/placeholder.svg?height=100&width=100",
      stock: 120,
      reorderLevel: 30,
      expiryDate: "2026-05-15",
      description: "Used to lower cholesterol and to prevent cardiovascular disease.",
    },
    {
      id: 2,
      name: "Metformin",
      brand: "Glucophage",
      category: "Diabetes",
      dosage: "500mg",
      form: "Tablet",
      price: 12.5,
      prescription: true,
      image: "/placeholder.svg?height=100&width=100",
      stock: 85,
      reorderLevel: 25,
      expiryDate: "2026-04-20",
      description: "First-line medication for the treatment of type 2 diabetes.",
    },
    {
      id: 3,
      name: "Ibuprofen",
      brand: "Advil",
      category: "Pain Relief",
      dosage: "200mg",
      form: "Tablet",
      price: 8.99,
      prescription: false,
      image: "/placeholder.svg?height=100&width=100",
      stock: 200,
      reorderLevel: 50,
      expiryDate: "2026-08-10",
      description: "Used for treating pain, fever, and inflammation.",
    },
    {
      id: 4,
      name: "Amoxicillin",
      brand: "Amoxil",
      category: "Antibiotic",
      dosage: "500mg",
      form: "Capsule",
      price: 15.75,
      prescription: true,
      image: "/placeholder.svg?height=100&width=100",
      stock: 15,
      reorderLevel: 20,
      expiryDate: "2025-12-05",
      description: "Used to treat a number of bacterial infections.",
    },
    {
      id: 5,
      name: "Loratadine",
      brand: "Claritin",
      category: "Allergy",
      dosage: "10mg",
      form: "Tablet",
      price: 11.25,
      prescription: false,
      image: "/placeholder.svg?height=100&width=100",
      stock: 75,
      reorderLevel: 20,
      expiryDate: "2026-06-30",
      description: "Used to treat allergies such as hay fever and hives.",
    },
  ]

  // Mock data for orders
  const orders = [
    {
      id: "ORD-12345",
      patient: {
        id: "patient-1",
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2025-04-15",
      items: [
        { name: "Atorvastatin 20mg", quantity: 30, price: 24.99 },
        { name: "Vitamin D3 1000IU", quantity: 60, price: 15.5 },
      ],
      total: 40.49,
      status: "Pending",
      prescription: {
        id: "PRE-12345",
        doctor: "Dr. Sarah Johnson",
        date: "2025-04-10",
      },
      deliveryAddress: "456 Oak Lane, Anytown, USA",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-12346",
      patient: {
        id: "patient-2",
        name: "Emily Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2025-04-16",
      items: [{ name: "Metformin 500mg", quantity: 60, price: 12.5 }],
      total: 12.5,
      status: "Processing",
      prescription: {
        id: "PRE-12346",
        doctor: "Dr. Michael Chen",
        date: "2025-04-14",
      },
      deliveryAddress: "789 Maple Street, Anytown, USA",
      paymentMethod: "Insurance",
    },
    {
      id: "ORD-12347",
      patient: {
        id: "patient-3",
        name: "Robert Davis",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2025-04-16",
      items: [
        { name: "Ibuprofen 200mg", quantity: 24, price: 8.99 },
        { name: "Acetaminophen 500mg", quantity: 24, price: 7.99 },
      ],
      total: 16.98,
      status: "Shipped",
      prescription: null,
      deliveryAddress: "123 Pine Road, Anytown, USA",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-12348",
      patient: {
        id: "patient-4",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2025-04-17",
      items: [{ name: "Amoxicillin 500mg", quantity: 20, price: 15.75 }],
      total: 15.75,
      status: "Delivered",
      prescription: {
        id: "PRE-12348",
        doctor: "Dr. Robert Kim",
        date: "2025-04-15",
      },
      deliveryAddress: "567 Elm Court, Anytown, USA",
      paymentMethod: "Credit Card",
    },
  ]

  // Mock data for prescriptions
  const prescriptions = [
    {
      id: "PRE-12345",
      patient: {
        id: "patient-1",
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      medication: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      doctor: "Dr. Sarah Johnson",
      date: "2025-04-10",
      refills: 3,
      status: "Active",
      notes: "Take with evening meal",
    },
    {
      id: "PRE-12346",
      patient: {
        id: "patient-2",
        name: "Emily Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      doctor: "Dr. Michael Chen",
      date: "2025-04-14",
      refills: 5,
      status: "Active",
      notes: "Take with meals",
    },
    {
      id: "PRE-12348",
      patient: {
        id: "patient-4",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "Three times daily",
      doctor: "Dr. Robert Kim",
      date: "2025-04-15",
      refills: 0,
      status: "Active",
      notes: "Take until completed. Do not stop early.",
    },
  ]

  // Filter inventory based on search query
  const filteredInventory = inventory.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddMedication = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsAddMedicationDialogOpen(false)
      // Show success message or update UI
    }, 2000)
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Show success message or update UI
    }, 2000)
  }

  // Dashboard stats
  const dashboardStats = {
    totalOrders: 127,
    pendingOrders: 15,
    lowStockItems: 3,
    revenue: 12580.75,
    popularMedications: [
      { name: "Atorvastatin 20mg", count: 45 },
      { name: "Metformin 500mg", count: 38 },
      { name: "Ibuprofen 200mg", count: 32 },
    ],
    recentActivity: [
      { type: "order", message: "New order #ORD-12348 received", time: "10 minutes ago" },
      { type: "inventory", message: "Amoxicillin 500mg stock is low (15 remaining)", time: "2 hours ago" },
      { type: "prescription", message: "New prescription #PRE-12348 received", time: "3 hours ago" },
    ],
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={pharmacy.logo || "/placeholder.svg"} alt={pharmacy.name} />
            <AvatarFallback>{pharmacy.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{pharmacy.name}</h1>
            <p className="text-muted-foreground">Pharmacy Management Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Staff
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Package className="h-4 w-4 mr-2 text-blue-500" />
                  Total Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                  Pending Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.pendingOrders}</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Low Stock Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.lowStockItems}</div>
                <p className="text-xs text-muted-foreground">Below reorder level</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardStats.revenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Medications</CardTitle>
                <CardDescription>Most frequently ordered medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardStats.popularMedications.map((med, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Pill className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>{med.name}</span>
                      </div>
                      <Badge variant="outline">{med.count} orders</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Full Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardStats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          activity.type === "order"
                            ? "bg-blue-100"
                            : activity.type === "inventory"
                              ? "bg-red-100"
                              : "bg-green-100"
                        }`}
                      >
                        {activity.type === "order" && <Package className={`h-4 w-4 text-blue-600`} />}
                        {activity.type === "inventory" && <AlertCircle className={`h-4 w-4 text-red-600`} />}
                        {activity.type === "prescription" && <FileText className={`h-4 w-4 text-green-600`} />}
                      </div>
                      <div>
                        <p>{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
              <CardDescription>Orders awaiting processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders
                  .filter((order) => order.status === "Pending")
                  .map((order) => (
                    <div key={order.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <Avatar>
                        <AvatarImage src={order.patient.avatar || "/placeholder.svg"} alt={order.patient.name} />
                        <AvatarFallback>{order.patient.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{order.id}</h4>
                            <p className="text-sm text-muted-foreground">Patient: {order.patient.name}</p>
                          </div>
                          <Badge>Pending</Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <p>
                            Items: {order.items.length} • Total: ${order.total.toFixed(2)}
                          </p>
                          <p>Date: {order.date}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order)
                          setIsOrderDetailsDialogOpen(true)
                        }}
                      >
                        Process
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("orders")}>
                View All Orders
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setIsAddMedicationDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Medication Inventory</CardTitle>
              <CardDescription>Manage your pharmacy's medication stock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInventory.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No medications found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms</p>
                  </div>
                ) : (
                  filteredInventory.map((medication) => (
                    <div key={medication.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="h-16 w-16 relative rounded-md overflow-hidden bg-gray-100">
                        <Image
                          src={medication.image || "/placeholder.svg"}
                          alt={medication.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">
                              {medication.name} {medication.dosage}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {medication.brand} • {medication.form}
                            </p>
                          </div>
                          <Badge variant={medication.prescription ? "default" : "outline"}>
                            {medication.prescription ? "Prescription" : "OTC"}
                          </Badge>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Stock:</span>{" "}
                            <span
                              className={medication.stock <= medication.reorderLevel ? "text-red-500 font-medium" : ""}
                            >
                              {medication.stock} units
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Price:</span> ${medication.price.toFixed(2)}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expires:</span> {medication.expiryDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline">Export Inventory</Button>
                <Button variant="outline">Reorder Low Stock</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search orders..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Orders</CardTitle>
              <CardDescription>Manage and process medication orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No orders found</h3>
                    <p className="text-muted-foreground">New orders will appear here</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <Avatar>
                        <AvatarImage src={order.patient.avatar || "/placeholder.svg"} alt={order.patient.name} />
                        <AvatarFallback>{order.patient.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{order.id}</h4>
                            <p className="text-sm text-muted-foreground">Patient: {order.patient.name}</p>
                          </div>
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "outline"
                                : order.status === "Shipped"
                                  ? "default"
                                  : order.status === "Processing"
                                    ? "secondary"
                                    : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <p>
                            Items: {order.items.length} • Total: ${order.total.toFixed(2)}
                          </p>
                          <p>
                            Date: {order.date} • {order.prescription ? "Prescription Required" : "No Prescription"}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order)
                          setIsOrderDetailsDialogOpen(true)
                        }}
                      >
                        {order.status === "Pending" ? "Process" : "Details"}
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Export Orders
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search prescriptions..." className="pl-10" />
            </div>
            <Select defaultValue="active">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prescriptions</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="filled">Filled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patient Prescriptions</CardTitle>
              <CardDescription>Manage and process medication prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No prescriptions found</h3>
                    <p className="text-muted-foreground">New prescriptions will appear here</p>
                  </div>
                ) : (
                  prescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <Avatar>
                        <AvatarImage
                          src={prescription.patient.avatar || "/placeholder.svg"}
                          alt={prescription.patient.name}
                        />
                        <AvatarFallback>{prescription.patient.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{prescription.id}</h4>
                            <p className="text-sm text-muted-foreground">Patient: {prescription.patient.name}</p>
                          </div>
                          <Badge variant={prescription.status === "Active" ? "default" : "outline"}>
                            {prescription.status}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <p>
                            <span className="font-medium">Medication:</span> {prescription.medication}{" "}
                            {prescription.dosage}
                          </p>
                          <p>
                            <span className="font-medium">Doctor:</span> {prescription.doctor} •
                            <span className="font-medium"> Date:</span> {prescription.date}
                          </p>
                          <p>
                            <span className="font-medium">Instructions:</span> {prescription.frequency} •
                            <span className="font-medium"> Refills:</span> {prescription.refills}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Verify
                        </Button>
                        <Button size="sm">Fill</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Export Prescriptions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medication Marketplace</CardTitle>
              <CardDescription>Manage your medications available to MY HEALTH patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInventory
                  .filter((med) => med.stock > 0) // Only show in-stock medications
                  .map((medication) => (
                    <div key={medication.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="h-16 w-16 relative rounded-md overflow-hidden bg-gray-100">
                        <Image
                          src={medication.image || "/placeholder.svg"}
                          alt={medication.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">
                              {medication.name} {medication.dosage}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {medication.brand} • {medication.form}
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-green-50">
                            Published
                          </Badge>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Stock:</span> {medication.stock} units
                          </div>
                          <div>
                            <span className="text-muted-foreground">Price:</span> ${medication.price.toFixed(2)}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Views:</span> {Math.floor(Math.random() * 100) + 5}
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Marketplace Status:</span> Active since{" "}
                            {new Date().toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          Unpublish
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline">View Analytics</Button>
                <Button onClick={() => setIsAddMedicationDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Medication
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Medication Dialog */}
      <Dialog open={isAddMedicationDialogOpen} onOpenChange={setIsAddMedicationDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Medication</DialogTitle>
            <DialogDescription>Add a new medication to your pharmacy inventory</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Medication Name</Label>
                <Input id="name" placeholder="e.g., Atorvastatin" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand">Brand Name</Label>
                <Input id="brand" placeholder="e.g., Lipitor" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cholesterol">Cholesterol</SelectItem>
                    <SelectItem value="diabetes">Diabetes</SelectItem>
                    <SelectItem value="pain-relief">Pain Relief</SelectItem>
                    <SelectItem value="antibiotic">Antibiotic</SelectItem>
                    <SelectItem value="allergy">Allergy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prescription">Prescription Required</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No (OTC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input id="dosage" placeholder="e.g., 20mg" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="form">Form</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="capsule">Capsule</SelectItem>
                    <SelectItem value="liquid">Liquid</SelectItem>
                    <SelectItem value="injection">Injection</SelectItem>
                    <SelectItem value="cream">Cream</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" step="0.01" placeholder="0.00" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stock">Initial Stock</Label>
                <Input id="stock" type="number" placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reorderLevel">Reorder Level</Label>
                <Input id="reorderLevel" type="number" placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" type="date" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter medication description and usage information" rows={3} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="publishToMarketplace" />
                <Label htmlFor="publishToMarketplace">Publish to Medication Marketplace</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Make this medication visible to patients in the MY HEALTH marketplace
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMedicationDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMedication} disabled={isLoading}>
              {isLoading ? (
                <>
                  <HeartbeatThrobber className="mr-2" />
                  Adding...
                </>
              ) : (
                "Add Medication"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsDialogOpen} onOpenChange={setIsOrderDetailsDialogOpen}>
        {selectedOrder && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
              <DialogDescription>Review and process customer order</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={selectedOrder.patient.avatar || "/placeholder.svg"}
                    alt={selectedOrder.patient.name}
                  />
                  <AvatarFallback>{selectedOrder.patient.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedOrder.patient.name}</h3>
                  <p className="text-sm text-muted-foreground">Order Date: {selectedOrder.date}</p>
                </div>
                <Badge
                  className="ml-auto"
                  variant={
                    selectedOrder.status === "Delivered"
                      ? "outline"
                      : selectedOrder.status === "Shipped"
                        ? "default"
                        : selectedOrder.status === "Processing"
                          ? "secondary"
                          : "destructive"
                  }
                >
                  {selectedOrder.status}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 font-bold">
                    <p>Total</p>
                    <p>${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Delivery Information</h4>
                  <p className="text-sm">{selectedOrder.deliveryAddress}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Payment Method</h4>
                  <p className="text-sm">{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {selectedOrder.prescription && (
                <div>
                  <h4 className="font-medium mb-2">Prescription Information</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm">
                      <span className="font-medium">Prescription ID:</span> {selectedOrder.prescription.id}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Doctor:</span> {selectedOrder.prescription.doctor}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Date:</span> {selectedOrder.prescription.date}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Update Order Status</h4>
                <Select defaultValue={selectedOrder.status.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add notes about this order" rows={2} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOrderDetailsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleUpdateOrderStatus(selectedOrder.id, "processing")
                  setIsOrderDetailsDialogOpen(false)
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <HeartbeatThrobber className="mr-2" />
                    Updating...
                  </>
                ) : selectedOrder.status === "Pending" ? (
                  "Process Order"
                ) : (
                  "Update Order"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
