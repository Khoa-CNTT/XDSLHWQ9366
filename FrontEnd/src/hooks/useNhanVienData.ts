import { useEffect, useState,  useCallback } from "react";
import axios from "axios";
import { NhanVien } from "../components/Type/Types";

export function useNhanVienData(currentPage: number, itemsPerPage: number) {
  const [totalPages, setTotalPages] = useState(1);

 const [nhanViens, setNhanViens] = useState<NhanVien[]>([]);
  const [loading, setLoading] = useState(false);


  const fetchNhanViens = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/nhanvien/pagination?page=${currentPage}&size=${itemsPerPage}`
      );
      setNhanViens(response.data.data || []);
      
      setTotalPages(response.data.data.totalPages || 1);
    } catch {
      setNhanViens([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchNhanViens();
  }, [fetchNhanViens]);

  return { nhanViens, loading, totalPages, refetch: fetchNhanViens };
 

}