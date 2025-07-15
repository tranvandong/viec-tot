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
import { Bell, Briefcase, FileText, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApi, useCustom } from "@/hooks/useDataProvider";
import { useAuth } from "@/providers/contexts/AuthProvider";
import { useLogout } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSSENotifies } from "@/hooks/use-sse-notify";
import dayjs from "@/lib/dayjs";

export function Nav() {
  // Header scroll hide/show logic
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3); // Dummy count
  const [notifications, setNotifications] = useState([
    // Dummy notifications
    { id: 1, message: "Bạn có một công việc mới phù hợp!", read: false },
    {
      id: 2,
      message: "Hồ sơ của bạn đã được xem bởi FPT Software.",
      read: false,
    },
    {
      id: 3,
      message:
        "Chúc mừng bạn đã ứng tuyển thành công vị trí Senior Frontend Developer.",
      read: false,
    },
    { id: 4, message: "Nhà tuyển dụng đã phản hồi hồ sơ của bạn.", read: true },
  ]);
  const { authorized, userInfo } = useAuth();
  const { mutate: logout } = useLogout();
  const lastScrollY = useRef(0);
  const router = useRouter();
  const { notifies, isLoading, loadMore, unreadCount, markAsRead } =
    useSSENotifies();
  console.log(notifies);

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
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[250px] sm:w-[300px] bg-blue-950 text-white"
              >
                <SheetHeader>
                  <SheetTitle className="text-white">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Image
                        src={"/logo.png"}
                        width={100}
                        height={50}
                        alt="logo viec tot"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    className="text-lg font-medium text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Trang chủ
                  </Link>
                  <Link
                    href="/find-jobs"
                    className="text-lg font-medium text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Tìm việc
                  </Link>
                  <Link
                    href="/companies"
                    className="text-lg font-medium text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Công ty
                  </Link>
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    {!authorized && (
                      <>
                        <Link
                          href="/register"
                          className="block py-2 text-lg font-medium text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Đăng ký
                        </Link>
                        <Link
                          href="/login"
                          className="block py-2 text-lg font-medium text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Đăng nhập
                        </Link>
                        <Link
                          href="/employer/login"
                          className="block py-2 text-lg font-medium text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Nhà tuyển dụng
                        </Link>
                      </>
                    )}
                    {authorized && userInfo?.role === "MEMBER" && (
                      <>
                        <Link
                          href="/candidate/profile"
                          className="block py-2 text-lg font-medium text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Quản lý CV
                        </Link>
                        <Link
                          href="/candidate/my-jobs?active=1"
                          className="block py-2 text-lg font-medium text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Việc đã ứng tuyển
                        </Link>
                        <Link
                          href="/candidate/my-jobs?active=2"
                          className="block py-2 text-lg font-medium text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Việc đang theo dõi
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="block py-2 text-lg font-medium text-white w-full text-left"
                        >
                          Đăng xuất
                        </button>
                      </>
                    )}
                    {authorized && userInfo?.role === "HR" && (
                      <>
                        <Link
                          href="/employer/manage/profile"
                          className="block py-2 text-lg font-medium text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Quản lý hồ sơ
                        </Link>
                        <Link
                          href="/employer/manage/applied-candidates"
                          className="block py-2 text-lg font-medium text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Ứng tuyển
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="block py-2 text-lg font-medium text-white w-full text-left"
                        >
                          Đăng xuất
                        </button>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Auth/Profile */}
          {!authorized && (
            <>
              <Link
                href="/register"
                className="hidden md:block  text-xs md:text-sm font-medium text-white"
              >
                Đăng ký
              </Link>
              <Link
                href="/login"
                className="hidden md:block  py-2 px-4 inline-flex items-center gap-x-2 text-xs md:text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                Đăng nhập
              </Link>
              <Link
                href="/employer/login"
                className="hidden md:block py-2 px-4 inline-flex items-center gap-x-2 text-xs md:text-sm font-semibold rounded-full border border-white text-white"
              >
                Nhà tuyển dụng
              </Link>
            </>
          )}
          {authorized && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white h-10 w-10 rounded-full"
                >
                  <Bell className="h-8 w-8" />
                  {unreadCount !== undefined && unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-80 max-h-[70vh] overflow-y-auto"
                align="end"
                forceMount
              >
                <div className="flex items-center justify-between p-2">
                  <p className="font-medium">Thông báo</p>
                  <Button variant="link" className="text-xs">
                    Đánh dấu đã đọc tất cả
                  </Button>
                </div>
                <DropdownMenuSeparator />
                {notifies.length > 0 ? (
                  notifies.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex flex-col items-start gap-1 p-2 ${
                        notification.isNew ? "font-semibold" : "font-medium"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p className="text-sm ">{notification.content}</p>
                      <span className="text-xs text-muted-foreground">
                        {dayjs(notification.createdDate).fromNow()}
                      </span>{" "}
                      {/* Dummy timestamp */}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem className="p-2 text-center text-muted-foreground">
                    Không có thông báo mới
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="justify-center"
                >
                  <div
                    onClick={loadMore}
                    className="text-sm text-blue-600 cursor-pointer"
                  >
                    Xem thêm
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {authorized && userInfo?.role === "MEMBER" && (
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
                        email@example.com
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
                    onClick={() => onNavigate("/candidate/my-jobs?active=1")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Việc đã ứng tuyển</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onNavigate("/candidate/my-jobs?active=2")}
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
          {authorized && userInfo?.role === "HR" && (
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
                        email@example.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onNavigate("/employer/manage/profile")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Quản lý hồ sơ</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      onNavigate("/employer/manage/applied-candidates")
                    }
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Ứng tuyển</span>
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
