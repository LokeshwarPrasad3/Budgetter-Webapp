import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    }
    ,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    avatar: {
        // https://i.postimg.cc/3wZzNhHn/saotro-2.jpg
        type: String,
        default: "https://i.postimg.cc/cCWKmfzs/satoro-1.jpg",
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    expensesRecords: {
        type: Schema.Types.ObjectId,
        ref: "Expense"
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
})


// before save password must be encrypted using bcrypt.js
UserSchema.pre("save", async function (next) {
    // this refers to instance document
    if (!this.isModified("password")) { next(); } // is there req to change password field of current document
    this.password = await bcrypt.hash(this.password, 10); // before save input password hashed and modified in password field and then save
    next();
})

// password match when login 
UserSchema.methods.isPasswordMatch = async function (password) { // document data have method to access this new method
    return bcrypt.compare(password, this.password); // user password and stored document password
}

const User = mongoose.model("User", UserSchema)
export default User;