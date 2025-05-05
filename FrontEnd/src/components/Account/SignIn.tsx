import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (email === "admin@gmail.com" && password === "123456") {
      login("example-token", email); // Lưu token và email vào context
      navigate("/"); // Điều hướng đến trang chủ
    } else {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-neutral-50 shadow-sm rounded-xl p-8">
        <h1 className="text-2xl font-bold">Sign In</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mt-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mt-4"
        />
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
