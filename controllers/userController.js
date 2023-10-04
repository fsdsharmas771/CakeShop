import { User } from "../models/User.js";
import { sendToken } from "../utills/sendToken.js";

export const register = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        role
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
    sendToken(res, user, "Registered Successfully", 201, true);
};
