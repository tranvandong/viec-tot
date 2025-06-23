"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Download,
  Mail,
  Phone,
  LinkIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type CandidateProfileDrawerProps = {
  candidate: any;
  isOpen: boolean;
  onClose: () => void;
};

export function CandidateProfileDrawer({
  candidate,
  isOpen,
  onClose,
}: CandidateProfileDrawerProps) {
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Transparent overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute inset-y-0 right-0 w-full max-w-2xl bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-auto`}
      >
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
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-100 dark:border-blue-900">
              <Image
                src={
                  candidate.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={candidate.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-center">
              {candidate.name ?? candidate.applicant.dienThoai}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {candidate.jobTitle ?? candidate.applicant.email}
            </p>

            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              {candidate.location ?? "Đang cập nhật"}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Mail className="h-4 w-4 inline mr-2" />
                Liên hệ
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                <Download className="h-4 w-4 inline mr-2" />
                Tải về CV
              </button>
            </div>
          </div>

          {/* Match score */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Match Score</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {candidate.matchScore ?? 0}%
              </span>
            </div>
            <Progress value={candidate.matchScore} className="h-2" />
          </div>

          {/* Application details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Thông tin ứng tuyển</h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ứng tuyển cho
                  </p>
                  <p className="font-medium">
                    {candidate.jobTitle ?? candidate.title}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ứng tuyển vào ngày
                  </p>
                  <p className="font-medium">
                    {formatDate(candidate.appliedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Kinh nghiệm
                  </p>
                  <p className="font-medium">{candidate.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Trạng thái
                  </p>
                  <p className="font-medium capitalize">{candidate.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          {/* <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div> */}

          {/* Experience */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Kinh nghiệm làm việc</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 ml-2">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mr-3 mt-1">
                    <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Senior UX Designer</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Design Studio Inc.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Jan 2020 - Present
                    </p>
                    <p className="text-sm mt-2">
                      Led the redesign of multiple products, resulting in a 40%
                      increase in user engagement and a 25% decrease in user
                      complaints.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 ml-2">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mr-3 mt-1">
                    <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">UX Designer</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tech Solutions Ltd.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Mar 2017 - Dec 2019
                    </p>
                    <p className="text-sm mt-2">
                      Collaborated with product managers and developers to
                      create user-centered designs for web and mobile
                      applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Học vấn</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 ml-2">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mr-3 mt-1">
                    <GraduationCap className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Master of Design</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      University of Design Arts
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      2015 - 2017
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 ml-2">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mr-3 mt-1">
                    <GraduationCap className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Bachelor of Fine Arts</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      State University
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      2011 - 2015
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Các chứng chỉ</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 ml-2">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mr-3 mt-1">
                    <Award className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      UX Design Professional Certificate
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Google
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Issued Jan 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>
                  {/* {candidate.name &&
                    candidate.name.toLowerCase().replace(" ", ".")} */}
                  {candidate.applicant.email}
                  @example.com
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                {/* <span>+1 (555) 123-4567</span> */}
                {candidate.applicant.dienThoai}
              </div>
              <div className="flex items-center">
                <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  linkedin.com/in/
                  {candidate.name &&
                    candidate.name.toLowerCase().replace(" ", "-")}
                </a>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Đóng
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Lên lịch phỏng vấn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
