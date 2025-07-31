export interface ExpenseProduct {
  name: string;
  price: number;
  category: string;
  label: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseEntry {
  _id: string;
  user: string;
  date: string;
  products: ExpenseProduct[];
}

export interface ExpensesResType {
  statusCode: number;
  data: ExpenseEntry;
  message: string;
  success: boolean;
}

export interface AddExpensesResType {
  statusCode: number;
  message: string;
  data: null;
  success: boolean;
}

export interface TodayExpensesResType {
  statusCode: number;
  data: ExpenseProduct[];
  message: string;
  success: boolean;
}

export interface AllExpensesResType {
  statusCode: number;
  data: ExpenseEntry[];
  message: string;
  success: boolean;
}
export interface EditedExpenseResType {
  statusCode: number;
  data: ExpenseProduct[];
  message: string;
  success: boolean;
}

export interface DeletedExpenseResType {
  statusCode: number;
  data: ExpenseProduct[];
  message: string;
  success: boolean;
}

export interface AllExpenseExpenseTableType {
  sno: number;
  name: string;
  price: number;
  label: string | null;
  category: string;
  createdAt: string;
}

export interface FlattenedExpense {
  user: string;
  date: string;
  product: ExpenseProduct;
}
