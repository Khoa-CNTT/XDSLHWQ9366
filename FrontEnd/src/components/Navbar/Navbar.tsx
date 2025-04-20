import { FiShoppingCart } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import ShoppingCart from "../Cart/Cart";
import { useEffect, useState } from "react";
import navItems from "../../constants/navbarData";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-4 px-4 flex justify-between items-center"
      >
        {/* Logo section */}
        <div>
          <h1 className="font-bold  text-2xl">HANTA Elearning</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((menu) => (
              <li key={menu.id} className="cursor-pointer">
                <a
                  href={menu.path}
                  onClick={closeNavbar}
                  className={`inline-block px-3 py-2 hover:text-secondary transition duration-200 ${
                    location.pathname === menu.path
                      ? "text-transparent bg-clip-text bg-gradient-to-r bg-primary font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {menu.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Cart and Auth Buttons */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => setShowCart(!showCart)}
            >
              <FiShoppingCart className="text-xl" />
            </button>
            <Link to="/signin" className="primary-btn">
              Sign in
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            <IoMdMenu className="text-3xl text-gray-800" />
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 sm:w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">HANTA Elearning</h2>
          <button onClick={toggleNavbar}>
            <IoMdClose className="text-2xl text-red-500" />
          </button>
        </div>

        <ul className="flex flex-col gap-6 p-6 text-lg text-gray-700">
          {navItems.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.path}
                onClick={closeNavbar}
                className={`block hover:text-secondary ${
                  location.pathname === menu.path
                    ? "text-transparent bg-clip-text bg-gradient-to-r bg-primary font-semibold"
                    : ""
                }`}
              >
                {menu.title}
              </a>
            </li>
          ))}
          <button
            className="mt-4 p-2 rounded-md bg-gradient-to-tr bg-primary hover:bg-secondary text-white font-semibold"
            onClick={() => {
              closeNavbar();
              setShowCart(true);
            }}
          >
            Open Cart
          </button>
        </ul>
      </div>

      {/* Cart Component */}
      {showCart && <ShoppingCart onClose={() => setShowCart(false)} />}
    </nav>
  );
};

export default Navbar;
// Compare this snippet from src/components/Navbar/Navbar.tsx:
