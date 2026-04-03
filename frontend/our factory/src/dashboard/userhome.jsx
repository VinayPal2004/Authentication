import React, { useState, useContext } from "react";
import logo from "../assets/servicehub.png";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/Usercontext";
import { AuthDataContext } from "../context/Authcontext.jsx";

function UserHome() {
  const { serverUrl } = useContext(AuthDataContext);
  const services = [
    { name: "Electrician", icon: "⚡" },
    { name: "Plumber", icon: "🔧" },
    { name: "Cleaning", icon: "🧹" },
    { name: "AC Repair", icon: "❄️" },
    { name: "Painter", icon: "🎨" },
    { name: "Carpenter", icon: "🪚" }
  ];

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { userData } = useContext(userDataContext);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 md:px-10 py-4 border-b border-slate-800">

        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} className="h-8 md:h-10" />
          <h1 className="text-lg md:text-xl font-bold text-blue-400">
            ServiceHub
          </h1>
        </div>

        {/* RIGHT MENU */}
        <div className="flex items-center gap-3 md:gap-6 relative">

          <button className="hidden md:block hover:text-blue-400">
            Home
          </button>

          <button className="hidden md:block hover:text-blue-400"
            onClick={() => navigate("/mybookings")}
          >
            My Bookings
          </button>

          {/* PROFILE */}
          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center"
            >
              {userData?.avatar ? (
                <img
                  src={`${serverUrl}/uploads/${userData.avatar}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold">
                  {userData?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50">

                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                >
                  View Profile
                </button>

                <button
                  onClick={() => navigate("/useredit")}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => navigate("/mybookings")}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                >
                  My Bookings
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-12 md:py-20 px-4">

        <h1 className="text-2xl md:text-5xl font-bold mb-4">
          Find Trusted Home Services
        </h1>

        <p className="text-gray-300 mb-6 md:mb-8 text-sm md:text-base">
          Book electricians, plumbers, cleaners and more in minutes
        </p>

        <input
          type="text"
          placeholder="Search service..."
          className="w-full max-w-md md:max-w-lg px-4 md:px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-gray-200"
        />
      </section>

      {/* SERVICES */}
      <section className="px-4 md:px-10 pb-16 md:pb-20">

        <h2 className="text-xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-blue-400">
          Popular Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-900 p-4 md:p-6 rounded-xl text-center hover:bg-slate-800 cursor-pointer transition"
              onClick={() => {
                const path = service.name.toLowerCase().replace(/\s+/g, "-");
                navigate(`/${path}`);
              }}
            >
              <div className="text-3xl md:text-4xl mb-2 md:mb-3">
                {service.icon}
              </div>
              <h3 className="text-sm md:text-base font-semibold">
                {service.name}
              </h3>
            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 border-t border-slate-800 text-gray-400 text-sm">
        © 2026 ServiceHub. All rights reserved.
      </footer>

    </div>
  );
}

export default UserHome;