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
            enum: []
        }
    },
    { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", schema);

export { Product };
