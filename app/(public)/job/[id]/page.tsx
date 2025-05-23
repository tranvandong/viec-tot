"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Heart, MoreVertical, ArrowLeft } from "lucide-react";

// Mock data for jobs
const mockJobs = [
  {
    id: "1",
    title:
      "Dedicated CDLA Truck Driver - Home Time Options - Hiring Immediately",
    company: "Amazon",
    website: "www.amazon.co.uk",
    location: "Oxford Junction",
    logo: "/placeholder.svg?height=80&width=80&text=A&bg=orange",
    jobType: "Full-time",
    workType: "On-site",
    hours: "4 hours (Part Time)",
    experience: "2-4 Years",
    postedTime: "2 days ago",
    applicants: 140,
    salary: "$20 - $25 per hour",
    tags: ["New", "Urgent"],
    description: `At least $19.20, plus overtime and benefits

Amazon DSPs (Delivery Service Partners) are looking for delivery driver associates to help deliver packages to customers. DSPs are independent, small businesses that partner with Amazon to deliver packages out of Amazon WarehouseOrange, CT.`,
    benefits: [
      "On-the-job training and opportunities for career advancement",
      "Great benefits including paid time off (PTO) and healthcare for eligible employees",
      "Competitive pay and consistent schedules",
      "Employee discount program",
    ],
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Traveloka",
    website: "www.traveloka.com",
    location: "Jakarta, Indonesia",
    logo: "/placeholder.svg?height=80&width=80&text=T&bg=blue",
    jobType: "Full-time",
    workType: "On-site",
    hours: "40 hours per week",
    experience: "2-4 Years",
    postedTime: "an hour ago",
    applicants: 140,
    salary: "$1500/month",
    tags: ["Featured"],
    description: `We are looking for a talented Product Designer to join our team and help us create amazing user experiences for our travel platform.

The ideal candidate will have a strong portfolio demonstrating their ability to solve complex design problems and create intuitive, user-friendly interfaces.`,
    benefits: [
      "Competitive salary and benefits package",
      "Opportunity to work on a product used by millions",
      "Career growth and development opportunities",
      "Collaborative and innovative work environment",
    ],
  },
  {
    id: "3",
    title: "UX Designer",
    company: "Tokopedia",
    website: "www.tokopedia.com",
    location: "Jakarta, Indonesia",
    logo: "/placeholder.svg?height=80&width=80&text=T&bg=green",
    jobType: "Full-time",
    workType: "Remote",
    hours: "40 hours per week",
    experience: "2-4 Years",
    postedTime: "2 days ago",
    applicants: 140,
    salary: "$1000/month",
    tags: ["Remote"],
    description: `Tokopedia is looking for a UX Designer to join our growing team. You will be responsible for creating user-centered designs that meet business requirements and enhance customer experience.

As a UX Designer, you will work closely with product managers, developers, and other designers to deliver high-quality designs.`,
    benefits: [
      "Flexible working hours",
      "Remote work options",
      "Health insurance",
      "Professional development budget",
    ],
  },
  {
    id: "4",
    title: "Interaction Designer",
    company: "GoPay",
    website: "www.gopay.com",
    location: "Jakarta, Indonesia",
    logo: "/placeholder.svg?height=80&width=80&text=G&bg=blue",
    jobType: "Full-time",
    workType: "Onsite",
    hours: "40 hours per week",
    experience: "2-4 Years",
    postedTime: "2 days ago",
    applicants: 140,
    salary: "$1000/month",
    tags: ["Featured"],
    description: `GoPay is looking for an Interaction Designer to join our team. You will be responsible for creating engaging and intuitive user experiences for our payment platform.

The ideal candidate will have experience in designing for mobile applications and a strong understanding of user-centered design principles.`,
    benefits: [
      "Competitive salary and benefits",
      "Professional development opportunities",
      "Flexible working arrangements",
      "Modern office with great amenities",
    ],
  },
  {
    id: "5",
    title: "UI Designer",
    company: "Gojek",
    website: "www.gojek.com",
    location: "Jakarta, Indonesia",
    logo: "/placeholder.svg?height=80&width=80&text=G&bg=green",
    jobType: "Full-time",
    workType: "Onsite",
    hours: "40 hours per week",
    experience: "0-2 Years",
    postedTime: "2 days ago",
    applicants: 521,
    salary: "$900/month",
    tags: ["Entry Level"],
    description: `Gojek is seeking a talented UI Designer to join our growing design team. You will be responsible for creating visually appealing and user-friendly interfaces for our super app.

The ideal candidate will have a strong portfolio showcasing their UI design skills and a passion for creating beautiful, functional designs.`,
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Professional development budget",
      "Flexible working hours",
    ],
  },
  {
    id: "6",
    title: "Sr. UI/UX Designer",
    company: "Shopee",
    website: "www.shopee.com",
    location: "Jakarta, Indonesia",
    logo: "/placeholder.svg?height=80&width=80&text=S&bg=orange",
    jobType: "Full-time",
    workType: "Hybrid",
    hours: "40 hours per week",
    experience: "3-5 Years",
    postedTime: "2 days ago",
    applicants: 140,
    salary: "$2000/month",
    tags: ["Senior"],
    description: `Shopee is looking for a Senior UI/UX Designer to join our team. You will be responsible for leading design projects and mentoring junior designers.

The ideal candidate will have extensive experience in UI/UX design, a strong portfolio, and excellent leadership skills.`,
    benefits: [
      "Competitive salary and benefits package",
      "Leadership opportunities",
      "Professional development budget",
      "Flexible working arrangements",
    ],
  },
];

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const [isSaved, setIsSaved] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading
    setLoading(true);

    setTimeout(() => {
      const foundJob = mockJobs.find((j) => j.id === jobId);
      setJob(foundJob || mockJobs[0]);
      setLoading(false);
    }, 500);
  }, [jobId]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-950 text-white">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-orange-500 px-2 py-1 rounded font-bold text-white">
                Job
              </span>
              <span className="font-bold text-lg text-white">Wise</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-white">
                Home
              </Link>
              <Link
                href="/find-jobs"
                className="text-sm font-medium text-white border-b-2 border-white pb-1"
              >
                Find jobs
              </Link>
              <Link
                href="/companies"
                className="text-sm font-medium text-white"
              >
                Companies
              </Link>
              <Link href="/service" className="text-sm font-medium text-white">
                Service
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white">
              Log In
            </Link>
            <Link
              href="/register"
              className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 mb-6 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to search results</span>
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar - Scrollable Job Cards */}
          <div className="md:w-72">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">
                Search Results
              </h3>

              {/* Scrollable job cards */}
              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {mockJobs.map((listJob) => (
                  <Link
                    href={`/jobs/${listJob.id}`}
                    key={listJob.id}
                    className={`block p-3 rounded-lg border transition-colors ${
                      listJob.id === jobId
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={listJob.logo || "/placeholder.svg"}
                            alt={listJob.company}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-sm">
                          {listJob.company}
                        </span>
                      </div>
                      <button
                        onClick={(e) => toggleSaveJob(listJob.id, e)}
                        className={`text-sm ${
                          savedJobs.includes(listJob.id)
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            savedJobs.includes(listJob.id)
                              ? "fill-blue-500"
                              : ""
                          }`}
                        />
                      </button>
                    </div>

                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {listJob.title}
                    </h4>

                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{listJob.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600">
                        {listJob.salary}
                      </span>
                      <span className="text-xs text-gray-500">
                        {listJob.postedTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Job Details */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={job.logo || "/placeholder.svg"}
                      alt={job.company}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="font-bold text-xl">{job.company}</h1>
                    </div>
                    <p className="text-sm text-gray-500">{job.website}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <h2 className="font-bold text-2xl mb-4">{job.title}</h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag: string, index: number) => {
                  const bgColor =
                    tag === "New"
                      ? "bg-green-100 text-green-800"
                      : tag === "Urgent"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800";

                  return (
                    <span
                      key={index}
                      className={`text-xs px-3 py-1 rounded-full ${bgColor}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Location</span>
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Salary</span>
                  <span className="font-medium">{job.salary}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Hours</span>
                  <span className="font-medium">{job.hours}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <button className="py-3 px-6 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex-1 md:flex-none">
                  Apply Now
                </button>
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className="p-3 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      savedJobs.includes(job.id)
                        ? "fill-red-500 text-red-500"
                        : ""
                    }`}
                  />
                </button>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Descriptions</h3>
                <p className="text-gray-700 whitespace-pre-line mb-4">
                  {job.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Why You'll Love Working for an {job.company} Delivery Service
                  Partner
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {job.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
