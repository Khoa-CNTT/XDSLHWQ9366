import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import navItems from "../../constants/navbarData";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
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
        <div>
          <h1 className="font-bold text-2xl">HANTA Elearning</h1>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  onClick={closeNavbar}
                  className={`inline-block px-3 py-2 hover:text-secondary transition duration-200 ${
                    location.pathname === menu.path
                      ? "text-transparent bg-clip-text bg-gradient-to-r bg-primary font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <FiShoppingCart className="text-xl" />
            </Link>
            {isAuthenticated ? (
              <div className="relative" onClick={() => setShowCart(!showCart)}>
                <button className="text-sm font-medium">
                  <FaUser className="text-xl" />
                </button>
                {showCart && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-gray-700 z-50">
                    <ul>
                      <li>
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:text-secondary"
                          onClick={() => setShowCart(false)}
                        >
                          <CgProfile className="text-xl" />
                          Personal information
                        </Link>
                      </li>
                      {/* <li>
                      <Link
                        to="/scores"
                        className="block px-4 py-2 text-sm hover:bg-gray-200"
                        onClick={() => setShowCart(false)}
                      >
                        Xem điểm
                      </Link>
                    </li> */}
                      <li>
                        <button
                          onClick={() => {
                            logout();
                            setShowCart(false);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-primary hover:text-secondary text-left"
                        >
                          <FiLogOut className="text-xl" />
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" className="primary-btn">
                Sign In
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            <IoMdMenu className="text-3xl text-gray-800" />
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
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
              <Link
                to={menu.path}
                onClick={closeNavbar}
                className={`block hover:text-secondary ${
                  location.pathname === menu.path
                    ? "text-transparent bg-clip-text bg-gradient-to-r bg-primary font-semibold"
                    : ""
                }`}
              >
                {menu.title}
              </Link>
            </li>
          ))}
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                closeNavbar();
              }}
              className="mt-4 p-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/signin"
              onClick={closeNavbar}
              className="mt-4 p-2 rounded-md bg-primary text-white text-center"
            >
              Sign In
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
