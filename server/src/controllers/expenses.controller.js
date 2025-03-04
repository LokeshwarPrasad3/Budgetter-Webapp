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
    console.log(`${req.user.username} Your total expenses `, totalExpenses)
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
    console.log(`${req.user.username} Your remaining balance `, user.currentPocketMoney)
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
    const { products } = todayExpenses
    console.log(todayExpenses);
    return res.status(200).json(
        new ApiResponse(200, products, "Today expenses found!!")
    )
})

// 3. add particular date expenses
export const addParticularDateExpenses = asyncHandler(async (req, res) => {
    const userId = req.user._id; // from middleware
    const { pastDaysExpensesArray } = req.body; // must be format of dd-mm-yy
    if (!Array.isArray(pastDaysExpensesArray) || pastDaysExpensesArray.length === 0) {
        throw new ApiError(400, "Must Provide Data!!");
    }
    const totalDaysExpenses = pastDaysExpensesArray.length;

    const user = await UserModel.findById(userId);
    let currentPocketMoney = parseFloat(user.currentPocketMoney);
    const results = [];
    let totalExpenses = 0;

    for (const expenses of pastDaysExpensesArray) {
        const { date, productsArray } = expenses;

        if (Array.isArray(productsArray) && productsArray.length > 0) {
            totalExpenses = productsArray.reduce((total, item) => total + item.price, 0);
            // console.log(`${req.user.username} Your total expenses `, totalExpenses);

            let createdExpenses;
            const firstExpensesOfDate = await ExpenseModel.findOne({ user: userId, date });

            if (!firstExpensesOfDate) {
                createdExpenses = await ExpenseModel.create({
                    user: userId,
                    date,
                    products: productsArray,
                });
            } else {
                createdExpenses = await ExpenseModel.updateOne(
                    { user: userId, date },
                    { $addToSet: { products: { $each: productsArray } } },
                    { new: true }
                );
            }

            if (!createdExpenses) {
                throw new ApiError(500, "Something went wrong with expense creation!");
            }
            results.push(createdExpenses);
            currentPocketMoney -= totalExpenses;
        }
    }

    user.currentPocketMoney = currentPocketMoney.toString();
    await user.save();
    console.log(`${req.user.name} - Your ${totalExpenses} Expenses Added, current Pocket Money ${user.currentPocketMoney} `)

    return res.status(201).json(new ApiResponse(201, null, `${totalDaysExpenses} Days Expenses created successfully!!`));
});

// 4. show particular date expenses
export const showParticularDateExpenses = asyncHandler(async (req, res) => {
    const { date } = req.body;
    const userId = req.user._id; // from middleware
    if (!date) {
        throw new ApiError(400, "Date is required!!");
    }
    const particularDateExpenses = await ExpenseModel.findOne({ user: userId, date });
    if (!particularDateExpenses) {
        res.status(200)
            .json(
                new ApiResponse(200, null, "No Expenses Found !!")
            )
    }
    res.status(200)
        .json(
            new ApiResponse(200, particularDateExpenses, "Expenses Found successfully!!")
        )
})

// 3. show all expenses
export const showAllDateExpenses = asyncHandler(async (req, res) => {
    const userId = req.user._id; // from middleware
    const AllDateExpenses = await ExpenseModel.find({ user: userId }).sort({ date: -1 });
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


