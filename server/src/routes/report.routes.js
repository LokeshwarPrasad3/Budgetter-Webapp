import { Router } from "express";
import { TotalExpensesAndAddedMoneyOfMonth, } from "../controllers/reports.controllers.js";
import verifyJwtToken from "../middleware/auth.middleware.js";



const router = Router();

router.route("/total-expenses-and-added-money-in-month").post(verifyJwtToken, TotalExpensesAndAddedMoneyOfMonth)


export default router