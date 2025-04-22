import { useParams, Link } from "react-router-dom";
import examItems from "../../constants/examData";

const ExamDetail = () => {
  const { id } = useParams();
  const exam = examItems.find((e) => String(e.malichthi) === id);

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-gray-500 text-lg">Exam not found.</p>
      </div>
    );
  }
  // Các chứng chỉ khác
  const otherExams = examItems.filter(
    (e) => e.tenchungchi !== exam.tenchungchi
  );

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-black">
          <h1 className="text-4xl font-extrabold">Exam Detail</h1>
          <p className="text-sm text-gray-500 mt-1">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link to="/exam-schedule" className="text-blue-600 hover:underline">
              Exam-schedule
            </Link>{" "}
            / <span className="text-gray-800">{exam.tenchungchi}</span>
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 space-y-6 mb-12">
          {/* Name */}
          <div className="w-full h-56 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-secondary hover:text-primary">
              {exam.tenchungchi}
            </h1>
          </div>

          {/* Info */}
          <div className="space-y-2 text-base">
            <p>
              <strong>Exam day :</strong>{" "}
              {new Date(exam.ngaythi).toLocaleDateString()}
            </p>
            <p>
              <strong>Fees :</strong> {exam.lephithi.toLocaleString()} VNĐ
            </p>
            <p className="text-gray-600">{exam.thongtinchitiet}</p>
          </div>

          {/* Button */}
          <div className="pt-4">
            <Link
              to={`/register/${exam.malichthi}`}
              className="block w-full text-center bg-secondary text-white py-3 rounded-lg font-medium text-lg hover:bg-primary transition"
            >
              Register now
            </Link>
          </div>
        </div>

        {/* Các chứng chỉ khác */}
        {otherExams.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Other certificates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {otherExams.slice(0, 6).map((item) => (
                <Link
                  key={item.malichthi}
                  to={`/exam/${item.malichthi}`}
                  className="block p-4 border border-gray-200 rounded-xl hover:shadow transition"
                >
                  <h3 className="font-semibold text-secondary hover:text-primary">
                    {item.tenchungchi}
                  </h3>
                  <p className="text-sm mt-1">
                    Exam day: {new Date(item.ngaythi).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamDetail;
