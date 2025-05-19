import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRole() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    maChucVu: "",
    tenChucVu: "",
    trangThai: "",
  });

  const saveToBackend = async () => {
    console.log(formData);
    try {
      const res = await fetch("http://localhost:8080/chucvu/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Lỗi khi gửi dữ liệu");
      alert("Thêm lĩnh vực thành công!");
      handleClear();
      console.log("Lưu thông tin lĩnh vực:", formData);
    } catch (err) {
      if (err instanceof Error) {
        alert("Lỗi kết nối backend: " + err.message);
      } else {
        alert("Đã có lỗi xảy ra.");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "trangThai" ? value === "1" : value,
    }));
  };

  const handleChangeData = async () => {
    const { tenChucVu, trangThai } = formData;

    if (!tenChucVu || !trangThai) {
      alert("Vui lòng nhập đầy đủ các trường bắt buộc!");
      return;
    }

    if (tenChucVu.length < 5 || tenChucVu.length > 50) {
      alert("Tên lĩnh vực phải từ 5 đến 50 ký tự!");
      return;
    }

    await saveToBackend();
  };

  const handleClear = () => {
    setFormData({
      maChucVu: "",
      tenChucVu: "",
      trangThai: "",
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
            Quản lý Chức vụ
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
                htmlFor="roleDetail"
              >
                Mã Chức Vụ
              </label>
              <input
                type="text"
                name="maChucVu"
                placeholder="Mã thêm tự động"
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
                <select
                  name="trangThai"
                  value={formData.trangThai}
                  onChange={handleChange}
                  className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn trạng thái --</option>
                  <option value="1">Đang hoạt động</option>
                  <option value="0">Tạm ngừng</option>
                </select>
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
                name="tenChucVu"
                value={formData.tenChucVu}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4 gap-4">
          <button
            type="button"
            onClick={handleChangeData}
            className="w-32 p-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
