import React from "react";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Mock data for email and password
  const mockData = {
    email: "user@gmail.com",
    password: "123456",
    token: "mockToken12345", // Simulated token
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulating a mock login check
    if (email === mockData.email && password === mockData.password) {
      // Simulate successful login
      const token = mockData.token;
      login(token);
      navigate("/"); // Redirect to homepage on successful login
    } else {
      alert("Đăng nhập thất bại!"); // Show error message if credentials don't match
    }
  };

  return (
    <div className="w-full min-h-screen pt-[6ch] flex items-center justify-center">
      <div className="max-w-md w-full bg-neutral-50 border-neutral-200 shadow-sm space-y-8 rounded-xl p-8">
        <div className="space-y-1.5">
          <h1 className="text-2xl text-neutral-800 font-bold">Sign In</h1>
          <p className="text-sm text-neutral-600 font-normal">
            Sign in to your account.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm text-neutral-600 font-medium block"
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="max-w-sm w-full rounded-lg px-3 h-12 bg-transparent focus:bg-sky-500/5 border border-neutral-300 focus:border-sky-500 outline-none ease-in-out duration-300"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm text-neutral-600 font-medium block"
            >
              Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="max-w-sm w-full rounded-lg px-3 h-12 bg-transparent focus:bg-sky-500/5 border border-neutral-300 focus:border-sky-500 outline-none ease-in-out duration-300"
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

          <div className="flex items-center justify-between gap-2 mt-1 w-full px-1">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rememberme" className="w-4 h-4" />
              <label
                htmlFor="rememberme"
                className="text-sm text-neutral-600 font-medium"
              >
                Remember Me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-primary font-medium hover:text-secondary transition duration-200"
            >
              Forgot Password ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg h-12 px-8 cursor-pointer primary-btn"
          >
            Sign In
          </button>

          <div className="w-full flex items-center justify-center">
            <div className="w-full border border-neutral-200"></div>
            <span className="text-sm text-neutral-700 font-medium whitespace-nowrap">
              Or Sign In with
            </span>
            <div className="w-full border border-neutral-200"></div>
          </div>

          <div className="w-full flex items-center justify-center gap-6">
            <button className="w-full rounded-lg py-2 px-4 bg-transparent hover:bg-neutral-100 cursor-pointer border border-neutral-300 text-neutral-700 flex items-center justify-center gap-x-2 ease-in-out duration-300">
              <FaGoogle size={16} />
              Google
            </button>
            <button className="w-full rounded-lg py-2 px-4 bg-transparent hover:bg-neutral-100 cursor-pointer border border-neutral-300 text-neutral-700 flex items-center justify-center gap-x-2 ease-in-out duration-300">
              <FaGithub size={16} />
              Github
            </button>
          </div>

          <div className="w-full flex items-center justify-center gap-x-2">
            <p className="text-sm text-neutral-600 font-medium">
              Don't have an account?
            </p>
            <Link to="/signup" className="text-sm text-neutral-800 font-medium">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
