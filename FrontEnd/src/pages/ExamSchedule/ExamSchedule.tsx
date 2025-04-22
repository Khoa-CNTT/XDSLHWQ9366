import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import examItems from "../../constants/examData";

// Component: ExamCard
const ExamCard = ({ item }: { item: (typeof examItems)[0] }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-5 flex flex-col justify-between">
    <div>
      <div className="h-36 bg-blue-50 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-xl font-semibold text-blue-700 text-center px-2">
          {item.tenchungchi}
        </span>
      </div>
      <div className="space-y-1">
        <p>
          <strong>Exam day :</strong>{" "}
          {new Date(item.ngaythi).toLocaleDateString()}
        </p>
        <p>
          <strong>Fees :</strong> {item.lephithi.toLocaleString()} VNĐ
        </p>
        {/* <p className="text-sm text-gray-600 mt-2">{item.thongtinchitiet}</p> */}
      </div>
    </div>

    {/* Buttons */}
    <div className="mt-4 flex gap-3 justify-between">
      <Link
        to={`/exam/${item.malichthi}`}
        className="flex-1 text-center bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-secondary transition"
      >
        Detail
      </Link>
      <Link
        to={`/register/${item.malichthi}`}
        className="flex-1 text-center bg-secondary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary transition"
      >
        Register
      </Link>
    </div>
  </div>
);

// Main Component
const ExamSchedule = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(examItems);

  const filterData = (searchValue: string, categoryValue: string) => {
    const lowerSearch = searchValue.toLowerCase();

    const result = examItems.filter((item) => {
      const matchName = item.tenchungchi.toLowerCase().includes(lowerSearch);
      const matchCategory =
        categoryValue === "All" || item.tenchungchi === categoryValue;
      return matchName && matchCategory;
    });

    setFiltered(result);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    filterData(value, category);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    filterData(search, value);
  };
  const location = useLocation();

  const path = location.pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment, idx, arr) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: "/" + arr.slice(0, idx + 1).join("/"),
    }));

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold">Exam Schedule</h1>
          <p className="text-sm text-gray-500 mt-1">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            {path.map((p, index) => (
              <span key={index}>
                {" / "}
                <Link to={p.path} className="text-blue-600 hover:underline">
                  {p.name}
                </Link>
              </span>
            ))}
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for programs..."
            aria-label="Search for programs"
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            aria-label="Filter by field"
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700"
          >
            <option>All</option>
            <option>Web programming</option>
            <option>Mobile programming</option>
            <option>SQL</option>
            <option>DevOps</option>
            <option>Computer network</option>
          </select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <ExamCard key={item.malichthi} item={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No matching program found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;
