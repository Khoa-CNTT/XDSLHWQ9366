import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdSearch,
  MdGridView,
  MdViewList,
  MdTune,
  MdClose,
  MdCheckCircle,
  MdStarRate,
} from "react-icons/md";
import CourseApi from "../../api/courseApi";
import CountUp from "../../components/Animation/CountUp";
import Loading from "../../components/Loading/Loading";

const FadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const categories = [
  { value: "All", label: "All" },
  { value: "LV001", label: "Web Programming" },
  { value: "LV002", label: "Mobile Programming" },
  { value: "LV003", label: "SQL" },
  { value: "LV004", label: "DevOps" },
  { value: "LV005", label: "Computer Networking" },
];

const Courses = () => {
  const location = useLocation();
  const path = location.pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment, idx, arr) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: "/" + arr.slice(0, idx + 1).join("/"),
    }));

  return (
    <CourseApi>
      {({
        filteredCourses,
        isLoading,
        error,
        currentPage,
        totalPages,
        totalElements,
        category,
        sortBy,
        priceRange,
        selectedDifficulty,
        viewMode,
        showFilters,
        handleSearchInputChange,
        handleCategoryChange,
        handleSortChange,
        handlePriceRangeChange,
        toggleDifficulty,
        resetFilters,
        handlePageChange,
        setViewMode,
        setShowFilters,
        getCourseDifficulty,
      }) => (
        <div className="min-h-screen bg-gray-50 text-gray-800 pt-20">
          {/* Header section */}
          <div className="bg-gradient-to-r bg-primary text-blue-900 py-16">
            <div className="max-w-6xl mx-auto px-6">
              <div className="max-w-3xl">
                <motion.h1
                  variants={FadeUp(0.2)}
                  initial="initial"
                  animate="animate"
                  className="text-4xl md:text-5xl font-bold mb-4"
                >
                  Explore Courses
                </motion.h1>
                <motion.p
                  variants={FadeUp(0.4)}
                  initial="initial"
                  animate="animate"
                  className="text-lg text-blue-900 mb-8"
                >
                  Enhance your skills with high-quality courses from top experts
                </motion.p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Search is handled via handleSearchInputChange
                  }}
                  className="relative"
                >
                  <input
                    type="text"
                    onChange={handleSearchInputChange}
                    placeholder="Search for courses you are interested in..."
                    className="w-full px-5 py-4 pr-12 rounded-xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-800 text-gray-800"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-4 text-2xl text-gray-400"
                  >
                    <MdSearch />
                  </button>
                </form>
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
                      <Link
                        to={p.path}
                        className="text-secondary hover:underline"
                      >
                        {p.name}
                      </Link>
                    </span>
                  ))}
                </p>
                <h2 className="text-2xl font-bold">
                  {category === "All"
                    ? "All Courses"
                    : `Courses in the category ${
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
                    <option value="default">Default sorting</option>
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
              {/* Filter sidebar */}
              <div
                className={`md:w-1/4 bg-white rounded-xl shadow-sm p-6 ${
                  showFilters
                    ? "fixed inset-0 z-50 overflow-auto"
                    : "hidden md:block"
                }`}
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
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <button
                      className={`w-full text-left px-3 py-2 rounded ${
                        priceRange.max === 1000000
                          ? "bg-gray-100 text-secondary"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handlePriceRangeChange(0, 1000000)}
                    >
                      Under 1,000,000 VND
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 rounded ${
                        priceRange.min === 1000000 && priceRange.max === 2500000
                          ? "bg-gray-100 text-secondary"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handlePriceRangeChange(1000000, 2500000)}
                    >
                      1,000,000 - 2,500,000 VND
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 rounded ${
                        priceRange.min === 2500000
                          ? "bg-gray-100 text-secondary"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handlePriceRangeChange(2500000, 4000000)}
                    >
                      Over 2,500,000 VND
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Level</h4>
                  <div className="space-y-2">
                    {["Basic", "Intermediate", "Advanced"].map((diff) => (
                      <div
                        key={diff}
                        className="flex items-center cursor-pointer"
                        onClick={() => toggleDifficulty(diff)}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            selectedDifficulty.includes(diff)
                              ? "bg-secondary text-white"
                              : "border border-gray-300"
                          }`}
                        >
                          {selectedDifficulty.includes(diff) && (
                            <MdCheckCircle className="text-white text-sm" />
                          )}
                        </div>
                        <span className="ml-3">{diff}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={resetFilters}
                    className="w-full py-2 rounded-lg border border-secondary text-secondary hover:bg-gray-50 transition"
                  >
                    Reset Filters
                  </button>
                  {showFilters && (
                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-full mt-3 py-2 rounded-lg bg-secondary text-white hover:bg-primary transition md:hidden"
                    >
                      View {filteredCourses.length} courses
                    </button>
                  )}
                </div>
              </div>

              {/* Course list */}
              <div className="md:w-3/4">
                <div className="mb-6 md:hidden">
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 bg-white"
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Course Name: A-Z</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
                <div className="mb-4 text-sm text-gray-500">
                  Showing {filteredCourses.length} of {totalElements} courses
                </div>
                {error && (
                  <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4">
                    {error}
                  </div>
                )}
                {isLoading ? (
                  <Loading message="Loading course list..." />
                ) : filteredCourses.length > 0 ? (
                  <>
                    <motion.div
                      variants={FadeUp(0.9)}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                          : "space-y-6"
                      }
                    >
                      {filteredCourses.map((course) =>
                        viewMode === "grid" ? (
                          <Link
                            key={course.maKhoaHoc}
                            to={`/course/${course.maKhoaHoc}`}
                            className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group"
                          >
                            <div className="w-full aspect-video bg-gradient-to-r bg-primary relative">
                              <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1">
                                {course.soBuoi} sessions
                              </div>
                              <div className="absolute top-3 right-3 bg-blue-800 text-white text-xs rounded-full h-8 w-8 flex items-center justify-center">
                                {getCourseDifficulty(course.maKhoaHoc).charAt(
                                  0
                                )}
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold group-hover:text-blue-800 transition line-clamp-2 h-12">
                                {course.tenKhoaHoc}
                              </h3>
                              <p className="text-sm text-gray-600 mt-2 mb-3 line-clamp-2 h-10">
                                {course.noiDungTomTatKhoaHoc}
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
                                <span>{course.soBuoi} sessions</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                  {getCourseDifficulty(course.maKhoaHoc)}
                                </div>
                                <div className="font-bold text-blue-800">
                                  <CountUp
                                    from={0}
                                    to={course.hocPhi}
                                    separator=","
                                    direction="up"
                                    duration={0.1}
                                    className="count-up-text"
                                  />
                                  VND
                                </div>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <Link
                            key={course.maKhoaHoc}
                            to={`/course/${course.maKhoaHoc}`}
                            className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group"
                          >
                            <div className="sm:w-1/3 aspect-video sm:aspect-auto bg-gradient-to-r bg-primary relative">
                              <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1">
                                {course.soBuoi} sessions
                              </div>
                              <div className="absolute top-3 right-3 bg-blue-800 text-white text-xs rounded-full h-8 w-8 flex items-center justify-center">
                                {getCourseDifficulty(course.maKhoaHoc).charAt(
                                  0
                                )}
                              </div>
                            </div>
                            <div className="p-4 sm:w-2/3">
                              <h3 className="font-semibold group-hover:text-blue-800 transition">
                                {course.tenKhoaHoc}
                              </h3>
                              <p className="text-sm text-gray-600 mt-2 mb-3">
                                {course.noiDungTomTatKhoaHoc}
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
                                <span>{course.soBuoi} sessions</span>
                                <span className="mx-2">•</span>
                                <span>
                                  {getCourseDifficulty(course.maKhoaHoc)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="font-bold text-blue-800 text-lg">
                                  {course.hocPhi.toLocaleString()} VND
                                </div>
                              </div>
                            </div>
                          </Link>
                        )
                      )}
                    </motion.div>
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <nav className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded-md ${
                              currentPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-secondary hover:bg-blue-50"
                            }`}
                          >
                            Previous
                          </button>
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-1 rounded-md ${
                                currentPage === page
                                  ? "bg-secondary text-white"
                                  : "bg-white text-secondary hover:bg-blue-50"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded-md ${
                              currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-secondary hover:bg-blue-50"
                            }`}
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <MdSearch className="text-4xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      No courses found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Please adjust the filters or search keywords
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
      )}
    </CourseApi>
  );
};

export default Courses;
