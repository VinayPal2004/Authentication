import Request from "../model/requestmodel.js";
import Booking from "../model/bookingmodel.js";

export const bookProvider = async (req, res) => {
  try {
    const { providerId, service, date, address } = req.body;

    const newRequest = await Request.create({
      userId: req.userId,
      providerId: providerId,
      service,
      date, // 🔥 ensure date is stored as Date type
      address,
      fee: providerId.fee,
    });

    res.status(201).json({
      message: "Request submitted",
      request: newRequest
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Booking failed" });
  }
};
export const getProviderHistory = async (req, res) => {
  try {
    const requests = await Request.find({
      providerId: req.userId,
      
    }).populate("userId", "name")
    .populate("providerId", "name fee")
    .sort({ createdAt: -1 });

    res.status(200).json({ requests });

  } catch (error) {
    console.error("Error fetching requests:", error); // debug ke liye
    res.status(500).json({ message: "Error fetching requests" });
  }
};
export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    
    const request = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Status updated",
      request
    });

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
// bookingController


export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate("providerId", "name service ")
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};
