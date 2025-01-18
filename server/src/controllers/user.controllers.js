import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import UserModel from "../models/user.model.js";
import ExpenseModel from "../models/expenses.model.js";
import deletedUser from "../models/deletedUser.model.js";
import bcrypt from "bcrypt";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendMessageToUser } from "../utils/EmailSend.js";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, name, email, password } = req.body;
    if (!username.length > 5 || !name || !email || !password) {
        throw new ApiError(400, `${name} - Your All Fields Required!!`);
    }

    // check if user already exist
    const existedUser = await UserModel.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(400, `${username} - User Already Exist!!`);
    }
    const user = await UserModel.create({
        username: username.toLowerCase(), name, email, password
    })
    user.accessToken = await user.generateAccessToken();
    const accessToken = user.accessToken;
    await user.save({ validateBeforeSave: false });
    const createdUser = await UserModel.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError(500, `${username} - unable to register user!!`);
    }
    console.log(`${createdUser.name} - Your Account Successfully created!!`);
    console.log("Sending Email for Verification....");

    // now sent mail to verified their gmail
    // const token = await createdUser.generateAccountVerificationToken();
    const token = jwt.sign(
        { _id: createdUser._id },
        process.env.ACCOUNT_VERIFICATION_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCOUNT_VERIFICATION_TOKEN_SECRET_EXPIRY,
        },
    );
    const userName = createdUser.name;
    const type = "VERIFY_ACCOUNT";
    const userEmail = createdUser.email;
    const subject = "Budgetter Account Verification";
    const isSentGmail = await sendMessageToUser(userName, type, userEmail, subject, token)
    if (!isSentGmail) {
        console.log(`Failed to sent email to - ${userEmail}`);
    }

    const options = {
        httpOnly: true, // cannot access & modified by client javascript (document.cookie)
        secure: true // only send to https:// clinet 
    }
    res.status(201)
        // .cookie("accessToken", accessToken, options)
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
    const frontendURL = process.env.FRONTEND_URL;
    if (user.isVerified) {
        // throw new ApiError(400, "User not found!!");
        console.log(user.name, "Account already verified!!");
        res.redirect(`${frontendURL}/account-already-verified`);
        return;
    }
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });
    console.log("User verified - ", user.name)
    res.redirect(`${frontendURL}/account-verified`);
})

export const checkUserVerified = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(401, "User not authenticated!!");
    }
    res.status(200).json(
        new ApiResponse(200, user.isVerified, "User verified successfully!!")
    )
})

// get logged user data by cookies
export const getLoggedUserData = asyncHandler(async (req, res) => {
    const user = req.user;
    // console.log(`User Validated - ${user?.username}`)
    const data = {
        _id: user?._id,
        username: user?.username,
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar,
        isVerified: user?.isVerified,
        currentPocketMoney: user?.currentPocketMoney,
        PocketMoneyHistory: user?.PocketMoneyHistory,
        profession: user?.profession,
        dob: user?.dateOfBirth,
        instagramLink: user?.instagramLink,
        facebookLink: user?.facebookLink,
    }
    res.status(200).json(
        new ApiResponse(200, data, "User Found Successfully!!")
    )
})

export const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
        const identifier = email || username;
        throw new ApiError(400, `${identifier} - Your All Fields Required!!`);
    }
    console.log(username, email, password);
    // check if user already exist
    const existedUser = await UserModel.findOne({
        $or: [{ email }, { username }]
    });
    if (!existedUser) {
        throw new ApiError(400, `${email} - User does not Exist!!`);
    }
    const isPasswordValid = await existedUser.isPasswordMatch(password);
    if (!isPasswordValid) {
        throw new ApiError(400, `${email} - Your credentials are invalid!!`);
    }
    existedUser.accessToken = await existedUser.generateAccessToken();
    const accessToken = existedUser.accessToken;
    await existedUser.save({ validateBeforeSave: false });

    // Now User is valid
    const user = await UserModel.findById(existedUser._id).select("-password")
    // console.log(user);
    console.log(`${user.name} - Your Account Loggedin successfully!!`);

    const options = {
        httpOnly: false,
        secure: false
    }
    res.status(200)
        // .cookie("accessToken", accessToken, options)
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
    // const token = await existedUser.generateResetPasswordToken();
    // Generate token by RESET_PASSWORD_TOKEN_SECRET
    const token = jwt.sign(
        { _id: existedUser._id },
        process.env.RESET_PASSWORD_TOKEN_SECRET,
        {
            expiresIn: process.env.RESET_PASSWORD_TOKEN_SECRET_EXPIRY,
        },
    );
    console.log('token created', token);
    console.log(existedUser);
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
    console.log(token);

    // decode the token
    const decodedToken = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);
    if (!decodedToken) {
        throw new ApiError(400, "Invalid token");
    }
    console.log("token decoded successfully", decodedToken);
    const frontendURL = process.env.FRONTEND_URL;
    const user = await UserModel.findById(decodedToken?._id).select("_id");
    if (!user) {
        throw new ApiError(404, "User not found!!");
    }
    console.log("user id get successfully", user._id)
    res.redirect(`${frontendURL}/reset-password/${user?._id}`)
    // return res.status(201).json(
    //     new ApiResponse(201, user, "Token verified successfully!!")
    // )

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
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: existedUser?._id }, { $set: { password: hashPassword } }, { new: true });
    if (!updatedUser) {
        throw new ApiError(500, "Something went wrong!!");
    }
    console.log(updatedUser);
    return res.status(201).json(
        new ApiResponse(201, null, "Password updated successfully!!")
    )
})

