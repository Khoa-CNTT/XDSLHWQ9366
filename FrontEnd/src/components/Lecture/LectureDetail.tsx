import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiangVien } from "../Type/Types";
import { useLinhVucData } from "../../hooks/useLinhVucData";
import LinhVucSelect from "../Common/LinhVucSelect";

export default function LectureDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { linhVucs } = useLinhVucData();

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
      maLinhVucL: "",
      ghiChu: "",
      urlHinhDaiDien: null,
    }
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
    setFormData((prev: GiangVien) => ({ ...prev, [name]: value }));
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
        {/* //Chèn thêm mục hiển thị ảnh và nút thêm ảnh chọn từ windows */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-32 h-36 mb-2">
            {formData.urlHinhDaiDien ? (
              <img
                src={formData.urlHinhDaiDien}
                alt="Hình đại diện"
                className="w-full h-full object-cover rounded-xl border"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className=""
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setFormData((prev: GiangVien) => ({
                    ...prev,
                    urlHinhDaiDien: event.target?.result as string,
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
            className="text-sm text-gray-600"
          />
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
                <div className="w-full">
                  <LinhVucSelect
                    value={formData.maLinhVuc}
                    onChange={handleChange}
                    linhVucs={linhVucs}
                    name="maLinhVuc"
                  />
                </div>
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

              <input
                type="text"
                name="tinhTrangCongTac"
                value={formData.tinhTrangCongTac}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
