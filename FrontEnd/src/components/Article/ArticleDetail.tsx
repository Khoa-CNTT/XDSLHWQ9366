import { useState } from "react";

export default function ArticleDetail() {
  const [formData, setFormData] = useState({
    id: "NV01",
    title: "google",
    tomTat: "",
    ngayDang: "2025-01-01",
    lanTruyCapCuoi: "2025-01-01",
    nguoiViet: "Lê Văn A",
    soLuong: 0,
    nemu: "tinTuc",
    trangThai: "true",
    hinhAnh: "https://example.com/image.jpg",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    console.log("Thêm giảng viên:", formData);
    alert("Thêm giảng viên thành công!");
  };

  const handleSave = () => {
    console.log("Lưu thông tin giảng viên:", formData);
    alert("Lưu thông tin thành công!");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa giảng viên này?"
    );
    if (confirmDelete) {
      setFormData({
        id: " ",
        title: " ",
        tomTat: "",
        ngayDang: " ",
        lanTruyCapCuoi: " ",
        nguoiViet: " ",
        soLuong: 0,
        nemu: " ",
        trangThai: " ",
        hinhAnh: " ",
      });
      alert("Đã xóa bài đăng.");
    }
  };

  return (
    <div>
      <div className="w-full mx-auto  p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl p-2 text-white font-extrabold mb-4 text-center bg-orange-400 rounded-md">
          Quản lý Bài đăng
        </h2>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-start">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="articleDetail"
              >
                Mã
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="articleDetail"
              >
                Người viết bài
              </label>

              <input
                type="text"
                name="nguoiViet"
                value={formData.nguoiViet}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="articleDetail"
              >
                Ngày đăng
              </label>
              <input
                type="date"
                name="ngayDang"
                value={formData.ngayDang}
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
                htmlFor="articleDetail"
              >
                Tiêu đề
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="articleDetail"
              >
                Số lượng truy cập
              </label>
              <input
                type="text"
                name="soLuong"
                value={formData.soLuong}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Lần truy cập cuối
              </label>
              <input
                type="date"
                name="lanTruyCapCuoi"
                value={formData.lanTruyCapCuoi}
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
            name="description"
            rows={4}
            placeholder="Nhập nội dung..."
            className="form-textera multiline block w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center p-4 gap-4">
          <button
            type="button"
            onClick={handleAdd}
            className="w-32 py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Thêm
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-32 p-2 border-white bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 focus:outline-none  focus:ring-2 focus:ring-orange-500"
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
