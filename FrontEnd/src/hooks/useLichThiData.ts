import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { LichThi } from "../components/Type/Types";

export function useLichThiData() {
  const [lichThis, setLichThis] = useState<LichThi[]>([]);
  const [loading, setLoading] = useState(false);

  const sampleLichThis = useMemo<LichThi[]>(
    () => [
      {
        maLichThi: "LT001",
        maLinhVuc: "LV01",
        tenChungChi: "test",
        ngayThi: "2024-07-01",
        thongTinChiTiet: "Phòng 101, 8h sáng",
        lePhiThi: 500000,
      },
    ],
    []
  );

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

  const displayLichThis = lichThis.length > 0 ? lichThis : sampleLichThis;
  return { lichThis: displayLichThis, loading };
}