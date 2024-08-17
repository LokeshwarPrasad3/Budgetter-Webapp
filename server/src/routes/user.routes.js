import { Router } from "express";
import { registerUser, loginUser, resetPassword } from "../controllers/user.controllers.js";
const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/reset-password").patch(resetPassword);



export default router;