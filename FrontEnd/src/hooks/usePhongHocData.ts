import { useEffect, useState,  useCallback } from "react";
import axios from "axios";
import { PhongHoc } from "../components/Type/Types";

export function usePhongHocData(currentPage: number, itemsPerPage: number) {

    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [phongHocs, setPhongHocs] = useState<PhongHoc[]>([]);
  
  
    const fetchPhongHocs = useCallback(async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/phonghoc/pagination?page=${currentPage}&size=${itemsPerPage}`
        );
        setPhongHocs(response.data.data.data || []);
        setTotalPages(response.data.data.totalPages || 1);
      } catch {
        setPhongHocs([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }, [currentPage, itemsPerPage]);
  
    useEffect(() => {
      fetchPhongHocs();
    }, [fetchPhongHocs]);
  
    return { phongHocs, loading, totalPages, refetch: fetchPhongHocs };
}