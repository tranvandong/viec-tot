"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, CheckCircle, Building, MapPin, Trash } from "lucide-react";
import { JobDetailModal } from "@/components/job-detail-modal";
import { useApi, useCustom, useDelete } from "@/hooks/useDataProvider";
import { JobPost } from "@/providers/types/definition";
import dayjs from "@/lib/dayjs";
import { JobBookmark } from "@/components/job-results";
import { Button } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

enum TabActive {
  applied = 1,
  saved,
}

export default function MyJobsPage() {
  const apiUrl = useApi();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeParam = searchParams?.get("active");

  const [activeTab, setActiveTab] = useState<TabActive>(TabActive.applied);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(["1", "3", "5"]);

  const handleSetParam = (active: TabActive) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    newSearchParams.set("active", active.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };
  const { data: appliedJobsData, refetch: refetchAppliedJobs } = useCustom<{
    value: JobPost[];
  }>({
    url: `${apiUrl}/buss/allow/Jobs/GetAppliedJob`,
    queryOptions: {
      enabled: activeTab === TabActive.applied,
    },
  });

  const { data: favoriteJobsData, refetch: refetchFavoriteJobs } = useCustom<{
    value: JobPost[];
  }>({
    url: `${apiUrl}/buss/allow/Jobs/GetFavorites`,
    queryOptions: {
      enabled: activeTab === TabActive.saved,
    },
  });

  const { mutate: deleteAppliedJob } = useDelete({
    resource: "Applications",
    meta: { config: { auth: "auth", subSystem: "buss" } },
    onSuccess: () => {
      refetchAppliedJobs();
    },
  });

  const appliedJobs = appliedJobsData?.data?.value || [];
  const favoriteJobs = favoriteJobsData?.data?.value || [];

  useEffect(() => {
    const active = ((activeParam !== null &&
      activeParam !== undefined &&
      +activeParam) ||
      TabActive.applied) as TabActive;
    setActiveTab(active);
  }, [activeParam]);

  const openJobModal = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeJobModal = () => {
    setIsModalOpen(false);
  };

  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((jobId) => jobId !== id));
    } else {
      setSavedJobIds([...savedJobIds, id]);
    }
  };

  // Get jobs based on active tab
  const displayedJobs =
    activeTab === TabActive.applied ? appliedJobs : favoriteJobs;

  const onActiveTabChange = (tab: TabActive) => {
    setActiveTab(tab);
    handleSetParam(tab);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Công việc của tôi</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeTab === TabActive.applied
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => onActiveTabChange(TabActive.applied)}
          >
            Đã ứng tuyển ({appliedJobs.length})
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeTab === TabActive.saved
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => onActiveTabChange(TabActive.saved)}
          >
            Đã lưu ({favoriteJobs.length})
          </button>
        </div>

        {/* Job List Table */}
        {displayedJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Công việc
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mức lương
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian đăng tuyển
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedJobs.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => openJobModal(job)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            src={
                              job.organization?.filePaths?.[0] ||
                              "/placeholder.svg"
                            }
                            alt={"job.organization?.filePaths?.[0]"}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {job.title}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        {job.matchesProfile && (
                          <div className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Profile match
                          </div>
                        )}
                        {job.activelyRecruiting && (
                          <div className="flex items-center text-xs text-green-600">
                            <Building className="h-3 w-3 mr-1" />
                            Recruiting
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {job.status.map((tag, index) => {
                            let bgColor = "bg-yellow-100 text-yellow-800";
                            if (tag.includes("Remote")) {
                              bgColor = "bg-blue-100 text-blue-800";
                            } else if (tag.includes("Senior")) {
                              bgColor = "bg-green-100 text-green-800";
                            } else if (tag.includes("Junior")) {
                              bgColor = "bg-purple-100 text-purple-800";
                            }

                            return (
                              <span
                                key={index}
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${bgColor}`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </td> */}

                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {`${job.fromSalary} - ${job.toSalary}`}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {dayjs(job.effectiveDate).fromNow()}
                      <div className="text-sm text-gray-500">
                        Hết hạn trong {dayjs(job.expiredDate).fromNow()}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {activeTab === TabActive.saved && (
                        <JobBookmark
                          jobId={job.id}
                          favorites={[{ jobId: job.id }]}
                          onSuccess={refetchFavoriteJobs}
                        />
                      )}
                      {/* {activeTab === TabActive.applied && (
                        <Button
                          color="orange"
                          variant="soft"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAppliedJob(job.id);
                          }}
                        >
                          <Trash />
                        </Button>
                      )} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === TabActive.applied ? (
                <CheckCircle className="h-8 w-8 text-gray-400" />
              ) : (
                <Bookmark className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {activeTab === TabActive.applied
                ? "Bạn chưa ứng tuyển công việc nào"
                : "Bạn chưa lưu công việc nào"}
            </h3>
            <p className="text-gray-500 mb-4">
              {activeTab === TabActive.applied
                ? "Khi bạn ứng tuyển vào một công việc, nó sẽ hiển thị ở đây."
                : "Lưu các công việc bạn quan tâm để xem lại sau."}
            </p>
            <Link
              href="/find-jobs"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Tìm việc
            </Link>
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={{
            ...selectedJob,
            description:
              "This is a mock job description. The actual description would contain details about the role, responsibilities, and requirements.",
            benefits: [
              "Competitive salary and benefits package",
              "Flexible working arrangements",
              "Professional development opportunities",
              "Collaborative and innovative work environment",
            ],
          }}
          isOpen={isModalOpen}
          onClose={closeJobModal}
          savedJobs={savedJobIds}
          onToggleSave={toggleSaveJob}
        />
      )}
    </div>
  );
}
