import React from "react";
import { FaBolt, FaWrench, FaBroom, FaSnowflake, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-slate-900">
        <h1 className="text-2xl font-bold text-blue-400">ServiceHub</h1>

        <div className="flex gap-6 items-center">
          <a className="hover:text-blue-400">Home</a>
          <a className="hover:text-blue-400">Services</a>
          <a className="hover:text-blue-400">Providers</a>
          <a className="hover:text-blue-400"
          onClick={()=>{navigate('/login')
          }}>Login</a>

          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={()=>{navigate('/signup')}}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-[70vh] bg-[gradient-to-r from-slate-900 via-blue-950 to-slate-900] px-6">

        <h1 className="text-5xl font-bold mb-4">
          Find Trusted Services Near You
        </h1>

        <p className="text-gray-400 mb-6">
          Book electricians, plumbers, cleaners and more instantly
        </p>

        {/* Search */}
        <div className="flex">
          <input
            type="text"
            placeholder="Search services..."
            className="px-4 py-3 w-[300px] bg-slate-800 border border-slate-700 rounded-l-lg outline-none"
          />
          <button className="bg-blue-600 px-6 rounded-r-lg hover:bg-blue-700">
            Search
          </button>
        </div>

      </section>

      {/* Services */}
      <section className="px-10 py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Services
        </h2>

        <div className="grid md:grid-cols-5 gap-6 text-center">

          <div className="bg-slate-900 p-6 rounded-xl hover:border border-blue-500">
            <FaBolt className="text-3xl mx-auto text-blue-400 mb-3" />
            Electrician
          </div>

          <div className="bg-slate-900 p-6 rounded-xl hover:border border-blue-500">
            <FaWrench className="text-3xl mx-auto text-blue-400 mb-3" />
            Plumber
          </div>

          <div className="bg-slate-900 p-6 rounded-xl hover:border border-blue-500">
            <FaBroom className="text-3xl mx-auto text-blue-400 mb-3" />
            Cleaning
          </div>

          <div className="bg-slate-900 p-6 rounded-xl hover:border border-blue-500">
            <FaSnowflake className="text-3xl mx-auto text-blue-400 mb-3" />
            AC Repair
          </div>

          <div className="bg-slate-900 p-6 rounded-xl hover:border border-blue-500">
            <FaTools className="text-3xl mx-auto text-blue-400 mb-3" />
            Carpenter
          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-16">

        <div className="flex justify-center gap-20 text-center">

          <div>
            <h2 className="text-4xl font-bold text-blue-400">500+</h2>
            <p className="text-gray-400">Service Providers</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-400">10K+</h2>
            <p className="text-gray-400">Happy Customers</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-400">20+</h2>
            <p className="text-gray-400">Services Available</p>
          </div>

        </div>

      </section>

      {/* Provider Join */}
      <section className="py-16 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Become a Service Provider
        </h2>

        <p className="text-gray-400 mb-6">
          Join our platform and start earning from your skills.
        </p>

        <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
          Join Now
        </button>

      </section>

      {/* Testimonials */}
      <section className="bg-slate-900 py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          What Customers Say
        </h2>

        <div className="flex justify-center gap-8 px-10">

          <div className="bg-slate-800 p-6 rounded-xl w-[300px]">
            ⭐⭐⭐⭐⭐
            <p className="text-gray-400 mt-3">
              Electrician arrived quickly and fixed the issue perfectly.
            </p>
            <p className="mt-3 font-semibold">Rahul</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl w-[300px]">
            ⭐⭐⭐⭐⭐
            <p className="text-gray-400 mt-3">
              Very easy booking process and professional service.
            </p>
            <p className="mt-3 font-semibold">Anita</p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-black text-center py-6 text-gray-400">
        © 2026 ServiceHub. All rights reserved.
      </footer>

    </div>
  );
}

export default Landing;