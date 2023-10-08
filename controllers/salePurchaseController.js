import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utills/errorHandler.js";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Sale } from "../models/Sale.js";


export const saleInvoice = catchAsyncError(async (req, res, next) => {
    let { userId, userObj, orderDate, pickupDate, items } = req.body;
    if (!userId && !userObj)
        return next(new ErrorHandler("Please Send userId or userObj", 400));
    if (userId && userObj)
        return next(new ErrorHandler("Please Send One Either userId or userObj", 400));
    let user;
    if (userObj) {
        let uid = 1;
        const last = await User.findOne().sort({ field: "asc", _id: -1 }).limit(1);
        if (last) {
            uid = last.uid + 1;
        }
        //logic for creating unique userName
        let userName = `${userObj.firstName}${userObj.lastName}`;
        userName = userName.replace(/\s/g, "");
        userName = userName.toUpperCase();
        userName = userName + uid;
        user = await User.create({
            ...userObj,
            uid,
            userName,
            role: "Customer",
        });
    } else {
        user = await User.findById(userId);
        if (!user) return next(new ErrorHandler("User Not Found With This User Id", 400));
    }
    let invoiceNo = 1;
    const last = await Sale.findOne().sort({ field: "asc", _id: -1 }).limit(1);
    if (last) {
        invoiceNo = last.invoiceNo + 1;
    }
    let subtotal = 0;
    let totalTax = 0;
    let finalAmount = 0;
    let totalDiscount = 0;
    for (let item of items) {
        let product = await Product.findById(item.product);
        subtotal = subtotal + (item.quantity * product.price);
        totalDiscount = totalDiscount + (item.quantity * (product.price * (product.discount / 100)));
        finalAmount = subtotal - totalDiscount;
        totalTax = totalTax + (finalAmount * (product.gst / 100));
        finalAmount = finalAmount + totalTax;
    }
    let Invoice = await Sale.create({
        invoiceNo,
        customer: user._id,
        orderDate,
        pickupDate,
        items,
        subtotal,
        totalTax,
        totalDiscount,
        finalAmount
    });
    return res.status(200).json({
        success: true,
        message: 'Successfully Genrated Invoice',
        Invoice
    })
});

export const getSaleInvoices = catchAsyncError(async (req, res, next) => {
    let { invoiceNo, page, perPage } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 20,
        populate: [
            { path: "customer", select: "userName phone -_id" },
            { path: "items.product", select: "name -_id" }
        ],
        sort: { _id: -1 },
    };
    let query = {};
    if (invoiceNo) query.invoiceNo = invoiceNo;
    let invoices = await Sale.paginate(query, options);
    return res.status(200).json({
        success: true,
        message: 'Purchase Recorded',
        invoices
    })
});

export const purchaseInvoice = catchAsyncError(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'Purchase Recorded',
        prod
    })
});

export const saleReport = catchAsyncError(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'Sales Report'
    })
});

export const purchaseReport = catchAsyncError(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'Purchase Report'
    })
});