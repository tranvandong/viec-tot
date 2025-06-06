"use client";

import { useState, type FormEvent, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronLeft, ChevronDown, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useList } from "@/hooks/useDataProvider";
import { Checkbox, Flex, Text } from "@radix-ui/themes";
import slugify from "slugify";
import { handleSlug } from "@/helpers";
import { useQueryString } from "@/hooks/use-query-string";

export function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState(""); // display string
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [province, setProvince] = useState(""); // province code
  const [district, setDistrict] = useState(""); // district code

  // Add these new state variables after the existing state declarations
  const [activeSlide, setActiveSlide] = useState<"province" | "district">(
    "province"
  );
  const [provinceSearch, setProvinceSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const createQueryString = useCallback(
    (params: Record<string, string | undefined>, removeKeys: string[] = []) => {
      const sParams = new URLSearchParams(searchParams.toString());

      // Remove specified keys
      removeKeys.forEach((key) => {
        sParams.delete(key);
      });

      // Add/update params
      Object.entries(params).forEach(([name, value]) => {
        if (value === undefined || value === "") {
          sParams.delete(name);
        } else {
          sParams.set(name, value);
        }
      });

      return sParams.toString();
    },
    [searchParams]
  );

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSearchCategories = (e: FormEvent) => {
    e.preventDefault();
    const locationString = district ? `${district}, ${province}` : province;
    const categoriesString = selectedCategories.join(",");
    const searchParams = new URLSearchParams();
    if (jobTitle) searchParams.set("job", jobTitle);
    if (locationString) searchParams.set("location", locationString);
    if (categoriesString) searchParams.set("categories", categoriesString);
    router.push(`/search-results?${searchParams.toString()}`);
  };
  const { data } = useList({
    resource: "DMTinhs",
    meta: { join: ["DMHuyens"] },
    pagination: { pageSize: 50, current: 1 },
  });
  const provinces = data?.data || [];

  // Set default values from query params
  useEffect(() => {
    const job = searchParams.get("job") || "";
    const locationName = searchParams.get("locationName") || "";
    const district = searchParams.get("district") || "";
    const province = searchParams.get("province") || "";

    setJobTitle(job);
    setLocation(locationName);
    setDistrict(district);
    setProvince(province);

    // if (locationName) {
    //   // Nếu có dấu phẩy thì có district code
    //   if (locationName.includes(",")) {
    //     const [districtCode, provinceCode] = locationName.split(",");
    //     setProvince(provinceCode);
    //     setDistrict(districtCode);

    //     const provinceObj = provinces.find((p) => p.code === provinceCode);
    //     const districtObj = ((provinceObj?.dmHuyens as any[]) || []).find(
    //       (d) =>
    //         d.code === `${provinceCode}-${districtCode}` ||
    //         d.code === districtCode
    //     );

    //     if (provinceObj && districtObj) {
    //       setLocation(`${districtObj.name}, ${provinceObj.name}`);
    //     } else if (provinceObj) {
    //       setLocation(provinceObj.name);
    //     }
    //   } else {
    //     // chỉ có province code
    //     setProvince(locationName);
    //     setDistrict("");
    //     const provinceObj = provinces.find((p) => p.code === locationName);
    //     if (provinceObj) setLocation(provinceObj.name);
    //   }
    // } else {
    //   setProvince("");
    //   setDistrict("");
    //   setLocation("");
    // }
  }, [searchParams]);

  const createSlugFromJobTitleAndLocation = (jobTitle: string) => {
    let districtName = "";
    let provinceName = "";
    if (district) {
      districtName =
        provinces
          .find((p) => p.code === province)
          ?.dmHuyens?.find((h: any) => h.code === district)?.name || "";
    } else if (province) {
      provinceName = provinces.find((p) => p.code === province)?.name || "";
    }
    let slug = "";
    if (jobTitle) {
      slug += `tim-viec-lam-${handleSlug(jobTitle)}`;
    }
    if (districtName) {
      slug = slug
        ? slug + "-tai-" + `${handleSlug(districtName)}-d${district}`
        : "tim-viec-lam-tai-" + `${handleSlug(districtName)}-d${district}`;
    } else if (provinceName) {
      slug = slug
        ? slug + "-tai-" + `${handleSlug(provinceName)}-d${province}`
        : "tim-viec-lam-tai-" + `${handleSlug(provinceName)}-p${province}`;
    }

    return slug;
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    let locationParam = "";
    let locationName = "";

    if (province && district) {
      // district code đã là dạng "XX-YYYYY"
      locationParam = `d${district}`;
    } else if (province) {
      locationParam = `p${province}`;
    }
    const queryString = createQueryString({
      job: jobTitle,
      location: locationParam,
      locationName: location,
      district,
      province,
    });
    router.push(
      `/${createSlugFromJobTitleAndLocation(jobTitle)}?${queryString}`
    );
  };
  return (
    <form
      onSubmit={handleSearch}
      className="bg-white dark:bg-gray-800 rounded-full p-2 flex items-center gap-2 mb-4 mx-auto text-gray-800 dark:text-gray-200"
    >
      {/* <div className="w-auto mx-auto px-2">
        <Popover open={showCategories} onOpenChange={setShowCategories}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center justify-between w-full border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-0 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <span
                  className={`text-sm ${
                    selectedCategories.length > 0
                      ? "text-gray-900 dark:text-white font-medium"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {selectedCategories.length > 0
                    ? `Nghề nghiệp đã chọn`
                    : "Danh mục nghề nghiệp"}
                </span>
              </div>
              <div className="flex items-center gap-2 pl-2">
                {selectedCategories.length > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {selectedCategories.length}
                  </span>
                )}
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[500px] p-0 mt-4" align="start">
             <div className="border-b border-gray-200 dark:border-gray-700 p-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nhập từ khóa tìm kiếm"
                  className="w-full pl-8 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                />
              </div> 
            </div>
            <div className="p-3">
              <div className="max-h-60 overflow-y-auto space-y-2 px-4">
                {filteredCategories.map((category) => (
                  <Text key={category} as="label" size="2">
                    <Flex
                      gap="2"
                      className={`${
                        selectedCategories.includes(category)
                          ? "text-blue-600 font-medium"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />

                      {category}
                    </Flex>
                  </Text>
                ))}
              </div>
              {selectedCategories.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Đã chọn: {selectedCategories.length} danh mục
                    </span>
                    <button
                      onClick={() => setSelectedCategories([])}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-800"></div> */}
      <div className="flex items-center flex-1 pl-2">
        <Search className="h-5 w-5 text-gray-400 mr-2 pl-2" />
        <input
          type="text"
          className="py-2 px-3 block w-full border-0 bg-transparent dark:text-white focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Chức danh, từ khóa hoặc công ty"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-800"></div>
      <div className="flex items-center flex-1 pl-2">
        <svg
          className="h-5 w-5 text-gray-400 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="py-2 px-3 flex items-center justify-between w-full border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-0 cursor-pointer"
              aria-expanded="false"
            >
              {location ? location : "Tất cả địa điểm"}
              <ChevronDown className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[300px]">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform:
                    activeSlide === "province"
                      ? "translateX(0)"
                      : "translateX(-100%)",
                }}
              >
                {/* Province Selection Slide */}
                <div className="w-full flex-shrink-0">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Tìm tỉnh/thành phố..."
                        className="w-full rounded-md border border-gray-200 py-2 pl-8 pr-3 text-sm"
                        value={provinceSearch}
                        onChange={(e) => setProvinceSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    <div className="p-1">
                      <button
                        className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-100"
                        onClick={() => {
                          setProvince("");
                          setDistrict("");
                          setLocation("");
                        }}
                      >
                        Tất cả địa điểm
                      </button>
                      <button
                        className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-100"
                        onClick={() => {
                          setProvince("Từ xa");
                          setDistrict("");
                          setLocation("Từ xa");
                        }}
                      >
                        Từ xa
                      </button>
                      {/* Province selection */}
                      {provinces
                        .filter((p) =>
                          p.name
                            .toLowerCase()
                            .includes(provinceSearch.toLowerCase())
                        )
                        .map((p) => (
                          <button
                            key={p.code}
                            className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-100"
                            onClick={() => {
                              setProvince(p.code);
                              setDistrict("");
                              setActiveSlide("district");
                              setDistrictSearch("");
                              setLocation(p.name);
                            }}
                          >
                            {p.name}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                {/* District Selection Slide */}
                <div className="w-full flex-shrink-0">
                  <div className="p-2">
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => setActiveSlide("province")}
                        className="p-1 rounded-md hover:bg-gray-100"
                        aria-label="Quay lại"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium">
                        {provinces.find((p) => p.code === province)?.name}
                      </span>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Tìm quận/huyện..."
                        className="w-full rounded-md border border-gray-200 py-2 pl-8 pr-3 text-sm"
                        value={districtSearch}
                        onChange={(e) => setDistrictSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    <div className="p-1">
                      <button
                        className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-100"
                        onClick={() => {
                          setDistrict("");
                          setLocation(
                            provinces.find((p) => p.code === province)?.name
                          );
                        }}
                      >
                        Tất cả quận/huyện
                      </button>
                      {/* District selection */}
                      {(() => {
                        const selectedProvince = provinces.find(
                          (p) => p.code === province
                        );
                        const districts = selectedProvince?.dmHuyens;
                        if (!districts) return null;
                        return (districts as any[])
                          .filter((d) =>
                            d.name
                              .toLowerCase()
                              .includes(districtSearch.toLowerCase())
                          )
                          .map((d) => (
                            <button
                              key={d.code}
                              className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-100"
                              onClick={() => {
                                setDistrict(d.code);
                                setLocation(
                                  `${d.name}, ${selectedProvince.name}`
                                );
                              }}
                            >
                              {d.name}
                            </button>
                          ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <button
        type="submit"
        className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
      >
        Tìm kiếm
      </button>
    </form>
  );
}
