import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from '../assets/bg.png'
import ourbuilder from '../assets/ourbuilder.png'
import {AuthDataContext} from '../context/Authcontext.jsx'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";    

function Login () {
  const [showPassword, setShowPassword] = useState(false);
 
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const{serverUrl} = useContext(AuthDataContext);
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
    } catch (error) {
      
      toast.error("Login failed!");
    } finally {
        setLoading(false);
    }
  }
    
  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: `url(${bg})` }}>
        <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-lg w-full max-w-md ml-120 ">

           <img  className="mx-auto h-40 " src={ourbuilder} alt="Our Builder" />
            <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Login </h2>
            <form onSubmit={handleLogin}>
               
            <div className="mb-2">

             <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                    Email
                  </label>
                  <input
              type="text"
              placeholder="Enter your email"
              onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
              className="w-full px-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base font-medium bg-white/5 text-grey-700"
            />
            </div>

            <div className="mb-2 relative">

             <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                    Password
                  </label>
                  <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e)=>{setPassword(e.target.value)}}
              value={password}
              className="w-full px-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base font-medium bg-white/5 text-grey-700"
            />
            <span
              className="absolute right-6 top-12 cursor-pointer text-grey text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
            </div>
            
            
            
            
               
                <button className="w-full bg-[#0077b6] text-white font-bold py-3 px-4 rounded-3xl hover:bg-[#005f87] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                type='submit'>Login</button>

                 <p className="text-sm text-black/80 text-center mb-4">
            Don't have an account?{" "}
            <span
              className="text-purple-400 cursor-pointer"
              onClick={()=>{navigate('/signup')
              }}
            >
              signup
            </span>
          </p>

          {/* Google Register */}
          <button
            type="button"
           
            className="w-full bg-white text-black py-3 rounded-3xl flex items-center justify-center gap-3 font-semibold hover:bg-gray-200"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
              </form>
              <ToastContainer />
            </div>
      
    </div>
  )
}

export default Login