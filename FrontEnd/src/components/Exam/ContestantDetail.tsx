import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThiSinh } from "../Type/Types";

export default function ContestantDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ThiSinh>(
    location.state?.thisinh || {
      maThiSinhDuThi: "",
      tenThiSinhDuThi: "",
      ngaySinh: "",
      gioiTinh: "",
      soCMND: "",
      soDienThoai: "",
      email: "",
      diaChi: "",
      dienDangKy: "",
      maLichThi: "",
      maPhongThi: "",
      diem: "",
      xepLoai: "",
      ngayCapChungChi: "",
      ghiChu: "",
      urlHinhDaiDien: null,
    }
  );
  const dienDangKy = useMemo(
    () => [
      { id: "ONLINE", name: "ONLINE" },
      { id: "TRUCTIEP", name: "TRUCTIEP" },
    ],
    []
  );

  useEffect(() => {
    if (!formData) {
      console.warn("Không có dữ liệu học viên được truyền!");
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ThiSinh) => ({ ...prev, [name]: value }));
  };

  if (!formData) {
    return <div>Không có dữ liệu học viên.</div>;
  }

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/thisinh/update/${formData.maThiSinhDuThi}?mahocvien=${formData.maThiSinhDuThi}`,
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

      alert("Cập nhật thông tin học viên thành công!");
      console.log("Dữ liệu đã cập nhật:", formData);
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin học viên!");
    }
  };

  return (
    <div>
      <div className="w-full mx-auto  p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl p-2 text-white font-extrabold mb-4 text-center bg-orange-400 rounded-md">
            Quản lý Thí sinh
          </h2>
          <button
            onClick={() => {
              navigate(-1);
            }}
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
                htmlFor="contenstantDetail"
              >
                Mã Thí sinh
              </label>
              <input
                type="text"
                name="maThiSinhDuThi"
                value={formData.maThiSinhDuThi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="contenstantDetail"
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
                htmlFor="contenstantDetail"
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
                htmlFor="contenstantDetail"
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
                htmlFor="contenstantDetail"
              >
                Diện đăng ký
              </label>
              <div className="w-full">
                <select
                  name="dienDangKy"
                  value={formData.dienDangKy.toLowerCase()} // Gán giá trị từ formData
                  onChange={handleChange} // Xử lý sự kiện thay đổi
                  className="form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {dienDangKy.map((item) => (
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
                htmlFor="contenstantDetail"
              >
                Phòng thi
              </label>
              <input
                type="text"
                name="maPhongThi"
                value={formData.maPhongThi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="contenstantDetail"
              >
                Xếp loại
              </label>
              <div className="w-full">
                <select
                  name="xepLoai"
                  value={formData.xepLoai} // Gán giá trị từ formData
                  onChange={handleChange} // Xử lý sự kiện thay đổi
                  className="form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Xếp loại --</option>
                  <option value="xuatSac">Xuất sắc</option>
                  <option value="gioi">Giỏi</option>
                  <option value="kha">Khá</option>
                  <option value="trungBinh">Trung bình</option>
                </select>
              </div>
            </div>
          </div>
          {/* Cột 2 */}
          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="contenstantDetail"
              >
                Tên Thí sinh
              </label>
              <input
                type="text"
                name="tenThiSinhDuThi"
                value={formData.tenThiSinhDuThi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="contenstantDetail"
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
                htmlFor="contenstantDetail"
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
                htmlFor="contenstantDetail"
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

            <div className="flex p-1 w-full justify-between border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="contenstantDetail"
              >
                Lịch thi
              </label>
              <input
                type="text"
                name="maLichThi"
                value={formData.maLichThi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-between border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="contenstantDetail"
              >
                Điểm
              </label>
              <input
                type="text"
                name="diem"
                value={formData.diem}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-between border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="contenstantDetail"
              >
                Ngày cấp chứng chỉ
              </label>
              <input
                type="date"
                name="ngayCapChungChi"
                value={formData.ngayCapChungChi}
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
            onChange={handleChange}
            rows={4}
            placeholder="Nhập nội dung..."
            className="form-textera multiline block w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center p-4 gap-4">
          <button
            type="button"
            onClick={handleSave}
            className="w-32 p-2 border-white bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 focus:outline-none  focus:ring-2 focus:ring-orange-500"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
