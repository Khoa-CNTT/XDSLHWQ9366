import { useState } from "react";

export default function RoleDetail() {
  const [formData, setFormData] = useState({
    id: "123456",
    name: "Giáo viên",
    status: "Đang hoạt động",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="w-full mx-auto  p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl p-2 text-white font-extrabold mb-4 text-center bg-orange-400 rounded-md">
          Quản lý Chức vụ
        </h2>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-start">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="roleDetail"
              >
                Mã Chức Vụ
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-between border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="roleDetail"
              >
                Trạng thái
              </label>
              <div className="flex w-full items-center mx-2 gap-2">
                <input
                  id="status"
                  type="checkbox"
                  name="status"
                  // value={formData.dateEnd}
                  onChange={handleChange}
                  className="size-5  bg-gray-200 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-400"
                />
                <label
                  htmlFor="roleDetail"
                  className="text-gray-700 text-sm cursor-pointer"
                >
                  Còn hiệu lực hay không?
                </label>
              </div>
            </div>
          </div>
          {/* Cột 2 */}

          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="roleDetail"
              >
                Tên Chức vụ
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4 gap-4">
          <button
            type="submit"
            className="w-32 py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Thêm mới
          </button>
          <button
            type="submit"
            className="w-32 p-2 border-white bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 focus:outline-none  focus:ring-2 focus:ring-orange-500"
          >
            Lưu
          </button>
          <button
            type="submit"
            className="w-32 py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}
