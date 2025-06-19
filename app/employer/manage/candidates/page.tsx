"use client";

import { useState } from "react";
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
import { useList } from "@/hooks/useDataProvider";

// Sample candidate data
const candidatesData = [
  {
    id: 1,
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
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "/placeholder.svg?height=100&width=100",
    jobTitle: "Product Designer",
    company: "Traveloka",
    location: "Hồ Chí Minh, Việt Nam",
    matchScore: 88,
    experience: "2-4 năm",
    education: "Thạc sĩ",
    jobType: "Toàn thời gian",
    workMode: "Tại văn phòng",
    appliedDate: "1 giờ trước",
    applicants: 140,
    salary: "1500$/tháng",
    skills: [
      "Product Design",
      "UI Design",
      "UX Research",
      "Design Systems",
      "Figma",
      "Adobe Creative Suite",
    ],
    languages: [
      { language: "Tiếng Việt", level: "Bản ngữ" },
      { language: "Tiếng Anh", level: "Thành thạo" },
    ],
    email: "tranthib@example.com",
    phone: "+84 987 654 321",
    birthDate: "20/08/1993",
    gender: "Nữ",
    desiredPosition: "Senior Product Designer",
    expectedSalary: "$1,500 - $2,000/tháng",
    availability: "Có thể bắt đầu sau 2 tuần",
    summary:
      "Tôi là một Product Designer với hơn 4 năm kinh nghiệm trong việc thiết kế sản phẩm số. Tôi có kinh nghiệm làm việc trong các công ty công nghệ lớn và đã tham gia vào quá trình thiết kế nhiều sản phẩm thành công.",
    experiences: [
      {
        title: "Product Designer",
        company: "Traveloka",
        location: "Hồ Chí Minh",
        period: "03/2020 - Hiện tại",
        description:
          "Thiết kế và phát triển các tính năng mới cho ứng dụng di động và web. Thực hiện nghiên cứu người dùng và phân tích dữ liệu để cải thiện trải nghiệm người dùng.",
      },
      {
        title: "UI Designer",
        company: "FPT Software",
        location: "Hồ Chí Minh",
        period: "07/2018 - 02/2020",
        description:
          "Thiết kế giao diện người dùng cho các ứng dụng web và di động. Làm việc trong một nhóm Agile để phát triển các sản phẩm phần mềm.",
      },
    ],
    education: [
      {
        degree: "Thạc sĩ Thiết kế Tương tác",
        institution: "Đại học RMIT",
        location: "Hồ Chí Minh",
        period: "2016 - 2018",
        description:
          "Chuyên ngành Thiết kế Tương tác với luận văn về Trải nghiệm người dùng trong ứng dụng di động",
      },
      {
        degree: "Cử nhân Thiết kế Đồ họa",
        institution: "Đại học Kiến trúc TP.HCM",
        location: "Hồ Chí Minh",
        period: "2012 - 2016",
        description: "",
      },
    ],
    certifications: [
      {
        name: "Certified Professional in User Experience (CPUX)",
        issuer: "UXQB",
        date: "2021",
      },
    ],
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "/placeholder.svg?height=100&width=100",
    jobTitle: "UX Designer",
    company: "Tokopedia",
    location: "Đà Nẵng, Việt Nam",
    matchScore: 82,
    experience: "2-4 năm",
    education: "Đại học",
    jobType: "Toàn thời gian",
    workMode: "Từ xa",
    appliedDate: "2 ngày trước",
    applicants: 140,
    salary: "1000$/tháng",
    skills: [
      "UX Research",
      "Wireframing",
      "Prototyping",
      "User Testing",
      "Figma",
      "Adobe XD",
    ],
    languages: [
      { language: "Tiếng Việt", level: "Bản ngữ" },
      { language: "Tiếng Anh", level: "Khá" },
    ],
    email: "levanc@example.com",
    phone: "+84 123 789 456",
    birthDate: "10/12/1994",
    gender: "Nam",
    desiredPosition: "Senior UX Designer",
    expectedSalary: "$1,000 - $1,300/tháng",
    availability: "Có thể bắt đầu sau 1 tháng",
    summary:
      "Tôi là một UX Designer với kinh nghiệm chuyên sâu về nghiên cứu người dùng và thiết kế tương tác. Tôi đam mê tạo ra các sản phẩm số dễ sử dụng và giải quyết các vấn đề thực tế của người dùng.",
    experiences: [
      {
        title: "UX Designer",
        company: "Tokopedia",
        location: "Đà Nẵng (Từ xa)",
        period: "05/2021 - Hiện tại",
        description:
          "Thực hiện nghiên cứu người dùng, tạo personas, user flows và wireframes. Thiết kế và thử nghiệm các prototype để đảm bảo trải nghiệm người dùng tốt nhất.",
      },
      {
        title: "UI/UX Designer",
        company: "Zalo",
        location: "Hồ Chí Minh",
        period: "08/2019 - 04/2021",
        description:
          "Thiết kế giao diện người dùng và trải nghiệm người dùng cho ứng dụng nhắn tin và mạng xã hội. Thực hiện A/B testing và phân tích dữ liệu để cải thiện trải nghiệm người dùng.",
      },
    ],
    education: [
      {
        degree: "Cử nhân Công nghệ Thông tin",
        institution: "Đại học Đà Nẵng",
        location: "Đà Nẵng",
        period: "2014 - 2018",
        description:
          "Chuyên ngành Phát triển phần mềm với các khóa học về Thiết kế giao diện người dùng",
      },
    ],
    certifications: [
      {
        name: "UX Design Certificate",
        issuer: "Interaction Design Foundation",
        date: "2020",
      },
      {
        name: "Human-Computer Interaction",
        issuer: "Coursera",
        date: "2019",
      },
    ],
  },
  {
    id: 4,
    name: "Phạm Thị D",
    avatar: "/placeholder.svg?height=100&width=100",
    jobTitle: "UI Designer",
    company: "Gojek",
    location: "Hà Nội, Việt Nam",
    matchScore: 75,
    experience: "0-2 năm",
    education: "Đại học",
    jobType: "Toàn thời gian",
    workMode: "Tại văn phòng",
    appliedDate: "2 ngày trước",
    applicants: 521,
    salary: "",
    skills: [
      "UI Design",
      "Visual Design",
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Design Systems",
    ],
    languages: [
      { language: "Tiếng Việt", level: "Bản ngữ" },
      { language: "Tiếng Anh", level: "Trung cấp" },
    ],
    email: "phamthid@example.com",
    phone: "+84 456 789 123",
    birthDate: "25/03/1998",
    gender: "Nữ",
    desiredPosition: "UI Designer",
    expectedSalary: "$800 - $1,000/tháng",
    availability: "Có thể bắt đầu ngay",
    summary:
      "Tôi là một UI Designer mới vào nghề với niềm đam mê tạo ra các giao diện đẹp mắt và dễ sử dụng. Tôi có kỹ năng tốt trong thiết kế đồ họa và đang phát triển kiến thức về trải nghiệm người dùng.",
    experiences: [
      {
        title: "UI Designer",
        company: "Gojek",
        location: "Hà Nội",
        period: "09/2022 - Hiện tại",
        description:
          "Thiết kế giao diện người dùng cho ứng dụng di động. Làm việc với nhóm phát triển để triển khai các thiết kế.",
      },
      {
        title: "Thực tập sinh Thiết kế",
        company: "VNG Corporation",
        location: "Hồ Chí Minh",
        period: "03/2022 - 08/2022",
        description:
          "Hỗ trợ nhóm thiết kế trong việc tạo ra các tài liệu marketing và thiết kế giao diện người dùng.",
      },
    ],
    education: [
      {
        degree: "Cử nhân Thiết kế Đồ họa",
        institution: "Đại học FPT",
        location: "Hà Nội",
        period: "2018 - 2022",
        description:
          "Chuyên ngành Thiết kế Đồ họa với các dự án về thiết kế giao diện người dùng",
      },
    ],
    certifications: [
      {
        name: "UI Design Fundamentals",
        issuer: "Udemy",
        date: "2021",
      },
    ],
  },
  {
    id: 5,
    name: "Hoàng Minh E",
    avatar: "/placeholder.svg?height=100&width=100",
    jobTitle: "Sr. UI/UX Designer",
    company: "Shopee",
    location: "Hồ Chí Minh, Việt Nam",
    matchScore: 90,
    experience: "3-5 năm",
    education: "Thạc sĩ",
    jobType: "Toàn thời gian",
    workMode: "Kết hợp",
    appliedDate: "2 ngày trước",
    applicants: 140,
    salary: "",
    skills: [
      "UI Design",
      "UX Design",
      "Design Systems",
      "Design Thinking",
      "Figma",
      "Adobe Creative Suite",
      "Prototyping",
    ],
    languages: [
      { language: "Tiếng Việt", level: "Bản ngữ" },
      { language: "Tiếng Anh", level: "Thành thạo" },
      { language: "Tiếng Trung", level: "Cơ bản" },
    ],
    email: "hoangminhe@example.com",
    phone: "+84 789 123 456",
    birthDate: "05/07/1992",
    gender: "Nam",
    desiredPosition: "Lead UI/UX Designer",
    expectedSalary: "$2,000 - $2,500/tháng",
    availability: "Có thể bắt đầu sau 1 tháng",
    summary:
      "Tôi là một UI/UX Designer cấp cao với hơn 5 năm kinh nghiệm trong việc thiết kế sản phẩm số. Tôi đã dẫn dắt nhiều dự án thiết kế và có kinh nghiệm xây dựng hệ thống thiết kế cho các sản phẩm quy mô lớn.",
    experiences: [
      {
        title: "Senior UI/UX Designer",
        company: "Shopee",
        location: "Hồ Chí Minh",
        period: "07/2020 - Hiện tại",
        description:
          "Dẫn dắt nhóm thiết kế trong việc tạo ra trải nghiệm người dùng cho ứng dụng thương mại điện tử. Xây dựng và duy trì hệ thống thiết kế. Cộng tác với các nhóm sản phẩm và kỹ thuật để triển khai các tính năng mới.",
      },
      {
        title: "UI/UX Designer",
        company: "Grab",
        location: "Singapore",
        period: "01/2018 - 06/2020",
        description:
          "Thiết kế giao diện người dùng và trải nghiệm người dùng cho ứng dụng di động. Thực hiện nghiên cứu người dùng và tạo các prototype để kiểm tra trải nghiệm người dùng.",
      },
      {
        title: "UI Designer",
        company: "VNG Corporation",
        location: "Hồ Chí Minh",
        period: "06/2016 - 12/2017",
        description:
          "Thiết kế giao diện người dùng cho các ứng dụng web và di động. Làm việc trong một nhóm Agile để phát triển các sản phẩm phần mềm.",
      },
    ],
    education: [
      {
        degree: "Thạc sĩ Thiết kế Tương tác",
        institution: "Đại học Công nghệ Nanyang",
        location: "Singapore",
        period: "2014 - 2016",
        description:
          "Chuyên ngành Thiết kế Tương tác với luận văn về Trải nghiệm người dùng trong ứng dụng di động",
      },
      {
        degree: "Cử nhân Thiết kế Đồ họa",
        institution: "Đại học RMIT",
        location: "Hồ Chí Minh",
        period: "2010 - 2014",
        description: "",
      },
    ],
    certifications: [
      {
        name: "Certified User Experience Professional",
        issuer: "Nielsen Norman Group",
        date: "2019",
      },
      {
        name: "Design Thinking Certification",
        issuer: "IDEO",
        date: "2018",
      },
    ],
  },
  {
    id: 6,
    name: "Ngô Thị F",
    avatar: "/placeholder.svg?height=100&width=100",
    jobTitle: "Interaction Designer",
    company: "GoPay",
    location: "Hà Nội, Việt Nam",
    matchScore: 85,
    experience: "2-4 năm",
    education: "Đại học",
    jobType: "Toàn thời gian",
    workMode: "Tại văn phòng",
    appliedDate: "3 ngày trước",
    applicants: 98,
    salary: "",
    skills: [
      "Interaction Design",
      "Motion Design",
      "Prototyping",
      "User Testing",
      "Figma",
      "Principle",
      "After Effects",
    ],
    languages: [
      { language: "Tiếng Việt", level: "Bản ngữ" },
      { language: "Tiếng Anh", level: "Khá" },
    ],
    email: "ngothif@example.com",
    phone: "+84 234 567 890",
    birthDate: "15/11/1996",
    gender: "Nữ",
    desiredPosition: "Senior Interaction Designer",
    expectedSalary: "$1,200 - $1,500/tháng",
    availability: "Có thể bắt đầu sau 2 tuần",
    summary:
      "Tôi là một Interaction Designer với kinh nghiệm chuyên sâu về thiết kế tương tác và chuyển động. Tôi đam mê tạo ra các trải nghiệm người dùng mượt mà và trực quan thông qua animation và micro-interactions.",
    experiences: [
      {
        title: "Interaction Designer",
        company: "GoPay",
        location: "Hà Nội",
        period: "04/2021 - Hiện tại",
        description:
          "Thiết kế các tương tác và chuyển động cho ứng dụng thanh toán di động. Tạo các prototype có độ chân thực cao để minh họa các tương tác phức tạp.",
      },
      {
        title: "UI/UX Designer",
        company: "MoMo",
        location: "Hồ Chí Minh",
        period: "09/2019 - 03/2021",
        description:
          "Thiết kế giao diện người dùng và trải nghiệm người dùng cho ứng dụng ví điện tử. Tạo các animation và micro-interactions để cải thiện trải nghiệm người dùng.",
      },
    ],
    education: [
      {
        degree: "Cử nhân Thiết kế Đa phương tiện",
        institution: "Đại học FPT",
        location: "Hà Nội",
        period: "2015 - 2019",
        description:
          "Chuyên ngành Thiết kế Đa phương tiện với các dự án về thiết kế tương tác và animation",
      },
    ],
    certifications: [
      {
        name: "Motion Design for UI",
        issuer: "School of Motion",
        date: "2020",
      },
      {
        name: "Advanced Prototyping with Principle",
        issuer: "DesignLab",
        date: "2019",
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
  const { data } = useList({
    resource: "Applicants",
    meta: { config: { subSystem: "buss", auth: "allow" } },
  });
  console.log(data);

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
                          <h3 className="font-medium">{candidate.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {candidate.jobTitle}
                          </p>
                        </div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded px-2 py-1">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          {candidate.matchScore}% Match
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
