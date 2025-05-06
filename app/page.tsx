import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/medical-dashboard.png"
            alt="Medical Dashboard"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Complete Health Monitoring Solution</h1>
              <p className="text-xl mb-8 max-w-lg">
                Track your vital signs, manage appointments, and take control of your health journey with MY HEALTH's
                comprehensive platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/learn-more">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src="/images/life-suit-wearable.png"
                  alt="Life Suit Wearable"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Health Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 mb-4 relative overflow-hidden rounded-md">
                <Image src="/images/doctor-patient.png" alt="Real-time Monitoring" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">
                Track your vital signs and health metrics in real-time with our advanced wearable technology.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 mb-4 relative overflow-hidden rounded-md">
                <Image src="/images/doctor-consultation.png" alt="Doctor Consultations" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Doctor Consultations</h3>
              <p className="text-gray-600">
                Connect with healthcare professionals and share your health data securely for better care.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 mb-4 relative overflow-hidden rounded-md">
                <Image src="/images/clinic-dashboard.png" alt="Health Analytics" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Analytics</h3>
              <p className="text-gray-600">
                Get personalized insights and recommendations based on your health data and patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Life Suit Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold mb-6">Introducing the Life Suit</h2>
              <p className="text-lg mb-6">
                Our revolutionary wearable health monitoring device that seamlessly connects to the MY HEALTH platform.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced biometric sensors for continuous health monitoring</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Multiple connection options: Bluetooth, USB, and Wi-Fi</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time data transmission to the MY HEALTH platform</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comfortable, lightweight design for everyday wear</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/connections/life-suit">Learn More About Life Suit</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image src="/images/life-suit-wearable.png" alt="Life Suit Wearable" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">JD</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-500">Patient</p>
                </div>
              </div>
              <p className="text-gray-600">
                "MY HEALTH has transformed how I manage my chronic condition. The real-time monitoring gives me peace of
                mind and helps me stay on top of my health."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">DR</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Dr. Rebecca Smith</h4>
                  <p className="text-sm text-gray-500">Cardiologist</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a healthcare provider, the data I receive from patients using MY HEALTH is invaluable. It allows me
                to provide more personalized and proactive care."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">MJ</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Maria Johnson</h4>
                  <p className="text-sm text-gray-500">Fitness Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I love how MY HEALTH integrates with my fitness routine. The insights I get help me optimize my
                workouts and recovery for better overall health."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already benefiting from MY HEALTH's comprehensive health monitoring
            platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/register">Sign Up Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
