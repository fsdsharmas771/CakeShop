import { User } from "../models/User.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { sendToken } from "../utills/sendToken.js";
import ErrorHandler from "../utills/errorHandler.js";

export const register = catchAsyncError(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        role,
        password,
        confirmPassword,
        storeId
    } = req.body;
    if (!firstName || !lastName || !phone)
        return next(new ErrorHandler("Please Send All FirstName LastName and Phone", 400));
    let user;
    if (email) {
        user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User Already Exist", 400));
    }
    if (phone) {
        user = await User.findOne({ phone: phone.trim() });
        if (user) return next(new ErrorHandler("User Already Exist", 400));
    }
    if (!password || !confirmPassword) return next(new ErrorHandler("Provide Password And Confirm Password Both", 400));
    if (password != confirmPassword) return next(new ErrorHandler("Password and Confirm Password Mis-Match", 400));
    if (password.length < 6) return next(new ErrorHandler("Enter Atleast 6 Digit Password", 400));

    // logic for creating a UID
    let uid = 1;
    const last = await User.findOne().sort({ field: "asc", _id: -1 }).limit(1);
    if (last) {
        uid = last.uid + 1;
    }
    //logic for creating unique userName
    let userName = `${firstName}${lastName}`;
    userName = userName.replace(/\s/g, "");
    userName = userName.toUpperCase();
    userName = userName + uid;

    user = await User.create({
        firstName,
        lastName,
        email: email ? email : `${userName}@gmail.com`,
        phone: phone.trim(),
        uid,
        userName,
        role,
        store: storeId
    });

    const hashedPassKey = await user.generatePassword(String(password).trim());
    user.password = hashedPassKey;
    await user.save();
    return res.status(200).json({
        success: true,
        message: 'Registered Successfully!',
        user
    })
});

export const logIn = async (req, res, next) => {
    const { phone, password } = req.body;
    if (!phone) return next(new ErrorHandler("Please Enter Phone Number", 400));
    if (!password) return next(new ErrorHandler("Please Enter Password", 400));
    let user = await User.findOne({ phone }).select("password");
    if (!user) return next(new ErrorHandler("User Not Found With This Number", 404));
    const match = await user.matchPassword(String(password).trim());
    if (!match) return next(new ErrorHandler("Incorrect Password", 400));
    return sendToken(res, user, "Logged In Successfully", 201, false);
};

export const getUsers = catchAsyncError(async (req, res, next) => {
    const { phone, uid, page, perPage } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 20,
        sort: { _id: -1 },
    };
    let query = {};
    if (phone) query.phone = phone;
    if (uid) query.uid = uid;
    let users = await User.paginate(query, options);
    return res.status(200).json({
        success: true,
        message: 'Registered Successfully!',
        users
    })
});