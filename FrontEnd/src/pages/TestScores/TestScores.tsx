import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

interface TestScore {
  id: string;
  tenchungchi: string;
  diem: number;
  xeploai: string;
  maTaiKhoan: string;
}

const TestScores = () => {
  const [scores, setScores] = useState<TestScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const maTaiKhoan = localStorage.getItem("maTaiKhoan");

  // Breadcrumb path
  const path = location.pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment, idx, arr) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: "/" + arr.slice(0, idx + 1).join("/"),
    }));

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setError(null);
      try {
        // Giả sử backend có endpoint này, nếu không hãy thay đổi cho phù hợp
        const response = await axios.get(
          "http://localhost:8080/thisinh/getAll"
        );
        if (response.data.status === 200 && Array.isArray(response.data.data)) {
          // Lọc theo maTaiKhoan nếu có
          const filtered = response.data.data.filter(
            (item: TestScore) =>
              item.maTaiKhoan && item.maTaiKhoan === maTaiKhoan
          );
          setScores(filtered);
        } else {
          setError("Không thể lấy dữ liệu từ máy chủ.");
        }
      } catch {
        setError("Lỗi khi kết nối tới máy chủ.");
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [maTaiKhoan]);

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold">Test Scores</h1>
          <p className="text-sm text-gray-500 mt-1">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            {path.map((p, index) => (
              <span key={index}>
                {" / "}
                <Link to={p.path} className="text-blue-600 hover:underline">
                  {p.name}
                </Link>
              </span>
            ))}
          </p>
        </div>

        {/* Test Scores Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <Loading message="Loading learning results..." />
          ) : error ? (
            <div className="text-center py-12 text-red-600 font-medium">
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="py-4 px-6 font-semibold">No.</th>
                    <th className="py-4 px-6 font-semibold">
                      Certificate Name
                    </th>
                    <th className="py-4 px-6 font-semibold">Score</th>
                    <th className="py-4 px-6 font-semibold">Classification</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {scores.length > 0 ? (
                    scores.map((score, index) => (
                      <tr
                        key={score.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">{index + 1}</td>
                        <td className="py-4 px-6">{score.tenchungchi}</td>
                        <td className="py-4 px-6">{score.diem}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              score.xeploai === "Giỏi"
                                ? "bg-green-100 text-green-800"
                                : score.xeploai === "Khá"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {score.xeploai}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-12 text-center text-gray-500"
                      >
                        No matching certificate found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestScores;
