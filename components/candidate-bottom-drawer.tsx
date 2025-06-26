"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Applicant } from "@/providers/types/definition";
import { toVietnamPhoneIntl } from "@/app/employer/manage/candidates/page";

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

  const data = {
    desiredPosition: "Lập trình viên",
    expectedSalary: "20 - 25 triệu/tháng",
    jobType: "Toàn thời gian",
    availability: "Có thể nhận việc ngay",
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        document.body.style.overflow = "";
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute inset-x-0 bottom-0 w-full bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-out rounded-t-2xl ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } overflow-auto max-h-[90vh]`}
      >
        <div className="w-full flex justify-center pt-2 pb-1">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden border shadow-sm">
              <Image
                src={
                  candidate.avatar ||
                  `https://cdn-icons-png.flaticon.com/512/149/149071.png`
                }
                alt={candidate.name ?? ""}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {candidate.name ?? toVietnamPhoneIntl(candidate.dienThoai)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {candidate.resume?.title ?? "Chưa cập nhật"}
              </p>
              <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                {candidate.location ?? "Quy Nhơn"}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg px-3 py-1">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                  Lưu ứng viên
                </button>
              </div>
              {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                Lưu ứng viên
              </button> */}
            </div>
          </div>

          <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-4">
            <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium">
                  {candidate.email ?? "Chưa cập nhật"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Số điện thoại
                </p>
                <p className="font-medium">
                  {toVietnamPhoneIntl(candidate.dienThoai)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Ngày sinh</p>
                <p className="font-medium">
                  {candidate.birthDate ?? "Chưa cập nhật"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Giới tính</p>
                <p className="font-medium">
                  {candidate.resume?.gioiTinh ?? "Chưa cập nhật"}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-2">Giới thiệu</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {candidate.resume?.summary ?? "Chưa cập nhật"}
            </p>
          </section>

          {candidate.resume?.experience && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2">Kinh nghiệm</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {candidate.resume.experience}
              </p>
            </section>
          )}

          {candidate.education && Array.isArray(candidate.education) && (
            <section className="space-y-4">
              {candidate.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{edu.degree}</h4>
                        <span className="text-gray-500 dark:text-gray-400">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {edu.institution}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" /> {edu.location}
                      </p>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {candidate.skills && candidate.skills.length > 0 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2">Kỹ năng chuyên môn</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {candidate.languages && candidate.languages.length > 0 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2">Ngôn ngữ</h3>
              <div className="space-y-2">
                {candidate.languages.map((lang: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>{lang.language}</span>
                    <Badge variant="outline">{lang.level}</Badge>
                  </div>
                ))}
              </div>
            </section>
          )}

          {candidate.certifications && candidate.certifications.length > 0 && (
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2">Chứng chỉ</h3>
              <div className="space-y-3">
                {candidate.certifications.map((cert: any, index: number) => (
                  <div key={index} className="flex items-start text-sm">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-4">
            <h3 className="text-lg font-semibold">Thông tin ứng tuyển</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Vị trí mong muốn
                </p>
                <p className="font-medium">{data.desiredPosition}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Mức lương mong muốn
                </p>
                <p className="font-medium">{data.expectedSalary}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Loại công việc
                </p>
                <p className="font-medium">{data.jobType}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Sẵn sàng làm việc
                </p>
                <p className="font-medium">{data.availability}</p>
              </div>
            </div>
          </section>

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
