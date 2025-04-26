import axios, { AxiosRequestConfig } from 'axios';
import { backendHostURL } from './api';
import { getCurrentAccessToken } from '@/utils/cookie/CookiesInfo';

interface TotalExpensesAndAddedMoneyInMonthResType {
  statusCode: number;
  data: {
    totalExpenses: number;
    totalAddedMoney: number;
    lastTotalExpenses: number;
    totalLentMoney: number;
    categoryWiseExpensesData: {
      GroceriesExpenses: number;
      Housing_UtilitiesExpenses: number;
      MedicalExpenses: number;
      FoodExpenses: number;
      PersonalExpenses: number;
      EducationalExpenses: number;
      TransportationExpenses: number;
      MiscellaneousExpenses: number;
    };
  };
  message: string;
  success: boolean;
}
interface TotalExpensesAndAddedMoneyInMonthCredentialType {
  month: string;
  year: string;
}

export const getTotalExpensesAndAddedMoneyInMonth = async (
  credential: TotalExpensesAndAddedMoneyInMonthCredentialType
): Promise<TotalExpensesAndAddedMoneyInMonthResType> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.post<TotalExpensesAndAddedMoneyInMonthResType>(
    `${backendHostURL}/user/report/total-expenses-and-added-money-in-month`,
    credential,
    config
  );
  return data;
};
