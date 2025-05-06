import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Brain,
  Calendar,
  Clock,
  Heart,
  LineChart,
  MessageSquare,
  Pill,
  Shield,
  Smartphone,
  User,
  Video,
  Wand2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeaturesPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Comprehensive Features</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          MY HEALTH combines cutting-edge technology with user-friendly design to provide a complete healthcare
          solution. Explore our key features below.
        </p>
      </div>

      {/* Hero Feature */}
      <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl font-bold mb-4">Real-time Health Monitoring</h2>
          <p className="text-lg mb-4">
            Our wearable IoT sensors continuously track vital signs and send real-time data to the MY HEALTH app,
            allowing you to monitor your health status anytime, anywhere.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <Heart className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <span>Continuous tracking of heart rate, blood pressure, and oxygen levels</span>
            </li>
            <li className="flex items-start">
              <Activity className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <span>Interactive data visualization through charts and reports</span>
            </li>
            <li className="flex items-start">
              <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <span>Automated alerts when vital signs exceed normal ranges</span>
            </li>
          </ul>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/dashboard">Try the Dashboard</Link>
          </Button>
        </div>
        <div className="relative h-[300px] lg:h-[400px] order-1 lg:order-2">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Real-time Health Monitoring"
            fill
            className="object-contain rounded-lg"
          />
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardHeader>
            <Brain className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>AI-Driven Health Insights</CardTitle>
            <CardDescription>
              Advanced machine learning models analyze your health data to provide personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Wand2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Predictive analytics for potential health risks</span>
              </li>
              <li className="flex items-start">
                <Wand2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Personalized health recommendations</span>
              </li>
              <li className="flex items-start">
                <Wand2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Early detection of conditions like hypertension and diabetes</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Doctor-Patient Communication</CardTitle>
            <CardDescription>
              Connect with healthcare providers through secure messaging and video consultations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Video className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>High-quality video consultations</span>
              </li>
              <li className="flex items-start">
                <MessageSquare className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Secure in-app messaging</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Encrypted prescription sharing</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Emergency Response System</CardTitle>
            <CardDescription>
              Automated alerts to doctors and emergency contacts when critical health conditions are detected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Activity className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Real-time critical condition detection</span>
              </li>
              <li className="flex items-start">
                <User className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Automatic notification to emergency contacts</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Location tracking for emergency responders</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Medical Record Management</CardTitle>
            <CardDescription>Centralized storage of patient history, lab results, and prescriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Shield className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Secure blockchain-based data storage</span>
              </li>
              <li className="flex items-start">
                <User className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Easy sharing with healthcare providers</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Complete medical history at your fingertips</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Pill className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Medication and Appointment Reminders</CardTitle>
            <CardDescription>AI-driven reminders for medicine intake and doctor visits</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Calendar className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Smart scheduling and reminders</span>
              </li>
              <li className="flex items-start">
                <Pill className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Medication tracking and refill notifications</span>
              </li>
              <li className="flex items-start">
                <Smartphone className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Integration with pharmacy services</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <LineChart className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Health Education and Awareness</CardTitle>
            <CardDescription>AI-curated articles and videos on various health topics</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Brain className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Personalized health content</span>
              </li>
              <li className="flex items-start">
                <Activity className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Daily tips and health challenges</span>
              </li>
              <li className="flex items-start">
                <Smartphone className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Integration with fitness tracking</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* SANA AI Feature */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              Featured
            </div>
            <h2 className="text-2xl font-bold mb-4">Meet SANA AI - Your Personal Health Assistant</h2>
            <p className="text-lg mb-4">
              SANA AI is your intelligent health companion, available 24/7 to answer questions, provide guidance, and
              help you navigate your healthcare journey.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Brain className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span>Answers health-related questions with medical knowledge</span>
              </li>
              <li className="flex items-start">
                <Calendar className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span>Helps schedule appointments and set medication reminders</span>
              </li>
              <li className="flex items-start">
                <Heart className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span>Provides personalized health tips based on your data</span>
              </li>
            </ul>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="#chat-with-sana">Chat with SANA AI</Link>
            </Button>
          </div>
          <div className="relative h-[300px]">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="SANA AI Assistant"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Healthcare Experience?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Join thousands of users who are already benefiting from MY HEALTH's comprehensive digital healthcare system.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
