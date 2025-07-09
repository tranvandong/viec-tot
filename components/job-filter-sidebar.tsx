"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select as RadixSelect,
  Slider,
  RadioGroup,
  Flex,
} from "@radix-ui/themes";
import { useList } from "@/hooks/useDataProvider";
import { formatVND, handleSlug } from "@/helpers";
import { CrudFilters } from "@/providers/types/IDataContext";
import { useQueryString } from "@/hooks/use-query-string";

interface JobFilterSidebarProps {
  setFilters: React.Dispatch<React.SetStateAction<CrudFilters>>;
  setSorters: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function JobFilterSidebar({
  setFilters,
  setSorters,
}: JobFilterSidebarProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const qs = useQueryString();

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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const createQueryString = useCallback(
    (
      params: Record<string, string | undefined | null>,
      removeKeys: string[] = []
    ) => {
      const sParams = new URLSearchParams(searchParams?.toString());

      removeKeys.forEach((key) => {
        sParams.delete(key);
      });

      Object.entries(params).forEach(([name, value]) => {
        if (value === undefined || value === "" || value === null) {
          sParams.delete(name);
        } else {
          sParams.set(name, value);
        }
      });

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
    let remaining = slug.substring(prefix.length);
    const taiIndex = remaining.indexOf("-tai");
    if (taiIndex !== -1) {
      remaining = remaining.substring(0, taiIndex);
    }
    return remaining;
  }

  const onChangeJobType = (value: string) => {
    const queryString = createQueryString({ jobType: value });
    setJobType(value);
    router.push(`${pathName}?${queryString}#search-results`);
  };

  const onChangeExperience = (evt: React.SyntheticEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLInputElement;
    const experienceFrom = target.getAttribute("data-from");
    const experienceTo = target.getAttribute("data-to");
    const queryString = createQueryString({
      experience_from: experienceFrom,
      experience_to: experienceTo,
      experience: target.value,
    });
    setExperience(target.value);
    router.push(`${pathName}?${queryString}#search-results`);
  };

  const onChangeSalary = (evt: React.SyntheticEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLInputElement;
    let salaryMin = target.getAttribute("data-from");
    let salaryMax = target.getAttribute("data-to");
    if (target.value === "custom") {
      [salaryMin, salaryMax] = salaryRange.map((v) => v.toString());
    }
    const salaryQuery: Record<string, any> = { salary: target.value };
    const salaryRemoveKeys = [];
    if (salaryMin) {
      salaryQuery.salary_from = salaryMin;
    } else {
      salaryRemoveKeys.push("salary_from");
    }
    if (salaryMax) {
      salaryQuery.salary_to = salaryMax;
    } else {
      salaryRemoveKeys.push("salary_to");
    }
    const queryString = createQueryString(salaryQuery, salaryRemoveKeys);
    setSalary(target.value);
    router.push(`${pathName}?${queryString}#search-results`);
  };

  useEffect(() => {
    if (searchParams?.get("category")) {
      setLinhVuc(extractJobTitle(pathName || ""));
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
      "salary_from",
      "salary_to",
      "experience_from",
      "experience_to",
      "categoryName",
    ]);
    router.push(`/find-jobs?${queryString}`);
  };

  const onChangeSalaryRange = (value: number[]) => {
    setSalaryRange(value);
    const salaryFrom = value[0] / 1000000;
    const salaryTo = value[1] / 1000000;
    const queryString = createQueryString(
      {
        salary_from: `${salaryFrom}`,
        salary_to: `${salaryTo}`,
      },
      ["salary", "salaryRange"]
    );
    setSalary("custom");
    router.push(`${pathName}?${queryString}#search-results`);
  };

  const salaryMin = searchParams?.get("salary_from");
  const salaryMax = searchParams?.get("salary_to");
  const experienceMin = searchParams?.get("experience_from");
  const experienceMax = searchParams?.get("experience_to");
  const jobTypeParam = searchParams?.get("jobType");

  useEffect(() => {
    setFilters((prevFilter: CrudFilters) => {
      const newFilter: CrudFilters = [...prevFilter];
      const salaryFromFilter = newFilter.find(
        (filter: any) =>
          filter.field === "fromSalary" && filter.operator === "gte"
      );
      if (salaryFromFilter) {
        newFilter.splice(newFilter.indexOf(salaryFromFilter), 1);
      }
      if (salaryMin) {
        newFilter.push({
          field: "fromSalary",
          operator: "gte",
          value: +salaryMin * 1000000,
        });
      }
      const salaryToFilter = newFilter.find(
        (filter: any) =>
          filter.field === "toSalary" && filter.operator === "lte"
      );
      if (salaryToFilter) {
        newFilter.splice(newFilter.indexOf(salaryToFilter), 1);
      }
      if (salaryMax) {
        newFilter.push({
          field: "toSalary",
          operator: "lte",
          value: +salaryMax * 1000000,
        });
      }
      const experienceFromFilter = newFilter.find(
        (filter: any) =>
          filter.field === "experience" && filter.operator === "gte"
      );
      if (experienceFromFilter) {
        newFilter.splice(newFilter.indexOf(experienceFromFilter), 1);
      }
      if (experienceMin) {
        newFilter.push({
          field: "experience",
          operator: "gte",
          value: experienceMin,
        });
      }
      const experienceToFilter = newFilter.find(
        (filter: any) =>
          filter.field === "experience" && filter.operator === "lte"
      );
      if (experienceToFilter) {
        newFilter.splice(newFilter.indexOf(experienceToFilter), 1);
      }
      if (experienceMax) {
        newFilter.push({
          field: "experience",
          operator: "lte",
          value: experienceMax,
        });
      }
      const jobTypeFilter = newFilter.find(
        (filter: any) => filter.field === "industry" && filter.operator === "eq"
      );
      if (jobTypeFilter) {
        newFilter.splice(newFilter.indexOf(jobTypeFilter), 1);
      }
      if (jobTypeParam) {
        newFilter.push({
          field: "industry",
          operator: "eq",
          value: jobTypeParam,
        });
      }
      return newFilter;
    });
  }, [
    salaryMin,
    salaryMax,
    experienceMin,
    experienceMax,
    jobTypeParam,
    setFilters,
  ]);

  const sortValue = searchParams?.get("sort");
  useEffect(() => {
    const sortValue = searchParams?.get("sort");
    if (sortValue === "newest") {
      setSorters([{ field: "effectiveDate", order: "desc" }]);
    } else {
      setSorters([]);
    }
  }, [sortValue, setSorters]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-fit">
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
            style={{ width: "100%" }}
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
              aria-label="View Job Type"
              color="orange"
              variant="classic"
              style={{ gap: "8px" }}
              value={salary}
              onClick={onChangeSalary}
            >
              <div className="flex items-center">
                <RadioGroup.Item
                  value="1"
                  id="0-50000000"
                  data-from="0"
                  data-to="5"
                >
                  Dưới 5.000.000đ
                </RadioGroup.Item>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item value="2" data-from="5" data-to="10" id="r1">
                  5.000.000đ - 10.000.000đ
                </RadioGroup.Item>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item
                  value="gt-10000000"
                  id="r2"
                  data-from="10"
                  data-to="100"
                >
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
                onValueChange={onChangeSalaryRange}
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
            aria-label="View Job Type"
            color="orange"
            variant="classic"
            style={{ gap: "8px" }}
            value={experience}
            onClick={onChangeExperience}
          >
            <div className="flex items-center">
              <RadioGroup.Item value="0-1" id="0-1" data-to="1" data-from="0">
                Dưới 1 năm
              </RadioGroup.Item>
            </div>
            <div className="flex items-center">
              <RadioGroup.Item value="1-3" id="r1" data-to="3" data-from="1">
                1-3 năm
              </RadioGroup.Item>
            </div>
            <div className="flex items-center">
              <RadioGroup.Item value="3-5" id="r2" data-to="5" data-from="3">
                3-5 năm
              </RadioGroup.Item>
            </div>

            <div className="flex items-center">
              <RadioGroup.Item
                value="5-10"
                id="r4"
                data-to="10"
                data-from="5"
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
