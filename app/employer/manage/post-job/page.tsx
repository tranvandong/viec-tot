"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  X,
  Banknote,
} from "lucide-react";
import { useCreate } from "@/hooks/useDataProvider";
import { JobPost } from "@/providers/types/definition";

export default function PostJobPage() {
  const router = useRouter();
  const { mutate } = useCreate<Partial<JobPost>>({
    resource: "Jobs",
  });
  const [formData, setFormData] = useState({
    title: "Bài đăng tuyển dụng số 1",
    description: "abc",
    location: "abc",
    shift: null,
    industry: null,
    fromSalary: 1000000,
    toSalary: 2000000,
    effectiveDate: "2025-05-11T17:00:00Z",
    expiredDate: "2025-05-12T17:00:00Z",
    status: "Approved",
    views: 0,
    isPublished: false,
    fileId: null,
    createdName: null,
    organizationId: "43d3275d-9742-45e1-8ebe-3e704366abda",
    dmXaCode: "00007",
    dmHuyenCode: "001",
    dmTinhCode: "01",
    createdDate: "2025-05-13T07:38:05.414579Z",
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.type === "number" ? Number(value) : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log({ ...formData, skills });
    mutate(
      { ...formData },
      {
        onSuccess(data, variables, context) {
          // Redirect to the employer dashboard
          router.push("/employer/manage/jobs");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Đăng việc làm mới</h1>
            <Link
              href="/employer/dashboard"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Cancel
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <form onSubmit={handleSubmit}>
              {/* Job Basics */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Cơ bản về công việc
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tên công việc*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="ví dụ: Kỹ sư phần mềm, Nhà thiết kế UX"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bộ phận
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="department"
                        name="industry"
                        value={formData.industry || ""}
                        onChange={handleChange}
                        placeholder="e.g. Design"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Địa điểm*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g. San Francisco, CA or Remote"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Chi tiết công việc
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <div>
                    <label
                      htmlFor="workType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Loại hình làm việc
                    </label>
                    <select
                      id="workType"
                      name="workType"
                      value={formData.shift || ""}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="onsite">On-site</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div> */}

                  <div>
                    <label
                      htmlFor="jobType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Loại công việc*
                    </label>
                    <select
                      id="jobType"
                      name="jobType"
                      value={formData.industry || ""}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  {/* <div>
                    <label
                      htmlFor="experienceLevel"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Experience Level*
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="entry-level">Entry Level</option>
                      <option value="mid-level">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive Level</option>
                    </select>
                  </div> */}
                  <div>
                    <label
                      htmlFor="expiredDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Application Deadline
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="expiredDate"
                        name="expiredDate"
                        value={formData.expiredDate}
                        onChange={handleChange}
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="applicationDeadline"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Application Deadline
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="applicationDeadline"
                        name="expiredDate"
                        value={formData.expiredDate}
                        onChange={handleChange}
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Salary Information */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Salary Information
                  </h2>
                  {/* <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showSalary"
                      name="showSalary"
                      checked={formData.showSalary}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="showSalary"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Show salary on job post
                    </label>
                  </div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="fromSalary"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Lương tối thiểu
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Banknote className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="fromSalary"
                        name="fromSalary"
                        value={formData.fromSalary || 0}
                        onChange={handleChange}
                        placeholder="e.g. 70000"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="toSalary"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Lương tối đa
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Banknote className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="toSalary"
                        name="toSalary"
                        value={formData.toSalary || ""}
                        onChange={handleChange}
                        placeholder="e.g. 50000"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/*<div>
                    <label
                      htmlFor="salaryPeriod"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Salary Period
                    </label>
                    <select
                      id="salaryPeriod"
                      name="salaryPeriod"
                      value={formData.salaryPeriod}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="yearly">Per Year</option>
                      <option value="monthly">Per Month</option>
                      <option value="hourly">Per Hour</option>
                    </select>
                  </div> */}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Required Skills
                </h2>
                <div className="flex gap-2 mb-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill (e.g. React, UX Design, Project Management)"
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Job Description
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Provide a detailed description of the job..."
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Responsibilities*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="List the key responsibilities for this role..."
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Tip: Use bullet points by starting each line with a dash
                      (-)
                    </p>
                  </div>

                  {/* <div>
                    <label
                      htmlFor="requirements"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Requirements*
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="List the qualifications and requirements for this role..."
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="benefits"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Benefits
                    </label>
                    <textarea
                      id="benefits"
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleChange}
                      rows={4}
                      placeholder="List the benefits and perks offered with this position..."
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div> */}
                </div>
              </div>

              {/* Additional Options */}
              {/* <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Additional Options
                </h2>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="activelyRecruiting"
                    name="activelyRecruiting"
                    checked={formData.activelyRecruiting}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="activelyRecruiting"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Show "Actively Recruiting" badge on job listing
                  </label>
                </div>
              </div> */}

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => router.push("/employer/manage/jobs")}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Đăng công việc
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
