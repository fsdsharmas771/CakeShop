import express from "express";

import { register, logIn } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// To register a new user
router.route("/register").post(register);
router.route("/login").post(logIn)



export default router;
