import express from "express";

import { register, logIn, getUsers } from "../controllers/userController.js";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// To register a new user
router.route("/register").post(isAuthenticated, authorizeAdmin, register);
router.route("/login").post(logIn);
router.route("/getUsers").get(isAuthenticated, getUsers);




export default router;
