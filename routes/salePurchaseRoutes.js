import express from "express";

import { saleInvoice, purchaseInvoice, saleReport, purchaseReport, getSaleInvoices } from "../controllers/salePurchaseController.js";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// To register a new user
router.route("/genrateSaleInvoice").post(isAuthenticated, saleInvoice);
router.route("/purchaseEntry").post(isAuthenticated, purchaseInvoice);
router.route("/saleReport").get( saleReport);
router.route("/purchaseReport").get(isAuthenticated, purchaseReport);
router.route("/getSaleInvoices").get(isAuthenticated, getSaleInvoices);





export default router;
