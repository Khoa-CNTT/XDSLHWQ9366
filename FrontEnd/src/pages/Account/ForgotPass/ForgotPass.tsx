import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await axios.post("/api/forgot-password", { email });
      setMessage(res.data.message || "Reset link sent!");
      setStatus("success");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Something went wrong");
      } else {
        setMessage("An unexpected error occurred");
      }
      setStatus("error");
    }
  };

  return (
    <div className="w-full min-h-screen pt-[6ch] flex items-center justify-center">
      <div className="max-w-md w-full bg-neutral-50 border border-neutral-200 shadow-sm space-y-8 rounded-xl p-8">
        <div className="space-y-1.5">
          <h1 className="text-2xl text-neutral-800 font-bold">
            Forgot Password
          </h1>
          <p className="text-sm text-neutral-600 font-normal">
            Enter your email and we’ll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm text-neutral-600 font-medium block"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="max-w-sm w-full rounded-lg px-3 h-12 bg-transparent focus:bg-sky-500/5 border border-neutral-300
               focus:border-sky-500 outline-none ease-in-out duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg h-12 px-8 cursor-pointer primary-btn"
          >
            {status === "loading" ? "Sending..." : "Send Reset Link"}
          </button>

          {status !== "idle" && (
            <p
              className={`text-sm ${
                status === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="w-full flex items-center justify-center gap-x-2">
            <p className="text-sm text-neutral-600 font-medium">
              Remember your password?
            </p>
            <Link to="/signin" className="text-sm text-neutral-800 font-medium">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
