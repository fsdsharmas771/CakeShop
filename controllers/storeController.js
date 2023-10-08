import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utills/errorHandler.js";
import { Store } from "../models/Store.js";

export const createNewStore = catchAsyncError(async (req, res, next) => {
    const { name, address } = req.body;
    if (!name || !address) return next(new ErrorHandler("Please Send Both Name and Address ", 400));
    let sid = 1;
    const last = await Store.findOne().sort({ field: "asc", _id: -1 }).limit(1);
    if (last) {
        sid = last.sid + 1;
    }
    let store = await Store.create({
        sid,
        name,
        address
    })
    return res.status(200).json({
        success: true,
        message: 'New Store Created Successfully!',
        store
    })
});

export const editStore = catchAsyncError(async (req, res, next) => {
    const { sid, name, address } = req.body;
    if (!sid) return next(new ErrorHandler("Send Sid Must", 400));
    if (!name && !address) return next(new ErrorHandler("Please Send At least One Out Of name and address", 400));

    let store = await Store.findOneAndUpdate({ sid }, {
        name,
        address
    });
    if (!store) return next(new ErrorHandler("No Store Found With This Sid", 400));
    return res.status(200).json({
        success: true,
        message: 'Store Edited Successfully!',
        store
    })
});

export const getStores = catchAsyncError(async (req, res, next) => {
    const { sid } = req.query;
    let query = {};
    if (sid) query.sid = sid;
    let stores = await Store.find(query);
    if (!stores) return next(new ErrorHandler("No Store Found", 400));
    return res.status(200).json({
        success: true,
        message: 'Store Data',
        stores
    })
});

export const deleteStores = catchAsyncError(async (req, res, next) => {
    const { sid } = req.query;
    if (!sid) return next(new ErrorHandler("Send Sid Must", 400));
    let store = await Store.findOneAndDelete({ sid });
    if (!store) return next(new ErrorHandler("No Store Found", 400));
    return res.status(200).json({
        success: true,
        message: 'Store Deleted',
        store
    })
});