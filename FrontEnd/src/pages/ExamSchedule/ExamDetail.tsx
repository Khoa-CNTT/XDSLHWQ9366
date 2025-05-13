import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RegisterModal from "./ExamRegister";
import { motion } from "framer-motion";
import {
  MdSearch,
  MdCalendarToday,
  MdMoney,
  MdInfo,
  MdStar,
  MdStarHalf,
  MdPeople,
  MdCheckCircle,
} from "react-icons/md";
import {
  FaRegBookmark,
  FaBookmark,
  FaShare,
  FaCertificate,
  FaAward,
} from "react-icons/fa";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
interface LinhVuc {
  maLinhVuc: string;
  tenLinhVuc: string;
}

interface Exam {
  maLichThi: string;
  linhVuc: LinhVuc;
  tenChungChi: string;
  ngayThi: string;
  thongTinChiTiet: string;
  lePhiThi: number;
  thiSinhDuThi: unknown[];
}

interface ApiResponse {
  status: number;
  message: string;
  data: Exam;
}

interface ApiResponseList {
  status: number;
  message: string;
  data: Exam[];
}

const FadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const ExamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [exam, setExam] = useState<Exam | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [relatedExams, setRelatedExams] = useState<Exam[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else {
      setIsModalOpen(true);
    }
  };

  // Hàm gọi API để lấy chi tiết kỳ thi
  const fetchExamDetail = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<ApiResponse>(
        `http://localhost:8080/lichthi/getById/${id}`
      );
      setExam(response.data.data);
      fetchRelatedExams(response.data.data.linhVuc.maLinhVuc);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Unable to fetch exam details."
        );
      } else {
        setError("An unexpected error occurred.");
      }
      setExam(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm gọi API để lấy các kỳ thi liên quan
  const fetchRelatedExams = async (maLinhVuc: string) => {
    try {
      const response = await axios.get<ApiResponseList>(
        `http://localhost:8080/lichthi/getAll`
      );
      const filteredExams = response.data.data
        .filter((e) => e.linhVuc.maLinhVuc === maLinhVuc && e.maLichThi !== id)
        .slice(0, 3);
      setRelatedExams(filteredExams);
    } catch (err) {
      console.error("Lỗi khi lấy kỳ thi liên quan:", err);
      setRelatedExams([]);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExamDetail();
    }
  }, [id]);

  // Hàm định dạng ngày
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

  // Hàm toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-4xl w-full">
          <div className="h-10 bg-gray-200 rounded-lg w-3/4 mb-8 mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="h-20 bg-gray-200 rounded-lg"></div>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-lg w-full">
          <MdSearch className="text-5xl text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-700 text-xl font-medium">
            {error || "Exam not found"}
          </p>
          <Link
            to="/exam-schedule"
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Explore other exams
          </Link>
        </div>
      </div>
    );
  }

  // Format thông tin chi tiết
  const examDetails = exam.thongTinChiTiet
    .split(/\.\s+/)
    .filter(Boolean)
    .map((detail, index) => ({
      id: index + 1,
      title: detail.trim(),
    }));

  return (
    <div className="min-h-screen bg-gray-50 text-blue-900 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r bg-primary text-blue-900 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              className="md:w-2/3"
            >
              <div className="mb-4 flex items-center gap-2 text-blue-900">
                <Link to="/" className="hover:text-gray-200">
                  Home
                </Link>{" "}
                /{" "}
                <Link to="/exam-schedule" className="hover:text-gray-200">
                  Exam Schedule
                </Link>{" "}
                / <span className="font-medium">{exam.tenChungChi}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {exam.tenChungChi}
              </h1>

              <p className="text-lg text-blue-900 mb-4">
                Prepare for your {exam.linhVuc.tenLinhVuc} certification with
                this comprehensive exam.
              </p>

              <div className="flex items-center gap-5 mb-6">
                <div className="flex items-center">
                  <MdStar className="text-yellow-400 text-xl" />
                  <MdStar className="text-yellow-400 text-xl" />
                  <MdStar className="text-yellow-400 text-xl" />
                  <MdStar className="text-yellow-400 text-xl" />
                  <MdStarHalf className="text-yellow-400 text-xl" />
                  <span className="ml-2 text-blue-900">4.8 (150 reviews)</span>
                </div>

                <div className="flex items-center gap-1">
                  <MdPeople className="text-xl text-blue-900" />
                  <span>{exam.thiSinhDuThi.length} candidates</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="flex items-center gap-1">
                  <MdCalendarToday />
                  Exam Date:{" "}
                  <span className="font-semibold">
                    {formatDate(exam.ngayThi)}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <MdMoney />
                  Fee:{" "}
                  <span className="font-semibold">
                    {exam.lePhiThi.toLocaleString()} VND
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <MdInfo />
                  Category:{" "}
                  <span className="font-semibold">
                    {exam.linhVuc.tenLinhVuc}
                  </span>
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="md:w-1/3 w-full"
            >
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-800 to-gray-900 aspect-video flex items-center justify-center group">
                <FaAward className="text-6xl text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition" />
                <span className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {exam.linhVuc.tenLinhVuc}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Exam content */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          {/* Navigation tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Reviews
              </button>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    What You'll Achieve
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
                    {[
                      `Earn a recognized ${exam.tenChungChi} certification`,
                      `Master key concepts in ${exam.linhVuc.tenLinhVuc}`,
                      `Prepare for real-world applications and assessments`,
                      `Demonstrate expertise in your field`,
                      `Access exclusive career opportunities`,
                    ].map((objective, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <MdCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{objective}</p>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-2xl font-bold mb-4">Exam Description</h2>
                  <div className="prose text-gray-700">
                    <p className="mb-4">
                      This {exam.tenChungChi} exam is designed to test your
                      knowledge and skills in {exam.linhVuc.tenLinhVuc}. It
                      covers a comprehensive range of topics to ensure you are
                      well-prepared for industry standards.
                    </p>
                    <p>{exam.thongTinChiTiet}</p>
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Exam Details</h2>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">
                        {examDetails.length} sections
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {examDetails.map((section) => (
                      <div
                        key={section.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                              {section.id}
                            </div>
                            <h3 className="font-medium">{section.title}</h3>
                          </div>
                          <MdInfo className="text-blue-600 text-xl" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Candidate Reviews</h2>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <MdStar className="text-yellow-400 text-xl" />
                        <MdStar className="text-yellow-400 text-xl" />
                        <MdStar className="text-yellow-400 text-xl" />
                        <MdStar className="text-yellow-400 text-xl" />
                        <MdStarHalf className="text-yellow-400 text-xl" />
                      </div>
                      <span className="ml-2 font-medium">4.8</span>
                      <span className="text-gray-500 ml-1">(150 reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="border-b border-gray-200 pb-6 last:border-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                            {["NT", "VH", "LM"][review - 1]}
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {
                                ["Nguyen Thanh", "Vu Huong", "Le Minh"][
                                  review - 1
                                ]
                              }
                            </h4>
                            <div className="flex items-center mt-1 mb-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <MdStar
                                    key={star}
                                    className="text-yellow-400"
                                  />
                                ))}
                              </div>
                              <span className="text-gray-500 text-sm ml-2">
                                {["1 week", "2 weeks", "1 month"][review - 1]}{" "}
                                ago
                              </span>
                            </div>
                            <p className="text-gray-600">
                              {
                                [
                                  "The exam was well-organized and covered all essential topics. Highly recommend!",
                                  "Great experience! The venue was convenient, and the instructions were clear.",
                                  "This certification boosted my career. The exam was challenging but fair.",
                                ][review - 1]
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: Registration box */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
            {/* Placeholder Icon */}
            <div className="relative">
              <div className="w-full aspect-video bg-gradient-to-br from-blue-800 to-gray-900 flex items-center justify-center">
                <MdCheckCircle className="text-white text-6xl opacity-80 hover:opacity-100 transition" />
              </div>
              <button
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md"
                onClick={toggleBookmark}
              >
                {isBookmarked ? (
                  <FaBookmark className="text-blue-600" />
                ) : (
                  <FaRegBookmark className="text-gray-600" />
                )}
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  {exam.lePhiThi.toLocaleString()} VND
                </div>
              </div>

              <button
                onClick={handleRegisterClick}
                className="w-full bg-primary text-white text-center py-3 rounded-lg font-medium text-lg hover:bg-secondary transition mb-3 flex items-center justify-center gap-2"
              >
                <MdCheckCircle className="text-xl" />
                Register Now
              </button>

              <div className="text-center mt-3 mb-6">
                <p className="text-sm text-gray-500">
                  Registration closes on {formatDate(exam.ngayThi)}
                </p>
              </div>

              <div className="space-y-4 text-gray-700">
                <h3 className="font-semibold">This exam includes:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MdCalendarToday className="text-xl text-blue-600" />
                    <span>Exam Date: {formatDate(exam.ngayThi)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdInfo className="text-5xl text-blue-600" />
                    <span> {exam.thongTinChiTiet.split(".")[0]}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdPeople className="text-xl text-blue-600" />
                    <span>
                      {exam.thiSinhDuThi.length} candidates registered
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCertificate className="text-xl text-blue-600" />
                    <span>Official certification upon passing</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                  <FaShare className="text-sm" />
                  <span className="text-sm">Share this exam</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Exams */}
      {relatedExams.length > 0 && (
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Related Exams
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedExams.map((item) => (
                <Link
                  key={item.maLichThi}
                  to={`/exam/${item.maLichThi}`}
                  className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition group"
                >
                  <div className="aspect-video bg-gradient-to-r from-blue-600 to-blue-800 relative">
                    <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1">
                      {formatDate(item.ngayThi)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {item.tenChungChi}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.thongTinChiTiet.substring(0, 80)}...
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex">
                          <MdStar className="text-yellow-400" />
                          <MdStar className="text-yellow-400" />
                          <MdStar className="text-yellow-400" />
                          <MdStar className="text-yellow-400" />
                          <MdStar className="text-gray-300" />
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          (120)
                        </span>
                      </div>
                      <div className="font-bold text-blue-900">
                        {item.lePhiThi.toLocaleString()} VND
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/exam-schedule"
                className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                View All Exams
                <HiArrowNarrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        examName={exam.tenChungChi}
      />
    </div>
  );
};

export default ExamDetail;
