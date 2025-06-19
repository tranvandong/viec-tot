"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Calendar,
  ChevronDown,
  BookmarkPlus,
  Grid,
  List,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CandidateBottomDrawer } from "@/components/candidate-bottom-drawer";
import { dataProvider } from "@/providers/dataProvider";
import { useList } from "@/hooks/useDataProvider";
import { Applicant, JobPost } from "@/providers/types/definition";

const mockApplicants: Applicant[] = [
  {
    status: "On",
    userId: "mock-user-id",
    dienThoai: "0123456789",
    email: "mock@email.com",
    fileId: null,
    id: "mock-id",
    createdDate: new Date().toISOString(),
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    resume: {
      applicantId: "mock-id",
      title: "Frontend Developer",
      education: "Bachelor of IT",
      experience: "2 years",
      skills: "React, TypeScript",
      certifications: "None",
      summary: "Enthusiastic developer",
      hrViewCount: 0,
    },
  },
  {
    status: "On",
    userId: "mock-user-id",
    dienThoai: "0123456789",
    email: "mock@email.com",
    fileId: null,
    id: "mock-id",
    createdDate: new Date().toISOString(),
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    name: "Nguyễn Văn A",
    jobType: "Toàn thời gian",
    location: "Hà Nội",
    matchScore: 85,
    appliedDate: "2 ngày trước",
    resume: {
      applicantId: "mock-id",
      title: "Frontend Developer",
      education: "Đại học Công nghệ",
      experience: "2 năm",
      skills: "React, TypeScript, Next.js",
      certifications: "Chứng chỉ Google",
      summary: "Lập trình viên giao diện người dùng",
      hrViewCount: 12,
    },
  },
  {
    name: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=100&width=100",
    jobTitle: "UI/UX Designer",
    company: "Pixelz Studio",
    location: "Hà Nội, Việt Nam",
    matchScore: 95,
    experience: "2-4 năm",
    education: "Đại học", // This should be a string for the card display
    jobType: "Toàn thời gian",
    workMode: "Từ xa",
    appliedDate: "2 ngày trước",
    applicants: 140,
    salary: "1000$/tháng",
    skills: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "UI Design",
      "UX Research",
      "Prototyping",
    ],
    languages: [
      { language: "Tiếng Việt", level: "Bản ngữ" },
      { language: "Tiếng Anh", level: "Thành thạo" },
    ],
    email: "nguyenvana@example.com",
    phone: "+84 123 456 789",
    birthDate: "15/05/1995",
    gender: "Nam",
    desiredPosition: "Senior UI/UX Designer",
    expectedSalary: "$1,200 - $1,500/tháng",
    availability: "Có thể bắt đầu ngay",
    summary:
      "Tôi là một UI/UX Designer với hơn 3 năm kinh nghiệm trong việc thiết kế giao diện người dùng và trải nghiệm người dùng cho các ứng dụng web và di động. Tôi có kinh nghiệm làm việc với các công ty khởi nghiệp và doanh nghiệp lớn trong nhiều lĩnh vực khác nhau.",
    experiences: [
      {
        title: "Senior UI/UX Designer",
        company: "Pixelz Studio",
        location: "Hà Nội",
        period: "01/2021 - Hiện tại",
        description:
          "Thiết kế giao diện người dùng và trải nghiệm người dùng cho các ứng dụng web và di động. Làm việc chặt chẽ với các nhà phát triển và quản lý sản phẩm để đảm bảo trải nghiệm người dùng tốt nhất.",
      },
      {
        title: "UI/UX Designer",
        company: "Tech Solutions",
        location: "Hồ Chí Minh",
        period: "06/2019 - 12/2020",
        description:
          "Thiết kế giao diện người dùng cho các ứng dụng web. Thực hiện nghiên cứu người dùng và tạo các prototype để kiểm tra trải nghiệm người dùng.",
      },
    ],
    education: [
      {
        degree: "Cử nhân Thiết kế Đồ họa",
        institution: "Đại học Mỹ thuật Hà Nội",
        location: "Hà Nội",
        period: "2015 - 2019",
        description: "Chuyên ngành Thiết kế Đồ họa với điểm trung bình 3.8/4.0",
      },
    ],
    certifications: [
      {
        name: "Google UX Design Professional Certificate",
        issuer: "Google",
        date: "2022",
      },
      {
        name: "UI/UX Design Bootcamp",
        issuer: "Udemy",
        date: "2020",
      },
    ],
  },
];

