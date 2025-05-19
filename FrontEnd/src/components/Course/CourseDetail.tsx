import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { KhoaHoc } from "../Type/Types";
import { useLinhVucData } from "../../hooks/useLinhVucData";

export default function CourseDetail() {
  const location = useLocation();
  const { linhVucs } = useLinhVucData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<KhoaHoc>(
    location.state?.course || {
      maKhoaHoc: "",
      tenKhoaHoc: "",
      noiDung: "",
      hocPhi: "",
      maLinhVuc: "",
      soBuoi: 0,
    }
  );

  useEffect(() => {
    if (!location.state?.course) {
      console.warn("Không có dữ liệu Khoá học được truyền!");
      navigate("/khoahoc");
    }
  }, [location.state, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "soBuoi" ? Number(value) : value,
    }));
  };

  if (!formData) {
    return <div>Không có dữ liệu Khoá học.</div>;
  }

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/khoahoc/update/${formData.maKhoaHoc}`,
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

      alert("Cập nhật thông tin khoá học thành công!");
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin khoá học!");
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
            Quản lý Khoá học
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
                htmlFor="courseDetail"
              >
                Mã Khoá học
              </label>
              <input
                type="text"
                name="maKhoaHoc"
                value={formData.maKhoaHoc}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="courseDetail"
              >
                Lĩnh vực
              </label>
              <div className="w-full">
                <select
                  name="maLinhVuc"
                  value={formData.maLinhVuc}
                  onChange={handleChange}
                  className="form-input w-2/3 pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Lĩnh vực --</option>
                  {linhVucs.map((item) => (
                    <option key={item.maLinhVuc} value={item.maLinhVuc}>
                      {item.tenLinhVuc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="courseDetail"
              >
                Số buổi
              </label>
              <input
                type="number"
                name="soBuoi"
                value={formData.soBuoi}
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
                htmlFor="courseDetail"
              >
                Tên Khoá học
              </label>
              <input
                type="text"
                name="tenKhoaHoc"
                value={formData.tenKhoaHoc}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="courseDetail"
              >
                Học phí
              </label>
              <input
                type="number"
                name="hocPhi"
                value={formData.hocPhi}
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
            Nội dung
          </label>
          <textarea
            name="noiDung"
            value={formData.noiDung}
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
