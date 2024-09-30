import axios, { AxiosRequestConfig } from 'axios';

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
