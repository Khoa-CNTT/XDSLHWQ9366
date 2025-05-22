import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddField() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    maLinhVuc: "",
    tenLinhVuc: "",
  });

  const saveToBackend = async () => {
    try {
      const res = await fetch("http://localhost:8080/linhvuc/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Lỗi khi gửi dữ liệu");
      alert("Thêm lĩnh vực thành công!");
      handleClear();
      console.log("Lưu thông tin lĩnh vực:", formData);
      handleBack();
    } catch (err) {
      if (err instanceof Error) {
        alert("Lỗi kết nối backend: " + err.message);
        console.log(err);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeData = async () => {
    const { tenLinhVuc } = formData;

    if (!tenLinhVuc) {
      alert("Vui lòng nhập đầy đủ các trường bắt buộc!");
      return;
    }

    if (tenLinhVuc.length < 5 || tenLinhVuc.length > 50) {
      alert("Tên lĩnh vực phải từ 5 đến 50 ký tự!");
      return;
    }

    await saveToBackend();
  };

  const handleClear = () => {
    setFormData({
      maLinhVuc: "",
      tenLinhVuc: "",
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
            Quản lý Linh vực
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
                Mã Lĩnh Vực
              </label>
              <input
                type="text"
                name="maLinhVuc"
                placeholder="Mã thêm tự động..."
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Cột 2 */}

          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="roleDetail"
              >
                Tên Lĩnh Vực
              </label>
              <input
                type="text"
                name="tenLinhVuc"
                value={formData.tenLinhVuc}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4 gap-4">
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
