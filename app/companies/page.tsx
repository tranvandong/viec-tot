"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronDown, Clock, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { JobDetailModal } from "@/components/job-detail-modal";

export default function Companies() {
  const searchParams = useSearchParams();
  const jobQuery = searchParams.get("job") || "UI/UX Designer";
  const locationQuery = searchParams.get("location") || "Indonesia";

  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isRemoteOpen, setIsRemoteOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    rangeSalary: true,
    experience: true,
  });
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id));
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  };

  const openJobModal = (job: any, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedJob(job);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  // Update the closeJobModal function to handle animation
  const closeJobModal = () => {
    setIsModalOpen(false);
    // Body scrolling will be re-enabled after the animation completes in the modal component
  };

  // Find similar jobs based on job title and experience
  const getSimilarJobs = (job: any) => {
    return jobs.filter(
      (j) =>
        j.id !== job.id &&
        (j.title.includes(job.title.split(" ")[0]) ||
          j.experience === job.experience)
    );
  };

  // Find other jobs from the same company
  const getOtherJobsFromCompany = (job: any) => {
    return jobs.filter((j) => j.id !== job.id && j.company === job.company);
  };

  const jobs = [
    {
      id: "1",
      title: "UI/UX Designer",
      company: "Pixelz Studio",
      location: "Yogyakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=P&bg=black",
      jobType: "Fulltime",
      workType: "Remote",
      experience: "2-4 Years",
      postedTime: "2 days ago",
      applicants: 140,
      salary: "$1000/month",
      match: true,
      description: `As an UI/UX Designer on Pixelz Studio, you'll focus on design user-friendly on several platform (web, mobile, dashboard, etc) to our users needs. Your innovative solution will enhance the user experience on several platforms. Join us and let's making impact on user engagement at Pixelz Studio.`,
      benefits: [
        "Competitive salary and benefits package",
        "Flexible working hours",
        "Remote work options",
        "Professional development opportunities",
      ],
    },
    {
      id: "2",
      title: "Product Designer",
      company: "Traveloka",
      location: "Jakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=T&bg=blue",
      jobType: "Fulltime",
      workType: "Onsite",
      experience: "2-4 Years",
      postedTime: "an hour ago",
      applicants: 140,
      salary: "$1500/month",
      match: true,
      description: `We are looking for a talented Product Designer to join our team and help us create amazing user experiences for our travel platform. The ideal candidate will have a strong portfolio demonstrating their ability to solve complex design problems and create intuitive, user-friendly interfaces.`,
      benefits: [
        "Competitive salary and benefits package",
        "Opportunity to work on a product used by millions",
        "Career growth and development opportunities",
        "Collaborative and innovative work environment",
      ],
    },
    {
      id: "3",
      title: "UX Designer",
      company: "Tokopedia",
      location: "Jakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=T&bg=green",
      jobType: "Fulltime",
      workType: "Remote",
      experience: "2-4 Years",
      postedTime: "2 days ago",
      applicants: 140,
      salary: "$1000/month",
      match: true,
      description: `Tokopedia is looking for a UX Designer to join our growing team. You will be responsible for creating user-centered designs that meet business requirements and enhance customer experience. As a UX Designer, you will work closely with product managers, developers, and other designers to deliver high-quality designs.`,
      benefits: [
        "Flexible working hours",
        "Remote work options",
        "Health insurance",
        "Professional development budget",
      ],
    },
    {
      id: "4",
      title: "Interaction Designer",
      company: "GoPay",
      location: "Jakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=G&bg=blue",
      jobType: "Fulltime",
      workType: "Onsite",
      experience: "2-4 Years",
      postedTime: "2 days ago",
      applicants: 140,
      salary: "$1000/month",
      match: true,
      description: `GoPay is looking for an Interaction Designer to join our team. You will be responsible for creating engaging and intuitive user experiences for our payment platform. The ideal candidate will have experience in designing for mobile applications and a strong understanding of user-centered design principles.`,
      benefits: [
        "Competitive salary and benefits",
        "Professional development opportunities",
        "Flexible working arrangements",
        "Modern office with great amenities",
      ],
    },
    {
      id: "5",
      title: "UI Designer",
      company: "Gojek",
      location: "Jakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=G&bg=green",
      jobType: "Fulltime",
      workType: "Onsite",
      experience: "0-2 Years",
      postedTime: "2 days ago",
      applicants: 521,
      salary: "$900/month",
      match: true,
      description: `Gojek is seeking a talented UI Designer to join our growing design team. You will be responsible for creating visually appealing and user-friendly interfaces for our super app. The ideal candidate will have a strong portfolio showcasing their UI design skills and a passion for creating beautiful, functional designs.`,
      benefits: [
        "Competitive salary",
        "Health insurance",
        "Professional development budget",
        "Flexible working hours",
      ],
    },
    {
      id: "6",
      title: "Sr. UI/UX Designer",
      company: "Shopee",
      location: "Jakarta, Indonesia",
      logo: "/placeholder.svg?height=60&width=60&text=S&bg=orange",
      jobType: "Fulltime",
      workType: "Hybrid",
      experience: "3-5 Years",
      postedTime: "2 days ago",
      applicants: 140,
      salary: "$2000/month",
      match: true,
      description: `Shopee is looking for a Senior UI/UX Designer to join our team. You will be responsible for leading design projects and mentoring junior designers. The ideal candidate will have extensive experience in UI/UX design, a strong portfolio, and excellent leadership skills.`,
      benefits: [
        "Competitive salary and benefits package",
        "Leadership opportunities",
        "Professional development budget",
        "Flexible working arrangements",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-blue-950 text-white">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-orange-500 px-2 py-1 rounded font-bold text-white">
                Viec
              </span>
              <span className="font-bold text-lg text-white">Tot</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-white">
                Trang chủ
              </Link>
              <Link
                href="/search-results"
                className="text-sm font-medium text-white "
              >
                Tìm việc
              </Link>
              <Link
                href="/companies"
                className="text-sm font-medium text-white border-b-2 border-white pb-1"
              >
                Công ty
              </Link>
              <Link href="/service" className="text-sm font-medium text-white">
                Dịch vụ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white">
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Search */}
      <div className="bg-blue-950 text-white pt-8 pb-24">
        <div className="container text-center max-w-3xl mx-auto px-4 md:px-8">
          <div className="inline-block bg-blue-900/50 text-xs px-4 py-2 rounded-full mb-8">
            Nền tảng tìm việc số 1
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tìm người tài năng
            <br />
            cho công việc của bạn
          </h1>
          <p className="text-blue-200 mb-8">
            Hơn 5 triệu việc làm để bạn khám phá. Hãy tìm kiếm ngay để tìm công
            việc tiếp theo của bạn
          </p>

          <div className="bg-white rounded-full p-2 flex items-center gap-2 mb-4 max-w-3xl mx-auto">
            <div className="flex items-center flex-1 pl-2">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                className="py-2 px-3 block w-full border-0 focus:outline-none focus:ring-0 placeholder-gray-400 bg-transparent dark:text-gray-800"
                placeholder="Chức danh, từ khóa hoặc công ty"
                defaultValue={jobQuery}
              />
            </div>
            <div className="h-6 w-px bg-gray-200"></div>
            <div className="flex items-center flex-1 pl-2">
              <svg
                className="h-5 w-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="text"
                className="py-2 px-3 block w-full border-0 focus:outline-none focus:ring-0 placeholder-gray-400 bg-transparent dark:text-gray-800"
                placeholder="Thành phố, tỉnh hoặc từ xa"
                defaultValue={locationQuery}
              />
            </div>
            <button
              type="button"
              className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Job Listings */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-gray-600 dark:text-gray-300">
                  Hiển thị <span className="font-semibold">150</span> việc làm{" "}
                  <span className="font-semibold">{jobQuery}</span> tại{" "}
                  <span className="font-semibold">{locationQuery}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Sắp xếp theo
                  </span>
                  <button className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm dark:text-gray-300">
                    Liên quan
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="flex border border-gray-300 dark:border-gray-600 rounded-md">
                    <button
                      className={`px-2 py-1.5 ${
                        viewMode === "grid"
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => setViewMode("grid")}
                      aria-label="Xem dạng lưới"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="dark:text-gray-300"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="14"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="3"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="14"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                    <button
                      className={`px-2 py-1.5 ${
                        viewMode === "list"
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => setViewMode("list")}
                      aria-label="Xem dạng danh sách"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="dark:text-gray-300"
                      >
                        <path
                          d="M3 5H21M3 12H21M3 19H21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <a
                      href="#"
                      key={job.id}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                      onClick={(e) => openJobModal(job, e)}
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={job.logo || "/placeholder.svg"}
                                alt={job.company}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg dark:text-white">
                                {job.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {job.company} • {job.location}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => toggleSaveJob(job.id, e)}
                            className="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
                            aria-label="Lưu việc làm"
                          >
                            {savedJobs.includes(job.id) ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>
                        </div>

                        {job.match && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Phù hợp với hồ sơ của bạn
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                            {job.jobType === "Fulltime"
                              ? "Toàn thời gian"
                              : job.jobType}
                          </span>
                          <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                            {job.workType === "Remote"
                              ? "Từ xa"
                              : job.workType === "Onsite"
                              ? "Tại văn phòng"
                              : "Kết hợp"}
                          </span>
                          <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                            {job.experience}
                          </span>
                        </div>

                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {job.postedTime === "2 days ago"
                              ? "2 ngày trước"
                              : job.postedTime === "an hour ago"
                              ? "1 giờ trước"
                              : job.postedTime}{" "}
                            • {job.applicants} ứng viên
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-lg text-blue-500">
                            {job.salary}
                          </div>
                          <button className="py-2 px-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                            Ứng tuyển ngay
                          </button>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <a
                      href="#"
                      key={job.id}
                      className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
                      onClick={(e) => openJobModal(job, e)}
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={job.logo || "/placeholder.svg"}
                              alt={job.company}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg dark:text-white">
                              {job.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {job.company} • {job.location}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                {job.jobType === "Fulltime"
                                  ? "Toàn thời gian"
                                  : job.jobType}
                              </span>
                              <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                {job.workType === "Remote"
                                  ? "Từ xa"
                                  : job.workType === "Onsite"
                                  ? "Tại văn phòng"
                                  : "Kết hợp"}
                              </span>
                              <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                {job.experience}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <button
                            onClick={(e) => toggleSaveJob(job.id, e)}
                            className="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 mb-2"
                            aria-label="Lưu việc làm"
                          >
                            {savedJobs.includes(job.id) ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>
                          <div className="font-semibold text-lg text-blue-500">
                            {job.salary}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {job.postedTime === "2 days ago"
                              ? "2 ngày trước"
                              : job.postedTime === "an hour ago"
                              ? "1 giờ trước"
                              : job.postedTime}{" "}
                            • {job.applicants} ứng viên
                          </span>
                        </div>

                        <button className="py-1.5 px-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                          Ứng tuyển ngay
                        </button>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filter Sidebar */}
          <div className="md:w-64 bg-white dark:bg-gray-800 shadow-sm p-6 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Bộ lọc
              </h3>
              <button className="text-blue-500 text-sm">Xóa tất cả</button>
            </div>

            {/* Job Type */}
            <div className="mb-6 border-b dark:border-gray-700 pb-6">
              <div
                className="flex justify-between items-center mb-4 cursor-pointer"
                onClick={() => toggleSection("jobType")}
              >
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Loại công việc
                </h4>
                {expandedSections.jobType ? (
                  <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
              </div>

              {expandedSections.jobType && (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="contract"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="contract"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Hợp đồng
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="full-time"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      defaultChecked
                    />
                    <label
                      htmlFor="full-time"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Toàn thời gian
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="part-time"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="part-time"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Bán thời gian
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="internship"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="internship"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Thực tập
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Open to remote */}
            <div className="mb-6 border-b dark:border-gray-700 pb-6">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Chấp nhận làm từ xa
                </h4>
                <button
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    isRemoteOpen
                      ? "bg-blue-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => setIsRemoteOpen(!isRemoteOpen)}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      isRemoteOpen ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Range Salary */}
            <div className="mb-6 border-b dark:border-gray-700 pb-6">
              <div
                className="flex justify-between items-center mb-4 cursor-pointer"
                onClick={() => toggleSection("rangeSalary")}
              >
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Mức lương
                </h4>
                {expandedSections.rangeSalary ? (
                  <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
              </div>

              {expandedSections.rangeSalary && (
                <>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <input
                        id="less-than-1000"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="less-than-1000"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Dưới 1.000$
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="1000-15000"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="1000-15000"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        1.000$ - 15.000$
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="more-than-15000"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="more-than-15000"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Trên 15.000$
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="custom"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                        defaultChecked
                      />
                      <label
                        htmlFor="custom"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Tùy chỉnh
                      </label>
                    </div>
                  </div>

                  {/* Salary Range Slider */}
                  <div className="mt-6">
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="absolute h-2 bg-blue-500 rounded-full left-[10%] right-[30%]"></div>
                      <div className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 left-[10%]"></div>
                      <div className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 right-[30%]"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        1.000$
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        25.000$
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Experience */}
            <div className="mb-6">
              <div
                className="flex justify-between items-center mb-4 cursor-pointer"
                onClick={() => toggleSection("experience")}
              >
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Kinh nghiệm
                </h4>
                {expandedSections.experience ? (
                  <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
              </div>

              {expandedSections.experience && (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="less-than-year"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="less-than-year"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Dưới 1 năm
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="1-3-years"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      defaultChecked
                    />
                    <label
                      htmlFor="1-3-years"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      1-3 năm
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="3-5-years"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="3-5-years"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      3-5 năm
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="5-10-years"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="5-10-years"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      5-10 năm
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12 dark:text-gray-300">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <span className="bg-orange-500 px-2 py-1 rounded font-bold text-white">
                  Viec
                </span>
                <span className="font-bold text-lg text-white">Tot</span>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Việc Tốt là nền tảng tìm việc hàng đầu kết nối nhà tuyển dụng
                với nhân tài. Tìm công việc mơ ước của bạn ngay hôm nay.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Chuyên gia công nghệ</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#">Kỹ sư phần mềm</Link>
                </li>
                <li>
                  <Link href="#">Nhà khoa học dữ liệu</Link>
                </li>
                <li>
                  <Link href="#">Nhà thiết kế UX/UI</Link>
                </li>
                <li>
                  <Link href="#">Quản lý sản phẩm</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Nhà tuyển dụng</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#">Đăng tin tuyển dụng</Link>
                </li>
                <li>
                  <Link href="#">Tìm ứng viên</Link>
                </li>
                <li>
                  <Link href="#">Bảng giá</Link>
                </li>
                <li>
                  <Link href="#">Giải pháp doanh nghiệp</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Thông tin công ty</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#">Về chúng tôi</Link>
                </li>
                <li>
                  <Link href="#">Tuyển dụng</Link>
                </li>
                <li>
                  <Link href="#">Báo chí</Link>
                </li>
                <li>
                  <Link href="#">Liên hệ</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tài nguyên</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">Trung tâm trợ giúp</Link>
                </li>
                <li>
                  <Link href="#">Câu hỏi thường gặp</Link>
                </li>
                <li>
                  <Link href="#">Chính sách bảo mật</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Bản quyền © 2023 Việc Tốt. Tất cả các quyền được bảo lưu. Việc Tốt
              là thương hiệu của Công ty Việc Tốt.
            </p>
          </div>
        </div>
      </footer>
      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={{
            ...selectedJob,
            title: selectedJob.title,
            company: selectedJob.company,
            location: selectedJob.location,
            jobType:
              selectedJob.jobType === "Fulltime"
                ? "Toàn thời gian"
                : selectedJob.jobType,
            workType:
              selectedJob.workType === "Remote"
                ? "Từ xa"
                : selectedJob.workType === "Onsite"
                ? "Tại văn phòng"
                : "Kết hợp",
            experience: selectedJob.experience,
            postedTime:
              selectedJob.postedTime === "2 days ago"
                ? "2 ngày trước"
                : selectedJob.postedTime === "an hour ago"
                ? "1 giờ trước"
                : selectedJob.postedTime,
            applicants: selectedJob.applicants,
            salary: selectedJob.salary,
            description: selectedJob.description,
            benefits: selectedJob.benefits.map((benefit: any) => {
              if (benefit === "Competitive salary and benefits package")
                return "Mức lương và phúc lợi cạnh tranh";
              if (benefit === "Flexible working hours")
                return "Giờ làm việc linh hoạt";
              if (benefit === "Remote work options")
                return "Tùy chọn làm việc từ xa";
              if (benefit === "Professional development opportunities")
                return "Cơ hội phát triển chuyên môn";
              if (
                benefit === "Opportunity to work on a product used by millions"
              )
                return "Cơ hội làm việc với sản phẩm được hàng triệu người sử dụng";
              if (benefit === "Career growth and development opportunities")
                return "Cơ hội phát triển sự nghiệp";
              if (benefit === "Collaborative and innovative work environment")
                return "Môi trường làm việc hợp tác và sáng tạo";
              if (benefit === "Health insurance") return "Bảo hiểm y tế";
              if (benefit === "Professional development budget")
                return "Ngân sách phát triển chuyên môn";
              if (benefit === "Modern office with great amenities")
                return "Văn phòng hiện đại với tiện nghi tuyệt vời";
              if (benefit === "Leadership opportunities")
                return "Cơ hội lãnh đạo";
              return benefit;
            }),
          }}
          isOpen={isModalOpen}
          onClose={closeJobModal}
          similarJobs={getSimilarJobs(selectedJob).map((job) => ({
            ...job,
            title: job.title,
            company: job.company,
            location: job.location,
            jobType:
              job.jobType === "Fulltime" ? "Toàn thời gian" : job.jobType,
            workType:
              job.workType === "Remote"
                ? "Từ xa"
                : job.workType === "Onsite"
                ? "Tại văn phòng"
                : "Kết hợp",
            experience: job.experience,
            postedTime:
              job.postedTime === "2 days ago"
                ? "2 ngày trước"
                : job.postedTime === "an hour ago"
                ? "1 giờ trước"
                : job.postedTime,
          }))}
          otherJobsFromCompany={getOtherJobsFromCompany(selectedJob).map(
            (job) => ({
              ...job,
              title: job.title,
              company: job.company,
              location: job.location,
              jobType:
                job.jobType === "Fulltime" ? "Toàn thời gian" : job.jobType,
              workType:
                job.workType === "Remote"
                  ? "Từ xa"
                  : job.workType === "Onsite"
                  ? "Tại văn phòng"
                  : "Kết hợp",
              experience: job.experience,
              postedTime:
                job.postedTime === "2 days ago"
                  ? "2 ngày trước"
                  : job.postedTime === "an hour ago"
                  ? "1 giờ trước"
                  : job.postedTime,
            })
          )}
          savedJobs={savedJobs}
          onToggleSave={toggleSaveJob}
        />
      )}
    </div>
  );
}
