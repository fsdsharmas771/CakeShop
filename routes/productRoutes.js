import express from "express";
import { singleUpload } from "../middlewares/multer.js";

import { addProduct, editProduct, getProducts, deleteProduct } from "../controllers/productController.js";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// To register a new user
router.route("/addProduct").post(isAuthenticated, authorizeAdmin, singleUpload, addProduct);
router.route("/editProduct").put(isAuthenticated, authorizeAdmin, singleUpload, editProduct);
router.route("/getProducts").get(isAuthenticated, authorizeAdmin, getProducts);
router.route("/deleteProduct").delete(isAuthenticated, authorizeAdmin, deleteProduct);





export default router;
