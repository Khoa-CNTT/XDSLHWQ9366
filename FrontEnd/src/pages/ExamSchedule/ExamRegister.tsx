import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaRegCalendarAlt,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTransgenderAlt,
} from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useExamRegisterValidation } from "../../components/Validate/ValidateExamRegister";
import { useNotification } from "../../context/NotificationContext";
import axios from "axios";
interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  examName: string;
}

const modalVariants = {
  initial: { opacity: 0, scale: 0.9, y: 40 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 40,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};
const inputVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  }),
};

const RegisterModal = ({ isOpen, onClose, examName }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    fullname: "",
    gender: "Male",
    dob: "",
    cccd: "",
    phone: "",
    email: "",
    address: "",
  });

  const { notify } = useNotification();

  const { errors, validateForm, clearErrors } =
    useExamRegisterValidation(formData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearErrors();
  };

  const handleClear = () => {
    setFormData({
      fullname: "",
      gender: "Male",
      dob: "",
      cccd: "",
      phone: "",
      email: "",
      address: "",
    });
    clearErrors();
  };
  // Thêm các trường cần thiết cho backend
  const extraFields = {
    dienDangKy: "ONLINE",
    maLichThi: "LT001",
    maPhongThi: "PT001",
    diem: 0,
    xepLoai: "",
    ngayCapChungChi: "",
    ghiChu: "",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      notify("error", "Please check your information and try again.");
      return;
    }

    const payload = {
      tenThiSinhDuThi: formData.fullname,
      ngaySinh: formData.dob || null,
      gioiTinh:
        formData.gender === "Male"
          ? true
          : formData.gender === "Female"
          ? false
          : null,
      soCMND: formData.cccd,
      soDienThoai: formData.phone,
      email: formData.email,
      diaChi: formData.address,
      dienDangKy: extraFields.dienDangKy,
      maLichThi: extraFields.maLichThi,
      maPhongThi: extraFields.maPhongThi,
      diem: extraFields.diem,
      xepLoai: extraFields.xepLoai,
      ngayCapChungChi: extraFields.ngayCapChungChi || null,
      ghiChu: extraFields.ghiChu,
    };

    console.log("Payload gửi lên:", payload);

    try {
      const res = await axios.post(
        "http://localhost:8080/thisinh/add",
        payload
      );
      if (res.data.status === 201) {
        notify("success", "Đăng ký dự thi thành công!");
        onClose();
      } else {
        notify("error", res.data.message || "Đăng ký thất bại!");
      }
    } catch (error: unknown) {
      // Kiểm tra error có phải là AxiosError không
      if (axios.isAxiosError(error)) {
        notify(
          "error",
          error.response?.data?.message || "Có lỗi khi đăng ký dự thi!"
        );
        console.error(error.response?.data);
      } else {
        notify("error", "Có lỗi khi đăng ký dự thi!");
        console.error(error);
      }
    }
  };

  // if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br bg-black/70 backdrop-blur-sm z-50 p-4"
        >
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full mx-auto p-8 relative overflow-hidden border border-white/20"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition-colors group"
            >
              <FaTimes className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            </button>

            {/* Header */}
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r bg-primary hover:text-secondary">
                Exam Registration
              </h2>
              <p className="text-sm text-gray-500">
                Complete your registration for {examName}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <motion.div
                variants={inputVariants}
                custom={0}
                initial="initial"
                animate="animate"
              >
                <div className="relative">
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={`peer w-full pl-12 pr-4 py-3.5 border ${
                      errors.fullname ? "border-red-400" : "border-neutral-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm`}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="fullname"
                    className={`absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500 ${
                      errors.fullname ? "text-red-500" : ""
                    }`}
                  >
                    Full Name
                  </label>
                  <FaUser
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      errors.fullname ? "text-red-500" : "text-neutral-400"
                    }`}
                  />
                  {errors.fullname && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <MdErrorOutline className="text-sm" />
                      {errors.fullname}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Gender & DOB Row */}
              <div className="flex space-x-4">
                {/* Gender */}
                <motion.div
                  variants={inputVariants}
                  custom={1}
                  initial="initial"
                  animate="animate"
                  className="w-1/2"
                >
                  <div className="relative">
                    <select
                      name="gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="peer w-full pl-12 pr-4 py-3.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm appearance-none"
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <label
                      htmlFor="gender"
                      className="absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500"
                    >
                      Gender
                    </label>
                    <FaTransgenderAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  </div>
                </motion.div>

                {/* Date of Birth */}
                <motion.div
                  variants={inputVariants}
                  custom={2}
                  initial="initial"
                  animate="animate"
                  className="w-1/2"
                >
                  <div className="relative">
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`peer w-full pl-12 pr-4 py-3.5 border ${
                        errors.dob ? "border-red-400" : "border-neutral-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm`}
                      required
                    />
                    <label
                      htmlFor="dob"
                      className={`absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500 ${
                        errors.dob ? "text-red-500" : ""
                      }`}
                    >
                      Date of birth
                    </label>
                    <FaRegCalendarAlt
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        errors.dob ? "text-red-500" : "text-neutral-400"
                      }`}
                    />
                    {errors.dob && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <MdErrorOutline className="text-sm" />
                        {errors.dob}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* ID Number */}
              <motion.div
                variants={inputVariants}
                custom={3}
                initial="initial"
                animate="animate"
              >
                <div className="relative">
                  <input
                    type="text"
                    name="cccd"
                    id="cccd"
                    value={formData.cccd}
                    onChange={handleChange}
                    className={`peer w-full pl-12 pr-4 py-3.5 border ${
                      errors.cccd ? "border-red-400" : "border-neutral-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm`}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="cccd"
                    className={`absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500 ${
                      errors.cccd ? "text-red-500" : ""
                    }`}
                  >
                    CCCD number
                  </label>
                  <FaIdCard
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      errors.cccd ? "text-red-500" : "text-neutral-400"
                    }`}
                  />
                  {errors.cccd && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <MdErrorOutline className="text-sm" />
                      {errors.cccd}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Phone Number */}
              <motion.div
                variants={inputVariants}
                custom={4}
                initial="initial"
                animate="animate"
              >
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`peer w-full pl-12 pr-4 py-3.5 border ${
                      errors.phone ? "border-red-400" : "border-neutral-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm`}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="phone"
                    className={`absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500 ${
                      errors.phone ? "text-red-500" : ""
                    }`}
                  >
                    Phone number
                  </label>
                  <FaPhone
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      errors.phone ? "text-red-500" : "text-neutral-400"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <MdErrorOutline className="text-sm" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                variants={inputVariants}
                custom={5}
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
                  <FaEnvelope
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
                custom={6}
                initial="initial"
                animate="animate"
              >
                <div className="relative">
                  <textarea
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="peer w-full pl-12 pr-4 py-3.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-transparent text-neutral-800 placeholder-neutral-400 shadow-sm"
                    placeholder=" "
                    rows={3}
                  />
                  <label
                    htmlFor="address"
                    className="absolute left-12 top-0 -translate-y-1/2 px-1 bg-white text-neutral-500 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-indigo-500"
                  >
                    Address
                  </label>
                  <FaMapMarkerAlt className="absolute left-4 top-4 text-neutral-400" />
                </div>
              </motion.div>

              {/* Action Buttons */}
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
                  className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-secondary transition text-sm font-medium shadow-md"
                >
                  Register
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleClear}
                  className="flex-1 bg-secondary text-white py-3 rounded-lg hover:bg-primary transition text-sm font-medium shadow-md"
                >
                  Clear
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
