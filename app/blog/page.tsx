import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Healthcare: AI and IoT Integration",
      excerpt:
        "Explore how artificial intelligence and Internet of Things technologies are revolutionizing healthcare delivery and patient outcomes.",
      date: "April 5, 2025",
      author: "Mugisha Elaston Sana",
      image: "/placeholder.svg?height=300&width=600",
      category: "Technology",
    },
    {
      id: 2,
      title: "5 Ways to Monitor Your Heart Health at Home",
      excerpt:
        "Learn about the latest devices and techniques to keep track of your cardiovascular health from the comfort of your home.",
      date: "March 28, 2025",
      author: "Dr. Sarah Johnson",
      image: "/placeholder.svg?height=300&width=600",
      category: "Health Tips",
    },
    {
      id: 3,
      title: "Understanding Your Health Data: A Comprehensive Guide",
      excerpt:
        "A detailed explanation of common health metrics and what they mean for your overall wellbeing and health management.",
      date: "March 15, 2025",
      author: "Mugisha Elaston Sana",
      image: "/placeholder.svg?height=300&width=600",
      category: "Education",
    },
    {
      id: 4,
      title: "The Role of Preventive Care in Modern Healthcare",
      excerpt:
        "Why preventive healthcare is becoming increasingly important and how technology is making it more accessible.",
      date: "March 10, 2025",
      author: "Dr. Michael Chen",
      image: "/placeholder.svg?height=300&width=600",
      category: "Healthcare",
    },
    {
      id: 5,
      title: "Telemedicine: The New Normal in Doctor-Patient Relationships",
      excerpt:
        "How virtual consultations are changing the way doctors and patients interact and the benefits this brings to healthcare.",
      date: "February 28, 2025",
      author: "Mugisha Elaston Sana",
      image: "/placeholder.svg?height=300&width=600",
      category: "Technology",
    },
    {
      id: 6,
      title: "Wearable Health Tech: Beyond Step Counting",
      excerpt:
        "Discover the advanced health monitoring capabilities of modern wearable devices and how they're saving lives.",
      date: "February 15, 2025",
      author: "Dr. Emily Rodriguez",
      image: "/placeholder.svg?height=300&width=600",
      category: "Devices",
    },
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">MY HEALTH Blog</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Stay informed with the latest news, insights, and tips on healthcare technology and wellness.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col">
            <div className="relative h-48">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                {post.category}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
                <span className="mx-1">•</span>
                <User className="h-3 w-3" />
                <span>{post.author}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/blog/${post.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>

      <div className="mt-16 bg-blue-50 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground">
            Get the latest health tech news and updates delivered straight to your inbox.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}
