import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import examItems from "../../constants/examData";
import { motion } from "framer-motion";
import {
  MdSearch,
  MdGridView,
  MdViewList,
  MdTune,
  MdClose,
} from "react-icons/md";
import { FadeUp } from "../Home/Hero/Hero";

// Define interface for exam data
interface Exam {
  malichthi: number;
  malinhvuc: number;
  tenchungchi: string;
  ngaythi: string;
  thongtinchitiet: string;
  lephithi: number;
}

const categories = [
  { value: "All", label: "All" },
  { value: "Web programming", label: "Web programming" },
  { value: "Mobile programming", label: "Mobile programming" },
  { value: "SQL", label: "SQL" },
  { value: "DevOps", label: "DevOps" },
  { value: "Computer network", label: "Computer network" },
];

const ExamSchedule = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(examItems);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filterData = (
    searchValue: string,
    categoryValue: string,
    sortValue: string,
    priceRangeValue: { min: number; max: number }
  ) => {
    const lowerSearch = searchValue.toLowerCase();

    let result = examItems.filter((item: Exam) => {
      const matchName = item.tenchungchi.toLowerCase().includes(lowerSearch);
      const matchCategory =
        categoryValue === "All" || item.tenchungchi === categoryValue;
      const matchPrice =
        item.lephithi >= priceRangeValue.min &&
        item.lephithi <= priceRangeValue.max;
      return matchName && matchCategory && matchPrice;
    });

    // Apply sorting
    switch (sortValue) {
      case "price-asc":
        result = result.sort((a, b) => a.lephithi - b.lephithi);
        break;
      case "price-desc":
        result = result.sort((a, b) => b.lephithi - b.lephithi);
        break;
      case "name-asc":
        result = result.sort((a, b) =>
          a.tenchungchi.localeCompare(b.tenchungchi)
        );
        break;
      case "date-asc":
        result = result.sort(
          (a, b) =>
            new Date(a.ngaythi).getTime() - new Date(b.ngaythi).getTime()
        );
        break;
      default:
        break;
    }

    setFiltered(result);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    filterData(value, category, sortBy, priceRange);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    filterData(search, value, sortBy, priceRange);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    filterData(search, category, value, priceRange);
  };

  const handlePriceRangeChange = (
    min: number | null = null,
    max: number | null = null
  ) => {
    const newRange = {
      min: min !== null ? min : priceRange.min,
      max: max !== null ? max : priceRange.max,
    };
    setPriceRange(newRange);
    filterData(search, category, sortBy, newRange);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("default");
    setPriceRange({ min: 0, max: 1000000 });
    setFiltered(examItems);
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
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-20">
      {/* Hero section */}
      <div className="bg-gradient-to-r bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <motion.h1
              variants={FadeUp(0.2)}
              initial="initial"
              animate="animate"
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Exam Schedule
            </motion.h1>
            <motion.p
              variants={FadeUp(0.4)}
              initial="initial"
              animate="animate"
              className="text-lg text-blue-100 mb-8"
            >
              Find and register for upcoming certification exams
            </motion.p>

            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search for exams..."
                className="w-full px-5 py-4 pr-12 rounded-xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
              <MdSearch className="absolute right-4 top-4 text-2xl text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              <Link to="/" className="text-secondary hover:underline">
                Home
              </Link>
              {path.map((p, index) => (
                <span key={index}>
                  {" / "}
                  <Link to={p.path} className="text-secondary hover:underline">
                    {p.name}
                  </Link>
                </span>
              ))}
            </p>
            <h2 className="text-2xl font-bold">
              {category === "All"
                ? "All Exams"
                : `Exams in ${
                    categories.find((c) => c.value === category)?.label
                  }`}
            </h2>
          </div>
          <div className="flex items-center mt-4 sm:mt-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-l-lg border border-gray-300 ${
                viewMode === "grid"
                  ? "bg-secondary text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              <MdGridView className="text-xl" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-r-lg border border-gray-300 border-l-0 ${
                viewMode === "list"
                  ? "bg-secondary text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              <MdViewList className="text-xl" />
            </button>

            <div className="ml-4 hidden md:block">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 bg-white"
              >
                <option value="default">Default Sort</option>
                <option value="price-asc">Fee: Low to High</option>
                <option value="price-desc">Fee: High to Low</option>
                <option value="name-asc">Exam Name: A-Z</option>
                <option value="date-asc">Date: Soonest</option>
              </select>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="ml-4 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 flex items-center gap-2 md:hidden"
            >
              <MdTune />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`
              md:w-1/4 bg-white rounded-xl shadow-sm p-6 
              ${
                showFilters
                  ? "fixed inset-0 z-50 overflow-auto"
                  : "hidden md:block"
              }
            `}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Filter Results</h3>
              {showFilters && (
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 rounded-full hover:bg-gray-100 md:hidden"
                >
                  <MdClose className="text-xl" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Category</h4>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Exam Fee</h4>
              <div className="space-y-2">
                <button
                  className={`w-full text-left px-3 py-2 rounded ${
                    priceRange.max === 300000
                      ? "bg-gray-100 text-secondary"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePriceRangeChange(0, 300000)}
                >
                  Under 300,000 VND
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${
                    priceRange.min === 300000 && priceRange.max === 500000
                      ? "bg-gray-100 text-secondary"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePriceRangeChange(300000, 500000)}
                >
                  300,000 - 500,000 VND
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${
                    priceRange.min === 500000
                      ? "bg-gray-100 text-secondary"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePriceRangeChange(500000, 1000000)}
                >
                  Over 500,000 VND
                </button>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={resetFilters}
                className="w-full py-2 rounded-lg border border-s-emerald-500 text-secondary hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>

              {showFilters && (
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full mt-3 py-2 rounded-lg bg-secondary text-white hover:bg-secondary transition md:hidden"
                >
                  View {filtered.length} Exams
                </button>
              )}
            </div>
          </div>

          {/* Exam List */}
          <div className="md:w-3/4">
            {/* Mobile sort controls */}
            <div className="mb-6 md:hidden">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 bg-white"
              >
                <option value="default">Default Sort</option>
                <option value="price-asc">Fee: Low to High</option>
                <option value="price-desc">Fee: High to Low</option>
                <option value="name-asc">Exam Name: A-Z</option>
                <option value="date-asc">Date: Soonest</option>
              </select>
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-gray-500">
              Showing {filtered.length} exams
            </div>

            {isLoading ? (
              // Loading skeleton
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                    : "space-y-6"
                }
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
                  >
                    <div className="w-full aspect-video bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <motion.div
                variants={FadeUp(0.9)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                    : "space-y-6"
                }
              >
                {filtered.map((item: Exam) =>
                  viewMode === "grid" ? (
                    // Grid view
                    <Link
                      key={item.malichthi}
                      to={`/exam/${item.malichthi}`}
                      className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group"
                    >
                      <div className="w-full aspect-video bg-gradient-to-r bg-primary relative">
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1">
                          {new Date(item.ngaythi).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold group-hover:text-secondary transition line-clamp-2 h-12">
                          {item.tenchungchi}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 mb-3 line-clamp-2 h-10">
                          {item.thongtinchitiet}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {new Date(item.ngaythi).toLocaleDateString()}
                          </div>
                          <div className="font-bold text-blue-800">
                            {item.lephithi.toLocaleString()} VND
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    // List view
                    <Link
                      key={item.malichthi}
                      to={`/exam/${item.malichthi}`}
                      className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group"
                    >
                      <div className="sm:w-1/3 aspect-video sm:aspect-auto bg-gradient-to-r bg-primary relative">
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1">
                          {new Date(item.ngaythi).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="p-4 sm:w-2/3">
                        <h3 className="font-semibold group-hover:text-secondary transition">
                          {item.tenchungchi}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 mb-3">
                          {item.thongtinchitiet}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span>
                            {new Date(item.ngaythi).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-blue-800 text-lg">
                            {item.lephithi.toLocaleString()} VND
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdSearch className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Exams Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting the filters or search keywords
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;
