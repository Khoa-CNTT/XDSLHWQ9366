import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Class } from "../Type/Types";

export default function AddClass() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Class>({
    maLopHoc: "",
    tenLopHoc: "",
    lichHoc: "",
    tinhTrang: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    thuLao: 0,
    daThanhToan: "",
    khoaHoc: [],
    phongHoc: [],
    giangVien: [],
    nhanVien: [],
    ghiChu: "",
  });

  const saveToBackend = async () => {
    try {
      const res = await fetch("http://localhost:8080/khoahoc/add", {
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
    const { tenLopHoc, lichHoc, ngayBatDau, ngayKetThuc } = formData;

    if (!tenLopHoc || !lichHoc || !ngayBatDau || !ngayKetThuc) {
      alert("Vui lòng nhập đầy đủ các trường bắt buộc!");
      return;
    }

    const nameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nameRegex.test(tenLopHoc)) {
      alert("Tên không hợp lệ!");
      return;
    }
    await saveToBackend();
  };
  const handleClear = () => {
    setFormData({
      maLopHoc: "",
      tenLopHoc: "",
      lichHoc: "",
      tinhTrang: "",
      ngayBatDau: "",
      ngayKetThuc: "",
      thuLao: 0,
      daThanhToan: "",
      khoaHoc: [],
      phongHoc: [],
      giangVien: [],
      nhanVien: [],
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
            Quản lý lớp học
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
                htmlFor="classDetail"
              >
                Mã lớp học
              </label>
              <input
                type="text"
                name="maLopHoc"
                value={formData.maLopHoc}
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
                name="lichHoc"
                value={formData.lichHoc}
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
                name="ngayBatDau"
                value={formData.ngayBatDau}
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
                name="thuLao"
                value={formData.thuLao}
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
                name="tenKhoaHoc"
                value={formData.khoaHoc[0]?.tenKhoaHoc || ""}
                onChange={handleChange}
                className="form-input block pl-1 w-full bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="classDetail"
              >
                Tên giảng viên
              </label>
              <input
                type="text"
                name="tenGiangVien"
                value={formData.giangVien[0]?.tenGiangVien || ""}
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
                name="tenLopHoc"
                value={formData.tenLopHoc}
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
                <input
                  type="text"
                  name="tinhTrang"
                  value={formData.tinhTrang}
                  onChange={handleChange}
                  className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                name="ngayKetThuc"
                value={formData.ngayKetThuc}
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
                  type="text"
                  name="thanhToan"
                  value={formData.daThanhToan}
                  onChange={handleChange}
                  className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                name="tenPhongHoc"
                value={formData.phongHoc[0]?.tenPhongHoc || ""}
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
                name="tenNhanVien"
                value={formData.nhanVien[0]?.tenNhanVien}
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
