"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Twitter, Instagram, Linkedin } from "lucide-react";
import { useList } from "@/hooks/useDataProvider";
import { Organization } from "@/providers/types/definition";
import IImage from "@/components/ui/image";

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const { data, isLoading } = useList<Organization>({
    resource: "Organizations",
    filters: [],
    sorters: [],
    // queryOptions: { enabled: false },
  });

  // Company data
  const companies = data?.data || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Search Bar */}
      <div className="py-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="border border-blue-200 rounded-md p-4">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Tên công ty"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Địa điểm"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-medium transition-colors">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-4">
        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company) => (
            <Link
              key={company.id}
              className="border border-gray-200 rounded-md overflow-hidden"
              href={`companies/${company.id}`}
            >
              <div className="relative">
                <IImage
                  filePath={company.filePaths[0]}
                  alt={company.name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="p-4 pt-0 relative">
                <div className="absolute -top-12 left-4 w-24 h-24 bg-white border border-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                  <IImage
                    filePath={company.filePaths[0]}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />{" "}
                </div>
                <div className="pl-[110px] pt-2">
                  <h3 className="font-medium text-sm mb-1 ">{company.name}</h3>
                </div>
                <div className="mt-8">
                  {/* <p className="text-xs text-gray-600 mb-2">
                    {company.description}
                  </p> */}
                  <p className="text-xs text-gray-500 mb-2">
                    {company.address}
                  </p>
                  <div className="text-xs text-gray-500">
                    {company.telephone}
                  </div>
                  <div className="mt-2 text-xs text-right">
                    <span className="text-red-500 flex items-center justify-end gap-1">
                      10 công việc
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
