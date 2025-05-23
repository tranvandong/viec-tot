"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, X, Bookmark, Share2 } from "lucide-react";
import BookmarkToggle from "./ui/bookmark-toggle";

type JobDetailModalProps = {
  job: any;
  isOpen: boolean;
  onClose: () => void;
  similarJobs: any[];
  otherJobsFromCompany: any[];
  savedJobs: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
};

export function JobDetailModal({
  job,
  isOpen,
  onClose,
  similarJobs,
  otherJobsFromCompany,
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
                    <h3 className="font-semibold text-lg mb-3">
                      About this role
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {job.description}
                    </p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg mb-3">
                      Qualification
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        At least {job.experience} of relevant experience in
                        product design or related roles.
                      </li>
                      <li>
                        Knowledge of design validation, either through
                        quantitative or qualitative research.
                      </li>
                      <li>Have good knowledge using Figma and design tools.</li>
                      <li>
                        Experience with analytics tools to gather data from
                        users.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg mb-3">
                      Responsibility
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        Create design and user journey on every features and
                        product/business units across multiple devices.
                      </li>
                      <li>
                        Identifying design problems through user journey and
                        devising elegant solutions.
                      </li>
                      <li>
                        Develop low and hi fidelity designs, user experience
                        flow, & prototype, translate it into highly-polished
                        visual composites following style and brand guidelines.
                      </li>
                      <li>
                        Brainstorm and works together with Design Lead, UX
                        Engineers, and PMs to execute a design sprint on
                        specific story or task.
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
            <div className="w-full md:w-80 p-6 border-t md:border-t-0 md:border-l border-gray-200">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
