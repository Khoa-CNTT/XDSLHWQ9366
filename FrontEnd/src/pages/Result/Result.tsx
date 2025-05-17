import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

// Interfaces
interface LinhVuc {
  maLinhVuc: string;
  tenLinhVuc: string;
}

interface KhoaHoc {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  linhVuc: LinhVuc;
  soBuoi: number;
  hocPhi: number;
  noiDungTomTatKhoaHoc: string;
  noiDungKhoaHoc: string;
  ghiChu: string | null;
}

interface PhongHoc {
  maPhongHoc: string;
  tenPhongHoc: string;
  soChoNgoi: number;
  ghiChu: string | null;
}

interface GiangVien {
  maGiangVien: string;
  tenGiangVien: string;
  ngaySinh: string;
  gioiTinh: boolean;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  coQuanCongTac: string;
  tinhTrangCongTac: string;
  ghiChu: string | null;
  linhVuc: LinhVuc;
  urlHinhDaiDien: string;
}

interface NhanVien {
  tenNhanVien: string;
  ngaySinh: string;
  gioiTinh: boolean;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  chucVu: {
    maChucVu: string;
    tenChucVu: string;
    trangThai: boolean;
  };
  nguoiNhapThongTin: string;
  ghiChu: string | null;
  uriHinhDaiDien: string;
}

interface LopHoc {
  maLopHoc: string;
  tenLopHoc: string;
  lichHoc: string;
  tinhTrang: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  thuLao: number;
  daThanhToan: number;
  khoaHoc: KhoaHoc;
  phongHoc: PhongHoc;
  giangVien: GiangVien;
  nhanVien: NhanVien;
  ghiChu: string | null;
}

interface HocVien {
  maHocVien: string;
  tenHocVien: string;
  ngaySinh: string;
  gioiTinh: boolean;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  tinhTrangHocTap: string;
  nguoiNhapThongTin: string;
  ghiChu: string | null;
  uriHinhDaiDien: string;
  ngayCapNhatGanNhat: string;
  maTaiKhoan: string;
}

interface Course {
  maCtlh: string;
  hocVien: HocVien;
  lopHoc: LopHoc;
  hocPhi: number;
  mienGiamHocPhi: number;
  daThuHocPhi: boolean;
  soTienThu: number;
  diem: number;
  ngayCapChungChi: string;
  xepLoai: string;
  diemDanh: string;
  ghiChu: string | null;
}

interface ApiResponse {
  status: number;
  message: string;
  data: Course;
}

interface UserResponse {
  maHocVien: string;
  tenHocVien: string;
}

interface CourseListResponse {
  status: number;
  message: string;
  data: { maCtlh: string }[];
}

const Results = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [maHocVien, setMaHocVien] = useState<string | null>("HV005"); // Hardcode for testing

  const location = useLocation();
  const { token, isAuthenticated } = useAuth();

  // Đường dẫn breadcrumb
  const path = location.pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment, idx, arr) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: "/" + arr.slice(0, idx + 1).join("/"),
    }));

  // Lấy danh sách maCtlh của người dùng (giả định một giá trị CT005 cho demo)
  useEffect(() => {
    const fetchCourses = async () => {
      if (!maHocVien) {
        setError("Không tìm thấy thông tin học viên");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Gọi API để lấy chi tiết khóa học CT005
        const response = await axios.get<ApiResponse>(
          `http://localhost:8080/ctlh/getById/CT005`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.status === 200 && response.data.data) {
          if (response.data.data.hocVien.maHocVien === maHocVien) {
            setCourses([response.data.data]);
          } else {
            setCourses([]);
          }
        } else {
          throw new Error(
            response.data.message || "Không thể lấy thông tin khóa học"
          );
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
        setError("Đã xảy ra lỗi khi lấy danh sách khóa học");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [maHocVien, token]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tiêu đề */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Kết quả khóa học
          </h1>
          <nav className="text-sm text-gray-500 mt-2">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Trang chủ
            </Link>
            {path.map((p, index) => (
              <span key={index}>
                {" / "}
                <Link
                  to={p.path}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {p.name}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        {/* Bảng khóa học */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 font-medium">
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="py-4 px-6 font-semibold">STT</th>
                    <th className="py-4 px-6 font-semibold">Lĩnh vực</th>
                    <th className="py-4 px-6 font-semibold">Tên khóa học</th>
                    <th className="py-4 px-6 font-semibold">Điểm</th>
                    <th className="py-4 px-6 font-semibold">Xếp loại</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {courses.length > 0 ? (
                    courses.map((course, index) => (
                      <tr
                        key={course.maCtlh}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">{index + 1}</td>
                        <td className="py-4 px-6">
                          {course.lopHoc.khoaHoc.linhVuc.tenLinhVuc}
                        </td>
                        <td className="py-4 px-6">
                          <Link
                            to={`/result/${course.maCtlh}`}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {course.lopHoc.khoaHoc.tenKhoaHoc}
                          </Link>
                        </td>
                        <td className="py-4 px-6">{course.diem.toFixed(1)}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              course.xepLoai === "Giỏi"
                                ? "bg-green-100 text-green-800"
                                : course.xepLoai === "Khá"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {course.xepLoai}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-gray-500"
                      >
                        Không tìm thấy khóa học nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
