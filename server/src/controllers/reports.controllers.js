import ExpenseModel from "../models/expenses.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// 1. TOTAL EXPENSES A MONTH
export const TotalExpensesAndAddedMoneyOfMonth = asyncHandler(async (req, res) => {
    const user = req.user;
    const userId = req.user._id;
    const { month, year } = req.body;
    if (typeof month !== 'string' || typeof year !== 'string') {
        console.log("month or year must be string");
        throw new ApiError(500, "Month and year should be string!!");
    }
    console.log("year month", month, year)
    // 1. Calculate Total Expenses Of Month
    const MonthExpenses = await ExpenseModel.find({
        user: userId,
        date: { $regex: `^\\d{2}-${month}-${year}` }
    });
    console.log(MonthExpenses)
    // Groceries , Housing & Utilities, Medical ,
    // Food , Personal , Educational , Transportation
    // Miscellaneous
    let GroceriesExpenses = 0,
        Housing_UtilitiesExpenses = 0,
        MedicalExpenses = 0,
        FoodExpenses = 0,
        PersonalExpenses = 0,
        EducationalExpenses = 0,
        TransportationExpenses = 0,
        MiscellaneousExpenses = 0;
    const totalExpenses = MonthExpenses.reduce((accumulator, currentArray) => {
        const productTotal = currentArray.products.reduce((innerAccu, product) => {
            if (product.category === 'Groceries') { GroceriesExpenses += product.price }
            else if (product.category === 'Housing & Utilities') { Housing_UtilitiesExpenses += product.price }
            else if (product.category === 'Medical') { MedicalExpenses += product.price }
            else if (product.category === 'Food') { FoodExpenses += product.price }
            else if (product.category === 'Personal') { PersonalExpenses += product.price }
            else if (product.category === 'Educational') { EducationalExpenses += product.price }
            else if (product.category === 'Transportation') { TransportationExpenses += product.price }
            else if (product.category === 'Miscellaneous') { MiscellaneousExpenses += product.price }
            return innerAccu + product.price;
        }, 0);

        return accumulator + productTotal;
    }, 0);
    const categoryWiseExpensesData = {
        GroceriesExpenses,
        Housing_UtilitiesExpenses,
        MedicalExpenses,
        FoodExpenses,
        PersonalExpenses,
        EducationalExpenses,
        TransportationExpenses,
        MiscellaneousExpenses,
    }
    // console.log(
    //     "all expenses",
    //     "GroceriesExpenses",
    //     GroceriesExpenses,
    //     "Housing_UtilitiesExpenses",
    //     Housing_UtilitiesExpenses,
    //     "MedicalExpenses",
    //     MedicalExpenses,
    //     "FoodExpenses",
    //     FoodExpenses,
    //     "PersonalExpenses",
    //     PersonalExpenses,
    //     "EducationalExpenses",
    //     EducationalExpenses,
    //     "TransportationExpenses",
    //     TransportationExpenses,
    //     "MiscellaneousExpenses",
    //     MiscellaneousExpenses,
    // )
    if (!MonthExpenses) {
        throw new ApiError(500, "Error during getting totel expenses!!");
    }
    // 2. TOTAL ADDED MONDAY
    const PocketMoneyHistoryArray = user.PocketMoneyHistory;
    const totalAddedMoney = PocketMoneyHistoryArray.reduce((accumulator, currentArray) => {
        return accumulator + parseInt(currentArray.date.split("-")[1] === month ? currentArray.amount : "0");
    }, 0);

    // 3. last expenses total
    const lastExpense = await ExpenseModel.findOne().sort({ _id: -1 });
    let lastTotalExpenses = 0;
    if (lastExpense) {
        lastTotalExpenses = lastExpense.products?.reduce((accumulator, currentArray) => {
            return accumulator + parseInt(currentArray.price);
        }, 0);
    }

    // 4. total lent money
    const LentMoneyHistoryArray = user.LentMoneyHistory;
    const totalLentMoney = LentMoneyHistoryArray.reduce((accumulator, currentArray) => {
        return accumulator + parseInt(currentArray.date.split("-")[1] === month ? currentArray.price : "0");
    }, 0);

    return res.json(
        new ApiResponse(200, { totalExpenses: totalExpenses, totalAddedMoney: totalAddedMoney, totalLentMoney: totalLentMoney, lastTotalExpenses: lastTotalExpenses, categoryWiseExpensesData }, "Successfully Calculated Expenses!!")
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
