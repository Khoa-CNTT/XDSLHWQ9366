import React from "react";
import { LinhVuc } from "../Type/Types";

interface LinhVucSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  linhVucs: LinhVuc[];
  name?: string;
  className?: string;
}

export default function LinhVucSelect({
  value,
  onChange,
  linhVucs,
  name = "maLinhVuc",
  className = "",
}: LinhVucSelectProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      <option value="">-- Lĩnh vực --</option>
      {linhVucs.map((item) => (
        <option key={item.maLinhVuc} value={item.maLinhVuc}>
          {item.tenLinhVuc}
        </option>
      ))}
    </select>
  );
}
