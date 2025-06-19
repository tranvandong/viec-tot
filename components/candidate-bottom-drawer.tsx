"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Applicant } from "@/providers/types/definition";

type CandidateBottomDrawerProps = {
  candidate: Applicant;
  isOpen: boolean;
  onClose: () => void;
};

export function CandidateBottomDrawer({
  candidate,
  isOpen,
  onClose,
}: CandidateBottomDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scrolling when drawer is open
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        // Re-enable body scrolling
        document.body.style.overflow = "";
      }, 300); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Transparent overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Bottom Drawer */}
      <div
        className={`absolute inset-x-0 bottom-0 w-full bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-out rounded-t-xl ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } overflow-auto max-h-[90vh]`}
      >
        {/* Handle for dragging */}
        <div className="w-full flex justify-center pt-2 pb-1">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start mb-6">
            <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
              <Image
                src={
                  candidate.avatar ||
                  `https://cdn-icons-png.flaticon.com/512/149/149071.png`
                }
                alt={candidate.name ?? ""}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {candidate.name ?? candidate.dienThoai}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {candidate.resume?.title ?? "Chưa cập nhật"}
              </p>
              <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                {candidate.location ?? "Chưa cập nhật"}
              </div>
              <div className="flex gap-2 mt-3">
                <Badge variant="outline" className="px-2 py-1">
                  {candidate.resume?.experience ?? "Chưa cập nhật"}
                </Badge>
                <Badge variant="outline" className="px-2 py-1">
                  {typeof candidate.resume?.education === "string"
                    ? candidate.resume?.education
                    : "Đại học"}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-2 mb-2">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {candidate.matchScore ?? 0}% Match
                </span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                Lưu ứng viên
              </button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
              <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
              <TabsTrigger value="education">Học vấn</TabsTrigger>
              <TabsTrigger value="skills">Kỹ năng</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">
                  Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="font-medium">{candidate.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Số điện thoại
                    </p>
                    <p className="font-medium">{candidate.dienThoai}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ngày sinh
                    </p>
                    <p className="font-medium">
                      {candidate.birthDate ?? "Chưa cập nhật"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Giới tính
                    </p>
                    <p className="font-medium">
                      {candidate.gender ?? "Chưa cập nhật"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">
                  Thông tin ứng tuyển
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Vị trí mong muốn
                    </p>
                    <p className="font-medium">{candidate.desiredPosition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Mức lương mong muốn
                    </p>
                    <p className="font-medium">{candidate.expectedSalary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Loại công việc
                    </p>
                    <p className="font-medium">{candidate.jobType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sẵn sàng làm việc
                    </p>
                    <p className="font-medium">{candidate.availability}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Giới thiệu</h3>
                <p className="text-sm">
                  {candidate.summary ?? "Chưa cập nhật"}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <div className="space-y-4">
                {candidate.resume?.experience}
                {/* {candidate.experiences?.map((exp: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center mr-3">
                        <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{exp.title}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" /> {exp.location}
                        </p>
                        <p className="text-sm mt-2">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <div className="space-y-4">
                {candidate.education && Array.isArray(candidate.education) ? (
                  candidate.education.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                    >
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center mr-3">
                          <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{edu.degree}</h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {edu.period}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" /> {edu.location}
                          </p>
                          <p className="text-sm mt-2">{edu.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No education information available</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">
                  Kỹ năng chuyên môn
                </h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills?.map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Ngôn ngữ</h3>
                <div className="space-y-2">
                  {candidate.languages?.map((lang: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{lang.language}</span>
                      <Badge variant="outline">{lang.level}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Chứng chỉ</h3>
                <div className="space-y-3">
                  {candidate.certifications?.map((cert: any, index: number) => (
                    <div key={index} className="flex items-start">
                      <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Đóng
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Liên hệ ứng viên
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
