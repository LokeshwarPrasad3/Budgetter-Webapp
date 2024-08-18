import { Router } from "express";
import { registerUser, loginUser, resetPassword } from "../controllers/user.controllers.js";
import { saveTodayExpenses } from "../controllers/expenses.controller.js";
const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/reset-password").patch(resetPassword);

router.route("/add-today-expenses").post(saveTodayExpenses)

export default router;