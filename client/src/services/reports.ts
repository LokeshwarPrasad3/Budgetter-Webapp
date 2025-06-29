import { TotalExpensesAndAddedMoneyInMonthCredType } from '@/types/api/reports/credentials';
import { TotalExpensesAndAddedMoneyInMonthResType } from '@/types/api/reports/reports';
import { apiURL } from '@/lib/http';

export const getTotalExpensesAndAddedMoneyInMonth = async (
  credential: TotalExpensesAndAddedMoneyInMonthCredType
): Promise<TotalExpensesAndAddedMoneyInMonthResType> => {
  const { data } = await apiURL.post<TotalExpensesAndAddedMoneyInMonthResType>(
    `/user/report/total-expenses-and-added-money-in-month`,
    credential
  );
  return data;
};
