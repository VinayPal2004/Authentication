import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgsignup from "../assets/bg.png";
import logo from "../assets/servicehub.png";
import { AuthDataContext } from "../context/Authcontext.jsx";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/Usercontext.jsx";

function Registeration() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { getCurrentUser } = useContext(userDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const { serverUrl } = useContext(AuthDataContext);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password, role },
        { withCredentials: true }
      );

      toast.success("Registration successful!");
      await getCurrentUser();

      setTimeout(() => {
        const userRole = response.data.user.role;

        if (userRole === "provider") {
          navigate("/provider");
        } else {
          navigate("/user");
        }
      }, 1000);

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">

      {/* LEFT IMAGE */}
      <div
        className="hidden md:flex w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${bgsignup})` }}
      >

        {/* BLEND OVERLAY */}
        <div className="absolute inset-0 "></div>

        <div className="relative z-10 flex items-center justify-center w-full">
        </div>

      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-4 py-10 md:px-6">

        <div className="bg-slate-900/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-md">

          {/* LOGO */}
          <img
            className="mx-auto h-16 md:h-20 mb-4"
            src={logo}
            alt="ServiceHub Logo"
          />

          <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* NAME */}
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200 outline-none"
            />

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200 outline-none"
            />

            {/* PASSWORD */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200 outline-none"
              />

              <span
                className="absolute right-4 top-3 cursor-pointer text-gray-400 text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>

            </div>

            {/* ROLE */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200 outline-none"
            >
              <option value="user">User</option>
              <option value="provider">Service Provider</option>
            </select>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            {/* LOGIN LINK */}
            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>

          </form>

        </div>

      </div>

      <ToastContainer />
    </div>
  );
}

export default Registeration;