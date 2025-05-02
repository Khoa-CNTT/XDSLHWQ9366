import { useParams, Link } from "react-router-dom";
import newItems from "../../constants/newData";
import { FiClock, FiEye } from "react-icons/fi";

const NewsDetail = () => {
  const { mabaiviet } = useParams<{ mabaiviet: string }>();
  const article = newItems.find((item) => String(item.mabaiviet) === mabaiviet);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-gray-500 text-lg">Article not found.</p>
      </div>
    );
  }

  const otherArticles = newItems.filter(
    (item) => item.tieude !== article.tieude
  );

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-4 text-sm text-black">
            <h1 className="text-4xl font-extrabold">{article.tieude}</h1>
          </div>
          <div className="text-sm text-gray-600 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1">
              <FiClock className="text-secondary" />
              Published on {new Date(article.ngaydang).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <FiEye className="text-secondary" />
              Views: {article.soluongtruycap}
            </span>
          </div>
          <img
            src={article.urhinhminhhoa}
            alt={article.tieude}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">Article Content</h3>
            <p className="text-sm text-gray-800">{article.noidung}</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Other Articles
          </h3>

          <div className="space-y-4">
            {otherArticles.slice(0, 3).map((item) => (
              <Link
                key={item.mabaiviet}
                to={`/news/${item.mabaiviet}`}
                className="block p-4 border border-gray-200 rounded-xl hover:shadow transition"
              >
                <h4 className="text-lg font-medium text-secondary hover:text-primary">
                  {item.tieude}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Published on {new Date(item.ngaydang).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
