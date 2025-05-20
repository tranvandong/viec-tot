"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Twitter, Instagram, Linkedin } from "lucide-react";

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // Company data
  const companies = [
    {
      id: "1",
      name: "Techvify Company Limited",
      logo: "/placeholder.svg?height=40&width=40&text=TC&bg=yellow",
      coverImage:
        "/placeholder.svg?height=200&width=300&text=Techvify+Team&bg=lightblue",
      description: "Conquer the Everest, Together with Techvify",
      location: "Quận Bình Thạnh, Hồ Chí Minh",
      category: "IT Consultant, Outsourcing, Development",
      jobCount: "8 Jobs",
    },
    {
      id: "2",
      name: "Tổng Công ty Bưu điện Việt Nam",
      logo: "/placeholder.svg?height=40&width=40&text=VNP&bg=orange",
      coverImage:
        "/placeholder.svg?height=200&width=300&text=Vietnam+Post&bg=orange",
      description: "Bưu điện Việt Nam - Đối tác toàn trình",
      location: "Quận Nam Từ Liêm, Hà Nội",
      category: "Logistics",
      jobCount: "14 Jobs",
    },
    {
      id: "3",
      name: "NEC Vietnam",
      logo: "/placeholder.svg?height=40&width=40&text=NEC&bg=blue",
      coverImage: "/placeholder.svg?height=200&width=300&text=NEC+Team&bg=blue",
      description: "ONE OF THE TOP ICT JAPANESE COMPANIES IN VIETNAM",
      location: "Quận Tân Bình, Hồ Chí Minh",
      category: "Software",
      jobCount: "Chi tiết",
    },
    {
      id: "4",
      name: "Ngân hàng TMCP Sài Gòn Thương tín",
      logo: "/placeholder.svg?height=40&width=40&text=SCB&bg=blue",
      coverImage:
        "/placeholder.svg?height=200&width=300&text=Sacombank&bg=lightblue",
      description: "Đồng hành cùng phát triển",
      location: "Quận 3, Hồ Chí Minh",
      category: "Product, Fintech, Ngân hàng",
      jobCount: "1 Job",
    },
  ];

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
            <div
              key={company.id}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={company.coverImage || "/placeholder.svg"}
                  alt={company.name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="p-4 pt-0 relative">
                <div className="absolute -top-6 left-4 w-12 h-12 bg-white border border-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="mt-8">
                  <h3 className="font-medium text-sm mb-1">{company.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {company.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {company.location}
                  </p>
                  <div className="text-xs text-gray-500">
                    {company.category}
                  </div>
                  <div className="mt-2 text-xs text-right">
                    <span className="text-red-500 flex items-center justify-end gap-1">
                      {company.jobCount}
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {companies.map((company) => (
            <div
              key={`second-${company.id}`}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={company.coverImage || "/placeholder.svg"}
                  alt={company.name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="p-4 pt-0 relative">
                <div className="absolute -top-6 left-4 w-12 h-12 bg-white border border-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="mt-8">
                  <h3 className="font-medium text-sm mb-1">{company.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {company.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {company.location}
                  </p>
                  <div className="text-xs text-gray-500">
                    {company.category}
                  </div>
                  <div className="mt-2 text-xs text-right">
                    <span className="text-red-500 flex items-center justify-end gap-1">
                      {company.jobCount}
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
