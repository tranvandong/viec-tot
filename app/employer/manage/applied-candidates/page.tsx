"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  MessageCircle,
  CheckCircle,
  X,
  Calendar,
  Download,
  SlidersHorizontal,
  MapPin,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CandidateProfileDrawer } from "@/components/candidate-profile-drawer";

// Sample candidate data
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
    education: "Bachelor's Degree",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
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
    education: "Master's Degree",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 234-5678",
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
    education: "Bachelor's Degree",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
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
    education: "Bachelor's Degree",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
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
    education: "Master's Degree",
    email: "david.wilson@example.com",
    phone: "+1 (555) 567-8901",
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
    education: "Bachelor's Degree",
    email: "jennifer.lee@example.com",
    phone: "+1 (555) 678-9012",
  },
  {
    id: "7",
    name: "Robert Garcia",
    avatar: "/placeholder.svg?height=40&width=40&text=RG",
    jobTitle: "Backend Developer",
    jobId: "3",
    appliedDate: "2023-04-05",
    status: "shortlisted",
    experience: "7 years",
    location: "Austin, TX",
    skills: ["Node.js", "Python", "MongoDB", "AWS"],
    matchScore: 87,
    education: "Master's Degree",
    email: "robert.garcia@example.com",
    phone: "+1 (555) 789-0123",
  },
  {
    id: "8",
    name: "Lisa Martinez",
    avatar: "/placeholder.svg?height=40&width=40&text=LM",
    jobTitle: "Marketing Manager",
    jobId: "6",
    appliedDate: "2023-04-08",
    status: "interview",
    experience: "5 years",
    location: "Miami, FL",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    matchScore: 91,
    education: "Bachelor's Degree",
    email: "lisa.martinez@example.com",
    phone: "+1 (555) 890-1234",
  },
  {
    id: "9",
    name: "James Taylor",
    avatar: "/placeholder.svg?height=40&width=40&text=JT",
    jobTitle: "DevOps Engineer",
    jobId: "7",
    appliedDate: "2023-04-14",
    status: "review",
    experience: "4 years",
    location: "Denver, CO",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    matchScore: 84,
    education: "Bachelor's Degree",
    email: "james.taylor@example.com",
    phone: "+1 (555) 901-2345",
  },
  {
    id: "10",
    name: "Patricia Anderson",
    avatar: "/placeholder.svg?height=40&width=40&text=PA",
    jobTitle: "Product Manager",
    jobId: "8",
    appliedDate: "2023-04-10",
    status: "shortlisted",
    experience: "8 years",
    location: "Portland, OR",
    skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
    matchScore: 93,
    education: "MBA",
    email: "patricia.anderson@example.com",
    phone: "+1 (555) 012-3456",
  },
];

export default function CandidatesTablePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter candidates based on search query and filters
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || candidate.status === statusFilter;
    const matchesPosition =
      positionFilter === "all" || candidate.jobTitle === positionFilter;

    return matchesSearch && matchesStatus && matchesPosition;
  });

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "shortlisted":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "interview":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "hired":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
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

  // Get unique job titles for filter
  const jobTitles = Array.from(
    new Set(candidates.map((candidate) => candidate.jobTitle))
  );

  // Open candidate profile drawer
  const openCandidateDrawer = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  // Get status display text
  const getStatusDisplayText = (status: string) => {
    switch (status) {
      case "review":
        return "Under Review";
      case "shortlisted":
        return "Shortlisted";
      case "interview":
        return "Interview";
      case "rejected":
        return "Rejected";
      case "hired":
        return "Hired";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold">Candidates</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Advanced Filter
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search candidates by name, position, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="w-40">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-48">
                  <Select
                    value={positionFilter}
                    onValueChange={setPositionFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Positions</SelectItem>
                      {jobTitles.map((title) => (
                        <SelectItem key={title} value={title}>
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="flex items-center gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Results info */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing{" "}
              <span className="font-medium">{filteredCandidates.length}</span>{" "}
              candidates
            </p>
          </div>

          {/* Candidates Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Candidate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Applied Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Match
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate) => (
                      <tr
                        key={candidate.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                              <Image
                                src={candidate.avatar || "/placeholder.svg"}
                                alt={candidate.name}
                                width={40}
                                height={40}
                                className="h-10 w-10 object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {candidate.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {candidate.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">
                            {candidate.jobTitle}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {candidate.experience}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-1" />
                            {candidate.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">
                            {formatDate(candidate.appliedDate)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {getDaysAgo(candidate.appliedDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                              candidate.status
                            )}`}
                          >
                            {getStatusDisplayText(candidate.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-center">
                            {candidate.matchScore}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openCandidateDrawer(candidate)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                              title="View Profile"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                              title="Message"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </button>
                            {candidate.status === "review" && (
                              <>
                                <button
                                  className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
                                  title="Shortlist"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                                <button
                                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                  title="Reject"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            {candidate.status === "shortlisted" && (
                              <button
                                className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
                                title="Schedule Interview"
                              >
                                <Calendar className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        No candidates found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Profile Drawer */}
      {selectedCandidate && (
        <CandidateProfileDrawer
          candidate={selectedCandidate}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
}
