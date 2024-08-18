import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    accessToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// before save password must be encrypted using bcrypt.js
UserSchema.pre("save", async function (next) {
    console.log("is password modified? ", this.isModified("password"));
    // this refers to instance document
    if (!this.isModified("password")) { console.log("password not changed"); return next(); } // is there req to change password field of current document
    this.password = await bcrypt.hash(this.password, 10); // before save input password hashed and modified in password field and then save
    console.log("password changed");
    next();
})

// password match when login 
UserSchema.methods.isPasswordMatch = async function (password) { // document data have method to access this new method
    return bcrypt.compare(password, this.password); // user password and stored document password
}

// method which generate token
UserSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRY
        }
    )
}

// method which generate token for reset-password
UserSchema.methods.generateResetPasswordToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.RESET_PASSWORD_TOKEN_SECRET,
        {
            expiresIn: process.env.RESET_PASSWORD_TOKEN_SECRET_EXPIRY
        }
    )

}

// method which generate token for reset-password
UserSchema.methods.generateAccountVerificationToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCOUNT_VERIFICATION_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCOUNT_VERIFICATION_TOKEN_SECRET_EXPIRY
        }
    )

}

const User = mongoose.model("User", UserSchema)
export default User;