import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinhVuc } from "../Type/Types";
import { useLinhVucData } from "../../hooks/useLinhVucData";
import { toast } from "react-toastify";

export default function FieldList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { linhVucs, loading, refetch } = useLinhVucData();
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalPages(Math.ceil(linhVucs.length / itemsPerPage));
  }, [linhVucs, itemsPerPage]);

  // Handle button
  const handleAdd = () => {
    navigate("/linhvuc/add-linhvuc");
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa lĩnh vực này?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:8080/linhvuc/delete/${id}`
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Thành công!", {
          position: "top-right",
          autoClose: 3000,
        });

        await refetch();
      } else {
        throw new Error("Xóa không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi xóa lĩnh vực:", error);
      toast.error("Lỗi khi xóa", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleView = (linhvuc: LinhVuc) => {
    navigate(`/linhvuc/get-linhvuc/${linhvuc.maLinhVuc}`, {
      state: { linhvuc },
    });
  };

  // Lọc và phân trang
  const filteredList = linhVucs.filter((c) => {
    const matchSearch =
      c.maLinhVuc.toLowerCase().includes(search.toLowerCase()) ||
      c.tenLinhVuc.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

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
        <h2 className="text-xl font-bold mx-4">Danh mục Lĩnh vực</h2>
        <div className=" gap-4 inline-flex">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="border px-2 rounded-lg "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
              <th>Mã Lĩnh vực</th>
              <th className="p-2 border">Tên Lĩnh vực</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              paginatedList.map((linhvuc, index) => (
                <tr key={linhvuc.maLinhVuc} className="border-b">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{linhvuc.maLinhVuc}</td>
                  <td className="p-2 text-center">{linhvuc.tenLinhVuc}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleView(linhvuc)}
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
                      onClick={() => handleDelete(linhvuc.maLinhVuc)}
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
              ))
            )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
