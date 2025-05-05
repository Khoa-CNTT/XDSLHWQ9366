import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Course, linhVuc } from "../Type/Types";

export default function CourseList() {
  const [search, setSearch] = useState("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [course, setCourse] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [linhVuc, setLinhVuc] = useState<linhVuc | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/khoahoc/pagination?page=${currentPage}&size=${itemsPerPage}`
        );
        const { content, totalPages } = response.data;
        setCourse(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu Khoá học:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [currentPage]);

  // Handle button
  const handleAdd = () => {
    navigate("/khoahoc/add-khoahoc");
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa Khoá học này?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/khoahoc/delete/${id}`);
      alert("Xóa Khoá học thành công!");
      // Cập nhật lại danh sách Khoá học sau khi xóa
      setCourse((prev) => prev.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa Khoá học:", error);
      alert("Xóa Khoá học thất bại!");
    }
  };

  const handleView = (course: Course) => {
    navigate(`/khoahoc/get-khoahoc/${course.id}`, {
      state: { course },
    });
  };
  const toggleMenu = useCallback(() => setIsOpenMenu((prev) => !prev), []);

  const courseList = useMemo<Course[]>(
    () => [
      {
        id: "HANTA1",
        name: "HỌC CÙNG HANTA 1",
        noidung: "Tristique libero...",
        fee: "150000",
        sobuoi: 2,
        linhVuc: "iot",
      },
      {
        id: "HANTA2",
        name: "HỌC CÙNG HANTA 2",
        noidung: "Tristique libero...",
        fee: "150000",
        sobuoi: 2,
        linhVuc: "khmt",
      },
      {
        id: "HANTA3",
        name: "HỌC CÙNG HANTA 3",
        noidung: "Tristique libero...",
        fee: "150000",
        sobuoi: 2,
        linhVuc: "cntt",
      },
      {
        id: "HANTA4",
        name: "HỌC CÙNG HANTA 4",
        noidung: "Lorem ipsum dolor sit amet...",
        fee: "200000",
        sobuoi: 3,
        linhVuc: "java",
      },
      {
        id: "HANTA5",
        name: "HỌC CÙNG HANTA 5",
        noidung: "Lorem ipsum dolor sit amet...",
        fee: "250000",
        sobuoi: 4,
        linhVuc: "iot",
      },
      {
        id: "HANTA6",
        name: "HỌC CÙNG HANTA 6",
        noidung: "Lorem ipsum dolor sit amet...",
        fee: "300000",
        sobuoi: 5,
        linhVuc: "khmt",
      },
      {
        id: "HANTA7",
        name: "HỌC CÙNG HANTA 7",
        noidung: "Lorem ipsum dolor sit amet...",
        fee: "350000",
        sobuoi: 6,
        linhVuc: "cntt",
      },
      {
        id: "HANTA8",
        name: "HỌC CÙNG HANTA 8",
        noidung: "Lorem ipsum dolor sit amet...",
        fee: "400000",
        sobuoi: 7,
        linhVuc: "java",
      },
      {
        id: "HANTA9",
        name: "HỌC CÙNG HANTA 9",
        noidung: "Lorem ipsum dolor sit amet...",
        fee: "450000",
        sobuoi: 8,
        linhVuc: "iot",
      },
      {
        id: "HANTA10",
        name: "HỌC CÙNG HANTA 10",
        noidung: "Lorem ipsum dolor sit amet...",
        fee: "500000",
        sobuoi: 9,
        linhVuc: "khmt",
      },
      {
        id: "HANTA11",
        name: "HỌC CÙNG HANTA 11",
        noidung: "Lorem ipsum dolor sit amet...",
        fee: "550000",
        sobuoi: 10,
        linhVuc: "cntt",
      },
    ],
    []
  );
  const linhVucList = useMemo(
    () => [
      {
        id: "java",
        name: "Java",
      },
      {
        id: "iot",
        name: "IOT",
      },
      {
        id: "cntt",
        name: "Công nghệ thông tin",
      },
      {
        id: "khmt",
        name: "Khoa học máy tính",
      },
    ],
    []
  );
  //  10 items per page
  const itemsPerPage = 10;
  const filteredList = courseList.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchLinhVuc = !linhVuc || c.linhVuc === linhVuc.id;
    return matchSearch && matchLinhVuc;
  });

  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-full pt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mx-4">Danh mục Khoá học</h2>
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
              className="inline border rounded-lg items-center px-4 py-2 text-md font-medium text-gray-500 bg-white hover:bg-gray-200 min-w-[200px]  focus:outline-none "
            >
              {linhVuc ? linhVuc.name : "Tất cả lĩnh vực"}
              {!linhVuc && (
                <svg
                  className="w-4 h-4 ml-2 inline"
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
                  {linhVucList.map((item) => (
                    <button
                      key={item.id}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setLinhVuc(item);
                        setIsOpenMenu(false);
                      }}
                    >
                      {item.name}
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
              <th>Mã Khoá học</th>
              <th className="p-2 border">Tên Khoá học</th>
              <th className="p-2 border">Học phí</th>
              <th className="p-2 border">Số buổi</th>
              <th className="p-2 border">Lĩnh vực</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((course, index) => (
              <tr key={course.id} className="border-b">
                <td className="p-2 text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-2 text-center">{course.id}</td>
                <td className="p-2 text-center">{course.name}</td>

                <td className="p-2 text-center">{course.fee}</td>
                <td className="p-2 text-center">{course.sobuoi}</td>

                <td className="p-2 text-center">
                  {linhVucList.find(
                    (lv) =>
                      lv.id.toLowerCase() === course.linhVuc?.toLowerCase()
                  )?.name || course.linhVuc}
                </td>

                <td className="p-2 text-center">
                  <button
                    onClick={() => handleView(course)}
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
                    onClick={() => handleDelete(course.id)}
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
