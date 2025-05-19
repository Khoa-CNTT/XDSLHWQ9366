import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { LienHe } from "../components/Type/Types";

export function useLienHeData() {
  const [lienHes, setLienHes] = useState<LienHe[]>([]);
  const [loading, setLoading] = useState(false);

  const sampleLienHes = useMemo<LienHe[]>(
    () => [
      {
        maKhach: "KH001",
        hoTen: "Nguyễn Văn D",
        soDienThoai: "0911111111",
        email: "d@example.com",
        yKien: "Tư vấn khoá học",
        ngayLienHe: "2024-06-10",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchLienHes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/lienhe/all");
        setLienHes(response.data?.data || []);
      } catch {
        setLienHes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLienHes();
  }, []);

  const displayLienHes = lienHes.length > 0 ? lienHes : sampleLienHes;
  return { lienHes: displayLienHes, loading };
}