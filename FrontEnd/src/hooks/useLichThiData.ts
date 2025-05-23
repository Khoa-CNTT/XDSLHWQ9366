import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { LichThi } from "../components/Type/Types";

export function useLichThiData() {
  const [lichThis, setLichThis] = useState<LichThi[]>([]);
  const [loading, setLoading] = useState(false);

   const fetchLichThis = useCallback(async () => {
      setLoading(true);
      try {
               const response = await axios.get("http://localhost:8080/lichthi/getAll");
        setLichThis(response.data?.data || []);

      
      } catch (error) {
        console.error(error);
        setLichThis([]);
      } finally {
        setLoading(false);
      }
    }, []);

useEffect(() => {
    fetchLichThis();
  }, [fetchLichThis]);

  return { lichThis,loading,  refetch: fetchLichThis};
}