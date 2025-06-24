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
} from "lucide-react";
import parse from "html-react-parser";
import { formatVND } from "@/helpers";
import { getStatusDisplayText } from "@/app/employer/manage/applied-candidates/page";

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
  return <div className="space-y-6">{parse(description)}</div>;
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

  console.log(job);

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
    setEditedJob({ ...editedJob, [name]: value });
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

      if (child.tagName !== "UL" && currentKey) {
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

  console.log(description, "description");

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
          {currentMode === "view" ? (
            /* View Mode */
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={toggleEditMode}
                    className="p-2 rounded-full hover:bg-gray-100 text-blue-600"
                    title="Edit job"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 text-red-600"
                    title="Delete job"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Chi tiết công việc
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Địa chỉ</div>
                        <div className="text-gray-600">{job.location}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Department</div>
                        <div className="text-gray-600">{job.department}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Loại công việc</div>
                        <div className="text-gray-600">{job.industry}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Kinh nghiệm</div>
                        <div className="text-gray-600">{job.experience}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Chi tiết bài đăng
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Ngày đăng</div>
                        <div className="text-gray-600">
                          {new Date(job.effectiveDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Người nộp đơn</div>
                        <div className="text-gray-600">
                          {job.applicants} người nộp đơn
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Mức lương</div>
                        <div className="text-gray-600">
                          {formatVND(job.fromSalary)} -{" "}
                          {formatVND(job.toSalary)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div
                        className={`h-5 w-5 rounded-full ${
                          job.status === "active"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        } mt-0.5`}
                      ></div>
                      <div>
                        <div className="font-medium">Trạng thái</div>
                        <div className="text-gray-600 capitalize">
                          {getStatusDisplayText(job.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <JobDescriptionSection description={job.description} />
              </div>

              {/* <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Yêu cầu</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    Bachelor's degree in {job.department} or related field
                  </li>
                  <li>{job.experience} of experience in a similar role</li>
                  <li>Strong communication and collaboration skills</li>
                  <li>Ability to work in a fast-paced environment</li>
                  <li>Passion for creating exceptional user experiences</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Quyền lợi</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Competitive salary and benefits package</li>
                  <li>Flexible working arrangements</li>
                  <li>Professional development opportunities</li>
                  <li>Collaborative and innovative work environment</li>
                </ul>
              </div> */}

              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Đóng
                </button>
                <button
                  onClick={toggleEditMode}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">CHỈNH SỬA</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tên công việc*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={editedJob.title}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Department*
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={editedJob.department}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Địa chỉ*
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={editedJob.location}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Loại công việc*
                    </label>
                    <select
                      id="type"
                      name="industry"
                      value={editedJob.industry}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="Toàn thời gian">Toàn thời gian</option>
                      <option value="Bán thời gian">Bán thời gian</option>
                    </select>
                  </div>

                  {/* <div>
                    <label
                      htmlFor="workType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Work Type*
                    </label>
                    <select
                      id="workType"
                      name="workType"
                      value={editedJob.workType}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div> */}

                  {/* <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Experience Level*
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={editedJob.experience}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div> */}

                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Trạng thái*
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={editedJob.status}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="Approved">Kích hoạt</option>
                      {/* <option value="Rejected">Từ chối</option> */}
                    </select>
                  </div>
                </div>

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
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Nhập quyền lợi"
                    defaultValue={benefits.join("\n")}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setCurrentMode("view")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
