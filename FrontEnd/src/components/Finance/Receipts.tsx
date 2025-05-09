import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhieuThu } from "../Type/Types";

export default function Receipts() {
  const [search, setSearch] = useState("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [phieuthus, setPhieuThu] = useState<PhieuThu[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Fetch data from API
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/phieuthu/phieuthus"
        );
        console.log("API Response:", response.data);

        const phieuThuList = response.data.data;
        // Kiểm tra dữ liệu trả về từ API
        setPhieuThu(phieuThuList);
        setTotalPages(Math.ceil(phieuThuList.length / itemsPerPage));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lĩnh vực:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage]);

  useEffect(() => {
    console.log("Danh sách lĩnh vực:", phieuthus); // Kiểm tra dữ liệu trong state
  }, [phieuthus]);
  // Handle button
  const handleAdd = () => {
    navigate("/phieuthu/add-phieuthu");
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa lĩnh vực này?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/phieuthu/delete/${id}`);
      alert("Xóa lĩnh vực thành công!");
      // Cập nhật lại danh sách lĩnh vực sau khi xóa
      setPhieuThu((prev) =>
        prev.filter((phieuthu) => phieuthu.maPhieuThu !== id)
      );
    } catch (error) {
      console.error("Lỗi khi xóa lĩnh vực:", error);
      alert("Xóa lĩnh vực thất bại!");
    }
  };

  const handleView = (phieuthu: PhieuThu) => {
    navigate(`/phieuthu/get-phieuthu/${phieuthu.maPhieuThu}`, {
      state: { phieuthu },
    });
  };
  const toggleMenu = useCallback(() => setIsOpenMenu((prev) => !prev), []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const demoList = useMemo<PhieuThu[]>(
    () => [
      {
        maPhieuThu: "123456",
        tenPhieuThu: "Học phí",
        maNhanVien: "Lê Thị ABC",
        nguoiNop: "Lê Đức Thảo",
        soTien: "1.000.000",
        ngayThu: "2025-05-01",
      },
      {
        maPhieuThu: "234",
        tenPhieuThu: "Quỹ",
        maNhanVien: "Lê Thị ABC",
        nguoiNop: "Lê Đức Thảo",
        soTien: "1.000.000",
        ngayThu: "2025-05-01",
      },
      {
        maPhieuThu: "345",
        tenPhieuThu: "Test",
        maNhanVien: "Lê Thị ABC",
        nguoiNop: "Lê Đức Thảo",
        soTien: "1.000.000",
        ngayThu: "2025-05-01",
      },
      {
        maPhieuThu: "567",
        tenPhieuThu: "Thi",
        maNhanVien: "Lê Thị ABC",
        nguoiNop: "Lê Đức Thảo",
        soTien: "1.000.000",
        ngayThu: "2025-05-01",
      },
    ],
    []
  );

  // Loại bỏ các giá trị trùng lặp
  const uniqueNotes = useMemo(() => {
    const notes = demoList.map((item) => item.tenPhieuThu);
    return Array.from(new Set(notes));
  }, [demoList]);
  //  10 items per page
  const [noiDung, setNoiDung] = useState<string | null>(null);
  const itemsPerPage = 10;
  const filteredList = (demoList || []).filter((c: PhieuThu) => {
    const matchSearch =
      c.maPhieuThu.toLowerCase().includes(search.toLowerCase()) ||
      c.tenPhieuThu.toLowerCase().includes(search.toLowerCase());
    const matchNhanVien = !noiDung || c.tenPhieuThu === noiDung;

    return matchSearch && matchNhanVien;
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [search, noiDung]);

  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // if (loading) {
  //   return <div>Đang tải dữ liệu...</div>;
  // }

  return (
    <div className="h-full mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mx-4">Danh mục phiếu thu</h2>
        <div className=" gap-4 inline-flex">
          <div className="flex items-center border px-2 rounded-lg bg-white">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="outline-none py-1 px-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-500 hover:text-black ml-2"
                title="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>

          <div className="relative" ref={menuRef}>
            {/* Button */}
            <button
              onClick={toggleMenu}
              className="inline min-w-[250px] border rounded-lg items-center px-4 py-2 text-md font-medium text-gray-500 bg-white hover:bg-gray-200 focus:outline-none "
            >
              {noiDung || "Tất cả danh mục"}

              {!noiDung && (
                <svg
                  className="w-4 h-4 ml-12 -mr-1 inline"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                </svg>
              )}
            </button>

            {/* Dropdown Menu */}
            {isOpenMenu && (
              <div className="absolute left-0 w-full mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg transition duration-300">
                <div className="py-1">
                  {uniqueNotes.map((note, index) => (
                    <button
                      key={index}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setNoiDung(note);
                        setIsOpenMenu(false);
                      }}
                    >
                      {note}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setNoiDung(null);
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
            onClick={handleAdd}
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
              <th className="p-2 border">Mã Phiếu Thu</th>
              <th className="p-2 border">Nội Dung</th>
              <th className="p-2 border">Tên Kế toán</th>
              <th className="p-2 border">Tên người nộp</th>
              <th className="p-2 border">Số tiền</th>
              <th className="p-2 border">Ngày thu</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((phieuthu, index) => (
              <tr key={phieuthu.maPhieuThu} className="border-b">
                <td className="p-2 text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-2 text-center">{phieuthu.maPhieuThu}</td>
                <td className="p-2 text-center">{phieuthu.tenPhieuThu}</td>
                <td className="p-2 text-center">{phieuthu.maNhanVien}</td>
                <td className="p-2 text-center">{phieuthu.nguoiNop}</td>
                <td className="p-2 text-center">{phieuthu.soTien}</td>
                <td className="p-2 text-center">{phieuthu.ngayThu}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleView(phieuthu)}
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
                    onClick={() => handleDelete(phieuthu.maPhieuThu)}
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
