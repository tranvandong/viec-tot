"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function EmployerLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [stayLoggedIn, setStayLoggedIn] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ email, password, stayLoggedIn })
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Login form */}
      <div className="flex w-full flex-col p-8 md:w-1/2 md:p-12 lg:p-16">
        <div className="mb-12">
          <Link href="/" className="flex items-center">
            <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
              <span className="text-xl font-bold">J</span>
            </div>
            <span className="text-xl font-bold text-gray-800">JobWise</span>
          </Link>
        </div>

        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Login</h1>
          <p className="mb-8 text-gray-600">
            Don&apos;t have an account yet?{" "}
            <Link href="/employer/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email<span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@company.com"
                className="h-12 rounded-full border-gray-300 px-4"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="h-12 rounded-full border-gray-300 px-4 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stayLoggedIn"
                  checked={stayLoggedIn}
                  onCheckedChange={(checked) => setStayLoggedIn(checked as boolean)}
                />
                <label htmlFor="stayLoggedIn" className="text-sm text-gray-600">
                  Stay logged in
                </label>
              </div>
              <Link href="/employer/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="h-12 w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
              Login
            </Button>

            <div className="text-center">
              <p className="mb-4 text-sm text-gray-500">Sign Up with</p>
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  className="flex h-10 items-center justify-center rounded-full border border-gray-300 px-4 hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1877F2">
                    <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" />
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
                <button
                  type="button"
                  className="flex h-10 items-center justify-center rounded-full border border-gray-300 px-4 hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2">Google</span>
                </button>
                <button
                  type="button"
                  className="flex h-10 items-center justify-center rounded-full border border-gray-300 px-4 hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000000">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                  </svg>
                  <span className="ml-2">Apple</span>
                </button>
              </div>
            </div>

            <div className="pt-6 text-center">
              <p className="mb-4 text-sm font-medium text-gray-700">Login As</p>
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  className="h-10 rounded-full bg-gray-800 px-6 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Admin
                </button>
                <button
                  type="button"
                  className="h-10 rounded-full bg-white px-6 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Client
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Copyright © 2024 JobWise | Powered by JobWise Inc.</p>
        </div>
      </div>

      {/* Right side - Image and tagline */}
      <div className="hidden bg-gray-50 md:block md:w-1/2">
        <div className="flex h-full flex-col items-center justify-between p-8 md:p-12 lg:p-16">
          <Link href="/" className="self-start text-sm text-gray-600 hover:text-gray-900">
            <div className="flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Back to Website
            </div>
          </Link>

          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <div className="relative h-64 w-64 overflow-hidden rounded-full bg-blue-100">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Professional looking for talent"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>

              {/* Social media icons */}
              <div className="absolute -right-4 top-1/4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1DA1F2] text-white shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </div>
              <div className="absolute -left-4 top-1/3 flex h-14 w-14 items-center justify-center rounded-full bg-[#4267B2] text-white shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
              <div className="absolute -bottom-2 right-1/4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 text-white shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </div>

            <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
              "Simplify Your Hiring Process with{" "}
              <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                AI Matching
              </span>
              "
            </h2>
          </div>

          <div className="flex space-x-2">
            <div className="h-2 w-8 rounded-full bg-blue-500"></div>
            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
