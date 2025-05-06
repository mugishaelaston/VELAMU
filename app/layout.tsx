import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SanaAIAssistant from "@/components/sana-ai-assistant"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MY HEALTH - Digital Healthcare System",
  description: "A comprehensive digital healthcare system powered by AI and IoT technology",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <SanaAIAssistant />
        </ThemeProvider>
      </body>
    </html>
  )
}
