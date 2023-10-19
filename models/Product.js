import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const schema = new mongoose.Schema(
    {
        pid: {
            type: Number,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        category: {
            type: String,
            enum: ["1", "2", "3", "4"]
        },
        price: {
            type: Number,
            require: true
        },
        gst: {
            type: Number,
            require: true,
        },
        discount: {
            type: Number,
            require: true,
        },
        finalPrice: {
            type: Number,
            require: true,
        },
        image: {
            type: String
        }
    },
    { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", schema);

export { Product };
