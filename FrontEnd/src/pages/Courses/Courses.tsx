import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import coursesItems from "../../constants/courseData";
import CourseCard from "../../components/CourseCard/CourseCard";

const Courses = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(coursesItems);

  const filterData = (searchValue: string, categoryValue: string) => {
    const lowerSearch = searchValue.toLowerCase();

    const result = coursesItems.filter((item) => {
      const matchName = item.tenkhoahoc.toLowerCase().includes(lowerSearch);
      const matchCategory =
        categoryValue === "All" || item.malinhvuc === categoryValue;
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
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold">Course list</h1>
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

        <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm khóa học..."
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700"
          >
            <option value="All">All</option>
            <option value="Web programming">Web programming</option>
            <option value="Mobile programming">Mobile programming</option>
            <option value="SQL">SQL</option>
            <option value="DevOps">DevOps</option>
            <option value="Computer network">Computer network</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <CourseCard key={item.makhoahoc} item={item} />
              // <coursesCard key={item.makhoahoc} item={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No suitable course found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
