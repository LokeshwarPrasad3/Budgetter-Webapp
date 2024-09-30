import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import UserModel from "../models/user.model.js";

const verifyJwtToken = async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || (req.cookies?.accessToken && req.header("Authorization").replace("Bearer ", ""));
        if (!token) {
            throw new ApiError(401, "UnAuthorized User!!");
        }
        // console.log("token is ", token)

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        if (!decodedToken) {
            throw new ApiError(401, "Token decode Error!!")
        }
        const user = await UserModel.findById(decodedToken?._id).select("-password -accessToken");
        if (!user) {
            throw new ApiError(401, "User not found by Access Token")
        }
        req.user = user;
        next();

    } catch (error) {
        // throw new ApiError(401, "Invalid Access Token!!");
        console.log(error);
    }
}

export default verifyJwtToken