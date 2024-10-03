import ExpenseModel from "../models/expenses.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// 1. TOTAL EXPENSES A MONTH
export const TotalExpensesAndAddedMoneyOfMonth = asyncHandler(async (req, res) => {
    const user = req.user;
    const userId = req.user._id;
    const { month } = req.body;
    if (typeof month !== 'string') {
        console.log("month must be string");
        throw new ApiError(500, "Month should be string!!");
    }
    const MonthExpenses = await ExpenseModel.find({
        user: userId,
        date: { $regex: `^\\d{2}-${month}-\\d{4}$` }
    });
    const totalExpenses = MonthExpenses.reduce((accumulator, currentArray) => {
        const productTotal = currentArray.products.reduce((innerAccu, product) => {
            return innerAccu + product.price;
        }, 0);

        return accumulator + productTotal;
    }, 0);

    console.log(totalExpenses);

    if (!MonthExpenses) {
        throw new ApiError(500, "Error during getting totel expenses!!");
    }

    const PocketMoneyHistoryArray = user.PocketMoneyHistory;
    const totalAddedMoney = PocketMoneyHistoryArray.reduce((accumulator, currentArray) => {
        return accumulator + parseInt(currentArray.amount);
    }, 0);

    console.log(totalAddedMoney);

    return res.json(
        new ApiResponse(200, { totalExpenses: totalExpenses, totalAddedMoney: totalAddedMoney }, "Successfully Calculated Expenses!!")
    )

})

// 2. TOTAL ADDED MONEY IN MONTH
export const TotalAddedMoneyInMonth = asyncHandler(async (req, res) => {
    const user = req.user;
    const { month } = req.body;
    if (typeof month !== 'string') {
        console.log("month must be string");
        throw new ApiError(500, "Month should be string!!");
    }
    const PocketMoneyHistoryArray = user.PocketMoneyHistory;
    const totalAddedMoney = PocketMoneyHistoryArray.reduce((accumulator, currentArray) => {
        return accumulator + parseInt(currentArray.amount);
    }, 0);

    console.log(totalAddedMoney);

    if (!totalAddedMoney) {
        throw new ApiError(500, "Error during getting totel money!!");
    }

    return res.json(
        new ApiResponse(200, { totalMoney: totalAddedMoney }, "Successfully Calculated Expenses!!")
    )
})
