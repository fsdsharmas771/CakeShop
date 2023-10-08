import express from "express";

import { addProduct, editProduct, getProducts, deleteProduct } from "../controllers/productController.js";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// To register a new user
router.route("/addProduct").post(isAuthenticated, authorizeAdmin, addProduct);
router.route("/editProduct").put(isAuthenticated, authorizeAdmin, editProduct);
router.route("/getProducts").get(isAuthenticated, authorizeAdmin, getProducts);
router.route("/deleteProduct").delete(isAuthenticated, authorizeAdmin, deleteProduct);





export default router;
