import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utills/errorHandler.js";
import { Product } from "../models/Product.js";


export const addProduct = catchAsyncError(async (req, res, next) => {
    const { name, category, price, gst, discount } = req.body;
    if (!name && !category && !price) return next(new ErrorHandler("Please Send All: name category and price", 400));
    let pid = 1;
    const last = await Product.findOne().sort({ field: "asc", _id: -1 }).limit(1);
    if (last) {
        pid = last.pid + 1;
    }
    return res.status(200).json({
        success: true,
        message: 'Product Created Successfully!',
        store
    })
});

export const editProduct = catchAsyncError(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'Product Edited Successfully!'
    })
});

export const getProduct = catchAsyncError(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'Products',
    })
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {

    return res.status(200).json({
        success: true,
        message: 'Product Deleted'
    })
});