import React from "react";
import logo from "../assets/servicehub.png";
import { useNavigate } from "react-router-dom";

function ProviderDashboard() {
  const requests = [
    {
      name: "Rahul Sharma",
      service: "Plumbing",
      location: "Delhi",
      date: "12 March"
    },
    {
      name: "Anita Verma",
      service: "Electric Repair",
      location: "Noida",
      date: "13 March"
    }
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 border-b border-slate-800">

        <div className="flex items-center gap-3">
          <img src={logo} className="h-10 cursor-pointer" onClick={()=>{navigate('/')}}/>
          <h1 className="text-xl font-bold text-blue-400 cursor-pointer" onClick={()=>{navigate('/')}}>
            ServiceHub Provider
          </h1>
        </div>

        <div className="flex gap-6 items-center">
          <button className="hover:text-blue-400">Dashboard</button>
          <button className="hover:text-blue-400">My Jobs</button>
          <button className="hover:text-blue-400">
            
          </button>

          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
            Logout
          </button>
        </div>

      </nav>


      {/* Dashboard Header */}
      <section className="px-10 py-10">

        <h2 className="text-3xl font-bold mb-8 text-blue-400">
          Service Requests
        </h2>


        {/* Requests List */}
        <div className="grid md:grid-cols-2 gap-8">

          {requests.map((req, index) => (
            <div
              key={index}
              className="bg-slate-900 p-6 rounded-xl border border-slate-800"
            >

              <h3 className="text-xl font-semibold mb-2">
                {req.service}
              </h3>

              <p className="text-gray-400">
                Customer: {req.name}
              </p>

              <p className="text-gray-400">
                Location: {req.location}
              </p>

              <p className="text-gray-400 mb-4">
                Date: {req.date}
              </p>

              <div className="flex gap-4">

                <button className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">
                  Accept
                </button>

                <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
                  Reject
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default ProviderDashboard;