import React from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext";
const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const { notify } = useNotification();
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/taikhoan/register",
        {
          tenTaiKhoan: username,
          matKhau: password,
        }
      );

      if (response.data.status === 200) {
        notify("success", "Đăng ký thành công!");
        console.log("Tài khoản:", response.data.data);
      } else {
        notify("error", "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      notify("error", "Lỗi khi đăng ký tài khoản!");
    }
  };

  return (
    <div className="w-full min-h-screen pt-[6ch] flex items-center justify-center">
      <div className="max-w-md w-full bg-neutral-50 border-neutral-200 shadow-sm space-y-8 rounded-xl p-8">
        <div className="space-y-1.5">
          <h1 className="text-2xl text-neutral-800 font-bold">Sign Up</h1>
          <p className="text-sm text-neutral-600 font-normal">
            Create an account to get started.
          </p>
        </div>
        <div className="space-y-6">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-sm text-neutral-600 font-medium block">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="max-w-sm w-full rounded-lg px-3 h-12 bg-transparent focus:bg-sky-500/5 border border-neutral-300
               focus:border-sky-500 outline-none ease-in-out duration-300 "
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm text-neutral-600 font-medium block">
              Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="max-w-sm w-full rounded-lg px-3 h-12 bg-transparent focus:bg-sky-500/5 border border-neutral-300
               focus:border-sky-500 outline-none ease-in-out duration-300 "
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
              </button>
            </div>
          </div>

          {/* SignUp Button */}
          <button
            className="w-full rounded-lg h-12 px-8 cursor-pointer primary-btn"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          {/* Or */}
          <div className="w-full flex items-center justify-center ">
            <div className="w-full border border-neutral-200"></div>
            <span className="text-sm text-neutral-700 font-medium whitespace-nowrap">
              Or Sign Up with
            </span>
            <div className="w-full border border-neutral-200"></div>
          </div>

          {/* OAuth SignUp */}
          <div className="w-full flex items-center justify-center gap-6">
            <button className="w-full rounded-lg py-2 px-4 bg-transparent hover:bg-neutral-100 cursor-pointer border border-neutral-300 text-neutral-700 flex items-center justify-center gap-x-2 ease-in-out duration-300 ">
              <FaGoogle size={16} />
              Google
            </button>
            <button className="w-full rounded-lg py-2 px-4 bg-transparent hover:bg-neutral-100 cursor-pointer border border-neutral-300 text-neutral-700 flex items-center justify-center gap-x-2 ease-in-out duration-300 ">
              <FaGithub size={16} />
              Github
            </button>
          </div>

          {/* Sign In Link */}
          <div className="w-full flex items-center justify-center gap-x-2">
            <p className="text-sm text-neutral-600 font-medium">
              Already have an account?
            </p>
            <Link to="/signin" className="text-sm text-neutral-800 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
