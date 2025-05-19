import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { GiangVien } from "../components/Type/Types";

export function useLecturerData() {
  const [lecturers, setLecturers] = useState<GiangVien[]>([]);
  const [loading, setLoading] = useState(false);

  // Dữ liệu mẫu
  const sampleLecturers = useMemo<GiangVien[]>(
    () => [
      {
        maGiangVien: "GV001",
        tenGiangVien: "Le Đức Thảo",
        ngaySinh: "1997-08-15",
        gioiTinh: true,
        soCMND: "048097000077",
        soDienThoai: "0385665243",
        email: "ducthao2112@GMAIL.com",
        diaChi: "108 Nguyễn Chánh",
        coQuanCongTac: "Đại học Duy tân",
        tinhTrangCongTac: "Đang dạy",
        maLinhVuc: "LV01",
        ghiChu: "Cộng tác viên",
        urlHinhDaiDien: "/assets/Anhthe.jpg",
      },
      {
        maGiangVien: "GV002",
        tenGiangVien: "Nguyễn Hữu Thành",
        ngaySinh: "2003-08-10",
        gioiTinh: true,
        soCMND: "123456789",
        soDienThoai: "0385665243",
        email: "thanhnh2112@GMAIL.com",
        diaChi: "108 Nguyễn Chánh",
        coQuanCongTac: "Đại học Duy tân",
        tinhTrangCongTac: "Đã nghỉ",
        maLinhVuc: "LV02",
        ghiChu: "Thực tập",
        urlHinhDaiDien: "",
      },
    ],
    []
  );

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchLecturers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/giangvien/pagination?page=1&size=100"
        );
        if (response.status === 200) {
          const { data: paginationData } = response.data;
          setLecturers(paginationData?.data || []);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API giảng viên:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  // Nếu API không trả về dữ liệu, dùng dữ liệu mẫu
  const displayLecturers = lecturers.length > 0 ? lecturers : sampleLecturers;

  return { lecturers: displayLecturers, loading };
}