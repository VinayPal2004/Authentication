import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { AuthDataContext } from "../context/Authcontext";

function CleaningPage() {
  const { serverUrl } = useContext(AuthDataContext);
  const [cleaners, setCleaners] = useState([]);

  useEffect(() => {
    const fetchCleaners = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/provider/service/cleaning`
        );

        setCleaners(res.data.providers || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCleaners();
  }, [serverUrl]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">
        Cleaners
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cleaners.length === 0 ? (
          <p>No cleaners available</p>
        ) : (
          cleaners.map((item) => (
            <div key={item._id} className="bg-slate-800 p-5 rounded-xl flex justify-between items-center">
              
              <div>
                <h2>{item.name}</h2>
                <p>{item.Phone}</p>
                <p>₹{item.fee || "N/A"}</p>
                <p>{item.experience || "N/A"}</p>

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
                  className="mt-3 bg-green-500 px-4 py-2 rounded"
                >
                  Book Now
                </button>
              </div>

             <div className="w-40 h-40 rounded-2xl overflow-hidden bg-slate-700 flex items-center justify-center">
  {item.avatar ? (
    <img
      src={`http://localhost:8400/uploads/${item.avatar}`}
      className="w-full h-full object-cover"
    />
  ) : (
    <CgProfile size={40} className="text-white" />
  )}
</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CleaningPage;