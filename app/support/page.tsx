import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, FileText, MessageSquare, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { Twitter, Facebook, Instagram } from "lucide-react"

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I connect my wearable device to MY HEALTH?",
      answer:
        "To connect your wearable device, open the MY HEALTH app, go to Settings > Devices > Add New Device, and follow the on-screen instructions. Make sure your device is charged and Bluetooth is enabled on your phone.",
    },
    {
      question: "Is my health data secure?",
      answer:
        "Yes, we take data security very seriously. All your health data is encrypted both in transit and at rest. We use industry-standard security protocols and regularly audit our systems to ensure your information remains protected.",
    },
    {
      question: "Can I share my health data with my doctor?",
      answer:
        "MY HEALTH allows you to securely share your health data with healthcare providers. Go to the Dashboard, select the data you want to share, tap the Share button, and enter your doctor's email or MY HEALTH ID.",
    },
    {
      question: "How accurate are the health metrics?",
      answer:
        "Our health metrics are designed to be as accurate as possible, but they should not replace professional medical devices or diagnosis. The accuracy depends on the specific device used and proper wearing/usage techniques.",
    },
    {
      question: "What should I do if I receive an alert about my health?",
      answer:
        "If you receive a critical health alert, you should contact your healthcare provider immediately. For non-critical alerts, review the recommended actions in the app and consider scheduling a consultation with your doctor.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "To cancel your subscription, go to Settings > Account > Subscription > Cancel Subscription. Your access will continue until the end of your current billing period. You can reactivate your subscription at any time.",
    },
    {
      question: "Can multiple family members use the same account?",
      answer:
        "We recommend each user have their own account for accurate health tracking. However, our Family Plan allows you to manage multiple accounts from a single dashboard while maintaining individual privacy.",
    },
    {
      question: "How often should I sync my device?",
      answer:
        "For the most up-to-date information, we recommend syncing your device at least once daily. Many devices sync automatically when in range of your phone with the MY HEALTH app running in the background.",
    },
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Support Center</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions and get help with MY HEALTH products and services.
        </p>
      </div>

      <Tabs defaultValue="faq" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <FileText className="h-4 w-4 mr-2" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Us
          </TabsTrigger>
          <TabsTrigger value="community">
            <Phone className="h-4 w-4 mr-2" />
            Community
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.slice(0, 4).map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">&nbsp;</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.slice(4).map((faq, index) => (
                  <AccordionItem key={index + 4} value={`item-${index + 4}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="text-center">
            <p className="mb-4">Can't find what you're looking for?</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started Guide</CardTitle>
                <CardDescription>Learn the basics of using MY HEALTH</CardDescription>
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
                <CardTitle>Device Manuals</CardTitle>
                <CardDescription>Detailed guides for MY HEALTH devices</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      MY HEALTH Watch manual
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      MY HEALTH Band manual
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Blood pressure monitor guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Smart scale instructions
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Troubleshooting</CardTitle>
                <CardDescription>Solutions to common issues</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Connection problems
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Data syncing issues
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Account management
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Battery optimization
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out to our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <a href="mailto:melaston006@gmail.com" className="text-blue-600 hover:underline">
                      melaston006@gmail.com
                    </a>
                    <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone Support</h3>
                    <a href="tel:+250798523812" className="text-blue-600 hover:underline">
                      +250 798 523 812
                    </a>
                    <p className="text-sm text-muted-foreground">Available Monday-Friday, 9am-5pm</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="support-name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="support-name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="support-email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="support-email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="support-message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="support-message"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Community Support</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with other MY HEALTH users to share experiences, tips, and solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Forums</CardTitle>
                <CardDescription>Discuss with the MY HEALTH community</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Join our active user forums to ask questions, share your experiences, and learn from other users.
                </p>
                <Button asChild className="w-full">
                  <Link href="#">Visit Forums</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Learn through step-by-step guides</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Watch our collection of video tutorials covering everything from basic setup to advanced features.
                </p>
                <Button asChild className="w-full">
                  <Link href="#">Watch Videos</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>Follow us for updates and tips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <a
                    href="https://twitter.com/ELASTON___XANA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Twitter className="h-6 w-6 text-blue-400 mb-2" />
                    <span className="text-sm">Twitter</span>
                  </a>
                  <a
                    href="https://facebook.com/ELASTON.SANA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Facebook className="h-6 w-6 text-blue-600 mb-2" />
                    <span className="text-sm">Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com/ELASTON___XANA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 border rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <Instagram className="h-6 w-6 text-purple-600 mb-2" />
                    <span className="text-sm">Instagram</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Our support team is available to help you with any questions or issues you may have.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Contact Support</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="tel:+250798523812">Call Us</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
