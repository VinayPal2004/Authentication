import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bglogin from '../assets/login.png'
import logo from '../assets/servicehub.png'
import {AuthDataContext} from '../context/Authcontext.jsx'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";   
import { userDataContext } from "../context/Usercontext.jsx"; 

function Login () {
  const [showPassword, setShowPassword] = useState(false);
  // const {getCurrentUser} = useContext(UserDataContext)
 
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const{serverUrl} = useContext(AuthDataContext);
  const {getCurrentUser} = useContext(userDataContext)
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill the all fields");
      return;
    }
    try {
        setLoading(true);
      const response = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password
      }
      ,{withCredentials:true});
       console.log(response.data);
     
      toast.success("Login successful!");
      getCurrentUser()
      
      
       

setTimeout(() => {
  const role = response.data.user.role;

  if(role === "provider"){
    navigate("/provider");
  } else {
    navigate("/user");
  }
}, 1500);
      
    } catch (error) {
      
      toast.error("Login failed!");
    } finally {
        setLoading(false);
    }
  }
    
  return (
<div className="min-h-screen flex bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">

  {/* LEFT IMAGE SECTION */}
  <div
    className="hidden md:flex w-1/2 relative bg-cover bg-center"
    style={{ backgroundImage: `url(${bglogin})` }}
  >

    {/* Dark overlay */}
    <div className="absolute inset-0bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900"></div>

    <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-12">

     
     

    </div>

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
        Login
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200"
        />

        {/* Password */}
        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-200"
          />

          <span
            className="absolute right-4 top-3 cursor-pointer text-gray-400 text-xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </span>

        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-sm text-gray-400 text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={()=>navigate('/signup')}
          >
            Signup
          </span>
        </p>

        {/* Google Login */}
        <button
          type="button"
          className="w-full bg-white text-black py-3 rounded-xl flex items-center justify-center gap-3 font-semibold hover:bg-gray-200"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
            className="w-5 h-5"
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

export default Login