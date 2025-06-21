"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
import { useRouter } from "next/navigation";
import { useApi, useCustom } from "@/hooks/useDataProvider";
import { useAuth } from "@/providers/contexts/AuthProvider";
import { useLogout } from "@/hooks/useAuth";

export function Nav() {
  // Header scroll hide/show logic
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const { authorized } = useAuth();
  const { mutate: logout } = useLogout();
  const lastScrollY = useRef(0);
  const router = useRouter();
  const apiUrl = useApi();
  const { data } = useCustom<{
    isSuccessed: boolean;
    resultObj: {
      displayName: string;
      role: string;
    };
  }>({
    url: `${apiUrl}/default/allow/UserInfo/UserInfo`,
    method: "get",
    queryOptions: {
      retry: 1,
      enabled: authorized,
      refetchOnWindowFocus: false,
    },
  });
  const userInfo = data?.data?.resultObj;

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down & past header height
        setIsHeaderVisible(false);
      } else {
        // Scrolling up
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <header className={`bg-blue-950 text-white top-0 left-0 right-0 z-10`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-4">
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
            <Link href="/find-jobs" className="text-sm font-medium text-white">
              Tìm việc
            </Link>
            <Link href="/companies" className="text-sm font-medium text-white">
              Công ty
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="hidden md:block">
            <ThemeToggle />
          </div> */}
          {!authorized && (
            <>
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
            </>
          )}

          {authorized && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        // src="https://i.pravatar.cc/50"
                        alt={userInfo?.displayName}
                      />
                      <AvatarFallback color="green" style={{ color: "orange" }}>
                        {userInfo?.displayName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        // src="/placeholder.svg"
                        alt={userInfo?.displayName}
                      />
                      <AvatarFallback style={{ color: "orange" }}>
                        {userInfo?.displayName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{userInfo?.displayName}</p>
                      <p className="text-xs text-muted-foreground">
                        {profile.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onNavigate("/candidate/profile")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Quản lý CV</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onNavigate("/candidate/my-jobs")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Việc đã ứng tuyển</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onNavigate("/candidate/my-jobs")}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Việc đang theo dõi</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}
