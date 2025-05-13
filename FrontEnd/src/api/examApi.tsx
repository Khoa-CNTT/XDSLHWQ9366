import React, { useState, useEffect } from "react";
import axios from "axios";

interface LinhVuc {
  maLinhVuc: string;
  tenLinhVuc: string;
}

interface Exam {
  maLichThi: string;
  linhVuc: LinhVuc;
  tenChungChi: string;
  ngayThi: string;
  thongTinChiTiet: string;
  lePhiThi: number;
  thiSinhDuThi: unknown[];
}

interface ApiResponse {
  status: number;
  message: string;
  data: Exam[];
}

interface ExamApiProps {
  children: (props: {
    filteredExams: Exam[];
    isLoading: boolean;
    error: string | null;
    category: string;
    sortBy: string;
    priceRange: { min: number; max: number };
    viewMode: string;
    showFilters: boolean;
    categories: { value: string; label: string }[];
    priceRanges: { min: number; max: number; label: string }[];
    handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handlePriceRangeChange: (min: number | null, max: number | null) => void;
    resetFilters: () => void;
    setViewMode: (mode: string) => void;
    setShowFilters: (show: boolean) => void;
  }) => React.ReactNode;
}

const ExamApi: React.FC<ExamApiProps> = ({ children }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [exams, setExams] = useState<Exam[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([{ value: "All", label: "All" }]);
  const [priceRanges, setPriceRanges] = useState<
    { min: number; max: number; label: string }[]
  >([
    { min: 0, max: 300000, label: "Under 300,000 VND" },
    { min: 300000, max: 500000, label: "300,000 - 500,000 VND" },
    { min: 500000, max: 1000000, label: "Over 500,000 VND" },
  ]);

  const fetchExams = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<ApiResponse>(
        `http://localhost:8080/lichthi/getAll`
      );
      setExams(response.data.data);
      setFilteredExams(response.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Unable to fetch exam list.");
      } else {
        setError("An unexpected error occurred.");
      }
      setExams([]);
      setFilteredExams([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (exams.length > 0) {
      const uniqueCategories = [
        { value: "All", label: "All" },
        ...Array.from(
          new Map(
            exams.map((exam) => [
              exam.linhVuc.maLinhVuc,
              {
                value: exam.linhVuc.maLinhVuc,
                label: exam.linhVuc.tenLinhVuc,
              },
            ])
          ).values()
        ),
      ];
      setCategories(uniqueCategories);

      // Dynamic price ranges similar to CourseApi structure
      const fees = exams.map((exam) => exam.lePhiThi);
      const minFee = Math.min(...fees);
      const maxFee = Math.max(...fees);
      const rangeStep = maxFee > minFee ? (maxFee - minFee) / 2 : 100000; // Divide into two steps to create three ranges
      const midPoint1 = Math.round(minFee + rangeStep);
      const midPoint2 = Math.round(minFee + 2 * rangeStep);

      setPriceRanges([
        {
          min: 0,
          max: midPoint1,
          label: `Under ${midPoint1.toLocaleString()} VND`,
        },
        {
          min: midPoint1,
          max: midPoint2,
          label: `${midPoint1.toLocaleString()} - ${midPoint2.toLocaleString()} VND`,
        },
        {
          min: midPoint2,
          max: maxFee,
          label: `Over ${midPoint2.toLocaleString()} VND`,
        },
      ]);
      setPriceRange({ min: 0, max: maxFee });
    }
  }, [exams]);

  const filterData = () => {
    if (!exams.length) {
      setFilteredExams([]);
      return;
    }

    let result = [...exams];

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((exam) =>
        exam.tenChungChi.toLowerCase().includes(lowerSearch)
      );
    }

    if (category !== "All") {
      result = result.filter((exam) => exam.linhVuc.maLinhVuc === category);
    }

    result = result.filter(
      (exam) =>
        exam.lePhiThi >= priceRange.min && exam.lePhiThi <= priceRange.max
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.lePhiThi - b.lePhiThi);
        break;
      case "price-desc":
        result.sort((a, b) => b.lePhiThi - a.lePhiThi);
        break;
      case "name-asc":
        result.sort((a, b) => a.tenChungChi.localeCompare(b.tenChungChi));
        break;
      case "date-asc":
        result.sort(
          (a, b) =>
            new Date(a.ngayThi).getTime() - new Date(b.ngayThi).getTime()
        );
        break;
      default:
        break;
    }

    setFilteredExams(result);
  };

  useEffect(() => {
    filterData();
  }, [search, category, sortBy, priceRange, exams]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
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

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("default");
    setPriceRange({
      min: 0,
      max:
        exams.length > 0 ? Math.max(...exams.map((e) => e.lePhiThi)) : 1000000,
    });
    setFilteredExams(exams);
  };

  return children({
    filteredExams,
    isLoading,
    error,
    category,
    sortBy,
    priceRange,
    viewMode,
    showFilters,
    categories,
    priceRanges,
    handleSearchInputChange,
    handleCategoryChange,
    handleSortChange,
    handlePriceRangeChange,
    resetFilters,
    setViewMode,
    setShowFilters,
  });
};

export default ExamApi;
