import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/Authcontext";
import { CgProfile } from "react-icons/cg";

function ElectricianPage() {
  const { serverUrl } = useContext(AuthDataContext);
  const [electricians, setElectricians] = useState([]);

  useEffect(() => {
    const fetchElectricians = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/provider/service/electrician`
        );

        console.log("API DATA:", res.data); // 🔍 debug

        setElectricians(res.data.providers || []); // ✅ safe

      } catch (error) {
        console.log("Error fetching electricians", error);
        setElectricians([]); // ✅ crash se bachao
      }
    };

    fetchElectricians();
  }, [serverUrl]);

//   const handleBook = async (provider) => {
//   try {
//     const res = await axios.post(
//       `${serverUrl}/api/user/book-provider`,
//       {
//         providerId: provider._id,
//         service: provider.service
//       },
//       {
//        withCredentials: true // ✅ ensure cookies are sent
//         }
      
//     );

//     alert("Request Sent Successfully ✅");

//   } catch (error) {
//     console.log(error);
//     alert("Booking failed ");
//   }
// };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-3xl font-bold mb-8 text-blue-400">
        Electricians
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        
        {electricians.length === 0 ? (
  <p>No electricians available</p>
) : (
  electricians.map((item) => (
    <div
      key={item._id}
      className="bg-slate-800 p-5 rounded-xl flex justify-between items-center"
    >
      
      {/* LEFT SIDE DATA */}
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

        {/* 👇 Book Button */}
        <button className="mt-3 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
         >
          Book Now
        </button>
      </div>

      {/* RIGHT SIDE AVATAR */}
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

export default ElectricianPage;