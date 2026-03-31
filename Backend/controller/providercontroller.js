import User from "../model/usermodel.js";
import Request from "../model/requestmodel.js";
// providercontroller.js
export const getProviderRequests = async (req, res) => {
  try {
    // abhi dummy (baad me DB se aayega)
    const requests = await Request.find({
      providerId: req.userId
    }).populate("userId", "name address");
    res.status(200).json({ requests });
    console.log(requests);

  } catch (error) {
    res.status(500).json({ message: "Error fetching requests" });
  }
};
export const providereditProfile = async (req, res) => {
  try {
    const { name, service,Phone,address,fee,experience } = req.body;

    let updateData = { name, service,Phone,address,fee,experience };

    // 👇 avatar aaya toh add karo
    if (req.file) {
      updateData.avatar = req.file.filename;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
//get all providers (for user side)
export const getAllProviders = async (req, res) => {
  try {
    const { type } = req.params; // 👈 URL se aayega (plumber, electrician)

    const providers = await User.find({
      role: "provider",
      service: { $regex: new RegExp(`^${type}$`, "i") } // 👈 dynamic + case ignore
    }).select("-password");

    res.status(200).json({ providers });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching providers" });
  }
};
