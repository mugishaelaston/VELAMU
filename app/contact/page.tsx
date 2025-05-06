import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Have questions about MY HEALTH? Get in touch with us and we'll be happy to help.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help you?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" rows={5} />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to us directly using the information below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:melaston006@gmail.com" className="text-blue-600 hover:underline">
                    melaston006@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <a href="tel:+250798523812" className="text-blue-600 hover:underline">
                    +250 798 523 812
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p>Rwanda</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connect With Us</CardTitle>
              <CardDescription>Follow us on social media for updates and news.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <a
                  href="https://facebook.com/ELASTON.SANA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Facebook className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Facebook</span>
                  <span className="text-xs text-muted-foreground">ELASTON SANA</span>
                </a>
                <a
                  href="https://instagram.com/ELASTON___XANA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <Instagram className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium">Instagram</span>
                  <span className="text-xs text-muted-foreground">ELASTON___XANA</span>
                </a>
                <a
                  href="https://twitter.com/ELASTON___XANA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Twitter className="h-8 w-8 text-blue-400 mb-2" />
                  <span className="text-sm font-medium">Twitter</span>
                  <span className="text-xs text-muted-foreground">ELASTON___XANA</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
