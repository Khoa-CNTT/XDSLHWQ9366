import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import EmployeeDetail from "./EmployeeDetail";
import AddEmployee from "./AddEmployee";

export default function EmployeeList() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);
  const [activeButton, setActiveButton] = useState("");

  const menuRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLDivElement | null>(null);
  const handleAdd = () => {
    setActiveButton("addEmployee");
    setIsSidebarOpen(true);
  };
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
        id: "NV01",
        name: "Lê Văn A",
        SDT: "0385665243",
        email: "abc123@gmail.com",
        linhVuc: "Kế toán",
      },
      {
        id: "NV02",
        name: "Lê Văn B",
        SDT: "0385665243",
        email: "zxc456@gmail.com",
        linhVuc: "Kỹ thuật",
      },
      {
        id: "NV03",
        name: "Lê Văn C",
        SDT: "0385665243",
        email: "xyz789@gmail.com",
        linhVuc: "Lao công",
      },
    ],
    []
  );

  return (
    <div onClick={handleCloseSidebar} className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mx-4">Danh mục nhân viên</h2>
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
              Tất cả danh mục
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
                  {classList.map((classList) => (
                    <button
                      key={classList.id}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {classList.name}
                    </button>
                  ))}
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
              <th>Mã Nhân viên</th>
              <th className="p-2 border">Tên Nhân viên</th>
              <th className="p-2 border">Số điện thoại</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Lĩnh vực</th>
            </tr>
          </thead>
          <tbody>
            {classList
              .filter(
                (c) =>
                  c.name.toLowerCase().includes(search.toLowerCase()) ||
                  c.id.toLowerCase().includes(search.toLowerCase()) ||
                  c.linhVuc.toLowerCase().includes(search.toLowerCase()) ||
                  c.email.toLowerCase().includes(search.toLowerCase()) ||
                  c.SDT.toLowerCase().includes(search.toLowerCase())
              )
              .map((classList, index) => (
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
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Sidebar Button*/}
      <div
        className={`absolute bg-white w-2/3 min-h-screen overflow-y-auto transition-transform transform ease-in-out duration-300 top-0 right-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {activeButton === "addEmployee" ? <AddEmployee /> : <EmployeeDetail />}
      </div>
    </div>
  );
}
