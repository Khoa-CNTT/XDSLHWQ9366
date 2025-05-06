import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import coursesItems from "../../constants/courseData";

import {
  MdSearch,
  MdGridView,
  MdViewList,
  MdTune,
  MdClose,
  MdCheckCircle,
  MdStarRate,
} from "react-icons/md";

// Define interface for course data
interface Course {
  makhoahoc: string;
  tenkhoahoc: string;
  malinhvuc: string;
  sobuoi: number;
  hocphi: number;
  noidungtomtatkhoahoc: string;
  noidungkhoahoc: string;
  ghichu: string;
}

const categories = [
  { value: "All", label: "All" },
  { value: "Web programming", label: "Web programming" },
  { value: "Mobile programming", label: "Mobile programming" },
  { value: "SQL", label: "SQL" },
  { value: "DevOps", label: "DevOps" },
  { value: "Computer network", label: "Computer network" },
];

const Courses = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(coursesItems);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

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
    priceRangeValue: { min: number; max: number },
    difficultyValue: string[]
  ) => {
    const lowerSearch = searchValue.toLowerCase();

    let result = coursesItems.filter((item: Course) => {
      const matchName = item.tenkhoahoc.toLowerCase().includes(lowerSearch);
      const matchCategory =
        categoryValue === "All" || item.malinhvuc === categoryValue;
      const matchPrice =
        item.hocphi >= priceRangeValue.min &&
        item.hocphi <= priceRangeValue.max;
      const matchDifficulty =
        difficultyValue.length === 0 ||
        difficultyValue.includes(
          // Random difficulty assignment for demo
          ["Beginner", "Intermediate", "Advanced"][item.makhoahoc.length % 3]
        );
      return matchName && matchCategory && matchPrice && matchDifficulty;
    });

    // Apply sorting
    switch (sortValue) {
      case "price-asc":
        result = result.sort((a, b) => a.hocphi - b.hocphi);
        break;
      case "price-desc":
        result = result.sort((a, b) => b.hocphi - a.hocphi);
        break;
      case "name-asc":
        result = result.sort((a, b) =>
          a.tenkhoahoc.localeCompare(b.tenkhoahoc)
        );
        break;
      case "popular":
        // For demo, we'll sort by ID as a proxy for popularity
        result = result.sort((a, b) =>
          String(a.makhoahoc).localeCompare(String(b.makhoahoc))
        );
        break;
      default:
        // Default sorting (by ID)
        break;
    }

    setFiltered(result);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    filterData(value, category, sortBy, priceRange, selectedDifficulty);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    filterData(search, value, sortBy, priceRange, selectedDifficulty);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    filterData(search, category, value, priceRange, selectedDifficulty);
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
    filterData(search, category, sortBy, newRange, selectedDifficulty);
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
    const newDifficulties = selectedDifficulty.includes(difficulty)
      ? selectedDifficulty.filter((d) => d !== difficulty)
      : [...selectedDifficulty, difficulty];
    filterData(search, category, sortBy, priceRange, newDifficulties);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("default");
    setPriceRange({ min: 0, max: 2000000 });
    setSelectedDifficulty([]);
    setFiltered(coursesItems);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Enhance your skills with high-quality courses from leading
              industry experts
            </p>

            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search for courses you're interested in..."
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
                ? "All Courses"
                : `Courses in ${
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
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Course Name: A-Z</option>
                <option value="popular">Most Popular</option>
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
          {/* Filters Sidebar - Always visible on desktop, toggleable on mobile */}
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
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-2">
                <button
                  className={`w-full text-left px-3 py-2 rounded ${
                    priceRange.max === 500000
                      ? "bg-gray-100 text-secondary"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePriceRangeChange(0, 500000)}
                >
                  Under 500,000 VND
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${
                    priceRange.min === 500000 && priceRange.max === 1000000
                      ? "bg-gray-100 text-secondary"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePriceRangeChange(500000, 1000000)}
                >
                  500,000 - 1,000,000 VND
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${
                    priceRange.min === 1000000
                      ? "bg-gray-100 text-secondary"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePriceRangeChange(1000000, 2000000)}
                >
                  Over 1,000,000 VND
                </button>
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Level</h4>
              <div className="space-y-2">
                {difficulties.map((diff) => (
                  <div
                    key={diff}
                    className="flex items-center"
                    onClick={() => toggleDifficulty(diff)}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                        selectedDifficulty.includes(diff)
                          ? "bg-secondary text-white"
                          : "border border-gray-300"
                      }`}
                    >
                      {selectedDifficulty.includes(diff) && (
                        <MdCheckCircle className="text-white text-sm" />
                      )}
                    </div>
                    <span className="ml-3 cursor-pointer">{diff}</span>
                  </div>
                ))}
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
                  View {filtered.length} Courses
                </button>
              )}
            </div>
          </div>

          {/* Course List */}
          <div className="md:w-3/4">
            {/* Mobile sort controls */}
            <div className="mb-6 md:hidden">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 bg-white"
              >
                <option value="default">Default Sort</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Course Name: A-Z</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-gray-500">
              Showing {filtered.length} courses
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
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                    : "space-y-6"
                }
              >
                {filtered.map((item: Course) =>
                  viewMode === "grid" ? (
                    // Grid view
                    <Link
                      key={item.makhoahoc}
                      to={`/course/${item.makhoahoc}`}
                      className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group"
                    >
                      <div className="w-full aspect-video bg-gradient-to-r bg-primary relative">
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1">
                          {item.sobuoi} sessions
                        </div>
                        <div className="absolute top-3 right-3 bg-blue-800 text-white text-xs rounded-full h-8 w-8 flex items-center justify-center">
                          {["Beginner", "Intermediate", "Advanced"][
                            item.makhoahoc.length % 3
                          ].charAt(0)}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold group-hover:text-secondary transition line-clamp-2 h-12">
                          {item.tenkhoahoc}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 mb-3 line-clamp-2 h-10">
                          {item.noidungtomtatkhoahoc}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <MdStarRate className="text-yellow-400" />
                            <MdStarRate className="text-yellow-400" />
                            <MdStarRate className="text-yellow-400" />
                            <MdStarRate className="text-yellow-400" />
                            <MdStarRate className="text-gray-300" />
                            <span className="ml-1">4.0</span>
                          </span>
                          <span className="mx-2">•</span>
                          <span>{item.sobuoi} sessions</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {
                              ["Beginner", "Intermediate", "Advanced"][
                                item.makhoahoc.length % 3
                              ]
                            }
                          </div>
                          <div className="font-bold text-blue-800">
                            {item.hocphi.toLocaleString()} VND
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    // List view
                    <Link
                      key={item.makhoahoc}
                      to={`/course/${item.makhoahoc}`}
                      className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group"
                    >
                      <div className="sm:w-1/3 aspect-video sm:aspect-auto bg-gradient-to-r bg-primary relative">
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1">
                          {item.sobuoi} sessions
                        </div>
                        <div className="absolute top-3 right-3 bg-blue-800 text-white text-xs rounded-full h-8 w-8 flex items-center justify-center">
                          {["Beginner", "Intermediate", "Advanced"][
                            item.makhoahoc.length % 3
                          ].charAt(0)}
                        </div>
                      </div>
                      <div className="p-4 sm:w-2/3">
                        <h3 className="font-semibold group-hover:text-secondary transition">
                          {item.tenkhoahoc}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 mb-3">
                          {item.noidungtomtatkhoahoc}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <MdStarRate className="text-yellow-400" />
                            <MdStarRate className="text-yellow-400" />
                            <MdStarRate className="text-yellow-400" />
                            <MdStarRate className="text-yellow-400" />
                            <MdStarRate className="text-gray-300" />
                            <span className="ml-1">4.0</span>
                          </span>
                          <span className="mx-2">•</span>
                          <span>{item.sobuoi} sessions</span>
                          <span className="mx-2">•</span>
                          <span>
                            {
                              ["Beginner", "Intermediate", "Advanced"][
                                item.makhoahoc.length % 3
                              ]
                            }
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-blue-800 text-lg">
                            {item.hocphi.toLocaleString()} VND
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdSearch className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
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

export default Courses;
