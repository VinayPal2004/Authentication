import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgsignup from "../assets/bg.png";
import logo from "../assets/servicehub.png";
import { AuthDataContext } from "../context/Authcontext.jsx";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Registeration() {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
        {
          name,
          email,
          password,
          role,
        },
        { withCredentials: true }
      );

      toast.success("Registration successful!");
      console.log(response.data);
      

setTimeout(() => {
  const role = response.data.user.role;

  if(role === "provider"){
    navigate("/provider");
  } else {
    navigate("/user");
  }
}, 1500);
      

    } catch (error) {
      if(error.response.data.message){
        toast.error(error.response.data.message);
      }
      else{
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">

      {/* LEFT IMAGE SECTION */}
     <div
  className="hidden md:flex w-1/2 items-center justify-center 
 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900bg-no-repeat bg-center bg-contain"
  style={{ backgroundImage: `url(${bgsignup})` }}
>
</div>


      {/* RIGHT FORM SECTION */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">

        <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-md">

          <img
            className="mx-auto h-20 mb-4"
            src={logo}
            alt="ServiceHub Logo"
          />

          <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name */}
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200"
            />

            {/* Password */}
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200"
              />

              <span
                className="absolute right-4 top-3 cursor-pointer text-gray-400 text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>

            </div>

            {/* Role */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200"
            >
              <option value="user">User</option>
              <option value="provider">Service Provider</option>
            </select>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

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