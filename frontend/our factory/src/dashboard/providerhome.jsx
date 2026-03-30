import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import logo from "../assets/servicehub.png";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/Usercontext";
import { AuthDataContext } from "../context/Authcontext";

function ProviderDashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(AuthDataContext);

  // 🔥 Fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/provider/provider`,
          { withCredentials: true }
        );
        setRequests(res.data.requests);
      } catch (error) {
        console.log("Error fetching requests");
      }
    };

    fetchRequests();
  }, []);

  // 🔥 Accept / Reject
  const handleAction = async (id, action) => {
    try {
      await axios.post(
        `${serverUrl}/api/user/${action}/${id}`,
        {},
        { withCredentials: true }
      );

      // UI update
      setRequests((prev) =>
        prev.filter((req) => req._id !== id)
      );

    } catch (error) {
      console.log("Action failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 border-b border-slate-800">

        <div className="flex items-center gap-3">
          <img src={logo} className="h-10 cursor-pointer" onClick={() => navigate('/')} />
          <h1 className="text-xl font-bold text-blue-400 cursor-pointer" onClick={() => navigate('/')}>
            ServiceHub Provider
          </h1>
        </div>

        <div className="flex gap-6 items-center relative">
          <button className="hover:text-blue-400">Dashboard</button>
          <button className="hover:text-blue-400">My Jobs</button>

          {/* Avatar */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center cursor-pointer"
            >
              {userData?.avatar ? (
                <img
                  src={`${serverUrl}/uploads/${userData.avatar}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold">
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
                  onClick={() => {
                    setOpen(false);
                    navigate("/provideredit");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => navigate("/jobs")}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                >
                  My Jobs
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

      {/* Dashboard */}
      <section className="px-10 py-10">

        <h2 className="text-3xl font-bold mb-8 text-blue-400">
          Service Requests
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {requests.length === 0 ? (
            <p>No requests available</p>
          ) : (
            requests.map((req) => (
              <div
                key={req._id}
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

                  <button
                    onClick={() => handleAction(req._id, "accept")}
                    className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleAction(req._id, "reject")}
                    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </section>

    </div>
  );
}

export default ProviderDashboard;