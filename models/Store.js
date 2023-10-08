import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const schema = new mongoose.Schema(
    {
        sid: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            line1: {
                type: String,
                required: true
            },
            line2: {
                type: String,
                required: true
            },
            line3: {
                type: String,
            }
        },
    },
    { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Store = mongoose.model("Store", schema);

export { Store };
