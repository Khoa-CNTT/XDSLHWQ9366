import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaEnvelope, FaLocationArrow } from "react-icons/fa6";
import { useNotification } from "../../context/NotificationContext";
import { useContactValidation } from "../../components/Validate/ValidateContact";
import axios from "axios";

const Contact = () => {
  // State lưu trữ dữ liệu form liên hệ
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  // Custom hook kiểm tra hợp lệ form
  const { validateForm, clearErrors } = useContactValidation(formData);

  // Hook thông báo (toast)
  const { notify } = useNotification();

  // State kiểm soát trạng thái gửi form (loading)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hàm xử lý thay đổi input/textarea trong form
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Cập nhật giá trị mới vào state
    clearErrors(); // Xóa lỗi cũ nếu có
  };

  // Hàm xử lý khi submit form liên hệ
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Ngăn reload trang mặc định
    if (!validateForm()) {
      notify("error", "Vui lòng kiểm tra lại thông tin!"); // Báo lỗi nếu form không hợp lệ
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true); // Bật trạng thái loading

    // Chuẩn bị dữ liệu gửi lên backend
    const payload = {
      maKhach: "",
      hoTen: `${formData.firstname} ${formData.lastname}`.trim(),
      email: formData.email,
      soDienThoai: formData.phone,
      yKien: formData.message,
      ngayLienHe: new Date().toISOString().split("T")[0], // yyyy-MM-dd
    };

    try {
      // Gửi POST request đến backend
      const res = await axios.post("http://localhost:8080/lienhe/add", payload);
      if (res.data.status === 200) {
        // Nếu thành công, giả lập hiệu ứng gửi trong 1.5s rồi thông báo thành công và reset form
        setTimeout(() => {
          console.log("Sending", formData);
          notify("success", "Gửi liên hệ thành công!");
          setIsSubmitting(false);
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            message: "",
          });
        }, 1500);
      } else {
        // Nếu backend trả về lỗi
        notify("error", res.data.message || "Gửi liên hệ thất bại!");
        setIsSubmitting(false);
      }
    } catch (error) {
      // Nếu có lỗi khi gọi API
      notify("error", "Có lỗi khi gửi liên hệ!");
      console.error(error);
      setIsSubmitting(false);
    }
  };

  // Các biến animation cho framer-motion
  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const inputVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="min-h-screen  bg-white  text-gray-100 pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Heading */}
        <motion.div
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <h1 className=" text-4xl font-extrabold bg-clip-text text-transparent bg-primary hover:text-secondary">
            Contact our team
          </h1>
          <p className=" text-black mt-4 max-w-2xl mx-auto leading-relaxed">
            Questions about our platform? We're here 24/7 to help you scale and
            succeed. Reach out in less than 5 minutes!
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-gray-50 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-black/50"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
          >
            {/* Các input của form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Họ */}
              <motion.div
                variants={inputVariants}
                custom={0}
                initial="initial"
                animate="animate"
              >
                <div className="relative">
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full pl-5 pr-4 py-4 bg-gray-50 border border-secondary rounded-lg hover:border-secondary  transition-all duration-300 text-black placeholder-gray-500 shadow-md"
                    placeholder="First Name"
                    required
                  />
                </div>
              </motion.div>
              {/* Tên */}
              <motion.div
                variants={inputVariants}
                custom={1}
                initial="initial"
                animate="animate"
              >
                <div className="relative">
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full pl-5 pr-4 py-4 bg-gray-50 border border-secondary rounded-lg hover:border-secondary  transition-all duration-300 text-black placeholder-gray-500 shadow-md"
                    placeholder="Last Name"
                  />
                </div>
              </motion.div>
            </div>
            {/* Email */}
            <motion.div
              variants={inputVariants}
              custom={2}
              initial="initial"
              animate="animate"
              className="mt-6"
            >
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-5 pr-4 py-4 bg-gray-50 border border-secondary rounded-lg hover:border-secondary  transition-all duration-300 text-black placeholder-gray-500 shadow-md"
                  placeholder="Your Email"
                  required
                />
              </div>
            </motion.div>
            {/* Số điện thoại */}
            <motion.div
              variants={inputVariants}
              custom={3}
              initial="initial"
              animate="animate"
              className="mt-6"
            >
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-5 pr-4 py-4 bg-gray-50 border border-secondary rounded-lg hover:border-secondary  transition-all duration-300 text-black placeholder-gray-500 shadow-md"
                  placeholder="Phone Number"
                />
              </div>
            </motion.div>
            {/* Nội dung liên hệ */}
            <motion.div
              variants={inputVariants}
              custom={4}
              initial="initial"
              animate="animate"
              className="mt-6"
            >
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-5 pr-4 py-4 bg-gray-50 border border-secondary rounded-lg hover:border-secondary  transition-all duration-300 text-black placeholder-gray-500 shadow-md"
                  placeholder="Your Message"
                  rows={5}
                />
              </div>
            </motion.div>
            {/* Nút gửi form với hiệu ứng loading */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-6 bg-gradient-to-r bg-primary text-white py-4 rounded-lg font-semibold text-lg shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10">
                {isSubmitting ? "Sending..." : "Send Message"}
              </span>
              {isSubmitting && (
                <motion.div
                  className="absolute inset-0 bg-secondary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              )}
            </motion.button>
          </motion.form>

          {/* Info Section - Thông tin liên hệ, mạng xã hội, địa chỉ */}
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="lg:col-span-2 space-y-4 mt-2 lg:mt-0"
          >
            {/* Chat với chúng tôi */}
            <div className="bg-gray-50 backdrop-blur-lg rounded-2xl p-3 shadow-lg border border-black">
              <h3 className="text-xl font-bold text-primary hover:text-secondary">
                Chat with Us
              </h3>
              <div className="mt-4 space-y-4 text-black">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3"
                >
                  <FaFacebook className="text-xl text-black" />
                  <a
                    href="https://www.facebook.com/idioms632"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Message us on Facebook
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3"
                >
                  <FaEnvelope className="text-xl text-black" />
                  <a
                    href="mailto:support@example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Shoot us an email
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Gọi cho chúng tôi */}
            <div className="bg-gray-50 backdrop-blur-lg rounded-2xl p-3 shadow-lg border border-black">
              <h3 className="text-xl font-bold text-primary hover:text-secondary">
                Call Us
              </h3>
              <p className="mt-2 text-black">Mon-Fri, 8am - 5pm</p>
              <motion.div
                whileHover={{ x: 5 }}
                className="text-black flex items-center gap-3 mt-2"
              >
                <FaPhoneAlt className="text-xl" />
                <span className="hover:text-primary">+84 0327 908 007</span>
              </motion.div>
            </div>

            {/* Địa chỉ văn phòng */}
            <div className="bg-gray-50 backdrop-blur-lg rounded-2xl p-3 shadow-lg border border-black">
              <h3 className="text-xl font-bold text-primary hover:text-secondary">
                Visit Us
              </h3>
              <p className="mt-2 text-black">Swing by our Da Nang office</p>
              <motion.a
                whileHover={{ x: 5 }}
                href="https://maps.app.goo.gl/UCH3wA49oSKeEHoq7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black flex items-center gap-3 mt-2 hover:text-primary transition-colors duration-200"
              >
                <FaLocationArrow className="text-xl" />
                03 Quang Trung, Hải Châu, Đà Nẵng
              </motion.a>
            </div>

            {/* Mạng xã hội */}
            <div className="bg-gray-50 backdrop-blur-lg rounded-2xl p-3 shadow-lg border border-black">
              <h3 className="text-xl font-bold text-primary hover:text-secondary">
                Social Networks
              </h3>
              <div className="flex space-x-6 py-4">
                {[
                  {
                    icon: FaInstagram,
                    href: "https://www.instagram.com/huxtah/",
                  },
                  { icon: FaYoutube, href: "" },
                  { icon: FaTiktok, href: "https://www.tiktok.com/@huxtah_" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-black hover:text-primary transition-colors duration-300"
                  >
                    <social.icon className="text-2xl" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
