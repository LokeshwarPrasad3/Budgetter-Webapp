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
      label: string | null;
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
  selectedLabel: string | null;
}

export interface DeleteExpenseCredType {
  expenseDate: string;
  expenseId: string;
  isAddPriceToPocketMoney: boolean;
}

export type ExpensesTableTypes = {
  _id: string;
  name: string;
  price: number;
  label: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};
