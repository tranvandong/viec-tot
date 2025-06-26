"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, CheckCircle, Building, MapPin } from "lucide-react";
import { JobDetailModal } from "@/components/job-detail-modal";

export default function MyJobsPage() {
  const [activeTab, setActiveTab] = useState<"applied" | "saved">("applied");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(["1", "3", "5"]);

  const openJobModal = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeJobModal = () => {
    setIsModalOpen(false);
  };

  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((jobId) => jobId !== id));
    } else {
      setSavedJobIds([...savedJobIds, id]);
    }
  };

  // Mock data for applied jobs
  const appliedJobs = [
    {
      id: "1",
      title: "Senior Product Manager",
      company: "Slack Technologies, LLC",
      logo: "/placeholder.svg?height=40&width=40&text=S&bg=4A154B",
      matchesProfile: true,
      postedTime: "1 hour ago",
      tags: ["Full Time", "Remote", "Senior Level"],
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      activelyRecruiting: false,
    },
    {
      id: "2",
      title: "UX Designer",
      company: "Adobe Inc.",
      logo: "/placeholder.svg?height=40&width=40&text=A&bg=FF0000",
      matchesProfile: false,
      postedTime: "3 days ago",
      tags: ["Full Time", "On-site", "Mid Level"],
      location: "San Jose, CA",
      salary: "$90,000 - $120,000",
      activelyRecruiting: true,
    },
    {
      id: "3",
      title: "Frontend Developer",
      company: "Spotify",
      logo: "/placeholder.svg?height=40&width=40&text=S&bg=1DB954",
      matchesProfile: true,
      postedTime: "2 days ago",
      tags: ["Contract", "Remote", "Senior Level"],
      location: "New York, NY",
      salary: "$110,000 - $140,000",
      activelyRecruiting: false,
    },
  ];

  // Mock data for saved jobs
  const savedJobs = [
    {
      id: "3",
      title: "Frontend Developer",
      company: "Spotify",
      logo: "/placeholder.svg?height=40&width=40&text=S&bg=1DB954",
      matchesProfile: true,
      postedTime: "2 days ago",
      tags: ["Contract", "Remote", "Senior Level"],
      location: "New York, NY",
      salary: "$110,000 - $140,000",
      activelyRecruiting: false,
    },
    {
      id: "4",
      title: "Product Manager",
      company: "Figma, Inc.",
      logo: "/placeholder.svg?height=40&width=40&text=F&bg=0ACF83",
      matchesProfile: false,
      postedTime: "2 hours ago",
      tags: ["Full Time", "Remote", "Junior Level"],
      location: "San Francisco, CA",
      salary: "$80,000 - $100,000",
      activelyRecruiting: true,
    },
    {
      id: "5",
      title: "Data Scientist",
      company: "Netflix",
      logo: "/placeholder.svg?height=40&width=40&text=N&bg=E50914",
      matchesProfile: true,
      postedTime: "5 hours ago",
      tags: ["Full Time", "Hybrid", "Senior Level"],
      location: "Los Gatos, CA",
      salary: "$130,000 - $160,000",
      activelyRecruiting: false,
    },
  ].filter((job) => savedJobIds.includes(job.id));

  // Get jobs based on active tab
  const displayedJobs = activeTab === "applied" ? appliedJobs : savedJobs;

  // Find similar jobs based on job title and tags
  const getSimilarJobs = (job: any) => {
    const allJobs = [...appliedJobs, ...savedJobs];
    return allJobs.filter(
      (j) =>
        j.id !== job.id &&
        (j.title.includes(job.title.split(" ")[0]) ||
          j.tags.some((tag) => job.tags.includes(tag)))
    );
  };

  // Find other jobs from the same company
  const getOtherJobsFromCompany = (job: any) => {
    const allJobs = [...appliedJobs, ...savedJobs];
    return allJobs.filter((j) => j.id !== job.id && j.company === job.company);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Công việc của tôi</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeTab === "applied"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("applied")}
          >
            Đã ứng tuyển ({appliedJobs.length})
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeTab === "saved"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Đã lưu ({savedJobs.length})
          </button>
        </div>

        {/* Job List Table */}
        {displayedJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedJobs.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => openJobModal(job)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {job.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {job.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        {job.matchesProfile && (
                          <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Profile match
                          </div>
                        )}
                        {job.activelyRecruiting && (
                          <div className="flex items-center text-xs text-green-600">
                            <Building className="h-3 w-3 mr-1" />
                            Recruiting
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {job.tags.map((tag, index) => {
                            let bgColor = "bg-yellow-100 text-yellow-800";
                            if (tag.includes("Remote")) {
                              bgColor = "bg-blue-100 text-blue-800";
                            } else if (tag.includes("Senior")) {
                              bgColor = "bg-green-100 text-green-800";
                            } else if (tag.includes("Junior")) {
                              bgColor = "bg-purple-100 text-purple-800";
                            }

                            return (
                              <span
                                key={index}
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${bgColor}`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.location}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {job.salary}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.postedTime}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => toggleSaveJob(job.id, e)}
                        className={`text-sm font-medium flex items-center gap-1 ml-auto ${
                          savedJobIds.includes(job.id)
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            savedJobIds.includes(job.id)
                              ? "fill-blue-600 text-blue-600"
                              : ""
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === "applied" ? (
                <CheckCircle className="h-8 w-8 text-gray-400" />
              ) : (
                <Bookmark className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No {activeTab === "applied" ? "applied" : "saved"} jobs yet
            </h3>
            <p className="text-gray-500 mb-4">
              {activeTab === "applied"
                ? "When you apply for jobs, they will appear here."
                : "Save jobs you're interested in to view them later."}
            </p>
            <Link
              href="/find-jobs"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Find Jobs
            </Link>
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={{
            ...selectedJob,
            description:
              "This is a mock job description. The actual description would contain details about the role, responsibilities, and requirements.",
            benefits: [
              "Competitive salary and benefits package",
              "Flexible working arrangements",
              "Professional development opportunities",
              "Collaborative and innovative work environment",
            ],
          }}
          isOpen={isModalOpen}
          onClose={closeJobModal}
          similarJobs={getSimilarJobs(selectedJob)}
          otherJobsFromCompany={getOtherJobsFromCompany(selectedJob)}
          savedJobs={savedJobIds}
          onToggleSave={toggleSaveJob}
        />
      )}
    </div>
  );
}
