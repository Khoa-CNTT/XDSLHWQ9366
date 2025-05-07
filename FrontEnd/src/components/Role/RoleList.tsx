import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import RoleDetail from "./RoleDetail";
// interface Roles {
//   id: string;
//   name: string;
//   status: string;
// }
export default function RoleList() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);
  // const [dataList, setDataList] = useState<Roles[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const shareRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLDivElement | null>(null);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/");
  //     const data = await response.json();
  //     setDataList(data);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Không thể tải dữ liệu.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   if (loading) {
  //     setError(null);
  //   }
  // }, [loading]);

  const roleList = useMemo(
    () => [
      {
        id: "LV01",
        name: "Giám đốc",
        status: "Đang hoạt động",
      },
      {
        id: "LV02",
        name: "Trưởng phòng",
        status: "Đang hoạt động",
      },
      {
        id: "LV03",
        name: "Quản trị mạng",
        status: "Đang hoạt động",
      },
      {
        id: "LV04",
        name: "Quản trị hệ thống",
        status: "Đang hoạt động",
      },
    ],
    []
  );
  const handleViewClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsSidebarOpen((prev) => !prev);
  };
  const toggleMenu = useCallback(() => setIsOpenMenu((prev) => !prev), []);

  const handleCloseSidebar = (e: MouseEvent<HTMLDivElement>) => {
    if (!menuRef.current?.contains(e.target as Node) && isSidebarOpen) {
      setIsSidebarOpen(false);
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
        shareRef.current &&
        !shareRef.current.contains(event.target as Node) &&
        isOpenShare
      ) {
        setIsOpenShare(false);
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
    [isOpenMenu, isOpenShare, isOpenType]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  //  10 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredList = roleList.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.status.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
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
        <h2 className="text-xl font-bold mx-4">Quản lý Chức vụ</h2>
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
              className="inline border rounded-lg items-center px-4 py-2 text-md font-medium text-gray-500 bg-white hover:bg-gray-200 focus:outline-none "
            >
              Tất cả chức vụ
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
                  {roleList.map((roleList) => (
                    <button
                      key={roleList.id}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {roleList.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="inline-flex items-center font-medium bg-orange-400 text-white text-md py-2 px-4 rounded-md hover:bg-orange-600">
            Thêm
          </button>
        </div>
      </div>
      <div className="bg-white  shadow-md h-auto">
        {/* {error && <div className="text-red-500 text-center my-2">{error}</div>} */}
        <table className="w-full border-collapse border rounded-md ">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">STT</th>
              <th>Mã Chức Vụ</th>
              <th className="p-2 border">Tên Chức Vụ</th>
              <th className="p-2 border">Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((c, index) => (
              <tr key={c.id} className="border-b">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{c.id}</td>
                <td className="p-2 text-center">{c.name}</td>

                <td className="p-2 text-center">{c.status}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={handleViewClick}
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
        <RoleDetail />
      </div>
    </div>
  );
}
