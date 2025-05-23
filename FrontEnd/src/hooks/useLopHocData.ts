import { useEffect, useState,  useCallback } from "react";
import axios from "axios";
import { LopHoc } from "../components/Type/Types";

export function useLopHocData(currentPage: number, itemsPerPage: number) {
  const [totalPages, setTotalPages] = useState(1);
const [lopHocs, setLopHocs] = useState<LopHoc[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLopHocs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/lophoc/pagination?page=${currentPage}&size=${itemsPerPage}`
      );
      setLopHocs(response.data.data.data || []);
      setTotalPages(response.data.data.data.totalPages || 1);
    } catch {
      setLopHocs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchLopHocs();
  }, [fetchLopHocs]);

  return { lopHocs, loading, totalPages, refetch: fetchLopHocs };
}