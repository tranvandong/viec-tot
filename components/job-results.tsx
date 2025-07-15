"use client";

import type React from "react";

import { useCallback, useEffect, useState } from "react";
import { Bookmark, BookmarkIcon, Clock, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select as RadixSelect, Button, ButtonProps } from "@radix-ui/themes";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import JobFilterSidebar from "./job-filter-sidebar";
import {
  useApi,
  useCreate,
  useCustom,
  useDelete,
  useList,
} from "@/hooks/useDataProvider";
import { formatVND } from "@/helpers";
import Image from "next/image";
import { dataProvider } from "@/providers/dataProvider";
import Link from "next/link";
import dayjs from "@/lib/dayjs";
import { CrudFilters, Join } from "@/providers/types/IDataContext";
import { useAuth } from "@/providers/contexts/AuthProvider";
import { JobPost } from "@/providers/types/definition";
import { useQueryString } from "@/hooks/use-query-string";

export default function JobResult() {
  const { applicant, authorized } = useAuth();
  const jobExpand: Join[] = ["Organization"];
  console.log("applicant:", applicant);

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
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const qs = useQueryString();
  const district = searchParams?.get("district");
  const province = searchParams?.get("province");
  const jobTitle =
    searchParams?.get("job") || searchParams?.get("categoryName");
  const jobFilters: CrudFilters = [];
  if (district) {
    jobFilters.push({
      field: "dmXaCode",
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
    sorters,
    setSorters,
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

  const onSortJobs = (value: string) => {
    const queryString = qs.set("sort", value);
    router.push(`${pathName}?${queryString}#search-results`);
  };

  useEffect(() => {
    const currentSortValue = searchParams?.get("sort");
    if (currentSortValue === "newest") {
      setSorters([{ field: "effectiveDate", order: "desc" }]);
    } else {
      setSorters([]);
    }
  }, [searchParams, setSorters]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        {isMobile ? (
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button className="md:hidden w-full mb-4">
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle></DrawerTitle>
              <div className="mx-auto w-full max-w-sm px-2 overflow-y-auto h-[70vh]">
                <JobFilterSidebar
                  setFilters={setFilters}
                  setSorters={setSorters}
                />
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <div className="md:w-64">
            <JobFilterSidebar setFilters={setFilters} setSorters={setSorters} />
          </div>
        )}

        {/* Job Listings */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-gray-600 dark:text-gray-300 ">
                  Đang tuyển dụng{" "}
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
                <RadixSelect.Root
                  defaultValue="relative"
                  onValueChange={onSortJobs}
                >
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
              {(isLoadingJobs || isFetchingJobs) && (
                <>
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                          <div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {!isLoadingJobs &&
                !isFetchingJobs &&
                jobData?.data.map((job) => (
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
                            className="w-12 h-12 rounded-lg object-contain"
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
                          <span className="font-semibold text-gray-600 dark:text-blue-500">
                            {" "}
                            {formatVND(job.fromSalary)} -{" "}
                            {formatVND(job.toSalary || 0)}
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

interface JobBookmarkProps extends ButtonProps {
  favorites?: any[];
  jobId: string;
  onSuccess?: () => void;
}

export function JobBookmark({
  favorites = [],
  jobId,
  onSuccess,
  ...props
}: JobBookmarkProps) {
  const [isFavorite, setIsFavorite] = useState(favorites.length > 0);
  const { authorized } = useAuth();
  const { mutate: createFavorite, isPending: isPendingCreate } = useCreate({
    resource: "Favorites",
    meta: { config: { auth: "auth", subSystem: "buss" } },
    onSuccess: () => {
      onSuccess && onSuccess();
      setIsFavorite(true);
    },
  });

  const { mutate: deleteFavorite, isPending: isPendingDelete } = useDelete({
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
    <Button
      {...props}
      variant={isFavorite ? "solid" : "outline"}
      onClick={(evt) => toggleFavorite(favorites, evt)}
      loading={isPendingCreate || isPendingDelete}
      size={"icon"}
    >
      <Bookmark width={20} />
    </Button>
  );
}
