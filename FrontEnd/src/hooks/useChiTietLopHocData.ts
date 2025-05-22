import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { ChiTietLopHoc } from "../components/Type/Types";

export function useChiTietLopHocData(currentPage: number, itemsPerPage: number) {
  const [ctlhList, setCtlhList] = useState<ChiTietLopHoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);




  const fetchCtlh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/ctlh/pagination?page=${currentPage}&size=${itemsPerPage}`
      );
      setCtlhList(response.data.data.data || []);
      setTotalPages(response.data.data.totalPages || 1);
    } catch {
      setCtlhList([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchCtlh();
  }, [fetchCtlh]);

  return { ctlhList, loading, totalPages, refetch: fetchCtlh };
}