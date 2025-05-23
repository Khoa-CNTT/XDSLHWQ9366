import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BaiViet } from "../Type/Types";

export default function AddArticle() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BaiViet>(
    () =>
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
      }
  );

  useEffect(() => {
    if (!formData) {
      console.warn("Không có dữ liệu bài viết được truyền!");
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: BaiViet) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:8080/baiviet/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || result.status !== 200) {
        throw new Error(result.message || "Thêm bài viết thất bại!");
      }

      alert("Tạo bài viết thành công!");
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error);
      alert("Đã xảy ra lỗi khi thêm bài viết!");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!formData) {
    return <div>Không có dữ liệu bài viết.</div>;
  }

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl p-2 text-white font-extrabold mb-4 text-center bg-orange-400 rounded-md">
          Thêm bài viết
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

        <div className="col-end">
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
        </div>
      </div>
      <div className="flex justify-center p-4 gap-4">
        <button
          type="button"
          onClick={handleAdd}
          className="w-32 p-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
