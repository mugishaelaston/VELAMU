import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Heart, Smartphone, Watch, Wifi } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DevicesPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">IoT Devices</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our range of compatible IoT devices that seamlessly integrate with the MY HEALTH platform.
        </p>
      </div>

      <Tabs defaultValue="wearables" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="wearables">Wearables</TabsTrigger>
          <TabsTrigger value="home">Home Devices</TabsTrigger>
          <TabsTrigger value="medical">Medical Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="wearables" className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Watch className="h-16 w-16 text-blue-600" />
                </div>
                <CardTitle>MY HEALTH Watch</CardTitle>
                <CardDescription>Advanced health monitoring smartwatch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="MY HEALTH Watch"
                    fill
                    className="object-contain"
                  />
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Heart className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>Continuous heart rate monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <Activity className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>Blood oxygen level tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Wifi className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>Real-time data sync with MY HEALTH app</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/devices/watch">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Activity className="h-16 w-16 text-blue-600" />
                </div>
                <CardTitle>MY HEALTH Band</CardTitle>
                <CardDescription>Lightweight fitness and health tracker</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="MY HEALTH Band"
                    fill
                    className="object-contain"
                  />
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Heart className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>Heart rate and sleep tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Activity className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>Step counter and activity monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <Wifi className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>7-day battery life</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/devices/band">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Smartphone className="h-16 w-16 text-blue-600" />
                </div>
                <CardTitle>MY HEALTH App</CardTitle>
                <CardDescription>Mobile application for iOS and Android</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="MY HEALTH App"
                    fill
                    className="object-contain"
                  />
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Heart className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>Central hub for all health data</span>
                  </li>
                  <li className="flex items-start">
                    <Activity className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>AI-powered health insights</span>
                  </li>
                  <li className="flex items-start">
                    <Wifi className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>Compatible with all MY HEALTH devices</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/devices/app">Download App</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="home" className="space-y-8">
          <div className="text-center mb-8">
            <p>Our home health monitoring devices help you track your health from the comfort of your home.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Home devices content would go here */}
            <Card>
              <CardHeader>
                <CardTitle>Smart Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Coming soon...</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Coming soon...</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sleep Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medical" className="space-y-8">
          <div className="text-center mb-8">
            <p>Professional-grade medical devices for comprehensive health monitoring.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Medical devices content would go here */}
            <Card>
              <CardHeader>
                <CardTitle>ECG Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Coming soon...</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Glucose Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Coming soon...</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pulse Oximeter</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-blue-50 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Compatible Third-Party Devices</h2>
          <p className="text-muted-foreground">
            MY HEALTH integrates with popular health devices from leading manufacturers.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
              <p className="font-medium">Partner {i}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help Choosing the Right Device?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Our team can help you select the best devices for your health monitoring needs.
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
