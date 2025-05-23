import { useEffect, useState,  useCallback } from "react";
import axios from "axios";
import { LinhVuc } from "../components/Type/Types";

export function useLinhVucData() {
  const [linhVucs, setLinhVucs] = useState<LinhVuc[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch dữ liệu từ API
 const fetchLinhVucs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/linhvuc/linhvucs");
      setLinhVucs(response.data.data || []);
    } catch {
      setLinhVucs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinhVucs();
  }, [fetchLinhVucs]);

  // Nếu API không trả về dữ liệu, dùng dữ liệu mẫu

  return { linhVucs, loading, refetch: fetchLinhVucs, };
}