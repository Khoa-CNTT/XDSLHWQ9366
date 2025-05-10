import { useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { MdArrowBack, MdDelete, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

// Định nghĩa interface cho dữ liệu khóa học (đồng bộ với CourseDetail)
interface LinhVuc {
  maLinhVuc: string;
  tenLinhVuc: string;
}

interface Course {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  hocPhi: number;
  linhVuc: LinhVuc;
  soBuoi: number;
  noiDungTomTatKhoaHoc?: string;
  noiDungKhoaHoc?: string;
  ghiChu?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);

  // Safe formatter for currency
  const formatCurrency = (value?: number) =>
    typeof value === "number" ? value.toLocaleString() : "0";

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      const parsed = JSON.parse(stored || "[]");

      // Validate that parsed is an array of courses
      if (Array.isArray(parsed)) {
        const validCourses = parsed.filter(
          (item) =>
            item &&
            typeof item.maKhoaHoc === "string" &&
            typeof item.hocPhi === "number"
        );
        setCartItems(validCourses);
      } else {
        console.warn("Cart data is not an array:", parsed);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      setCartItems([]);
    }
  }, []);

  // Remove course
  const removeFromCart = (maKhoaHoc: string) => {
    const updatedCart = cartItems.filter(
      (item) => item.maKhoaHoc !== maKhoaHoc
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Total price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (typeof item.hocPhi === "number" ? item.hocPhi : 0),
    0
  );

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold">Cart</h1>
          <p className="text-sm text-gray-500 mt-1">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link to="/courses" className="text-blue-600 hover:underline">
              Courses
            </Link>{" "}
            / <span className="text-gray-800">Cart</span>
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-gray-400 mb-4 text-4xl">
              <MdShoppingCart />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              You haven't added any courses yet.
            </p>
            <Link
              to="/courses"
              className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <MdArrowBack /> Continue browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Courses in Cart ({cartItems.length})
                </h2>
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div
                      key={item.maKhoaHoc}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {item.tenKhoaHoc}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {item.linhVuc.tenLinhVuc || "Unknown"}
                          </span>
                          <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                            {item.soBuoi} sessions
                          </span>
                        </div>
                        {item.noiDungTomTatKhoaHoc && (
                          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                            {item.noiDungTomTatKhoaHoc}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-gray-900">
                          {formatCurrency(item.hocPhi)} VND
                        </span>
                        <button
                          onClick={() => removeFromCart(item.maKhoaHoc)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                          aria-label="Remove course"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    to="/courses"
                    className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
                  >
                    <MdArrowBack /> Continue shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Courses</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Total Sessions</span>
                    <span>
                      {cartItems.reduce(
                        (total, item) => total + (item.soBuoi || 0),
                        0
                      )}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between font-semibold text-lg">
                    <span>Total Payment</span>
                    <span className="text-blue-600">
                      {formatCurrency(totalPrice)} VND
                    </span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-700 mb-2">
                    Additional Information
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>Lifetime access support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>7-day money-back guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
