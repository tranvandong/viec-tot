"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronLeft, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  const provinces_1 = [
    { code: "HN", name: "Hà Nội" },
    { code: "HC", name: "Hồ Chí Minh" },
    { code: "ĐN", name: "Đà Nẵng" },
    { code: "HP", name: "Hải Phòng" },
    { code: "CT", name: "Cần Thơ" },
    { code: "BD", name: "Bình Dương" },
    { code: "ĐN1", name: "Đồng Nai" },
  ];

  const districts = [
    { code: "HN-84926", name: "Ba Đình" },
    { code: "HN-91840", name: "Hoàn Kiếm" },
    { code: "HN-49038", name: "Hai Bà Trưng" },
    { code: "HN-10395", name: "Đống Đa" },
    { code: "HN-72648", name: "Tây Hồ" },
    { code: "HN-26538", name: "Cầu Giấy" },
    { code: "HN-59302", name: "Thanh Xuân" },
    { code: "HN-81427", name: "Hoàng Mai" },

    { code: "HC-18572", name: "Quận 1" },
    { code: "HC-70924", name: "Quận 2" },
    { code: "HC-94710", name: "Quận 3" },
    { code: "HC-83912", name: "Quận 4" },
    { code: "HC-67193", name: "Quận 5" },
    { code: "HC-38426", name: "Quận 6" },
    { code: "HC-52978", name: "Quận 7" },
    { code: "HC-67091", name: "Quận 8" },
    { code: "HC-30856", name: "Phú Nhuận" },
    { code: "HC-94783", name: "Bình Thạnh" },

    { code: "ĐN-78129", name: "Hải Châu" },
    { code: "ĐN-94501", name: "Thanh Khê" },
    { code: "ĐN-47829", name: "Sơn Trà" },
    { code: "ĐN-14238", name: "Ngũ Hành Sơn" },
    { code: "ĐN-32019", name: "Liên Chiểu" },
    { code: "ĐN-10284", name: "Cẩm Lệ" },

    { code: "HP-98431", name: "Hồng Bàng" },
    { code: "HP-23984", name: "Ngô Quyền" },
    { code: "HP-37104", name: "Lê Chân" },
    { code: "HP-10458", name: "Kiến An" },
    { code: "HP-57230", name: "Hải An" },
    { code: "HP-67218", name: "Đồ Sơn" },

    { code: "CT-78524", name: "Ninh Kiều" },
    { code: "CT-93471", name: "Bình Thủy" },
    { code: "CT-43029", name: "Cái Răng" },
    { code: "CT-82401", name: "Ô Môn" },
    { code: "CT-34091", name: "Thốt Nốt" },

    { code: "BD-32984", name: "Thủ Dầu Một" },
    { code: "BD-98412", name: "Bến Cát" },
    { code: "BD-87593", name: "Tân Uyên" },
    { code: "BD-13904", name: "Dĩ An" },
    { code: "BD-29401", name: "Thuận An" },

    { code: "ĐN-50392", name: "Biên Hòa" },
    { code: "ĐN-73920", name: "Long Khánh" },
    { code: "ĐN-19482", name: "Nhơn Trạch" },
    { code: "ĐN-72038", name: "Long Thành" },
    { code: "ĐN-94710", name: "Trảng Bom" },
  ];

  // Set default values from query params
  useEffect(() => {
    const job = searchParams.get("job") || "";
    const locationParam = searchParams.get("location") || "";

    setJobTitle(job);

    if (locationParam) {
      // Nếu có dấu phẩy thì có district code
      if (locationParam.includes(",")) {
        const [districtCode, provinceCode] = locationParam.split(",");
        setProvince(provinceCode);
        setDistrict(districtCode);

        const provinceObj = provinces_1.find((p) => p.code === provinceCode);
        const districtObj = districts.find(
          (d) =>
            d.code === `${provinceCode}-${districtCode}` ||
            d.code === districtCode
        );

        if (provinceObj && districtObj) {
          setLocation(`${districtObj.name}, ${provinceObj.name}`);
        } else if (provinceObj) {
          setLocation(provinceObj.name);
        }
      } else {
        // chỉ có province code
        setProvince(locationParam);
        setDistrict("");
        const provinceObj = provinces_1.find((p) => p.code === locationParam);
        if (provinceObj) setLocation(provinceObj.name);
      }
    } else {
      setProvince("");
      setDistrict("");
      setLocation("");
    }
  }, [searchParams]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    let locationParam = "";
    if (province && district) {
      // district code đã là dạng "XX-YYYYY"
      locationParam = `${district},${province}`;
    } else if (province) {
      locationParam = province;
    }
    router.push(
      `/find-jobs?job=${encodeURIComponent(jobTitle)}${
        locationParam ? `&location=${encodeURIComponent(locationParam)}` : ""
      }`
    );
  };
  return (
    <form
      onSubmit={handleSearch}
      className="bg-white dark:bg-gray-800 rounded-full p-2 flex items-center gap-2 mb-4 max-w-3xl mx-auto text-gray-800 dark:text-gray-200"
    >
      <div className="flex items-center flex-1 pl-2">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
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
                      {provinces_1
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
                        {provinces_1.find((p) => p.code === province)?.name}
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
                          setLocation(province);
                        }}
                      >
                        Tất cả quận/huyện
                      </button>
                      {/* District selection */}
                      {(() => {
                        const selectedProvince = provinces_1.find(
                          (p) => p.code === province
                        );
                        if (!selectedProvince) return null;
                        return districts
                          .filter(
                            (d) =>
                              d.code.startsWith(selectedProvince.code + "-") &&
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
