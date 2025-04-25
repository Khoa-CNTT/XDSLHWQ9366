import { useParams, Link } from "react-router-dom";
import resultItem from "../../constants/resultData";

const ResultDetail = () => {
  const { id } = useParams();

  // Check if id does not exist
  if (!id) {
    return (
      <div className="min-h-screen bg-white text-black pt-24">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-center text-gray-500">Course ID not found.</p>
        </div>
      </div>
    );
  }

  const course = resultItem.find((item) => item.id === parseInt(id));

  // If course not found by ID
  if (!course) {
    return (
      <div className="min-h-screen bg-white text-black pt-24">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-center text-gray-500">Course does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold">Result Detail</h1>
          <p className="text-sm text-gray-500 mt-1">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link to="/result" className="text-blue-600 hover:underline">
              Results
            </Link>{" "}
            / <span className="text-gray-800">{course.tenkhoahoc}</span>
          </p>
        </div>

        {/* Detail Table */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left border-y">
                <th className="p-2">No.</th>
                <th className="p-2">Course Name</th>
                <th className="p-2">Score</th>
                <th className="p-2">Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">{course.id}</td>
                <td className="p-2">{course.tenkhoahoc}</td>
                <td className="p-2">{course.diem}</td>
                <td className="p-2">{course.ketqua}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultDetail;
