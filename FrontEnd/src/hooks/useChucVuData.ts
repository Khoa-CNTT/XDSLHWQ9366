import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ChucVu } from "../components/Type/Types";

export function useChucVuData() {
  const [chucVus, setChucVus] = useState<ChucVu[]>([]);
  const [loading, setLoading] = useState(false);

  const sampleChucVus = useMemo<ChucVu[]>(
    () => [
      {
        maChucVu: "AD001",
        tenChucVu: "Admin",
        trangThai: "Đang hoạt động",
      },
      {
        maChucVu: "GV001",
        tenChucVu: "Giảng Viên",
        trangThai: "Đang hoạt động",
      },
      {
        maChucVu: "NV001",
        tenChucVu: "Nhân Viên",
        trangThai: "Đang hoạt động",
      },
      {
        maChucVu: "HV001",
        tenChucVu: "Học Viên",
        trangThai: "Đang hoạt động",
      },
      {
        maChucVu: "KT001",
        tenChucVu: "Kế Toán",
        trangThai: "Đang hoạt động",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchChucVus = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/chucvu/all");
        setChucVus(response.data?.data || []);
      } catch {
        setChucVus([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChucVus();
  }, []);

  const displayChucVus = chucVus.length > 0 ? chucVus : sampleChucVus;
  return { chucVus: displayChucVus, loading };
}