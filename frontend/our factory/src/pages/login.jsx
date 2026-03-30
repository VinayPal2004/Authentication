import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bglogin from "../assets/login.png";
import logo from "../assets/servicehub.png";
import { AuthDataContext } from "../context/Authcontext.jsx";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/Usercontext.jsx";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login successful!");
      await getCurrentUser();

      setTimeout(() => {
        const role = response.data.user.role;

        if (role === "provider") {
          navigate("/provider");
        } else {
          navigate("/user");
        }
      }, 1000);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">

      {/* LEFT IMAGE SECTION */}
      <div
        className="hidden md:flex w-1/2 relative bg-cover bg-center bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900bg-no-repeat"
        style={{ backgroundImage: `url(${bglogin})` }}
      >

        {/* 🔥 BLENDED OVERLAY (MAIN FIX) */}
        <div className="absolute inset-0 "></div>

        {/* extra depth layer */}
        <div className="absolute inset-0 "></div>

        {/* optional content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white px-12">
        </div>

      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-4 md:px-6">

        <div className="bg-slate-900/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-md">

          {/* LOGO */}
          <img className="mx-auto h-16 md:h-20 mb-4" src={logo} alt="ServiceHub" />

          <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200 outline-none"
            />

            {/* PASSWORD */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200 outline-none"
              />

              <span
                className="absolute right-4 top-3 cursor-pointer text-gray-400 text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* SIGNUP */}
            <p className="text-sm text-gray-400 text-center">
              Don't have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </p>

            {/* GOOGLE LOGIN */}
            <button
              type="button"
              className="w-full bg-white text-black py-3 rounded-xl flex items-center justify-center gap-3 font-semibold hover:bg-gray-200"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                className="w-5 h-5"
                alt="google"
              />
              Continue with Google
            </button>

          </form>

        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;