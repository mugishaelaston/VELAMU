import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Brain, FileText, Laptop, Shield, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LearnMorePage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Learn More About MY HEALTH</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover how our comprehensive digital healthcare system is revolutionizing patient care through innovative
          technology and AI-driven insights.
        </p>
      </div>

      <Tabs defaultValue="technology" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="security">Security & Privacy</TabsTrigger>
          <TabsTrigger value="future">Future Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="technology" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Cutting-Edge Technology</h2>
              <p className="text-lg mb-6">
                MY HEALTH leverages the latest advancements in IoT, AI, and cloud computing to deliver a comprehensive
                healthcare solution that's both powerful and user-friendly.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Laptop className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Frontend Development</h3>
                    <p>
                      Built with React.js for a responsive and intuitive user interface that works seamlessly across
                      devices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Backend Development</h3>
                    <p>
                      Powered by Node.js and Express.js with Firebase and PostgreSQL for robust data management and
                      processing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI & Data Analytics</h3>
                    <p>
                      Utilizing Python, TensorFlow, and OpenAI API to provide intelligent health insights and predictive
                      analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="MY HEALTH Technology Stack"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>IoT Integration</CardTitle>
                <CardDescription>Connecting wearable devices to your healthcare</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our system integrates with Arduino, Raspberry Pi, and ESP32 devices to collect real-time health data
                  from wearable sensors, providing continuous monitoring of vital signs.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cloud Infrastructure</CardTitle>
                <CardDescription>Scalable and reliable data storage</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  MY HEALTH utilizes cloud-based health data storage to securely maintain patient records and enable
                  easy retrieval for medical analysis and tracking.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Machine Learning Models</CardTitle>
                <CardDescription>Intelligent health predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our AI models analyze collected data to predict potential health risks and provide personalized
                  recommendations based on historical data and medical guidelines.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold mb-4">Implementation Strategy</h2>
              <p className="text-lg mb-6">
                MY HEALTH follows a comprehensive implementation approach to ensure successful deployment and adoption
                across healthcare ecosystems.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">Phase 1: Research and Planning</h3>
                  <p className="text-muted-foreground">
                    Identifying healthcare challenges and user requirements through surveys and collaboration with
                    healthcare professionals.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">Phase 2: Prototyping and Development</h3>
                  <p className="text-muted-foreground">
                    Building initial prototypes for wearable sensors and the MY HEALTH app, developing AI models for
                    predictive healthcare.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">Phase 3: Testing and Optimization</h3>
                  <p className="text-muted-foreground">
                    Conducting beta testing with selected users and doctors, optimizing AI algorithms for accurate
                    health predictions.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">Phase 4: Deployment and Scaling</h3>
                  <p className="text-muted-foreground">
                    Launching the platform in pilot locations, expanding features based on real-world usage, and
                    partnering with healthcare institutions.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] order-1 lg:order-2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Implementation Strategy"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Business Model</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Revenue Streams</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0" />
                    <span>Subscription-based services for advanced AI analysis and doctor consultations</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0" />
                    <span>Partnerships with hospitals and clinics for integration</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0" />
                    <span>Medical data analytics services for research institutions</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Partnership Opportunities</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0" />
                    <span>Healthcare providers and hospital networks</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0" />
                    <span>Insurance companies for preventive care incentives</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-blue-600 mr-2 shrink-0" />
                    <span>Pharmaceutical and medical device manufacturers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Security & Privacy</h2>
              <p className="text-lg mb-6">
                MY HEALTH prioritizes the security and privacy of patient data through advanced encryption techniques
                and compliance with healthcare regulations.
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
                    <h3 className="font-semibold text-lg">Blockchain Technology</h3>
                    <p>
                      We utilize blockchain for medical data security, creating an immutable record of all transactions
                      and preventing unauthorized modifications to patient records.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Regulatory Compliance</h3>
                    <p>
                      MY HEALTH is designed to comply with healthcare regulations and data protection laws, including
                      HIPAA, GDPR, and other regional healthcare privacy standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Security and Privacy"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Access Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  MY HEALTH implements strict role-based access controls, ensuring that only authorized personnel can
                  access patient information, with comprehensive audit trails for all data access.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Secure Cloud Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Patient data is stored in secure, redundant cloud environments with regular security audits and
                  penetration testing to identify and address potential vulnerabilities.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Patient Consent Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Our platform includes comprehensive consent management tools, allowing patients to control who can
                  access their health data and for what purposes.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="future" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold mb-4">Future Roadmap</h2>
              <p className="text-lg mb-6">
                MY HEALTH is continuously evolving to incorporate new technologies and expand its capabilities to better
                serve patients and healthcare providers.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">Integration with Wearable Devices</h3>
                  <p className="text-muted-foreground">
                    Expanding compatibility with popular smartwatches and fitness trackers to provide seamless health
                    monitoring.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">Advanced Predictive Analytics</h3>
                  <p className="text-muted-foreground">
                    Enhancing AI capabilities to analyze trends and provide more precise health forecasts and early
                    disease detection.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">Mental Health Monitoring</h3>
                  <p className="text-muted-foreground">
                    Expanding into mental health with AI-driven mood analysis and recommendations for mental well-being.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">Global Expansion</h3>
                  <p className="text-muted-foreground">
                    Localizing MY HEALTH for different regions and languages to serve diverse populations worldwide.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] order-1 lg:order-2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Future Roadmap"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-6 text-center">Research & Development Focus Areas</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-10 w-10 text-blue-600 mb-4" />
                <h4 className="font-semibold text-lg mb-2">Personalized Medicine</h4>
                <p>
                  Developing AI models that can recommend personalized treatment plans based on individual genetic
                  profiles and health history.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Brain className="h-10 w-10 text-blue-600 mb-4" />
                <h4 className="font-semibold text-lg mb-2">Advanced Diagnostics</h4>
                <p>
                  Creating more sophisticated diagnostic tools that can detect diseases at earlier stages through
                  pattern recognition in health data.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Shield className="h-10 w-10 text-blue-600 mb-4" />
                <h4 className="font-semibold text-lg mb-2">Interoperability</h4>
                <p>
                  Working on standards and protocols to ensure MY HEALTH can seamlessly integrate with existing
                  healthcare systems and electronic health records.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Experience the Future of Healthcare?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Join MY HEALTH today and take control of your health with our comprehensive digital healthcare system.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/register">Sign Up Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Request a Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
