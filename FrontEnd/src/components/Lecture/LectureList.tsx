import { useCallback, useRef, useState } from "react";
import { useLinhVucData } from "../../hooks/useLinhVucData";
import { useLecturerData } from "../../hooks/useLecturerData";
import { GiangVien, LinhVuc } from "../Type/Types";
import { useNavigate } from "react-router-dom";
import { exportGiangVienToExcel } from "../../Service.tsx/ExportExcel/LectureExp";
import axios from "axios";

export default function LectureList() {
  const { linhVucs, loading: linhVucLoading } = useLinhVucData(); // Sử dụng hook lĩnh vực
  const { lecturers, loading: lecturerLoading } = useLecturerData(); // Sử dụng hook giảng viên
  const [search, setSearch] = useState("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [linhVuc, setLinhVuc] = useState<LinhVuc | null>(null);
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa giảng viên này?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/giangvien/delete/${id}`);
      alert("Xóa giảng viên thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa giảng viên:", error);
      alert("Xóa giảng viên thất bại!");
    }
  };

  const handleView = (lecturer: GiangVien) => {
    navigate(`/giangvien/get-giangvien/${lecturer.maGiangVien}`, {
      state: { lecturer },
    });
  };
  // Lọc danh sách giảng viên theo tìm kiếm và lĩnh vực
  const filteredList = lecturers.filter((lecturer) => {
    const matchSearch =
      lecturer.tenGiangVien.toLowerCase().includes(search.toLowerCase()) ||
      lecturer.maGiangVien.toLowerCase().includes(search.toLowerCase());
    const matchLinhVuc = !linhVuc || lecturer.maLinhVuc === linhVuc.maLinhVuc;
    return matchSearch && matchLinhVuc;
  });

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleMenu = useCallback(() => setIsOpenMenu((prev) => !prev), []);

  // if (lecturerLoading || linhVucLoading) {
  //   return <div>Đang tải dữ liệu...</div>;
  // }

  return (
    <div className="h-full pt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mx-4">Danh mục Giảng viên</h2>
        <div className="gap-4 inline-flex">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="border px-2 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="inline border rounded-lg items-center px-4 py-2 text-md font-medium text-gray-500 bg-white hover:bg-gray-200 min-w-[200px] focus:outline-none"
            >
              {linhVuc ? linhVuc.tenLinhVuc : "Tất cả lĩnh vực"}
              <svg
                className="w-4 h-4 ml-2 inline"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
              </svg>
            </button>

            {isOpenMenu && (
              <div className="absolute left-0 w-full mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg transition duration-300">
                <div className="py-1">
                  {linhVucs.map((item) => (
                    <button
                      key={item.maLinhVuc}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setLinhVuc(item);
                        setIsOpenMenu(false);
                      }}
                    >
                      {item.tenLinhVuc}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setLinhVuc(null);
                      setIsOpenMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-medium"
                  >
                    Huỷ
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            className="inline-flex items-center font-medium bg-orange-400 text-white text-md py-2 px-4 rounded-md hover:bg-orange-600"
            onClick={() => navigate("/giangvien/add-giangvien")}
          >
            Thêm
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md h-auto">
        <table className="w-full border-collapse border rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">STT</th>
              <th>Mã Giảng viên</th>
              <th className="p-2 border">Tên Giảng viên</th>
              <th className="p-2 border">Số điện thoại</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Lĩnh vực</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((lecturer, index) => (
              <tr key={lecturer.maGiangVien} className="border-b">
                <td className="p-2 text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-2 text-center">{lecturer.maGiangVien}</td>
                <td className="p-2 text-center">{lecturer.tenGiangVien}</td>
                <td className="p-2 text-center">{lecturer.soDienThoai}</td>
                <td className="p-2 text-center">{lecturer.email}</td>
                <td className="p-2 text-center">
                  {lecturer.maLinhVuc
                    ? linhVucs.find((lv) => lv.maLinhVuc === lecturer.maLinhVuc)
                        ?.tenLinhVuc || "Không xác định"
                    : "Không xác định"}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleView(lecturer)}
                    className="mx-2 border p-2 rounded-md items-center align-middle"
                  >
                    Xem
                  </button>
                  <button
                    className="border p-2 rounded-md items-center align-middle"
                    onClick={() => handleDelete(lecturer.maGiangVien)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end p-2">
          <div className="flex justify-between gap-2 items-center px-4 pb-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-500 disabled:opacity-50"
            >
              Trang trước
            </button>
            <span className="px-4 py-2 text-md font-medium text-gray-700">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-500 disabled:opacity-50"
            >
              Trang sau
            </button>
            <button
              onClick={() => exportGiangVienToExcel(filteredList)}
              className="bg-green-500 text-white text-md py-2 px-4 rounded hover:bg-green-600"
            >
              Export Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
