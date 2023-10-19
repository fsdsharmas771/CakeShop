import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const schema = new mongoose.Schema(
    {
        invoiceNo: {
            type: Number,
            require: true
        },
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        orderDate: {
            type: Date,
            required: true
        },
        pickupDate: {
            type: Date,
            required: true
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 0
                },
                totalAmount: {
                    type: Number,
                    required: true,
                }
            }
        ],
        subtotal: {
            type: Number,
            require: true
        },
        totalTax: {
            type: Number,
            require: true,
            default: 0
        },
        totalDiscount: {
            type: Number,
            require: true,
            default: 0
        },
        finalAmount: {
            type: Number,
            require: true,
        },
        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
        }
    },
    { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Sale = mongoose.model("Sale", schema);

export { Sale };
