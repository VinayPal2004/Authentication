import Booking from "../model/bookingmodel.js";
import Request from "../model/requestmodel.js";


export const getMyBookings = async (req, res) => {
  try {
    const bookingRequest = await Booking.find({
      userId: req.userId,
    })
      .populate("userId", "name address")
      .populate("providerId", "name service fee")
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings: bookingRequest });

  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};