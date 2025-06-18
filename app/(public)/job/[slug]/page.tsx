"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Heart,
  MoreVertical,
  ArrowLeft,
  Bookmark,
  Share2,
  BanknoteIcon,
  PinIcon,
  HourglassIcon,
  Package,
  User,
  Timer,
  AlarmClock,
  Clock,
} from "lucide-react";
import { useOne } from "@/hooks/useDataProvider";
import { JobPost } from "@/providers/types/definition";
import { dataProvider } from "@/providers/dataProvider";
import dayjs from "@/lib/dayjs";
import ApplyJobModal from "@/components/apply-job-modal";

export default function JobDetail() {
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const onToggleSave = (id: string, e?: React.MouseEvent) => {
    console.log("fsf");
  };

  const params = useParams();
  const slug = params?.slug as string;
  console.log(slug);

  const { data, isLoading } = useOne<JobPost>({
    resource: "Jobs",
    id: slug as string,
    meta: {
      join: ["Organization"],
    },
  });

  const job = data?.data;

  const toggleSaveJob = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id));
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  };

  const onShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Tiêu đề trang",
          text: "Một mô tả ngắn",
          url: window.location.href,
        })
        .then(() => console.log("Chia sẻ thành công"))
        .catch((error) => console.error("Chia sẻ thất bại", error));
    } else {
      alert("Trình duyệt không hỗ trợ chia sẻ");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Đang tải chi tiết công việc...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Job not found
          </h2>
          <p className="text-gray-600 mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/find-jobs"
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to search results
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container px-4 h-full mx-auto py-8">
          <div className="flex w-full gap-4">
            <div className="w-full bg-white p-6 rounded-sm border border-gray-100">
              <div className="mb-4">
                <div className="flex gap-4">
                  <div className="border border-gray-200">
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
                      width={120}
                      height={120}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm text-sky-500/100 mb-2">
                      {job?.organization?.name}
                    </h2>{" "}
                    <h1 className="text-2xl font-bold">{job?.title}</h1>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-700 font-light">
                <Clock className="inline-block mr-4" />
                Đăng {dayjs(job.effectiveDate).fromNow()} và thời gian ứng tuyển
                công việc hết hạn trong {dayjs(job.expiredDate).fromNow()}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 mr-2 bg-sky-500/100 p-1 rounded-full">
                    <BanknoteIcon className="h-6 w-6" color="white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Mức lương</div>
                    <div className="font-medium">{`${job?.fromSalary} - ${job?.toSalary}`}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 mr-2 bg-sky-500/100 p-1 rounded-full">
                    <MapPin className="h-6 w-6" color="white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Địa điểm</div>
                    <div className="font-medium">{job?.location}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 mr-2 bg-sky-500/100 p-1 rounded-full">
                    <HourglassIcon className="h-6 w-6" color="white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Kinh nghiệm</div>
                    <div className="font-medium">{job?.experience} năm</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <button
                  onClick={() => setIsOpenModal(true)}
                  className="py-2.5 px-5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Ứng tuyển ngay
                </button>
                <button
                  onClick={(e) => onToggleSave(job.id, e)}
                  className="p-2.5 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                >
                  <Bookmark
                    className={`h-5 w-5 ${
                      savedJobs.includes(job.id)
                        ? "fill-blue-500 text-blue-500"
                        : ""
                    }`}
                  />
                </button>{" "}
                <button
                  onClick={onShare}
                  className="p-2.5 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <div
                className="space-y-8"
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></div>
            </div>
          </div>

          {/* Right sidebar - Similar jobs */}
          {/* <div className="w-full md:w-80 p-6 border-t md:border-t-0 md:border-l border-gray-200">
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Similar Jobs
                </h3>
                <div className="space-y-4">
                  {similarJobs.slice(0, 3).map((similarJob) => (
                    <div
                      key={similarJob.id}
                      className="bg-white rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={similarJob.logo || "/placeholder.svg"}
                              alt={similarJob.company}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">
                              {similarJob.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {similarJob.company}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => onToggleSave(similarJob.id, e)}
                          className="text-gray-400 hover:text-blue-500"
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              savedJobs.includes(similarJob.id)
                                ? "fill-blue-500 text-blue-500"
                                : ""
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{similarJob.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          {similarJob.jobType}
                        </span>
                        <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          {similarJob.workType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          {similarJob.postedTime}
                        </span>
                        <span className="font-medium text-blue-600">
                          {similarJob.salary}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {otherJobsFromCompany.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Other Jobs From {job.company}
                  </h3>
                  <div className="space-y-4">
                    {otherJobsFromCompany.slice(0, 2).map((otherJob) => (
                      <div
                        key={otherJob.id}
                        className="bg-white rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-sm">
                              {otherJob.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{otherJob.location}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => onToggleSave(otherJob.id, e)}
                            className="text-gray-400 hover:text-blue-500"
                          >
                            <Bookmark
                              className={`h-4 w-4 ${
                                savedJobs.includes(otherJob.id)
                                  ? "fill-blue-500 text-blue-500"
                                  : ""
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                            {otherJob.jobType}
                          </span>
                          <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                            {otherJob.experience}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div> */}
        </div>
      </div>
      <ApplyJobModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
}
