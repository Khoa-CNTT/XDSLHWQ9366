import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChiTietLopHoc } from "../Type/Types";

export default function CTLHDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ChiTietLopHoc>(
    location.state?.ctlh || {
      maCtlh: "",
      hocVien: { maHocVien: "", tenHocVien: "" },
      lopHoc: { maLopHoc: "", tenLopHoc: "" },
      hocPhi: "",
      mienGiamHocPhi: "",
      soTienThu: "",
      diem: "",
      ngayCapChungChi: "",
      xepLoai: "",
      diemDanh: "",
      ghiChu: "",
    }
  );

  useEffect(() => {
    if (!formData) {
      console.warn("Không có dữ liệu chi tiết lớp học được truyền!");
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!formData) {
    return <div>Không có dữ liệu chi tiết lớp học.</div>;
  }

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/ctlh/update/${formData.maCtlh}?mactlh=${formData.maCtlh}`,
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

      alert("Cập nhật thông tin chi tiết lớp học thành công!");
      navigate(-1); // Quay lại trang trước
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin chi tiết lớp học!");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl p-2 text-white font-extrabold mb-4 text-center bg-orange-400 rounded-md">
            Quản lý chi tiết lớp học
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
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Mã chi tiết lớp học
              </label>
              <input
                type="text"
                name="maCtlh"
                value={formData.maCtlh}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Mã học viên
              </label>
              <input
                type="text"
                name="maHocVien"
                value={formData.hocVien?.maHocVien}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Mã lớp học
              </label>
              <input
                type="text"
                name="maLopHoc"
                value={formData.lopHoc?.maLopHoc}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Học phí
              </label>
              <input
                type="text"
                name="hocPhi"
                value={formData.hocPhi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Miễn giảm học phí
              </label>
              <input
                type="text"
                name="mienGiamHocPhi"
                value={formData.mienGiamHocPhi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Số tiền thu
              </label>
              <input
                type="text"
                name="soTienThu"
                value={formData.soTienThu}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Cột 2 */}
          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
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
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Ngày cấp chứng chỉ
              </label>
              <input
                type="text"
                name="ngayCapChungChi"
                value={formData.ngayCapChungChi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Xếp loại
              </label>
              <input
                type="text"
                name="xepLoai"
                value={formData.xepLoai}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Điểm danh
              </label>
              <input
                type="text"
                name="diemDanh"
                value={formData.diemDanh}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex p-1 w-full justify-center border">
          <label className="block w-1/5 text-gray-700 text-sm font-bold">
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
