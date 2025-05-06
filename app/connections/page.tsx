import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Server, Cloud, Activity, Shield, LinkIcon, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ConnectionsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Connections & Integrations</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Connect MY HEALTH with your devices, healthcare providers, and third-party services for a seamless health
          monitoring experience.
        </p>
      </div>

      {/* Featured Connection - Life Suit */}
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              Featured
            </div>
            <h2 className="text-2xl font-bold mb-4">Life Suit Prototype</h2>
            <p className="text-lg mb-4">
              Connect the revolutionary Life Suit prototype to MY HEALTH for comprehensive health monitoring and
              advanced biometric tracking.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Zap className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span>Advanced biometric sensors for continuous health monitoring</span>
              </li>
              <li className="flex items-start">
                <Zap className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span>Multiple connection options: Bluetooth, USB, Wi-Fi</span>
              </li>
              <li className="flex items-start">
                <Zap className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span>Real-time data transmission to MY HEALTH platform</span>
              </li>
            </ul>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/connections/life-suit">Connect Life Suit</Link>
            </Button>
          </div>
          <div className="relative h-[300px]">
            <Image src="/images/life-suit-office.png" alt="Life Suit Prototype" fill className="object-contain" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="devices" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="devices">IoT Devices</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare Systems</TabsTrigger>
          <TabsTrigger value="apps">Third-Party Apps</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Connect Your Health Devices</h2>
              <p className="text-lg mb-6">
                MY HEALTH seamlessly integrates with a wide range of IoT health monitoring devices to provide you with
                comprehensive health insights.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Easy Pairing</h3>
                    <p>
                      Connect your devices with a simple scan or tap. Our Bluetooth and Wi-Fi connectivity ensures quick
                      and reliable pairing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Real-time Sync</h3>
                    <p>
                      Your health data is automatically synchronized in real-time, ensuring you always have the most
                      up-to-date information.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Secure Transmission</h3>
                    <p>
                      All data transmitted between your devices and MY HEALTH is encrypted end-to-end for maximum
                      security and privacy.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700">
                <Link href="/devices">View Compatible Devices</Link>
              </Button>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/life-suit-group.png"
                alt="Device Connection"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Activity className="h-16 w-16 text-blue-600" />
                </div>
                <CardTitle className="text-center">Wearables</CardTitle>
                <CardDescription className="text-center">Smartwatches and fitness trackers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>MY HEALTH Watch</span>
                    <Badge className="bg-green-600">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>MY HEALTH Band</span>
                    <Badge className="bg-green-600">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Life Suit</span>
                    <Badge>Compatible</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Apple Watch</span>
                    <Badge>Compatible</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/connections/wearables">Manage Wearables</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Activity className="h-16 w-16 text-blue-600" />
                </div>
                <CardTitle className="text-center">Home Devices</CardTitle>
                <CardDescription className="text-center">Smart scales and monitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Blood Pressure Monitor</span>
                    <Badge className="bg-green-600">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Smart Scale</span>
                    <Badge>Compatible</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Glucose Monitor</span>
                    <Badge>Compatible</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sleep Monitor</span>
                    <Badge>Compatible</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/connections/home-devices">Manage Home Devices</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Activity className="h-16 w-16 text-blue-600" />
                </div>
                <CardTitle className="text-center">Medical Devices</CardTitle>
                <CardDescription className="text-center">Professional health equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>ECG Monitor</span>
                    <Badge>Compatible</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pulse Oximeter</span>
                    <Badge>Compatible</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Thermometer</span>
                    <Badge>Compatible</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Spirometer</span>
                    <Badge>Compatible</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/connections/medical-devices">Manage Medical Devices</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Activity className="h-16 w-16 text-blue-600" />
                </div>
                <CardTitle className="text-center">Add New Device</CardTitle>
                <CardDescription className="text-center">Connect additional health devices</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-[144px]">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/connections/add-device">
                    <LinkIcon className="mr-2 h-4 w-4" /> Connect New Device
                  </Link>
                </Button>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/devices">View Compatible Devices</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="healthcare" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold mb-4">Healthcare Provider Integration</h2>
              <p className="text-lg mb-6">
                Securely connect your MY HEALTH account with healthcare providers to share your health data and receive
                better care.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Server className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Electronic Health Records</h3>
                    <p>
                      Integrate with major EHR systems to ensure your healthcare providers have access to your complete
                      health history.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Secure Data Sharing</h3>
                    <p>
                      You control what data is shared and with whom. Revoke access at any time with our granular
                      permission system.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Cloud className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Remote Monitoring</h3>
                    <p>
                      Enable your healthcare providers to monitor your health remotely and receive alerts when
                      intervention is needed.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700">
                <Link href="/connections/healthcare">Connect Healthcare Provider</Link>
              </Button>
            </div>
            <div className="relative h-[400px] order-1 lg:order-2">
              <Image
                src="/images/life-suit-business.png"
                alt="Healthcare Integration"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="apps" className="space-y-8">
          {/* Content for apps tab */}
        </TabsContent>

        <TabsContent value="api" className="space-y-8">
          {/* Content for API tab */}
        </TabsContent>
      </Tabs>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help with Connections?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Our support team can help you connect your devices and integrate with healthcare systems.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/support">View Support Resources</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
