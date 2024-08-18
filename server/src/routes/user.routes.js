import { Router } from "express";
import { registerUser, loginUser, resetPassword, changeAvatar, validateResetPasswordToken, validateAccountVerification } from "../controllers/user.controllers.js";
import { showParticularDateExpenses, addTodayExpenses, addParticularDateExpenses, showTodayExpenses, showAllDateExpenses } from "../controllers/expenses.controller.js";
import verifyJwtToken from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js"
const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/change-avatar").post(verifyJwtToken, upload.single("avatar"), changeAvatar) // avatar is name value attribute client of img tag

// account verification sent by gmail
router.route("/account-verification").get(validateAccountVerification);

// authentication routes
router.route("/reset-password").patch(resetPassword);
router.route("/reset-password/validate").get(validateResetPasswordToken);

// for current day
router.route("/add-today-expenses").post(verifyJwtToken, addTodayExpenses)
router.route("/show-today-expenses").get(verifyJwtToken, showTodayExpenses)

// for past day
router.route("/add-past-date-expenses").post(verifyJwtToken, addParticularDateExpenses)
router.route("/show-past-date-expenses").post(verifyJwtToken, showParticularDateExpenses)

// all expenses of user
router.route("/show-all-date-expenses").get(verifyJwtToken, showAllDateExpenses);

export default router;