import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaiKhoanData } from "../../hooks/useTaiKhoanData";
import { useAuth } from "./useAuth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const { taiKhoans } = useTaiKhoanData();

  const handleSignIn = async () => {
    const user = taiKhoans.find(
      (u) => u.tenDangNhap === email && u.matKhau === password
    );

    if (user) {
      login(user.tenDangNhap, user.quyen, user.tenNguoiDung);
      navigate("/");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-neutral-50 shadow-sm rounded-xl p-8">
        <h1 className="text-2xl font-bold">Đăng nhập</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mt-4"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mt-4"
        />
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default SignIn;
