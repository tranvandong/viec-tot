"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { JobPost } from "@/providers/types/definition";
import { dataProvider } from "@/providers/dataProvider";
import dayjs from "@/lib/dayjs";
import ApplyJobModal from "@/components/apply-job-modal";
import { JobBookmark } from "@/components/job-results";

export default function JobDetailClient({ job }: { job: JobPost }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: job.title,
          text: "Check out this job!",
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

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
                  <Image
                    src={
                      job?.organization?.filePaths &&
                      job.organization.filePaths.length > 0
                        ? dataProvider.getSource(job.organization!.filePaths[0])
                        : "/placeholder.svg"
                    }
                    alt={job.organizationId}
                    width={120}
                    height={120}
                    className="rounded-lg object-contain"
                  />

                  <div>
                    <h1 className="text-2xl font-bold">{job?.title}</h1>
                    <h2 className="text-sm text-gray-500 mb-2 font-medium">
                      {job?.organization?.name}
                    </h2>{" "}
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
                <JobBookmark jobId={job.id} favorites={job.favorites} />
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
        </div>
      </div>
      <ApplyJobModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
}
