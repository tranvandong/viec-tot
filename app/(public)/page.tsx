"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Search,
  Code,
  PenTool,
  ShoppingBag,
  Headphones,
  Building2,
  Zap,
  UserPlus,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ChevronDown,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SelectIcon,
  SelectPortal,
  SelectViewport,
} from "@radix-ui/react-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export default function Home() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(
      `/find-jobs?job=${encodeURIComponent(
        jobTitle
      )}&location=${encodeURIComponent(location)}`
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}

      {/* Mobile Menu */}
      {/* {mobileMenuOpen && (
          <div className="md:hidden bg-blue-900 py-4 px-4 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium text-white py-2 px-3 rounded hover:bg-blue-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                href="/find-jobs"
                className="text-sm font-medium text-white py-2 px-3 rounded hover:bg-blue-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tìm việc
              </Link>
              <Link
                href="/companies"
                className="text-sm font-medium text-white py-2 px-3 rounded hover:bg-blue-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Công ty
              </Link>
              <Link
                href="/service"
                className="text-sm font-medium text-white py-2 px-3 rounded hover:bg-blue-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dịch vụ
              </Link>
              <div className="py-2 px-3">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )} */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-blue-950 dark:bg-gray-900 text-white pt-8 pb-24">
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
              Hơn 5 triệu việc làm để bạn khám phá. Hãy tìm kiếm ngay để tìm
              công việc tiếp theo của bạn
            </p>

            <form
              onSubmit={handleSearch}
              className="bg-white dark:bg-gray-800 rounded-full p-2 flex items-center gap-2 mb-4 max-w-3xl mx-auto text-gray-800 dark:text-gray-200"
            >
              <div className="flex items-center flex-1 pl-2">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  className="py-2 px-3 block w-full border-0 bg-transparent dark:text-white focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Chức danh, từ khóa hoặc công ty"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-800"></div>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="py-2 px-3 flex items-center justify-between w-full border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-0 cursor-pointer"
                      aria-expanded="false"
                    >
                      {location ? location : "Tất cả địa điểm"}
                      <ChevronDown className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[200px]">
                    <Command>
                      <CommandInput
                        placeholder="Tìm địa điểm..."
                        className="h-9"
                      />
                      <CommandEmpty>Không tìm thấy địa điểm</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="all"
                          onSelect={() => setLocation("")}
                        >
                          Tất cả địa điểm
                        </CommandItem>
                        <CommandItem
                          value="hanoi"
                          onSelect={() => setLocation("Hà Nội")}
                        >
                          Hà Nội
                        </CommandItem>
                        <CommandItem
                          value="hochiminh"
                          onSelect={() => setLocation("Hồ Chí Minh")}
                        >
                          Hồ Chí Minh
                        </CommandItem>
                        <CommandItem
                          value="danang"
                          onSelect={() => setLocation("Đà Nẵng")}
                        >
                          Đà Nẵng
                        </CommandItem>
                        <CommandItem
                          value="haiphong"
                          onSelect={() => setLocation("Hải Phòng")}
                        >
                          Hải Phòng
                        </CommandItem>
                        <CommandItem
                          value="cantho"
                          onSelect={() => setLocation("Cần Thơ")}
                        >
                          Cần Thơ
                        </CommandItem>
                        <CommandItem
                          value="binhduong"
                          onSelect={() => setLocation("Bình Dương")}
                        >
                          Bình Dương
                        </CommandItem>
                        <CommandItem
                          value="dongnai"
                          onSelect={() => setLocation("Đồng Nai")}
                        >
                          Đồng Nai
                        </CommandItem>
                        <CommandItem
                          value="remote"
                          onSelect={() => setLocation("Từ xa")}
                        >
                          Từ xa
                        </CommandItem>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <button
                type="submit"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                Tìm kiếm
              </button>
            </form>

            <div className="text-sm text-blue-200 mb-12">
              <span>Tải lên hoặc </span>
              <Link href="#" className="underline">
                tạo hồ sơ
              </Link>
              <span> để dễ dàng ứng tuyển việc làm.</span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  Từ xa
                </span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  Tập đoàn
                </span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  Kinh doanh
                </span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  Quản lý dự án
                </span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <Code className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  Lập trình
                </span>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mt-4">
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  Dữ liệu
                </span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  Thực tập
                </span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  Phân tích
                </span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 backdrop-blur-sm rounded-full py-2 px-3 flex items-center gap-2 transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full bg-[#E3FCF1] flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  Khác
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 dark:bg-gray-950">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Giúp tìm việc dễ dàng hơn
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Chúng tôi đã xây dựng các tính năng giúp bạn tùy chỉnh tìm kiếm vị
              trí lý tưởng, giúp việc tìm việc trở nên dễ dàng hơn.
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Đăng ký người dùng</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tạo tài khoản để bắt đầu hành trình tìm việc của bạn.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">
                  Gợi ý việc làm cá nhân hóa
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Nhận các gợi ý việc làm phù hợp dựa trên kỹ năng và sở thích
                  của bạn.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Tìm kiếm việc làm</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tìm công việc phù hợp với kỹ năng dan mục tiêu nghề nghiệp của
                  bạn.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Thông báo việc làm</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Nhận thông báo về các cơ hội việc làm mới phù hợp với sở thích
                  của bạn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Job Recommendation */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Gợi ý việc làm cá nhân
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Hệ thống AI của chúng tôi phân tích kỹ năng và sở thích của
                  bạn để gợi ý những công việc phù hợp nhất.
                </p>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Thiết lập dễ dàng</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Chỉ cần tạo tài khoản, điền thông tin hồ sơ, và chúng tôi
                      sẽ gợi ý việc làm dựa trên kỹ năng của bạn.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Kết quả cá nhân hóa</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Gợi ý của chúng tôi ngày càng tốt hơn khi bạn tương tác
                      với các công việc.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">Dữ liệu cá nhân</h3>
                  <button
                    type="button"
                    className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Chỉnh sửa hồ sơ
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="h-12 bg-gray-100 rounded w-full"></div>
                  <div className="h-12 bg-gray-100 rounded w-full"></div>
                  <div className="h-12 bg-gray-100 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16 dark:bg-gray-950">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Nhiều cơ hội nghề nghiệp
              <br />
              đang chờ đón bạn
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Các công ty phát triển nhanh nhất tin tưởng Việc Tốt để tìm kiếm
              nhân tài. Khám phá các cơ hội độc quyền mà bạn không thể tìm thấy
              ở nơi khác.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Job Card 1 */}
              <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-black rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Quản lý sản phẩm</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Apple Design
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Toàn thời gian
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Chúng tôi đang tìm kiếm một quản lý sản phẩm tài năng để
                        tham gia vào đội ngũ và giúp chúng tôi xây dựng các sản
                        phẩm tuyệt vời.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">5.5 triệu/tháng</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Hà Nội
                          </div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Ứng tuyển
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 2 */}
              <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-red-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Lập trình viên PDF</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Brand Design
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Từ xa
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Tham gia đội ngũ của chúng tôi để phát triển các giải
                        pháp PDF sáng tạo cho khách hàng toàn cầu.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">100.000đ/giờ</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Từ xa
                          </div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Ứng tuyển
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 3 */}
              <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Kỹ sư phần mềm</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Phân tích dữ liệu
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Toàn thời gian
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Đang tìm kiếm kỹ sư phần mềm để tham gia vào đội ngũ
                        đang phát triển và xây dựng các sản phẩm tuyệt vời.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">7 triệu/tháng</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Hồ Chí Minh
                          </div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Ứng tuyển
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 4 */}
              <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Kỹ sư phần mềm</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Acme Tech
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Từ xa
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Tham gia đội ngũ kỹ thuật của chúng tôi để xây dựng các
                        giải pháp phần mềm có khả năng mở rộng và mạnh mẽ.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">8.5 triệu/tháng</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Từ xa
                          </div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Ứng tuyển
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 5 */}
              <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-red-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Nhà thiết kế UX/UI</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Creative Tech
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Hợp đồng
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Chúng tôi đang tìm kiếm một nhà thiết kế UX/UI tài năng
                        để tạo ra các giao diện đẹp và chức năng.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">7.5 triệu/tháng</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Hà Nội
                          </div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Ứng tuyển
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Card 6 */}
              <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Lập trình viên</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Tech Solutions
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          Toàn thời gian
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Tham gia đội ngũ của chúng tôi để phát triển các giải
                        pháp phần mềm sáng tạo cho khách hàng.
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">6 triệu/tháng</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Đà Nẵng
                          </div>
                        </div>
                        <button
                          type="button"
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Ứng tuyển
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                Xem tất cả việc làm
              </button>
            </div>
          </div>
        </section>

        {/* Featured Companies */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Công ty nổi bật
              <br />
              đang tuyển dụng
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Các công ty phát triển nhanh nhất tin tưởng Việc Tốt để tìm kiếm
              nhân tài. Tham gia ngay để khám phá các cơ hội.
            </p>

            <div className="relative">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Company Card 1 */}
                <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                        ABC
                      </div>
                      <div>
                        <h3 className="font-semibold">ABC Corporation</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Công nghệ
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Công ty công nghệ hàng đầu chuyên về các giải pháp phần
                      mềm sáng tạo cho doanh nghiệp.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Toàn thời gian
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Từ xa
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Thiết kế
                      </span>
                    </div>
                    <button
                      type="button"
                      className="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Xem việc làm
                    </button>
                  </div>
                </div>

                {/* Company Card 2 */}
                <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                        GH
                      </div>
                      <div>
                        <h3 className="font-semibold">GreenHub</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Phát triển bền vững
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Công ty tập trung vào phát triển bền vững, làm việc với
                      các giải pháp năng lượng xanh và sáng kiến môi trường.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Bán thời gian
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Tại văn phòng
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Kỹ thuật
                      </span>
                    </div>
                    <button
                      type="button"
                      className="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Xem việc làm
                    </button>
                  </div>
                </div>

                {/* Company Card 3 */}
                <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        FM
                      </div>
                      <div>
                        <h3 className="font-semibold">Fast Metro Company</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Vận tải
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Cách mạng hóa giao thông đô thị với các giải pháp di
                      chuyển và dịch vụ sáng tạo.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Hợp đồng
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Hybrid
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        Marketing
                      </span>
                    </div>
                    <button
                      type="button"
                      className="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Xem việc làm
                    </button>
                  </div>
                </div>
              </div>

              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 dark:bg-gray-950">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">
                Tìm kiếm thông tin và
                <br />
                Mẹo trong Blog của chúng tôi
              </h2>
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                Đọc thêm bài viết
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative">
              {/* Blog Card 1 */}
              <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Bài viết blog"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">
                    Kỹ năng viết và CV của bạn: Mẹo &
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Học cách thể hiện kỹ năng viết của bạn một cách hiệu quả
                    trên CV để nổi bật với nhà tuyển dụng.
                  </p>
                  <Link href="#" className="text-sm font-medium text-blue-600">
                    Đọc thêm
                  </Link>
                </div>
              </div>

              {/* Blog Card 2 */}
              <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Bài viết blog"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">
                    Tìm kiếm sự hài lòng và cân bằng công việc-cuộc sống
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Khám phá các chiến lược để đạt được sự cân bằng công
                    việc-cuộc sống lành mạnh và tìm thấy sự hài lòng trong sự
                    nghiệp của bạn.
                  </p>
                  <Link href="#" className="text-sm font-medium text-blue-600">
                    Đọc thêm
                  </Link>
                </div>
              </div>

              {/* Blog Card 3 */}
              <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Bài viết blog"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">
                    Tầm quan trọng của kỹ năng mềm trong công việc
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Tìm hiểu tại sao kỹ năng mềm ngày càng được các nhà tuyển
                    dụng đánh giá cao và cách phát triển chúng để thành công
                    trong sự nghiệp.
                  </p>
                  <Link href="#" className="text-sm font-medium text-blue-600">
                    Đọc thêm
                  </Link>
                </div>
              </div>

              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Popular Roles Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Người xem danh sách việc làm"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Khám phá việc làm trong
                  <br />
                  các vai trò phổ biến
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Khám phá cơ hội trong nhiều ngành nghề khác nhau và tìm vai
                  trò phù hợp với kỹ năng và nguyện vọng nghề nghiệp của bạn.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Code className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Lập trình viên</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <PenTool className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Thiết kế</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Marketing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Tài chính</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Headphones className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Chăm sóc khách hàng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Nhân sự & Tuyển dụng</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-950 dark:bg-gray-900 text-white">
          <div className="container text-center mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold mb-4">
              Trải nghiệm tìm việc
              <br />
              không giống ai
            </h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              Chúng tôi đã làm cho việc tìm việc trở nên dễ dàng hơn bao giờ
              hết. Tạo hồ sơ của bạn và bắt đầu ứng tuyển việc làm ngay hôm nay.
            </p>
            <div className="flex justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                className="py-2 px-3 block w-full bg-blue-900 border border-blue-800 text-white placeholder:text-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập địa chỉ email của bạn"
              />
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white whitespace-nowrap hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                Bắt đầu
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
