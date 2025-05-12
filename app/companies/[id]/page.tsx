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
  Share2,
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

      {/* Background Image */}
      <div className="relative h-[300px] w-full">
        <Image
          src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
          alt="Office"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Company Info Card */}
      <div className="max-w-5xl mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo */}
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-lg text-2xl font-bold flex-shrink-0">
              P
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Pixelz Studio</h1>
                  <p className="text-gray-600">
                    We Design Delightful Digital Experiences
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    + Follow
                  </button>
                </div>
              </div>

              {/* Company Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Website</div>
                  <a
                    href="https://pixelz.studio"
                    className="text-blue-600 hover:underline"
                  >
                    pixelz.studio
                  </a>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Location</div>
                  <div className="font-medium">Yogyakarta, Indonesia</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Company Size</div>
                  <div className="font-medium">10-50 Employees</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Company Type</div>
                  <div className="font-medium">Design Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            <div>
              <h2 className="text-xl font-bold mb-4">About Pixelz</h2>
              <p className="text-gray-600">
                Pixelz is a Product and Design Studio based in Yogyakarta,
                Indonesia. We are a one-stop solution for digital product design
                needs that strive to innovate business solutions with high
                quality and personalized design. We design experiences for
                digital products that are simple and easy to use. In order to
                meet the business needs and users needs, all of our design
                decisions...
              </p>
            </div>

            {/* Jobs */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Jobs From Pixelz Studio</h2>
                <Link
                  href="#"
                  className="text-blue-600 text-sm hover:underline"
                >
                  View All Jobs
                </Link>
              </div>

              <div className="space-y-4">
                {/* Job Card */}
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <h3 className="font-semibold mb-1">UI/UX Designer</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    Remote • Full-time • 2-4 years
                  </div>
                  <div className="text-sm text-gray-400">
                    5 days ago • 135 applicants
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <h3 className="font-semibold mb-1">UI Designer</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    Internship • Onsite • Fresh Graduate
                  </div>
                  <div className="text-sm text-gray-400">
                    1 day ago • 35 applicants
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <h3 className="font-semibold mb-1">Frontend Developer</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    Remote • Full-time • 1-3 years
                  </div>
                  <div className="text-sm text-gray-400">
                    2 days ago • 50 applicants
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* People at Pixelz */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-lg font-bold mb-4">
                People at Pixelz Studio
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/placeholder.svg"
                    alt="Zazuly Aziz"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">Zazuly Aziz</div>
                    <div className="text-sm text-gray-500">
                      Founder at Pixelz Studio
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Image
                    src="/placeholder.svg"
                    alt="Rian Darma"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">Rian Darma</div>
                    <div className="text-sm text-gray-500">
                      Co-Founder at Pixelz Studio
                    </div>
                  </div>
                </div>

                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 mt-2">
                  Show All
                </button>
              </div>
            </div>

            {/* People Also View */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">People Also View</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Traveloka</div>
                    <div className="text-sm text-gray-500">
                      Jakarta, Indonesia
                    </div>
                  </div>
                  <Image
                    src="/placeholder.svg"
                    alt="Traveloka"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Gojek</div>
                    <div className="text-sm text-gray-500">
                      Jakarta, Indonesia
                    </div>
                  </div>
                  <Image
                    src="/placeholder.svg"
                    alt="Gojek"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Slack</div>
                    <div className="text-sm text-gray-500">
                      Yogyakarta, Indonesia
                    </div>
                  </div>
                  <Image
                    src="/placeholder.svg"
                    alt="Slack"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
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
