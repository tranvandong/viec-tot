"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, X, Bookmark, Share2, Clock, BanknoteIcon, HourglassIcon } from "lucide-react";
import BookmarkToggle from "./ui/bookmark-toggle";
import { dataProvider } from "@/providers/dataProvider";
import dayjs from "@/lib/dayjs";
import { JobBookmark } from "./job-results";

type JobDetailModalProps = {
  job: any;
  isOpen: boolean;
  onClose: () => void;
  similarJobs?: any[];
  otherJobsFromCompany?: any[];
  savedJobs: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
};

export function JobDetailModal({
  job,
  isOpen,
  onClose,
  similarJobs = [],
  otherJobsFromCompany = [],
  savedJobs,
  onToggleSave,
}: JobDetailModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Transparent overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer with transparent gap at top */}
      <div
        className={`absolute inset-x-0 bottom-0 top-16 bg-white rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Close button in the transparent gap */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-lg"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Handle/pill indicator */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-2 mb-4"></div>

        {job && (
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
                  // onClick={() => setIsOpenModal(true)}
                  className="py-2.5 px-5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Ứng tuyển ngay
                </button>
                <JobBookmark jobId={job.id} favorites={job.favorites} />
                <button
          
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
        )}
      </div>
    </div>
  );
}
