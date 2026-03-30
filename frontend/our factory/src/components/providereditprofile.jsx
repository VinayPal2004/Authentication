import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { userDataContext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthDataContext } from "../context/Authcontext";
import "react-toastify/dist/ReactToastify.css";

function ProviderEditProfile() {
  const { userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(AuthDataContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    Phone: "",
    address: "",
    theme: "dark",
    avatar:"",
    service: "",
    fee : "",
    experience: ""
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  // ✅ Load user data properly
  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name || "",
        Phone: userData.Phone || "",
        address: userData.address || "",
        theme: userData.theme || "dark",
        service: userData.service || "",
        fee: userData.fee || "",
        experience: userData.experience || ""
      });

      if (userData.avatar) {
        setPreview(`${serverUrl}/uploads/${userData.avatar}`);
      }
    }
  }, [userData]);

  // ✅ Handle input change (clean way)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ File change
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // ✅ Submit
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

     Object.keys(form).forEach((key) => {
  if (form[key] !== "") {
    formData.append(key, form[key]);
  }
});

      if (file) {
        formData.append("avatar", file);
      }
//       if (service !== "") {
//   formData.append("service", service);
// }

      const res = await axios.post(
        `${serverUrl}/api/provider/provider/edit-profile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData(res.data.user);
      setPreview(`${serverUrl}/uploads/${res.data.user.avatar}`);
      toast.success("Profile updated successfully");

      setTimeout(() => {
       
        navigate("/provider");
      
      }, 1500);

    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-xl w-96 text-center">

        {/* Avatar */}
        <label className="cursor-pointer">
        <div className="mb-4">
          <img
            src={preview || "https://via.placeholder.com/100"}
            alt="avatar"
           
            className="w-24 h-24  cursor-pointer rounded-full mx-auto object-cover border-2 border-blue-400"
          />
        </div>

       <label className="cursor-pointer bg-blue-600 px-4 py-2 rounded inline-block">
  Choose image
  <input
    type="file"
    onChange={handleFileChange}
    className="hidden"
  />
</label>
</label>

<p className="mt-2 text-sm text-gray-400">
  {file ? file.name : "No file selected"}
</p>

        {/* Inputs */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mt-4 p-2 rounded bg-slate-700"
        />

        <input
          type="text"
          name="Phone"
          value={form.Phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full mt-4 p-2 rounded bg-slate-700"
        />

        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full mt-4 p-2 rounded bg-slate-700"
        />

        <select
          name="theme"
          value={form.theme}
          onChange={handleChange}
          className="w-full mt-4 p-2 rounded bg-slate-700"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        
  <select
    name="service"
    value={form.service}
    onChange={handleChange}
    className="w-full mt-4 p-2 rounded bg-slate-700"
  >
    <option value="">Select service</option>
    <option value="electrician">Electrician</option>
    <option value="plumber">Plumber</option>
    <option value="cleaning">Cleaning</option>
    <option value="ac-repair">AC Repair</option>
    <option value="painter">Painter</option>
    <option value="carpenter">Carpenter</option>
  </select>
  <input
  type="number"
  placeholder="Enter Fee"
  name="fee"
  value={form.fee}
  onChange={handleChange}
   className="w-full mt-4 p-2 rounded bg-slate-700"
/>

<input
  type="text"
  name="experience"
  placeholder="Experience (e.g. 2 years)"
  value={form.experience}
   onChange={handleChange}
   className="w-full mt-4 p-2 rounded bg-slate-700"
/>


        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>

      </div>
      <ToastContainer />
    </div>
  );
}

export default ProviderEditProfile;