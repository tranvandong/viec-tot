"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ChevronDown, Clock, ChevronUp } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { JobDetailModal } from "@/components/job-detail-modal"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const jobQuery = searchParams.get("job") || "UI/UX Designer"
  const locationQuery = searchParams.get("location") || "Indonesia"

  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [isRemoteOpen, setIsRemoteOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    rangeSalary: true,
    experience: true,
  })
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id))
    } else {
      setSavedJobs([...savedJobs, id])
    }
  }

  const openJobModal = (job: any, e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedJob(job)
    setIsModalOpen(true)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  // Update the closeJobModal function to handle animation
  const closeJobModal = () => {
    setIsModalOpen(false)
    // Body scrolling will be re-enabled after the animation completes in the modal component
  }

  // Find similar jobs based on job title and experience
  const getSimilarJobs = (job: any) => {
    return jobs.filter(
      (j) => j.id !== job.id && (j.title.includes(job.title.split(" ")[0]) || j.experience === job.experience),
    )
  }

  // Find other jobs from the same company
  const getOtherJobsFromCompany = (job: any) => {
    return jobs.filter((j) => j.id !== job.id && j.company === job.company)
  }

  const jobs = [
    {
      id: "1",
      title: "UI/UX Designer",
      company: "Pixelz Studio",
      location: "Yogyakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=P&bg=black",
      jobType: "Fulltime",
      workType: "Remote",
      experience: "2-4 Years",
      postedTime: "2 days ago",
      applicants: 140,
      salary: "$1000/month",
      match: true,
      description: `As an UI/UX Designer on Pixelz Studio, you'll focus on design user-friendly on several platform (web, mobile, dashboard, etc) to our users needs. Your innovative solution will enhance the user experience on several platforms. Join us and let's making impact on user engagement at Pixelz Studio.`,
      benefits: [
        "Competitive salary and benefits package",
        "Flexible working hours",
        "Remote work options",
        "Professional development opportunities",
      ],
    },
    {
      id: "2",
      title: "Product Designer",
      company: "Traveloka",
      location: "Jakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=T&bg=blue",
      jobType: "Fulltime",
      workType: "Onsite",
      experience: "2-4 Years",
      postedTime: "an hour ago",
      applicants: 140,
      salary: "$1500/month",
      match: true,
      description: `We are looking for a talented Product Designer to join our team and help us create amazing user experiences for our travel platform. The ideal candidate will have a strong portfolio demonstrating their ability to solve complex design problems and create intuitive, user-friendly interfaces.`,
      benefits: [
        "Competitive salary and benefits package",
        "Opportunity to work on a product used by millions",
        "Career growth and development opportunities",
        "Collaborative and innovative work environment",
      ],
    },
    {
      id: "3",
      title: "UX Designer",
      company: "Tokopedia",
      location: "Jakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=T&bg=green",
      jobType: "Fulltime",
      workType: "Remote",
      experience: "2-4 Years",
      postedTime: "2 days ago",
      applicants: 140,
      salary: "$1000/month",
      match: true,
      description: `Tokopedia is looking for a UX Designer to join our growing team. You will be responsible for creating user-centered designs that meet business requirements and enhance customer experience. As a UX Designer, you will work closely with product managers, developers, and other designers to deliver high-quality designs.`,
      benefits: [
        "Flexible working hours",
        "Remote work options",
        "Health insurance",
        "Professional development budget",
      ],
    },
    {
      id: "4",
      title: "Interaction Designer",
      company: "GoPay",
      location: "Jakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=G&bg=blue",
      jobType: "Fulltime",
      workType: "Onsite",
      experience: "2-4 Years",
      postedTime: "2 days ago",
      applicants: 140,
      salary: "$1000/month",
      match: true,
      description: `GoPay is looking for an Interaction Designer to join our team. You will be responsible for creating engaging and intuitive user experiences for our payment platform. The ideal candidate will have experience in designing for mobile applications and a strong understanding of user-centered design principles.`,
      benefits: [
        "Competitive salary and benefits",
        "Professional development opportunities",
        "Flexible working arrangements",
        "Modern office with great amenities",
      ],
    },
    {
      id: "5",
      title: "UI Designer",
      company: "Gojek",
      location: "Jakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=G&bg=green",
      jobType: "Fulltime",
      workType: "Onsite",
      experience: "0-2 Years",
      postedTime: "2 days ago",
      applicants: 521,
      salary: "$900/month",
      match: true,
      description: `Gojek is seeking a talented UI Designer to join our growing design team. You will be responsible for creating visually appealing and user-friendly interfaces for our super app. The ideal candidate will have a strong portfolio showcasing their UI design skills and a passion for creating beautiful, functional designs.`,
      benefits: ["Competitive salary", "Health insurance", "Professional development budget", "Flexible working hours"],
    },
    {
      id: "6",
      title: "Sr. UI/UX Designer",
      company: "Shopee",
      location: "Jakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=S&bg=orange",
      jobType: "Fulltime",
      workType: "Hybrid",
      experience: "3-5 Years",
      postedTime: "2 days ago",
      applicants: 140,
      salary: "$2000/month",
      match: true,
      description: `Shopee is looking for a Senior UI/UX Designer to join our team. You will be responsible for leading design projects and mentoring junior designers. The ideal candidate will have extensive experience in UI/UX design, a strong portfolio, and excellent leadership skills.`,
      benefits: [
        "Competitive salary and benefits package",
        "Leadership opportunities",
        "Professional development budget",
        "Flexible working arrangements",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
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
              <Link href="/search-results" className="text-sm font-medium text-white border-b-2 border-white pb-1">
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

      {/* Hero Search */}
      <div className="bg-blue-950 text-white pt-8 pb-24">
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

          <div className="bg-white rounded-full p-2 flex items-center gap-2 mb-4 max-w-3xl mx-auto">
            <div className="flex items-center flex-1 pl-2">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                className="py-2 px-3 block w-full border-0 focus:outline-none focus:ring-0 placeholder-gray-400"
                placeholder="Job title, keyword or company"
                defaultValue={jobQuery}
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
                className="py-2 px-3 block w-full border-0 focus:outline-none focus:ring-0 placeholder-gray-400"
                placeholder="City, state, zip or remote"
                defaultValue={locationQuery}
              />
            </div>
            <button
              type="button"
              className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-16">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="md:w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800">Filter</h3>
              <button className="text-blue-500 text-sm">Clear All</button>
            </div>

            {/* Job Type */}
            <div className="mb-6 border-b pb-6">
              <div
                className="flex justify-between items-center mb-4 cursor-pointer"
                onClick={() => toggleSection("jobType")}
              >
                <h4 className="font-medium text-gray-800">Job Type</h4>
                {expandedSections.jobType ? (
                  <ChevronUp className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                )}
              </div>

              {expandedSections.jobType && (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="contract"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="contract" className="ml-2 block text-sm text-gray-700">
                      Contract
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="full-time"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="full-time" className="ml-2 block text-sm text-gray-700">
                      Full-Time
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="part-time"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="part-time" className="ml-2 block text-sm text-gray-700">
                      Part-Time
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="internship"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="internship" className="ml-2 block text-sm text-gray-700">
                      Internship
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Open to remote */}
            <div className="mb-6 border-b pb-6">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">Open to remote</h4>
                <button
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    isRemoteOpen ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={() => setIsRemoteOpen(!isRemoteOpen)}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      isRemoteOpen ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Range Salary */}
            <div className="mb-6 border-b pb-6">
              <div
                className="flex justify-between items-center mb-4 cursor-pointer"
                onClick={() => toggleSection("rangeSalary")}
              >
                <h4 className="font-medium text-gray-800">Range Salary</h4>
                {expandedSections.rangeSalary ? (
                  <ChevronUp className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                )}
              </div>

              {expandedSections.rangeSalary && (
                <>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <input
                        id="less-than-1000"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="less-than-1000" className="ml-2 block text-sm text-gray-700">
                        Less than $1000
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="1000-15000"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="1000-15000" className="ml-2 block text-sm text-gray-700">
                        $1000 - $15,000
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="more-than-15000"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="more-than-15000" className="ml-2 block text-sm text-gray-700">
                        More than $15,000
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="custom"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="custom" className="ml-2 block text-sm text-gray-700">
                        Custom
                      </label>
                    </div>
                  </div>

                  {/* Salary Range Slider */}
                  <div className="mt-6">
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      <div className="absolute h-2 bg-blue-500 rounded-full left-[10%] right-[30%]"></div>
                      <div className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 left-[10%]"></div>
                      <div className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 right-[30%]"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-600">$1,000</span>
                      <span className="text-sm text-gray-600">$25,000</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Experience */}
            <div className="mb-6">
              <div
                className="flex justify-between items-center mb-4 cursor-pointer"
                onClick={() => toggleSection("experience")}
              >
                <h4 className="font-medium text-gray-800">Experience</h4>
                {expandedSections.experience ? (
                  <ChevronUp className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                )}
              </div>

              {expandedSections.experience && (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="less-than-year"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="less-than-year" className="ml-2 block text-sm text-gray-700">
                      Less than a year
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="1-3-years"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="1-3-years" className="ml-2 block text-sm text-gray-700">
                      1-3 years
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="3-5-years"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="3-5-years" className="ml-2 block text-sm text-gray-700">
                      3-5 years
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="5-10-years"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="5-10-years" className="ml-2 block text-sm text-gray-700">
                      5-10 years
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-gray-600">
                  Showing <span className="font-semibold">150</span> Jobs{" "}
                  <span className="font-semibold">{jobQuery}</span> in{" "}
                  <span className="font-semibold">{locationQuery}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Short by</span>
                  <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                    Relevancy
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="flex border border-gray-300 rounded-md">
                    <button className="px-2 py-1.5 bg-gray-100">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </button>
                    <button className="px-2 py-1.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 5H21M3 12H21M3 19H21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <a
                    href="#"
                    key={job.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    onClick={(e) => openJobModal(job, e)}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={job.logo || "/placeholder.svg"}
                              alt={job.company}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-gray-600 text-sm">
                              {job.company} • {job.location}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => toggleSaveJob(job.id, e)}
                          className="text-gray-400 hover:text-blue-500"
                          aria-label="Save job"
                        >
                          {savedJobs.includes(job.id) ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </div>

                      {job.match && <div className="text-sm text-gray-500 mb-3">Match with your profile</div>}

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          {job.jobType}
                        </span>
                        <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          {job.workType}
                        </span>
                        <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          {job.experience}
                        </span>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {job.postedTime} • {job.applicants} Applicants
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-lg text-blue-500">{job.salary}</div>
                        <button className="py-2 px-4 bg-blue-100 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={closeJobModal}
          similarJobs={getSimilarJobs(selectedJob)}
          otherJobsFromCompany={getOtherJobsFromCompany(selectedJob)}
          savedJobs={savedJobs}
          onToggleSave={toggleSaveJob}
        />
      )}
    </div>
  )
}
