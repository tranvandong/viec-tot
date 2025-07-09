"use client";

import { useState, type FormEvent, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  ChevronLeft,
  ChevronDown,
  X,
  MapPin,
  SearchIcon,
} from "lucide-react";
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
  const qs = useQueryString();

  const deleteQueryString = useCallback(
    (keys: string[]) => {
      const sParams = new URLSearchParams(searchParams?.toString() || "");
      keys.forEach((key) => {
        sParams.delete(key);
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

  const onClearLocation = () => {
    setLocation("");
    setProvince("");
    setDistrict("");
  };

  const onClearTextSearch = () => {
    setJobTitle("");
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
    meta: { join: ["DMXas"] },
    pagination: { pageSize: 50, current: 1 },
  });
  const provinces = data?.data || [];

  // Set default values from query params
  useEffect(() => {
    const job = searchParams?.get("job") || "";
    const locationName = searchParams?.get("locationName") || "";
    const district = searchParams?.get("district") || "";
    const province = searchParams?.get("province") || "";

    setJobTitle(job);
    setLocation(locationName);
    setDistrict(district);
    setProvince(province);
  }, [searchParams]);

  const createSlugFromJobTitleAndLocation = (jobTitle: string) => {
    let districtName = "";
    let provinceName = "";
    if (district) {
      districtName =
        provinces
          .find((p) => p.code === province)
          ?.dmXas?.find((h: any) => h.code === district)?.name || "";
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

    return slug || "find-jobs";
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
    const queryString = qs.sets({
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
      className="bg-white dark:bg-gray-800 rounded-full p-2 flex flex-row items-center gap-1 md:gap-2 mb-4 mx-auto text-gray-800 dark:text-gray-200"
    >
      <div className="flex items-center flex-1 w-6 md:w-full md:w-auto pl-2">
        <Search className="h-6 w-6 md:h-8 md:w-8 text-gray-400 mr-1 md:mr-2 pl-0 md:pl-2" />
        <input
          type="text"
          className="py-2 px-1 md:py-2 md:px-3 block w-full border-0 bg-transparent dark:text-white focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Chức danh, từ khóa hoặc công ty"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        {jobTitle !== "" && (
          <X
            className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0"
            onClick={onClearTextSearch}
          />
        )}
      </div>
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 my-2 md:my-0"></div>
      <div className="flex items-center flex-1 w-full md:w-auto pl-px md:pl-2">
        <MapPin className="h-6 w-6 md:h-8 md:w-8 text-gray-400 mr-1 md:mr-2 pl-0 md:pl-2" />
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="p-1 md:py-2 md:px-3 text-sm flex items-center justify-between w-full border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-0 cursor-pointer"
              aria-expanded="false"
            >
              {location ? (
                <span className="text-xs">{location}</span>
              ) : (
                "Tất cả"
              )}
              <Flex>
                {!!location && (
                  <X
                    className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0"
                    onClick={onClearLocation}
                  />
                )}
                <ChevronDown className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
              </Flex>
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
                        className="w-full text-left px-2 py-1.5 text-xs md:text-sm rounded-md hover:bg-gray-100"
                        onClick={() => {
                          setProvince("");
                          setDistrict("");
                          setLocation("");
                        }}
                      >
                        Tất cả
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
                        const districts = selectedProvince?.dmXas;
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
        className="py-2 px-4 inline-flex items-center justify-center w-auto gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
      >
        <span className="hidden md:inline">Tìm kiếm</span>
        <SearchIcon className="h-4 w-4 md:hidden inline" />
      </button>
    </form>
  );
}
