import { useParams, Link } from "react-router-dom";
import {
  MdOndemandVideo,
  MdOutlineDevices,
  MdUpdate,
  MdWarning,
  MdStar,
  MdStarHalf,
  MdPlayCircleFilled,
  MdAccessTime,
  MdPeople,
  MdCheckCircle,
} from "react-icons/md";
import {
  FaCertificate,
  FaFlask,
  FaUserCog,
  FaRegBookmark,
  FaBookmark,
  FaShare,
} from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FadeUp } from "../Home/Hero/Hero";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useNotification } from "../../context/NotificationContext";
import CountUp from "../../components/Animation/CountUp";
// Định nghĩa interface cho dữ liệu khóa học
interface LinhVuc {
  maLinhVuc: string;
  tenLinhVuc: string;
}

interface Course {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  linhVuc: LinhVuc;
  soBuoi: number;
  hocPhi: number;
  noiDungTomTatKhoaHoc: string;
  noiDungKhoaHoc: string;
  ghiChu: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data: Course;
}

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const { notify } = useNotification();
  // Hàm lấy thông tin chi tiết khóa học
  const fetchCourse = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<ApiResponse>(
        `http://localhost:8080/khoahoc/getById/${id}`
      );
      setCourse(response.data.data);
      fetchRelatedCourses(response.data.data.linhVuc.maLinhVuc);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin khóa học:", err);
      setError("Không thể lấy thông tin khóa học. Vui lòng thử lại.");
      setCourse(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm lấy các khóa học liên quan
  const fetchRelatedCourses = async (maLinhVuc: string) => {
    try {
      const response = await axios.get<{
        status: number;
        message: string;
        data: Course[];
      }>(`http://localhost:8080/khoahoc/linhvuc/${maLinhVuc}`);
      const filteredCourses = response.data.data.filter(
        (c) => c.maKhoaHoc !== id
      );
      setRelatedCourses(filteredCourses.slice(0, 3));
    } catch (err) {
      console.error("Lỗi khi lấy khóa học liên quan:", err);
      setRelatedCourses([]);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const addToCart = () => {
    if (!course || !course.maKhoaHoc || !course.tenKhoaHoc || !course.hocPhi) {
      console.error("Dữ liệu khóa học không hợp lệ:", course);
      notify(
        "error",
        "Không thể thêm khóa học vào giỏ hàng. Dữ liệu khóa học không hợp lệ."
      );
      return;
    }

    try {
      // Lấy giỏ hàng từ localStorage
      let cart: Course[] = [];
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        try {
          cart = JSON.parse(cartData);
          if (!Array.isArray(cart)) {
            console.warn(
              "Dữ liệu giỏ hàng không phải mảng, khởi tạo lại:",
              cart
            );
            cart = [];
          }
        } catch (e) {
          console.error("Lỗi khi parse dữ liệu giỏ hàng:", e);
          cart = [];
        }
      }

      // Kiểm tra khóa học đã tồn tại
      const existingCourse = cart.find(
        (item) => item.maKhoaHoc === course.maKhoaHoc
      );

      if (!existingCourse) {
        // Tạo đối tượng khóa học với các trường cần thiết
        const courseToAdd: Course = {
          maKhoaHoc: course.maKhoaHoc,
          tenKhoaHoc: course.tenKhoaHoc,
          hocPhi: course.hocPhi,
          linhVuc: course.linhVuc || { maLinhVuc: "", tenLinhVuc: "" },
          soBuoi: course.soBuoi || 0,
          noiDungTomTatKhoaHoc: course.noiDungTomTatKhoaHoc || "",
          noiDungKhoaHoc: course.noiDungKhoaHoc || "",
          ghiChu: course.ghiChu || "",
        };
        cart.push(courseToAdd);
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Đã thêm khóa học vào giỏ hàng:", courseToAdd);
        notify("success", "Khóa học đã được thêm vào giỏ hàng!");
      } else {
        console.log("Khóa học đã tồn tại trong giỏ hàng:", course.maKhoaHoc);
        notify("info", "Khóa học đã có trong giỏ hàng!");
      }
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ hàng:", err);
      notify(
        "error",
        "Đã xảy ra lỗi khi thêm khóa học vào giỏ hàng. Vui lòng thử lại."
      );
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <p className="text-gray-700 text-xl font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!course || error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <MdWarning className="text-5xl text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-700 text-xl font-medium">
            {error || "Course not found"}
          </p>
          <Link
            to="/courses"
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Explore other courses
          </Link>
        </div>
      </div>
    );
  }

  // Format content for better display
  const learningObjectives = [
    course.noiDungTomTatKhoaHoc,
    `Understand and apply the fundamental concepts of ${course.linhVuc.tenLinhVuc}`,
    `Complete ${course.soBuoi} sessions with practical exercises`,
    `Master ${course.noiDungKhoaHoc.split(".")[0]}`,
    course.ghiChu
      ? course.ghiChu
      : "Receive a certificate upon course completion",
  ];

  const contentSections = course.noiDungKhoaHoc
    .split(/\.\s+/)
    .filter(Boolean)
    .map((section, index) => ({
      id: index + 1,
      title: section.trim(),
      duration: Math.floor(Math.random() * 40) + 20, // Random minutes for demo
    }));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-20">
      {/* Hero section */}
      <div className="bg-gradient-to-r bg-primary text-black py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              className="md:w-2/3"
            >
              <div className="mb-4 flex items-center gap-2 text-black">
                <Link to="/" className="hover:text-white">
                  Home
                </Link>{" "}
                /
                <Link to="/courses" className="hover:text-white">
                  Courses
                </Link>{" "}
                /<span className="font-medium">{course.tenKhoaHoc}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.tenKhoaHoc}
              </h1>

              <p className="text-lg text-black mb-4">
                {course.noiDungTomTatKhoaHoc}
              </p>

              <div className="flex items-center gap-5 mb-6">
                <div className="flex items-center">
                  <MdStar className="text-yellow-400 text-xl" />
                  <MdStar className="text-yellow-400 text-xl" />
                  <MdStar className="text-yellow-400 text-xl" />
                  <MdStar className="text-yellow-400 text-xl" />
                  <MdStarHalf className="text-yellow-400 text-xl" />
                  <span className="ml-2 text-black">
                    4.8 (
                    <CountUp
                      from={0}
                      to={126}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />{" "}
                    reviews)
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <MdPeople className="text-xl" />
                  <span>
                    <CountUp
                      from={0}
                      to={1245}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />{" "}
                    students
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="flex items-center gap-1">
                  <FaUserCog />
                  Instructor:{" "}
                  <span className="font-semibold underline">Admin</span>
                </span>

                <span className="flex items-center gap-1">
                  <MdUpdate className="text-blue-800" />
                  Updated: 04/2025
                </span>

                <span className="flex items-center gap-1">
                  <RiGlobalLine />
                  Language: English
                </span>

                <span className="flex items-center gap-1">
                  <MdAccessTime />
                  {course.soBuoi} sessions
                </span>
              </div>
            </motion.div>

            {/* Preview video thumbnail */}
            <motion.div
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="md:w-1/3 w-full"
            >
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br bg-blue-800 aspect-video flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition"></div>
                <MdPlayCircleFilled className="text-6xl text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition" />
                <span className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  Watch preview 2:45
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Course content */}
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
                onClick={() => setActiveTab("curriculum")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "curriculum"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Course Content
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
                  <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
                    {learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <MdCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{objective}</p>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-2xl font-bold mb-4">
                    Course Description
                  </h2>
                  <div className="prose text-gray-700">
                    <p className="mb-4">
                      {course.noiDungKhoaHoc.split(".").slice(0, 3).join(". ")}
                    </p>
                    <p>
                      {course.noiDungKhoaHoc.split(".").slice(3).join(". ")}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "curriculum" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Course Content</h2>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">
                        {contentSections.length} lessons
                      </span>{" "}
                      • Total duration:{" "}
                      {Math.floor(
                        contentSections.reduce(
                          (acc, section) => acc + section.duration,
                          0
                        ) / 60
                      )}{" "}
                      hours
                    </div>
                  </div>

                  <div className="space-y-4">
                    {contentSections.map((section) => (
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
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                              {section.duration} minutes
                            </span>
                            <MdPlayCircleFilled className="text-blue-600 text-xl" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Student Reviews</h2>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <MdStar className="text-yellow-400 text-xl" />
                        <MdStar className="text-yellow-400 text-xl" />
                        <MdStar className="text-yellow-400 text-xl" />
                        <MdStar className="text-yellow-400 text-xl" />
                        <MdStarHalf className="text-yellow-400 text-xl" />
                      </div>
                      <span className="ml-2 font-medium">4.8</span>
                      <span className="text-gray-500 ml-1">(126 reviews)</span>
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
                                {["2 weeks", "1 month", "3 days"][review - 1]}{" "}
                                ago
                              </span>
                            </div>
                            <p className="text-gray-600">
                              {
                                [
                                  "The course is very Engaging and detailed. The instructor explains clearly and understandably. I learned a lot of new things.",
                                  "The course content is rich, and the practical exercises helped me gain a deeper understanding of the topic. Well worth it!",
                                  "Amazing! I've been looking for a course like this for a long time. Now I feel much more confident in my skills.",
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

          {/* Instructor section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Instructor</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                AD
              </div>
              <div>
                <h3 className="text-lg font-semibold">Admin</h3>
                <p className="text-gray-500 text-sm mb-2">
                  {course.linhVuc.tenLinhVuc} expert with over 10 years of
                  experience
                </p>
                <p className="text-gray-700">
                  The instructor has many years of experience in the field of{" "}
                  {course.linhVuc.tenLinhVuc}. They have trained over 10,000
                  students and are highly regarded for their clear, concise, and
                  effective teaching methods.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: Purchase box */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
            {/* Course thumbnail */}
            <div className="relative">
              <div className="w-full aspect-video bg-gradient-to-br bg-gray-100 flex items-center justify-center">
                <MdPlayCircleFilled className="text-white text-6xl opacity-80 hover:opacity-100 cursor-pointer transition" />
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
                  {course.hocPhi.toLocaleString()} VND
                </div>
                <div className="text-sm text-red-600 flex items-center gap-1">
                  <MdWarning />
                  <span>5 hours left</span>
                </div>
              </div>

              <button
                onClick={addToCart}
                className="w-full bg-primary text-white text-center py-3 rounded-lg font-medium text-lg hover:bg-secondary transition mb-3 flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                Add to Cart
              </button>

              <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-medium hover:text-secondary hover:border-secondary transition">
                Buy Now
              </button>

              <div className="text-center mt-3 mb-6">
                <p className="text-sm text-gray-500">
                  30-day money-back guarantee
                </p>
              </div>

              <div className="space-y-4 text-gray-700">
                <h3 className="font-semibold">This course includes:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MdOndemandVideo className="text-xl text-secondary" />
                    <span>{course.soBuoi} sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdAccessTime className="text-xl text-secondary" />
                    <span>Duration: {course.soBuoi * 2} hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaFlask className="text-xl text-secondary" />
                    <span>Practical exercises</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdOutlineDevices className="text-xl text-secondary" />
                    <span>Access on all devices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCertificate className="text-xl text-secondary" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                  <FaShare className="text-sm" />
                  <span className="text-sm">Share this course</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Courses */}
      {relatedCourses.length > 0 && (
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Similar Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((item) => (
                <Link
                  key={item.maKhoaHoc}
                  to={`/course/${item.maKhoaHoc}`}
                  className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition group"
                >
                  <div className="aspect-video bg-gradient-to-r bg-primary relative">
                    <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1">
                      {item.soBuoi} sessions
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 group-hover:text-secondary transition">
                      {item.tenKhoaHoc}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.noiDungTomTatKhoaHoc.substring(0, 80)}...
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
                        <span className="text-xs text-gray-500 ml-1">(98)</span>
                      </div>
                      <div className="font-bold text-blue-800">
                        {item.hocPhi.toLocaleString()} VND
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/courses"
                className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-gray-50 transition"
              >
                View All Courses
                <HiArrowNarrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
