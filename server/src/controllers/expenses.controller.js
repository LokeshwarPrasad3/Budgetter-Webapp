import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getTodayDate } from "../utils/getCurrentDate.js";
import ExpenseModel from "../models/expenses.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// 0. post expenses of current date
export const saveTodayExpenses = asyncHandler(async (req, res) => {
    // need userid , currentdate (default), productsArray[] = name, price, category
    const currentDate = getTodayDate();
    const { userId, productsArray } = req.body;
    if (!userId || !currentDate || !productsArray || productsArray?.length === 0) {
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


// 1. show expenses of current date
const currentDateExpenses = asyncHandler(async (req, res) => {
    // need current date and /?user=userId
    const { user } = req.query;
    const currentDate = getTodayDate();
    // check that user exist ? from order
    // if exist then show their all expense for current date
})

// 2. show particular date expenses

// 3. show all expenses


// NOTE
// populate is used to show data from different collection
// in this case, we are showing expense data with user data


