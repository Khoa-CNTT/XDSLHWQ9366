// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import {
//   MdEdit,
//   MdClose,
//   MdPerson,
//   MdPhone,
//   MdEmail,
//   MdLocationOn,
//   MdNote,
//   MdCameraAlt,
//   MdCalendarToday,
//   MdCardMembership,
// } from "react-icons/md";
// import { FaUserCircle } from "react-icons/fa";

// interface HocVien {
//   maHocVien: string;
//   tenHocVien: string;
//   ngaySinh: string;
//   gioiTinh: number;
//   soCMND: string;
//   soDienThoai: string;
//   email: string;
//   diaChi: string;
//   tinhTrangHocTap: string;
//   ghiChu: string;
//   uriHinhDaiDien: string;
//   ngayCapNhatGanNhat: string;
// }

// interface ApiResponse {
//   status: number;
//   message: string;
//   data: HocVien;
// }

// const modalVariants = {
//   initial: { opacity: 0, scale: 0.85, y: 50 },
//   animate: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     scale: 0.85,
//     y: 50,
//     transition: { duration: 0.3, ease: "easeIn" },
//   },
// };

// const inputVariants = {
//   initial: { opacity: 0, y: 20 },
//   animate: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" },
//   }),
// };

// const Profile = () => {
//   const [hocVien, setHocVien] = useState<HocVien | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     soDienThoai: "",
//     email: "",
//     diaChi: "",
//     ghiChu: "",
//     uriHinhDaiDien: "",
//   });

//   // Giả định maHocVien lấy từ context hoặc auth
//   const maHocVien = "HV001"; // Thay bằng logic lấy từ auth

//   // Lấy thông tin học viên
//   const fetchHocVien = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get<ApiResponse>(
//         `http://localhost:8080/hocvien/getById/${maHocVien}`
//       );
//       setHocVien(response.data.data);
//       setFormData({
//         soDienThoai: response.data.data.soDienThoai,
//         email: response.data.data.email,
//         diaChi: response.data.data.diaChi,
//         ghiChu: response.data.data.ghiChu,
//         uriHinhDaiDien: response.data.data.uriHinhDaiDien,
//       });
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.message || "Unable to fetch profile.");
//       } else {
//         setError("An unexpected error occurred.");
//       }
//       setHocVien(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHocVien();
//   }, []);

//   // Format ngày
//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return isNaN(date.getTime())
//       ? "Invalid Date"
//       : date.toLocaleDateString("vi-VN", {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//         });
//   };

//   // Format giới tính
//   const formatGioiTinh = (gioiTinh: number): string => {
//     return gioiTinh === 1 ? "Nam" : gioiTinh === 0 ? "Nữ" : "Khác";
//   };

