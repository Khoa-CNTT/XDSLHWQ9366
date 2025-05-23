import { useEffect, useState,  useCallback } from "react";
import axios from "axios";
import { ThiSinh } from "../components/Type/Types";

export function useThiSinhData(currentPage: number, itemsPerPage: number) {
  const [thiSinhs, setThiSinhs] = useState<ThiSinh[]>([]);
  const [loading, setLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

  const fetchThiSinhs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get( `http://localhost:8080/thisinh/pagination?page=${currentPage}&size=${itemsPerPage}`
        );
        setThiSinhs(response.data.data.data || []);
      setTotalPages(response?.data?.data?.totalPages || 1);

    } catch {
      setThiSinhs([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchThiSinhs();
  }, [fetchThiSinhs]);

  return { thiSinhs, loading,totalPages,refetch: fetchThiSinhs};
}