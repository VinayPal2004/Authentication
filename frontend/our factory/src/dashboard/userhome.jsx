import React, { useState, useContext } from "react";
import logo from "../assets/servicehub.png";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { userDataContext } from "../context/Usercontext";


function UserHome() {
  const services = [
    { name: "Electrician", icon: "⚡" },
    { name: "Plumber", icon: "🔧" },
    { name: "Cleaning", icon: "🧹" },
    { name: "AC Repair", icon: "❄️" },
    { name: "Painter", icon: "🎨" },
    { name: "Carpenter", icon: "🪚" }
  ];

 const navigate = useNavigate();
 const [open , setOpen] = useState(false);
 const {userData} = useContext(userDataContext)
 console.log("userData",userData);
 

  

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white relative">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1
            className="text-xl font-bold text-blue-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            ServiceHub
          </h1>
        </div>

        <div className="flex gap-6 items-center relative">
          <button className="hover:text-blue-400">Home</button>
          <button className="hover:text-blue-400">My Bookings</button>

          {/* Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer"
            >
               {userData?.name ? userData.name.charAt(0).toUpperCase() : <CgProfile/>}
            </button>

            { open &&(
              <div className="absolute right-0 mt-3 w-44 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => navigate("/user/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                >
                  View Profile
                </button>
                <button
                  onClick={() => navigate("/user/edit-profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate("/my-bookings")}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                >
                  My Bookings
                </button>
                <button
                 onClick={() => {
                localStorage.removeItem("token")
                navigate("/login")

                  }}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800"
                >
                  Logout
                </button>
              </div>
            )} 
          </div>

          <button
            onClick={() => {
             
              navigate("/login");
            }}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">Find Trusted Home Services</h1>
        <p className="text-gray-300 mb-8">
          Book electricians, plumbers, cleaners and more in minutes
        </p>

        <input
          type="text"
          placeholder="Search service..."
          className="w-full max-w-lg px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-gray-200"
        />
      </section>

      {/* Services Section */}
      <section className="px-10 pb-20">
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-400">
          Popular Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-900 p-6 rounded-xl text-center hover:bg-slate-800 cursor-pointer transition"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-semibold">{service.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-slate-800 text-gray-400">
        © 2026 ServiceHub. All rights reserved.
      </footer>
    </div>
  );
}

export default UserHome;