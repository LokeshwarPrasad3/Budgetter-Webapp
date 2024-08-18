import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

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
    user.refreshToken = await user.generateRefreshToken();
    await user.save({ validateBeforeSave: false });
    const createdUser = await UserModel.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong during register user!!");
    }
    console.log(createdUser);
    res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully!")
    )
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
    existedUser.refreshToken = await existedUser.generateRefreshToken();
    await existedUser.save({ validateBeforeSave: false });
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid user credentials!!");
    }
    // Now User is valid
    const user = await UserModel.findById(existedUser._id).select("-password -refreshToken")

    console.log(user);
    res.status(200).json(
        new ApiResponse(200, user, "Login Successfully!!")
    )
})

export const resetPassword = asyncHandler(async (req, res) => {
    const { email, prevPassword, newPassword } = req.body;
    if (!email || !prevPassword || !newPassword) {
        throw new ApiError(400, "All Fields are required!!");
    }

    const existedUser = await UserModel.findOne({ email });
    if (!existedUser) {
        throw new ApiError(400, "Invalid Credentials!!");
    }
    const isPasswordValid = await existedUser.isPasswordMatch(prevPassword);
    if (!isPasswordValid) {
        throw new Error(400, "Password is Incorrect!!");
    }

    // hash password, because of findByIdAndUpdate is not trigger pre("save") method 
    const hashPassword = await bcrypt.hash(newPassword, 10);
    console.log("new hashedpassword ", hashPassword);
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: existedUser?._id }, { $set: { password: hashPassword } }, { new: true }).select("-password -refreshToken");
    if (!updatedUser) {
        throw new ApiError(500, "Something went wrong!!");
    }
    console.log(updatedUser);
    return res.status(201).json(
        new ApiResponse(201, updatedUser, "Password updated successfully!!")
    )
})



