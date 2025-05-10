import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChucVu } from "../Type/Types";

export default function RoleDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    location.state?.chucvu || {
      maChucVu: "",
      tenChucVu: "",
      trangThai: "",
    }
  );

  useEffect(() => {
    if (!formData) {
      console.warn("Không có dữ liệu lĩnh vực được truyền!");
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ChucVu) => ({ ...prev, [name]: value }));
  };

  if (!formData) {
    return <div>Không có dữ liệu lĩnh vực.</div>;
  }

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/chucvu/update/${formData.id}?machucvu=${formData.id}`,
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

      alert("Cập nhật thông tin lĩnh vực thành công!");
      console.log("Dữ liệu đã cập nhật:", formData);
      navigate(-1); // Quay lại trang trước
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin lĩnh vực!");
    }
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
                value={formData.maChucVu}
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
                  type="text"
                  name="trangThai"
                  value={formData.trangThai}
                  onChange={handleChange}
                  className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
            onClick={handleSave}
            className="w-32 p-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