//   // Xử lý chỉnh sửa
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prev) => ({
//           ...prev,
//           uriHinhDaiDien: reader.result as string,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:8080/hocvien/update/${maHocVien}`,
//         formData
//       );
//       alert("Profile updated successfully!");
//       fetchHocVien();
//       setIsModalOpen(false);
//     } catch (err) {
//       alert("Failed to update profile.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
//         <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-4xl w-full">
//           <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-8"></div>
//           <div className="h-10 bg-gray-200 rounded-lg w-3/4 mb-8 mx-auto"></div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="h-16 bg-gray-200 rounded-lg"></div>
//             <div className="h-16 bg-gray-200 rounded-lg"></div>
//             <div className="h-16 bg-gray-200 rounded-lg"></div>
//             <div className="h-16 bg-gray-200 rounded-lg"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !hocVien) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
//         <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-lg w-full">
//           <FaUserCircle className="text-5xl text-yellow-500 mx-auto mb-4" />
//           <p className="text-gray-700 text-xl font-medium">
//             {error || "Profile not found"}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 pt-20">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-3xl shadow-lg p-8 mb-8">
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6 }}
//               className="relative"
//             >
//               {hocVien.uriHinhDaiDien ? (
//                 <img
//                   src={hocVien.uriHinhDaiDien}
//                   alt="Avatar"
//                   className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
//                 />
//               ) : (
//                 <FaUserCircle className="w-32 h-32 text-blue-200" />
//               )}
//             </motion.div>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                 {hocVien.tenHocVien}
//               </h1>
//               <p className="text-blue-100 mb-4">
//                 Mã học viên: {hocVien.maHocVien}
//               </p>
//               <div className="flex items-center gap-4">
//                 <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
//                   {hocVien.tinhTrangHocTap}
//                 </span>
//                 <span className="text-sm">
//                   Cập nhật gần nhất: {formatDate(hocVien.ngayCapNhatGanNhat)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Profile Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-3xl shadow-lg p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   Thông tin cá nhân
//                 </h2>
//                 <button
//                   onClick={() => setIsModalOpen(true)}
//                   className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                   <MdEdit />
//                   Chỉnh sửa
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="flex items-start gap-3">
//                   <MdPerson className="text-blue-600 text-2xl mt-1" />
//                   <div>
//                     <p className="text-sm text-gray-500">Họ và tên</p>
//                     <p className="font-semibold">{hocVien.tenHocVien}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <MdCalendarToday className="text-blue-600 text-2xl mt-1" />
//                   <div>
//                     <p className="text-sm text-gray-500">Ngày sinh</p>
//                     <p className="font-semibold">
//                       {formatDate(hocVien.ngaySinh)}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <MdCardMembership className="text-blue-600 text-2xl mt-1" />
//                   <div>
//                     <p className="text-sm text-gray-500">Số CMND</p>
//                     <p className="font-semibold">{hocVien.soCMND}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <MdPhone className="text-blue-600 text-2xl mt-1" />
//                   <div>
//                     <p className="text-sm text-gray-500">Số điện thoại</p>
//                     <p className="font-semibold">{hocVien.soDienThoai}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <MdEmail className="text-blue-600 text-2xl mt-1" />
//                   <div>
//                     <p className="text-sm text-gray-500">Email</p>
//                     <p className="font-semibold">
//                       {hocVien.email || "Chưa cập nhật"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <MdLocationOn className="text-blue-600 text-2xl mt-1" />
//                   <div>
//                     <p className="text-sm text-gray-500">Địa chỉ</p>
//                     <p className="font-semibold">
//                       {hocVien.diaChi || "Chưa cập nhật"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="col-span-1 sm:col-span-2 flex items-start gap-3">
//                   <MdNote className="text-blue-600 text-2xl mt-1" />
//                   <div>
//                     <p className="text-sm text-gray-500">Ghi chú</p>
//                     <p className="font-semibold">
//                       {hocVien.ghiChu || "Chưa có ghi chú"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Tóm tắt</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <MdPerson className="text-blue-600 text-xl" />
//                   <span>Tình trạng: {hocVien.tinhTrangHocTap}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <MdCalendarToday className="text-blue-600 text-xl" />
//                   <span>Giới tính: {formatGioiTinh(hocVien.gioiTinh)}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <MdCardMembership className="text-blue-600 text-xl" />
//                   <span>
//                     Cập nhật: {formatDate(hocVien.ngayCapNhatGanNhat)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal Chỉnh sửa */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
//           >
//             <motion.div
//               variants={modalVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 sm:mx-6 p-8 relative max-h-[90vh] overflow-y-auto"
//             >
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition bg-gray-100 rounded-full p-2"
//               >
//                 <MdClose className="text-2xl" />
//               </button>

