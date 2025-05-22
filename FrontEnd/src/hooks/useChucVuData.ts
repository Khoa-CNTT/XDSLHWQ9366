import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ChucVu } from "../components/Type/Types";

export function useChucVuData(currentPage: number, itemsPerPage: number) {
  const [chucVus, setChucVus] = useState<ChucVu[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);



    const fetchChucVus = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/chucvu/pagination??page=${currentPage}&size=${itemsPerPage}`
      );
      setChucVus(response.data.data.data || []);
      setTotalPages(response.data.data.totalPages || 1);
    } catch {
      setChucVus([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);
  useEffect(() => {
    fetchChucVus();
  }, [fetchChucVus]);
  return { chucVus, loading, totalPages, refetch:fetchChucVus };
}