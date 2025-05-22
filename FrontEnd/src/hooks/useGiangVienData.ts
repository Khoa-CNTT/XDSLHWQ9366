import { useCallback, useEffect, useState, } from "react";
import axios from "axios";
import { GiangVien } from "../components/Type/Types";

export function useLecturerData(currentPage: number, itemsPerPage: number) {
  const [giangviens, setGiangViens] = useState<GiangVien[]>([]);
  const [loading, setLoading] = useState(false);

    const [totalPages, setTotalPages] = useState(1);
  
    const fetchLecturers = useCallback(async () => {
      setLoading(true);
      try {
        const response = await axios.get(
        `http://localhost:8080/giangvien/pagination??page=${currentPage}&size=${itemsPerPage}`
        );
        setGiangViens(response.data.data.data || []);
        setTotalPages(response.data.data.totalPages || 1);
      } catch {
        setGiangViens([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }, [currentPage, itemsPerPage]);
  
   
    useEffect(() => {
      fetchLecturers();
    }, [fetchLecturers]);

  return { giangviens, loading, totalPages, refetch: fetchLecturers };
}