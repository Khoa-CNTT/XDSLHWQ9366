import {
  // MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function AddCouse() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const shareRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLDivElement | null>(null);

  const toggleType = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
    setIsOpenType((prev) => !prev);
  }, []);
  // const handleViewClick = (e: MouseEvent) => {
  //   e.stopPropagation();
  //   setIsSidebarOpen((prev) => !prev);
  // };

  // const handleCloseSidebar = (e: MouseEvent<HTMLDivElement>) => {
  //   if (!menuRef.current?.contains(e.target as Node) && isSidebarOpen) {
  //     setIsSidebarOpen(false);
  //   }
  // };

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
        setIsOpenType(false);
      }
    },
    [isOpenMenu, isOpenShare, isOpenType]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

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
  );
}
