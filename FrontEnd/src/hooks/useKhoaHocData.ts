import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { KhoaHoc } from "../components/Type/Types";

export function useCourseData(currentPage = 1, itemsPerPage = 10) {
  const [courses, setCourses] = useState<KhoaHoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/khoahoc/pagination?page=${currentPage}&size=${itemsPerPage}`
      );
      setCourses(response?.data?.data?.data || []);
      setTotalPages(response?.data?.data?.totalPages || 1);
    } catch (error) {
      console.error(error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, totalPages, refetch: fetchCourses };
}
