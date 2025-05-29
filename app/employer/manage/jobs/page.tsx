"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  Users,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  ArrowUpDown,
} from "lucide-react";
import { EmployerJobDetailDrawer } from "@/components/employer-job-detail-drawer";
import { useList } from "@/hooks/useDataProvider";
import { JobPost } from "@/providers/types/definition";
import { Pagination } from "@/components/pagination";

export default function EmployerJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view");
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const { data, pageCount, pagination, setPage } = useList<JobPost>({
    resource: "buss/public/Jobs",
  });
  const jobs = data?.data || [];
  console.log("Jobs data:", data);

  // Scroll event handler for hiding/showing header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setShowHeader(currentScrollY < lastScrollY.current);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock data for jobs
  // const jobs = [
  //   {
  //     id: "1",
  //     title: "Senior Product Designer",
  //     department: "Design",
  //     location: "San Francisco, CA",
  //     type: "Full-time",
  //     workType: "Remote",
  //     experience: "Senior Level",
  //     postedDate: "2023-04-15",
  //     applicants: 24,
  //     status: "active",
  //   },
  //   {
  //     id: "2",
  //     title: "Frontend Developer",
  //     department: "Engineering",
  //     location: "New York, NY",
  //     type: "Full-time",
  //     workType: "Hybrid",
  //     experience: "Mid Level",
  //     postedDate: "2023-04-10",
  //     applicants: 18,
  //     status: "active",
  //   },
  //   {
  //     id: "3",
  //     title: "Marketing Manager",
  //     department: "Marketing",
  //     location: "Chicago, IL",
  //     type: "Full-time",
  //     workType: "On-site",
  //     experience: "Senior Level",
  //     postedDate: "2023-04-05",
  //     applicants: 12,
  //     status: "closed",
  //   },
  //   {
  //     id: "4",
  //     title: "UX Researcher",
  //     department: "Design",
  //     location: "Remote",
  //     type: "Contract",
  //     workType: "Remote",
  //     experience: "Mid Level",
  //     postedDate: "2023-04-01",
  //     applicants: 9,
  //     status: "active",
  //   },
  //   {
  //     id: "5",
  //     title: "Data Analyst",
  //     department: "Analytics",
  //     location: "Boston, MA",
  //     type: "Full-time",
  //     workType: "On-site",
  //     experience: "Entry Level",
  //     postedDate: "2023-03-28",
  //     applicants: 32,
  //     status: "active",
  //   },
  //   {
  //     id: "6",
  //     title: "Backend Developer",
  //     department: "Engineering",
  //     location: "Seattle, WA",
  //     type: "Full-time",
  //     workType: "Hybrid",
  //     experience: "Senior Level",
  //     postedDate: "2023-03-25",
  //     applicants: 15,
  //     status: "active",
  //   },
  //   {
  //     id: "7",
  //     title: "Content Writer",
  //     department: "Marketing",
  //     location: "Austin, TX",
  //     type: "Part-time",
  //     workType: "Remote",
  //     experience: "Entry Level",
  //     postedDate: "2023-03-22",
  //     applicants: 28,
  //     status: "active",
  //   },
  //   {
  //     id: "8",
  //     title: "HR Specialist",
  //     department: "Human Resources",
  //     location: "Denver, CO",
  //     type: "Full-time",
  //     workType: "On-site",
  //     experience: "Mid Level",
  //     postedDate: "2023-03-20",
  //     applicants: 7,
  //     status: "closed",
  //   },
  //   {
  //     id: "9",
  //     title: "Project Manager",
  //     department: "Operations",
  //     location: "Portland, OR",
  //     type: "Contract",
  //     workType: "Hybrid",
  //     experience: "Senior Level",
  //     postedDate: "2023-03-18",
  //     applicants: 11,
  //     status: "active",
  //   },
  //   {
  //     id: "10",
  //     title: "Sales Representative",
  //     department: "Sales",
  //     location: "Miami, FL",
  //     type: "Full-time",
  //     workType: "On-site",
  //     experience: "Entry Level",
  //     postedDate: "2023-03-15",
  //     applicants: 19,
  //     status: "active",
  //   },
  // ];

  // Get unique departments for filter
  // const departments = Array.from(new Set(jobs.map((job) => job.department)));

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold">Danh sách việc làm</h1>
            <Link
              href="/employer/manage/post-job"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Đăng việc làm mới
            </Link>
          </div>

          {/* Enhanced Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm tên việc làm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Lọc
                  <ChevronDown
                    className={`h-4 w-4 ml-2 transition-transform ${
                      filterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Xuất danh sách
                </button>
              </div>

              {/* Expanded Filters */}
              {filterOpen && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label
                      htmlFor="status-filter"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Status
                    </label>
                    <select
                      id="status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="type-filter"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Job Type
                    </label>
                    <select
                      id="type-filter"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="all">All Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  {/* <div>
                    <label
                      htmlFor="department-filter"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Department
                    </label>
                    <select
                      id="department-filter"
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="all">All Departments</option>
                      {departments.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </div>
              )}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Tổng việc làm
              </div>
              <div className="text-2xl font-bold mt-1">{jobs.length}</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Việc làm đang hoạt động
              </div>
              <div className="text-2xl font-bold mt-1">
                {jobs.filter((job) => job.isPublished).length}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Tổng số ứng viên
              </div>
              <div className="text-2xl font-bold mt-1">
                {jobs.reduce((sum, job) => sum + 10, 0)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Số ứng viên trung bình
              </div>
              <div className="text-2xl font-bold mt-1">
                {Math.round(
                  jobs.reduce((sum, job) => sum + 10, 0) / jobs.length
                )}
              </div>
            </div>
          </div>

          {/* Job Listings Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-medium">Job Listings</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {jobs.length} of {jobs.length} jobs
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        Job
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
                    >
                      <div className="flex items-center">
                        Location
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
                    >
                      <div className="flex items-center">
                        Posted Date
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        Applicants
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        Status
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {jobs.length > 0 ? (
                    jobs.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {job.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {job.dmHuyenCode} - {job.dmTinhCode}
                            </div>
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
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(job.createdDate)}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            {getDaysAgo(job.createdDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-900 dark:text-gray-100">
                              10
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                              job.status
                            )}`}
                          >
                            {job.isPublished ? "Đang hoạt động" : "Đã đóng"}
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
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        No job listings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <Pagination
              currentPage={pagination.current}
              totalItems={data?.total || 0}
              itemsPerPage={pagination.pageSize}
              onPageChange={setPage}
              className="px-6 py-4 border-t border-gray-200 dark:border-gray-800"
            />
            {/* Pagination */}
            {/* <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Hiển thị <span className="font-medium">1</span> đến{" "}
                <span className="font-medium">{jobs.length}</span> của{" "}
                <span className="font-medium">{jobs.length}</span> kết quả
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button
                  className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  disabled
                >
                  Next
                </button>
              </div>
            </div> */}
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
