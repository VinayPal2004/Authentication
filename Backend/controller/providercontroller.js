import User from "../model/usermodel.js";
// providercontroller.js
export const getProviderRequests = async (req, res) => {
  try {
    // abhi dummy (baad me DB se aayega)
    const requests = [
      {
        _id: "1",
        service: "Plumbing",
        name: "Rahul",
        location: "Delhi",
        date: "12 March",
        status: "pending"
      }
    ];

    res.status(200).json({ requests });

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
export const getAllProviders = async(req, res)=>{
  try {
    const providers = await User.find({role:"provider", service: "electrician"}).select("-password");
    res.status(200).json({providers});
  } catch (error) {
    res.status(500).json({ message: "Error fetching providers" });
  }
}
