import React, { useState, useEffect } from "react";
import axios from "axios";

// Định nghĩa interface cho dữ liệu API
interface LinhVuc {
  maLinhVuc: string;
  tenLinhVuc: string;
}

interface Course {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  linhVuc: LinhVuc;
  soBuoi: number;
  hocPhi: number;
  noiDungTomTatKhoaHoc: string;
  noiDungKhoaHoc: string;
  ghiChu: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data: {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    data: Course[];
  };
}

interface SearchResponse {
  status: number;
  message: string;
  data: Course[];
}

// Interface cho các props truyền sang Courses.tsx
interface CourseApiProps {
  children: (props: {
    courses: Course[];
    filteredCourses: Course[];
    isLoading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    totalElements: number;
    category: string;
    sortBy: string;
    priceRange: { min: number; max: number };
    selectedDifficulty: string[];
    viewMode: string;
    showFilters: boolean;
    handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handlePriceRangeChange: (min: number | null, max: number | null) => void;
    toggleDifficulty: (difficulty: string) => void;
    resetFilters: () => void;
    handlePageChange: (page: number) => void;
    setViewMode: (mode: string) => void;
    setShowFilters: (show: boolean) => void;
    getCourseDifficulty: (courseId: string) => string;
  }) => React.ReactNode; // Thay JSX.Element bằng React.ReactNode
}

const difficulties = ["Cơ bản", "Trung cấp", "Nâng cao"];

const CourseApi: React.FC<CourseApiProps> = ({ children }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 4000000 });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  const fetchCourses = async (page: number = 1, searchTerm: string = "") => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (searchTerm.trim()) {
        response = await axios.get<SearchResponse>(
          `http://localhost:8080/khoahoc/search/${encodeURIComponent(
            searchTerm
          )}`
        );
        console.log("Phản hồi tìm kiếm:", response.data);
        setCourses(response.data.data);
        setTotalElements(response.data.data.length);
        setTotalPages(1);
      } else {
        const params = { page, size: pageSize };
        response = await axios.get<ApiResponse>(
          `http://localhost:8080/khoahoc/pagination`,
          { params }
        );
        console.log("Phản hồi phân trang:", response.data);
        setCourses(response.data.data.data);
        setTotalPages(response.data.data.totalPages);
        setTotalElements(response.data.data.totalElements);
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách khóa học:", err);
      setError("Không thể lấy danh sách khóa học. Vui lòng thử lại.");
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage, search);
  }, [currentPage, search]);

  useEffect(() => {
    console.log("Danh sách khóa học:", courses);
    console.log("Khóa học đã lọc:", filteredCourses);
  }, [courses, filteredCourses]);

  const filterData = () => {
    if (!courses.length) {
      setFilteredCourses([]);
      return;
    }

    let result = [...courses];

    console.log("Giá trị bộ lọc:", {
      category,
      priceRange,
      selectedDifficulty,
      sortBy,
    });

    if (category !== "All") {
      result = result.filter(
        (course) => course.linhVuc?.maLinhVuc === category
      );
    }

    result = result.filter(
      (course) =>
        course.hocPhi >= priceRange.min && course.hocPhi <= priceRange.max
    );

    if (selectedDifficulty.length > 0) {
      result = result.filter((course) => {
        const difficultyIndex = course.maKhoaHoc.length % 3;
        const courseDifficulty = difficulties[difficultyIndex];
        return selectedDifficulty.includes(courseDifficulty);
      });
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.hocPhi - b.hocPhi);
        break;
      case "price-desc":
        result.sort((a, b) => b.hocPhi - b.hocPhi);
        break;
      case "name-asc":
        result.sort((a, b) => a.tenKhoaHoc.localeCompare(b.tenKhoaHoc));
        break;
      case "popular":
        result.sort((a, b) => a.maKhoaHoc.localeCompare(b.maKhoaHoc));
        break;
      default:
        break;
    }

    console.log("Kết quả lọc:", result);
    setFilteredCourses(result);
  };

  useEffect(() => {
    filterData();
  }, [category, priceRange, selectedDifficulty, sortBy, courses]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handlePriceRangeChange = (
    min: number | null = null,
    max: number | null = null
  ) => {
    setPriceRange({
      min: min !== null ? min : priceRange.min,
      max: max !== null ? max : priceRange.max,
    });
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("default");
    setPriceRange({ min: 0, max: 4000000 });
    setSelectedDifficulty([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getCourseDifficulty = (courseId: string) => {
    const difficultyIndex = courseId.length % 3;
    return difficulties[difficultyIndex];
  };

  return children({
    courses,
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
  });
};

export default CourseApi;
