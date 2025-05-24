import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LienHe } from "../Type/Types";
import { toast } from "react-toastify";
import { exportLienHeToExcel } from "../../Service.tsx/ExportExcel/ContactExp";

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lienHes, setLienHes] = useState<LienHe[]>([]);
  const navigate = useNavigate();

  const itemsPerPage = 10;

  const fetchLienHe = async () => {
    try {
      const res = await axios.get("http://localhost:8080/lienhe/getAll");
      if (res.data.status === 200) {
        setLienHes(res.data.data);
        setTotalPages(Math.ceil(res.data.data.length / itemsPerPage));
      } else {
        toast.error("Không lấy được danh sách liên hệ!");
      }
    } catch {
      toast.error("Lỗi khi lấy danh sách liên hệ!");
    }
  };

  useEffect(() => {
    fetchLienHe();
    // eslint-disable-next-line
  }, []);

  // const handleAdd = () => {
  //   navigate("/lienhe/add-lienhe");
  // };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa liên hệ này?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/lienhe/delete/${id}`);
      toast.success("🗑️ Xóa liên hệ thành công!");
      fetchLienHe();
    } catch {
      toast.error("❌ Xóa liên hệ thất bại!");
    }
  };

  const handleView = (lienhe: LienHe) => {
    navigate(`/lienhe/get-lienhe/${lienhe.maKhach}`, { state: { lienhe } });
  };

  const filteredList = (lienHes || []).filter((c: LienHe) => {
    const matchSearch =
      c.maKhach.toLowerCase().includes(search.toLowerCase()) ||
      c.hoTen.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredList.length / itemsPerPage));
    // eslint-disable-next-line
  }, [search, lienHes]);

  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-full mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mx-4">Quản lý Liên hệ</h2>
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

          {/* <button
            className="inline-flex items-center font-medium bg-orange-400 text-white text-md py-2 px-4 rounded-md hover:bg-orange-600"
            onClick={handleAdd}
          >
            Thêm
          </button> */}
        </div>
      </div>
      <div className="bg-white  shadow-md h-auto">
        <table className="w-full border-collapse border rounded-md ">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">STT</th>
              <th className="p-2 border">Mã Khách</th>
              <th className="p-2 border">Họ tên</th>
              <th className="p-2 border">SĐT </th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Ngày Liên Hệ</th>
              <th className="p-2 border">Ý kiến</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((lienhe, index) => (
              <tr key={lienhe.maKhach} className="border-b">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{lienhe.maKhach}</td>
                <td className="p-2 text-center">{lienhe.hoTen}</td>
                <td className="p-2 text-center">{lienhe.soDienThoai}</td>
                <td className="p-2 text-center">{lienhe.email}</td>
                <td className="p-2 text-center">{lienhe.ngayLienHe}</td>
                <td className="p-2 text-center">{lienhe.ykien}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleView(lienhe)}
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
                    onClick={() => handleDelete(lienhe.maKhach)}
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
              onClick={() => exportLienHeToExcel(paginatedList)}
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
