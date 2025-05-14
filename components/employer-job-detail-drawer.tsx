"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Edit, Trash2, Users, MapPin, Calendar, Clock, DollarSign } from "lucide-react"

type JobDetailDrawerProps = {
  job: any
  isOpen: boolean
  onClose: () => void
  mode: "view" | "edit"
  onSave?: (job: any) => void
}

export function EmployerJobDetailDrawer({ job, isOpen, onClose, mode = "view", onSave }: JobDetailDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [editedJob, setEditedJob] = useState<any>(job)
  const [currentMode, setCurrentMode] = useState<"view" | "edit">(mode)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      // Prevent body scrolling when drawer is open
      document.body.style.overflow = "hidden"
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false)
        // Re-enable body scrolling
        document.body.style.overflow = ""
      }, 300) // Match this with the CSS transition duration
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    setEditedJob(job)
    setCurrentMode(mode)
  }, [job, mode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedJob({ ...editedJob, [name]: value })
  }

  const handleSave = () => {
    if (onSave) {
      onSave(editedJob)
    }
    setCurrentMode("view")
  }

  const toggleEditMode = () => {
    setCurrentMode(currentMode === "view" ? "edit" : "view")
  }

  if (!isAnimating && !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Transparent overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute inset-x-0 bottom-0 max-h-[90vh] bg-white rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } overflow-auto`}
      >
        {/* Handle/pill indicator */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-2 mb-4"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          {currentMode === "view" ? (
            /* View Mode */
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={toggleEditMode}
                    className="p-2 rounded-full hover:bg-gray-100 text-blue-600"
                    title="Edit job"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-red-600" title="Delete job">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Job Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-gray-600">{job.location}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Department</div>
                        <div className="text-gray-600">{job.department}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Job Type</div>
                        <div className="text-gray-600">{job.type}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Experience Level</div>
                        <div className="text-gray-600">{job.experience}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Posting Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Posted Date</div>
                        <div className="text-gray-600">{new Date(job.postedDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Applicants</div>
                        <div className="text-gray-600">{job.applicants} applicants</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Salary Range</div>
                        <div className="text-gray-600">$80,000 - $120,000 per year</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div
                        className={`h-5 w-5 rounded-full ${job.status === "active" ? "bg-green-500" : "bg-gray-500"} mt-0.5`}
                      ></div>
                      <div>
                        <div className="font-medium">Status</div>
                        <div className="text-gray-600 capitalize">{job.status}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Job Description</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  We are looking for a talented {job.title} to join our team. The ideal candidate will have experience
                  in {job.department} and be passionate about creating exceptional products. As a {job.title}, you will
                  be responsible for designing and implementing solutions that meet our customers' needs. You will work
                  closely with cross-functional teams to deliver high-quality results.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Bachelor's degree in {job.department} or related field</li>
                  <li>{job.experience} of experience in a similar role</li>
                  <li>Strong communication and collaboration skills</li>
                  <li>Ability to work in a fast-paced environment</li>
                  <li>Passion for creating exceptional user experiences</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Benefits</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Competitive salary and benefits package</li>
                  <li>Flexible working arrangements</li>
                  <li>Professional development opportunities</li>
                  <li>Collaborative and innovative work environment</li>
                </ul>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={toggleEditMode}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit Job
                </button>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Edit Job</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={editedJob.title}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Department*
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={editedJob.department}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location*
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={editedJob.location}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type*
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={editedJob.type}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-1">
                      Work Type*
                    </label>
                    <select
                      id="workType"
                      name="workType"
                      value={editedJob.workType}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level*
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={editedJob.experience}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status*
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={editedJob.status}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="active">Active</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter job description..."
                    defaultValue={`We are looking for a talented ${job.title} to join our team. The ideal candidate will have experience in ${job.department} and be passionate about creating exceptional products.
                    
As a ${job.title}, you will be responsible for designing and implementing solutions that meet our customers' needs. You will work closely with cross-functional teams to deliver high-quality results.`}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Requirements*
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter job requirements..."
                    defaultValue={`- Bachelor's degree in ${job.department} or related field
- ${job.experience} of experience in a similar role
- Strong communication and collaboration skills
- Ability to work in a fast-paced environment
- Passion for creating exceptional user experiences`}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
                    Benefits
                  </label>
                  <textarea
                    id="benefits"
                    name="benefits"
                    rows={4}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter job benefits..."
                    defaultValue={`- Competitive salary and benefits package
- Flexible working arrangements
- Professional development opportunities
- Collaborative and innovative work environment`}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setCurrentMode("view")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