export const forgotPassword = asyncHandler(async (req, res) => {

})

export const changeAvatar = asyncHandler(async (req, res) => {
    const avatarFilePath = req.file?.path
    // console.log("avatarFilePath", avatarFilePath);
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
    console.log(`${req.user.name} - Your New Avatar URL is :`, avatar?.secure_url)
    res.status(201).json(
        new ApiResponse(201, updatedUser, "Avatar changed successfully!")
    )
})

// add pocket money
export const addUserPocketMoney = asyncHandler(async (req, res) => {
    const { date, amount, source } = req.body;
    if (!date || !amount || !source) {
        throw new ApiError(400, "Fill All Fields!!");
    }
    const user = req.user;
    // Add the new amount to the currentPocketMoney
    const newAmount = parseFloat(user.currentPocketMoney) + parseFloat(amount);

    // add history track of added money
    user.PocketMoneyHistory.push({
        date, amount, source
    })
    // Update the user's currentPocketMoney
    user.currentPocketMoney = newAmount.toString();
    console.log(`${user.name} Your ${amount} Money is Added Total is ${newAmount}!!`)

    await user.save();
    res.status(201).json(
        new ApiResponse(201, { PocketMoneyHistory: user.PocketMoneyHistory, currentPocketMoney: user.currentPocketMoney }, "Pocket money added successfully!")
    )
})

// change user details
export const changeUserCredentials = asyncHandler(async (req, res) => {
    const { name, dob, currentPassword, newPassword, instagramLink, facebookLink, profession } = req.body;

    // If all fields are empty, throw an error
    if (!name && !dob && !currentPassword && !newPassword && !instagramLink && !facebookLink && !profession) {
        throw new ApiError(401, "At least one field must be provided to update.");
    }

    const user = req.user;
    const userId = user._id;
    let updatedFields = {}; // Store fields to update

    // Conditionally add fields to update
    if (name) updatedFields.name = name;
    if (dob) updatedFields.dateOfBirth = dob;
    if (instagramLink) updatedFields.instagramLink = instagramLink;
    if (facebookLink) updatedFields.facebookLink = facebookLink;
    if (profession) updatedFields.profession = profession;

    // Handle password update
    if (currentPassword !== "" && newPassword !== "") {
        if (!user.password) {
            throw new ApiError(500, "User password not found in database.");
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Current password is incorrect.");
        }
        // Hash and update new password if current password is valid
        updatedFields.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updatedFields },
        { new: true }
    );

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }
    console.log(`${req.user.name} details updated successfully!`);
    // Send response with null data
    res.status(200).json(
        new ApiResponse(200, null, "User credentials updated successfully!")
    );
});

