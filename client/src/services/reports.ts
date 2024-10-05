import axios, { AxiosRequestConfig } from 'axios';

interface TotalExpensesAndAddedMoneyInMonthResType {
  statusCode: number;
  data: {
    totalExpenses: number;
    totalAddedMoney: number;
  };
  message: string;
  success: boolean;
}
interface TotalExpensesAndAddedMoneyInMonthCredentialType {
  month: string;
}

export const getTotalExpensesAndAddedMoneyInMonth = async (
  credential: TotalExpensesAndAddedMoneyInMonthCredentialType
): Promise<TotalExpensesAndAddedMoneyInMonthResType> => {
  const config: AxiosRequestConfig = {
    withCredentials: true,
  };
  const { data } = await axios.post<TotalExpensesAndAddedMoneyInMonthResType>(
    'http://localhost:5000/api/user/report/total-expenses-and-added-money-in-month',
    credential,
    config
  );
  return data;
};
