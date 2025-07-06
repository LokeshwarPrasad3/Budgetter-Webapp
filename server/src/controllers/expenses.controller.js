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
    // console.log(createdExpenses);
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

// 5. show all expenses
export const showAllDateExpenses = asyncHandler(async (req, res) => {
    const userId = req.user._id; // from middleware
    const AllDateExpenses = await ExpenseModel.find({ user: userId }).sort({ date: -1 });
    if (!AllDateExpenses) {
        throw new ApiError(404, "No expenses found!!");
    }
    // console.log(AllDateExpenses);
    res.status(200)
        .json(
            new ApiResponse(200, AllDateExpenses, "All Expenses Found successfully!!")
        )
})

// 6. Edit single expenses 
export const editUserExpenses = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { expenseId, actualDate, expenseName, selectedLabel, expensePrice, expenseCategory, expenseDate } = req.body;

    // Validate input values in one line.
    if (!expenseName || !expenseCategory || !expenseDate || typeof expensePrice !== 'number' || !/^\d{2}-\d{2}-\d{4}$/.test(actualDate)) {
        throw new ApiError(400, "Invalid input values.");
    }

    let actualExpensePrice = 0;

    // Find existing expenses on the given date for the user
    const existExpenses = await ExpenseModel.findOne({
        user: userId,
        date: actualDate
    });

    if (!existExpenses) {
        throw new ApiError(500, "Something went wrong!!");
    }

    // Find the specific product to update
    const ExpensesFound = existExpenses?.products?.find((prod) => prod._id.toString() === expenseId);
    actualExpensePrice = ExpensesFound?.price;

    if (typeof actualExpensePrice !== 'number' || isNaN(actualExpensePrice)) {
        throw new ApiError(500, "Previous expense price is invalid.");
    }

    if (actualDate === expenseDate && ExpensesFound) {
        // Update product details
        ExpensesFound.name = expenseName;
        ExpensesFound.price = expensePrice;
        ExpensesFound.category = expenseCategory;
        ExpensesFound.label = selectedLabel;

        // Save updated expense
        await existExpenses.save();
    } else {
        // Delete product from previous date
        const existingExpenseCollection = await ExpenseModel.findOneAndUpdate(
            { user: userId, date: actualDate },
            { $pull: { products: { _id: expenseId } } },
            { new: true }
        );

        // Delete the entire document if no products left
        if (existingExpenseCollection && existingExpenseCollection.products.length === 0) {
            await ExpenseModel.findOneAndDelete({ user: userId, date: actualDate });
        }

        // Add product to the new date
        const ExpenseNewDateExist = await ExpenseModel.findOne({
            user: userId,
            date: expenseDate
        });

        const productObject = {
            name: expenseName,
            price: expensePrice,
            category: expenseCategory,
            label: selectedLabel
        };

        if (!ExpenseNewDateExist) {
            await ExpenseModel.create({
                user: userId,
                products: [productObject],
                date: expenseDate,
            });
        } else {
            await ExpenseModel.findOneAndUpdate(
                { user: userId, date: expenseDate },
                { $addToSet: { products: productObject } },
                { new: true }
            );
        }
    }

    // Update user's pocket money
    const user = req.user;

    const priceDifferences = parseFloat(actualExpensePrice) - parseFloat(expensePrice);

    if (isNaN(priceDifferences)) {
        throw new ApiError(500, "Price difference calculation failed.");
    }

    const currentMoney = parseFloat(user.currentPocketMoney);

    if (isNaN(currentMoney)) {
        throw new ApiError(500, "User's current pocket money is invalid.");
    }

    const newBalance = currentMoney + priceDifferences;

    if (isNaN(newBalance)) {
        throw new ApiError(500, "New balance calculation failed.");
    }

    user.currentPocketMoney = newBalance.toFixed(2);

    console.log(`${req.user.username} Your remaining balance: `, user.currentPocketMoney);

    // Save updated user balance
    await user.save();

    // Return success response
    return res.status(201).json(new ApiResponse(201, null, "Expenses updated successfully!"));
});

// 7. Delete single expense
export const deleteUserExpenses = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { expenseId, expenseDate, isAddPriceToPocketMoney } = req.body;
    console.log("Delete Expense:", expenseId, "Date:", expenseDate, "Update Price to Pocket Money:", isAddPriceToPocketMoney);

    // Step 1: Validate input values early
    if (!expenseDate || !/^\d{2}-\d{2}-\d{4}$/.test(expenseDate)) {
        throw new ApiError(400, "Invalid expense date format. Expected DD-MM-YYYY.");
    }

    // Step 2: Find if the product exists inside the expense document
    const existingExpense = await ExpenseModel.findOne(
        { user: userId, date: expenseDate, 'products._id': expenseId },
        { 'products.$': 1 } // Only return the matched product inside products array
    );

    // Step 3: Check if the product was found
    const foundProduct = existingExpense?.products?.[0];
    if (!foundProduct) {
        throw new ApiError(404, "Expense not found.");
    }

    const expensePrice = foundProduct.price;

    // Step 4: Now safely remove the product from the array
    const updatedExpense = await ExpenseModel.findOneAndUpdate(
        { user: userId, date: expenseDate },
        { $pull: { products: { _id: expenseId } } },
        { new: true }
    );

    // Step 5: After removal, if the products array becomes empty, delete the whole document
    if (updatedExpense && updatedExpense.products.length === 0) {
        await ExpenseModel.deleteOne({ _id: updatedExpense._id });
    }

    // Step 6: If requested, add the product price back to user's pocket money
    if (isAddPriceToPocketMoney) {
        const user = req.user;

        const newBalance = parseFloat(user.currentPocketMoney) + parseFloat(expensePrice || 0);
        user.currentPocketMoney = newBalance.toString();

        console.log(`${user.username} your updated pocket money balance: ${user.currentPocketMoney}`);

        await user.save(); // Save updated user balance
    }

    // Step 7: Return success response
    return res.status(201).json(new ApiResponse(201, null, "Expense deleted successfully!"));
});





