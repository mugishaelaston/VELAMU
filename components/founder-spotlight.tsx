import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FounderSpotlight() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Founder</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/founder-portrait.png"
              alt="Mugisha Elaston Sana - Founder"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Mugisha Elaston Sana</h3>
            <p className="text-blue-600 mb-4">Founder & Developer</p>
            <p className="text-lg mb-6">
              "As a young innovator from Rwanda, I created MY HEALTH to transform healthcare access through technology.
              My vision is to empower patients and healthcare providers with real-time data and AI-driven insights,
              making quality healthcare accessible to everyone."
            </p>
            <p className="mb-6">
              Despite limited resources, I've committed myself to developing solutions that bring real impact,
              especially in underserved communities. I'm driven by hope, fueled by purpose, and powered by code.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/about">Read My Full Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
