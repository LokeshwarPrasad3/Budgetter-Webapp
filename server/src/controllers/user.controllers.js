import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import UserModel from "../models/user.model.js";

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