import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.module.css"; // Import CSS nếu có

const Login = () => {
  const [email, setEmail] = useState(""); // Lưu email
  const [password, setPassword] = useState(""); // Lưu mật khẩu
  const navigate = useNavigate(); // Chuyển hướng

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn tải lại trang

    // Kiểm tra đăng nhập giả lập
    if (email === "admin@example.com" && password === "123456") {
      alert("Đăng nhập thành công!");
      navigate("/dashboard"); // Chuyển đến trang dashboard
    } else {
      alert("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
    </div>
  );
};

export default Login;
