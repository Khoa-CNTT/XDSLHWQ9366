import { Link } from "react-router-dom";
import courseItems from "../../constants/courseData";

const CourseCard = ({ item }: { item: (typeof courseItems)[0] }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-5 flex flex-col justify-between">
    <div>
      <div className="h-36 bg-green-50 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-xl font-semibold text-green-700 text-center px-2">
          {item.tenkhoahoc}
        </span>
      </div>
      <div className="space-y-1 text-sm">
        <p>
          <strong>Field :</strong> {item.malinhvuc}
        </p>
        <p>
          <strong>Number of sessions :</strong> {item.sobuoi}
        </p>
        <p>
          <strong>Tuition :</strong> {item.hocphi.toLocaleString()} VNĐ
        </p>
        <p className="text-gray-600">{item.noidungtomtatkhoahoc}</p>
      </div>
    </div>

    <div className="mt-4">
      <Link
        to={`/course/${item.makhoahoc}`}
        className="block text-center bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-secondary transition"
      >
        Detail
      </Link>
    </div>
  </div>
);

export default CourseCard;
