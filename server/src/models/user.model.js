import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PocketMoneyHistorySchema = new Schema({
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
    amount: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const LentMoneyHistorySchema = new Schema({
    personName: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    LentMoneyHistory: {
        type: [LentMoneyHistorySchema],
        default: []
    },
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
    dateOfBirth: {
        type: String,
        default: "",
        required: false,
    },
    profession: {
        type: String,
        default: "",
        required: false,
    },
    instagramLink: {
        type: String,
        default: "",
        required: false,
    },
    facebookLink: {
        type: String,
        default: "",
        required: false,
    },
    PocketMoneyHistory: {
        type: [PocketMoneyHistorySchema],
        default: []
    },
    LentMoneyHistory: {
        type: [LentMoneyHistorySchema],
        default: []
    },
    currentPocketMoney: {
        type: String,
        default: "0"
    },
    password: {
        type: String,
        required: function () {
            return this.authProvider === 'local';
        },
        select: false,
    },
    googleId: {
        type: String,
        default: null,
    },
    authProvider: {
        type: String,
        enum: ['google', 'local'], 
        required: true,
        default: 'local',
    },
    accessToken: {
        type: String,
        default: undefined
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
    // console.log("is password modified? ", this.isModified("password"));
    // this refers to instance document
    if (!this.isModified("password")) {
        // console.log("password not changed");
        return next();
    } // is there req to change password field of current document
    this.password = await bcrypt.hash(this.password, 10); // before save input password hashed and modified in password field and then save
    // console.log("password changed");
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