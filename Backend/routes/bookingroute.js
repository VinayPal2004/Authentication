// bookingroutes.js
import express from 'express';
import {bookProvider, updateRequestStatus} from "../controller/bookcontroller.js";
import isAuth from "../middleware/isAuth.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", isAuth, bookProvider);
bookingRouter.post("/update-status", isAuth, updateRequestStatus);

export default bookingRouter;