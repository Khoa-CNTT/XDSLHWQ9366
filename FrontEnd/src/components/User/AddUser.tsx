import React from "react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  user: string;
  password: string;
  role: string;
  name: string;
  ghiChu: string;
};

export default function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    user: "",
    password: "",
    role: "",
    ghiChu: "",
  });
  const roleList = useMemo(
    () => [
      {
        id: "GV",
        name: "tài khoản",
      },
      {
        id: "NV",
        name: "Nhân viên",
      },
      {
        id: "HV",
        name: "Học viên",
      },
      {
        id: "KT",
        name: "Kế toán",
      },
    ],
    []
  );
  const saveToBackend = async () => {
    try {
      const res = await fetch("http://localhost:8080/taikhoan/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Lỗi khi gửi dữ liệu");
      else {
        alert("Thêm tài khoản thành công!");
        handleClear();
        console.log("Lưu thông tin tài khoản:", formData);
      }
    } catch (err) {
      if (err instanceof Error) {
        alert("Lỗi kết nối backend: " + err.message);
      } else {
        alert("Đã có lỗi xảy ra.");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeData = async () => {
    const { id, user, password, name, role } = formData;

    if (!id || !user || !password || !name || !role) {
      alert("Vui lòng nhập đầy đủ các trường bắt buộc!");
      return;
    }

    const userRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userRegex.test(user)) {
      alert("User không hợp lệ!");
      return;
    }
    await saveToBackend();
  };

  const handleClear = () => {
    setFormData({
      id: "",
      name: "",
      user: "",
      password: "",
      role: "",
      ghiChu: "",
    });
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="w-full mx-auto  p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl p-2 text-white font-extrabold mb-4 text-center bg-orange-400 rounded-md">
            Quản lý tài khoản
          </h2>
          <button
            onClick={handleBack}
            className="p-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Quay lại
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-start">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="userDetail"
              >
                Mã tài khoản
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
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="userDetail"
              >
                Mật khẩu
              </label>

              <input
                type="text"
                name="password"
                autoComplete="off"
                value={formData.password}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="userDetail"
              >
                Nhân viên sở hữu
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
          {/* Cột 2 */}
          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="userDetail"
              >
                Tên tài khoản
              </label>
              <input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="userDetail"
              >
                Quyền đăng nhập
              </label>
              <div className="w-full">
                <select
                  name="role"
                  value={formData.role} // Gán giá trị từ formData
                  onChange={handleChange} // Xử lý sự kiện thay đổi
                  className="form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Quyền đăng nhập --</option>
                  {roleList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
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
            name="ghiChu"
            value={formData.ghiChu}
            onChange={handleChange}
            rows={4}
            placeholder="Nhập nội dung..."
            className="form-textera multiline block w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center p-4 gap-4">
          <button
            type="button"
            onClick={handleChangeData}
            className="w-32 p-2 border-white bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 focus:outline-none  focus:ring-2 focus:ring-orange-500"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
