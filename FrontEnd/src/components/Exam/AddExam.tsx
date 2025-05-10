import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LichThi } from "../Type/Types";

export default function AddExam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LichThi>({
    maLichThi: "",
    tenChungChi: "",
    maLinhVuc: "",
    ngayThi: "",
    thongTinChiTiet: "",
    lePhiThi: 0,
  });

  const saveToBackend = async () => {
    try {
      const res = await fetch("http://localhost:8080/lichthi/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Lỗi khi gửi dữ liệu");
      else {
        alert("Thêm lịch thi thành công!");
        handleClear();
        console.log("Lưu thông tin lịch thi:", formData);
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
    const { tenChungChi, ngayThi, lePhiThi, maLinhVuc } = formData;

    if (!tenChungChi || !ngayThi || !lePhiThi || !maLinhVuc) {
      alert("Vui lòng nhập đầy đủ các trường bắt buộc!");
      return;
    }

    // const nameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!nameRegex.test(tenChungChi)) {
    //   alert("Tên không hợp lệ!");
    //   return;
    // }
    await saveToBackend();
  };
  const handleClear = () => {
    setFormData({
      maLichThi: "",
      tenChungChi: "",
      maLinhVuc: "",
      ngayThi: "",
      thongTinChiTiet: "",
      lePhiThi: 0,
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
            Thêm lịch thi
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
                htmlFor="examDetail"
              >
                Tên chứng chỉ
              </label>
              <input
                type="text"
                name="tenChungChi"
                value={formData.tenChungChi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="block w-1/2 text-gray-700 text-sm font-bold "
                htmlFor="examDetail"
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
                  <option value="iot">IOT</option>
                  <option value="tin-hoc">Tin học</option>
                  <option value="ai">AI</option>
                </select>
              </div>
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="examDetail"
              >
                Thông tin chi tiết
              </label>
              <input
                type="text"
                name="thongTinChiTiet"
                value={formData.thongTinChiTiet}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Cột 2 */}
          <div className="col-end">
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className=" w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="classDetail"
              >
                Ngày thi
              </label>
              <input
                type="date"
                name="ngayThi"
                value={formData.ngayThi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex p-1 w-full justify-center border items-center">
              <label
                className="w-1/2 text-gray-700 text-sm font-bold"
                htmlFor="examDetail"
              >
                Lệ phí thi
              </label>
              <input
                type="text"
                name="lePhiThi"
                value={formData.lePhiThi}
                onChange={handleChange}
                className="form-input w-full pl-1 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center p-4 gap-4">
          <button
            type="button"
            onClick={handleChangeData}
            className="w-32 p-2 border-white bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 focus:outline-none  focus:ring-2 focus:ring-orange-500"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
