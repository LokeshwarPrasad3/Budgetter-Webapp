import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    }
}, { timestamps: true })


const ExpensesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: String,
        required: true,
        default: () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = String(now.getFullYear()).slice(-2);
            return `${day}-${month}-${year}`;
        },
    },
    products: {
        type: [ProductSchema],
        validate: [arrayLimit, "Must have at least 1 product"]
    }
}, {
    timestamps: true
})


// validate array should be at least 1 length
function arrayLimit(val) {
    return val.length > 0;
}

const Expense = mongoose.model("Expense", ExpensesSchema);
export default Expense;