import { useEffect, useState } from "react";
import axios from "axios";
import { LichThi } from "../components/Type/Types";

export function useLichThiData() {
  const [lichThis, setLichThis] = useState<LichThi[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchLichThis = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/lichthi/getAll");
        setLichThis(response.data?.data || []);
      } catch {
        setLichThis([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLichThis();
  }, []);

  return { lichThis, loading };
}