import { Router } from "express";
import { registerUser, loginUser, resetPassword } from "../controllers/user.controllers.js";
import { saveTodayExpenses, showTodayExpenses } from "../controllers/expenses.controller.js";
import verifyJwtToken from "../middleware/auth.middleware.js";
const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/reset-password").patch(resetPassword);

router.route("/add-today-expenses").post(verifyJwtToken, saveTodayExpenses)
router.route("/show-today-expenses").get(verifyJwtToken, showTodayExpenses)

export default router;