//               <div className="text-center mb-6">
//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
//                   Chỉnh sửa hồ sơ
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Cập nhật thông tin cá nhân của bạn
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Hình đại diện */}
//                 <motion.div
//                   variants={inputVariants}
//                   custom={0}
//                   initial="initial"
//                   animate="animate"
//                 >
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Hình đại diện
//                     </label>
//                     <div className="flex items-center gap-4">
//                       {formData.uriHinhDaiDien ? (
//                         <img
//                           src={formData.uriHinhDaiDien}
//                           alt="Avatar"
//                           className="w-16 h-16 rounded-full object-cover"
//                         />
//                       ) : (
//                         <FaUserCircle className="w-16 h-16 text-gray-400" />
//                       )}
//                       <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
//                         <MdCameraAlt className="text-blue-600" />
//                         <span className="text-sm text-gray-700">Chọn ảnh</span>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleImageChange}
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Số điện thoại */}
//                 <motion.div
//                   variants={inputVariants}
//                   custom={1}
//                   initial="initial"
//                   animate="animate"
//                 >
//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="soDienThoai"
//                       id="soDienThoai"
//                       value={formData.soDienThoai}
//                       onChange={handleChange}
//                       className="peer w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-transparent placeholder-transparent"
//                       placeholder="Số điện thoại"
//                       required
//                     />
//                     <label
//                       htmlFor="soDienThoai"
//                       className="absolute left-12 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600"
//                     >
//                       Số điện thoại *
//                     </label>
//                     <MdPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
//                   </div>
//                 </motion.div>

//                 {/* Email */}
//                 <motion.div
//                   variants={inputVariants}
//                   custom={2}
//                   initial="initial"
//                   animate="animate"
//                 >
//                   <div className="relative">
//                     <input
//                       type="email"
//                       name="email"
//                       id="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="peer w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-transparent placeholder-transparent"
//                       placeholder="Email"
//                     />
//                     <label
//                       htmlFor="email"
//                       className="absolute left-12 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600"
//                     >
//                       Email (tùy chọn)
//                     </label>
//                     <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
//                   </div>
//                 </motion.div>

//                 {/* Địa chỉ */}
//                 <motion.div
//                   variants={inputVariants}
//                   custom={3}
//                   initial="initial"
//                   animate="animate"
//                 >
//                   <div className="relative">
//                     <textarea
//                       name="diaChi"
//                       id="diaChi"
//                       value={formData.diaChi}
//                       onChange={handleChange}
//                       className="peer w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-transparent placeholder-transparent"
//                       placeholder="Địa chỉ"
//                       rows={3}
//                     />
//                     <label
//                       htmlFor="diaChi"
//                       className="absolute left-12 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600"
//                     >
//                       Địa chỉ (tùy chọn)
//                     </label>
//                     <MdLocationOn className="absolute left-4 top-4 text-gray-400 text-xl" />
//                   </div>
//                 </motion.div>

//                 {/* Ghi chú */}
//                 <motion.div
//                   variants={inputVariants}
//                   custom={4}
//                   initial="initial"
//                   animate="animate"
//                 >
//                   <div className="relative">
//                     <textarea
//                       name="ghiChu"
//                       id="ghiChu"
//                       value={formData.ghiChu}
//                       onChange={handleChange}
//                       className="peer w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-transparent placeholder-transparent"
//                       placeholder="Ghi chú"
//                       rows={3}
//                     />
//                     <label
//                       htmlFor="ghiChu"
//                       className="absolute left-12 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-600"
//                     >
//                       Ghi chú (tùy chọn)
//                     </label>
//                     <MdNote className="absolute left-4 top-4 text-gray-400 text-xl" />
//                   </div>
//                 </motion.div>

//                 {/* Buttons */}
//                 <motion.div
//                   variants={inputVariants}
//                   custom={5}
//                   initial="initial"
//                   animate="animate"
//                 >
//                   <div className="flex gap-4">
//                     <button
//                       type="submit"
//                       className="w-1/2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition shadow-lg transform hover:-translate-y-1"
//                     >
//                       Lưu
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsModalOpen(false)}
//                       className="w-1/2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white py-3 rounded-lg font-semibold hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 transition shadow-lg transform hover:-translate-y-1"
//                     >
//                       Hủy
//                     </button>
//                   </div>
//                 </motion.div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Profile;
