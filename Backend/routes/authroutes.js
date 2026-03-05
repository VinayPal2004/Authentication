import express from 'express';
import { registerUser} from '../controller/authcontroller.js'
const authRoutes = express.Router();

authRoutes.post('/signup',registerUser);

export default authRoutes;