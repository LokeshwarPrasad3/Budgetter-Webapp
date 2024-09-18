import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getTodayDate } from "../utils/getCurrentDate.js";
import ExpenseModel from "../models/expenses.model.js";
import UserModel from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// 1. post expenses of current date
export const addTodayExpenses = asyncHandler(async (req, res) => {
    // need userid , currentdate (default), productsArray[] = name, price, category
    const currentDate = getTodayDate();
    const { productsArray } = req.body;
    const userId = req.user._id; // from middleware
    if (!currentDate || !productsArray || productsArray?.length === 0) {
        throw new ApiError(400, "All Field required!!");
    }
    // calculate total expenses price
    const totalExpenses = productsArray.reduce((total, item) => (total + item.price), 0)
    console.log("Your total expenses ", totalExpenses)
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
    // now minus from user poket money
    const user = await UserModel.findOne({ _id: userId });
    const newBalance = parseFloat(user.currentPocketMoney) - parseFloat(totalExpenses);
    user.currentPocketMoney = newBalance.toString();
    console.log("You remaining balance", user.currentPocketMoney)
    await user.save();
    console.log(createdExpenses);
    return res.status(201).json(
        new ApiResponse(201, createdExpenses, { currentPocketMoney: user.currentPocketMoney }, "Expenses created successfully!!")
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

// 3. add particular date expenses
export const addParticularDateExpenses = asyncHandler(async (req, res) => {
    // need userid , currentdate (default), productsArray[] = name, price, category
    const userId = req.user._id; // from middleware
    const { date } = req.body; // must be formate of dd-mm-yy
    if (date.split("-").length !== 3) {
        throw new ApiError(400, "Date must be dd-mm-yy format");
    }
    const { productsArray } = req.body;
    if (!productsArray || productsArray?.length === 0) {
        throw new ApiError(400, "All Field required!!");
    }
    const totalExpenses = productsArray.reduce((total, item) => (total + item.price), 0)
    console.log("Your total expenses ", totalExpenses)

    // is that date push expenses first time
    const firstExpensesOfDate = await ExpenseModel.findOne({ user: userId, date }) // today date is default used
    let createdExpenses;
    if (firstExpensesOfDate === null) {
        createdExpenses = await ExpenseModel.create({
            user: userId,
            date,
            products: productsArray
        })
    } else {
        // update expense to push in products array
        createdExpenses = await ExpenseModel.updateOne({ user: userId, date }, {
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
    // now minus from user poket money
    const user = await UserModel.findOne({ _id: userId });
    const newBalance = parseFloat(user.currentPocketMoney) - parseFloat(totalExpenses);
    user.currentPocketMoney = newBalance.toString();
    console.log("You remaining balance", user.currentPocketMoney)
    await user.save();
    return res.status(201).json(
        new ApiResponse(201, createdExpenses, "Expenses created successfully!!")
    )
})

// 4. show particular date expenses
export const showParticularDateExpenses = asyncHandler(async (req, res) => {
    const { date } = req.body;
    const userId = req.user._id; // from middleware
    if (!date) {
        throw new ApiError(400, "Date is required!!");
    }
    const particularDateExpenses = await ExpenseModel.findOne({ user: userId, date });
    if (!particularDateExpenses) {
        throw new ApiError(404, "No expenses found!!");
    }
    res.status(200)
        .json(
            new ApiResponse(200, particularDateExpenses, "Expenses Found successfully!!")
        )
})

// 3. show all expenses
export const showAllDateExpenses = asyncHandler(async (req, res) => {
    const userId = req.user._id; // from middleware
    const AllDateExpenses = await ExpenseModel.find({ user: userId });
    if (!AllDateExpenses) {
        throw new ApiError(404, "No expenses found!!");
    }
    console.log(AllDateExpenses);
    res.status(200)
        .json(
            new ApiResponse(200, AllDateExpenses, "All Expenses Found successfully!!")
        )
})


// NOTE
// populate is used to show data from different collection
// in this case, we are showing expense data with user data


