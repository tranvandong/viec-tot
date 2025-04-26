"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";
import { EmployerJobDetailDrawer } from "@/components/employer-job-detail-drawer";

export default function CompanyDetail() {
  const [activeTab, setActiveTab] = useState<"jobs" | "candidates">("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view");

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
  ];

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
  ];

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && job.status === statusFilter;
  });

  // Filter candidates based on search query and status
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && candidate.status === statusFilter;
  });

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "review":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-purple-100 text-purple-800";
      case "interview":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "hired":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days ago
  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  };

  // Open job detail drawer
  const openJobDrawer = (job: any, mode: "view" | "edit") => {
    setSelectedJob(job);
    setDrawerMode(mode);
    setIsDrawerOpen(true);
  };

  // Handle job update
  const handleJobUpdate = (updatedJob: any) => {
    // In a real app, you would update the job in your database
    console.log("Updated job:", updatedJob);
    // For now, we'll just close the drawer
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-950 text-white">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-orange-500 px-2 py-1 rounded font-bold text-white">
                Job
              </span>
              <span className="font-bold text-lg text-white">Wise</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/employer/dashboard"
                className="text-sm font-medium text-white border-b-2 border-white pb-1"
              >
                Dashboard
              </Link>
              <Link
                href="/employer/post-job"
                className="text-sm font-medium text-white"
              >
                Post a Job
              </Link>
              <Link
                href="/employer/profile"
                className="text-sm font-medium text-white"
              >
                Company Profile
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-white">
              Employer Portal
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto">
        <div className="min-h-screen">
          {/* Hero Section */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-..." // ảnh nền ở đây
              alt="Office"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
          </div>
          {/* Company Card */}
          <div className="relative max-w-6xl mx-auto -mt-16 bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-col md:items-center">
            <div className="flex flex-col md:flex-row md:items-center w-full">
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white w-16 h-16 flex items-center justify-center rounded-lg text-2xl font-bold">
                  P
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Pixelz Studio</h1>
                  <p className="text-gray-600">
                    We Design Delightful Digital Experiences
                  </p>
                </div>
              </div>
              <button className="mt-4 md:mt-0 md:ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Follow
              </button>
            </div>
            <div className="flex justify-around text-gray-600 mt-4 w-full">
              {/* Website */}
              <div>
                <div className="text-xs text-gray-400">Website</div>
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  pixelz.studio
                </a>
              </div>

              {/* Location */}
              <div>
                <div className="text-xs text-gray-400">Location</div>
                <div className="font-semibold">Yogyakarta, Indonesia</div>
              </div>

              {/* Company Size */}
              <div>
                <div className="text-xs text-gray-400">Company Size</div>
                <div className="font-semibold">10-50 Employees</div>
              </div>

              {/* Company Type */}
              <div>
                <div className="text-xs text-gray-400">Company Type</div>
                <div className="font-semibold">Design Services</div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="md:col-span-2 space-y-8">
              {/* About */}

              <h2 className="text-xl font-bold mb-2">About Pixelz</h2>
              <p className="text-gray-600">
                Pixelz is a Product and Design Studio based in Yogyakarta...
              </p>

              {/* Jobs */}
              <div className="">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Jobs From Pixelz Studio</h2>
                  <a href="#" className="text-blue-600 text-sm">
                    View All Jobs
                  </a>
                </div>
                <div className="space-y-4">
                  {/* Single Job */}
                  <div className="border p-4 rounded-lg hover:shadow">
                    <h3 className="font-bold">UI/UX Designer</h3>
                    <p className="text-gray-500 text-sm">
                      Remote · Full-time · 2-4 years
                    </p>
                    <p className="text-gray-400 text-xs">
                      5 days ago · 135 applicants
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg hover:shadow">
                    <h3 className="font-bold">UI Designer</h3>
                    <p className="text-gray-500 text-sm">
                      Internship · Onsite · Fresh Graduate
                    </p>
                    <p className="text-gray-400 text-xs">
                      1 day ago · 35 applicants
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg hover:shadow">
                    <h3 className="font-bold">Front-end Developer</h3>
                    <p className="text-gray-500 text-sm">
                      Remote · Full-time · 1-3 years
                    </p>
                    <p className="text-gray-400 text-xs">
                      2 days ago · 50 applicants
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* People Also View */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="text-xl font-bold mb-4">People Also View</h2>
                <div className="space-y-2">
                  <div
                    key={"index"}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold">{"company.name"}</p>
                      <p className="text-gray-400 text-sm">
                        {"company.location"}
                      </p>
                    </div>
                    <img
                      src={"company.logo"}
                      alt={"company.name"}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </div>
  );
}
