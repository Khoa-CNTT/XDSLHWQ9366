import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ThiSinh } from "../components/Type/Types";

export function useThiSinhData() {
  const [thiSinhs, setThiSinhs] = useState<ThiSinh[]>([]);
  const [loading, setLoading] = useState(false);

  const sampleThiSinhs = useMemo<ThiSinh[]>(
    () => [
      {
        maThiSinhDuThi: "TS001",
        tenThiSinhDuThi: "Nguyễn Văn C",
        ngaySinh: "1995-03-15",
        gioiTinh: "Nam",
        soCMND: "123123123",
        soDienThoai: "0909999999",
        email: "c@example.com",
        diaChi: "HCM",
        dienDangKy: "ONLINE",
        maLichThi: "LT001",
        maPhongThi: "PH001",
        diem: "8.5",
        xepLoai: "Giỏi",
        ngayCapChungChi: "2024-07-10",
        ghiChu: "",
        urlHinhDaiDien: null,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchThiSinhs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/thisinh/all");
        setThiSinhs(response.data?.data || []);
      } catch {
        setThiSinhs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchThiSinhs();
  }, []);

  const displayThiSinhs = thiSinhs.length > 0 ? thiSinhs : sampleThiSinhs;
  return { thiSinhs: displayThiSinhs, loading };
}