import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import mongoosePaginate from "mongoose-paginate";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
    {
        uid: {
            type: Number,
            unique: [true, "uid must be unique"],
            required: [true, "uid is required"],
        },
        firstName: {
            type: String,
            required: [true, "Please enter your firstName"],
        },
        lastName: {
            type: String,
            required: [true, "Please enter your firstName"],
        },
        userName: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            validate: {
                validator: function (v) {
                    return v.toString().length >= 10;
                },
                message: "myNumber must have at least 10 digits",
            },
            required: [true, "Please enter your phone number"],
            unique: [true, "uid must be unique"],
        },
        role: {
            type: String,
            enum: ["Admin", "Manager"],
            default: "Manager",
        },
        avatar: {
            url: {
                type: String,
            },
        },
        status: {
            type: String,
            enum: ["Blocked", "Active"],
            default: "Active",
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
        password: {
            type: String,
            select: false,
        },
    },
    { timestamps: true }
);

schema.plugin(mongoosePaginate);

schema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
};

// generate password
schema.methods.generatePassword = async function (password) {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
// matchPassword
schema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", schema);
schema.index({ firstName: "text", lastName: "text" });

export { User };
