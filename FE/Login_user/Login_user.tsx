import React, { useState } from 'react';
import './Login_user.css';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi dữ liệu đăng nhập tại đây
    console.log('Login form:', form);
  };

  return (
    <div className="form-container">
      <h2>ĐĂNG NHẬP</h2>
      <form onSubmit={handleSubmit}>
        <label>Email/ID (Tài khoản Beekids) *</label>
        <input name="email" value={form.email} onChange={handleChange} required />

        <label>Mật khẩu *</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <div className="options">
          <label><input type="checkbox" /> Nhập mã khôi phục mật khẩu</label>
          <span className="forgot-password">Quên mật khẩu?</span>
        </div>

        <button type="submit">ĐĂNG NHẬP</button>
      </form>
      <p>Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay!</a></p>
    </div>
  );
};

export default Login;
