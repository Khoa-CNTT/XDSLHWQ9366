import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { LinhVuc } from "../components/Type/Types";

export function useLinhVucData() {
  const [linhVucs, setLinhVucs] = useState<LinhVuc[]>([]);
  const [loading, setLoading] = useState(false);

  // Dữ liệu mẫu
  const sampleLinhVucs = useMemo<LinhVuc[]>(
    () => [
      { maLinhVuc: "LV01", tenLinhVuc: "Java" },
      { maLinhVuc: "LV02", tenLinhVuc: "IOT" },
      { maLinhVuc: "LV03", tenLinhVuc: "Công nghệ thông tin" },
      { maLinhVuc: "LV04", tenLinhVuc: "Khoa học máy tính" },
    ],
    []
  );

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchLinhVucs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/linhvuc");
        if (response.status === 200) {
          setLinhVucs(response.data || []);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API lĩnh vực:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinhVucs();
  }, []);

  // Nếu API không trả về dữ liệu, dùng dữ liệu mẫu
  const displayLinhVucs = linhVucs.length > 0 ? linhVucs : sampleLinhVucs;

  return { linhVucs: displayLinhVucs, loading };
}