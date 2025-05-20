import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import QueryProvider from "@/providers/queryProvider";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText } from "lucide-react";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "JobWise - Find Your Dream Job",
  description:
    "Find your dream job with JobWise, the #1 job searching platform",
  generator: "v0.dev",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock data for the candidate profile
  const profile = {
    name: "Đồng Trần",
    title: "Senior Frontend Developer",
    location: "Hồ Chí Minh",
    email: "dongtran@example.com",
    phone: "+84 123 456 789",
    birthday: "1990-01-01",
    about:
      "Tôi là một lập trình viên Frontend với hơn 5 năm kinh nghiệm làm việc với React, Next.js và TypeScript. Tôi đam mê xây dựng giao diện người dùng đẹp mắt và trải nghiệm người dùng tuyệt vời.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Redux",
      "GraphQL",
    ],
    languages: ["Tiếng Việt (Bản địa)", "Tiếng Anh (Thành thạo)"],
    experiences: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "Tech Solutions",
        location: "Hồ Chí Minh",
        from: "2020-01",
        to: "Hiện tại",
        current: true,
        description:
          "Phát triển và duy trì các ứng dụng web sử dụng React và Next.js. Làm việc trong một nhóm Agile để cung cấp các tính năng mới và cải thiện hiệu suất.",
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "Digital Agency",
        location: "Hồ Chí Minh",
        from: "2018-03",
        to: "2019-12",
        current: false,
        description:
          "Xây dựng giao diện người dùng cho các trang web thương mại điện tử và ứng dụng web. Cộng tác với các nhà thiết kế và nhà phát triển backend.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Cử nhân Khoa học Máy tính",
        institution: "Đại học Khoa học Tự nhiên",
        location: "Hồ Chí Minh",
        from: "2014",
        to: "2018",
        description: "Chuyên ngành Phát triển phần mềm. Tốt nghiệp loại Giỏi.",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2021-06",
        expires: "2024-06",
        description: "Chứng chỉ phát triển ứng dụng trên nền tảng AWS.",
      },
    ],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        role: "Frontend Lead",
        from: "2020-06",
        to: "2021-03",
        description:
          "Xây dựng nền tảng thương mại điện tử sử dụng Next.js và GraphQL. Triển khai thanh toán, giỏ hàng và tìm kiếm sản phẩm.",
      },
    ],
  };
  return (
    <>
      {/* <header className={`bg-blue-950 text-white sticky top-0 z-50 py-4`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={"/logo.png"}
                width={120}
                height={60}
                alt="logo viec tot"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-white">
                Trang chủ
              </Link>
              <Link
                href="/find-jobs"
                className="text-sm font-medium text-white"
              >
                Tìm việc
              </Link>
              <Link
                href="/companies"
                className="text-sm font-medium text-white"
              >
                Công ty
              </Link>
              <Link href="/service" className="text-sm font-medium text-white">
                Dịch vụ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Link href="/register" className="text-sm font-medium text-white">
              Đăng ký
            </Link>
            <Link
              href="/login"
              className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Đăng nhập
            </Link>
            <Link
              href="/employer/login"
              className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-white text-white"
            >
              Nhà tuyển dụng
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://i.pravatar.cc/50"
                      alt={profile.name}
                    />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {profile.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Quản lý việc làm</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-muted">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Quản lý CV</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Việc đã ứng tuyển</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Việc đang theo dõi</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header> */}
      <Nav />
      {children}
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12 dark:text-gray-300">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={"/logo.png"}
                  width={120}
                  height={60}
                  alt="logo viec tot"
                />
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
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75 1.764 1.75.79
1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
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
              Bản quyền © 2025 Việc Tốt. Tất cả các quyền được bảo lưu. Việc Tốt
              là thương hiệu của Công ty Việc Tốt.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
