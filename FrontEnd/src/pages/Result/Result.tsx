import { useState } from "react";
import { Link } from "react-router-dom";
import resultItem from "../../constants/resultData";

const Results = () => {
  const [filtered] = useState(resultItem);

  const path = location.pathname
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment, idx, arr) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: "/" + arr.slice(0, idx + 1).join("/"),
    }));

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold">Results</h1>
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

        {/* Courses Table */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left border-y">
                <th className="p-2">No.</th>
                <th className="p-2">Course Name</th>
                <th className="p-2">Field</th>
                <th className="p-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((course, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">{course.id}</td>
                    <td className="p-2">{course.tenkhoahoc}</td>
                    <td className="p-2">{course.tenlinhvuc}</td>
                    <td className="p-2">
                      <Link
                        to={`/Result/${course.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View Personal Score
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-2 text-center text-gray-500">
                    No matching course found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Results;
