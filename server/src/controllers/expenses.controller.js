import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getTodayDate } from "../utils/getCurrentDate.js";
import ExpenseModel from "../models/expenses.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// 1. post expenses of current date
export const saveTodayExpenses = asyncHandler(async (req, res) => {
    // need userid , currentdate (default), productsArray[] = name, price, category
    const currentDate = getTodayDate();
    const { productsArray } = req.body;
    const userId = req.user._id; // from middleware
    if (!currentDate || !productsArray || productsArray?.length === 0) {
        throw new ApiError(400, "All Field required!!");
    }

    // is today expense push first time
    const firstExpensesOfToday = await ExpenseModel.findOne({ user: userId, date: currentDate }) // today date is default used
    let createdExpenses;
    if (firstExpensesOfToday === null) {
        createdExpenses = await ExpenseModel.create({
            user: userId,
            products: productsArray
        })
    } else {
        // update expense to push in products array
        createdExpenses = await ExpenseModel.updateOne({ user: userId, date: currentDate }, {
            $addToSet: {
                products: {
                    $each: productsArray
                }
            }
        }, { new: true })
    }
    if (!createdExpenses) {
        throw new ApiError(500, "Something went wrong!!");
    }
    console.log(createdExpenses);
    return res.status(201).json(
        new ApiResponse(201, createdExpenses, "Expenses created successfully!!")
    )
})

// 2. show today expenses always first
export const showTodayExpenses = asyncHandler(async (req, res) => {
    const currentDate = getTodayDate();
    const todayExpenses = await ExpenseModel.findOne({ user: req.user._id, date: currentDate });
    if (!todayExpenses) {
        throw new ApiError(404, "No expenses found!!");
    }
    console.log(todayExpenses);
    return res.status(200).json(
        new ApiResponse(200, todayExpenses, "Today expenses found!!")
    )
})

// 2. show particular date expenses

// 3. show all expenses


// NOTE
// populate is used to show data from different collection
// in this case, we are showing expense data with user data


