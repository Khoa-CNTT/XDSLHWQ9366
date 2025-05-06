import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Student } from "../Type/Types";

export default function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Student>({
    maHocVien: "",
    tenHocVien: "",
    ngaySinh: "",
    gioiTinh: "",
    soCMND: "",
    soDienThoai: "",
    email: "",
    diaChi: "",
    coQuanCongTac: "",
    tinhTrangHocTap: "",
    nguoiNhapThongTin: "",
    ghiChu: "",
    urlHinhDaiDien: null,
    ngayCapNhatGanNhat: "",
  });

  const tinhTrang = useMemo(
    () => [
      { id: "danghoc", name: "Đang học" },
      { id: "nghihoc", name: "Nghỉ học" },
      { id: "datotnghiep", name: "Đã tốt nghiệp" },
    ],
    []
  );
  const saveToBackend = async () => {
    try {
      const res = await fetch("http://localhost:8080/giangvien/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Lỗi khi gửi dữ liệu");
      else {
        alert("Thêm giảng viên thành công!");
        handleClear();
        console.log("Lưu thông tin giảng viên:", formData);
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
    const { maHocVien, tenHocVien, ngaySinh, email } = formData;

    if (!maHocVien || !tenHocVien || !ngaySinh || !email) {
      alert("Vui lòng nhập đầy đủ các trường bắt buộc!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ!");
      return;
    }
    await saveToBackend();
  };

  const handleClear = () => {
    setFormData({
      maHocVien: "",
      tenHocVien: "",
      ngaySinh: "",
      gioiTinh: "",
      soCMND: "",
      soDienThoai: "",
      email: "",
      diaChi: "",
      coQuanCongTac: "",
      tinhTrangHocTap: "",
      nguoiNhapThongTin: "",
      ghiChu: "",
      urlHinhDaiDien: null,
      ngayCapNhatGanNhat: "",
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
            Thêm Học viên
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
                htmlFor="studentdetail"
              >
                Mã Học viên
              </label>
              <input
                type="text"
                name="maHocVien"
                value={formData.maHocVien}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="studentdetail"
              >
                Ngày sinh
              </label>
              <input
                type="date"
                name="ngaySinh"
                value={formData.ngaySinh}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="studentdetail"
              >
                Số CMND
              </label>

              <input
                type="text"
                name="soCMND"
                value={formData.soCMND}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="studentdetail"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="studentdetail"
              >
                Tình trạng học tập
              </label>
              <div className="w-full">
                <select
                  name="tinhTrangHocTap"
                  value={formData.tinhTrangHocTap} // Gán giá trị từ formData
                  onChange={handleChange} // Xử lý sự kiện thay đổi
                  className="form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Tình trạng --</option>
                  {tinhTrang.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="studentdetail"
              >
                Người cập nhật thông tin
              </label>
              <input
                type="text"
                name="nguoiNhapThongTin"
                value={formData.nguoiNhapThongTin}
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
                htmlFor="studentdetail"
              >
                Tên học viên
              </label>
              <input
                type="text"
                name="tenHocVien"
                value={formData.tenHocVien}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="studentdetail"
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
                htmlFor="studentdetail"
              >
                Số điện thoại
              </label>

              <input
                type="text"
                name="soDienThoai"
                value={formData.soDienThoai}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex p-1 w-full justify-between border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="studentdetail"
              >
                Địa chỉ
              </label>
              <input
                type="text"
                name="diaChi"
                value={formData.diaChi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="studentdetail"
              >
                Người nhập thông tin
              </label>
              <input
                type="text"
                name="nguoiNhapThongTin"
                value={formData.nguoiNhapThongTin}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-between border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="studentdetail"
              >
                Ngày cập nhật gần nhất
              </label>
              <input
                type="date"
                name="ngayCapNhatGanNhat"
                value={formData.ngayCapNhatGanNhat}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex p-1 w-full justify-center border">
          <label
            className="block w-1/5 text-gray-700 text-sm font-bold "
            htmlFor="studentdetail"
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
