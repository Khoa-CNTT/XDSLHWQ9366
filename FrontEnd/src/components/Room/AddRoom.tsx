import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Room } from "../Type/Types";

export default function AddRoom() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Room>({
    maPhongHoc: "",
    tenPhongHoc: "",
    soChoNgoi: 0,
    ghiChu: "",
  });

  const saveToBackend = async () => {
    try {
      const res = await fetch("http://localhost:8080/phonghoc/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Lỗi khi gửi dữ liệu");
      else {
        alert("Thêm khoá học thành công!");
        handleClear();
        console.log("Lưu thông tin khoá học:", formData);
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
    const { tenPhongHoc, soChoNgoi, ghiChu } = formData;

    if (!tenPhongHoc || soChoNgoi == 0 || !ghiChu) {
      alert("Vui lòng nhập đầy đủ các trường bắt buộc!");
      return;
    }

    const nameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nameRegex.test(tenPhongHoc)) {
      alert("Tên không hợp lệ!");
      return;
    }
    await saveToBackend();
  };
  const handleClear = () => {
    setFormData({
      maPhongHoc: "",
      tenPhongHoc: "",
      soChoNgoi: 0,
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
            Quản lý Phòng học
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
                htmlFor="roomDetail"
              >
                Mã Phòng học
              </label>
              <input
                type="text"
                name="maPhongHoc"
                value={formData.maPhongHoc}
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
                htmlFor="roomDetail"
              >
                Tên Phòng học
              </label>
              <input
                type="text"
                name="tenPhongHoc"
                value={formData.tenPhongHoc}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="roomDetail"
              >
                Số chỗ ngồi
              </label>
              <input
                type="text"
                name="soChoNgoi"
                value={formData.soChoNgoi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            name="ghiChu"
            value={formData.ghiChu}
            rows={4}
            onChange={handleChange}
            placeholder="Nhập nội dung..."
            className="form-textera multiline block w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center p-4 gap-4">
          <button
            type="submit"
            onChange={handleChangeData}
            className="w-32 p-2 border-white bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 focus:outline-none  focus:ring-2 focus:ring-orange-500"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
