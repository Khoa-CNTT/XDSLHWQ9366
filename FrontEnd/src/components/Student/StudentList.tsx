import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { Student } from "../Type/Types";
import axios from "axios";

export default function StudentList() {
  const [search, setSearch] = useState("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setstudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage] = useState(10);
  const [selectedTinhTrang, setSelectedTinhTrang] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const navigate = useNavigate();

  const tinhTrang = useMemo(
    () => [
      { id: "danghoc", name: "Đang học" },
      { id: "nghihoc", name: "Nghỉ học" },
      { id: "datotnghiep", name: "Đã tốt nghiệp" },
    ],
    []
  );

  // Fetch data from API
  useEffect(() => {
    const fetchstudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/hocvien/pagination?page=${currentPage}&size=${itemsPerPage}`
        );
        if (response.status === 200) {
          const { data: paginationData } = response.data;
          if (paginationData) {
            // Lấy danh sách giảng viên từ paginationData.data
            const studentList = paginationData.data;
            setstudents(studentList || []);
            setTotalPages(paginationData.totalPages || 1);
          }
        } else {
          console.error("API trả về lỗi:", response.status);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchstudents();
  }, [currentPage, itemsPerPage]);
  // Handle button
  const handleAdd = () => {
    navigate("/hocvien/add-hocvien");
  };
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa giảng viên này?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/hocvien/delete/${id}`);
      alert("Xóa giảng viên thành công!");
      // Cập nhật lại danh sách giảng viên sau khi xóa
      setstudents((prev) => prev.filter((student) => student.maHocVien !== id));
    } catch (error) {
      console.error("Lỗi khi xóa giảng viên:", error);
      alert("Xóa giảng viên thất bại!");
    }
  };

  const handleView = (student: Student) => {
    navigate(`/hocvien/get-hocvien/${student.maHocVien}`, {
      state: { student },
    });
  };
  const toggleMenu = useCallback(() => setIsOpenMenu((prev) => !prev), []);

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachHocVien");

    XLSX.writeFile(workbook, "danh_sach_hoc_vien.xlsx");
  };

  const studentList = useMemo(
    () => [
      {
        maHocVien: "HV01",
        tenHocVien: "Nguyễn Văn A",
        ngaySinh: "2000-01-01",
        gioiTinh: "true",
        soCMND: "123456789",
        soDienThoai: "0123456789",
        email: "123123",
        diaChi: "123123",
        coQuanCongTac: "123123",
        tinhTrangHocTap: "danghoc", //  Đang học, Nghỉ học, Đã tốt nghiệp
        nguoiNhapThongTin: "Nguyễn Văn B",
        ghiChu: "123123",
        urlHinhDaiDien: "https://example.com/image.jpg",
        ngayCapNhatGanNhat: "2023-10-01",
      },
      {
        maHocVien: "HV02",
        tenHocVien: "Nguyễn Văn B",
        ngaySinh: "2000-01-01",
        gioiTinh: "true",
        soCMND: "123456789",
        soDienThoai: "0123456789",
        email: "123123",
        diaChi: "123123",
        coQuanCongTac: "123123",
        tinhTrangHocTap: "nghihoc", //  Đang học, Nghỉ học, Đã tốt nghiệp
        nguoiNhapThongTin: "Nguyễn Văn B",
        ghiChu: "123123",
        urlHinhDaiDien: "https://example.com/image.jpg",
        ngayCapNhatGanNhat: "2023-10-01",
      },
      {
        maHocVien: "HV03",
        tenHocVien: "Nguyễn Văn C",
        ngaySinh: "2000-01-01",
        gioiTinh: "false",
        soCMND: "123456789",
        soDienThoai: "0123456789",
        email: "123123",
        diaChi: "123123",
        coQuanCongTac: "123123",
        tinhTrangHocTap: "datotnghiep", //  Đang học, Nghỉ học, Đã tốt nghiệp
        nguoiNhapThongTin: "Nguyễn Văn B",
        ghiChu: "123123",
        urlHinhDaiDien: "https://example.com/image.jpg",
        ngayCapNhatGanNhat: "2023-10-01",
      },
    ],
    []
  );

  // 10 items per page
  const filteredList = (studentList || []).filter((c) => {
    const matchSearch =
      c.tenHocVien.toLowerCase().includes(search.toLowerCase()) ||
      c.maHocVien.toLowerCase().includes(search.toLowerCase());
    const matchTinhTrang =
      !selectedTinhTrang || c.tinhTrangHocTap === selectedTinhTrang.id;
    return matchSearch && matchTinhTrang;
  });

  const paginatedList = (filteredList || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }
  return (
    <div className="h-full mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mx-4">Danh sách Học Viên</h2>
        <div className=" gap-4 inline-flex">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="border px-2 rounded-lg "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="relative" ref={menuRef}>
            {/* Button */}
            <button
              onClick={toggleMenu}
              className="inline border rounded-lg items-center px-4 py-2 text-md font-medium text-gray-500 bg-white hover:bg-gray-200 focus:outline-none"
            >
              {selectedTinhTrang ? selectedTinhTrang.name : "Tất cả học viên"}
              <svg
                className="w-4 h-4 ml-12 -mr-1 inline"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpenMenu && (
              <div className="absolute left-0 w-full mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg transition duration-300">
                <div className="py-1">
                  {tinhTrang.map((tinhTrang) => (
                    <button
                      key={tinhTrang.id}
                      onClick={() => {
                        setSelectedTinhTrang(tinhTrang);
                        setIsOpenMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {tinhTrang.name}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setSelectedTinhTrang(null);
                      setIsOpenMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-medium"
                  >
                    Tất cả học viên
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            className="inline-flex items-center font-medium bg-orange-400 text-white text-md py-2 px-4 rounded-md hover:bg-orange-600"
          >
            Thêm
          </button>
        </div>
      </div>
      <div className="bg-white  shadow-md h-auto">
        <table className="w-full border-collapse border rounded-md ">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">STT</th>
              <th>Mã Học viên</th>
              <th className="p-2 border">Tên Học viên</th>
              <th className="p-2 border">Số điện thoại</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((student, index) => (
              <tr key={student.maHocVien} className="border-b">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{student.maHocVien}</td>
                <td className="p-2 text-center">{student.tenHocVien}</td>

                <td className="p-2 text-center">{student.soDienThoai}</td>
                <td className="p-2 text-center">{student.email}</td>
                <td className="p-2 text-center">
                  {tinhTrang.find((tt) => tt.id === student.tinhTrangHocTap)
                    ?.name || "Không xác định"}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleView(student)}
                    className=" mx-2 border p-2 rounded-md items-center align-middle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="border p-2 rounded-md items-center align-middle"
                    onClick={() => handleDelete(student.maHocVien)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
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
              className="px-4 py-2  bg-gray-300 rounded hover:bg-gray-500 disabled:opacity-50"
            >
              Trang sau
            </button>
            <button
              // onClick={handleExportExcel}
              className=" bg-green-500 text-white text-md py-2 px-4 rounded hover:bg-green-600"
            >
              Export Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
