import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdEdit,
  MdClose,
  MdPerson,
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdNote,
  MdCameraAlt,
  MdCalendarToday,
  MdCardMembership,
  MdErrorOutline,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { profileData } from "../../constants/profileData";
import Notification from "../../components/Notification/Notification";

interface HocVien {
  maHocVien: string;
  tenHocVien: string;
  ngaySinh: string;
  gioiTinh: number;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  tinhTrangHocTap: string;
  ghiChu: string;
  uriHinhDaiDien: string;
  ngayCapNhatGanNhat: string;
}

const modalVariants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const inputVariants = {
  initial: { opacity: 0, y: 8 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, delay: i * 0.05, ease: "easeOut" },
  }),
};

const Profile = () => {
  const [hocVien, setHocVien] = useState<HocVien | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    ngaySinh: "",
    soCMND: "",
    soDienThoai: "",
    email: "",
    diaChi: "",
    ghiChu: "",
    uriHinhDaiDien: "",
  });
  const [errors, setErrors] = useState({
    ngaySinh: "",
    soCMND: "",
    soDienThoai: "",
    email: "",
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setHocVien(profileData);
      setFormData({
        ngaySinh: profileData.ngaySinh,
        soCMND: profileData.soCMND,
        soDienThoai: profileData.soDienThoai,
        email: profileData.email,
        diaChi: profileData.diaChi,
        ghiChu: profileData.ghiChu,
        uriHinhDaiDien: profileData.uriHinhDaiDien,
      });
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
  };

  const formatDateForInput = (dateString: string): string => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  const formatGioiTinh = (gioiTinh: number): string => {
    return gioiTinh === 1 ? "Nam" : gioiTinh === 0 ? "Nữ" : "Khác";
  };

  const validateForm = () => {
    const newErrors = {
      ngaySinh: "",
      soCMND: "",
      soDienThoai: "",
      email: "",
    };
    let isValid = true;

    if (!formData.ngaySinh) {
      newErrors.ngaySinh = "Vui lòng chọn ngày sinh";
      isValid = false;
    }

    if (!formData.soCMND || formData.soCMND.length < 9) {
      newErrors.soCMND = "Số CMND phải có ít nhất 9 ký tự";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!formData.soDienThoai || !phoneRegex.test(formData.soDienThoai)) {
      newErrors.soDienThoai = "Số điện thoại không hợp lệ (10-11 số)";
      isValid = false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Xóa lỗi khi người dùng nhập
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          uriHinhDaiDien: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setHocVien((prev) => ({
      ...prev!,
      ...formData,
      ngayCapNhatGanNhat: new Date().toISOString(),
    }));
    setIsModalOpen(false);
    setShowNotification({
      type: "success",
      message: "Cập nhật hồ sơ thành công!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 pt-20">
        <div className="p-8 bg-white rounded-3xl shadow-lg max-w-4xl w-full">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-24 w-24 bg-neutral-200 rounded-full mx-auto mb-6"
          ></motion.div>
          <div className="h-8 bg-neutral-200 rounded-lg w-3/4 mb-6 mx-auto animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-14 bg-neutral-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!hocVien) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 pt-20">
        <div className="text-center p-8 bg-white rounded-3xl shadow-lg max-w-md w-full">
          <FaUserCircle className="text-6xl text-indigo-500 mx-auto mb-4" />
          <p className="text-neutral-700 text-lg font-semibold">
            Không tìm thấy hồ sơ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r bg-primary text-white p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {hocVien.uriHinhDaiDien ? (
                  <img
                    src={hocVien.uriHinhDaiDien}
                    alt="Avatar"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <FaUserCircle className="w-28 h-28 text-white/80" />
                )}
              </motion.div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl text-blue-900 font-bold mb-2">
                  {hocVien.tenHocVien}
                </h1>
                <p className="text-blue-900 text-sm mb-3">
                  Mã học viên: {hocVien.maHocVien}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <span className="bg-gray-50 text-blue-900 text-xs font-medium px-4 py-1.5 rounded-full">
                    {hocVien.tinhTrangHocTap}
                  </span>
                  <span className="text-xs text-blue-900">
                    Cập nhật: {formatDate(hocVien.ngayCapNhatGanNhat)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-neutral-800">
                  Thông tin cá nhân
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-secondary transition text-sm font-medium"
                >
                  <MdEdit />
                  Chỉnh sửa
                </motion.button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: MdPerson,
                    label: "Họ và tên",
                    value: hocVien.tenHocVien,
                    color: "text-indigo-500",
                  },
                  {
                    icon: MdCalendarToday,
                    label: "Ngày sinh",
                    value: formatDate(hocVien.ngaySinh),
                    color: "text-green-500",
                  },
                  {
                    icon: MdCardMembership,
                    label: "Số CMND",
                    value: hocVien.soCMND,
                    color: "text-purple-500",
                  },
                  {
                    icon: MdPhone,
                    label: "Số điện thoại",
                    value: hocVien.soDienThoai,
                    color: "text-orange-500",
                  },
                  {
                    icon: MdEmail,
                    label: "Email",
                    value: hocVien.email || "Chưa cập nhật",
                    color: "text-red-500",
                  },
                  {
                    icon: MdLocationOn,
                    label: "Địa chỉ",
                    value: hocVien.diaChi || "Chưa cập nhật",
                    color: "text-teal-500",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition"
                  >
                    <item.icon className={`${item.color} text-xl mt-1`} />
                    <div>
                      <p className="text-xs font-medium text-neutral-500">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-neutral-800">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="col-span-1 sm:col-span-2 flex items-start gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition"
                >
                  <MdNote className="text-yellow-500 text-xl mt-1" />
                  <div>
                    <p className="text-xs font-medium text-neutral-500">
                      Ghi chú
                    </p>
                    <p className="text-sm font-semibold text-neutral-800">
                      {hocVien.ghiChu || "Chưa có ghi chú"}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">
              <h3 className="text-xl font-semibold text-neutral-800 mb-6">
                Tóm tắt
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition">
                  <MdPerson className="text-indigo-500 text-lg" />
                  <span className="text-neutral-700">
                    Tình trạng:{" "}
                    <span className="font-semibold">
                      {hocVien.tinhTrangHocTap}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition">
                  <MdCalendarToday className="text-green-500 text-lg" />
                  <span className="text-neutral-700">
                    Giới tính:{" "}
                    <span className="font-semibold">
                      {formatGioiTinh(hocVien.gioiTinh)}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition">
                  <MdCardMembership className="text-purple-500 text-lg" />
                  <span className="text-neutral-700">
                    Cập nhật:{" "}
                    <span className="font-semibold">
                      {formatDate(hocVien.ngayCapNhatGanNhat)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4 overflow-y-auto scrollbar-hide"
          >
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-800 ">
                    Edit Profile
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    Update your personal information
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsModalOpen(false)}
                  className="text-neutral-500 hover:text-neutral-700 bg-neutral-100 rounded-full p-2 transition"
                >
                  <MdClose className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 ">
                {/* Avatar */}
                <motion.div
                  variants={inputVariants}
                  custom={0}
                  initial="initial"
                  animate="animate"
                >
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Avatar
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.uriHinhDaiDien ? (
                      <img
                        src={formData.uriHinhDaiDien}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200"
                      />
                    ) : (
                      <FaUserCircle className="w-16 h-16 text-neutral-300" />
                    )}
                    <label className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition text-sm font-medium shadow-sm">
                      <MdCameraAlt className="text-indigo-600" />
                      <span>Change image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </motion.div>

                {/* Date of Birth */}
                <motion.div
                  variants={inputVariants}
                  custom={1}
                  initial="initial"
                  animate="animate"
                >
                  <div className="relative">
                    <input
                      type="date"
                      name="ngaySinh"
                      id="ngaySinh"
                      value={formatDateForInput(formData.ngaySinh)}
                      onChange={handleChange}
                      className={`peer w-full pl-12 pr-4 py-3.5 border ${
                        errors.ngaySinh
                          ? "border-red-400"
                          : "border-neutral-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm`}
                      required
                    />
                    <label
                      htmlFor="ngaySinh"
                      className={`absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500 ${
                        errors.ngaySinh ? "text-red-500" : ""
                      }`}
                    >
                      Date of birth
                    </label>
                    <MdCalendarToday
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        errors.ngaySinh ? "text-red-500" : "text-neutral-400"
                      }`}
                    />
                    {errors.ngaySinh && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <MdErrorOutline className="text-sm" />
                        {errors.ngaySinh}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* ID Number */}
                <motion.div
                  variants={inputVariants}
                  custom={2}
                  initial="initial"
                  animate="animate"
                >
                  <div className="relative">
                    <input
                      type="text"
                      name="soCMND"
                      id="soCMND"
                      value={formData.soCMND}
                      onChange={handleChange}
                      className={`peer w-full pl-12 pr-4 py-3.5 border ${
                        errors.soCMND ? "border-red-400" : "border-neutral-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm`}
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="soCMND"
                      className={`absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500 ${
                        errors.soCMND ? "text-red-500" : ""
                      }`}
                    >
                      CCCD number
                    </label>

                    <MdCardMembership
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        errors.soCMND ? "text-red-500" : "text-neutral-400"
                      }`}
                    />
                    {errors.soCMND && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <MdErrorOutline className="text-sm" />
                        {errors.soCMND}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  variants={inputVariants}
                  custom={3}
                  initial="initial"
                  animate="animate"
                >
                  <div className="relative">
                    <input
                      type="text"
                      name="soDienThoai"
                      id="soDienThoai"
                      value={formData.soDienThoai}
                      onChange={handleChange}
                      className={`peer w-full pl-12 pr-4 py-3.5 border ${
                        errors.soDienThoai
                          ? "border-red-400"
                          : "border-neutral-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm`}
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="soDienThoai"
                      className={`absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500 ${
                        errors.soDienThoai ? "text-red-500" : ""
                      }`}
                    >
                      Phone number
                    </label>
                    <MdPhone
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        errors.soDienThoai ? "text-red-500" : "text-neutral-400"
                      }`}
                    />
                    {errors.soDienThoai && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <MdErrorOutline className="text-sm" />
                        {errors.soDienThoai}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  variants={inputVariants}
                  custom={4}
                  initial="initial"
                  animate="animate"
                >
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`peer w-full pl-12 pr-4 py-3.5 border ${
                        errors.email ? "border-red-400" : "border-neutral-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500 ${
                        errors.email ? "text-red-500" : ""
                      }`}
                    >
                      Email
                    </label>
                    <MdEmail
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        errors.email ? "text-red-500" : "text-neutral-400"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <MdErrorOutline className="text-sm" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  variants={inputVariants}
                  custom={5}
                  initial="initial"
                  animate="animate"
                >
                  <div className="relative">
                    <textarea
                      name="diaChi"
                      id="diaChi"
                      value={formData.diaChi}
                      onChange={handleChange}
                      className="peer w-full pl-12 pr-4 py-3.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm"
                      placeholder=" "
                      rows={3}
                    />
                    <label
                      htmlFor="diaChi"
                      className="absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500"
                    >
                      Địa chỉ
                    </label>
                    <MdLocationOn className="absolute left-4 top-4 text-neutral-400" />
                  </div>
                </motion.div>

                {/* Notes */}
                <motion.div
                  variants={inputVariants}
                  custom={6}
                  initial="initial"
                  animate="animate"
                >
                  <div className="relative">
                    <textarea
                      name="ghiChu"
                      id="ghiChu"
                      value={formData.ghiChu}
                      onChange={handleChange}
                      className="peer w-full pl-12 pr-4 py-3.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm"
                      placeholder=" "
                      rows={3}
                    />
                    <label
                      htmlFor="ghiChu"
                      className="absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500"
                    >
                      Ghi chú
                    </label>
                    <MdNote className="absolute left-4 top-4 text-neutral-400" />
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  variants={inputVariants}
                  custom={7}
                  initial="initial"
                  animate="animate"
                  className="flex gap-4 pt-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition text-sm font-medium shadow-md"
                  >
                    Lưu thay đổi
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-neutral-100 text-neutral-700 py-3 rounded-lg hover:bg-neutral-200 transition text-sm font-medium shadow-md"
                  >
                    Hủy bỏ
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      {showNotification && (
        <Notification
          type={showNotification.type}
          message={showNotification.message}
          onClose={() => setShowNotification(null)}
        />
      )}
    </div>
  );
};

export default Profile;