export const deleteUserAccount = asyncHandler(async (req, res) => {
    // 1. Get current logged-in user and re-entered password
    const user = req.user;
    const userId = req.user._id;
    const { password } = req.body;

    // 2. Password validation
    const isPasswordMatch = await user?.isPasswordMatch(password);
    if (!isPasswordMatch) {
        console.log("Password is invalid");
        throw new ApiError(404, "Invalid Password");
    }
    console.log("Password validation successfully!");

    // 3. Make backup of user data
    const { name, username, email, avatar, currentPocketMoney } = user;
    const deleteUserDetails = {
        name,
        username,
        email,
        avatar,
        currentPocketMoney,
    };

    // 4. Remove all expenses of that user
    await ExpenseModel.deleteMany({ user: userId });
    console.log(name, "All Expenses are deleted");

    // 5. Remove that user
    const removeUser = await UserModel.deleteOne({ _id: userId });
    // console.log("User removed:", removeUser);

    // 6. Add that user to deletedUserModal collections to keep track of deleted user
    await deletedUser.create(deleteUserDetails);
    console.log(name, "User account deleted successfully");

    // 7. Send email acknowledgment
    const userName = username;
    const type = "DELETE_ACCOUNT";
    const userEmail = email;  // Should use the actual email from user
    const subject = "Budgetter - Account Deletion Confirmation";
    const token = "";
    const isSentGmail = await sendMessageToUser(userName, type, userEmail, subject, token);
    if (!isSentGmail) {
        console.log(`Failed to send email to - ${userEmail}`);
        throw new ApiError(500, "Failed to send account deletion confirmation email.");
    }

    // 8. Give response to user and logout
    res.status(200).json(
        new ApiResponse(200, null, "User Account Deleted Successfully")
    );
});


// logout functionality 
export const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError("User not exist, not logout");
        return;
    }
    user.accessToken = undefined;
    user.save();
    console.log(`${user?.username} Your Account has successfully Logout!!`);
    return res.status(200).json(
        new ApiResponse(200, null, "Successfully Logout")
    )
})


export const getAllAppUsersData = asyncHandler(async (req, res) => {
    const AllUsers = await UserModel.find();
    if (!AllUsers) {
        throw new ApiError("Users empty");
    }
    return res.status(200).json(
        new ApiResponse(200, AllUsers, "All Users Found")
    )
})


// Add Lent Money of any person
export const AddLentMoney = asyncHandler(async (req, res) => {
    const user = req.user;
    const { personName, price, date } = req.body;
    if (!personName || !price || !date) {
        throw new ApiError(400, "Lent Money Fiels are empty");
    }
    const regex = /^([0-2][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!regex.test(date)) {
        throw new ApiError(400, "Invalid date format. Please use dd-mm-yyyy.");
    }
    // push that object to LentMoneyHistory array
    user.LentMoneyHistory.push({
        personName, price, date
    })

    // need to minus pocket money
    const newPocketMoney = parseFloat(user.currentPocketMoney) - parseFloat(price);
    user.currentPocketMoney = newPocketMoney.toString();

    const TotalLentMoney = user.LentMoneyHistory.reduce((total, lent) => total + parseFloat(lent.price), 0)
    await user.save();
    res.status(201).json(
        new ApiResponse(201, { TotalLentMoney, currentPocketMoney: newPocketMoney }, "Lent money successfully!")
    )
})

// if money is received then add that money to currentPocket money
export const receivedLentMoney = asyncHandler(async (req, res) => {
    const user = req.user;
    const { lentMoneyId } = req.body;

    if (!lentMoneyId) {
        throw new ApiError(400, "Lent Money Id cannot be empty");
    }

    // Find price of the Lent Money
    const lentMoneyObject = await UserModel.findOne(
        { _id: user._id },
        { LentMoneyHistory: { $elemMatch: { _id: lentMoneyId } } }
    );

    if (!lentMoneyObject || lentMoneyObject.LentMoneyHistory.length === 0) {
        throw new ApiError(400, "Lent Money record not found");
    }

    const price = lentMoneyObject.LentMoneyHistory[0].price;

    // Delete the lent data from the history
    const result = await UserModel.updateOne(
        { _id: user._id, "LentMoneyHistory._id": lentMoneyId },
        {
            $pull: {
                LentMoneyHistory: { _id: lentMoneyId }
            }
        }
    );

    if (result.modifiedCount === 0) {
        throw new ApiError("Lent money record not found");
    }

    // Add the price to the current pocket money
    const newPocketMoney = parseFloat(user.currentPocketMoney) + parseFloat(price);
    user.currentPocketMoney = newPocketMoney.toString();
    await user.save();

    res.status(201).json(
        new ApiResponse(201, { currentPocketMoney: newPocketMoney }, "Lent Deleted and money added successfully!")
    );
});

// return all lent money of user
export const getAllLentMoneyHistory = asyncHandler(async (req, res) => {
    const user = req.user;
    res.status(200).json(
        new ApiResponse(200, { LentMoneyHistory: user.LentMoneyHistory }, "All Lent Money Found Successfully")
    )
})

