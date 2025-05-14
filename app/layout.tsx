import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JobWise - Find Your Dream Job",
  description: "Find your dream job with JobWise, the #1 job searching platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors">
        <ThemeProvider defaultTheme="system" storageKey="jobwise-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
