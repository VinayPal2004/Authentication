import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { AuthDataContext } from "../context/Authcontext";

function PlumberPage() {
  const { serverUrl } = useContext(AuthDataContext);
  const [plumbers, setPlumbers] = useState([]);

  useEffect(() => {
    const fetchPlumbers = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/provider/service/plumber`
        );

        setPlumbers(res.data.providers || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlumbers();
  }, [serverUrl]);

  return (
  <div className="min-h-screen bg-slate-900 text-white p-4 md:p-10">
    
    <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-blue-400">
        Plumbers
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

      {plumbers.length === 0 ? (
        <p>No plumbers available</p>
      ) : (
        plumbers.map((item) => (
          
          <div
            key={item._id}
            className="bg-slate-800 p-4 md:p-5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4"
          >

            {/* LEFT CONTENT */}
           <div>
        <h2 className="text-xl font-semibold">{item.name}</h2>

        <p className="text-gray-400">
          Phone: {item.Phone}
        </p>

        <p className="text-gray-400">
          Service: {item.service}
        </p>

        <p className="text-gray-400">
          Address: {item.address}
        </p>

        {/* 👇 Extra fields */}
        <p className="text-gray-400">
          Experience: {item.experience || ""}
        </p>

        <p className="text-gray-400">
          Fee: ₹{item.fee || ""}
        </p>

              <button
                onClick={async () => {
                  await axios.post(
                    `${serverUrl}/api/user/book-provider`,
                    {
                      providerId: item._id,
                      service: item.service
                    },
                    { withCredentials: true }
                  );
                  alert("Booked ✅");
                }}
                className="mt-3 bg-green-500 px-4 py-2 rounded w-full md:w-auto"
              >
                Book Now
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-20 h-20 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-slate-700 flex items-center justify-center">
              {item.avatar ? (
                <img
                  src={`http://localhost:8400/uploads/${item.avatar}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <CgProfile size={30} className="text-white md:size-40" />
              )}
            </div>

          </div>
        ))
      )}

    </div>
  </div>
);
}

export default PlumberPage;