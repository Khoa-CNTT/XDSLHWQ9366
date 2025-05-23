

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { HocVien,  } from "../components/Type/Types";

export function useHocVienData(currentPage = 1, itemsPerPage = 10) {
  const [hocViens, setHocViens] = useState<HocVien[]>([]);

  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHocViens = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/hocvien/pagination?page=${currentPage}&size=${itemsPerPage}`
      );
      setHocViens(response?.data?.data?.data || []);
      setTotalPages(response?.data?.data?.totalPages || 1);
    } catch (error) {
      console.error(error);
      setHocViens([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchHocViens();
  }, [fetchHocViens]);

  return { hocViens, loading, totalPages, refetch: fetchHocViens };
}
