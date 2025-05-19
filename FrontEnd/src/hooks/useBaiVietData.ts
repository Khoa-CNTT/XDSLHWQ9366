import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { BaiViet } from "../components/Type/Types";

export function useBaiVietData() {
  const [baiViets, setBaiViets] = useState<BaiViet[]>([]);
  const [loading, setLoading] = useState(false);

  const sampleBaiViets = useMemo<BaiViet[]>(
    () => [
      {
        maBaiViet: "BV001",
        tieuDe: "Giới thiệu trung tâm",
        luongTruyCap: "100",
        trangThai: "Đã đăng",
        ngayDang: "2024-06-01",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchBaiViets = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/baiviet/all");
        setBaiViets(response.data?.data || []);
      } catch {
        setBaiViets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBaiViets();
  }, []);

  const displayBaiViets = baiViets.length > 0 ? baiViets : sampleBaiViets;
  return { baiViets: displayBaiViets, loading };
}