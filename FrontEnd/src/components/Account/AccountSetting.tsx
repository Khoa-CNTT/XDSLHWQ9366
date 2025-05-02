import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  dob: string;
  address: string;
}

interface Password {
  current: string;
  new: string;
  confirm: string;
}
const AccountSettings = () => {
  const [isSecure, setIsSecure] = useState(false);
  const [isAccount, setIsAccount] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "Lê Đức Thảo",
    username: "admin1@gmail.com",
    email: "admin1@gmail.com",
    phone: "(+84) 385665243",
    role: "Giáo viên",
    dob: "15/08/1997",
    address: "108/25, Nguyễn Chánh, Liên Chiểu, thành phố Đà Nẵng",
  });

  // const [formData, setFormData] = useState<UserProfile>({
  //   fullName: "",
  //   username: "",
  //   email: "",
  //   phone: "",
  //   role: "",
  //   dob: "",
  //   address: "",
  // });

  const [password, setPassword] = useState<Password>({
    current: "",
    new: "",
    confirm: "",
  });
  //   Lấy dữ liệu từ API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://api.example.com/user-profile");
        if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu");

        const data: UserProfile = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    fetchProfile();
  }, []);

  // Xử lý thay đổi trang
  const toggleSecure = () => {
    setIsSecure(true);
    setIsAccount(false);
  };
  const toggleAccount = () => {
    setIsAccount(true);
    setIsSecure(false);
  };

  //  Xử lý khi người dùng thay đổi input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý button ở 2 page

  const handleSaveAccount = async () => {
    try {
      const response = await fetch(
        "https://f7f948e1-17ef-41cf-9658-1ecbac435456.mock.pstmn.io//AccountSetting",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      console.log("Trạng thái API:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi API: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Kết quả API:", data);
    } catch (error) {
      console.error("Lỗi cập nhật tài khoản:", error);
    }
  };

  const handleSaveSecure = () => {
    console.log("Lưu bảo mật", password);
  };
  const handleResetAccount = () => {
    setFormData({
      fullName: "",
      username: "",
      email: "",
      phone: "",
      role: "",
      dob: "",
      address: "",
    });
    console.log("Cài lại tài khoản");
  };

  const handleResetSecure = () => {
    setPassword({
      current: "",
      new: "",
      confirm: "",
    });
    console.log("Cài lại bảo mật");
  };

  // Xử lý ẩn hiện mật khẩu
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const togglePassword = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800  ">QUẢN LÝ TÀI KHOẢN</h2>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg ">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-semibold border-b-2 transition-colors duration-200 ${
              isAccount
                ? "text-orange-500 border-orange-500"
                : "text-black border-transparent"
            }`}
            onClick={() => toggleAccount()}
          >
            Tài khoản
          </button>
          <button
            className={`px-4 py-2 font-semibold border-b-2 transition-colors duration-200 ${
              isSecure
                ? "text-orange-500 border-orange-500"
                : "text-black border-transparent"
            }`}
            onClick={() => toggleSecure()}
          >
            Bảo mật
          </button>
        </div>

        {/* Thông tin tài khoản */}
        {isAccount && (
          <div>
            {/* Avatar Upload */}
            <div className="flex items-center gap-4 px-4">
              <div className="relative w-24 h-24">
                <img
                  src="https://i.pravatar.cc/100" // Placeholder avatar
                  alt="Avatar"
                  className="w-full h-full rounded-md border"
                />
                <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full">
                  <FaCamera size={14} />
                </button>
              </div>
              <button className="px-4 py-1 text-sm  rounded-lg bg-gray-200 text-gray-900 hover:bg-orange-500 hover:text-white">
                Tải ảnh lên
              </button>
              <button className=" px-4 py-1 text-sm  rounded-lg bg-gray-200 text-gray-900 hover:bg-orange-500 hover:text-white">
                Cài lại
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-3 gap-6 mt-4 px-4">
              {/* Thông tin */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 text-sm">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Tên đăng nhập</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    // onChange={handleChange}
                    disabled
                    className="w-full border p-2 rounded-lg bg-gray-100 cursor-not-allowed" //Không tương tác
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>

                <div>
                  <select
                    className="w-full border p-2 rounded-lg"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="Giáo viên">Giáo viên</option>
                    <option value="Học sinh">Học sinh</option>
                    <option value="Quản trị viên">Quản trị viên</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Ngày sinh</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg"
                    />
                    <MdDateRange className="absolute right-3 top-3 text-gray-500" />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-gray-600 text-sm">
                    Địa chỉ hiện tại
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-4 p-4">
              <button
                className="bg-gray-200 text-black px-4 py-2 rounded-lg font-medium hover:bg-orange-500 hover:text-white"
                onClick={handleSaveAccount}
              >
                Lưu thay đổi
              </button>
              <button
                className="bg-gray-200 text-black px-4 py-2 rounded-lg font-medium hover:bg-orange-500 hover:text-white"
                onClick={handleResetAccount}
              >
                Cài lại
              </button>
            </div>
          </div>
        )}

        {/* Thông tin bảo mật */}
        {isSecure && (
          <div>
            <div className=" gap-6 mt-4 px-4">
              {/* Thông tin */}
              <div className=" gap-4">
                <div className="flex-col flex my-2">
                  <label className="text-gray-600 text-sm">
                    Mật khẩu hiện tại
                  </label>
                  <div className="relative w-1/2">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      name="current"
                      value={password.current}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                      onClick={() => togglePassword("current")}
                    >
                      {showPassword.current ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex-col flex my-2">
                  <label className="text-gray-600 text-sm">Mật khẩu mới</label>
                  <div className="relative w-1/2">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      name="new"
                      value={password.new}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                      onClick={() => togglePassword("new")}
                    >
                      {showPassword.new ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex-col flex my-2">
                  <label className="text-gray-600 text-sm">
                    Nhập lại mật khẩu
                  </label>
                  <div className="relative w-1/2">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      name="confirm"
                      value={password.confirm}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                      onClick={() => togglePassword("confirm")}
                    >
                      {showPassword.confirm ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-4 p-4">
              <button
                className="bg-gray-200 text-black px-4 py-2 rounded-lg font-medium hover:bg-orange-500 hover:text-white"
                onClick={handleSaveSecure}
              >
                Lưu thay đổi
              </button>
              <button
                className="bg-gray-200 text-black px-4 py-2 rounded-lg font-medium hover:bg-orange-500 hover:text-white"
                onClick={handleResetSecure}
              >
                Cài lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AccountSettings;
