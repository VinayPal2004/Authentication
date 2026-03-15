import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { getCurrentUser } from '../controller/usercontroller.js';


 export const userRouter = express.Router();

userRouter.get("/users", isAuth, getCurrentUser);


export default userRouter;