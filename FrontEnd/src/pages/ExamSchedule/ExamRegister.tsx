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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register for:", examName);
    console.log("Form data:", formData);
    alert("Registration successful!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br bg-gray-100/40 backdrop-blur-sm z-50 p-4"
        >
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full mx-auto p-8 relative overflow-hidden border border-white/20"
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
              <div className="relative group">
                <div className="absolute -inset-0.5 border border-black rounded-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-lg p-0.5">
                  <div className="flex items-center">
                    <div className="pl-3 text-gray-400">
                      <FaUser className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Full Name"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      className="w-full py-3 pl-2 pr-4 rounded-lg focus:outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Gender & DOB Row */}
              <div className="flex space-x-4">
                {/* Gender */}
                <div className="relative group w-1/2">
                  <div className="absolute -inset-0.5 border border-black rounded-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-white rounded-lg p-0.5">
                    <div className="flex items-center">
                      <div className="pl-3 text-gray-400">
                        <FaTransgenderAlt className="w-5 h-5" />
                      </div>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full py-3 pl-2 pr-4 rounded-lg focus:outline-none text-gray-700 appearance-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="relative group w-1/2">
                  <div className="absolute -inset-0.5 border border-black rounded-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-white rounded-lg p-0.5">
                    <div className="flex items-center">
                      <div className="pl-3 text-gray-400">
                        <FaRegCalendarAlt className="w-5 h-5" />
                      </div>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className="w-full py-3 pl-2 pr-4 rounded-lg focus:outline-none text-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ID Number */}
              <div className="relative group">
                <div className="absolute -inset-0.5 border border-black rounded-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-lg p-0.5">
                  <div className="flex items-center">
                    <div className="pl-3 text-gray-400">
                      <FaIdCard className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      name="cccd"
                      placeholder="Identification Number"
                      value={formData.cccd}
                      onChange={handleChange}
                      required
                      className="w-full py-3 pl-2 pr-4 rounded-lg focus:outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="relative group">
                <div className="absolute -inset-0.5 border border-black rounded-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-lg p-0.5">
                  <div className="flex items-center">
                    <div className="pl-3 text-gray-400">
                      <FaPhone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full py-3 pl-2 pr-4 rounded-lg focus:outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute -inset-0.5 border border-black rounded-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-lg p-0.5">
                  <div className="flex items-center">
                    <div className="pl-3 text-gray-400">
                      <FaEnvelope className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email (Optional)"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full py-3 pl-2 pr-4 rounded-lg focus:outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="relative group">
                <div className="absolute -inset-0.5 border border-black rounded-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-lg p-0.5">
                  <div className="flex items-start">
                    <div className="pl-3 pt-3 text-gray-400">
                      <FaMapMarkerAlt className="w-5 h-5" />
                    </div>
                    <textarea
                      name="address"
                      placeholder="Address (Optional)"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full py-3 pl-2 pr-4 rounded-lg focus:outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="w-1/2 bg-gradient-to-r bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors shadow-lg transform hover:-translate-y-1 active:translate-y-0"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-1/2 bg-secondary text-white py-3 rounded-lg hover:bg-primary transition-colors shadow-lg transform hover:-translate-y-1 active:translate-y-0"
                >
                  Clear
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
