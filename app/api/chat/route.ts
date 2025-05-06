import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a placeholder for the actual OpenAI API integration
// In a production environment, you would use the OpenAI SDK to make API calls

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // In a real implementation, you would call the OpenAI API here
    // For now, we'll simulate a response based on the input

    const userMessage = messages[messages.length - 1].content.toLowerCase()
    let response = ""

    // Check if the message is about Life Suit
    if (userMessage.includes("life suit") || userMessage.includes("lifesuit")) {
      if (userMessage.includes("bluetooth")) {
        response =
          "To connect your Life Suit via Bluetooth: 1) Make sure your Life Suit is charged and powered on. 2) Press and hold the power button for 5 seconds until the LED flashes blue. 3) Open the MY HEALTH app and go to Connections > Life Suit > Bluetooth. 4) Select your Life Suit from the list of available devices. 5) Follow the on-screen instructions to complete pairing."
      } else if (userMessage.includes("usb")) {
        response =
          "To connect your Life Suit via USB: 1) Use the provided USB cable to connect your Life Suit to your computer. 2) Make sure your Life Suit is powered on. 3) Open the MY HEALTH app and go to Connections > Life Suit > USB. 4) Click 'Connect via USB' and follow the on-screen instructions."
      } else {
        response =
          "The Life Suit is our newest health monitoring wearable that connects to MY HEALTH. You can connect it via Bluetooth, USB, or Wi-Fi. Would you like instructions for a specific connection method?"
      }
    } else {
      // Generic health response
      response =
        "I'm here to help with your health questions and assist with connecting your devices to MY HEALTH. How can I assist you today?"
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
