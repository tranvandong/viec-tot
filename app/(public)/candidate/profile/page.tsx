"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
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
  ShieldCheck,
  BriefcaseBusiness,
  IdCard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  useApi,
  useCreate,
  useCustom,
  useUpdate,
} from "@/hooks/useDataProvider";
import { useAuth } from "@/providers/contexts/AuthProvider";
import { Resume } from "@/providers/types/definition";
import { Text } from "@radix-ui/themes";

export default function CandidateProfile() {
  const { theme, setTheme } = useTheme();
  const [editing, setEditing] = useState<string | null>(null);
  const [applicantId, setApplicantId] = useState("");
  const apiUrl = useApi();
  const { authorized } = useAuth();
  // Mock data for the candidate profile
  const [profile, setProfile] = useState<
    Omit<Resume, "hrViewCount" | "applicantId">
  >({
    title: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    certifications: "",
  });
  const { data, refetch: refetchResume } = useCustom<Resume>({
    url: `${apiUrl}/buss/allow/Resumes/GetByUser`,
    method: "get",
    queryOptions: {
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: authorized, // Chỉ gọi API khi đã xác
    },
  });

  useEffect(() => {
    if (data?.data) {
      setProfile({
        title: data.data.title || "",
        summary: data.data.summary || "",
        skills: data.data.skills || "",
        experience: data.data.experience || "",
        education: data.data.education || "",
        certifications: data.data.certifications || "",
      });
    }
  }, [data]);

  const { data: userInfoData } = useCustom<{
    isSuccessed: boolean;
    resultObj: {
      displayName: string;
      role: "HR" | "MEMBER";
    };
  }>({
    url: `${apiUrl}/default/allow/UserInfo/UserInfo`,
    method: "get",
    queryOptions: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  });

  const { mutate: createResume } = useCreate<Partial<Resume>>({
    resource: "Resumes",
    meta: { config: { auth: "auth", subSystem: "buss" } },
    onSuccess: (data) => {
      setEditing(null);
      console.log("Resume created successfully:", data);
    },
  });

  const { mutate: updateResume } = useUpdate({
    resource: "Resumes",
    id: data?.data?.applicantId || "",
    meta: { config: { auth: "auth", subSystem: "buss" } },
    onSuccess: (data) => {
      setEditing(null);
      console.log("Resume created successfully:", data);
    },
  });

  const userInfo = userInfoData?.data?.resultObj;

  const handleEditToggle = (section: string) => {
    if (editing === section) {
      setEditing(null);
    } else {
      setEditing(section);
    }
  };

  const handleSave = (section: keyof typeof profile) => {
    const updatedProfile = { [section]: profile[section] } as Partial<Resume>;
    if (data?.data?.applicantId) {
      updateResume(updatedProfile);
    } else {
      createResume(updatedProfile);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Cover & Basic Info */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute container mx-auto px-4 bottom-0 left-0 right-0 flex flex-col md:flex-row items-center md:items-end gap-4 p-4 md:p-6">
          <div className="relative -mb-16 md:-mb-12">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src="" alt={"profile.name"} />
              <AvatarFallback className="text-4xl">
                {userInfo?.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Change avatar</span>
            </Button>
          </div>
          <div className="flex flex-col items-center md:items-start text-white pt-4 md:pt-0 md:pb-4">
            <h1 className="text-2xl font-bold">{userInfo?.displayName}</h1>
            {/* <p className="text-sm opacity-90">{profile.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{profile.location}</span>
            </div> */}
          </div>
          <div className="flex-1"></div>
          {/* <Button className="hidden md:flex">
            <FileText className="mr-2 h-4 w-4" />
            Tải xuống CV
          </Button> */}
        </div>
      </div>

      <div className="container py-20 md:py-16 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Personal Information  */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  <User className="inline-block mr-2 h-5 w-5" />
                  Thông tin cá nhân
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditToggle("personal")}
                >
                  {editing === "personal" ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {editing === "personal" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        {/* <Label htmlFor="name">Họ và tên</Label>
                        <Input
                          id="name"
                          value={userInfo?.displayName || ""}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                        /> */}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Chức danh</Label>
                        <Input
                          id="title"
                          value={profile.title || data?.data.title || ""}
                          onChange={(e) =>
                            setProfile({ ...profile, title: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditing(null)}
                      >
                        Hủy
                      </Button>
                      <Button onClick={() => handleSave("title")}>Lưu</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.title || data?.data.title}</span>
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditToggle("skills")}
                >
                  {editing === "skills" ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {editing === "skills" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Textarea
                          value={profile.skills}
                          onChange={(e) =>
                            setProfile({ ...profile, skills: e.target.value })
                          }
                          className="min-h-[150px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditing(null)}
                      >
                        Hủy
                      </Button>
                      <Button onClick={() => handleSave("skills")}>Lưu</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      {profile.skills === "" && (
                        <Text color="gray">Hãy thêm kỹ năng của bạn</Text>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {profile.skills}
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
                <CardTitle className="text-lg font-medium">
                  <IdCard className="inline-block mr-2 h-5 w-5" />
                  Giới thiệu
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditToggle("summary")}
                >
                  {editing === "summary" ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {editing === "summary" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Giới thiệu</Label>
                      <div className="flex flex-wrap gap-2">
                        <Textarea
                          value={profile.summary}
                          onChange={(e) =>
                            setProfile({ ...profile, summary: e.target.value })
                          }
                          className="min-h-[150px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditing(null)}
                      >
                        Hủy
                      </Button>
                      <Button onClick={() => handleSave("summary")}>Lưu</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      {profile.summary === "" && (
                        <Text color="gray">
                          Hãy thêm giới thiêu về bản thân bạn
                        </Text>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {profile.summary}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Experience */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  <BriefcaseBusiness className="inline-block mr-2 h-5 w-5" />
                  Kinh nghiệm làm việc
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditToggle("experience")}
                >
                  {editing === "experience" ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {editing === "experience" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Textarea
                          value={profile.experience}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              experience: e.target.value,
                            })
                          }
                          className="min-h-[150px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditing(null)}
                      >
                        Hủy
                      </Button>
                      <Button onClick={() => handleSave("experience")}>
                        Lưu
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      {profile.experience === "" && (
                        <Text color="gray">
                          Hãy thêm kinh nghiệm làm việc của bạn
                        </Text>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {profile.experience}
                      </div>
                    </div>
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
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditToggle("education")}
                >
                  {editing === "education" ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {editing === "education" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Textarea
                          value={profile.education}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              education: e.target.value,
                            })
                          }
                          className="min-h-[150px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditing(null)}
                      >
                        Hủy
                      </Button>
                      <Button onClick={() => handleSave("education")}>
                        Lưu
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      {profile.education === "" && (
                        <Text color="gray">Hãy thêm học vấn của bạn</Text>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {profile.education}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  <ShieldCheck className="inline-block mr-2 h-5 w-5" />
                  Chứng chỉ
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditToggle("certifications")}
                >
                  {editing === "certifications" ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {editing === "certifications" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Textarea
                          value={profile.certifications}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              certifications: e.target.value,
                            })
                          }
                          className="min-h-[150px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditing(null)}
                      >
                        Hủy
                      </Button>
                      <Button onClick={() => handleSave("certifications")}>
                        Lưu
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      {profile.certifications === "" && (
                        <Text color="gray">
                          Hãy thêm kinh nghiệm làm việc của bạn
                        </Text>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {profile.certifications}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
