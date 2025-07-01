"use client";

import { useList, useGetSource } from "@/hooks/useDataProvider";
import { JobPost } from "@/providers/types/definition";
import Image from "next/image";
import Link from "next/link";

export function JobListing() {
  const getSource = useGetSource();
  const { data: jobs, isLoading } = useList<JobPost>({
    resource: "Jobs",
    meta: {
      join: [{ name: "Organization" }],
    },
    pagination: {
      pageSize: 6,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Nhiều cơ hội nghề nghiệp
          <br />
          đang chờ đón bạn
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Các công ty phát triển nhanh nhất tin tưởng Việc Tốt để tìm kiếm nhân
          tài. Khám phá các cơ hội độc quyền mà bạn không thể tìm thấy ở nơi
          khác.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {jobs?.data.map((job) => {
            const logoUrl =
              job.organization?.filePaths?.[0] &&
              getSource(job.organization.filePaths[0]);

            return (
              <div
                key={job.id}
                className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl"
              >
                <div className="p-6">
                  <div className="flex gap-4">
                    <Image
                      src={logoUrl || "/placeholder-logo.svg"}
                      alt={`${job.organization?.name} logo`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-contain border dark:border-gray-700"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {job.organization?.name}
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          {job.shift}
                        </span>
                      </div>
                      {/* <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {job.description}
                      </div> */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">
                            {job.fromSalary?.toLocaleString("vi")} -{" "}
                            {job.toSalary?.toLocaleString("vi")} VND
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {job.location}
                          </div>
                        </div>
                        {/* <Link
                          href={`/job/${job.id}`}
                          className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Ứng tuyển
                        </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href={"/find-jobs"}
            type="button"
            className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            Xem tất cả việc làm
          </Link>
        </div>
      </div>
    </section>
  );
}
