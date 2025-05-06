import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Shield, Brain, Users, Globe, Award, Code, Lightbulb, Leaf } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center mb-16">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">About MY HEALTH</h1>
          <p className="text-lg text-muted-foreground mb-6">
            MY HEALTH is an advanced digital healthcare system designed to revolutionize patient care through IoT
            technology, AI-driven analytics, and a user-friendly mobile application.
          </p>
          <p className="text-lg mb-6">
            Our platform bridges the gap between patients and healthcare providers by offering real-time health
            monitoring, predictive diagnostics, and seamless doctor-patient communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/register">Join MY HEALTH</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
          <Image src="/images/founder.png" alt="MY HEALTH Founder" fill className="object-cover rounded-lg" />
        </div>
      </div>

      {/* Founder's Message Section */}
      <section className="mb-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1">
            <div className="relative h-[300px] w-full md:h-[400px]">
              <Image
                src="/images/founder.png"
                alt="Mugisha Elaston Sana - Founder"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold">Mugisha Elaston Sana</h3>
              <p className="text-blue-600">Founder & Developer</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Founder's Message</h2>
            <div className="space-y-4 text-lg">
              <p>
                Hi, I'm Mugisha Elaston Sana, a young innovator, developer, and problem-solver from Rwanda. As a
                passionate student and aspiring engineer, I believe that technology, when driven by purpose, has the
                power to transform lives and reshape the future.
              </p>
              <p>
                My journey started with curiosity and a deep desire to solve real-world problems in my
                community—especially in agriculture and healthcare. That vision inspired me to create projects like MY
                FARM, a smart farming platform that integrates AI, IoT, and weather intelligence to help farmers
                increase productivity and reduce food shortages. I also developed MY HEALTH, an intelligent
                health-monitoring system that empowers patients and doctors with real-time data, wearable sensors, and
                AI-driven guidance.
              </p>
              <p>
                Despite limited access to resources, I've committed myself to self-learning and continuous
                development—building, coding, testing, and improving these projects using tools like Python, JavaScript,
                React, Node.js, and OpenAI APIs. I've also explored IoT integration to bring innovation directly to the
                field and hospital.
              </p>
              <p>
                I'm currently a Grade 12 student at Ecole des Sciences Byimana, working hard not just in class, but also
                in labs and code editors—turning dreams into working prototypes. My mission is to create solutions that
                bring real impact, especially in underserved communities. I'm driven by hope, fueled by purpose, and
                powered by code.
              </p>
              <p>
                If you believe in building a smarter, healthier, and more sustainable world, join me. Let's shape the
                future—one idea at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              The idea for MY HEALTH was inspired by the need to improve healthcare accessibility and efficiency,
              especially in regions where medical resources are limited.
            </p>
            <p className="text-lg">
              By integrating smart technology into healthcare, MY HEALTH ensures timely intervention, reduces hospital
              congestion, and enhances patient outcomes through remote monitoring and AI-based recommendations.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Objectives</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Heart className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span>Enable real-time health monitoring through wearable IoT sensors</span>
              </li>
              <li className="flex items-start">
                <Brain className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span>Provide AI-powered insights and early detection of diseases</span>
              </li>
              <li className="flex items-start">
                <Users className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span>Offer a patient-doctor communication portal for seamless consultations</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span>Ensure data security and privacy using advanced encryption techniques</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Founder's Vision Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Founder's Vision</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <Lightbulb className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p>
              Creating technology solutions that are not just cutting-edge but also accessible and practical for
              real-world implementation, especially in resource-limited settings.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <Leaf className="h-10 w-10 text-green-600 mb-3" />
            <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
            <p>
              Developing systems that are sustainable both environmentally and economically, ensuring long-term impact
              and accessibility for communities across Rwanda and beyond.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <Code className="h-10 w-10 text-purple-600 mb-3" />
            <h3 className="text-xl font-semibold mb-3">Education</h3>
            <p>
              Inspiring the next generation of African innovators by demonstrating that with determination and
              creativity, young people can build solutions to their communities' most pressing challenges.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">For Patients</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Heart className="h-5 w-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
                <span>Continuous health monitoring and early disease detection</span>
              </li>
              <li className="flex items-start">
                <Heart className="h-5 w-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
                <span>Reduced medical expenses through preventive care</span>
              </li>
              <li className="flex items-start">
                <Heart className="h-5 w-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
                <span>Increased access to healthcare services, even in remote areas</span>
              </li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">For Doctors</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Users className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>Improved patient management and tracking</span>
              </li>
              <li className="flex items-start">
                <Users className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>Reduced workload by minimizing unnecessary hospital visits</span>
              </li>
              <li className="flex items-start">
                <Users className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>Access to real-time patient data for better decision-making</span>
              </li>
            </ul>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">For Society</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Globe className="h-5 w-5 text-purple-600 mr-2 mt-0.5 shrink-0" />
                <span>Enhanced public health through awareness and preventive care</span>
              </li>
              <li className="flex items-start">
                <Globe className="h-5 w-5 text-purple-600 mr-2 mt-0.5 shrink-0" />
                <span>Integration of AI and IoT in healthcare, paving the way for future innovations</span>
              </li>
              <li className="flex items-start">
                <Globe className="h-5 w-5 text-purple-600 mr-2 mt-0.5 shrink-0" />
                <span>Support for government healthcare initiatives through digital transformation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Awards & Recognition</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 border rounded-lg">
              <Award className="h-12 w-12 text-blue-600 mb-3" />
              <h3 className="font-semibold">Healthcare Innovation Award</h3>
              <p className="text-sm text-muted-foreground">2024</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
