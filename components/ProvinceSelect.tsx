"use client";

import React from "react";

interface ProvinceSelectProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

// ✅ Dữ liệu tỉnh/thành được viết trực tiếp trong component
const provinces = [
  { id: 65, name: "Hà Nội", fullName: "Thành phố Hà Nội" },
  { id: 66, name: "Hưng Yên", fullName: "Tỉnh Hưng Yên" },
  { id: 67, name: "Quảng Trị", fullName: "Tỉnh Quảng Trị" },
  { id: 68, name: "Huế", fullName: "Thành phố Huế" },
  { id: 69, name: "Hải Phòng", fullName: "Thành phố Hải Phòng" },
  { id: 70, name: "Phú Thọ", fullName: "Tỉnh Phú Thọ" },
  { id: 71, name: "Thanh Hoá", fullName: "Tỉnh Thanh Hoá" },
  { id: 72, name: "Quảng Ninh", fullName: "Tỉnh Quảng Ninh" },
  { id: 73, name: "Lào Cai", fullName: "Tỉnh Lào Cai" },
  { id: 74, name: "Bắc Ninh", fullName: "Tỉnh Bắc Ninh" },
  { id: 75, name: "Nghệ An", fullName: "Tỉnh Nghệ An" },
  { id: 76, name: "Đà Nẵng", fullName: "Thành phố Đà Nẵng" },
  { id: 77, name: "Ninh Bình", fullName: "Tỉnh Ninh Bình" },
  { id: 78, name: "Khánh Hòa", fullName: "Tỉnh Khánh Hòa" },
  { id: 79, name: "Tây Ninh", fullName: "Tỉnh Tây Ninh" },
  { id: 80, name: "Đồng Tháp", fullName: "Tỉnh Đồng Tháp" },
  { id: 81, name: "Hà Tĩnh", fullName: "Tỉnh Hà Tĩnh" },
  { id: 82, name: "An Giang", fullName: "Tỉnh An Giang" },
  { id: 83, name: "Thái Nguyên", fullName: "Tỉnh Thái Nguyên" },
  { id: 84, name: "Lạng Sơn", fullName: "Tỉnh Lạng Sơn" },
  { id: 85, name: "Điện Biên", fullName: "Tỉnh Điện Biên" },
  { id: 86, name: "Đồng Nai", fullName: "Tỉnh Đồng Nai" },
  { id: 87, name: "Quảng Ngãi", fullName: "Tỉnh Quảng Ngãi" },
  { id: 88, name: "Vĩnh Long", fullName: "Tỉnh Vĩnh Long" },
  { id: 89, name: "Cao Bằng", fullName: "Tỉnh Cao Bằng" },
  { id: 90, name: "Lai Châu", fullName: "Tỉnh Lai Châu" },
  { id: 91, name: "Đắk Lắk", fullName: "Tỉnh Đắk Lắk" },
  { id: 92, name: "Gia Lai", fullName: "Tỉnh Gia Lai" },
  { id: 93, name: "Lâm Đồng", fullName: "Tỉnh Lâm Đồng" },
  { id: 94, name: "Hồ Chí Minh", fullName: "Thành phố Hồ Chí Minh" },
  { id: 95, name: "Sơn La", fullName: "Tỉnh Sơn La" },
  { id: 96, name: "Cần Thơ", fullName: "Thành phố Cần Thơ" },
  { id: 97, name: "Cà Mau", fullName: "Tỉnh Cà Mau" },
  { id: 98, name: "Tuyên Quang", fullName: "Tỉnh Tuyên Quang" },
];

export default function ProvinceSelect({
  value,
  onChange,
  label = "Chọn tỉnh/thành phố",
  className = "",
}: ProvinceSelectProps) {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icon tùy chỉnh bên phải */}
        <div className="pointer-events-none absolute in set-y-0 right-3 top-2 flex items-center text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-gray-300 rounded-md px-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Chọn tỉnh/thành</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.name}>
              {province.fullName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
