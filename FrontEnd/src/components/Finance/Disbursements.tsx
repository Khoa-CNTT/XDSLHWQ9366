import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DisbursementDetail from "./DisbursementDetail";

export default function Disbursements() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const shareRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLDivElement | null>(null);

  const handleViewClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsSidebarOpen((prev) => !prev);
  };
  const toggleMenu = useCallback(() => setIsOpenMenu((prev) => !prev), []);
  const toggleShare = useCallback(() => setIsOpenShare((prev) => !prev), []);

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

  const classList = useMemo(
    () => [
      {
        id: "123456",
        description: "Học phí",
        accounting: "Lê Thị ABC",
        payee: "Lê Đức Thảo",
        amount: "1.000.000",
        date: "01/04/2025",
      },
      {
        id: "234",
        description: "Quỹ",
        accounting: "Lê Thị ABC",
        payee: "Lê Đức Thảo",
        amount: "1.000.000",
        date: "01/04/2025",
      },
      {
        id: "345",
        description: "Test",
        accounting: "Lê Thị ABC",
        payee: "Lê Đức Thảo",
        amount: "1.000.000",
        date: "01/04/2025",
      },
      {
        id: "567",
        description: "Thi",
        accounting: "Lê Thị ABC",
        payee: "Lê Đức Thảo",
        amount: "1.000.000",
        date: "01/04/2025",
      },
    ],
    []
  );

  return (
    <div onClick={handleCloseSidebar} className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mx-4">Danh mục phiếu chi</h2>
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
                      {classList.description}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative" ref={shareRef}>
            <button
              onClick={toggleShare}
              className="inline-flex rounded-md items-center px-4 py-2 text-md font-medium text-gray-500 bg-white hover:bg-gray-200 focus:outline-none "
            >
              Chia sẻ
              <svg
                className="w-4 h-4 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
              </svg>
            </button>

            {/* Dropdown Share */}
            {isOpenShare && (
              <div className="absolute left-0 w-full mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg transition duration-300">
                <div className="py-1">
                  <button
                    // onClick={}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Share 1
                  </button>

                  <button
                    // onClick={}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Share 2
                  </button>

                  <button
                    // onClick={}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Share 3
                  </button>
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
        <table className="w-full border-collapse border rounded-md ">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">STT</th>
              <th>Mã Phiếu Chi</th>
              <th className="p-2 border">Nội Dung</th>
              <th className="p-2 border">Tên Kế Toán</th>
              <th className="p-2 border">Tên Người Nhận</th>
              <th className="p-2 border">Số Tiền</th>
              <th className="p-2 border">Ngày Chi</th>
            </tr>
          </thead>
          <tbody>
            {classList
              .filter((c) =>
                c.description.toLowerCase().includes(search.toLowerCase())
              )
              .map((classList, index) => (
                <tr key={classList.id} className="border-b">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{classList.id}</td>
                  <td className="p-2 text-center">{classList.description}</td>
                  <td className="p-2 text-center">{classList.accounting}</td>
                  <td className="p-2 text-center">{classList.payee}</td>
                  <td className="p-2 text-center">{classList.amount}</td>
                  <td className="p-2 text-center">{classList.date}</td>
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
        <DisbursementDetail />
      </div>
    </div>
  );
}
