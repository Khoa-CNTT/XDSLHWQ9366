import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QR from "../../assets/QR.jpg";

// Define interfaces consistent with Cart and CourseDetail
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

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const rawCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const validCart: Course[] = rawCart.filter(
        (item: Course) =>
          item &&
          typeof item.maKhoaHoc === "string" &&
          typeof item.tenKhoaHoc === "string" &&
          typeof item.linhVuc === "object" &&
          typeof item.hocPhi === "number"
      );
      setCartItems(validCart);
    } catch (error) {
      console.error("Error parsing cart:", error);
      setCartItems([]);
    }
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    return typeof item.hocPhi === "number" ? total + item.hocPhi : total;
  }, 0);

  const discountedPrice = totalPrice - discount;

  const handleApplyPromo = () => {
    if (promoCode === "KM10") {
      setDiscount(totalPrice * 0.1);
    } else {
      alert("Invalid promo code.");
      setDiscount(0);
    }
  };

  const handleConfirmCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      localStorage.removeItem("cart");
      alert("You have successfully registered for the selected courses.");
      navigate("/courses");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900">Checkout</h1>
          <p className="text-sm text-gray-500 mt-1">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link to="/courses" className="text-blue-600 hover:underline">
              Courses
            </Link>{" "}
            / <span className="text-gray-800 font-medium">Checkout</span>
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-gray-400 mb-4 text-4xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No items to checkout
            </h2>
            <p className="text-gray-500 mb-6">
              Your cart is empty. Add some courses to proceed.
            </p>
            <Link
              to="/courses"
              className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Continue browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT - Course Summary */}
            <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Course Summary
              </h2>
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div
                    key={item.maKhoaHoc}
                    className="flex justify-between py-4"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.tenKhoaHoc}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.linhVuc.tenLinhVuc}
                      </p>
                    </div>
                    <span className="text-right font-semibold text-gray-800">
                      {typeof item.hocPhi === "number"
                        ? item.hocPhi.toLocaleString() + " VND"
                        : "N/A"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                </div>

                <div className="text-lg space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{totalPrice.toLocaleString()} VND</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Discount</span>
                      <span>-{discount.toLocaleString()} VND</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold border-t pt-4 text-blue-700">
                    <span>Total</span>
                    <span>{discountedPrice.toLocaleString()} VND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - Payment Section */}
            <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Payment Method
              </h2>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-3">
                  Scan the QR Code to make payment
                </p>
                <div className="bg-gray-100 w-48 h-48 mx-auto rounded-lg shadow-inner flex items-center justify-center border border-gray-300">
                  <img
                    src={QR}
                    alt="QR Code"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="mt-4 bg-gray-50 border rounded-xl p-4 text-sm text-gray-700 text-left">
                  <p>
                    <strong>Transfer Content:</strong> Your Name + Course Name
                  </p>
                  <p>
                    <strong>Example:</strong> Nguyen Van A - Web Design
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-center text-gray-700">
                <p>
                  <span className="font-semibold">Account Name:</span> NGUYEN
                  HUU THANH
                </p>
                <p>
                  <span className="font-semibold">Bank:</span> ACB
                </p>
                <p>
                  <span className="font-semibold">Account Number:</span>{" "}
                  24048627
                </p>
              </div>

              <button
                onClick={handleConfirmCheckout}
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white text-lg py-3 rounded-xl font-semibold hover:bg-blue-700 transition ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
