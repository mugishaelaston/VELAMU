"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Send, X, Minimize2, Maximize2, User, Heart, Calendar, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: number
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  category?: "medical" | "appointment" | "social" | "support" | "general"
}

export default function SanaAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm SANA AI, your personal health assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
      category: "general",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "How do I connect my Life Suit?",
    "Can you book an appointment for me?",
    "What are my latest health metrics?",
    "I need help with my medication schedule",
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Listen for custom events to open SANA AI with a predefined message
  useEffect(() => {
    const handleOpenSanaAI = (event: Event) => {
      const customEvent = event as CustomEvent
      setIsOpen(true)
      setIsMinimized(false)

      if (customEvent.detail?.message) {
        // Add the predefined message as a user message
        const userMessage: Message = {
          id: messages.length + 1,
          content: customEvent.detail.message,
          sender: "user",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])

        // Process the message with AI
        processMessageWithAI(customEvent.detail.message)
      }
    }

    window.addEventListener("openSanaAI", handleOpenSanaAI)
    return () => {
      window.removeEventListener("openSanaAI", handleOpenSanaAI)
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input
    setInput("")

    // Process the message with AI
    processMessageWithAI(userInput)
  }

  const handleSuggestedQuestion = (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: question,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Process the message with AI
    processMessageWithAI(question)
  }

  const processMessageWithAI = async (userInput: string) => {
    setIsLoading(true)

    try {
      // Determine message category based on content
      let category: "medical" | "appointment" | "social" | "support" | "general" = "general"

      if (
        userInput.toLowerCase().includes("appointment") ||
        userInput.toLowerCase().includes("schedule") ||
        userInput.toLowerCase().includes("book") ||
        userInput.toLowerCase().includes("doctor")
      ) {
        category = "appointment"
      } else if (
        userInput.toLowerCase().includes("connect") ||
        userInput.toLowerCase().includes("help") ||
        userInput.toLowerCase().includes("issue") ||
        userInput.toLowerCase().includes("problem")
      ) {
        category = "support"
      } else if (
        userInput.toLowerCase().includes("hello") ||
        userInput.toLowerCase().includes("hi") ||
        userInput.toLowerCase().includes("thanks") ||
        userInput.toLowerCase().includes("thank you")
      ) {
        category = "social"
      } else if (
        userInput.toLowerCase().includes("health") ||
        userInput.toLowerCase().includes("pain") ||
        userInput.toLowerCase().includes("symptom") ||
        userInput.toLowerCase().includes("medication") ||
        userInput.toLowerCase().includes("medicine")
      ) {
        category = "medical"
      }

      // Generate response based on category and input
      let response = ""

      // Customer care responses
      if (category === "support") {
        if (userInput.toLowerCase().includes("life suit") || userInput.toLowerCase().includes("lifesuit")) {
          if (userInput.toLowerCase().includes("bluetooth")) {
            response =
              "To connect your Life Suit via Bluetooth: 1) Make sure your Life Suit is charged and powered on. 2) Press and hold the power button for 5 seconds until the LED flashes blue. 3) Open the MY HEALTH app and go to Connections > Life Suit > Bluetooth. 4) Select your Life Suit from the list of available devices. 5) Follow the on-screen instructions to complete pairing. Is there anything specific you're having trouble with?"
          } else if (userInput.toLowerCase().includes("usb")) {
            response =
              "To connect your Life Suit via USB: 1) Use the provided USB cable to connect your Life Suit to your computer. 2) Make sure your Life Suit is powered on. 3) Open the MY HEALTH app and go to Connections > Life Suit > USB. 4) Click 'Connect via USB' and follow the on-screen instructions. Let me know if you encounter any issues during the process."
          } else {
            response =
              "I see you're asking about the Life Suit. Our Life Suit is a cutting-edge health monitoring wearable that connects to MY HEALTH. You can connect it via Bluetooth, USB, or Wi-Fi. Would you like instructions for a specific connection method? You can also visit the dedicated Life Suit connection page at Connections > Life Suit for detailed setup instructions."
          }
        } else if (userInput.toLowerCase().includes("account")) {
          response =
            "I'd be happy to help with your account. Could you please specify what you need assistance with? For example, I can help with password resets, updating your profile information, or managing your subscription settings. For security reasons, some account changes may require verification through your registered email."
        } else if (userInput.toLowerCase().includes("payment") || userInput.toLowerCase().includes("bill")) {
          response =
            "For payment or billing inquiries, you can view your current plan and payment history in the Account > Billing section. If you're experiencing any issues with payments or have questions about your bill, please provide more details so I can assist you better. Would you like me to guide you to the billing section?"
        } else {
          response =
            "I'm here to help with any technical issues or questions you have. Could you please provide more details about what you need assistance with? I can help with device connections, account management, app navigation, or connect you with our support team for more complex issues."
        }
      }
      // Social chat responses
      else if (category === "social") {
        if (userInput.toLowerCase().includes("hello") || userInput.toLowerCase().includes("hi")) {
          response =
            "Hello there! It's great to see you today. How are you feeling? Is there anything I can help you with regarding your health or our services?"
        } else if (userInput.toLowerCase().includes("thank")) {
          response =
            "You're very welcome! I'm always here to help. Is there anything else you'd like assistance with today? Your health and well-being are my top priorities."
        } else if (userInput.toLowerCase().includes("how are you")) {
          response =
            "I'm functioning perfectly, thank you for asking! More importantly, how are you feeling today? Any health concerns I can help address or questions about your wellness journey?"
        } else if (userInput.toLowerCase().includes("bye") || userInput.toLowerCase().includes("goodbye")) {
          response =
            "Goodbye! Take care of yourself and remember to keep up with your health routines. I'll be here whenever you need assistance with your health journey. Have a wonderful day!"
        } else {
          response =
            "It's nice chatting with you! I'm here to support your health journey and answer any questions you might have about our services or your well-being. Is there something specific you'd like to discuss today?"
        }
      }
      // Appointment responses
      else if (category === "appointment") {
        if (userInput.toLowerCase().includes("book") || userInput.toLowerCase().includes("schedule")) {
          response =
            "I'd be happy to help you book an appointment. Could you please specify which type of healthcare provider you'd like to see (e.g., primary care physician, specialist, therapist)? Also, do you have a preferred date and time? Once you provide these details, I can check availability and schedule your appointment."
        } else if (userInput.toLowerCase().includes("cancel")) {
          response =
            "I understand you need to cancel an appointment. To proceed, could you confirm which appointment you'd like to cancel? I can see your upcoming appointments in the system and help you with the cancellation process. Please note that some providers may have cancellation policies that include fees for late cancellations."
        } else if (userInput.toLowerCase().includes("reschedule")) {
          response =
            "I can help you reschedule your appointment. Could you please confirm which appointment you need to change, and what date/time would work better for you? I'll check the provider's availability and update your schedule accordingly."
        } else {
          response =
            "I see you're inquiring about appointments. I can help you book new appointments, view your upcoming schedule, reschedule existing appointments, or set up reminders. What specifically would you like to do regarding your appointments?"
        }
      }
      // Medical responses
      else if (category === "medical") {
        if (userInput.toLowerCase().includes("medication") || userInput.toLowerCase().includes("medicine")) {
          response =
            "Regarding your medication inquiry, I can help you track your medication schedule, set up reminders, or provide general information about your prescriptions. For specific medical advice about your medications, I recommend consulting with your healthcare provider. Would you like me to set up medication reminders for you?"
        } else if (userInput.toLowerCase().includes("symptom") || userInput.toLowerCase().includes("pain")) {
          response =
            "I notice you're describing some health concerns. While I can provide general information, I'm not a substitute for professional medical advice. Based on your symptoms, it might be best to consult with a healthcare provider. Would you like me to help you schedule an appointment with your doctor to discuss these symptoms?"
        } else if (userInput.toLowerCase().includes("diet") || userInput.toLowerCase().includes("nutrition")) {
          response =
            "Nutrition is an important part of your overall health. I can provide general dietary guidelines based on your health profile, but for personalized nutrition advice, consulting with a registered dietitian is recommended. Would you like some general healthy eating tips or help finding a nutrition professional?"
        } else {
          response =
            "I see you have a health-related question. While I can provide general health information and guidance, for personalized medical advice, it's best to consult with your healthcare provider. Is there a specific health topic you'd like to learn more about, or would you like me to help you connect with a healthcare professional?"
        }
      }
      // General responses
      else {
        const generalResponses = [
          "I'm here to help with your health journey. You can ask me about your health metrics, appointments, medication reminders, or connecting your devices. What would you like assistance with today?",
          "Thank you for reaching out. I can help you navigate the MY HEALTH platform, provide health insights based on your data, or assist with technical support. How can I support your wellness goals today?",
          "Welcome to MY HEALTH! I'm SANA AI, your personal health assistant. I can help you track your health metrics, manage appointments, set medication reminders, and much more. What would you like to explore first?",
          "I'm designed to be your health companion. Whether you need information about your health data, help with appointments, or guidance on using our features, I'm here to assist. What can I help you with today?",
        ]
        response = generalResponses[Math.floor(Math.random() * generalResponses.length)]
      }

      // Generate new suggested questions based on the conversation
      let newSuggestions: string[] = []

      if (category === "medical") {
        newSuggestions = [
          "What are my latest health metrics?",
          "Can you remind me about my medications?",
          "How can I track my symptoms?",
          "Book an appointment with my doctor",
        ]
      } else if (category === "appointment") {
        newSuggestions = [
          "Show my upcoming appointments",
          "I need to reschedule my appointment",
          "What doctors are available tomorrow?",
          "How do I prepare for my appointment?",
        ]
      } else if (category === "support") {
        newSuggestions = [
          "How do I update my account information?",
          "I need help connecting my device",
          "How do I export my health data?",
          "Where can I find my health reports?",
        ]
      } else {
        newSuggestions = [
          "Tell me about the Life Suit features",
          "How can I improve my sleep quality?",
          "What health metrics should I monitor?",
          "Connect me with a healthcare provider",
        ]
      }

      setSuggestedQuestions(newSuggestions)

      // Add a small delay to simulate processing time
      setTimeout(() => {
        const aiMessage: Message = {
          id: messages.length + 2,
          content: response,
          sender: "assistant",
          timestamp: new Date(),
          category: category,
        }
        setMessages((prev) => [...prev, aiMessage])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error processing message with AI:", error)

      // Add a fallback response
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "I'm sorry, I encountered an issue processing your request. Please try again later.",
        sender: "assistant",
        timestamp: new Date(),
        category: "support",
      }

      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "medical":
        return <Heart className="h-4 w-4 text-red-500" />
      case "appointment":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "support":
        return <HelpCircle className="h-4 w-4 text-purple-500" />
      case "social":
        return <User className="h-4 w-4 text-green-500" />
      default:
        return <Bot className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
        >
          <Bot className="h-6 w-6" />
          <span className="sr-only">Open SANA AI Assistant</span>
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card
          className={cn(
            "fixed right-6 shadow-lg z-50 w-80 md:w-96 transition-all duration-300 ease-in-out",
            isMinimized ? "bottom-6 h-14" : "bottom-6 h-[500px] max-h-[80vh]",
          )}
        >
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="SANA AI" />
                <AvatarFallback className="bg-blue-100 text-blue-600">AI</AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm">SANA AI Assistant</CardTitle>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                <span className="sr-only">{isMinimized ? "Maximize" : "Minimize"}</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-0 overflow-y-auto h-[calc(100%-110px)]">
                <div className="flex flex-col p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.sender === "user" ? "bg-blue-600 text-white" : "bg-muted",
                        )}
                      >
                        <div className="flex items-start mb-1">
                          {message.sender === "assistant" && (
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                                {getCategoryIcon(message.category)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {message.sender === "user" && <User className="h-4 w-4 mr-2 text-white" />}
                        </div>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-blue-100 text-blue-600">AI</AvatarFallback>
                          </Avatar>
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <div className="px-3 py-2 border-t border-b bg-muted/50">
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 h-auto"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              <CardFooter className="p-3 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    type="text"
                    placeholder="Ask SANA AI a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}
