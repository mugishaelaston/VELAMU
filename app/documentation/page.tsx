import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, BookOpen, Code, Server } from "lucide-react"
import Link from "next/link"

export default function DocumentationPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Documentation</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comprehensive guides and resources to help you get the most out of MY HEALTH.
        </p>
      </div>

      <Tabs defaultValue="user-guides" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="user-guides">
            <BookOpen className="h-4 w-4 mr-2" />
            User Guides
          </TabsTrigger>
          <TabsTrigger value="api">
            <Code className="h-4 w-4 mr-2" />
            API Reference
          </TabsTrigger>
          <TabsTrigger value="devices">
            <Server className="h-4 w-4 mr-2" />
            Device Manuals
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <FileText className="h-4 w-4 mr-2" />
            Tutorials
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user-guides" className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Essential guides for new users</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Creating your account
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Setting up your profile
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Connecting your first device
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Understanding your dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Setting health goals
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Monitoring</CardTitle>
                <CardDescription>Learn about tracking your health</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Understanding vital signs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Interpreting health metrics
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Setting up alerts and notifications
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Tracking long-term health trends
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Exporting health data
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Doctor Interactions</CardTitle>
                <CardDescription>Guides for healthcare provider features</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Sharing data with healthcare providers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Setting up video consultations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Secure messaging with doctors
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Managing prescriptions
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Scheduling appointments
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-8">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">MY HEALTH API Documentation</h2>
            <p className="mb-4">
              Our comprehensive API allows developers to integrate MY HEALTH functionality into their applications.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Authentication</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Learn how to authenticate your requests to the MY HEALTH API.
                </p>
                <Link href="#" className="text-blue-600 hover:underline text-sm">
                  View Authentication Docs →
                </Link>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Endpoints</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Explore the available API endpoints and their parameters.
                </p>
                <Link href="#" className="text-blue-600 hover:underline text-sm">
                  View Endpoints Docs →
                </Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Data</CardTitle>
                <CardDescription>Access and manage user information</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">GET /users</code>
                    <p className="text-muted-foreground">Retrieve user information</p>
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">POST /users</code>
                    <p className="text-muted-foreground">Create a new user</p>
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">PUT /users/{"{id}"}</code>
                    <p className="text-muted-foreground">Update user information</p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Data</CardTitle>
                <CardDescription>Work with health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">GET /health/metrics</code>
                    <p className="text-muted-foreground">Retrieve health metrics</p>
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">POST /health/metrics</code>
                    <p className="text-muted-foreground">Add new health data</p>
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">GET /health/trends</code>
                    <p className="text-muted-foreground">Analyze health trends</p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Devices</CardTitle>
                <CardDescription>Manage connected devices</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">GET /devices</code>
                    <p className="text-muted-foreground">List connected devices</p>
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">POST /devices/pair</code>
                    <p className="text-muted-foreground">Pair a new device</p>
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">DELETE /devices/{"{id}"}</code>
                    <p className="text-muted-foreground">Remove a device</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>MY HEALTH Watch</CardTitle>
                <CardDescription>User manual and specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Quick start guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Full user manual
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Technical specifications
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Troubleshooting
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Firmware updates
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MY HEALTH Band</CardTitle>
                <CardDescription>User manual and specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Quick start guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Full user manual
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Technical specifications
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Troubleshooting
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Firmware updates
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure Monitor</CardTitle>
                <CardDescription>User manual and specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Quick start guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Full user manual
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Technical specifications
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Troubleshooting
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Calibration guide
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Beginner Tutorials</CardTitle>
                <CardDescription>Getting started with MY HEALTH</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Setting up your account
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Pairing your first device
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Navigating the dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Setting health goals
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Understanding your health metrics
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intermediate Tutorials</CardTitle>
                <CardDescription>Advanced features and customization</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Customizing your health dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Setting up custom alerts
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Sharing data with healthcare providers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Analyzing health trends
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Managing multiple devices
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Step-by-step visual guides</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Complete setup walkthrough
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Using the MY HEALTH Watch
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Setting up video consultations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Troubleshooting common issues
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Advanced health tracking features
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Our support team is ready to help you with any questions or issues you may have.
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
