import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utills/errorHandler.js";
import { Product } from "../models/Product.js";
import { uploadImageToFirebase } from "../utills/imageUploader.js";


export const addProduct = catchAsyncError(async (req, res, next) => {
    let { name, category, price, gst, discount } = req.body;
    if (!name || !category || !price) return next(new ErrorHandler("Please Send All: name category and price", 400));
    let imageBuffer;
    req.file ? imageBuffer = req.file.buffer : null;
    let imageUrl;
    // Upload image to Firebase Storage



    let pid = 1;
    const last = await Product.findOne().sort({ field: "asc", _id: -1 }).limit(1);
    if (last) {
        pid = last.pid + 1;
    }
    if (imagePath) {
        imageUrl = await uploadImageToFirebase(imageBuffer, `images${pid}/` + req.file.originalname);
    }
    if (!gst) gst = 0;
    if (!discount) discount = 0;
    let finalPrice = (price - (price * (discount / 100)));
    finalPrice = finalPrice + (finalPrice * (gst / 100));
    let product = await Product.create({
        pid,
        name,
        category,
        price,
        gst,
        discount,
        finalPrice,
        image: imageUrl
    })
    return res.status(200).json({
        success: true,
        message: 'Product Created Successfully!',
        product
    })
});

export const editProduct = catchAsyncError(async (req, res, next) => {
    let { pid, name, category, price, gst, discount } = req.body;
    if (!pid) return next(new ErrorHandler("Please Send pid", 400));
    let product = await Product.findOne({ pid });
    if (!product) return next(new ErrorHandler("No Product Found", 400));
    const imageBuffer = req.file.buffer;
    console.log(req.file)
    let imageUrl;
    // Upload image to Firebase Storage
    if (imageBuffer) {
        imageUrl = await uploadImageToFirebase(imageBuffer, `images${pid}/` + req.file.originalname);
    }
    imageUrl ? product.image = imageUrl : null;
    name ? product.name = name : null;
    category ? product.category = category : null;
    price ? product.price = price : null;
    gst ? product.gst = gst : null;
    discount ? product.discount = discount : null;
    let finalPrice = product.price - (product.price * (product.discount / 100));
    product.finalPrice = finalPrice + (finalPrice * (product.gst / 100));
    await product.save();
    return res.status(200).json({
        success: true,
        message: 'Product Edited Successfully!',
        product
    })
});

export const getProducts = catchAsyncError(async (req, res, next) => {
    let { pid } = req.query;
    let query = {};
    if (pid) query.pid = pid;
    let products = await Product.find(query);
    if (!products) return next(new ErrorHandler("No Product Found", 400));
    return res.status(200).json({
        success: true,
        message: 'Products',
        products
    })
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const { pid } = req.query;
    if (!pid) return next(new ErrorHandler("Send Sid Must", 400));
    let product = await Product.findOneAndDelete({ pid });
    if (!product) return next(new ErrorHandler("No Store Found", 400));
    return res.status(200).json({
        success: true,
        message: 'Product Deleted',
        product
    })
});