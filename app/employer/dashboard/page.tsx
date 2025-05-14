"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  MapPin,
  Users,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  X,
  MessageCircle,
  Calendar,
} from "lucide-react"
import { EmployerJobDetailDrawer } from "@/components/employer-job-detail-drawer"
import { CandidateProfileDrawer } from "@/components/candidate-profile-drawer"

export default function EmployerDashboardPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "candidates">("jobs")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view")
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [isCandidateDrawerOpen, setIsCandidateDrawerOpen] = useState(false)

  // Mock data for jobs
  const jobs = [
    {
      id: "1",
      title: "Senior Product Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      workType: "Remote",
      experience: "Senior Level",
      postedDate: "2023-04-15",
      applicants: 24,
      status: "active",
    },
    {
      id: "2",
      title: "Frontend Developer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      workType: "Hybrid",
      experience: "Mid Level",
      postedDate: "2023-04-10",
      applicants: 18,
      status: "active",
    },
    {
      id: "3",
      title: "Marketing Manager",
      department: "Marketing",
      location: "Chicago, IL",
      type: "Full-time",
      workType: "On-site",
      experience: "Senior Level",
      postedDate: "2023-04-05",
      applicants: 12,
      status: "closed",
    },
    {
      id: "4",
      title: "UX Researcher",
      department: "Design",
      location: "Remote",
      type: "Contract",
      workType: "Remote",
      experience: "Mid Level",
      postedDate: "2023-04-01",
      applicants: 9,
      status: "active",
    },
    {
      id: "5",
      title: "Data Analyst",
      department: "Analytics",
      location: "Boston, MA",
      type: "Full-time",
      workType: "On-site",
      experience: "Entry Level",
      postedDate: "2023-03-28",
      applicants: 32,
      status: "active",
    },
  ]

  // Mock data for candidates
  const candidates = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
      jobTitle: "Senior Product Designer",
      jobId: "1",
      appliedDate: "2023-04-16",
      status: "review", // review, shortlisted, interview, rejected, hired
      experience: "5 years",
      location: "San Francisco, CA",
      skills: ["UI/UX", "Figma", "User Research", "Prototyping"],
      matchScore: 92,
    },
    {
      id: "2",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
      jobTitle: "Senior Product Designer",
      jobId: "1",
      appliedDate: "2023-04-17",
      status: "shortlisted",
      experience: "6 years",
      location: "Seattle, WA",
      skills: ["UI/UX", "Adobe XD", "Design Systems", "Wireframing"],
      matchScore: 88,
    },
    {
      id: "3",
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40&text=MB",
      jobTitle: "Frontend Developer",
      jobId: "2",
      appliedDate: "2023-04-12",
      status: "interview",
      experience: "4 years",
      location: "New York, NY",
      skills: ["React", "TypeScript", "CSS", "HTML"],
      matchScore: 95,
    },
    {
      id: "4",
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40&text=ED",
      jobTitle: "Frontend Developer",
      jobId: "2",
      appliedDate: "2023-04-11",
      status: "rejected",
      experience: "2 years",
      location: "Chicago, IL",
      skills: ["JavaScript", "React", "CSS", "HTML"],
      matchScore: 75,
    },
    {
      id: "5",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=DW",
      jobTitle: "UX Researcher",
      jobId: "4",
      appliedDate: "2023-04-03",
      status: "hired",
      experience: "3 years",
      location: "Remote",
      skills: ["User Research", "Usability Testing", "Data Analysis"],
      matchScore: 90,
    },
    {
      id: "6",
      name: "Jennifer Lee",
      avatar: "/placeholder.svg?height=40&width=40&text=JL",
      jobTitle: "Data Analyst",
      jobId: "5",
      appliedDate: "2023-03-30",
      status: "review",
      experience: "1 year",
      location: "Boston, MA",
      skills: ["SQL", "Python", "Data Visualization", "Excel"],
      matchScore: 82,
    },
  ]

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (statusFilter === "all") return matchesSearch
    return matchesSearch && job.status === statusFilter
  })

  // Filter candidates based on search query and status
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (statusFilter === "all") return matchesSearch
    return matchesSearch && candidate.status === statusFilter
  })

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      case "review":
        return "bg-blue-100 text-blue-800"
      case "shortlisted":
        return "bg-purple-100 text-purple-800"
      case "interview":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "hired":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Calculate days ago
  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`
  }

  // Open job detail drawer
  const openJobDrawer = (job: any, mode: "view" | "edit") => {
    setSelectedJob(job)
    setDrawerMode(mode)
    setIsDrawerOpen(true)
  }

  // Open candidate profile drawer
  const openCandidateDrawer = (candidate: any) => {
    setSelectedCandidate(candidate)
    setIsCandidateDrawerOpen(true)
  }

  // Handle job update
  const handleJobUpdate = (updatedJob: any) => {
    // In a real app, you would update the job in your database
    console.log("Updated job:", updatedJob)
    // For now, we'll just close the drawer
    setIsDrawerOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-blue-950 text-white">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-orange-500 px-2 py-1 rounded font-bold text-white">Job</span>
              <span className="font-bold text-lg text-white">Wise</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/employer/dashboard" className="text-sm font-medium text-white border-b-2 border-white pb-1">
                Dashboard
              </Link>
              <Link href="/employer/post-job" className="text-sm font-medium text-white">
                Post a Job
              </Link>
              <Link href="/employer/profile" className="text-sm font-medium text-white">
                Company Profile
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-white">Employer Portal</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold">Employer Dashboard</h1>
            <Link
              href="/employer/post-job"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Post a New Job
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={`Search ${activeTab === "jobs" ? "jobs" : "candidates"}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 font-medium">Status</div>
                      <div className="px-4 py-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="all"
                            checked={statusFilter === "all"}
                            onChange={() => setStatusFilter("all")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">All</span>
                        </label>
                      </div>
                      {activeTab === "jobs" ? (
                        <>
                          <div className="px-4 py-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="status"
                                value="active"
                                checked={statusFilter === "active"}
                                onChange={() => setStatusFilter("active")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                            </label>
                          </div>
                          <div className="px-4 py-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="status"
                                value="closed"
                                checked={statusFilter === "closed"}
                                onChange={() => setStatusFilter("closed")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Closed</span>
                            </label>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="px-4 py-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="status"
                                value="review"
                                checked={statusFilter === "review"}
                                onChange={() => setStatusFilter("review")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Under Review</span>
                            </label>
                          </div>
                          <div className="px-4 py-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="status"
                                value="shortlisted"
                                checked={statusFilter === "shortlisted"}
                                onChange={() => setStatusFilter("shortlisted")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Shortlisted</span>
                            </label>
                          </div>
                          <div className="px-4 py-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="status"
                                value="interview"
                                checked={statusFilter === "interview"}
                                onChange={() => setStatusFilter("interview")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Interview</span>
                            </label>
                          </div>
                          <div className="px-4 py-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="status"
                                value="hired"
                                checked={statusFilter === "hired"}
                                onChange={() => setStatusFilter("hired")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Hired</span>
                            </label>
                          </div>
                          <div className="px-4 py-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="status"
                                value="rejected"
                                checked={statusFilter === "rejected"}
                                onChange={() => setStatusFilter("rejected")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Rejected</span>
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
            <button
              className={`py-3 px-6 font-medium text-sm ${
                activeTab === "jobs"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("jobs")}
            >
              Job Listings ({jobs.length})
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm ${
                activeTab === "candidates"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("candidates")}
            >
              Candidates ({candidates.length})
            </button>
          </div>

          {/* Job Listings Tab */}
          {activeTab === "jobs" && (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Job
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
                    >
                      Posted Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Applicants
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{job.title}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{job.department}</div>
                            <div className="md:hidden text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {job.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(job.postedDate)}</div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">{getDaysAgo(job.postedDate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-900 dark:text-gray-100">{job.applicants}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                              job.status,
                            )}`}
                          >
                            {job.status === "active" ? "Active" : "Closed"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openJobDrawer(job, "view")}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                              title="View Job"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openJobDrawer(job, "edit")}
                              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                              title="Edit Job"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                              title="Delete Job"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No job listings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Candidates Tab */}
          {activeTab === "candidates" && (
            <div className="space-y-4">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={candidate.avatar || "/placeholder.svg"}
                            alt={candidate.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{candidate.name}</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Applied for: {candidate.jobTitle}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {candidate.location} • {candidate.experience} experience
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end">
                        <div className="flex items-center mb-2">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                              candidate.status,
                            )}`}
                          >
                            {candidate.status === "review" && "Under Review"}
                            {candidate.status === "shortlisted" && "Shortlisted"}
                            {candidate.status === "interview" && "Interview"}
                            {candidate.status === "rejected" && "Rejected"}
                            {candidate.status === "hired" && "Hired"}
                          </span>
                          <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            Applied {getDaysAgo(candidate.appliedDate)}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                            {candidate.matchScore}% Match
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
                      <button
                        onClick={() => openCandidateDrawer(candidate)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-700 text-sm leading-5 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 dark:active:text-gray-200 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Profile
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-700 text-sm leading-5 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 dark:active:text-gray-200 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </button>
                      {candidate.status === "review" && (
                        <>
                          <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Shortlist
                          </button>
                          <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150">
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                      {candidate.status === "shortlisted" && (
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:border-yellow-700 focus:shadow-outline-yellow active:bg-yellow-700 transition ease-in-out duration-150">
                          <Calendar className="h-4 w-4 mr-1" />
                          Schedule Interview
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No candidates found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery
                      ? "Try adjusting your search or filter criteria"
                      : "When candidates apply to your jobs, they will appear here"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Job Detail Drawer */}
      {selectedJob && (
        <EmployerJobDetailDrawer
          job={selectedJob}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          mode={drawerMode}
          onSave={handleJobUpdate}
        />
      )}

      {/* Candidate Profile Drawer */}
      {selectedCandidate && (
        <CandidateProfileDrawer
          candidate={selectedCandidate}
          isOpen={isCandidateDrawerOpen}
          onClose={() => setIsCandidateDrawerOpen(false)}
        />
      )}
    </div>
  )
}
