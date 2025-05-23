import axios, { AxiosRequestConfig } from 'axios';
import { backendHostURL } from './api';
import { getCurrentAccessToken } from '@/utils/cookie/CookiesInfo';

// GET EXPENSES BY DATE
interface ExpensesResTypes {
  statusCode: number;
  data: {
    _id: string;
    user: string;
    date: string;
    products: [
      {
        name: string;
        price: number;
        category: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
      },
    ];
    message: string;
    success: boolean;
  };
}
interface ExpensesCredentialsType {
  date: string;
}
export const getExpensesByDate = async (
  credentials: ExpensesCredentialsType
): Promise<ExpensesResTypes> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.post<ExpensesResTypes>(
    `${backendHostURL}/user/show-past-date-expenses`,
    credentials,
    config
  );
  return data;
};

// ADD EXPENSES OF DATE OR TODAY
interface AddExpensesResTypes {
  statusCode: number;
  message: string;
  success: boolean;
}
interface AddExpensesCredentialsType {
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

export const addExpenses = async (
  credentials: AddExpensesCredentialsType
): Promise<AddExpensesResTypes> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.post<AddExpensesResTypes>(
    `${backendHostURL}/user/add-past-date-expenses`,
    credentials,
    config
  );
  return data;
};

// SHOW TODAY EXPENSES
interface TodayExpensesRes {
  statusCode: number;
  data: [
    {
      name: string;
      price: number;
      category: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
  message: string;
  success: boolean;
}
export const getTodayExpenses = async (): Promise<TodayExpensesRes> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.get<TodayExpensesRes>(
    `${backendHostURL}/user/show-today-expenses`,
    config
  );
  return data;
};

// SHOW-ALL EXPENSES
interface AllExpensesRes {
  statusCode: number;
  data: [
    {
      _id: string;
      user: string;
      date: string;
      products: [
        {
          name: string;
          price: number;
          category: string;
          _id: string;
          createdAt: string;
          updatedAt: string;
        },
      ];
    },
  ];
  message: string;
  success: boolean;
}
export const getUserAllExpenses = async (): Promise<AllExpensesRes> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.get<AllExpensesRes>(
    `${backendHostURL}/user/show-all-date-expenses`,
    config
  );
  return data;
};

// Edit existing EXPENSES
interface EditedExpenseRes {
  statusCode: number;
  data: [];
  message: string;
  success: boolean;
}
interface EditedExpenseCredeType {
  actualDate: string;
  expenseId: string;
  expenseName: string;
  expensePrice: number;
  expenseCategory: string;
  expenseDate: string;
}
export const editUserExpense = async (
  credentials: EditedExpenseCredeType
): Promise<EditedExpenseRes> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.patch<EditedExpenseRes>(
    `${backendHostURL}/user/edit-expenses`,
    credentials,
    config
  );
  return data;
};

// Delete existing EXPENSES
interface DeletedExpenseRes {
  statusCode: number;
  data: [];
  message: string;
  success: boolean;
}
interface DeleteExpenseCredeType {
  expenseDate: string;
  expenseId: string;
  isAddPriceToPocketMoney: boolean;
}

export const deleteUserExpense = async (
  credentials: DeleteExpenseCredeType
): Promise<DeletedExpenseRes> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
    data: credentials,
  };
  const { data } = await axios.delete<DeletedExpenseRes>(
    `${backendHostURL}/user/delete-expenses`,
    config
  );
  return data;
};
