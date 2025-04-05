import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function CourseList() {
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
  const toggleType = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
    setIsOpenType((prev) => !prev);
  }, []);
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

  const courseList = useMemo(
    () => [
      {
        id: 1,
        name: "HỌC CÙNG HANTA 1",
        category: "Tristique libero...",
        courses: 3,
        fee: "230.000",
      },
      {
        id: 2,
        name: "HỌC CÙNG HANTA 2",
        category: "Elementum justo...",
        courses: 5,
        fee: "100000",
      },
      {
        id: 3,
        name: "HỌC CÙNG HANTA 3",
        category: "Vitae sit tempor...",
        courses: 10,
        fee: "150000",
      },
    ],
    []
  );

  const courseType = useMemo(
    () => [
      {
        id: 1,
        name: "Fullstack",
      },
      {
        id: 2,
        name: "Font-end",
      },
      {
        id: 3,
        name: "Back-end",
      },
      {
        id: 4,
        name: "Tester",
      },
    ],
    []
  );

  return (
    <div onClick={handleCloseSidebar} className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mx-4">Danh mục khóa học</h2>
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
                  {courseList.map((courseList) => (
                    <button
                      key={courseList.id}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {courseList.name}
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
              <th className="p-2 border">#</th>
              <th>IMG</th>
              <th className="p-2 border">TÊN KHOÁ HỌC</th>
              <th className="p-2 border">THUỘC DANH MỤC</th>
              <th className="p-2 border">CHỦ ĐỀ / BÀI RÈN LUYỆN</th>
              <th className="p-2 border">LỚP THAM GIA</th>
              <th className="p-2 border">HOẠT ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {courseList
              .filter((c) =>
                c.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((courseList, index) => (
                <tr key={courseList.id} className="border-b">
                  <td className="p-2 text-center">{index + 1}</td>
                  <img
                    className=" w-12 h-12 p-1 text-center"
                    src="https://www.svgrepo.com/show/476364/number-one.svg"
                    alt="--------"
                  />
                  <td className="p-2 text-center">{courseList.name}</td>

                  <td className="p-2">{courseList.category}</td>
                  <td className="p-2 text-center">{courseList.courses}</td>
                  <td className="p-2 text-center">{courseList.fee}</td>
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
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                    <button
                      // onClick={toggleDropdownKhoaHoc}
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <button
                      // onClick={toggleDropdownKhoaHoc}
                      className=" mx-2  border p-2 rounded-md items-center align-middle rotate-180"
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
        className={`absolute bg-white w-1/2 min-h-screen overflow-y-auto transition-transform transform ease-in-out duration-300 top-0 right-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full mx-auto  p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-left">Thêm khóa học</h2>
          <div className="">
            <img
              src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Book"
              className="size-28 "
            />
          </div>
          {/* Button active  */}
          <form className="mt-4">
            <div className="flex gap-4">
              <div className="mb-4 w-1/3">
                <div className=" relative" ref={typeRef}>
                  <button
                    onClick={toggleType}
                    className="inline text-gray-700 text-sm font-bold mb-2 border rounded-lg items-center px-4 py-2 text-md   bg-white hover:bg-gray-200 focus:outline-none "
                  >
                    Thể loại
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
                  {isOpenType && (
                    <div className="absolute left-0 w-full mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg transition duration-300">
                      <div className="py-1">
                        {courseType.map((courseType) => (
                          <button
                            key={courseType.id}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  mt-1  bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {courseType.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="courseName"
                >
                  Tên khóa học
                </label>
                <input
                  type="text"
                  id="courseName"
                  placeholder="Khóa học Toán tư duy tiểu học"
                  className="form-input mt-1 block w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mb-4 w-1/3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="courseID"
                >
                  Mã khoá học
                </label>
                <input className="form-select mt-1 block w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
              </div>
              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="landingPage"
                >
                  Link landing page (Nếu có)
                </label>
                <input
                  type="url"
                  id="landingPage"
                  placeholder="Link landing page"
                  className="form-input mt-1 block w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mb-4 w-1/3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="startDate"
                >
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="form-input mt-1 block w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="classSchedule"
                >
                  Lớp tham gia
                </label>
                <select
                  id="classSchedule"
                  className="form-input mt-1 block w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn loại --</option>
                  <option value="laptrinh">Lớp lập trình</option>
                  <option value="phanmem">Lớp phần mềm</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 ">
              <div className="mb-4 w-1/3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="teacherSchedule"
                >
                  Học viên giáo viên
                </label>
                <input
                  id="teacherSchedule"
                  className="form-select mt-1 block w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div>

              <div className="mt-4 w-full ">
                <label className="inline-flex items-center ">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500 size-5"
                  />
                  <span className="ml-2 text-gray-700 text-md">
                    Thuộc danh mục Toán tư duy
                  </span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="webContent"
              >
                Nội dung hiển thị trên Web Bikids
              </label>
              <textarea
                id="webContent"
                placeholder="Nội dung của khóa học..."
                className="form-textarea mt-1 block w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Thêm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
