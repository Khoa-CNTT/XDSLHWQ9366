import { useState, ChangeEvent, FormEvent } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaEnvelope, FaLocationArrow } from "react-icons/fa6";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Sending", formData);
    alert("Message sent!");
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-4 md:px-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10 py-10">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">Contact our team</h1>
          <p className="text-sm text-gray-600 mt-2 max-w-2xl mx-auto">
            Got any questions about the product or scaling on our platform?
            We're here to help. Chat to our friendly team 24/7 and get onboard
            in less than 5 minutes.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="you@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
            <textarea
              name="message"
              placeholder="Leave us a message..."
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />

            <button
              type="submit"
              className="bg-primary text-white py-3 rounded-lg w-full font-semibold hover:bg-secondary"
            >
              Send message
            </button>
          </form>

          {/* Info Section */}
          <div className="space-y-8 text-sm">
            <div>
              <h3 className="text-base font-semibold">Chat with us</h3>
              <div className="mt-2 space-y-2 text-blue-600">
                <div className="flex items-center gap-2">
                  <FaFacebook />
                  <a
                    href="https://www.facebook.com/idioms632"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Message us on Facebook
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope />
                  <a
                    href="mailto:support@example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shoot us an email
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold">Call us</h3>
              <p className="mt-2">Call our team Mon-Fri from 8am to 5pm.</p>
              <p className="text-blue-600 flex items-center gap-2 mt-1">
                <FaPhoneAlt /> +84 0327 908 007
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold">Visit us</h3>
              <p className="mt-2">Chat to us in person at our Da Nang.</p>
              <a
                href="https://maps.app.goo.gl/UCH3wA49oSKeEHoq7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 flex items-center gap-2 mt-1"
              >
                <FaLocationArrow /> 03 Quang Trung, Hải Châu, Đà Nẵng
              </a>
            </div>
            <div>
              <h3 className="text-base font-semibold">Social network</h3>
              <div className="flex space-x-6 py-3 text-blue-600">
                <a
                  href="https://www.instagram.com/huxtah/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="cursor-pointer  hover:scale-105 duration-200" />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="cursor-pointer  hover:scale-105 duration-200" />
                </a>
                <a
                  href="https://www.tiktok.com/@huxtah_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok className="cursor-pointer  hover:scale-105 duration-200" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
