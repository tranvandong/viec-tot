"use client";

import type React from "react";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select as RadixSelect, Slider, RadioGroup } from "@radix-ui/themes";
import { useList } from "@/hooks/useDataProvider";
import { handleSlug } from "@/helpers";
import { on } from "events";

export default function JobFilter({
  onChange,
}: {
  onChange?: (value: any) => void;
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [linhVuc, setLinhVuc] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    rangeSalary: true,
    experience: true,
  });

  const [salaryRange, setSalaryRange] = useState([10000000, 500000000]);
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");

  const { data } = useList({ resource: "DMCategories" });
  const dmViecLams = data?.data || [];

  const locationParam = searchParams?.get("location");
  const provinceCode = locationParam?.includes(",")
    ? locationParam.split(",")[1]
    : locationParam;

  const { data: provinceData, refetch } = useList({
    resource: "DMTinhs",
    filters: provinceCode
      ? [{ field: "code", operator: "eq", value: provinceCode }]
      : [],
    meta: { join: ["DMHuyens"] },
    queryOptions: { enabled: false },
  });
  const provinces = provinceData?.data || [];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const createQueryString = useCallback(
    (params: Record<string, string | undefined>, removeKeys: string[] = []) => {
      const sParams = new URLSearchParams(searchParams?.toString());

      // Remove specified keys
      removeKeys.forEach((key) => {
        sParams.delete(key);
      });

      // Add/update params
      Object.entries(params).forEach(([name, value]) => {
        if (value === undefined || value === "") {
          sParams.delete(name);
        } else {
          sParams.set(name, value);
        }
      });
      console.log("sParams", sParams);

      return sParams.toString();
    },
    [searchParams]
  );

  const onChangeLinhVuc = (value: any) => {
    let slug = "";
    if (value) {
      const linhVuc = dmViecLams.find(
        (dmViecLam: any) => dmViecLam.code === value
      );
      const queryString = createQueryString(
        {
          category: value,
          categoryName: linhVuc?.name,
        },
        ["job"]
      );
      slug += `tim-viec-lam-${handleSlug(linhVuc?.code)}?${queryString}`;
    }
    router.push(`/${slug}`);
  };

  function extractJobTitle(slug: string) {
    const prefix = "/tim-viec-lam-";

    if (!slug.startsWith(prefix)) return "";

    // Cắt phần sau "tim-viec-lam-"
    let remaining = slug.substring(prefix.length);

    // Tìm vị trí "-tai" nếu có
    const taiIndex = remaining.indexOf("-tai");
    if (taiIndex !== -1) {
      remaining = remaining.substring(0, taiIndex);
    }

    return remaining;
  }

  const onChangeJobType = (value: string) => {
    const queryString = createQueryString({ jobType: value });
    setJobType(value);
    router.push(`${pathName}?${queryString}`);
  };

  const onChangeExperience = (value: string) => {
    const queryString = createQueryString({ experience: value });
    setExperience(value);
    router.push(`${pathName}?${queryString}`);
  };

  const onChangeSalary = (value: string) => {
    const salaryQuery: any = { salary: value };
    const removeKeys = [];
    if (value === "custom") {
      salaryQuery.salaryRange = salaryRange.join(",");
    } else {
      removeKeys.push("salaryRange");
    }
    const queryString = createQueryString(salaryQuery, removeKeys);
    setSalary(value);
    router.push(`${pathName}?${queryString}`);
  };

  useEffect(() => {
    const category = searchParams?.get("category");
    if (category) {
      setLinhVuc(category);
    } else {
      setLinhVuc("");
    }
    searchParams?.get("jobType") &&
      setJobType(searchParams?.get("jobType") || "");
    searchParams?.get("salary") && setSalary(searchParams?.get("salary") || "");
    searchParams?.get("experience") &&
      setExperience(searchParams.get("experience") || "");
  }, [pathName, searchParams]);

  const onRemoveAll = () => {
    setLinhVuc("");
    setJobType("");
    setSalary("");
    setExperience("");
    setSalaryRange([10000000, 500000000]);
    const queryString = createQueryString({}, [
      "category",
      "jobType",
      "salary",
      "experience",
      "salaryRange",
      "categoryName",
      "locationName",
    ]);

    router.push(`/find-jobs?${queryString}`);
  };

  useEffect(() => {
    const locationParam = searchParams?.get("location") || "";
    if (locationParam) {
      refetch();
    }
  }, [searchParams]);

  return (
    <div className="md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-gray-800 dark:text-white">Bộ lọc</h3>
        <button className="text-blue-500 text-sm" onClick={onRemoveAll}>
          Xóa tất cả
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("experience")}
        >
          <h4 className="font-medium text-gray-800 dark:text-white">
            Lĩnh vực công việc
          </h4>
        </div>

        <RadixSelect.Root onValueChange={onChangeLinhVuc} value={linhVuc}>
          <RadixSelect.Trigger
            placeholder="Chọn lĩnh vực"
            // className="min-w-full"
            style={{ width: "100%" }}
            value={linhVuc}
          />
          <RadixSelect.Content className="w-full">
            {dmViecLams.map((dmViecLam: any) => (
              <RadixSelect.Item
                key={dmViecLam.id}
                value={dmViecLam.code}
                className="w-full"
              >
                {dmViecLam.name}
              </RadixSelect.Item>
            ))}
          </RadixSelect.Content>
        </RadixSelect.Root>
      </div>

      {/* Job Type */}
      <div className="mb-6 border-b dark:border-gray-700 pb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("jobType")}
        >
          <h4 className="font-medium text-gray-800 dark:text-white">
            Loại công việc
          </h4>
          {expandedSections.jobType ? (
            <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </div>

        {expandedSections.jobType && (
          <RadioGroup.Root
            className="flex flex-col text-sm text-gray-700 dark:text-gray-300"
            defaultValue="contract"
            aria-label="View Job Type"
            color="orange"
            value={jobType}
            variant="classic"
            style={{ gap: "8px" }}
            onValueChange={onChangeJobType}
          >
            <div className="flex items-center">
              <RadioGroup.Item value="contract" id="contract">
                Hợp đồng
              </RadioGroup.Item>
            </div>
            <div className="flex items-center">
              <RadioGroup.Item value="fullTime" id="r1">
                Toàn thời gian
              </RadioGroup.Item>
            </div>
            <div className="flex items-center">
              <RadioGroup.Item value="partTime" id="r2">
                Bán thời gian
              </RadioGroup.Item>
            </div>

            <div className="flex items-center">
              <RadioGroup.Item
                value="intership"
                id="r4"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Thực tập
              </RadioGroup.Item>
            </div>
          </RadioGroup.Root>
        )}
      </div>

      {/* Open to remote */}
      {/* <div className="mb-6 border-b dark:border-gray-700 pb-6">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Chấp nhận làm từ xa
                </h4>s
                <button
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    isRemoteOpen
                      ? "bg-blue-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => setIsRemoteOpen(!isRemoteOpen)}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      isRemoteOpen ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div> */}

      {/* Range Salary */}
      <div className="mb-6 border-b dark:border-gray-700 pb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("rangeSalary")}
        >
          <h4 className="font-medium text-gray-800 dark:text-white">
            Mức lương
          </h4>
          {expandedSections.rangeSalary ? (
            <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </div>

        {expandedSections.rangeSalary && (
          <>
            <RadioGroup.Root
              className="flex flex-col text-sm text-gray-700 dark:text-gray-300"
              defaultValue="lt-50000000"
              aria-label="View Job Type"
              color="orange"
              variant="classic"
              style={{ gap: "8px" }}
              value={salary}
              onValueChange={onChangeSalary}
            >
              <div className="flex items-center">
                <RadioGroup.Item value="lt-50000000" id="0-50000000">
                  Dưới 5.000.000đ
                </RadioGroup.Item>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item value="5000000-10000000" id="r1">
                  5.000.000đ - 10.000.000đ
                </RadioGroup.Item>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item value="gt-10000000" id="r2">
                  Trên 10.000.000đ
                </RadioGroup.Item>
              </div>

              <div className="flex items-center">
                <RadioGroup.Item
                  value="custom"
                  id="r4"
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  Tùy chỉnh
                </RadioGroup.Item>
              </div>
            </RadioGroup.Root>

            {/* Salary Range Slider */}
            <div className="mt-6">
              <Slider
                min={1000000}
                max={100000000}
                defaultValue={salaryRange}
                value={salaryRange}
                onValueChange={setSalaryRange}
                step={1000000}
                color="orange"
              />

              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {salaryRange[0].toLocaleString("vi-VN")}đ
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {salaryRange[1].toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Experience */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("experience")}
        >
          <h4 className="font-medium text-gray-800 dark:text-white">
            Kinh nghiệm
          </h4>
          {expandedSections.experience ? (
            <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </div>

        {expandedSections.experience && (
          <RadioGroup.Root
            className="flex flex-col text-sm text-gray-700 dark:text-gray-300"
            defaultValue="0-1"
            aria-label="View Job Type"
            color="orange"
            variant="classic"
            style={{ gap: "8px" }}
            value={experience}
            onValueChange={onChangeExperience}
          >
            <div className="flex items-center">
              <RadioGroup.Item value="0-1" id="0-1">
                Dưới 1 năm
              </RadioGroup.Item>
            </div>
            <div className="flex items-center">
              <RadioGroup.Item value="1-3" id="r1">
                1-3 năm
              </RadioGroup.Item>
            </div>
            <div className="flex items-center">
              <RadioGroup.Item value="3-5" id="r2">
                3-5 năm
              </RadioGroup.Item>
            </div>

            <div className="flex items-center">
              <RadioGroup.Item
                value="5-10"
                id="r4"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                5-10 năm
              </RadioGroup.Item>
            </div>
          </RadioGroup.Root>
        )}
      </div>
    </div>
  );
}
