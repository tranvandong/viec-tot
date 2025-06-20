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
import { useApplyCandidates } from "./useApplyCandidates";
import { Application } from "@/providers/types/definition";
import ChatBox from "./chatbox";
import { Pagination } from "@/components/pagination";

export default function CandidatesTablePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isSortNewest, setIsSortNewest] = useState(false);
  const PAGE_SIZE = 10;

  const [openChats, setOpenChats] = useState<{ id: number; name: string }[]>(
    []
  );

  const openChat = (candidate: Application) => {
    if (!openChats.find((c) => c.id === candidate.id)) {
      setOpenChats((prev) => [...prev, candidate]);
    }
  };

  const closeChat = (id: number) => {
    setOpenChats((prev) => prev.filter((c) => c.id !== id));
  };

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

  // Open candidate profile drawer
  const openCandidateDrawer = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  // // Get status display text
  // const getStatusDisplayText = (status: string) => {
  //   switch (status) {
  //     case "review":
  //       return "Under Review";
  //     case "shortlisted":
  //       return "Shortlisted";
  //     case "interview":
  //       return "Interview";
  //     case "rejected":
  //       return "Rejected";
  //     case "hired":
  //       return "Hired";
  //     default:
  //       return status;
  //   }
  // };

  // Lấy nội dung hiển thị trạng thái
  const getStatusDisplayText = (status: string) => {
    switch (status) {
      case "review":
        return "Đang xem xét";
      case "shortlisted":
        return "Đã vào danh sách";
      case "interview":
        return "Phỏng vấn";
      case "rejected":
        return "Đã bị từ chối";
      case "hired":
        return "Đã tuyển dụng";
      case "Submitted":
        return "Đã nộp";
      default:
        return status;
    }
  };

  const {
    data: candidates,
    total,
    loading,
  } = useApplyCandidates({
    page,
    search,
    isSortNewest,
    pageSize: PAGE_SIZE,
  });

  // Get unique job titles for filter
  const jobTitles = Array.from(
    new Set(candidates.map((candidate) => candidate.jobTitle))
  );

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.applicant?.dienThoai
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidate.applicant?.email
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || candidate.status === statusFilter;
    const matchesPosition =
      positionFilter === "all" || candidate.jobTitle === positionFilter;

    return matchesSearch && matchesStatus && matchesPosition;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold">Ứng viên</h1>
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
                  placeholder="Tìm ứng viên theo tên, vị trí, kỹ năng..."
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
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="Submitted">Đã nộp</SelectItem>
                      <SelectItem value="review">Đang xem xét</SelectItem>
                      <SelectItem value="shortlisted">
                        Đã vào danh sách
                      </SelectItem>
                      <SelectItem value="interview">Phỏng vấn</SelectItem>
                      <SelectItem value="hired">Đã tuyển dụng</SelectItem>
                      <SelectItem value="rejected">Đã bị từ chối</SelectItem>
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
                      <SelectItem value="all">Tất cả vị trí</SelectItem>
                      {/* {jobTitles.map((title) => (
                        <SelectItem key={title} value={title}>
                          {title}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="flex items-center gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  Bộ lọc khác
                </Button>
              </div>
            </div>
          </div>

          {/* Results info */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hiển thị{" "}
              <span className="font-medium">{filteredCandidates.length}</span>{" "}
              ứng viên
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
                      Ứng viên
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Chức vụ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Địa chỉ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Ngày ứng tuyển
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Trạng thái
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
                      Hành động
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
                                src={
                                  candidate.avatar ||
                                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                }
                                alt={candidate?.applicant?.name ?? ""}
                                width={40}
                                height={40}
                                className="h-10 w-10 object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {candidate?.applicant?.name ??
                                  candidate?.applicant?.dienThoai}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {candidate?.applicant?.name ??
                                  candidate?.applicant?.email}
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
                            {candidate.location ?? "Đang cập nhật"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">
                            {formatDate(candidate.appliedAt)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {getDaysAgo(candidate.appliedAt)}
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
                            {candidate.matchScore ?? 0}%
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
                              title="Nhắn tin"
                              onClick={() => openChat(candidate)}
                            >
                              <MessageCircle className="h-4 w-4" />
                            </button>
                            {/* Các khung chat đã mở */}
                            <div className="fixed bottom-4 right-4 flex gap-4">
                              {openChats.map((user, index) => (
                                <div
                                  key={user.id}
                                  style={{ right: `${index * 340}px` }}
                                  className="relative"
                                >
                                  <ChatBox
                                    user={user}
                                    onClose={() => closeChat(user.id)}
                                  />
                                </div>
                              ))}
                            </div>
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
              <Pagination
                currentPage={page}
                totalItems={total}
                itemsPerPage={PAGE_SIZE}
                onPageChange={setPage}
                className="px-6 py-4 border-t border-gray-200 dark:border-gray-800"
              />
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
