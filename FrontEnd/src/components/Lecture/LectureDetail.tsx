import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lecturer } from "../Type/Types";

export default function LectureDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    location.state?.lecturer || {
      maGiangVien: "",
      tenGiangVien: "",
      ngaySinh: "",
      gioiTinh: "",
      soCMND: "",
      soDienThoai: "",
      email: "",
      diaChi: "",
      coQuanCongTac: "",
      tinhTrangCongTac: "",
      linhVuc: {
        id: "",
        name: "",
      },
      ghiChu: "",
      urlHinhDaiDien: null,
    }
  );
  const linhVucList = useMemo(
    () => [
      {
        id: "java",
        name: "Java",
      },
      {
        id: "iot",
        name: "IOT",
      },
      {
        id: "cntt",
        name: "Công nghệ thông tin",
      },
      {
        id: "khmt",
        name: "Khoa học máy tính",
      },
    ],
    []
  );
  useEffect(() => {
    if (!formData) {
      console.warn("Không có dữ liệu giảng viên được truyền!");
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: Lecturer) => ({ ...prev, [name]: value }));
  };

  if (!formData) {
    return <div>Không có dữ liệu giảng viên.</div>;
  }

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/giangvien/update/${formData.id}?maGiangVien=${formData.id}`,
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

      alert("Cập nhật thông tin giảng viên thành công!");
      console.log("Dữ liệu đã cập nhật:", formData);
      navigate(-1); // Quay lại trang trước
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin giảng viên!");
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
            Quản lý Giảng viên
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
                htmlFor="lectureDetail"
              >
                Mã giảng viên
              </label>
              <input
                type="text"
                name="maGiangVien"
                value={formData.maGiangVien}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="lectureDetail"
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
                htmlFor="lectureDetail"
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
                htmlFor="lectureDetail"
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
                htmlFor="lectureDetail"
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
                htmlFor="lectureDetail"
              >
                Lĩnh vực
              </label>
              <div className="w-full">
                <select
                  name="linhVuc"
                  value={formData.linhVuc.id} // Gán giá trị từ formData
                  onChange={handleChange} // Xử lý sự kiện thay đổi
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
                htmlFor="lectureDetail"
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
                htmlFor="lectureDetail"
              >
                Giới tính
              </label>
              <div className="w-full">
                <select
                  name="gioiTinh"
                  value={formData.gioiTinh} // Gán giá trị từ formData
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
                htmlFor="lectureDetail"
              >
                Số điện thoại
              </label>

              <input
                type="text"
                name="SDT"
                value={formData.soDienThoai}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex p-1 w-full justify-between border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="lectureDetail"
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
                htmlFor="lectureDetail"
              >
                Tình trạng công tác
              </label>
              <div className="w-full">
                <select
                  name="tinhTrangCongTac"
                  value={formData.tinhTrangCongTac} // Gán giá trị từ formData
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
            htmlFor="lectureDetail"
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
