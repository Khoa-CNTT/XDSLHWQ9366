import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LienHe } from "../Type/Types";

export default function AddContact() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    () =>
      location.state?.contact || {
        id: "",
        maKhach: "",
        hoTen: "",
        email: "",
        soDienThoai: "",
        yKien: "",
        ngayLienHe: "",
      }
  );

  useEffect(() => {
    if (!formData) {
      console.warn("Không có dữ liệu liên hệ được truyền!");
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: LienHe) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/lienhe/update/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Cập nhật dữ liệu thất bại!");
      }

      alert("Cập nhật thông tin liên hệ thành công!");
      console.log("Dữ liệu đã cập nhật:", formData);
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin liên hệ!");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!formData) {
    return <div>Không có dữ liệu liên hệ.</div>;
  }

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl p-2 text-white font-extrabold mb-4 text-center bg-orange-400 rounded-md">
          Thêm liên hệ
        </h2>
        <button
          onClick={handleBack}
          className="p-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Quay lại
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="flex p-1 w-full justify-center border items-center">
            <label className="w-1/2 text-gray-700 text-sm font-bold">
              Mã Khách
            </label>
            <input
              name="maKhach"
              value={formData.maKhach}
              readOnly
              placeholder="Mã tự động cập nhật"
              className="w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex p-1 w-full justify-center border items-center">
            <label className="w-1/2 text-gray-700 text-sm font-bold">
              Số Điện Thoại
            </label>
            <input
              type="text"
              name="soDienThoai"
              value={formData.soDienThoai}
              onChange={handleChange}
              className="w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex p-1 w-full justify-center border items-center">
            <label className="w-1/2 text-gray-700 text-sm font-bold">
              Ghi chú
            </label>
            <textarea
              name="yKien"
              value={formData.yKien}
              onChange={handleChange}
              rows={3}
              placeholder="Nhập nội dung..."
              className="w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
            />
          </div>
        </div>
        <div>
          <div className="flex p-1 w-full justify-center border items-center">
            <label className="w-1/2 text-gray-700 text-sm font-bold">
              Họ Tên
            </label>
            <input
              type="text"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              className="w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex p-1 w-full justify-center border items-center">
            <label className="w-1/2 text-gray-700 text-sm font-bold">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex p-1 w-full justify-center border items-center">
            <label className="w-1/2 text-gray-700 text-sm font-bold">
              Ngày liên hệ
            </label>
            <input
              type="date"
              name="ngayLienHe"
              value={formData.ngayLienHe}
              onChange={handleChange}
              className="w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center p-4 gap-4">
        <button
          type="button"
          onClick={handleSave}
          className="w-32 p-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
