import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { NhanVien } from "../components/Type/Types";

export function useNhanVienData() {
  const [nhanViens, setNhanViens] = useState<NhanVien[]>([]);
  const [loading, setLoading] = useState(false);

  const sampleNhanViens = useMemo<NhanVien[]>(
    () => [
      {
        maNhanVien: "NV001",
        tenNhanVien: "Nguyễn Văn A",
        ngaySinh: "1990-01-01",
        gioiTinh: true,
        soCMND: "123456789",
        soDienThoai: "0901234567",
        email: "a@example.com",
        diaChi: "Hà Nội",
        coQuan: "Công ty ABC",
        tinhTrang: "Đang làm",
        maLinhVuc: "LV01",
        ghiChu: "Nhân viên hành chính",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchNhanViens = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/nhanvien/all");
        setNhanViens(response.data?.data || []);
      } catch {
        setNhanViens([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNhanViens();
  }, []);

  const displayNhanViens = nhanViens.length > 0 ? nhanViens : sampleNhanViens;
  return { nhanViens: displayNhanViens, loading };
}