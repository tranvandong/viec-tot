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
} from "lucide-react";

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
  const jobId = params.slug as string;
  const [isSaved, setIsSaved] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const onToggleSave = (id: string, e?: React.MouseEvent) => {
    console.log("fsf");
  };
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
    <div className="h-full flex flex-col md:flex-row overflow-y-auto">
      {/* Main content - scrollable */}
      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">{job.title}</h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={job.logo || "/placeholder.svg"}
                alt={job.company}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold">{job.company}</h2>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {job.jobType}
            </span>
            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {job.workType}
            </span>
            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {job.experience}
            </span>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <button className="py-2.5 px-5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Apply Now
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
            <button className="p-2.5 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="font-semibold text-lg mb-3">About this role</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {job.description}
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Qualification</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  At least {job.experience} of relevant experience in product
                  design or related roles.
                </li>
                <li>
                  Knowledge of design validation, either through quantitative or
                  qualitative research.
                </li>
                <li>Have good knowledge using Figma and design tools.</li>
                <li>
                  Experience with analytics tools to gather data from users.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Responsibility</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  Create design and user journey on every features and
                  product/business units across multiple devices.
                </li>
                <li>
                  Identifying design problems through user journey and devising
                  elegant solutions.
                </li>
                <li>
                  Develop low and hi fidelity designs, user experience flow, &
                  prototype, translate it into highly-polished visual composites
                  following style and brand guidelines.
                </li>
                <li>
                  Brainstorm and works together with Design Lead, UX Engineers,
                  and PMs to execute a design sprint on specific story or task.
                </li>
              </ul>
            </section>

            {job.benefits && job.benefits.length > 0 && (
              <section>
                <h3 className="font-semibold text-lg mb-3">Benefits</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.benefits.map((benefit: string, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
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
  );
}
