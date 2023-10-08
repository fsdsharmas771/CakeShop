import express from "express";

import { register, logIn } from "../controllers/userController.js";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// To register a new user
router.route("/register").post(isAuthenticated, authorizeAdmin, register);
router.route("/login").post(logIn)



export default router;
