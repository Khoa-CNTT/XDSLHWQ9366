import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import LectureDetail from "./LectureDetail";
import AddLecture from "./AddLecture";
type Lecture = {
  id: string;
  name: string;
  dob: string;
  gioiTinh: string;
  CCCD: string;
  SDT: string;
  email: string;
  address: string;
  coQuan: string;
  tinhTrang: string;
  linhVuc: string;
  ghiChu: string;
};
interface linhVuc {
  id: string;
  name: string;
}
export default function LectureList() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState<Lecture | null>(null);

  const [linhVuc, setLinhVuc] = useState<linhVuc | null>(null);

  const handleAdd = (e: MouseEvent) => {
    e.stopPropagation();
    setActiveButton("addLecture");
    setIsSidebarOpen(true);
  };
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa giảng viên này?"
    );
    if (confirmDelete) {
      setFormData({
        id: "",
        name: "",
        dob: "",
        gioiTinh: "",
        CCCD: "",
        SDT: "",
        email: "",
        address: "",
        coQuan: "",
        tinhTrang: "",
        linhVuc: "",
        ghiChu: "",
      });
      alert("Đã xóa thông tin giảng viên.");
    }
  };

  const handleViewClick = (e: MouseEvent) => {
    e.stopPropagation();
    setActiveButton("viewLecture");
    setIsSidebarOpen(true);
  };

  const toggleMenu = useCallback(() => setIsOpenMenu((prev) => !prev), []);

  const handleCloseSidebar = (e: MouseEvent<HTMLDivElement>) => {
    if (!menuRef.current?.contains(e.target as Node) && isSidebarOpen) {
      setIsSidebarOpen(false);
      setActiveButton("");
    }
  };

  const handleClickOutside = useCallback(
    (event: Event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpenMenu
      ) {
        setIsOpenMenu(false);
      }

      if (
        typeRef.current &&
        !typeRef.current.contains(event.target as Node) &&
        isOpenType
      ) {
        if (
          event.target instanceof HTMLElement &&
          typeRef.current.contains(event.target)
        ) {
          return;
        }
        setIsOpenType(false);
      }
    },
    [isOpenMenu, isOpenType]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const classList = useMemo(
    () => [
      {
        id: "GV01",
        name: "Lê Văn A",
        dob: "1997-08-15",
        gioiTinh: "true",
        CCCD: "048097000077",
        SDT: "0385665243",
        email: "abc123@gmail.com",
        address: "108 Nguyễn Chánh, Liên Chiểu, Đà Nẵng",
        coQuan: "DTU",
        tinhTrang: "dangDay",
        linhVuc: "java",
        ghiChu: "",
      },
      {
        id: "02",
        name: "Lê Văn b",
      },
      {
        id: "3",
        name: "Lê Văn c",
      },
      {
        id: "4",
        name: "Lê Văn d",
      },
      {
        id: "5",
        name: "Lê Văn A",
      },
      {
        id: "6",
        name: "Lê Văn A",
      },
      {
        id: "7",
        name: "Lê Văn A",
      },
      {
        id: "8",
        name: "Lê Văn A",
      },
      {
        id: "9",
        name: "Lê Văn A",
      },
      {
        id: "10",
        name: "Lê Văn A",
      },
      {
        id: "11",
        name: "Lê Văn A",
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
        id: "KHMT",
        name: "Khoa học máy tính",
      },
    ],
    []
  );
  //  10 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredList = classList.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchLinhVuc = !linhVuc || c.linhVuc === linhVuc.id;
    return matchSearch && matchLinhVuc;
  });

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div onClick={handleCloseSidebar} className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mx-4">Danh mục Giảng viên</h2>
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
              <th>Mã Giảng viên</th>
              <th className="p-2 border">Tên Giảng viên</th>
              <th className="p-2 border">Số điện thoại</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Lĩnh vực</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((classList, index) => (
              <tr key={classList.id} className="border-b">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{classList.id}</td>
                <td className="p-2 text-center">{classList.name}</td>

                <td className="p-2 text-center">{classList.SDT}</td>
                <td className="p-2 text-center">{classList.email}</td>
                <td className="p-2 text-center">{classList.linhVuc}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={handleViewClick}
                    className=" mx-2 border p-2 rounded-md items-center align-middle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="border p-2 rounded-md items-center align-middle"
                    onClick={handleDelete}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
      {/* Sidebar Button*/}
      <div
        className={`absolute bg-white w-2/3 min-h-screen overflow-y-auto transition-transform transform ease-in-out duration-300 top-0 right-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {activeButton === "addLecture" && <AddLecture />}
        {activeButton === "viewLecture" && <LectureDetail />}
      </div>
    </div>
  );
}
