import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import QueryProvider from "@/providers/queryProvider";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { ThemeProviders } from "./providers";
import { AuthProvider } from "@/providers/contexts/AuthProvider";

export const metadata: Metadata = {
  title: "JobWise - Find Your Dream Job",
  description:
    "Find your dream job with JobWise, the #1 job searching platform",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors">
        <QueryProvider>
          <ThemeProviders>
            <AuthProvider>{children}</AuthProvider>
            <Toaster />
          </ThemeProviders>
        </QueryProvider>
      </body>
    </html>
  );
}
