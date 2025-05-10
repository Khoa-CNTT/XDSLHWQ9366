import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PhieuChi } from "../Type/Types";

export default function DisbursementDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    location.state?.phieuchi || {
      maPhieuChi: "",
      tenPhieuChi: "",
      maNhanVien: "",
      nguoiNhan: "",
      soTien: "",
      ngayChi: "",
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
    setFormData((prev: PhieuChi) => ({ ...prev, [name]: value }));
  };

  if (!formData) {
    return <div>Không có dữ liệu lĩnh vực.</div>;
  }

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/phieuchi/update/${formData.id}?maphieuchi=${formData.id}`,
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
            Quản lý phiếu chi
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
                htmlFor="receiptDetail"
              >
                Mã Phiếu chi
              </label>
              <input
                type="text"
                name="maPhieuChi"
                value={formData.maPhieuChi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Số tiền
              </label>
              <input
                type="text"
                name="soTien"
                value={formData.soTien}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="receiptDetail"
              >
                Nội dung
              </label>
              <textarea
                value={formData.tenPhieuChi}
                name="tenPhieuChi"
                rows={4}
                onChange={handleChange}
                placeholder="Nhập nội dung..."
                className="form-textera multiline block w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Cột 2 */}
          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="receiptDetail"
              >
                Ngày chi
              </label>

              <input
                type="date"
                name="ngayChi"
                value={formData.ngayChi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="receiptDetail"
              >
                Người nhận
              </label>
              <input
                type="text"
                name="nguoiNhan"
                value={formData.nguoiNhan}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="receiptDetail"
              >
                Người chi
              </label>
              <input
                type="text"
                name="maNhanVien"
                value={formData.maNhanVien}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center p-4 gap-4">
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
