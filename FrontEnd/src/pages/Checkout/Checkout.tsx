import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QR from "../../assets/QR.jpg";

interface Course {
  makhoahoc: string;
  tenkhoahoc: string;
  malinhvuc: string;
  sobuoi: number;
  hocphi: number;
  noidungtomtatkhoahoc: string;
  noidungkhoahoc: string;
  ghichu: string;
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.hocphi, 0);
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
        {/* Header */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT - Summary */}
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Course Summary
            </h2>
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.makhoahoc} className="flex justify-between py-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.tenkhoahoc}
                    </p>
                    <p className="text-sm text-gray-500">{item.malinhvuc}</p>
                  </div>
                  <span className="text-right font-semibold text-gray-800">
                    {item.hocphi.toLocaleString()} VNĐ
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
                  <span>{totalPrice.toLocaleString()} VNĐ</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-{discount.toLocaleString()} VNĐ</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold border-t pt-4 text-blue-700">
                  <span>Total</span>
                  <span>{discountedPrice.toLocaleString()} VNĐ</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Payment */}
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

              {/* Bank transfer instruction */}
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
                <span className="font-semibold">Account Name:</span> NGUYEN HUU
                THANH
              </p>
              <p>
                <span className="font-semibold">Bank:</span> ACB
              </p>
              <p>
                <span className="font-semibold">Account Number:</span> 24048627
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
      </div>
    </div>
  );
};

export default Checkout;
