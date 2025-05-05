import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

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

const Cart = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const removeFromCart = (makhoahoc: string) => {
    const updatedCart = cartItems.filter(
      (item) => item.makhoahoc !== makhoahoc
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.hocphi, 0);

  return (
    <div className="min-h-screen bg-white text-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold">Your Cart</h1>
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
          <p className="text-center text-gray-500 text-lg">
            Your cart is empty.{" "}
            <Link to="/courses" className="text-blue-600 hover:underline">
              Browse courses
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.makhoahoc}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border border-gray-200 rounded-xl shadow-sm"
              >
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-xl font-semibold text-secondary">
                    {item.tenkhoahoc}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sessions: {item.sobuoi} | Fee:{" "}
                    {item.hocphi.toLocaleString()} VNĐ
                  </p>
                  <p className="text-sm text-gray-600">
                    Field: {item.malinhvuc}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold">
                    {item.hocphi.toLocaleString()} VNĐ
                  </span>
                  <button
                    onClick={() => removeFromCart(item.makhoahoc)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 p-6 border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold">
                Total: {totalPrice.toLocaleString()} VNĐ
              </h3>
              <Link
                to="/checkout"
                className="block w-full sm:w-auto mt-4 bg-primary text-white text-center py-3 px-6 rounded-lg font-medium text-lg hover:bg-secondary transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
