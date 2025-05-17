import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiEye } from "react-icons/fi";
import { getAllBaiViet } from "../../api/newApi";
import { motion, AnimatePresence } from "framer-motion";
interface ChucVu {
  maChucVu: string;
  tenChucVu: string;
  trangThai: boolean;
}

interface NhanVien {
  tenNhanVien: string;
  ngaySinh: string;
  gioiTinh: boolean;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  chucVu: ChucVu;
  nguoiNhapThongTin: string;
  ghiChu: string;
  uriHinhDaiDien: string;
}

interface BaiViet {
  maBaiViet: string;
  tieuDe: string;
  uriHinhAnhMinhHoa: string;
  noiDungTomTat: string;
  noiDung: string;
  ngayDang: string;
  nhanVien: NhanVien;
  lanCapNhatCuoiCung: string | null;
  soLuongTruyCap: number;
  menu: string;
  trangThai: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const News = () => {
  const [filtered, setFiltered] = useState<BaiViet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBaiViet();
        setFiltered(data);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen  bg-white  text-gray-100 pt-24"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-primary hover:text-secondary">
            News & Events
          </h1>
          <p className="text-black mt-4 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest information from us – events,
            announcements, and in-depth articles.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {filtered.length > 0 ? (
              filtered.map((article) => (
                <motion.div
                  variants={cardVariants}
                  key={article.maBaiViet}
                  layout
                  whileHover={{
                    scale: 1.025,
                    boxShadow: "0 8px 32px rgba(80,80,200,0.10)",
                  }}
                >
                  <Link to={`/news/${article.maBaiViet}`}>
                    <div className="group border border-slate-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white flex flex-col overflow-hidden h-[500px] relative">
                      {/* Tag/Menu */}
                      <span className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        {article.menu}
                      </span>
                      {/* Image */}
                      <div className="overflow-hidden h-56">
                        <motion.img
                          src={article.uriHinhAnhMinhHoa}
                          alt={article.tieuDe}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          whileHover={{ scale: 1.07 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                        />
                      </div>
                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition">
                          {article.tieuDe}
                        </h2>
                        <p className="text-gray-600 text-base mb-4 line-clamp-3 flex-1">
                          {article.noiDungTomTat}
                        </p>
                        {/* Author & Meta */}
                        <div className="flex items-center gap-3 mt-auto">
                          <img
                            src={
                              article.nhanVien?.uriHinhDaiDien ||
                              "/avatar-default.png"
                            }
                            alt={article.nhanVien?.tenNhanVien}
                            className="w-9 h-9 rounded-full object-cover border-2 border-indigo-200"
                          />
                          <div>
                            <div className="text-sm font-semibold text-gray-800">
                              {article.nhanVien?.tenNhanVien}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                              <FiClock />
                              {new Date(article.ngayDang).toLocaleDateString()}
                              <span className="mx-1">·</span>
                              <FiEye />
                              {article.soLuongTruyCap}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.p
                className="col-span-full text-center text-gray-500 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                No suitable news found.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default News;
