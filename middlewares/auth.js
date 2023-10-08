import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ErrorHandler from "../utills/errorHandler.js";

export const isAuthenticated = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
        return res.status(400).json({
            success: false,
            message: "please provide the token"
        })
    }
    // Get Token from header
    token = authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not Logged In"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
};


export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "Admin")
        return next(
            new ErrorHandler(
                `${req.user.role} is not allowed to access this resource`,
                403
            )
        );

    next();
};
