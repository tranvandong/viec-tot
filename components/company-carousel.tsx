"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetSource, useList } from "@/hooks/useDataProvider";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Organization } from "@/providers/types/definition";

export function CompanyCarousel() {
  const getSource = useGetSource();
  const { data, isLoading } = useList<Organization>({
    resource: "Organizations",
    pagination: {
      current: 1,
      pageSize: 6,
    },
  });

  const companies = data?.data || [];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl h-full">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Skeleton className="w-12 h-12 rounded-lg" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-2" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                      <Skeleton className="h-10 w-full mb-4" />
                      <div className="flex gap-2 mb-4">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-9 w-full" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          : companies.map((company) => (
              <CarouselItem
                key={company.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 h-full">
                  <div className="flex flex-col bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm rounded-xl h-full">
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-start gap-4 mb-4">
                        <Image
                          src={
                            (company?.filePaths?.[0] &&
                              getSource(company.filePaths[0])) ||
                            "/placeholder-logo.svg"
                          }
                          alt={`${company.name} logo`}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-lg object-contain"
                        />
                        <div>
                          <h3 className="font-semibold">{company.name}</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {company.address || "Không có thông tin"}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">
                        {company.introduction || "Không có mô tả về công ty."}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {/* Add tags if available in your data */}
                      </div>
                      <Link href={`/companies/${company.id}`} passHref>
                        <button
                          type="button"
                          className="w-full mt-auto py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Xem việc làm
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hidden md:flex" />
    </Carousel>
  );
}
