import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Heart, Brain, Activity, Shield, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">How MY HEALTH Works</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover how our comprehensive digital healthcare system transforms the way you monitor and manage your
          health.
        </p>
      </div>

      {/* Video Section */}
      <div className="mb-16">
        <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="MY HEALTH System Overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-center text-muted-foreground mt-4">
          Watch our overview video to see how MY HEALTH revolutionizes healthcare
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monitoring">Health Monitoring</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
          <TabsTrigger value="doctors">Doctor Connection</TabsTrigger>
          <TabsTrigger value="security">Data Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">The Complete Healthcare Solution</h2>
              <p className="text-lg mb-6">
                MY HEALTH combines IoT devices, AI technology, and a user-friendly mobile application to create a
                comprehensive healthcare monitoring system that bridges the gap between patients and healthcare
                providers.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Continuous Monitoring</h3>
                    <p>
                      Wearable IoT sensors track your vital signs 24/7, providing real-time data on your health status.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI-Powered Analysis</h3>
                    <p>
                      Advanced algorithms analyze your health data to provide personalized insights and early detection
                      of potential issues.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Doctor Communication</h3>
                    <p>
                      Connect with healthcare providers through secure messaging and video consultations for timely
                      medical advice.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700">
                <Link href="/features">Explore All Features</Link>
              </Button>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="MY HEALTH System Overview"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-6 text-center">How It All Works Together</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                      <Activity className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Step 1: Data Collection</h4>
                    <p className="text-sm">
                      Wearable devices and sensors collect your health data continuously throughout the day.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                      <ArrowRight className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Step 2: Data Transmission</h4>
                    <p className="text-sm">
                      Data is securely transmitted to the MY HEALTH platform via Bluetooth or Wi-Fi.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                      <Brain className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Step 3: AI Analysis</h4>
                    <p className="text-sm">
                      Our AI algorithms analyze your data to identify patterns and potential health concerns.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                      <MessageSquare className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Step 4: Insights & Action</h4>
                    <p className="text-sm">
                      Receive personalized insights and connect with healthcare providers when needed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold mb-4">Real-time Health Monitoring</h2>
              <p className="text-lg mb-6">
                MY HEALTH continuously monitors your vital signs through wearable IoT sensors, providing you with
                real-time data on your health status.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Vital Signs Tracking</h3>
                    <p>
                      Monitor heart rate, blood pressure, oxygen levels, and temperature with clinical-grade accuracy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Activity Monitoring</h3>
                    <p>
                      Track steps, exercise, sleep patterns, and calorie expenditure to maintain a healthy lifestyle.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Alert System</h3>
                    <p>
                      Receive immediate notifications when vital signs exceed normal ranges, allowing for timely
                      intervention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] order-1 lg:order-2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Health Monitoring"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">AI-Driven Health Insights</h2>
              <p className="text-lg mb-6">
                Our advanced AI algorithms analyze your health data to provide personalized insights and early detection
                of potential health issues.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Predictive Analytics</h3>
                    <p>
                      Identify potential health risks before they become serious by analyzing patterns in your health
                      data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Personalized Recommendations</h3>
                    <p>
                      Receive tailored health advice based on your unique health profile, goals, and medical history.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Continuous Learning</h3>
                    <p>
                      Our AI system improves over time as it learns from your data, providing increasingly accurate
                      insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AI Health Insights"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold mb-4">Doctor-Patient Connection</h2>
              <p className="text-lg mb-6">
                MY HEALTH bridges the gap between patients and healthcare providers through secure communication
                channels and data sharing.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Secure Messaging</h3>
                    <p>
                      Communicate with your healthcare providers through encrypted messaging for non-urgent questions
                      and follow-ups.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Video Consultations</h3>
                    <p>
                      Schedule and conduct virtual appointments with your doctors, saving time and reducing unnecessary
                      hospital visits.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Data Sharing</h3>
                    <p>
                      Share your health data with authorized healthcare providers to enable better-informed medical
                      decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] order-1 lg:order-2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Doctor Connection"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Data Security & Privacy</h2>
              <p className="text-lg mb-6">
                MY HEALTH prioritizes the security and privacy of your health data through advanced encryption and
                strict access controls.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">End-to-End Encryption</h3>
                    <p>
                      All data transmitted between devices and our servers is protected with AES-256 encryption,
                      ensuring that sensitive health information remains secure.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">User Control</h3>
                    <p>
                      You have complete control over who can access your health data and can revoke access at any time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Compliance</h3>
                    <p>
                      MY HEALTH adheres to international data protection standards and healthcare regulations to ensure
                      your information is handled responsibly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Data Security"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Experience the Future of Healthcare?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Join thousands of users who are already benefiting from MY HEALTH's comprehensive digital healthcare system.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
