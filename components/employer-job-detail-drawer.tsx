"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  X,
  Edit,
  Trash2,
  Users,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Briefcase,
  GraduationCap,
  User,
} from "lucide-react";
import parse, { domToReact } from "html-react-parser";
import { formatVND } from "@/helpers";
import { getStatusDisplayText } from "@/app/employer/manage/applied-candidates/page";
import { useList } from "@/hooks/useDataProvider";
import { JobPost, Organization } from "@/providers/types/definition";
import { JobCard } from "@/app/employer/manage/profile/page";

type JobDetailDrawerProps = {
  job: any;
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit";
  onSave?: (job: any) => void;
};

export const JobDescriptionSection = ({
  description,
}: {
  description: string;
}) => {
  return (
    <div className="space-y-4">
      {parse(description, {
        replace: (domNode) => {
          if (domNode.type === "tag") {
            const { name, children } = domNode;

            if (name === "ul") {
              return (
                <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm">
                  {domToReact(children)}
                </ul>
              );
            }

            if (name === "li") {
              return (
                <li className="leading-relaxed">{domToReact(children)}</li>
              );
            }

            // Bỏ style cho <p>, <strong>
          }
        },
      })}
    </div>
  );
};

export function EmployerJobDetailDrawer({
  job,
  isOpen,
  onClose,
  mode = "view",
  onSave,
}: JobDetailDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [editedJob, setEditedJob] = useState<any>(job);
  const [currentMode, setCurrentMode] = useState<"view" | "edit">(mode);

  const { data, reload } = useList<Organization>({
    resource: "Organizations/GetByUser",
    meta: { config: { auth: "allow" } },
    pagination: undefined,
  });

  const { data: jobfrom } = useList<JobPost>({
    resource: "Jobs",
  });
  const jobs = jobfrom?.data || [];

  const company = data?.data;

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

  useEffect(() => {
    setEditedJob(job);
    setCurrentMode(mode);
  }, [job, mode]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const numericFields = ["fromSalary", "toSalary"];

    setEditedJob((prev: any) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    const updatedDescriptionHtml = combineJobDescriptionHtml();
    const updatedJob = {
      ...editedJob,
      description: updatedDescriptionHtml,
    };

    if (onSave) {
      onSave(updatedJob);
    }

    setCurrentMode("view");
  };

  const toggleEditMode = () => {
    setCurrentMode(currentMode === "view" ? "edit" : "view");
  };

  if (!isAnimating && !isOpen) return null;

  const parseJobSections = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;

    const sections: Record<string, string[]> = {
      description: [],
      requirements: [],
      benefits: [],
    };

    let currentKey: keyof typeof sections | null = null;

    for (const child of div.children) {
      if (child.tagName === "P") {
        const text = child.textContent || "";
        if (text.includes("Mô tả công việc")) currentKey = "description";
        else if (text.includes("Yêu cầu")) currentKey = "requirements";
        else if (text.includes("Quyền lợi")) currentKey = "benefits";
      }

      if (child.tagName === "UL" && currentKey) {
        const items = Array.from(child.querySelectorAll("li")).map(
          (li) => li.textContent?.trim() || ""
        );
        sections[currentKey] = items;
      }
    }

    return sections;
  };

  const combineJobDescriptionHtml = () => {
    const description = (
      document.getElementById("description") as HTMLTextAreaElement
    )?.value;
    const requirements = (
      document.getElementById("requirements") as HTMLTextAreaElement
    )?.value;
    const benefits = (
      document.getElementById("benefits") as HTMLTextAreaElement
    )?.value;

    const createSection = (title: string, items: string) => {
      const listItems = items
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => `<li>${line.trim()}</li>`)
        .join("");
      return `<p><strong>${title}</strong></p><ul>${listItems}</ul>`;
    };

    return `
    ${createSection("Mô tả công việc", description)}
    ${createSection("Yêu cầu", requirements)}
    ${createSection("Quyền lợi", benefits)}
  `;
  };

  const { description, requirements, benefits } = parseJobSections(
    job.description
  );

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
        className={`absolute inset-x-0 bottom-0 max-h-[90vh] bg-white rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } overflow-auto`}
      >
        {/* Handle/pill indicator */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-2 mb-4"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className=" mx-auto">
            <div className="max-w-7xl mx-auto p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded shadow-md space-y-4 mb-6">
                    {currentMode === "view" ? (
                      <h1 className="text-xl font-bold text-gray-800">
                        {job.title}
                      </h1>
                    ) : (
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={editedJob.title}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        {currentMode === "view" ? (
                          <span>
                            {formatVND(job.fromSalary)} -{" "}
                            {formatVND(job.toSalary)}
                          </span>
                        ) : (
                          <div className="flex items-center gap-1 w-full">
                            <input
                              type="number"
                              name="fromSalary"
                              value={editedJob.fromSalary}
                              onChange={handleInputChange}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Từ lương"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                              type="number"
                              name="toSalary"
                              value={editedJob.toSalary}
                              onChange={handleInputChange}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Đến lương"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {currentMode === "view" ? (
                          <span>{job.location}</span>
                        ) : (
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={editedJob.location}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        {currentMode === "view" ? (
                          <span>{job.experience}</span>
                        ) : (
                          <input
                            type="text"
                            id="experience"
                            name="experience"
                            value={editedJob.experience}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-600" />
                        {currentMode === "view" ? (
                          <span>{job.industry}</span>
                        ) : (
                          <select
                            id="type"
                            name="industry"
                            value={editedJob.industry}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                          >
                            <option value="Toàn thời gian">
                              Toàn thời gian
                            </option>
                            <option value="Bán thời gian">Bán thời gian</option>
                          </select>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-600" />
                        {currentMode === "view" ? (
                          <span>
                            {new Date(job.effectiveDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <input
                            type="date"
                            value={
                              new Date(editedJob.effectiveDate)
                                .toISOString()
                                .split("T")[0]
                            }
                            disabled
                            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm bg-gray-100 text-gray-700"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-600" />
                        {currentMode === "view" ? (
                          <span>{getStatusDisplayText(job.status)}</span>
                        ) : (
                          <select
                            id="status"
                            name="status"
                            value={editedJob.status}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                          >
                            <option value="Approved">Đã duyệt</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded shadow-md">
                    {currentMode === "view" ? (
                      <div className="mb-1">
                        <JobDescriptionSection description={job.description} />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Mô tả*
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              rows={5}
                              className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 resize-none shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Nhập mô tả"
                              defaultValue={description.join("\n")}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="requirements"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Yêu cầu*
                            </label>
                            <textarea
                              id="requirements"
                              name="requirements"
                              rows={4}
                              className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 resize-none shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Nhập yêu cầu"
                              defaultValue={requirements.join("\n")}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="benefits"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Quyền lợi*
                            </label>
                            <textarea
                              id="benefits"
                              name="benefits"
                              rows={4}
                              className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 resize-none shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Nhập quyền lợi"
                              defaultValue={benefits.join("\n")}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src="https://cdn.logo.com/hotlink-ok/logo-social.png"
                        alt="Company Logo"
                        className="w-14 h-14 object-cover rounded-md border"
                      />
                      <div>
                        <h3 className="text-base font-semibold">
                          {company && company.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {company && company.address}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {" "}
                          {company && company.employeeCount} nhân viên
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>Ngành: Chưa cập nhật</span>
                      </div>
                    </div>
                  </div>

                  {/* Thông tin chung */}
                  <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                      Thông tin chung
                    </h2>
                    <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>Cấp bậc: Nhân viên</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>Học vấn: Đại học trở lên</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Số lượng: 2 người</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{job.industry}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Giới tính: Nam, Nữ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* {currentMode === "view" && (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      Công việc liên quan
                    </h2>
                    <a
                      href="/employer/manage/jobs"
                      className="text-blue-600 text-sm"
                    >
                      Xem tất cả
                    </a>
                  </div>
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <JobCard
                        key={job.id}
                        title={job.title}
                        type={job.industry || "Không rõ loại hình"} // Bán thời gian / Toàn thời gian
                        mode="Onsite" // Hoặc job.mode nếu có
                        exp={`${job.experience || "Không yêu cầu"} năm`}
                        href="/employer/manage/jobs"
                      />
                    ))}
                  </div>
                </div>
              )} */}

              <div className="flex justify-end gap-3">
                <button
                  onClick={
                    currentMode === "view"
                      ? onClose
                      : () => {
                          setCurrentMode("view");
                        }
                  }
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white text-sm shadow-sm transition hover:bg-gray-100 hover:shadow-md"
                >
                  {currentMode === "view" ? "Đóng" : "Huỷ"}
                </button>
                <button
                  onClick={
                    currentMode === "view" ? toggleEditMode : () => handleSave()
                  }
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                  {currentMode === "view" ? "✏️ Chỉnh sửa" : "Lưu"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
