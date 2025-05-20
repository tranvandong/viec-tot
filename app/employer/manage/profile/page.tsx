"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  MapPin,
  Globe,
  Mail,
  Briefcase,
  Users,
  Calendar,
} from "lucide-react";

export default function CompanyProfilePage() {
  // Mock company data
  const [company, setCompany] = useState({
    name: "Acme Inc.",
    logo: "/placeholder.svg?height=100&width=100&text=A&bg=blue",
    coverImage: "/placeholder.svg?height=300&width=1200&text=Acme+Inc.&bg=gray",
    website: "www.acmeinc.com",
    industry: "Technology",
    companySize: "51-200 employees",
    founded: "2010",
    headquarters: "San Francisco, CA",
    description:
      "Acme Inc. is a leading technology company specializing in innovative software solutions for businesses. We are dedicated to creating products that help our customers succeed.",
    mission:
      "Our mission is to provide cutting-edge technology solutions that empower businesses to achieve their goals.",
    phone: "+1 (555) 123-4567",
    email: "contact@acmeinc.com",
    socialMedia: {
      linkedin: "linkedin.com/company/acmeinc",
      twitter: "twitter.com/acmeinc",
      facebook: "facebook.com/acmeinc",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState(company);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedCompany({ ...editedCompany, [name]: value });
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setEditedCompany({
      ...editedCompany,
      socialMedia: {
        ...editedCompany.socialMedia,
        [platform]: value,
      },
    });
  };

  const handleSave = () => {
    setCompany(editedCompany);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Company Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedCompany(company);
                  }}
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
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Cover Image */}
            <div className="relative h-48 bg-gray-200">
              <Image
                src={company.coverImage || "/placeholder.svg"}
                alt={`${company.name} cover`}
                fill
                className="object-cover"
              />
              {isEditing && (
                <div className="absolute bottom-4 right-4">
                  <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm text-sm font-medium">
                    <Camera className="h-4 w-4" />
                    Change Cover
                  </button>
                </div>
              )}
            </div>

            {/* Company Logo */}
            <div className="relative -mt-16 ml-8">
              <div className="w-32 h-32 rounded-lg border-4 border-white bg-white overflow-hidden">
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-sm">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Company Information */}
            <div className="p-6 pt-0">
              {isEditing ? (
                /* Edit Mode */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedCompany.name}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Industry*
                      </label>
                      <input
                        type="text"
                        id="industry"
                        name="industry"
                        value={editedCompany.industry}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Website
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={editedCompany.website}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="headquarters"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Headquarters
                      </label>
                      <input
                        type="text"
                        id="headquarters"
                        name="headquarters"
                        value={editedCompany.headquarters}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="companySize"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company Size
                      </label>
                      <select
                        id="companySize"
                        name="companySize"
                        value={editedCompany.companySize}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="1-10 employees">1-10 employees</option>
                        <option value="11-50 employees">11-50 employees</option>
                        <option value="51-200 employees">
                          51-200 employees
                        </option>
                        <option value="201-500 employees">
                          201-500 employees
                        </option>
                        <option value="501-1000 employees">
                          501-1000 employees
                        </option>
                        <option value="1001+ employees">1001+ employees</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="founded"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Founded
                      </label>
                      <input
                        type="text"
                        id="founded"
                        name="founded"
                        value={editedCompany.founded}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={editedCompany.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={editedCompany.email}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={editedCompany.description}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="mission"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company Mission
                    </label>
                    <textarea
                      id="mission"
                      name="mission"
                      rows={3}
                      value={editedCompany.mission}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Social Media
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor="linkedin"
                          className="block text-xs text-gray-500 mb-1"
                        >
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          id="linkedin"
                          value={editedCompany.socialMedia.linkedin}
                          onChange={(e) =>
                            handleSocialMediaChange("linkedin", e.target.value)
                          }
                          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="twitter"
                          className="block text-xs text-gray-500 mb-1"
                        >
                          Twitter
                        </label>
                        <input
                          type="text"
                          id="twitter"
                          value={editedCompany.socialMedia.twitter}
                          onChange={(e) =>
                            handleSocialMediaChange("twitter", e.target.value)
                          }
                          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="facebook"
                          className="block text-xs text-gray-500 mb-1"
                        >
                          Facebook
                        </label>
                        <input
                          type="text"
                          id="facebook"
                          value={editedCompany.socialMedia.facebook}
                          onChange={(e) =>
                            handleSocialMediaChange("facebook", e.target.value)
                          }
                          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div>
                  <h2 className="text-2xl font-bold mt-4 mb-2">
                    {company.name}
                  </h2>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>{company.industry}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{company.headquarters}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-4 w-4 mr-1" />
                      <a
                        href={`https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Company Size
                        </div>
                        <div className="font-medium">{company.companySize}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Founded</div>
                        <div className="font-medium">{company.founded}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Contact</div>
                        <div className="font-medium">{company.email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">
                      About {company.name}
                    </h3>
                    <p className="text-gray-700">{company.description}</p>
                  </div>

                  {company.mission && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3">
                        Our Mission
                      </h3>
                      <p className="text-gray-700">{company.mission}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Connect With Us
                    </h3>
                    <div className="flex gap-4">
                      {company.socialMedia.linkedin && (
                        <a
                          href={`https://${company.socialMedia.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                      {company.socialMedia.twitter && (
                        <a
                          href={`https://${company.socialMedia.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </a>
                      )}
                      {company.socialMedia.facebook && (
                        <a
                          href={`https://${company.socialMedia.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
