import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ErrorMiddleware from "./middlewares/Error.js";

config({
    path: "./config/config.env",
});
const app = express();

// Using Middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

import user from "./routes/userRoutes.js";
import store from "./routes/storeRoutes.js";
import product from "./routes/productRoutes.js";
import salePurchase from "./routes/salePurchaseRoutes.js"


app.use("/api/v1/user", user);
app.use("/api/v1/store", store);
app.use("/api/v1/product", product);
app.use("/api/v1/sale-purchase", salePurchase)



export default app;

app.get("/", (req, res) =>
    res.send(
        `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
    )
);

app.use(ErrorMiddleware);
