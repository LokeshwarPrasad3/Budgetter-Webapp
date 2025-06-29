export interface GetExpensesCredType {
  date: string;
}

export interface AddExpensesCredType {
  date: string;
  pastDaysExpensesArray: {
    date: string;
    productsArray: {
      name: string;
      price: number;
      category: string;
    }[];
  }[];
}

export interface EditExpenseCredType {
  actualDate: string;
  expenseId: string;
  expenseName: string;
  expensePrice: number;
  expenseCategory: string;
  expenseDate: string;
}

export interface DeleteExpenseCredType {
  expenseDate: string;
  expenseId: string;
  isAddPriceToPocketMoney: boolean;
}
