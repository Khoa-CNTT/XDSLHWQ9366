import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface LinhVuc {
  maLinhVuc: string;
  tenLinhVuc: string;
}
interface KhoaHoc {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  linhVuc: LinhVuc;
}
interface LopHoc {
  khoaHoc: KhoaHoc;
}
interface HocVien {
  maTaiKhoan: string;
}
interface Course {
  maCtlh: string;
  hocVien: HocVien;
  lopHoc: LopHoc;
  diem: number;
  xepLoai: string;
}

const Results = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const maTaiKhoan = localStorage.getItem("maTaiKhoan");

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
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8080/ctlh/getAll");
        if (response.data.status === 200 && Array.isArray(response.data.data)) {
          const filtered = response.data.data.filter(
            (item: Course) =>
              item.hocVien &&
              item.hocVien.maTaiKhoan &&
              item.hocVien.maTaiKhoan === maTaiKhoan
          );
          setCourses(filtered);
        } else {
          setError("Không thể lấy dữ liệu từ máy chủ.");
        }
      } catch {
        setError("Lỗi khi kết nối tới máy chủ.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [maTaiKhoan]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold">Test Scores</h1>
          <p className="text-sm text-gray-500 mt-1">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            {path.map((p, index) => (
              <span key={index}>
                {" / "}
                <Link to={p.path} className="text-blue-600 hover:underline">
                  {p.name}
                </Link>
              </span>
            ))}
          </p>
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
                          {course.lopHoc.khoaHoc.tenKhoaHoc}
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
