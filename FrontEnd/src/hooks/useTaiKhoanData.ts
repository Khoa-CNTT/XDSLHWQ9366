import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { TaiKhoan } from "../components/Type/Types";



export function useTaiKhoanData() {
  const [taiKhoans, setTaiKhoans] = useState<TaiKhoan[]>([]);
  const [loading, setLoading] = useState(false);

  const sampleTaiKhoans = useMemo<TaiKhoan[]>(
    () => [
      {
        maTaiKhoan: "TK001",
        tenDangNhap: "admin",
        tenNguoiDung:"Quản Trị Viên",
        matKhau: "123456",
        quyen: "Admin",
        trangThai: "Đang hoạt động",
      },
       {
        maTaiKhoan: "GV01",
        tenDangNhap: "ducthao2112",
        
        tenNguoiDung:"Lê Đức Thảo",
        matKhau: "123456",
        quyen: "Giảng viên",
        trangThai: "Đang hoạt động",
      },
      {
        maTaiKhoan: "GV02",
        tenDangNhap: "ngocanh2112",
        tenNguoiDung: "Trương Thị Ngọc Ánh",
        matKhau: "123456",
        quyen: "Giảng viên",
        trangThai: "Đang hoạt động",
      },
      {
        maTaiKhoan: "GV03",
        tenDangNhap: "thanhanh2112",
        tenNguoiDung: "Nguyễn Thanh Anh",
        matKhau: "123456",
        quyen: "Giảng viên",
        trangThai: "Đang hoạt động",
      },
      {
        maTaiKhoan: "KT01",
        tenDangNhap:  "doanhuy2112",
        tenNguoiDung:"Đoàn Văn Huy",
        matKhau: "123456",
        quyen: "Kế toán",
        trangThai: "Đang hoạt động",
      },
      {
        maTaiKhoan: "HV05",
        tenDangNhap: "huuthanh2112",
        tenNguoiDung: "Nguyễn Hữu Thành",
        matKhau: "123456",
        quyen: "Học viên",
        trangThai: "Đang hoạt động",
      },
      {
        maTaiKhoan: "NV06",
        tenDangNhap:  "levana2112",
        tenNguoiDung:"Lê Văn A",
        matKhau: "123456",
        quyen: "Nhân viên",
        trangThai: "Đang hoạt động",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchTaiKhoans = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/taikhoan/all");
        setTaiKhoans(response.data?.data || []);
      } catch {
        setTaiKhoans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTaiKhoans();
  }, []);

  const displayTaiKhoans = taiKhoans.length > 0 ? taiKhoans : sampleTaiKhoans;
  return { taiKhoans: displayTaiKhoans, loading };
}