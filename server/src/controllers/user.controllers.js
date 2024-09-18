import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendMessageToUser } from "../utils/EmailSend.js";
import jwt from "jsonwebtoken";
import { clientURL } from "../utils/constants.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, name, email, password } = req.body;
    if (!username.length > 5 || !name || !email || !password) {
        throw new ApiError(400, "All Fields are required!!");
    }

    // check if user already exist
    const existedUser = await UserModel.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(400, "User Already Exist!!");
    }
    const user = await UserModel.create({
        username: username.toLowerCase(), name, email, password
    })
    user.accessToken = await user.generateAccessToken();
    const accessToken = user.accessToken;
    await user.save({ validateBeforeSave: false });
    const createdUser = await UserModel.findById(user._id).select("-password -accessToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong during register user!!");
    }
    console.log(createdUser);


    // now sent mail to verified their gmail
    const token = await createdUser.generateAccountVerificationToken();
    const userName = createdUser.name;
    const type = "VERIFY_ACCOUNT";
    const userEmail = createdUser.email;
    const subject = "Budgetter Account Verification";
    const isSentGmail = await sendMessageToUser(userName, type, userEmail, subject, token)
    if (!isSentGmail) {
        console.log("failed to sent gmail!!");
    }

    const options = {
        httpOnly: true, // cannot access & modified by client javascript (document.cookie)
        secure: true // only send to https:// clinet 
    }
    res.status(201)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(201, createdUser, "User registered successfully!")
        )
})

// verify link clicked then this controller run
export const validateAccountVerification = asyncHandler(async (req, res) => {
    const token = req.query.token;
    if (!token) {
        throw new ApiError(400, "Token is required!!");
    }
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.ACCOUNT_VERIFICATION_TOKEN_SECRET)
    if (!decodedToken) {
        throw new ApiError(400, "Invalid token!!");
    }
    const user = await UserModel.findById(decodedToken._id)
    if (!user) {
        throw new ApiError(400, "User not found!!");
    }
    if (user.isVerified) {
        throw new ApiError(400, "Account already verified!!");
    }
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });
    console.log("user verified", user)
    res.redirect(`${clientURL}/account-verified`);
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All Fields are required!!");
    }
    // check if user already exist
    const existedUser = await UserModel.findOne({ email });
    if (!existedUser) {
        throw new ApiError(400, "User does not Exist!!");
    }
    const isPasswordValid = await existedUser.isPasswordMatch(password);

    existedUser.accessToken = await existedUser.generateAccessToken();
    const accessToken = existedUser.accessToken;

    await existedUser.save({ validateBeforeSave: false });
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid user credentials!!");
    }
    // Now User is valid
    const user = await UserModel.findById(existedUser._id).select("-password -accessToken")
    console.log(user);

    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, user, "Login Successfully!!")
        )
})

export const sentTokenToResetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const existedUser = await UserModel.findOne({ email });
    if (!existedUser) {
        throw new ApiError(404, "User not found");
    }

    // get token for reset-password
    const token = await existedUser.generateResetPasswordToken();
    const userName = existedUser.name;
    const type = "RESET_PASSWORD";
    const userEmail = existedUser.email;
    const subject = "Budgetter Password Reset";
    const isSentGmail = await sendMessageToUser(userName, type, userEmail, subject, token)
    if (!isSentGmail) {
        throw new ApiError(500, "Failed to send email");
    }
    return res.status(200).json(
        new ApiResponse(200, "Reset link sent successfully!!")
    )

})

// verify email link when clicked then validated token
export const validateResetPasswordToken = asyncHandler(async (req, res) => {

    const token = req.query.token; // ?token=jwttoken

    // decode the token
    const decodedToken = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);
    if (!decodedToken) {
        throw new ApiError(400, "Invalid token");
    }
    console.log("token get successfully", token);

    const user = await UserModel.findById(decodedToken._id).select("_id");
    if (!user) {
        throw new ApiError(404, "User not found!!");
    }
    console.log("user get successfully", user)

    return res.status(201).json(
        new ApiResponse(201, user, "Token verified successfully!!")
    )

})

// after all entered password then lastly changed password
export const resetPassword = asyncHandler(async (req, res) => {
    const { userId, newPassword } = req.body;
    if (!userId || !newPassword) {
        throw new ApiError(400, "All Fields are required!!");
    }

    const existedUser = await UserModel.findById(userId);
    if (!existedUser) {
        throw new ApiError(400, "Invalid Credentials!!");
    }
    // hash password, because of findByIdAndUpdate is not trigger pre("save") method 
    const hashPassword = await bcrypt.hash(newPassword, 10);
    console.log("new hashedpassword ", hashPassword);
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: existedUser?._id }, { $set: { password: hashPassword } }, { new: true }).select("");
    if (!updatedUser) {
        throw new ApiError(500, "Something went wrong!!");
    }
    console.log(updatedUser);
    return res.status(201).json(
        new ApiResponse(201, updatedUser, "Password updated successfully!!")
    )
})

export const forgotPassword = asyncHandler(async (req, res) => {

})

export const changeAvatar = asyncHandler(async (req, res) => {
    const avatarFilePath = req.file?.path
    console.log("avatarFilePath", avatarFilePath);
    if (!avatarFilePath) {
        throw new ApiError(400, "Avatar file required!!");
    }
    const avatar = await uploadOnCloudinary(avatarFilePath);
    if (!avatar) {
        throw new ApiError(400, "Failed to get url of avatar!!");
    }

    const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, {
        $set: {
            avatar: avatar?.secure_url
        }
    },
        { new: true }
    ).select("avatar");
    if (!updatedUser) {
        throw new ApiError(500, "Avatar not updated!!");
    }
    res.status(201).json(
        new ApiResponse(201, updatedUser, "Avatar changed successfully!")
    )
})

// add pocket money
export const addUserPocketMoney = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    if (!amount) {
        throw new ApiError(400, "Invalid money!!");
    }
    const user = req.user;
    // Add the new amount to the currentPocketMoney
    const newAmount = parseFloat(user.currentPocketMoney) + parseFloat(amount);

    // Update the user's currentPocketMoney
    user.currentPocketMoney = newAmount.toString();
    await user.save();
    res.status(201).json(
        new ApiResponse(201, { currentPocketMoney: user.currentPocketMoney }, "Pocket money added successfully!")
    )
})

