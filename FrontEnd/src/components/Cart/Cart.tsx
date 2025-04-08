import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

const products = [
  {
    id: 1,
    name: "Java Fullstack Developer",
    price: 111,
    img: "https://cdn.bap-software.net/2024/01/03211643/How-is-AI-applied-to-Java-programming-e1704266486769.jpg",
    desc: "Fullstack khóa học chuyên sâu với Java Spring Boot và ReactJS.",
  },
  {
    id: 2,
    name: "ReactJS Tutorial",
    price: 222,
    img: "https://miro.medium.com/v2/resize:fit:1200/0*iDyUUc_sCpMxiD0t.jpeg",
    desc: "Hướng dẫn từ cơ bản đến nâng cao ReactJS.",
  },
];

const FadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } },
});

interface ShoppingCartProps {
  onClose: () => void;
}

export default function ShoppingCart({ onClose }: ShoppingCartProps) {
  const [cart, setCart] = useState(products.map((p) => ({ ...p, qty: 1 })));
  const [deliveryMethod, setDeliveryMethod] = useState("home");
  const [discount, setDiscount] = useState(0);
  const [voucher, setVoucher] = useState("");

  const updateQuantity = (id: number, change: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const applyVoucher = () => {
    if (voucher.toLowerCase() === "hanta10") {
      setDiscount(10); // 10 discount
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = deliveryMethod === "home" ? 4.99 : 0;
  const total = (subtotal + shipping - discount).toFixed(2);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        exit={{ x: 500 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg p-5 z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          {/* Icon + Text */}
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <FiShoppingCart className="text-xl text-primary" />
            <span>Your Cart</span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <MdCancel className="text-2xl text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="mt-4 space-y-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <motion.div
                key={item.id}
                variants={FadeUp(0.2 + index * 0.1)}
                initial="initial"
                animate="animate"
                className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg hover:bg-white duration-300 hover:shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                  <p className="text-gray-600 mt-1">
                    {item.price.toFixed(2)} VND
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.qty}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Summary Section */}
        {cart.length > 0 && (
          <div className="mt-6 space-y-4">
            {/* Delivery */}
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-md font-semibold mb-2">Delivery Method</h3>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="home"
                  checked={deliveryMethod === "home"}
                  onChange={() => setDeliveryMethod("home")}
                />
                Home Delivery (4.99)
              </label>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  name="delivery"
                  value="click"
                  checked={deliveryMethod === "click"}
                  onChange={() => setDeliveryMethod("click")}
                />
                Click & Collect (Free)
              </label>
            </div>

            {/* Voucher */}
            <div className="flex gap-2">
              <input
                type="text"
                className="border rounded px-3 py-1 w-full"
                placeholder="Enter voucher code"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
              />
              <button
                onClick={applyVoucher}
                className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
              >
                Apply
              </button>
            </div>

            {/* Price Summary */}
            <div className="p-4 bg-gray-100 rounded-lg text-sm space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{subtotal.toFixed(2)} VND</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>
                  {shipping > 0 ? `${shipping.toFixed(2)} VND` : "Free"}
                </span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discount:</span>
                <span>{discount.toFixed(2)} VND</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>{total} VND</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="primary-btn flex items-center justify-center w-full"
            >
              Proceed to Checkout
            </motion.button>

            <button
              onClick={onClose}
              className="w-full text-center mt-2 text-gray-600 hover:text-black underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
