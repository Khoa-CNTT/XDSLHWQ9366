import { useParams, Link } from "react-router-dom";
import courseItems from "../../constants/courseData";
import {
  MdOndemandVideo,
  MdOutlineDevices,
  MdUpdate,
  MdWarning,
} from "react-icons/md";
import { FaCertificate, FaFlask, FaUserCog } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courseItems.find((c) => String(c.makhoahoc) === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-gray-500 text-lg">Course not found.</p>
      </div>
    );
  }

  const otherCourses = courseItems.filter(
    (c) => c.tenkhoahoc !== course.tenkhoahoc
  );

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Course content */}
        <div className="md:col-span-2">
          <div className="mb-4 text-sm text-black">
            <h1 className="text-4xl font-extrabold">{course.tenkhoahoc}</h1>
            <p className="text-sm text-gray-500 mt-1">
              <Link to="/" className="text-blue-600 hover:underline">
                Home
              </Link>{" "}
              /{" "}
              <Link to="/courses" className="text-blue-600 hover:underline">
                Courses
              </Link>{" "}
              / <span className="text-gray-800">{course.tenkhoahoc}</span>
            </p>
          </div>

          <div className="text-sm text-gray-600 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1">
              <FaUserCog className="text-secondary" />
              Created by <span className="text-secondary underline">Admin</span>
            </span>

            <span className="flex items-center gap-1">
              <MdUpdate className="text-green-600" />
              Last updated 04/2025
            </span>

            <span className="flex items-center gap-1">
              <RiGlobalLine className="text-secondary" />
              Language: VietNamese
            </span>
          </div>

          {/* What you'll learn */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3 mb-10 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-800 text-sm">
              <li>Overview: {course.noidungtomtatkhoahoc}</li>
              <li>Number of sessions: {course.sobuoi}</li>
              <li>Field: {course.malinhvuc}</li>
              <li>Main content: {course.noidungkhoahoc.split(".")[0]}</li>
              {course.ghichu && <li>Note: {course.ghichu}</li>}
            </ul>
          </div>

          {/* Full Content */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Course Content</h3>
            <pre className="bg-gray-100 p-4 rounded-xl whitespace-pre-wrap text-sm border border-gray-300">
              {course.noidungkhoahoc}
            </pre>
          </div>
        </div>

        {/* RIGHT SIDEBAR: Purchase box */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-lg">
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-lg font-bold text-gray-500">
              Course Preview
            </span>
          </div>
          <div className="text-2xl font-bold text-black mb-1">
            {course.hocphi.toLocaleString()} VNĐ
          </div>
          <p className="text-sm text-red-600 mb-4 flex items-center gap-2">
            <MdWarning className="text-red-600 text-lg" />5 hours left to buy at
            this price!
          </p>

          <Link
            to={`/register/${course.makhoahoc}`}
            className="block w-full bg-primary text-white text-center py-3 rounded-lg font-medium text-lg hover:bg-secondary transition"
          >
            Add to cart
          </Link>
          <button className="w-full border border-primary text-primary py-3 mt-3 rounded-lg font-medium hover:bg-zinc-50 transition">
            Buy now
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            30-Day Money-Back Guarantee
          </p>

          {/* Includes */}
          <div className="mt-6 text-sm text-gray-700 space-y-2">
            <div className="flex items-center gap-2">
              <MdOndemandVideo className="text-lg text-secondary" />
              <span>{course.sobuoi} sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <FaFlask className="text-lg text-secondary" />
              <span>Practice exercises included</span>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineDevices className="text-lg text-secondary" />
              <span>Access on mobile and desktop</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCertificate className="text-lg text-secondary" />
              <span>Certificate of completion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Other Courses */}
      {otherCourses.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Other courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {otherCourses.slice(0, 6).map((item) => (
              <Link
                key={item.makhoahoc}
                to={`/course/${item.makhoahoc}`}
                className="block p-4 border border-gray-200 rounded-xl hover:shadow transition"
              >
                <h3 className="font-semibold text-secondary hover:text-primary">
                  {item.tenkhoahoc}
                </h3>
                <p className="text-sm mt-1">
                  Sessions: {item.sobuoi} | Fee: {item.hocphi.toLocaleString()}{" "}
                  VNĐ
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
