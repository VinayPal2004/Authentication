import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/Authcontext";
import { userDataContext } from "../context/Usercontext";

function MyBookings() {
  const { serverUrl } = useContext(AuthDataContext);
  const { userData } = useContext(userDataContext);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/booking/my-bookings`,
          { withCredentials: true }
        );

        console.log("Bookings fetched:", res.data);
        console.log(res.data.bookings);
        // 🔥 SAFE DATA HANDLE
        const data = res.data.bookings || res.data;

        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          console.log("Data is not array:", data);
          setBookings([]);
        }

      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    if (userData) fetchBookings();
  }, [serverUrl, userData]);

  // 🔥 SAFE FILTER
  const filteredBookings = Array.isArray(bookings)
    ? filter === "all"
      ? bookings
      : bookings.filter((b) => b.status === filter)
    : [];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">My Bookings</h1>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-600" : "bg-slate-700"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded ${
            filter === "pending" ? "bg-yellow-500" : "bg-slate-700"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("accepted")}
          className={`px-4 py-2 rounded ${
            filter === "accepted" ? "bg-green-600" : "bg-slate-700"
          }`}
        >
          Accepted
        </button>

        <button
          onClick={() => setFilter("rejected")}
          className={`px-4 py-2 rounded ${
            filter === "rejected" ? "bg-red-600" : "bg-slate-700"
          }`}
        >
          Rejected
        </button>
      </div>

      {/* BOOKINGS LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {!Array.isArray(filteredBookings) || filteredBookings.length === 0 ? (
          <p className="text-gray-400">No bookings found.</p>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-slate-800 p-4 rounded">
              <h2 className="text-lg font-semibold">{booking.service}</h2>
              <p>Provider: {booking.providerId?.name || "N/A"}</p>
              <p>Address: {booking.address}</p>
              <p>
                Date:{" "}
                {booking.date
                  ? new Date(booking.date).toLocaleString()
                  : "N/A"}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span
                  className={
                    booking.status === "accepted"
                      ? "text-green-400"
                      : booking.status === "rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {booking.status}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookings;