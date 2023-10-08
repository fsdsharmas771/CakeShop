import express from "express";

import { createNewStore, editStore, getStores, deleteStores } from "../controllers/storeController.js";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// To register a new user
router.route("/createNewStore").post(isAuthenticated, authorizeAdmin, createNewStore);
router.route("/editStore").put(isAuthenticated, authorizeAdmin, editStore);
router.route("/getStores").get(isAuthenticated, authorizeAdmin, getStores);
router.route("/deleteStore").delete(isAuthenticated, authorizeAdmin, deleteStores);





export default router;
