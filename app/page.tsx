"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Code,
  PenTool,
  ShoppingBag,
  Headphones,
  Building2,
  Zap,
  UserPlus,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/search-results?job=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="bg-blue-950 text-white">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-orange-500 px-2 py-1 rounded font-bold text-white">Job</span>
              <span className="font-bold text-lg text-white">Wise</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-white">
                Home
              </Link>
              <Link href="/find-jobs" className="text-sm font-medium text-white">
                Find jobs
              </Link>
              <Link href="/companies" className="text-sm font-medium text-white">
                Companies
              </Link>
              <Link href="/service" className="text-sm font-medium text-white">
                Service
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white">
              Log In
            </Link>
            <Link
              href="/register"
              className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-blue-950 text-white pt-8 pb-24">
          <div className="container text-center max-w-3xl mx-auto px-4 md:px-8">
            <div className="inline-block bg-blue-900/50 text-xs px-4 py-2 rounded-full mb-8">
              No.1 Job Searching Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find a Skilled Individual
              <br />
              to do The Job
            </h1>
            <p className="text-blue-200 mb-8">
              5 M+ jobs for you to explore. In the meantime, run a search to find your next job
            </p>

            <form
              onSubmit={handleSearch}
              className="bg-white rounded-full p-2 flex items-center gap-2 mb-4 max-w-3xl mx-auto"
            >
              <div className="flex items-center flex-1 pl-2">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  className="py-2 px-3 block w-full border-0 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400"
                  placeholder="Job title, keyword or company"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="flex items-center flex-1 pl-2">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="text"
                  className="py-2 px-3 block w-full border-0 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400"
                  placeholder="City, state, zip or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                Search
              </button>
            </form>

            <div className="text-sm text-blue-200 mb-12">
              <span>Upload or </span>
              <Link href="#" className="underline">
                create a resume
              </Link>
              <span> to easily apply to jobs.</span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">Remote</span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">MNC</span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">Sales</span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">Project Management</span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <Code className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">Development</span>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mt-4">
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">Data Operator</span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">Internship</span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">Analytics</span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">Others</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Making Your Job Search Easy</h2>
            <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
              We've built features you can customize your search of your ideal position, making it easier to find a job.
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">User Register</h3>
                <p className="text-sm text-gray-500">Create an account to get started with your job search journey.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Personalize Job Recommendation</h3>
                <p className="text-sm text-gray-500">
                  Receive tailored job recommendations based on your skills and preferences.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Search Jobs</h3>
                <p className="text-sm text-gray-500">Find the perfect job that matches your skills and career goals.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Job Alert Emails</h3>
                <p className="text-sm text-gray-500">
                  Get notified about new job opportunities that match your preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Job Recommendation */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Personal Job Recommendation</h2>
                <p className="text-gray-500 mb-6">
                  Our AI-powered system analyzes your skills and preferences to recommend jobs that are the perfect
                  match for you.
                </p>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Easy Setup</h4>
                    <p className="text-sm text-gray-500">
                      Just create an account, fill in your profile, and we'll recommend jobs based on your skills.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Personalized Results</h4>
                    <p className="text-sm text-gray-500">
                      Our recommendations get better over time as you interact with jobs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">Personal Data</h3>
                  <button
                    type="button"
                    className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="h-12 bg-gray-100 rounded w-full"></div>
                  <div className="h-12 bg-gray-100 rounded w-full"></div>
                  <div className="h-12 bg-gray-100 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Various Career Opportunity
              <br />
              Waiting for You
            </h2>
            <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
              The fastest growing companies rely on JobX to source the best talent. Access exclusive opportunities that
              you won't find anywhere else.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Job Card 1 */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-black rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Product Manager</h3>
                          <div className="text-sm text-gray-500">Apple Design</div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Full-time
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        We are looking for a talented product manager to join our team and help us build amazing
                        products.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">$5.5k/month</div>
                          <div className="text-xs text-gray-500">New York</div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 2 */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-red-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">PDF Developer</h3>
                          <div className="text-sm text-gray-500">Brand Design</div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Remote
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        Join our team to develop innovative PDF solutions for our global clients.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">$100/hour</div>
                          <div className="text-xs text-gray-500">Remote</div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 3 */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Software Engineering</h3>
                          <div className="text-sm text-gray-500">Data Analyst</div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Full-time
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        Looking for a software engineer to join our growing team and build amazing products.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">$7k/month</div>
                          <div className="text-xs text-gray-500">San Francisco</div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 4 */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Software Engineer</h3>
                          <div className="text-sm text-gray-500">Acme Tech</div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Remote
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        Join our engineering team to build scalable and robust software solutions.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">$8.5k/month</div>
                          <div className="text-xs text-gray-500">Remote</div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 5 */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-red-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">UX/UI Designer</h3>
                          <div className="text-sm text-gray-500">Creative Tech</div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Contract
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        We're looking for a talented UX/UI designer to create beautiful and functional interfaces.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">$7.5k/month</div>
                          <div className="text-xs text-gray-500">New York</div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 6 */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Software Developer</h3>
                          <div className="text-sm text-gray-500">Tech Solutions</div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Full-time
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        Join our team to develop innovative software solutions for our clients.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">$6k/month</div>
                          <div className="text-xs text-gray-500">Chicago</div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                See all jobs
              </button>
            </div>
          </div>
        </section>

        {/* Featured Companies */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Featured Companies
              <br />
              Actively Hiring
            </h2>
            <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
              The fastest growing companies rely on JobX to source the best talent. Join now to explore opportunities.
            </p>

            <div className="relative">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Company Card 1 */}
                <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                        ABC
                      </div>
                      <div>
                        <h3 className="font-semibold">ABC Corporation</h3>
                        <div className="text-sm text-gray-500">Technology</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      A leading technology company specializing in innovative software solutions for businesses.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Full-time
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Remote
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Design
                      </span>
                    </div>
                    <button
                      type="button"
                      className="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      View Jobs
                    </button>
                  </div>
                </div>

                {/* Company Card 2 */}
                <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                        GH
                      </div>
                      <div>
                        <h3 className="font-semibold">GreenHub</h3>
                        <div className="text-sm text-gray-500">Sustainability</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      A sustainability-focused company working on green energy solutions and environmental initiatives.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Part-time
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        On-site
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Engineering
                      </span>
                    </div>
                    <button
                      type="button"
                      className="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      View Jobs
                    </button>
                  </div>
                </div>

                {/* Company Card 3 */}
                <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        FM
                      </div>
                      <div>
                        <h3 className="font-semibold">Fast Metro Company</h3>
                        <div className="text-sm text-gray-500">Transportation</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Revolutionizing urban transportation with innovative mobility solutions and services.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Contract
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Hybrid
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Marketing
                      </span>
                    </div>
                    <button
                      type="button"
                      className="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      View Jobs
                    </button>
                  </div>
                </div>
              </div>

              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">
                Find Growth Insight and
                <br />
                Tips in our Blog
              </h2>
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                Read more articles
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative">
              {/* Blog Card 1 */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Blog post"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Writing Skills And Your Resume: Tips &</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Learn how to showcase your writing skills effectively on your resume to stand out to employers.
                  </p>
                  <Link href="#" className="text-sm font-medium text-blue-600">
                    Read more
                  </Link>
                </div>
              </div>

              {/* Blog Card 2 */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Blog post"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Finding Fulfillment and Work-Life Balance at Work</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Discover strategies for achieving a healthy work-life balance and finding fulfillment in your
                    career.
                  </p>
                  <Link href="#" className="text-sm font-medium text-blue-600">
                    Read more
                  </Link>
                </div>
              </div>

              {/* Blog Card 3 */}
              <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Blog post"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">The Importance of Soft Skills in the Workplace</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Learn why soft skills are increasingly valued by employers and how to develop them for career
                    success.
                  </p>
                  <Link href="#" className="text-sm font-medium text-blue-600">
                    Read more
                  </Link>
                </div>
              </div>

              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Popular Roles Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Person looking at job listings"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Discover Jobs Across
                  <br />
                  Popular Roles
                </h2>
                <p className="text-gray-500 mb-6">
                  Explore opportunities across various industries and find the perfect role that matches your skills and
                  career aspirations.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Code className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Developer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <PenTool className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Marketing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Finance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Headphones className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Customer Service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">HR & Recruiting</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-950 text-white">
          <div className="container text-center mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold mb-4">
              A job hunting experience
              <br />
              like no other
            </h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              We've made job hunting easier than ever. Create your profile and start applying for jobs today.
            </p>
            <div className="flex justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                className="py-2 px-3 block w-full bg-blue-900 border border-blue-800 text-white placeholder:text-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Enter your email address"
              />
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white whitespace-nowrap hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="bg-yellow-400 h-6 w-6 rounded"></div>
                <span className="font-bold text-lg">JobX</span>
              </Link>
              <p className="text-sm text-gray-500 mb-4">
                JobX is the leading job board platform connecting employers with top talent. Find your dream job today.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-900">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Technology Professionals</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#">Software Engineers</Link>
                </li>
                <li>
                  <Link href="#">Data Scientists</Link>
                </li>
                <li>
                  <Link href="#">UX/UI Designers</Link>
                </li>
                <li>
                  <Link href="#">Product Managers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Employers and Recruiters</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#">Post a Job</Link>
                </li>
                <li>
                  <Link href="#">Find Candidates</Link>
                </li>
                <li>
                  <Link href="#">Pricing</Link>
                </li>
                <li>
                  <Link href="#">Enterprise Solutions</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company Information</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#">About Us</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
                <li>
                  <Link href="#">Press</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">Help Center</Link>
                </li>
                <li>
                  <Link href="#">FAQ</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>Copyright © 2023 JobSearch All Rights Reserved. JobX is a trademark of JobSearch Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
