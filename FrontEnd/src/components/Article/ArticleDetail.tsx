import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BaiViet } from "../Type/Types";
import { toast } from "react-toastify";

export default function ArticleDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BaiViet>(
    location.state?.baiviet || {
      maBaiViet: "",
      tieuDe: "",
      uriHinhAnhMinhHoa: "",
      noiDungTomTat: "",
      noiDung: "",
      ngayDang: "",
      nhanVienId: "",
      menu: "",
      trangThai: false,
      lanCapNhatCuoiCung: "",
    }
  );
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "select-one" && name === "trangThai"
          ? value === "true"
          : value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        lanCapNhatCuoiCung:
          formData.lanCapNhatCuoiCung || new Date().toISOString().slice(0, 10),
      };
      const res = await fetch(
        `http://localhost:8080/baiviet/update/${formData.maBaiViet}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok || result.status !== 200) {
        throw new Error(result.message || "Cập nhật thất bại");
      }

      toast.success("✅ Cập nhật thành công!");
      navigate(-1);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error("❌ Cập nhật thất bại!");
    }
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa liên hệ này?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(
        `http://localhost:8080/baiviet/delete/${formData.maBaiViet}`,
        {
          method: "DELETE",
        }
      );
      toast.success("🗑️ Xóa liên hệ thành công!");
      navigate(-1);
    } catch (err) {
      console.error("Lỗi khi xóa liên hệ:", err);
      toast.error("❌ Xóa liên hệ thất bại!");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="w-full mx-auto  p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl p-2 text-white font-extrabold bg-orange-400 rounded-md">
            Quản lý Bài đăng
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
                Mã Bài Viết
              </label>
              <input
                type="text"
                name="maBaiViet"
                value={formData.maBaiViet}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Tiêu đề
              </label>
              <input
                type="text"
                name="tieuDe"
                value={formData.tieuDe}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Ảnh minh họa
              </label>
              <input
                type="text"
                name="uriHinhAnhMinhHoa"
                value={formData.uriHinhAnhMinhHoa}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Nội dung tóm tắt
              </label>
              <textarea
                name="noiDungTomTat"
                value={formData.noiDungTomTat}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Nội dung
              </label>
              <textarea
                name="noiDung"
                value={formData.noiDung}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
              />
            </div>
          </div>

          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Lượng truy cập
              </label>
              <input
                type="text"
                name="luongTruyCap"
                value={formData.luongTruyCap}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Menu
              </label>
              <input
                type="text"
                name="menu"
                value={formData.menu}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Nhân viên ID
              </label>
              <input
                type="text"
                name="nhanVienId"
                value={formData.nhanVienId}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Trạng thái
              </label>
              <input
                type="text"
                name="trangThai"
                value={formData.trangThai ? "true" : "false"}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Ngày đăng
              </label>
              <input
                type="date"
                name="ngayDang"
                value={formData.ngayDang}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label className="w-1/2 text-gray-700 text-sm font-bold">
                Lần cập nhật cuối
              </label>
              <input
                type="date"
                name="lanCapNhatCuoiCung"
                value={formData.lanCapNhatCuoiCung || ""}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300"
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
