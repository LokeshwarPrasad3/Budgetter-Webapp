import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: existedUser?._id }, { $set: { password: hashPassword } }, { new: true }).select("-password -accessToken");
    if (!updatedUser) {
        throw new ApiError(500, "Something went wrong!!");
    }
    console.log(updatedUser);
    return res.status(201).json(
        new ApiResponse(201, updatedUser, "Password updated successfully!!")
    )
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


