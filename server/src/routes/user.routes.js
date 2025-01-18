import { Router } from "express";
import { registerUser, loginUser, resetPassword, changeAvatar, validateResetPasswordToken, validateAccountVerification, addUserPocketMoney, getLoggedUserData, logoutUser, sentTokenToResetPassword, checkUserVerified, changeUserCredentials, deleteUserAccount, getAllAppUsersData } from "../controllers/user.controllers.js";
import { showParticularDateExpenses, addTodayExpenses, addParticularDateExpenses, showTodayExpenses, showAllDateExpenses } from "../controllers/expenses.controller.js";
import verifyJwtToken from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js"
const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/change-avatar").post(verifyJwtToken, upload.single("avatar"), changeAvatar) // avatar is name value attribute client of img tag
router.route("/get-user-data").get(verifyJwtToken, getLoggedUserData)

router.route("/change-user-details").patch(verifyJwtToken, changeUserCredentials)

// account verification sent by gmail
router.route("/account-verification").get(validateAccountVerification);
router.route("/is-user-verified").get(verifyJwtToken, checkUserVerified)

// Reset Link send throw email
router.route("/send-reset-link").post(sentTokenToResetPassword);
router.route("/reset-password/validate").get(validateResetPasswordToken);
router.route("/reset-password").patch(resetPassword);

// for current day
router.route("/add-today-expenses").post(verifyJwtToken, addTodayExpenses)
router.route("/show-today-expenses").get(verifyJwtToken, showTodayExpenses)

// for past day
router.route("/add-past-date-expenses").post(verifyJwtToken, addParticularDateExpenses)
router.route("/show-past-date-expenses").post(verifyJwtToken, showParticularDateExpenses)

// all expenses of user
router.route("/show-all-date-expenses").get(verifyJwtToken, showAllDateExpenses);

// add money
router.route("/add-money").post(verifyJwtToken, addUserPocketMoney)

// delete user account feature
router.route("/delete-account").delete(verifyJwtToken, deleteUserAccount)

// logout
router.route("/logout").get(verifyJwtToken, logoutUser)

// get all users list
router.route("/get-all-users").get(getAllAppUsersData);

export default router;