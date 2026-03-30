// import Request from "../model/requestmodel";
// export const bookProvider = async (req,res)=>{
//   try {
//     const {providerId,service} =req.body;

//     const newRequest = await Request.create({
//       User: req.userId,
//       provider: providerId,
//       service: service
//     });

//     res.status(201).json({
//       message: "Request submitted",
//       request: newRequest
//     });
//   } catch (error) {
//     console.log(error);
    
//       res.status(500).json({ message: "Booking failed" });
    
//   }
// };