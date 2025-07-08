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
import { useOne } from "@/hooks/useDataProvider";
import { Organization } from "@/providers/types/definition";
import { useParams } from "next/navigation";
import IImage from "@/components/ui/image";
import dayjs from "@/lib/dayjs";

export default function CompanyDetail() {
  const [activeTab, setActiveTab] = useState<"jobs" | "candidates">("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view");
  const { slug } = useParams();
  const { data, isLoading } = useOne<Organization>({
    resource: "Organizations",
    id: slug as string,
    meta: {
      join: ["Jobs"],
    },
  });

  const company = data?.data;

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
      {/* Background Image */}
      <div className="relative h-[300px] w-full">
        <IImage
          filePath={company?.filePaths?.[0]}
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
            <div className="w-16 h-16 text-white flex items-center justify-center rounded-lg text-2xl font-bold flex-shrink-0">
              <IImage
                filePath={company?.filePaths?.[0]}
                alt="Office"
                width="100"
                height={100}
                // fill
                // className="object-cover"
              />
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{company?.name}</h1>
                  <p className="text-gray-600">Sologan của công ty</p>
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Website</div>
                  <a
                    href="https://pixelz.studio"
                    className="text-blue-600 hover:underline"
                  >
                    {company?.website}
                  </a>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Địa điểm</div>
                  <div className="font-medium">{company?.address}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Quy mô</div>
                  <div className="font-medium">{company?.employeeCount}</div>
                </div>
                {/* <div>
                  <div className="text-sm text-gray-500 mb-1">Loại công ty</div>
                  <div className="font-medium">Vệ sinh môi trường</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {/* About */}
            <div>
              <h2 className="text-xl font-bold mb-4">Thông tin</h2>
              <p
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: company?.description || "" }}
              ></p>
            </div>

            {/* Jobs */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Công việc đang tuyển dụng</h2>
                {/* <Link
                  href="#"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Xem tất cả
                </Link> */}
              </div>

              <div className="space-y-4">
                {/* Job Card */}
                {company?.jobs?.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors bg-white"
                  >
                    <Link href={`/job/${job.id}`}>
                      <h3 className="font-semibold mb-1">{job.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location} • {job.industry} • {job.experience} năm
                      </div>
                      <div className="text-sm text-gray-400">
                        {dayjs(job.effectiveDate).fromNow()} • {job.views} lượt
                        xem
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          {/* <div>
           
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
          </div> */}
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
