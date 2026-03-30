import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { AuthDataContext } from "../context/Authcontext";

function CarpenterPage() {
  const { serverUrl } = useContext(AuthDataContext);
  const [carpenters, setCarpenters] = useState([]);

  useEffect(() => {
    const fetchCarpenters    = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/provider/service/carpenter`
        );

        setCarpenters(res.data.providers || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCarpenters();
  }, [serverUrl]);

  return (
  <div className="min-h-screen bg-slate-900 text-white p-4 md:p-10">
    
    <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-blue-400">
      Carpenters
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

      {carpenters.length === 0 ? (
        <p>No carpenters available</p>
      ) : (
        carpenters.map((item) => (
          
          <div
            key={item._id}
            className="bg-slate-800 p-4 md:p-5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4"
          >

            {/* LEFT CONTENT */}
            <div className="w-full md:w-auto text-center md:text-left">

              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-300">{item.Phone}</p>
              <p className="text-sm">₹{item.fee || "N/A"}</p>
              <p className="text-sm">{item.experience || "N/A"}</p>

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

export default CarpenterPage;