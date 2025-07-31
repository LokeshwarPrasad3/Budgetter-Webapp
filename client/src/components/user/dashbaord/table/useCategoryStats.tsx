import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getMonthInNumber } from '@/utils/date/date';

type CategoryStats = {
  category: string;
  totalSpent: number;
  expensePercent: number;
  transactionCount: number;
  avgExpense: number;
  maxExpense: number;
  minExpense: number;
};

const useCategoryStats = (
  filterMonthValue: string,
  filterYearValue: string
): CategoryStats[] => {
  const allExpensesArray = useSelector(
    (state: any) => state.expenses.allExpenses
  );

  const filteredProducts = useMemo(() => {
    const filtered = allExpensesArray
      .filter((entry: any) => {
        const [_, month, year] = entry.date.split('-');
        return (
          month === getMonthInNumber(filterMonthValue) &&
          year === filterYearValue
        );
      })
      .flatMap((entry: any) => entry.products);

    return filtered;
  }, [allExpensesArray, filterMonthValue, filterYearValue]);

  const groupedByCategory = useMemo(() => {
    const map = new Map<string, number[]>();

    for (const product of filteredProducts) {
      const { category, price } = product;
      if (!map.has(category)) {
        map.set(category, []);
      }
      map.get(category)!.push(price);
    }

    const totalSpentAll = [...map.values()].flat().reduce((a, b) => a + b, 0);

    return Array.from(map.entries()).map(([category, prices]) => {
      const totalSpent = prices.reduce((a, b) => a + b, 0);
      const transactionCount = prices.length;
      const avgExpense = totalSpent / transactionCount;
      const maxExpense = Math.max(...prices);
      const minExpense = Math.min(...prices);
      const expensePercent = parseFloat(
        ((totalSpent / totalSpentAll) * 100).toFixed(2)
      );

      return {
        category,
        totalSpent,
        expensePercent,
        transactionCount,
        avgExpense,
        maxExpense,
        minExpense,
      };
    });
  }, [filteredProducts]);

  return groupedByCategory;
};

export const getFullExpensesList = (
  categoryName: string,
  filterMonthValue: string,
  filterYearValue: string
) => {
  const allExpensesArray = useSelector(
    (state: any) => state.expenses.allExpenses
  );

  return allExpensesArray
    .filter((entry: any) => {
      const [_, month, year] = entry.date.split('-');
      return (
        month === getMonthInNumber(filterMonthValue) && year === filterYearValue
      );
    })
    .flatMap((entry: any) => entry.products)
    .filter((product: any) => product.category === categoryName);
};

export default useCategoryStats;
