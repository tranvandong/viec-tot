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
import {
  useDelete,
  useDeleteNew,
  UseDeleteParams,
  useList,
  useUpdate,
  useUpdateNew,
} from "@/hooks/useDataProvider";
import { JobPost } from "@/providers/types/definition";
import { Pagination } from "@/components/pagination";
import { useToast } from "@/hooks/use-toast";

// Format date
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

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
  const { toast } = useToast();

  const { data, pageCount, pagination, setPage, reload } = useList<JobPost>({
    resource: "Jobs",
  });
  const jobs = data?.data || [];
  console.log("Jobs data:", data);
  const [jobToDelete, setJobToDelete] = useState(null);

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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesTypes = typeFilter === "all" || job.industry === typeFilter;

    return matchesSearch && matchesStatus && matchesTypes;
  });

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

  const { mutate, isPending } = useDeleteNew();

  const handleDelete = (id: string) => {
    mutate(
      { resource: "Jobs", id },
      {
        onSuccess: () => {
          toast({
            description:
              data?.error?.message || "Xoá thông báo tuyển dụng thành công ",
            title: "Xoá thành công",
            type: "background",
            variant: "success",
          });
          reload();
        },
        onError: (err) => {
          toast({
            description:
              data?.error?.message || "Xoá thông báo tuyển dụng thất bại ",
            title: "Xoá thất bại",
            type: "background",
            variant: "warning",
          });
          console.error("Xoá thất bại:", err);
        },
      }
    );
  };

  const { mutate: updateJob } = useUpdateNew({
    resource: "Jobs",
    id: `(${selectedJob?.id})`,
    meta: {
      config: {
        subSystem: "buss",
        auth: "auth",
      },
    },
  });

  // Handle job update
  const handleJobUpdate = (updatedJob: any) => {
    const {
      title,
      description,
      location,
      industry,
      status,
      fromSalary,
      toSalary,
      ...newSelectedJob
    } = updatedJob;
    updateJob(
      { title, description, location, industry, status, fromSalary, toSalary },
      {
        onSuccess: (data) => {
          toast({
            description:
              data?.message || "Cập nhật thông tin công việc thành công",
            title: "Cập nhật thành công",
            type: "background",
            variant: "success",
          });

          // Đóng drawer và reload danh sách nếu cần
          setIsDrawerOpen(false);
          reload?.();
        },
        onError: (err: any) => {
          toast({
            description:
              err?.response?.data?.message ||
              "Cập nhật thông tin công việc thất bại",
            title: "Cập nhật thất bại",
            type: "background",
            variant: "warning",
          });
          console.error("Cập nhật lỗi:", err);
        },
      }
    );
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
                      Trạng thái
                    </label>
                    <select
                      id="status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="all">Tất cả trạng thái</option>
                      <option value="Approved">Kích hoạt</option>
                      <option value="UnApproved">Chưa kích hoạt</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="type-filter"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Loại công việc
                    </label>
                    <select
                      id="type-filter"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="all">Tất cả</option>
                      <option value="Toàn thời gian">Toàn thời gian</option>
                      <option value="Bán thời gian">Bán thời gian</option>
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
              <div className="text-2xl font-bold mt-1">
                {filteredJobs.length}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Việc làm đang hoạt động
              </div>
              <div className="text-2xl font-bold mt-1">
                {filteredJobs.filter((job) => job.isPublished).length}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Tổng số ứng viên
              </div>
              <div className="text-2xl font-bold mt-1">
                {filteredJobs.reduce((sum, job) => sum + 10, 0)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Số ứng viên trung bình
              </div>
              <div className="text-2xl font-bold mt-1">
                {Math.round(
                  filteredJobs.reduce((sum, job) => sum + 10, 0) /
                    filteredJobs.length
                )}
              </div>
            </div>
          </div>

          {/* Job Listings Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-medium">Danh sách việc làm</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Hiển thị {filteredJobs.length} trên {filteredJobs.length} Việc
                làm
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
                        Việc làm
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
                    >
                      <div className="flex items-center">
                        Địa chỉ
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
                    >
                      <div className="flex items-center">
                        Ngày đăng
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        Người nộp đơn
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        Trạng thái
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
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
                              onClick={() => setJobToDelete(job)}
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                              title="Xoá công việc"
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

      {jobToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 animate-fadeIn flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-[320px] text-center animate-fadeInScale">
            <h2 className="text-lg font-semibold mb-3">Xác nhận xoá</h2>
            <p className="text-sm mb-4">
              Bạn có chắc chắn muốn xoá công việc <b>{jobToDelete.title}</b>{" "}
              không?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setJobToDelete(null)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              >
                Huỷ
              </button>
              <button
                onClick={() => {
                  handleDelete(jobToDelete.id);
                  setJobToDelete(null);
                }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
