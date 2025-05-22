import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { ThiSinh } from "../components/Type/Types";

export function useThiSinhData(currentPage: number, itemsPerPage: number) {
  const [thiSinhs, setThiSinhs] = useState<ThiSinh[]>([]);
  const [loading, setLoading] = useState(false);

  const sampleThiSinhs = useMemo<ThiSinh[]>(
    () => [

      {
        maThiSinhDuThi: "TS02",
        tenThiSinhDuThi: "Nguyễn Văn B",
        ngaySinh: "2000-01-01",
        gioiTinh: "true",
        soCMND: "123456789",
        soDienThoai: "0123456789",
        email: "123123",
        diaChi: "123123",
        dienDangKy: "Offline",
        maLichThi: "LT02",
        maPhongThi: "P01",
        diem: "9",
        xepLoai: "P01",
        ngayCapChungChi: "2023-10-01",
        ghiChu: "123123123123",
        urlHinhDaiDien: "https://example.com/image.jpg",
      },
      {
        maThiSinhDuThi: "TS03",
        tenThiSinhDuThi: "Nguyễn Văn C",
        ngaySinh: "2000-01-01",
        gioiTinh: "true",
        soCMND: "123456789",
        soDienThoai: "0123456789",
        email: "123123",
        diaChi: "123123",
        dienDangKy: "online",
        maLichThi: "LT03",
        maPhongThi: "P02",
        diem: "8",
        xepLoai: "P01",
        ngayCapChungChi: "2023-10-01",
        ghiChu: "123123123123",
        urlHinhDaiDien: "https://example.com/image.jpg",
      },
    ],
    []
  );



  const fetchThiSinhs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get( `http://localhost:8080/thisinh/pagination?page=${currentPage}&size=${itemsPerPage}`
        );
        setThiSinhs(response.data.data.data || []);
    } catch {
      setThiSinhs([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchThiSinhs();
  }, [fetchThiSinhs]);

  const displayThiSinhs = thiSinhs.length > 0 ? thiSinhs : sampleThiSinhs;
  return { thiSinhs: displayThiSinhs, loading,refetch: fetchThiSinhs};
}