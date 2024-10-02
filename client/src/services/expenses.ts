import axios, { AxiosRequestConfig } from 'axios';

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
    },
    withCredentials: true,
  };
  const { data } = await axios.post<ExpensesResTypes>(
    'http://localhost:5000/api/user/show-past-date-expenses',
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
    },
    withCredentials: true,
  };
  const { data } = await axios.post<AddExpensesResTypes>(
    'http://localhost:5000/api/user/add-past-date-expenses',
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
    withCredentials: true,
  };
  const { data } = await axios.get<TodayExpensesRes>(
    'http://localhost:5000/api/user/show-today-expenses',
    config
  );
  return data;
};
