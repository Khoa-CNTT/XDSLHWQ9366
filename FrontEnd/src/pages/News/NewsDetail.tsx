import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiClock, FiEye } from "react-icons/fi";
import { getBaiVietById, getAllBaiViet } from "../../api/newApi";
import Loading from "../../components/Loading/Loading";

interface ChucVu {
  maChucVu: string;
  tenChucVu: string;
  trangThai: boolean;
}

interface NhanVien {
  tenNhanVien: string;
  ngaySinh: string;
  gioiTinh: boolean;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  chucVu: ChucVu;
  nguoiNhapThongTin: string;
  ghiChu: string;
  uriHinhDaiDien: string;
}

interface BaiViet {
  maBaiViet: string;
  tieuDe: string;
  uriHinhAnhMinhHoa: string;
  noiDungTomTat: string;
  noiDung: string;
  ngayDang: string;
  nhanVien: NhanVien;
  lanCapNhatCuoiCung: string | null;
  soLuongTruyCap: number;
  menu: string;
  trangThai: boolean;
}

const NewsDetail = () => {
  const { mabaiviet } = useParams<{ mabaiviet: string }>();
  const [article, setArticle] = useState<BaiViet | null>(null);
  const [otherArticles, setOtherArticles] = useState<BaiViet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        if (mabaiviet) {
          const articleData = await getBaiVietById(mabaiviet);
          setArticle(articleData);

          const allArticles = await getAllBaiViet();
          const filteredArticles = allArticles.filter(
            (item: BaiViet) => item.maBaiViet !== mabaiviet
          );
          setOtherArticles(filteredArticles);
        }
        console.log("Article data:", mabaiviet);
      } catch {
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [mabaiviet]);

  if (loading) {
    return <Loading message="Loading new detail..." />;
  }
  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
        <p className="text-gray-600 text-lg font-medium">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Article */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4">
            <img
              src={article.uriHinhAnhMinhHoa}
              alt={article.tieuDe}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <FiClock className="text-secondary" />
                {new Date(article.ngayDang).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <FiEye className="text-secondary" />
                {article.soLuongTruyCap} Views
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {article.tieuDe}
            </h1>
            <p className="text-gray-600 text-sm mb-4">
              {article.noiDungTomTat}
            </p>
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Article Content
              </h3>
              <p className="text-gray-700 leading-relaxed">{article.noiDung}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <img
                  src={article.nhanVien.uriHinhDaiDien}
                  alt={article.nhanVien.tenNhanVien}
                  className="w-6 h-6 rounded-full"
                />
                {article.nhanVien.tenNhanVien}
              </span>
              <span className="text-teal-500">{article.menu}</span>
            </div>
          </div>

          {/* Other Articles */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Other Articles
              </h3>
              {otherArticles.slice(0, 3).map((item) => (
                <Link
                  key={item.maBaiViet}
                  to={`/news/${item.maBaiViet}`}
                  className="block bg-white rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={item.uriHinhAnhMinhHoa}
                    alt={item.tieuDe}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {item.tieuDe}
                  </h4>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                    <FiClock className="text-secondary" />
                    {new Date(item.ngayDang).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <img
                      src={item.nhanVien.uriHinhDaiDien}
                      alt={item.nhanVien.tenNhanVien}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{item.nhanVien.tenNhanVien}</span>
                    <span className="text-secondary">{item.menu}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
