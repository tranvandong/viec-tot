"use client";

import type React from "react";

import { useCallback, useEffect, useState } from "react";
import { BookmarkIcon, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select as RadixSelect,
  Slider,
  RadioGroup,
  Button,
  Flex,
} from "@radix-ui/themes";
import {
  useApi,
  useCreate,
  useCustom,
  useDelete,
  useList,
} from "@/hooks/useDataProvider";
import { handleSlug } from "@/helpers";
import { on } from "events";
import Image from "next/image";
import { dataProvider } from "@/providers/dataProvider";
import Link from "next/link";
import dayjs from "@/lib/dayjs";
import { CrudFilters, Join } from "@/providers/types/IDataContext";
import { useAuth } from "@/providers/contexts/AuthProvider";
import { JobPost } from "@/providers/types/definition";

export default function JobResult() {
  const { applicant, authorized } = useAuth();
  const jobExpand: Join[] = ["Organization"];
  authorized &&
    jobExpand.push({
      name: "favorites",
      filters: [
        {
          field: "ApplicantId",
          operator: "eq",
          value: applicant?.id,
          isUuid: true,
        },
      ],
    });

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
  const district = searchParams?.get("district");
  const province = searchParams?.get("province");
  const jobTitle =
    searchParams?.get("job") || searchParams?.get("categoryName");
  const jobFilters = [];
  if (district) {
    jobFilters.push({
      field: "dmHuyenCode",
      operator: "eq",
      value: district,
    });
  }
  if (province) {
    jobFilters.push({
      field: "dmTinhCode",
      operator: "eq",
      value: province,
    });
  }
  if (jobTitle) {
    jobFilters.push({
      field: "title",
      operator: "contains",
      value: jobTitle,
    });
  }
  console.log("jobFilters", jobFilters);

  const {
    data: jobData,
    filters,
    setFilters,
    refetch: refetchJobs,
    isLoading: isLoadingJobs,
    isFetching: isFetchingJobs,
  } = useList<JobPost>({
    resource: "Jobs",
    // queryOptions: { enabled: false },
    filters: jobFilters,
    meta: { join: jobExpand },
  });

  const { data } = useList({ resource: "DMCategories" });
  const dmViecLams = data?.data || [];
  const locationParam = searchParams?.get("location") || "";
  const provinceCode = locationParam?.includes(",")
    ? locationParam.split(",")[1]
    : locationParam;

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

      // Remove specified keys
      removeKeys.forEach((key) => {
        sParams.delete(key);
      });

      // Add/update params
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
    // setFilters((prevFilter: CrudFilters) => {
    //   const newFilter: CrudFilters = [...prevFilter];
    //   const jobTypeFilter = newFilter.find(
    //     (filter: any) => filter.field === "industry" && filter.operator === "eq"
    //   );
    //   // Remove existing jobType filter if it exists
    //   if (jobTypeFilter) {
    //     newFilter.splice(newFilter.indexOf(jobTypeFilter), 1);
    //   } else if (value) {
    //     newFilter.push({
    //       field: "industry",
    //       operator: "eq",
    //       value: value,
    //     });
    //   }
    //   return newFilter;
    // });
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
    const queryString = createQueryString({
      salary_from: salaryMin,
      salary_to: salaryMax,
      salary: target.value,
    });

    setSalary(target.value);
    router.push(`${pathName}?${queryString}#search-results`);
  };

  useEffect(() => {
    if (searchParams?.get("category")) {
      console.log("lv", extractJobTitle(pathName || ""));
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
    router.push(`${pathName}?${queryString}`);
  };

  useEffect(() => {
    const salaryMin = searchParams?.get("salary_from");
    const salaryMax = searchParams?.get("salary_to");
    const experienceMin = searchParams?.get("experience_from");
    const experienceMax = searchParams?.get("experience_to");
    const jobType = searchParams?.get("jobType");
    setFilters((prevFilter: CrudFilters) => {
      const newFilter: CrudFilters = [...prevFilter];
      const salaryFromFilter = newFilter.find(
        (filter: any) =>
          filter.field === "fromSalary" && filter.operator === "gte"
      );
      // Remove existing salary filter if it exists
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
      // Remove existing salary filter if it exists
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
      // Remove existing experience filter if it exists
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
      // Remove existing experience filter if it exists
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
      // Remove existing jobType filter if it exists
      if (jobTypeFilter) {
        newFilter.splice(newFilter.indexOf(jobTypeFilter), 1);
      } else if (jobType) {
        newFilter.push({
          field: "industry",
          operator: "eq",
          value: jobType,
        });
      }
      return newFilter;
    });
  }, [searchParams]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-fit">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Bộ lọc
            </h3>
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
                    <RadioGroup.Item
                      value="2"
                      data-from="5"
                      data-to="10"
                      id="r1"
                    >
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
                aria-label="View Job Type"
                color="orange"
                variant="classic"
                style={{ gap: "8px" }}
                value={experience}
                // onValueChange={onChangeExperience}
                // onChange={onChangeExperience}
                onClick={onChangeExperience}
                // onChange={onChangeExperience}
              >
                <div className="flex items-center">
                  <RadioGroup.Item
                    value="0-1"
                    id="0-1"
                    data-to="1"
                    data-from="0"
                  >
                    Dưới 1 năm
                  </RadioGroup.Item>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item
                    value="1-3"
                    id="r1"
                    data-to="3"
                    data-from="1"
                  >
                    1-3 năm
                  </RadioGroup.Item>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item
                    value="3-5"
                    id="r2"
                    data-to="5"
                    data-from="3"
                  >
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

        {/* Job Listings */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-gray-600 dark:text-gray-300 ">
                  Tuyển dụng{" "}
                  <span className="font-semibold">{jobData?.total}</span> việc
                  làm{" "}
                  <span className="font-semibold">
                    {searchParams?.get("job") ||
                      searchParams?.get("categoryName")}
                  </span>{" "}
                  {searchParams?.get("locationName") ? "tại " : ""}
                  <span className="font-semibold">
                    {searchParams?.get("locationName")}
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Sắp xếp theo
                </span>
                <RadixSelect.Root defaultValue="newest">
                  <RadixSelect.Trigger />
                  <RadixSelect.Content>
                    <RadixSelect.Item value="relative">
                      Liên quan
                    </RadixSelect.Item>
                    <RadixSelect.Item value="newest">Mới nhất</RadixSelect.Item>
                  </RadixSelect.Content>
                </RadixSelect.Root>
              </div>
            </div>

            <div className="space-y-4">
              {jobData?.data.map((job) => (
                <div
                  key={`${job.id}-${job?.favorites?.length}`}
                  className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
                  // onClick={(e) => openJobModal(job, e)}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            job?.organization?.filePaths &&
                            job.organization.filePaths.length > 0
                              ? dataProvider.getSource(
                                  job.organization!.filePaths[0]
                                )
                              : "/placeholder.svg"
                          }
                          alt={job.organizationId}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link href={`/job/${job.id}`}>
                          <h3 className="font-semibold text-lg dark:text-white">
                            {job.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {job?.organization?.name} • {job.location}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                            {job.industry}
                          </span>
                          {/* <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                              {job.shift === "Remote"
                                ? "Từ xa"
                                : job.shift === "Onsite"
                                ? "Tại văn phòng"
                                : "Kết hợp"}
                            </span> */}
                          <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                            {job.experience}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      {/* <button
                          onClick={(e) => toggleSaveJob(job.id, e)}
                          className="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 mb-2"
                          aria-label="Lưu việc làm"
                        >
                          {savedJobs.includes(job.id) ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button> */}
                      <div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm"></span>
                        <span className="font-semibold text-blue-500">
                          {" "}
                          {job.fromSalary} - {job.toSalary} VND
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {dayjs(job.createdDate).fromNow()} • {job.views} lượt
                        xem
                      </span>
                    </div>

                    {/* <Button
                      variant="surface"
                      onClick={(evt) => toggleFavorite(job, evt)}
                    >
                      <BookmarkIcon
                        width={18}
                        height={18}
                        fill={
                          job?.favorites?.length !== undefined &&
                          job.favorites.length > 0
                            ? "#3b82f6"
                            : "none"
                        }
                      />
                    </Button> */}
                    <JobBookmark favorites={job.favorites} jobId={job.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function JobBookmark({
  favorites = [],
  jobId,
  onSuccess,
}: {
  favorites?: any[];
  jobId: string;
  onSuccess?: () => void;
}) {
  const [isFavorite, setIsFavorite] = useState(favorites.length > 0);
  const { authorized } = useAuth();
  const { mutate: createFavorite } = useCreate({
    resource: "Favorites",
    meta: { config: { auth: "auth", subSystem: "buss" } },
    onSuccess: () => {
      onSuccess && onSuccess();
      setIsFavorite(true);
    },
  });

  const { mutate: deleteFavorite } = useDelete({
    resource: "Favorites",
    meta: { config: { auth: "auth", subSystem: "buss" } },
    onSuccess: () => {
      onSuccess && onSuccess();
      setIsFavorite(false);
    },
  });

  const toggleFavorite = (
    favorites: any[],
    evt: React.MouseEvent<HTMLButtonElement>
  ) => {
    evt.stopPropagation();

    if (isFavorite) {
      deleteFavorite(jobId);
    } else {
      createFavorite({ jobId });
    }
  };
  if (!authorized) {
    return null;
  }
  return (
    <Button variant="surface" onClick={(evt) => toggleFavorite(favorites, evt)}>
      <BookmarkIcon
        width={18}
        height={18}
        fill={isFavorite ? "#3b82f6" : "none"}
      />
    </Button>
  );
}
