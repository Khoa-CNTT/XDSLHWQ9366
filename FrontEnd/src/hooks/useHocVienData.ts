import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { HocVien } from "../components/Type/Types";

export function useHocVienData() {
  const [hocViens, setHocViens] = useState<HocVien[]>([]);
  const [loading, setLoading] = useState(false);

  const sampleHocViens = useMemo<HocVien[]>(
    () => [
      {
        maHocVien: "HV001",
        tenHocVien: "Trần Thị B",
        ngaySinh: "2000-05-10",
        gioiTinh: "Nữ",
        soCMND: "987654321",
        soDienThoai: "0912345678",
        email: "b@example.com",
        diaChi: "Đà Nẵng",
        coQuanCongTac: "Trường XYZ",
        tinhTrangHocTap: "Đang học",
        nguoiNhapThongTin: "Admin",
        ghiChu: "",
        urlHinhDaiDien: null,
        ngayCapNhatGanNhat: "2024-01-01",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchHocViens = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/hocvien/pagination?page=&size=");
        setHocViens(response.data?.data?.data || []);
      } catch {
        setHocViens([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHocViens();
  }, []);

  const displayHocViens = hocViens.length > 0 ? hocViens : sampleHocViens;
  return { hocViens: displayHocViens, loading };
}