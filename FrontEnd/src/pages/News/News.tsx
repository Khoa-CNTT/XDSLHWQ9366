import { useState } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiEye } from "react-icons/fi";
import newItems from "../../constants/newData";

const News = () => {
  const [filtered] = useState(newItems);

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold">News & Events</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm">
            Stay updated with the latest information from us – events,
            announcements, and in-depth articles.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((article) => (
              <div
                key={article.mabaiviet}
                className="border rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
              >
                <img
                  src={article.urhinhminhhoa}
                  alt={article.tieude}
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800">
                  {article.tieude}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {article.noidungtomtat}
                </p>
                <div className="flex-grow" />
                <div className="text-xs text-gray-500 mt-3 flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <FiClock />
                    {new Date(article.ngaydang).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiEye />
                    {article.soluongtruycap}
                  </span>
                </div>
                <Link to={`/news/${article.mabaiviet}`}>
                  <h2 className="text-sm font-semibold text-blue-600 hover:underline mt-2">
                    View Details
                  </h2>
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No suitable news found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
