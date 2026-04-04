import Request from "../model/requestmodel.js";
import Booking from "../model/bookingmodel.js";

export const bookProvider = async (req, res) => {
  try {
    const { providerId, service, date, address } = req.body;

    const newRequest = await Request.create({
      userId: req.userId,
      providerId: providerId,
      service,
      date, 
      address,
      fee: providerId?.fee,
    });
    console.log("BOOKING SAVED USER:", req.userId);

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
    console.error("Error fetching requests:", error); 
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

    // 🔍 check existing booking
    let booking = await Booking.findOne({
      userId: request.userId,
      providerId: request.providerId,
      date: request.date,
    });

    if (!booking) {
      // 👉 agar booking exist nahi karti
      await Booking.create({
        userId: request.userId,
        providerId: request.providerId,
        service: request.service,
        date: request.date,
        address: request.address,
        fee: request.fee,
        status: status ? status : "pending",
      });

    } else {
      // 👉 agar booking already hai → sirf update
      if (status === "accepted") {
        booking.status = "accepted";
      } else if (status === "rejected") {
        booking.status = "rejected";
      } else {
        booking.status = "pending";
      }

      await booking.save();
    }

    res.status(200).json({
      message: "Status updated",
      booking,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update failed" });
  }
};
