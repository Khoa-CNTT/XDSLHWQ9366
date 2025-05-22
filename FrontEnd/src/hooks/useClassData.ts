import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { LopHoc } from "../components/Type/Types";

export function useLopHocData() {
  const [lopHocs, setLopHocs] = useState<LopHoc[]>([]);
  const [loading, setLoading] = useState(false);

  const sampleLopHocs = useMemo<LopHoc[]>(
    () => [
      {
        maLopHoc: "LH001",
        tenLopHoc: "Lớp Java cơ bản",
        lichHoc: "Thứ 2, 4, 6 - 18:00 đến 20:00",
        tinhTrang: "Đang mở đăng ký",
        ngayBatDau: "2024-06-01",
        ngayKetThuc: "2024-08-01",
        thuLao: 2000000,
        daThanhToan: "Chưa",
        maKhoaHoc: "KH001",
        maPhongHoc: "PH001",
        maGiangVien: "GV001",
        maNhanVien: "NV001",
        ghiChu: "",
      },
      {
        maLopHoc: "LH002",
        tenLopHoc: "Lớp Python cơ bản",
        lichHoc: "Thứ 2,  6 - 18:00 đến 20:00",
        tinhTrang: "Đang mở đăng ký",
        ngayBatDau: "2025-04-01",
        ngayKetThuc: "2025-05-01",
        thuLao: 2000000,
        daThanhToan: "Chưa",
        maKhoaHoc: "KH001",
        maPhongHoc: "PH001",
        maGiangVien: "GV001",
        maNhanVien: "NV001",
        ghiChu: "",
      },
      {
        maLopHoc: "LH003",
        tenLopHoc: "Lớp C++ cơ bản",
        lichHoc: "Thứ 2, 4, 6 - 18:00 đến 20:00",
        tinhTrang: "Đang mở đăng ký",
        ngayBatDau: "2024-06-01",
        ngayKetThuc: "2024-08-01",
        thuLao: 2000000,
        daThanhToan: "Chưa",
        maKhoaHoc: "KH001",
        maPhongHoc: "PH001",
        maGiangVien: "GV001",
        maNhanVien: "NV001",
        ghiChu: "",
      },
      {
        maLopHoc: "LH004",
        tenLopHoc: "Lớp Java nâng cao",
        lichHoc: "Thứ 2, 4, 6 - 18:00 đến 20:00",
        tinhTrang: "Đang đầy",
        ngayBatDau: "2024-06-01",
        ngayKetThuc: "2024-08-01",
        thuLao: 2000000,
        daThanhToan: "Chưa",
        maKhoaHoc: "KH001",
        maPhongHoc: "PH001",
        maGiangVien: "GV001",
        maNhanVien: "NV001",
        ghiChu: "",
      },

    ],
    []
  );

  useEffect(() => {
    const fetchLopHocs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/lophoc/all");
        setLopHocs(response.data?.data || []);
      } catch {
        setLopHocs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLopHocs();
  }, []);

  const displayLopHocs = lopHocs.length > 0 ? lopHocs : sampleLopHocs;
  return { lopHocs: displayLopHocs, loading };
}