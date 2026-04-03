import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authroutes.js';
import userRouter from './routes/userroutes.js';
import providerRouter from './routes/providerroutes.js';
import bookingRouter from './routes/bookingroute.js';
 import cors from 'cors';
 import fs from "fs";


dotenv.config();
const app = express();
const Port = process.env.PORT || 8400;
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://service-hub-wrdt.vercel.app"
  ],
  credentials: true
}));

app.use('/api/auth',authRoutes);
app.use('/api/user/',userRouter);
app.use('/api/booking/',bookingRouter);
app.use('/api/provider/',providerRouter);



if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
app.use("/uploads", express.static("uploads"));

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
    
})

export default app;