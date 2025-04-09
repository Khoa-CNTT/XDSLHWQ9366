import { useState } from "react";

export default function ClassDetail() {
  const [formData, setFormData] = useState({
    id: "C01",
    name: "Class C01",
    schedule: "2-4-6",
    dateStart: "2025-01-01",
    dateEnd: "2025-04-01",
    Status: "Đang học",
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
          Quản lý lớp học
        </h2>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-start">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Mã lớp học
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Lịch học
              </label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Ngày bắt đầu
              </label>

              <input
                type="date"
                name="startDate"
                value={formData.dateStart}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Thù lao
              </label>
              <input
                type="text"
                name="salary"
                value={"0"}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Tên khoá học
              </label>
              <input
                type="text"
                name="courseName"
                value={"Tên khoá học"}
                onChange={handleChange}
                className="form-input block pl-1 w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Tên Giảng viên
              </label>
              <input
                type="text"
                name="lectureName"
                value={"Tên Giảng viên"}
                onChange={handleChange}
                className="form-input block w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Cột 2 */}
          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Tên lớp học
              </label>
              <input
                type="text"
                name="classname"
                value={formData.name}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Tình trạng
              </label>
              <div className="w-full">
                <select
                  name="status"
                  className="form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Tình trạng --</option>
                  <option value="dangDay">Đang dạy</option>
                  <option value="sapBatDau">Sắp bắt đầu</option>
                </select>
              </div>
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Ngày kết thúc
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.dateEnd}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex p-1 w-full justify-between border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Đã thanh toán
              </label>
              <div className="flex w-full items-center mx-2 gap-2">
                <input
                  id="thanhToan"
                  type="checkbox"
                  name="thanhToan"
                  // value={formData.dateEnd}
                  onChange={handleChange}
                  className="size-5  bg-gray-200 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-400"
                />
                <label
                  htmlFor="thanhToan"
                  className="text-gray-700 text-sm cursor-pointer"
                >
                  Đã thanh toán hay chưa?
                </label>
              </div>
            </div>

            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Tên phòng học
              </label>
              <input
                type="text"
                name="roomName"
                value={"Tên phòng học"}
                onChange={handleChange}
                className="form-input block pl-1 w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Nhân viên quản lý
              </label>
              <input
                type="text"
                name="NVName"
                value={"Nhân viên quản lý"}
                onChange={handleChange}
                className="form-input block w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex p-1 w-full justify-center border">
          <label
            className="block w-1/5 text-gray-700 text-sm font-bold "
            htmlFor="courseName"
          >
            Ghi chú
          </label>

          <textarea
            name="description"
            rows={4}
            placeholder="Nhập nội dung..."
            className="form-textera multiline block w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center p-4 gap-4">
          <button
            type="submit"
            className="w-32 py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Thêm
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
