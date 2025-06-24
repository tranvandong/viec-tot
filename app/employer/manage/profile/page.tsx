"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Briefcase, Camera, Globe, MapPin, Pencil, Users } from "lucide-react";
import ProvinceSelect from "@/components/ProvinceSelect";
import { useList, useUpdateNew } from "@/hooks/useDataProvider";
import { JobPost, Organization } from "@/providers/types/definition";
import {
  combineCompanyIntroHtml,
  parseCompanyIntro,
} from "./companyIntroUtils";
import parse from "html-react-parser";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

export default function CompanyProfile() {
  const { data, reload } = useList<Organization>({
    resource: "Organizations/GetByUser",
    meta: { config: { auth: "allow" } },
    pagination: undefined,
  });

  const {
    data: job,
    pageCount,
    pagination,
    setPage,
  } = useList<JobPost>({
    resource: "Jobs",
  });
  const jobs = job?.data || [];
  console.log("Jobs data:", jobs);
  console.log(job);

  const [formData, setFormData] = useState<Organization>();

  useEffect(() => {
    setFormData(data?.data);
  }, [data]);

  const [isEditing, setIsEditing] = useState(false);

  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
  );
  const [logoImage, setLogoImage] = useState(
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  );

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate: updateInfo } = useUpdateNew({
    resource: "Organizations",
    id: `(${formData?.id})`,
    meta: {
      config: {
        subSystem: "buss",
        auth: "allow",
      },
    },
  });

  // Handle job update
  const handleJobUpdate = (updatedJob: any) => {
    const {
      description,
      name,
      website,
      employeeCount,
      address,
      ...newSelectedJob
    } = updatedJob;
    updateInfo(
      { description, name, website, employeeCount, address },
      {
        onSuccess: (data) => {
          toast({
            description:
              data?.message || "Cập nhật thông tin công việc thành công",
            title: "Cập nhật thành công",
            type: "background",
            variant: "success",
          });
          reload?.();
        },
        onError: (err: any) => {
          toast({
            description:
              err?.response?.data?.message ||
              "Cập nhật thông tin công việc thất bại",
            title: "Cập nhật thất bại",
            type: "background",
            variant: "warning",
          });
          console.error("Cập nhật lỗi:", err);
        },
      }
    );
  };

  const handleEditClick = () => {
    if (isEditing) {
      const updatedDescriptionHtml = combineCompanyIntroHtml();
      const updatedJob = {
        ...formData,
        description: updatedDescriptionHtml,
      };

      handleJobUpdate(updatedJob);
    }
    setIsEditing(!isEditing);
  };

  const sections = {
    intro: "Giới thiệu",
    vision: "Tầm nhìn & Sứ mệnh",
    coreValues: "Giá trị cốt lõi",
    services: "Sản phẩm & Dịch vụ",
    contact: "Liên hệ",
  };

  const parsedSections = parseCompanyIntro(formData?.description || "");

  if (!formData) {
    return;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Image */}
      <div className="relative w-full h-64 overflow-hidden group">
        <Image src={coverImage} alt="cover" fill className="object-cover" />
        {isEditing && (
          <>
            <div className="absolute inset-0 bg-black/30 group-hover:flex items-center justify-center hidden">
              <button
                onClick={() => coverInputRef.current?.click()}
                className="text-white bg-black/50 p-2 rounded-full"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  const url = URL.createObjectURL(e.target.files[0]);
                  setCoverImage(url);
                }
              }}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Info Card */}
      <div className="relative bg-white rounded-xl shadow-lg p-6 mt-[-3rem] mx-auto max-w-4xl">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Image
              src={logoImage}
              alt="logo"
              width={100}
              height={100}
              className="rounded-md border"
            />
            {isEditing && (
              <>
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
                >
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={logoInputRef}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const url = URL.createObjectURL(e.target.files[0]);
                      setLogoImage(url);
                    }
                  }}
                  className="hidden"
                />
              </>
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-2xl font-semibold w-full border rounded px-2 py-1"
                />
                {/* <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 text-gray-600 w-full border rounded px-2 py-1"
                /> */}
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold">{formData.name}</h1>
                {/* <p className="text-gray-600">{formData.description}</p> */}
              </>
            )}

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
              <InfoItem
                icon={<Globe className="w-4 h-4" />}
                name="website"
                value={formData.website ?? "Chưa cập nhật"}
                isEditing={isEditing}
                onChange={handleChange}
              />
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <ProvinceSelect
                    value={formData.address}
                    onChange={(value) =>
                      setFormData({ ...formData, address: value })
                    }
                    className="flex-1"
                    label="" // Không cần label vì đã có icon
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span>{formData.address}</span>
                </div>
              )}
              <InfoItem
                icon={<Users className="w-4 h-4" />}
                name="employeeCount"
                value={formData.employeeCount}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <InfoItem
                icon={<Briefcase className="w-4 h-4" />}
                name="industry"
                value={formData.industry ?? "Giám đốc"}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button className="ml-auto" onClick={handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left */}
        <div className="md:col-span-2">
          {/* About */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            {/* {isEditing ? (
              <textarea
                name="about"
                value={formData.description ?? "Chưa cập nhật"}
                onChange={handleChange}
                rows={6}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            ) : (
              <p className="text-gray-700 text-sm">{formData.description}</p>
            )} */}
            {isEditing ? (
              <div className="space-y-4">
                {Object.entries(sections).map(([key, label]) => (
                  <div key={key} className="mb-4">
                    <label
                      htmlFor={key}
                      className="block text-base font-semibold text-gray-800 mb-2"
                    >
                      {label}
                    </label>
                    <textarea
                      id={key}
                      name={key}
                      rows={5}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={`Nhập ${label.toLowerCase()}`}
                      defaultValue={
                        parsedSections[key as keyof typeof parsedSections]
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">{parse(formData.description)}</div>
            )}
          </div>

          {/* Jobs */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Công việc từ {formData.name}
              </h2>
              <a href="/employer/manage/jobs" className="text-blue-600 text-sm">
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
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* People */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Nhân viên tại {formData.name}
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Trần Quanh Ánh</strong> – Nhà sáng lập
              </li>
              <li>
                <strong>Trần Thùy Linh</strong> – Đồng sáng lập
              </li>
              <li>
                <strong>Phạm Quốc Duy</strong> – Thiết kế giao diện
              </li>
              <li>
                <strong>Võ Kim Anh</strong> – Minh họa & Hình ảnh
              </li>
            </ul>
            <Button variant="outline" className="mt-4 w-full text-sm">
              Show All
            </Button>
          </div>

          {/* Related Companies */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Người dùng cũng xem</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>FPT Software – Hà Nội</li>
              <li>VNG Corporation – TP. Hồ Chí Minh</li>
              <li>MoMo – TP. Hồ Chí Minh</li>
              <li>VNPT – Hà Nội</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  name,
  value,
  isEditing,
  onChange,
}: {
  icon: React.ReactNode;
  name: string;
  value: string | null;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value ?? ""}
          onChange={onChange}
          className="border rounded px-3 py-2 text-sm w-[207px]"
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}

function JobCard({
  title,
  type,
  mode,
  exp,
  href,
}: {
  title: string;
  type: string;
  mode: string;
  exp: string;
  href: string;
}) {
  return (
    <div className="border border-gray-200 rounded-md p-4 text-sm">
      <h3 className="font-semibold text-base mb-1">
        <a href={href} className="hover:underline text-blue-600">
          {title}
        </a>
      </h3>
      <p className="text-gray-600">
        {type} · {mode} · {exp}
      </p>
    </div>
  );
}
