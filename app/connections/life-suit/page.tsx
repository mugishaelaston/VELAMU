"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Bluetooth, Usb, Wifi, AlertCircle, CheckCircle2, RefreshCw, HelpCircle, Info, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LifeSuitConnectionPage() {
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected")
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [scanningDevices, setScanningDevices] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showHelp, setShowHelp] = useState(false)

  // Mock devices
  const mockDevices = [
    { id: "LS-2025-A1", name: "Life Suit Pro", type: "bluetooth", battery: 85, signal: "strong" },
    { id: "LS-2025-B3", name: "Life Suit Medical", type: "bluetooth", battery: 72, signal: "medium" },
    { id: "LS-2024-C7", name: "Life Suit Compact", type: "bluetooth", battery: 64, signal: "weak" },
  ]

  const handleConnect = (deviceId: string) => {
    setSelectedDevice(deviceId)
    setConnectionStatus("connecting")

    // Simulate connection progress
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setConnectionStatus("connected")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleDisconnect = () => {
    setConnectionStatus("disconnected")
    setSelectedDevice(null)
    setProgress(0)
  }

  const handleScan = () => {
    setScanningDevices(true)
    setTimeout(() => {
      setScanningDevices(false)
    }, 3000)
  }

  const getSelectedDevice = () => {
    return mockDevices.find((device) => device.id === selectedDevice)
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Life Suit Connection</h1>
          <p className="text-muted-foreground">
            Connect your Life Suit prototype to MY HEALTH for comprehensive health monitoring
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowHelp(!showHelp)} className="flex items-center">
          <HelpCircle className="mr-2 h-4 w-4" />
          Connection Help
        </Button>
      </div>

      {showHelp && (
        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle>Need help connecting your Life Suit?</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              Ask SANA AI for assistance by clicking the chat icon in the bottom right corner of your screen. SANA AI is
              trained to help you with Life Suit connection issues.
            </p>
            <Button
              variant="link"
              className="p-0 text-blue-600"
              onClick={() => {
                // This would trigger the SANA AI chat with a predefined question
                const event = new CustomEvent("openSanaAI", {
                  detail: { message: "How do I connect my Life Suit to MY HEALTH?" },
                })
                window.dispatchEvent(event)
              }}
            >
              Ask SANA AI about Life Suit connection
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Life Suit Prototype</CardTitle>
              <CardDescription>The advanced health monitoring wearable system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-[300px] mb-4 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src="/images/life-suit-tshirt.png"
                  alt="Life Suit Prototype"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">
                    {connectionStatus === "connected" ? (
                      <span className="text-green-600 flex items-center">
                        <CheckCircle2 className="mr-1 h-4 w-4" /> Connected
                      </span>
                    ) : connectionStatus === "connecting" ? (
                      <span className="text-amber-600 flex items-center">
                        <RefreshCw className="mr-1 h-4 w-4 animate-spin" /> Connecting...
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center">
                        <AlertCircle className="mr-1 h-4 w-4" /> Disconnected
                      </span>
                    )}
                  </span>
                </div>
                {selectedDevice && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Device:</span>
                      <span className="font-medium">{getSelectedDevice()?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Battery:</span>
                      <span className="font-medium">{getSelectedDevice()?.battery}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Signal:</span>
                      <span className="font-medium capitalize">{getSelectedDevice()?.signal}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {connectionStatus === "connected" ? (
                <Button variant="destructive" onClick={handleDisconnect} className="w-full">
                  Disconnect Life Suit
                </Button>
              ) : (
                <div className="w-full">
                  {connectionStatus === "connecting" && (
                    <div className="mb-4">
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-center mt-1 text-muted-foreground">
                        Connecting to Life Suit... {progress}%
                      </p>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleScan}
                    className="w-full"
                    disabled={connectionStatus === "connecting"}
                  >
                    <RefreshCw className={`mr-2 h-4 w-4 ${scanningDevices ? "animate-spin" : ""}`} />
                    {scanningDevices ? "Scanning..." : "Scan for Devices"}
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-blue-600" />
              Life Suit Features
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1" />
                <span>Advanced biometric sensors for continuous health monitoring</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1" />
                <span>Real-time data transmission to MY HEALTH platform</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1" />
                <span>Long-lasting battery for all-day monitoring</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1" />
                <span>Comfortable, lightweight design for everyday wear</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1" />
                <span>Water-resistant and durable construction</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <Tabs defaultValue="bluetooth">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bluetooth">
                <Bluetooth className="mr-2 h-4 w-4" />
                Bluetooth
              </TabsTrigger>
              <TabsTrigger value="usb">
                <Usb className="mr-2 h-4 w-4" />
                USB
              </TabsTrigger>
              <TabsTrigger value="other">
                <Wifi className="mr-2 h-4 w-4" />
                Other
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bluetooth" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bluetooth Connection</CardTitle>
                  <CardDescription>Connect your Life Suit wirelessly via Bluetooth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative h-[200px] mb-4 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src="/images/life-suit-business.png"
                        alt="Bluetooth Connection"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <Alert variant="default" className="bg-blue-50 border-blue-200">
                      <Info className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        Make sure your Life Suit is powered on and in pairing mode (press and hold the power button for
                        5 seconds until the LED flashes blue).
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <h3 className="font-medium">Available Devices</h3>
                      {mockDevices.map((device) => (
                        <div
                          key={device.id}
                          className={`flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${selectedDevice === device.id ? "border-blue-500 bg-blue-50" : ""}`}
                          onClick={() => connectionStatus !== "connecting" && handleConnect(device.id)}
                        >
                          <div className="flex items-center">
                            <Bluetooth className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <p className="font-medium">{device.name}</p>
                              <p className="text-xs text-muted-foreground">{device.id}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge variant={device.signal === "strong" ? "default" : "outline"} className="mr-2">
                              {device.battery}%
                            </Badge>
                            {selectedDevice === device.id && connectionStatus === "connected" ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <Button
                                size="sm"
                                disabled={connectionStatus === "connecting"}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleConnect(device.id)
                                }}
                              >
                                Connect
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usb" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>USB Connection</CardTitle>
                  <CardDescription>Connect your Life Suit directly via USB cable</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative h-[200px] mb-4 bg-gray-100 rounded-md overflow-hidden">
                      <Image src="/images/life-suit-group.png" alt="USB Connection" fill className="object-contain" />
                    </div>

                    <Alert variant="default" className="bg-blue-50 border-blue-200">
                      <Info className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        <ol className="list-decimal ml-4 space-y-2">
                          <li>Connect the USB cable to your Life Suit</li>
                          <li>Connect the other end to your computer or mobile device</li>
                          <li>Ensure your Life Suit is powered on</li>
                          <li>Click the "Connect via USB" button below</li>
                        </ol>
                      </AlertDescription>
                    </Alert>

                    <Button className="w-full" disabled={connectionStatus === "connecting"}>
                      <Usb className="mr-2 h-4 w-4" />
                      Connect via USB
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="other" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Other Connection Methods</CardTitle>
                  <CardDescription>Alternative ways to connect your Life Suit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative h-[200px] mb-4 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src="/images/life-suit-illustration.png"
                        alt="Other Connection Methods"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium flex items-center mb-2">
                        <Wifi className="h-5 w-5 text-blue-600 mr-2" />
                        Wi-Fi Connection
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect your Life Suit to your local Wi-Fi network for seamless data transmission.
                      </p>
                      <Button variant="outline" className="w-full">
                        Set Up Wi-Fi Connection
                      </Button>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium flex items-center mb-2">
                        <svg
                          className="h-5 w-5 text-blue-600 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                          <path d="M8 12H16" />
                          <path d="M12 16V8" />
                        </svg>
                        NFC Pairing
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Tap your Life Suit against your NFC-enabled device for quick pairing.
                      </p>
                      <Button variant="outline" className="w-full">
                        Initiate NFC Pairing
                      </Button>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium flex items-center mb-2">
                        <svg
                          className="h-5 w-5 text-blue-600 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M22 7H2" />
                          <path d="M7 12H12" />
                        </svg>
                        Manual Configuration
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Manually enter your Life Suit's serial number and pairing code.
                      </p>
                      <Button variant="outline" className="w-full">
                        Manual Setup
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-xl font-bold mb-4">Troubleshooting</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Common Issues</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-1" />
                <span>Life Suit not powering on</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-1" />
                <span>Bluetooth connection failing</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-1" />
                <span>Data not syncing properly</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-1" />
                <span>Battery draining too quickly</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Get Help</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Need assistance with your Life Suit? Our support team and SANA AI are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  // This would trigger the SANA AI chat
                  const event = new CustomEvent("openSanaAI", {
                    detail: { message: "I'm having trouble connecting my Life Suit" },
                  })
                  window.dispatchEvent(event)
                }}
              >
                Ask SANA AI
              </Button>
              <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Link href="/support">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
