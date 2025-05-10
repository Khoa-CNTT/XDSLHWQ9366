import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddLecture() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tenGiangVien: "",
    ngaySinh: "",
    gioiTinh: "",
    soCMND: "",
    soDienThoai: "",
    email: "",
    diaChi: "",
    coQuanCongTac: "",
    tinhTrangCongTac: "",
    linhVuc: "",
    ghiChu: "",
    urlHinhDaiDien: null,
  });

  const saveToBackend = async () => {
    try {
      const payload = {
        ...formData,
        tinhTrangCongTac: formData.tinhTrangCongTac === "true", // Chuyển đổi chuỗi thành boolean
      };

      const res = await fetch("http://localhost:8080/giangvien/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Lỗi khi gửi dữ liệu");
      alert("Thêm giảng viên thành công!");
      handleClear();
      console.log("Lưu thông tin giảng viên:", payload);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeData = async () => {
    const { tenGiangVien, ngaySinh, email, soCMND, soDienThoai, diaChi } =
      formData;

    if (!tenGiangVien || !ngaySinh || !email) {
      alert("Vui lòng nhập đầy đủ các trường bắt buộc!");
      return;
    }

    if (tenGiangVien.length < 5 || tenGiangVien.length > 50) {
      alert("Tên giảng viên phải từ 5 đến 50 ký tự!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ!");
      return;
    }

    // if (!/^\d{12}$/.test(soCMND)) {
    //   alert("Số CMND phải gồm 12 chữ số!");
    //   return;
    // }

    if (!/^0\d{9}$/.test(soDienThoai)) {
      alert("Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0!");
      return;
    }

    if (diaChi.length > 255) {
      alert("Địa chỉ không được vượt quá 255 ký tự!");
      return;
    }

    await saveToBackend();
  };

  const handleClear = () => {
    setFormData({
      tenGiangVien: "",
      ngaySinh: "",
      gioiTinh: "",
      soCMND: "",
      soDienThoai: "",
      email: "",
      diaChi: "",
      coQuanCongTac: "",
      tinhTrangCongTac: "",
      linhVuc: "",
      ghiChu: "",
      urlHinhDaiDien: null,
    });
  };
  const linhVucList = useMemo(
    () => [
      {
        id: "LV01",
        name: "Java",
      },
      {
        id: "LV02",
        name: "IOT",
      },
      {
        id: "LV03",
        name: "Công nghệ thông tin",
      },
      {
        id: "LV04",
        name: "Khoa học máy tính",
      },
    ],
    []
  );
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="w-full mx-auto  p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl p-2 text-white font-extrabold mb-4 text-center bg-orange-400 rounded-md">
            Thêm Giảng viên
          </h2>
          <button
            onClick={handleBack}
            className="p-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Quay lại
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 py-2">
          <div className="col-start">
            {/* <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="addLecture"
              >
                Mã giảng viên
              </label>
              <input
                type="text"
                name="maGiangVien"

                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="addLecture"
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
                htmlFor="addLecture"
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
                htmlFor="addLecture"
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
                htmlFor="addLecture"
              >
                Cơ quan công tác
              </label>
              <input
                type="text"
                name="coQuanCongTac"
                value={formData.coQuanCongTac}
                onChange={handleChange}
                className="form-input block pl-1 w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="addLecture"
              >
                Lĩnh vực
              </label>
              <div className="w-full">
                <select
                  name="linhVuc"
                  value={formData.linhVuc}
                  onChange={handleChange}
                  className="form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Lĩnh vực --</option>
                  {linhVucList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Cột 2 */}
          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="addLecture"
              >
                Tên giảng viên
              </label>
              <input
                type="text"
                name="tenGiangVien"
                value={formData.tenGiangVien}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="addLecture"
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
                htmlFor="addLecture"
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
                htmlFor="addLecture"
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
                htmlFor="addLecture"
              >
                Tình trạng công tác
              </label>
              <div className="w-full">
                <select
                  name="tinhTrangCongTac"
                  value={formData.tinhTrangCongTac}
                  onChange={handleChange}
                  className="form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Tình trạng --</option>
                  <option value="Đang giảng dạy">Đang công tác</option>
                  <option value="Đã nghỉ">Đã nghỉ</option>
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
            rows={4}
            placeholder="Nhập nội dung..."
            value={formData.ghiChu}
            onChange={handleChange}
            className="form-textera multiline block w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

export default AddLecture;
