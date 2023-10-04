import { User } from "../models/User.js";
import { sendToken } from "../utills/sendToken.js";

export const register = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        role,
        password,
        confirmPassword
    } = req.body;

    if (!firstName || !lastName || !phone) {
        return res.status(400).json({
            success: false,
            message: "Please Send All FirstName LastName and Phone"
        })
    }
    let user;
    console.log("email", email);
    if (email) {
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist"
            })
        }
    }
    if (phone) {
        user = await User.findOne({ phone: phone.trim() });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist"
            })
        }
    }
    if (!password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Please provide password and confirmpassword"
        })
    }
    if (password != confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and Confirm Password Mis-Match"
        })
    }
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Enter atleast 6 digit password"
        })
    }

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
        role
    });

    const hashedPassKey = await user.generatePassword(String(password).trim());
    user.password = hashedPassKey;
    await user.save();

    sendToken(res, user, "Registered Successfully", 201, true);
};

export const logIn = async (req, res, next) => {
    const { phone, password } = req.body;
    if (!phone) {
        return res.status(400).json({
            success: false,
            message: "Please Enter Phone Number"
        })
    }
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Please Enter Password"
        })
    }
    let user = await User.findOne({ phone }).select("password");
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found With This Phone Number"
        })
    }
    const match = await user.matchPassword(String(password).trim());
    if (!match) {
        return res.status(400).json({
            success: false,
            message: "Incorrect Password"
        })
    }
    return sendToken(res, user, "Correct OTP, your are logged in", 201, false);
};
