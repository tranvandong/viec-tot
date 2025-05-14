"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Edit,
  Camera,
  Plus,
  Trash2,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

export default function CandidateProfile() {
  const { theme, setTheme } = useTheme()
  const [editing, setEditing] = useState<string | null>(null)

  // Mock data for the candidate profile
  const [profile, setProfile] = useState({
    name: "Đồng Trần",
    title: "Senior Frontend Developer",
    location: "Hồ Chí Minh",
    email: "dongtran@example.com",
    phone: "+84 123 456 789",
    birthday: "1990-01-01",
    about:
      "Tôi là một lập trình viên Frontend với hơn 5 năm kinh nghiệm làm việc với React, Next.js và TypeScript. Tôi đam mê xây dựng giao diện người dùng đẹp mắt và trải nghiệm người dùng tuyệt vời.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Redux", "GraphQL"],
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
  })

  const handleEditToggle = (section: string) => {
    if (editing === section) {
      setEditing(null)
    } else {
      setEditing(section)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <div className="bg-orange-500 p-1 mr-1">
                <span className="text-white font-bold">Job</span>
              </div>
              <span className="text-xl font-bold">Wise</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/jobs" className="text-sm font-medium transition-colors hover:text-primary">
                Find jobs
              </Link>
              <Link href="/companies" className="text-sm font-medium transition-colors hover:text-primary">
                Companies
              </Link>
              <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">
                Service
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sun"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-moon"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium">
                Log In
              </Link>
              <Button asChild className="rounded-full">
                <Link href="/register">Register</Link>
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={profile.name} />
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
                    <p className="text-xs text-muted-foreground">{profile.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>TopDev CV</span>
                </DropdownMenuItem>
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
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Trắc nghiệm tính cách</span>
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
      </header>

      {/* Profile Cover & Basic Info */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row items-center md:items-end gap-4 p-4 md:p-6">
          <div className="relative -mb-16 md:-mb-12">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src="/placeholder.svg" alt={profile.name} />
              <AvatarFallback className="text-4xl">{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
              <Camera className="h-4 w-4" />
              <span className="sr-only">Change avatar</span>
            </Button>
          </div>
          <div className="flex flex-col items-center md:items-start text-white pt-4 md:pt-0 md:pb-4">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-sm opacity-90">{profile.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{profile.location}</span>
            </div>
          </div>
          <div className="flex-1"></div>
          <Button className="hidden md:flex">
            <FileText className="mr-2 h-4 w-4" />
            Tải xuống CV
          </Button>
        </div>
      </div>

      <div className="container py-20 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  <User className="inline-block mr-2 h-5 w-5" />
                  Thông tin cá nhân
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handleEditToggle("personal")}>
                  {editing === "personal" ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                {editing === "personal" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Chức danh</Label>
                        <Input
                          id="title"
                          value={profile.title}
                          onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Địa điểm</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthday">Ngày sinh</Label>
                        <Input
                          id="birthday"
                          type="date"
                          value={profile.birthday}
                          onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditing(null)}>
                        Hủy
                      </Button>
                      <Button onClick={() => setEditing(null)}>Lưu</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(profile.birthday).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  <Award className="inline-block mr-2 h-5 w-5" />
                  Kỹ năng
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handleEditToggle("skills")}>
                  {editing === "skills" ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                {editing === "skills" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Kỹ năng chuyên môn</Label>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                          >
                            {skill}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                              onClick={() => {
                                const newSkills = [...profile.skills]
                                newSkills.splice(index, 1)
                                setProfile({ ...profile, skills: newSkills })
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <Input
                          className="w-32 h-8"
                          placeholder="Thêm kỹ năng"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.currentTarget.value) {
                              e.preventDefault()
                              setProfile({
                                ...profile,
                                skills: [...profile.skills, e.currentTarget.value],
                              })
                              e.currentTarget.value = ""
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Ngôn ngữ</Label>
                      <div className="flex flex-wrap gap-2">
                        {profile.languages.map((language, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                          >
                            {language}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                              onClick={() => {
                                const newLanguages = [...profile.languages]
                                newLanguages.splice(index, 1)
                                setProfile({ ...profile, languages: newLanguages })
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <Input
                          className="w-32 h-8"
                          placeholder="Thêm ngôn ngữ"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.currentTarget.value) {
                              e.preventDefault()
                              setProfile({
                                ...profile,
                                languages: [...profile.languages, e.currentTarget.value],
                              })
                              e.currentTarget.value = ""
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditing(null)}>
                        Hủy
                      </Button>
                      <Button onClick={() => setEditing(null)}>Lưu</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Kỹ năng chuyên môn</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Ngôn ngữ</h3>
                      <div className="space-y-1">
                        {profile.languages.map((language, index) => (
                          <div key={index} className="text-sm">
                            {language}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Giới thiệu</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handleEditToggle("about")}>
                  {editing === "about" ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                {editing === "about" ? (
                  <div className="space-y-4">
                    <Textarea
                      value={profile.about}
                      onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                      className="min-h-[150px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditing(null)}>
                        Hủy
                      </Button>
                      <Button onClick={() => setEditing(null)}>Lưu</Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">{profile.about}</p>
                )}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  <Briefcase className="inline-block mr-2 h-5 w-5" />
                  Kinh nghiệm làm việc
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setProfile({
                      ...profile,
                      experiences: [
                        ...profile.experiences,
                        {
                          id: Date.now(),
                          title: "",
                          company: "",
                          location: "",
                          from: "",
                          to: "",
                          current: false,
                          description: "",
                        },
                      ],
                    })
                    setEditing(`experience-${Date.now()}`)
                  }}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Thêm kinh nghiệm
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.experiences.map((experience, index) => (
                  <div key={experience.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                    {editing === `experience-${experience.id}` ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`exp-title-${experience.id}`}>Chức danh</Label>
                            <Input
                              id={`exp-title-${experience.id}`}
                              value={experience.title}
                              onChange={(e) => {
                                const newExperiences = [...profile.experiences]
                                newExperiences[index].title = e.target.value
                                setProfile({ ...profile, experiences: newExperiences })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`exp-company-${experience.id}`}>Công ty</Label>
                            <Input
                              id={`exp-company-${experience.id}`}
                              value={experience.company}
                              onChange={(e) => {
                                const newExperiences = [...profile.experiences]
                                newExperiences[index].company = e.target.value
                                setProfile({ ...profile, experiences: newExperiences })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`exp-location-${experience.id}`}>Địa điểm</Label>
                            <Input
                              id={`exp-location-${experience.id}`}
                              value={experience.location}
                              onChange={(e) => {
                                const newExperiences = [...profile.experiences]
                                newExperiences[index].location = e.target.value
                                setProfile({ ...profile, experiences: newExperiences })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`exp-current-${experience.id}`}>Đang làm việc tại đây</Label>
                              <Switch
                                id={`exp-current-${experience.id}`}
                                checked={experience.current}
                                onCheckedChange={(checked) => {
                                  const newExperiences = [...profile.experiences]
                                  newExperiences[index].current = checked
                                  setProfile({ ...profile, experiences: newExperiences })
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`exp-from-${experience.id}`}>Từ</Label>
                            <Input
                              id={`exp-from-${experience.id}`}
                              type="month"
                              value={experience.from}
                              onChange={(e) => {
                                const newExperiences = [...profile.experiences]
                                newExperiences[index].from = e.target.value
                                setProfile({ ...profile, experiences: newExperiences })
                              }}
                            />
                          </div>
                          {!experience.current && (
                            <div className="space-y-2">
                              <Label htmlFor={`exp-to-${experience.id}`}>Đến</Label>
                              <Input
                                id={`exp-to-${experience.id}`}
                                type="month"
                                value={experience.to}
                                onChange={(e) => {
                                  const newExperiences = [...profile.experiences]
                                  newExperiences[index].to = e.target.value
                                  setProfile({ ...profile, experiences: newExperiences })
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`exp-description-${experience.id}`}>Mô tả</Label>
                          <Textarea
                            id={`exp-description-${experience.id}`}
                            value={experience.description}
                            onChange={(e) => {
                              const newExperiences = [...profile.experiences]
                              newExperiences[index].description = e.target.value
                              setProfile({ ...profile, experiences: newExperiences })
                            }}
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="flex justify-between">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newExperiences = [...profile.experiences]
                              newExperiences.splice(index, 1)
                              setProfile({ ...profile, experiences: newExperiences })
                              setEditing(null)
                            }}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Xóa
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setEditing(null)}>
                              Hủy
                            </Button>
                            <Button onClick={() => setEditing(null)}>Lưu</Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0"
                          onClick={() => handleEditToggle(`experience-${experience.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div>
                            <h3 className="text-base font-medium">{experience.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {experience.company} • {experience.location}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(experience.from).toLocaleDateString("vi-VN", { year: "numeric", month: "short" })}{" "}
                            -{" "}
                            {experience.current
                              ? "Hiện tại"
                              : new Date(experience.to).toLocaleDateString("vi-VN", {
                                  year: "numeric",
                                  month: "short",
                                })}
                          </p>
                        </div>
                        <p className="text-sm">{experience.description}</p>
                      </div>
                    )}
                  </div>
                ))}
                {profile.experiences.length === 0 && (
                  <div className="text-center py-6">
                    <Briefcase className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium mb-1">Chưa có kinh nghiệm làm việc</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Thêm kinh nghiệm làm việc để tăng cơ hội được tuyển dụng
                    </p>
                    <Button
                      onClick={() => {
                        setProfile({
                          ...profile,
                          experiences: [
                            ...profile.experiences,
                            {
                              id: Date.now(),
                              title: "",
                              company: "",
                              location: "",
                              from: "",
                              to: "",
                              current: false,
                              description: "",
                            },
                          ],
                        })
                        setEditing(`experience-${Date.now()}`)
                      }}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Thêm kinh nghiệm
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  <GraduationCap className="inline-block mr-2 h-5 w-5" />
                  Học vấn
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setProfile({
                      ...profile,
                      education: [
                        ...profile.education,
                        {
                          id: Date.now(),
                          degree: "",
                          institution: "",
                          location: "",
                          from: "",
                          to: "",
                          description: "",
                        },
                      ],
                    })
                    setEditing(`education-${Date.now()}`)
                  }}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Thêm học vấn
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.education.map((edu, index) => (
                  <div key={edu.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                    {editing === `education-${edu.id}` ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`edu-degree-${edu.id}`}>Bằng cấp</Label>
                            <Input
                              id={`edu-degree-${edu.id}`}
                              value={edu.degree}
                              onChange={(e) => {
                                const newEducation = [...profile.education]
                                newEducation[index].degree = e.target.value
                                setProfile({ ...profile, education: newEducation })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`edu-institution-${edu.id}`}>Trường</Label>
                            <Input
                              id={`edu-institution-${edu.id}`}
                              value={edu.institution}
                              onChange={(e) => {
                                const newEducation = [...profile.education]
                                newEducation[index].institution = e.target.value
                                setProfile({ ...profile, education: newEducation })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`edu-location-${edu.id}`}>Địa điểm</Label>
                            <Input
                              id={`edu-location-${edu.id}`}
                              value={edu.location}
                              onChange={(e) => {
                                const newEducation = [...profile.education]
                                newEducation[index].location = e.target.value
                                setProfile({ ...profile, education: newEducation })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`edu-from-${edu.id}`}>Từ</Label>
                            <Input
                              id={`edu-from-${edu.id}`}
                              type="text"
                              placeholder="Năm"
                              value={edu.from}
                              onChange={(e) => {
                                const newEducation = [...profile.education]
                                newEducation[index].from = e.target.value
                                setProfile({ ...profile, education: newEducation })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`edu-to-${edu.id}`}>Đến</Label>
                            <Input
                              id={`edu-to-${edu.id}`}
                              type="text"
                              placeholder="Năm"
                              value={edu.to}
                              onChange={(e) => {
                                const newEducation = [...profile.education]
                                newEducation[index].to = e.target.value
                                setProfile({ ...profile, education: newEducation })
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edu-description-${edu.id}`}>Mô tả</Label>
                          <Textarea
                            id={`edu-description-${edu.id}`}
                            value={edu.description}
                            onChange={(e) => {
                              const newEducation = [...profile.education]
                              newEducation[index].description = e.target.value
                              setProfile({ ...profile, education: newEducation })
                            }}
                          />
                        </div>
                        <div className="flex justify-between">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newEducation = [...profile.education]
                              newEducation.splice(index, 1)
                              setProfile({ ...profile, education: newEducation })
                              setEditing(null)
                            }}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Xóa
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setEditing(null)}>
                              Hủy
                            </Button>
                            <Button onClick={() => setEditing(null)}>Lưu</Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0"
                          onClick={() => handleEditToggle(`education-${edu.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div>
                            <h3 className="text-base font-medium">{edu.degree}</h3>
                            <p className="text-sm text-muted-foreground">
                              {edu.institution} • {edu.location}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {edu.from} - {edu.to}
                          </p>
                        </div>
                        <p className="text-sm">{edu.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  <Award className="inline-block mr-2 h-5 w-5" />
                  Chứng chỉ
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setProfile({
                      ...profile,
                      certifications: [
                        ...profile.certifications,
                        {
                          id: Date.now(),
                          name: "",
                          issuer: "",
                          date: "",
                          expires: "",
                          description: "",
                        },
                      ],
                    })
                    setEditing(`certification-${Date.now()}`)
                  }}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Thêm chứng chỉ
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.certifications.map((cert, index) => (
                  <div key={cert.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                    {editing === `certification-${cert.id}` ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`cert-name-${cert.id}`}>Tên chứng chỉ</Label>
                            <Input
                              id={`cert-name-${cert.id}`}
                              value={cert.name}
                              onChange={(e) => {
                                const newCertifications = [...profile.certifications]
                                newCertifications[index].name = e.target.value
                                setProfile({ ...profile, certifications: newCertifications })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`cert-issuer-${cert.id}`}>Tổ chức cấp</Label>
                            <Input
                              id={`cert-issuer-${cert.id}`}
                              value={cert.issuer}
                              onChange={(e) => {
                                const newCertifications = [...profile.certifications]
                                newCertifications[index].issuer = e.target.value
                                setProfile({ ...profile, certifications: newCertifications })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`cert-date-${cert.id}`}>Ngày cấp</Label>
                            <Input
                              id={`cert-date-${cert.id}`}
                              type="month"
                              value={cert.date}
                              onChange={(e) => {
                                const newCertifications = [...profile.certifications]
                                newCertifications[index].date = e.target.value
                                setProfile({ ...profile, certifications: newCertifications })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`cert-expires-${cert.id}`}>Ngày hết hạn</Label>
                            <Input
                              id={`cert-expires-${cert.id}`}
                              type="month"
                              value={cert.expires}
                              onChange={(e) => {
                                const newCertifications = [...profile.certifications]
                                newCertifications[index].expires = e.target.value
                                setProfile({ ...profile, certifications: newCertifications })
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`cert-description-${cert.id}`}>Mô tả</Label>
                          <Textarea
                            id={`cert-description-${cert.id}`}
                            value={cert.description}
                            onChange={(e) => {
                              const newCertifications = [...profile.certifications]
                              newCertifications[index].description = e.target.value
                              setProfile({ ...profile, certifications: newCertifications })
                            }}
                          />
                        </div>
                        <div className="flex justify-between">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newCertifications = [...profile.certifications]
                              newCertifications.splice(index, 1)
                              setProfile({ ...profile, certifications: newCertifications })
                              setEditing(null)
                            }}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Xóa
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setEditing(null)}>
                              Hủy
                            </Button>
                            <Button onClick={() => setEditing(null)}>Lưu</Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0"
                          onClick={() => handleEditToggle(`certification-${cert.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div>
                            <h3 className="text-base font-medium">{cert.name}</h3>
                            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Cấp: {new Date(cert.date).toLocaleDateString("vi-VN", { year: "numeric", month: "short" })}
                            {cert.expires &&
                              ` • Hết hạn: ${new Date(cert.expires).toLocaleDateString("vi-VN", { year: "numeric", month: "short" })}`}
                          </p>
                        </div>
                        <p className="text-sm">{cert.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
