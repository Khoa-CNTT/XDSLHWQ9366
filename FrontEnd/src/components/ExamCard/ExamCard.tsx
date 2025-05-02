import { Link } from "react-router-dom";
import examItems from "../../constants/examData";

const ExamCard = ({ item }: { item: (typeof examItems)[0] }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-5 flex flex-col justify-between">
    <div>
      <div className="h-36 bg-blue-50 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-xl font-semibold text-blue-700 text-center px-2">
          {item.tenchungchi}
        </span>
      </div>
      <div className="space-y-1">
        <p>
          <strong>Exam day :</strong>{" "}
          {new Date(item.ngaythi).toLocaleDateString()}
        </p>
        <p>
          <strong>Fees :</strong> {item.lephithi.toLocaleString()} VNĐ
        </p>
        {/* <p className="text-sm text-gray-600 mt-2">{item.thongtinchitiet}</p> */}
      </div>
    </div>

    {/* Buttons */}
    <div className="mt-4 flex gap-3 justify-between">
      <Link
        to={`/exam/${item.malichthi}`}
        className="flex-1 text-center bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-secondary transition"
      >
        Detail
      </Link>
    </div>
  </div>
);

export default ExamCard;
