import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { LienHe } from "../components/Type/Types";

export function useLienHeData() {
const [lienHes, setLienHes] = useState<LienHe[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLienHes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/lienhe/getAll");
      setLienHes(response.data?.data || []);
    } catch {
      setLienHes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLienHes();
  }, [fetchLienHes]);

  return { lienHes, loading,  refetch: fetchLienHes };
}