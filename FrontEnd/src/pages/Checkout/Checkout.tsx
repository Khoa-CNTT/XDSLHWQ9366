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
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header section like Cart page */}
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold">Checkout</h1>
          <p className="text-sm text-gray-500 mt-1">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link to="/courses" className="text-blue-600 hover:underline">
              Courses
            </Link>{" "}
            / <span className="text-gray-800">Checkout</span>
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT SIDE - Summary */}
          <div>
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              {cartItems.map((item) => (
                <div
                  key={item.makhoahoc}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{item.tenkhoahoc}</p>
                    <p className="text-sm text-gray-500">{item.malinhvuc}</p>
                  </div>
                  <span className="text-right font-semibold text-gray-800">
                    {item.hocphi.toLocaleString()} VNĐ
                  </span>
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                  >
                    Apply Code
                  </button>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-4">
                  <span>Total:</span>
                  <span>{totalPrice.toLocaleString()} VNĐ</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-lg font-semibold text-green-600">
                    <span>Discount:</span>
                    <span>-{discount.toLocaleString()} VNĐ</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold border-t pt-4">
                  <span>Final Total:</span>
                  <span>{discountedPrice.toLocaleString()} VNĐ</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Payment */}
          <div>
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              {/* QR CODE MOCK */}
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Scan QR to pay</p>
                <div className="bg-gray-200 w-40 h-40 mx-auto rounded-lg flex items-center justify-center">
                  <img src={QR} />
                </div>
              </div>
              {/* BANK ACCOUNT INFO */}
              <div className="space-y-2 text-center">
                <p className="font-semibold text-gray-700">
                  Account Name:{" "}
                  <span className="text-black">NGUYEN HUU THANH</span>
                </p>
                <p className="font-semibold text-gray-700">
                  Bank: <span className="text-black">ACB</span>
                </p>
                <p className="font-semibold text-gray-700">
                  Account Number: <span className="text-black">24048627</span>
                </p>
              </div>
              <button
                onClick={handleConfirmCheckout}
                disabled={isSubmitting}
                className={`w-full bg-primary text-white text-lg py-3 rounded-xl font-semibold hover:bg-secondary transition ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Checkout Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
