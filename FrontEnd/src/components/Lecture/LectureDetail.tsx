import { useState } from "react";

export default function LectureDetail() {
  const [formData, setFormData] = useState({
    id: "GV01",
    name: "Lê Văn A",
    dob: "1997-08-15",
    gioiTinh: "true",
    CCCD: "048097000077",
    SDT: "0385665243",
    email: "abc123@gmail.com",
    address: "108 Nguyễn Chánh, Liên Chiểu, Đà Nẵng",
    coQuan: "DTU",
    tinhTrang: "dangDay",
    linhVuc: "java",
    ghiChu: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    console.log("Thêm giảng viên:", formData);
    alert("Thêm giảng viên thành công!");
  };

  const handleSave = () => {
    console.log("Lưu thông tin giảng viên:", formData);
    alert("Lưu thông tin thành công!");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa giảng viên này?"
    );
    if (confirmDelete) {
      setFormData({
        id: "",
        name: "",
        dob: "",
        gioiTinh: "",
        CCCD: "",
        SDT: "",
        email: "",
        address: "",
        coQuan: "",
        tinhTrang: "",
        linhVuc: "",
        ghiChu: "",
      });
      alert("Đã xóa thông tin giảng viên.");
    }
  };

  return (
    <div>
      <div className="w-full mx-auto  p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl p-2 text-white font-extrabold mb-4 text-center bg-orange-400 rounded-md">
          Quản lý Giảng viên
        </h2>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-start">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Mã giảng viên
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
                Ngày sinh
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Số CMND
              </label>

              <input
                type="text"
                name="salary"
                value={formData.CCCD}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Email
              </label>
              <input
                type="text"
                name="salary"
                value={formData.email}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Cơ quan công tác
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.coQuan}
                onChange={handleChange}
                className="form-input block pl-1 w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Lĩnh vực
              </label>
              <div className="w-full">
                <select
                  name="linhVuc"
                  value={formData.linhVuc} // Gán giá trị từ formData
                  onChange={handleChange} // Xử lý sự kiện thay đổi
                  className="form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Lĩnh vực --</option>
                  <option value="java">Java</option>
                  <option value="c">C#</option>
                  <option value="python">Python</option>
                </select>
              </div>
            </div>
          </div>
          {/* Cột 2 */}
          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Tên giảng viên
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
                Giới tính
              </label>
              <div className="w-full">
                <select
                  name="gioiTinh"
                  value={formData.gioiTinh}
                  onChange={handleChange}
                  className="form-input w-2/3 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Giới tính --</option>
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select>
              </div>
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Số điện thoại
              </label>

              <input
                type="text"
                name="SDT"
                value={formData.SDT}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex p-1 w-full justify-between border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Tình trạng công tác
              </label>
              <div className="w-full">
                <select
                  name="tinhTrang"
                  value={formData.tinhTrang} // Gán giá trị từ formData
                  onChange={handleChange} // Xử lý sự kiện thay đổi
                  className="form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Tình trạng --</option>
                  <option value="dangDay">Đang dạy</option>
                  <option value="sapBatDau">Sắp bắt đầu</option>
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
            name="description"
            rows={4}
            placeholder="Nhập nội dung..."
            className="form-textera multiline block w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center p-4 gap-4">
          <button
            type="button"
            onClick={handleAdd}
            className="w-32 py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Thêm
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-32 p-2 border-white bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 focus:outline-none  focus:ring-2 focus:ring-orange-500"
          >
            Lưu
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-32 py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}
