import {
  useState,
  MouseEvent,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export default function CourseCategory() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

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

  // useEffect(() => {
  //   const handleClickOutside = (event: Event) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setIsOpenMenu(false);
  //     }
  //     if (
  //       shareRef.current &&
  //       !shareRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpenShare(false);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, []);

  const handleClickOutside = useCallback(
    (event: Event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpenMenu
      ) {
        setIsOpenMenu(false);
      }
    },
    [isOpenMenu]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const categories = useMemo(
    () => [
      {
        id: 1,
        name: "DANH MỤC 1",
        description: "Tristique libero...",
        courses: 3,
        share: "Toàn hệ thống",
      },
      {
        id: 2,
        name: "DANH MỤC 2",
        description: "Elementum justo...",
        courses: 5,
        share: "DS Tài khoản",
      },
      {
        id: 3,
        name: "DANH MỤC 3",
        description: "Vitae sit tempor...",
        courses: 10,
        share: "Không chia sẻ",
      },
    ],
    []
  );
  const [selectedShare, setSelectedShare] = useState("Toàn hệ thống");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const users = [
    { name: "Thông Nguyễn", email: "royal74110@gmail.com" },
    { name: "Nguyễn Thành Thông", email: "nguyenthanhthongy@gmail.com" },
    { name: "Khôi Nguyễn", email: "khoiproxyz@gmail.com" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUser = (email: string) => {
    setSelectedUsers((prev) =>
      prev.includes(email) ? prev.filter((u) => u !== email) : [...prev, email]
    );
  };

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
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Option 1
                  </button>

                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Option 2
                  </button>

                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Option 3
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
              <th>IMG</th>
              <th className="p-2 border">TÊN DANH MỤC</th>
              <th className="p-2 border">MÔ TẢ</th>
              <th className="p-2 border">SỐ KHOÁ HỌC</th>
              <th className="p-2 border">CHIA SẺ</th>
              <th className="p-2 border">HOẠT ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {categories
              .filter((c) =>
                c.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((category, index) => (
                <tr key={category.id} className="border-b">
                  <td className="p-2 text-center">{index + 1}</td>
                  <img
                    className=" w-16 h-16 p-2"
                    src="https://www.svgrepo.com/show/476364/number-one.svg"
                    alt="--------"
                  />
                  <td className="p-2">{category.name}</td>

                  <td className="p-2">{category.description}</td>
                  <td className="p-2 text-center">{category.courses}</td>
                  <td className="p-2">{category.share}</td>
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
      {/* Sidebar */}
      <div
        className={`absolute bg-white w-1/3 min-h-screen overflow-y-auto transition-transform transform ease-in-out duration-300 top-0 right-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-auto mx-auto bg-white p-6 rounded-lg shadow-md relative">
          <div>
            <h2 className="text-xl font-bold">Thêm danh mục Khóa học</h2>
            <button
              className="absolute top-4 right-4"
              onClick={handleViewClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 border m-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex my-2">
            <img
              src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Book"
              className="size-28"
            />
            <div className="items-center justify-center ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="category"
                  className="peer w-full border p-2 pt-4 rounded-md focus:outline-blue-300"
                  placeholder=""
                />
                <label
                  htmlFor="category"
                  className="absolute left-2 top-2 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-black"
                >
                  Tên danh mục
                </label>
              </div>

              <div className="relative w-full mt-4">
                <input
                  type="text"
                  id="description"
                  className="peer w-full border p-2 pt-5 rounded-md focus:outline-blue-500"
                  placeholder=""
                />
                <label
                  htmlFor="description"
                  className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                >
                  Nhập mô tả
                </label>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-lg font-medium">Chia sẻ</label>
            <div className="flex gap-4 mt-1">
              {["Toàn hệ thống", "Tài khoản", "Không chia sẻ"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="share"
                    value={option}
                    checked={selectedShare === option}
                    onChange={() => setSelectedShare(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {selectedShare === "Tài khoản" && (
            <div className="mt-4">
              <div className="relative">
                <search className="absolute left-2 top-2 text-gray-400" />
                <input
                  type="text"
                  className="w-full border p-2 pl-8 rounded"
                  placeholder="Nhập tài khoản"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ul className="border rounded mt-2 max-h-32 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <li
                    key={user.email}
                    className="p-2 flex justify-between hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleUser(user.email)}
                  >
                    <span>{user.name}</span>
                    <span className="text-gray-500 text-sm">{user.email}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <table className="w-full border rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Email</th>
                  <th className="p-2">Họ tên</th>
                  <th className="p-2">Hoạt động</th>
                  <th className="p-2">Quyền chỉnh sửa</th>
                </tr>
              </thead>
              <tbody>
                {selectedUsers.map((email) => (
                  <tr key={email} className="border-b">
                    <td className="p-2 text-center">{email}</td>
                    <td className="p-2 text-center">
                      {users.find((u) => u.email === email)?.name}
                    </td>
                    <td className="p-2 text-center">
                      <button className="text-blue-500">✏️</button>
                    </td>
                    <td className="p-2 text-center">
                      <input type="checkbox" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md">
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
