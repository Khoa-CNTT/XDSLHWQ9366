import { useState } from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  examName: string;
}

const RegisterModal = ({ isOpen, onClose, examName }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    fullname: "",
    gender: "Male",
    dob: "",
    cccd: "",
    phone: "",
    email: "",
    address: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      fullname: "",
      gender: "Male",
      dob: "",
      cccd: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register for:", examName);
    console.log("Form data:", formData);
    alert("Registration successful!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black font-bold text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          REGISTER FOR CERTIFICATE EXAM
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded-md px-4 py-2"
            required
          />

          <div className="flex gap-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-1/2 border rounded-md px-4 py-2"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-1/2 border rounded-md px-4 py-2"
              required
            />
          </div>

          <input
            type="text"
            name="cccd"
            value={formData.cccd}
            onChange={handleChange}
            placeholder="Identification Number"
            className="w-full border rounded-md px-4 py-2"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border rounded-md px-4 py-2"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-md px-4 py-2"
          />

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border rounded-md px-4 py-2"
            rows={3}
          />

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="w-1/2 bg-primary text-white py-3 rounded-md font-semibold hover:bg-secondary transition"
            >
              REGISTER
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-1/2 bg-secondary text-white py-3 rounded-md font-semibold hover:bg-primary transition"
            >
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