export default function CandidatesPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleViewProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  const { data, pageCount, pagination, setPage } = useList<Applicant>({
    resource: "Applicants",
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filters: [],
    sorters: [],
    meta: {
      join: ["Resume"],
      config: {
        subSystem: "buss",
        auth: "allow",
        mode: "client", // hoặc "server"
      },
    },
  });
  const candidatesData =
    Array.isArray(data?.data) && data.data.length > 0
      ? data.data
      : mockApplicants;

  console.log("Applicant datas:", candidatesData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Ứng viên</h1>
          <div className="flex items-center gap-2">
            <button
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content */}
          <div className="w-full md:w-3/4">
            {/* Search and filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input placeholder="Tìm kiếm ứng viên..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    Lọc
                  </Button>
                  <Button variant="outline">Mới nhất</Button>
                  <Button variant="outline">Phù hợp nhất</Button>
                </div>
              </div>
            </div>

            {/* Results info */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hiển thị <span className="font-medium">150</span> ứng viên UI/UX
                Designer
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Sắp xếp theo:
                </span>
                <Button
                  variant="ghost"
                  className="text-sm flex items-center gap-1"
                >
                  Liên quan <ChevronDown size={16} />
                </Button>
              </div>
            </div>

            {/* Candidates grid */}
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              } gap-4`}
            >
              {candidatesData.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  {viewMode === "list" && (
                    <div className="w-24 h-24 p-2">
                      <div className="w-full h-full rounded-lg overflow-hidden">
                        <Image
                          src={candidate.avatar || "/placeholder.svg"}
                          alt={candidate.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        {viewMode === "grid" && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
                            <Image
                              src={candidate.avatar || "/placeholder.svg"}
                              alt={candidate.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium">
                            {candidate.name ?? "Chưa cập nhật"}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {candidate &&
                              candidate.resume &&
                              candidate.resume.title}
                          </p>
                        </div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded px-2 py-1">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          {candidate.matchScore ?? "0"}% Match
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {candidate.location}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Briefcase className="h-3 w-3" />
                        {candidate.experience}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <GraduationCap className="h-3 w-3" />
                        {typeof candidate.education === "string"
                          ? candidate.education
                          : "Đại học"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" />
                        {candidate.jobType}
                      </Badge>
                    </div>

                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      Ứng tuyển {candidate.appliedDate}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleViewProfile(candidate)}
                      >
                        <Eye className="h-4 w-4" />
                        Xem hồ sơ
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <BookmarkPlus className="h-4 w-4" />
                        Lưu
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Bộ lọc</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 dark:text-blue-400 h-auto py-1"
                >
                  Xóa tất cả
                </Button>
              </div>

              {/* Location filter */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Địa điểm</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="location-hanoi" />
                    <label htmlFor="location-hanoi" className="ml-2 text-sm">
                      Hà Nội
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="location-hcm" />
                    <label htmlFor="location-hcm" className="ml-2 text-sm">
                      Hồ Chí Minh
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="location-danang" />
                    <label htmlFor="location-danang" className="ml-2 text-sm">
                      Đà Nẵng
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="location-other" />
                    <label htmlFor="location-other" className="ml-2 text-sm">
                      Khác
                    </label>
                  </div>
                </div>
              </div>

              {/* Gender filter */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Giới tính</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="gender-male" />
                    <label htmlFor="gender-male" className="ml-2 text-sm">
                      Nam
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="gender-female" />
                    <label htmlFor="gender-female" className="ml-2 text-sm">
                      Nữ
                    </label>
                  </div>
                </div>
              </div>

              {/* Education filter */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Học vấn</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="edu-highschool" />
                    <label htmlFor="edu-highschool" className="ml-2 text-sm">
                      Trung học
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="edu-college" />
                    <label htmlFor="edu-college" className="ml-2 text-sm">
                      Cao đẳng
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="edu-bachelor" />
                    <label htmlFor="edu-bachelor" className="ml-2 text-sm">
                      Đại học
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="edu-master" />
                    <label htmlFor="edu-master" className="ml-2 text-sm">
                      Thạc sĩ
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="edu-phd" />
                    <label htmlFor="edu-phd" className="ml-2 text-sm">
                      Tiến sĩ
                    </label>
                  </div>
                </div>
              </div>

              {/* Industry filter */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Ngành nghề</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="industry-it" />
                    <label htmlFor="industry-it" className="ml-2 text-sm">
                      Công nghệ thông tin
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="industry-design" />
                    <label htmlFor="industry-design" className="ml-2 text-sm">
                      Thiết kế
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="industry-marketing" />
                    <label
                      htmlFor="industry-marketing"
                      className="ml-2 text-sm"
                    >
                      Marketing
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="industry-finance" />
                    <label htmlFor="industry-finance" className="ml-2 text-sm">
                      Tài chính
                    </label>
                  </div>
                </div>
              </div>

              {/* Candidate type filter */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Loại ứng viên</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="type-fulltime" />
                    <label htmlFor="type-fulltime" className="ml-2 text-sm">
                      Toàn thời gian
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="type-parttime" />
                    <label htmlFor="type-parttime" className="ml-2 text-sm">
                      Bán thời gian
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="type-freelance" />
                    <label htmlFor="type-freelance" className="ml-2 text-sm">
                      Freelance
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="type-intern" />
                    <label htmlFor="type-intern" className="ml-2 text-sm">
                      Thực tập
                    </label>
                  </div>
                </div>
              </div>

              {/* Experience filter */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Kinh nghiệm</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="exp-0-1" />
                    <label htmlFor="exp-0-1" className="ml-2 text-sm">
                      0-1 năm
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="exp-1-3" />
                    <label htmlFor="exp-1-3" className="ml-2 text-sm">
                      1-3 năm
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="exp-3-5" />
                    <label htmlFor="exp-3-5" className="ml-2 text-sm">
                      3-5 năm
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="exp-5-plus" />
                    <label htmlFor="exp-5-plus" className="ml-2 text-sm">
                      5+ năm
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full">Áp dụng bộ lọc</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Profile Drawer */}
      {selectedCandidate && (
        <CandidateBottomDrawer
          candidate={selectedCandidate}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
}
