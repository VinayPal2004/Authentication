import express from 'express';
import isAuth from '../middleware/isAuth.js';

import { upload } from "../middleware/multer.js";
import User from "../model/usermodel.js";
import { getAllProviders, getProviderRequests } from "../controller/providercontroller.js";
import { providereditProfile } from "../controller/providercontroller.js";

export const providerRouter = express.Router();

//provider
providerRouter.get("/provider", isAuth, getProviderRequests);
providerRouter.post(
  "/provider/edit-profile",
  isAuth,
  upload.single("avatar"),
  providereditProfile
);
providerRouter.get("/electricians", getAllProviders);
export default providerRouter;
