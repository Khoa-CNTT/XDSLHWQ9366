import React from "react";
import { ChucVu } from "../Type/Types";

interface ChucVuSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  chucVus: ChucVu[];
  name?: string;
  className?: string;
}

export default function ChucVuSelect({
  value,
  onChange,
  chucVus,
  name = "maChucVu",
  className = "",
}: ChucVuSelectProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      <option value="">-- Chức vụ --</option>
      {chucVus.map((item) => (
        <option key={item.maChucVu} value={item.maChucVu}>
          {item.tenChucVu}
        </option>
      ))}
    </select>
  );
}
