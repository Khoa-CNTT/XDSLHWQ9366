import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaiViet } from "../Type/Types";
import { toast } from "react-toastify"; // 👈 Thêm dòng này

export default function Articles() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [baiviets, setbaiviet] = useState<BaiViet[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/baiviet/baiviets"
        );
        const baivietList = response.data.data || [];
        setbaiviet(baivietList);
        setTotalPages(Math.ceil(baivietList.length / itemsPerPage));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lĩnh vực:", error);
        toast.error("❌ Không thể tải danh sách liên hệ!");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage]);

  const handleAdd = () => {
    navigate("/baiviet/add-baiviet");
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa liên hệ này?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/baiviet/delete/${id}`);
      toast.success("🗑️ Xóa liên hệ thành công!");
      setbaiviet((prev) => prev.filter((baiviet) => baiviet.maBaiViet !== id));
    } catch (error) {
      console.error("Lỗi khi xóa liên hệ:", error);
      toast.error("❌ Xóa liên hệ thất bại!");
    }
  };

  const handleView = (baiviet: BaiViet) => {
    navigate(`/baiviet/get-baiviet/${baiviet.maBaiViet}`, {
      state: { baiviet },
    });
  };

  // const handleExportExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(articleList);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachHocVien");

  //   XLSX.writeFile(workbook, "danh_sach_hoc_vien.xlsx");
  // };

  const demoList = useMemo<BaiViet[]>(
    () => [
      {
        maBaiViet: "BV001",
        tieuDe: "Giới thiệu React",
        ngayDang: "2025-01-01",
        luongTruyCap: "123",
        trangThai: "Hiển thị",
      },
      {
        maBaiViet: "BV002",
        tieuDe: "Tìm hiểu TypeScript",
        ngayDang: "2025-01-02",
        luongTruyCap: "456",
        trangThai: "Hiển thị",
      },
      {
        maBaiViet: "BV003",
        tieuDe: "Hướng dẫn Next.js",
        ngayDang: "2025-01-03",
        luongTruyCap: "789",
        trangThai: "Ẩn",
      },
    ],
    []
  );
  // Loại bỏ các giá trị trùng lặp

  //  10 items per page
  const filteredList = (demoList || []).filter((c: BaiViet) => {
    const matchSearch =
      c.maBaiViet.toLowerCase().includes(search.toLowerCase()) ||
      c.trangThai.toLowerCase().includes(search.toLowerCase()) ||
      c.tieuDe.toLowerCase().includes(search.toLowerCase());

    return matchSearch;
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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
        <h2 className="text-xl font-bold mx-4">Danh sách Bài đăng</h2>
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
              <th>Mã Bài viết</th>
              <th className="p-2 border">Tiêu đề</th>
              <th className="p-2 border">Ngày đăng</th>
              <th className="p-2 border">Lượng truy cập</th>
              <th className="p-2 border">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((baiviet, index) => (
              <tr key={baiviet.maBaiViet} className="border-b">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{baiviet.maBaiViet}</td>
                <td className="p-2 text-center">{baiviet.tieuDe}</td>

                <td className="p-2 text-center">{baiviet.ngayDang}</td>
                <td className="p-2 text-center">{baiviet.luongTruyCap}</td>
                <td className="p-2 text-center">{baiviet.trangThai}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleView(baiviet)}
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
                    onClick={() => handleDelete(baiviet.maBaiViet)}
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
