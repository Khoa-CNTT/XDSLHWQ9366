import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState("");
  const navigate = useNavigate();

  const handleGo = () => {
    if (footerEmail.trim()) {
      navigate(`/contact?email=${encodeURIComponent(footerEmail.trim())}`);
    } else {
      navigate("/contact");
    }
  };
  return (
    <footer className="py-28 bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-4">
          {/* first section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">HANTA Elearning</h1>
            <p className="text-dark2">
              HANTA Elearning is a platform that supports aspiring developers.
              We offer a comprehensive learning experience, from
              beginner-friendly tutorials to advanced programming concepts.
              You'll develop coding skills, build real-world projects, and
              prepare for a successful tech career.
            </p>
          </div>
          {/* second section */}
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Courses</h1>
              <div className="text-dark2">
                <ul className="space-y-2 text-lg">
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Web programming
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Mobile programming
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    SQL
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    DevOps
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    Computer Networking
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Links</h1>
              <div className="text-dark2">
                <ul className="space-y-2 text-lg">
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    <Link to="/exam-schedule">Exam Schedule</Link>
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                    <Link to="/news">New</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* third section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">Get In Touch</h1>
            <div className="flex items-center">
              <input
                type="text"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                placeholder="Enter your email"
                className="p-3 rounded-s-xl bg-white w-full py-4 focus:ring-0 focus:outline-none placeholder:text-dark2"
              />
              <button
                className="bg-primary text-white font-semibold py-4 px-6 rounded-e-xl"
                onClick={handleGo}
                type="button"
              >
                Go
              </button>
            </div>
            {/* social icons */}
            <div className="flex space-x-6 py-3">
              <a href="https://www.facebook.com/idioms632">
                <FaFacebook className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
              <a href="https://www.instagram.com/huxtah/">
                <FaInstagram className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
              <a href="">
                <FaYoutube className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
              <a href="https://www.tiktok.com/@huxtah_">
                <FaTiktok className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
