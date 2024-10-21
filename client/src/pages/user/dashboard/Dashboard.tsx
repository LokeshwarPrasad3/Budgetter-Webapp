import SummarizeBoxes from '@/components/user/dashbaord/SummarizeBoxes';
import CategoryWiseExpensesChart from '@/components/user/dashbaord/charts/CategoryWiseExpensesChart';
import CategoryWiseLineChart from '@/components/user/dashbaord/charts/CategoryWiseLineChart';
import { setExpenses } from '@/features/user/user';
import { getTodayExpenses } from '@/services/expenses';
import { getTotalExpensesAndAddedMoneyInMonth } from '@/services/reports';
import { getMonthInString } from '@/utils/date/date';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const [totalExpensesOfMonth, setTotalExpensesOfMonth] = useState<number>(0);
  const [totalAddedMoneyOfMonth, setTotalAddedMoneyOfMonth] =
    useState<number>(0);
  const [lastTotalExpenses, setlastTotalExpenses] = useState<number>(0);
  interface expenseCategoriesTypes {
    GroceriesExpenses: number;
    Housing_UtilitiesExpenses: number;
    MedicalExpenses: number;
    FoodExpenses: number;
    PersonalExpenses: number;
    EducationalExpenses: number;
    TransportationExpenses: number;
    MiscellaneousExpenses: number;
  }
  const [CategoryWiseData, setCategoryWiseData] =
    useState<expenseCategoriesTypes>();

  const { mutateAsync: getTotalExpensesAndAddedMoneyMutate } = useMutation({
    mutationFn: getTotalExpensesAndAddedMoneyInMonth,
    onSuccess: (data) => {
      setTotalExpensesOfMonth(data?.data.totalExpenses);
      setTotalAddedMoneyOfMonth(data?.data.totalAddedMoney);
      setlastTotalExpenses(data?.data.lastTotalExpenses);
      setCategoryWiseData(data?.data.categoryWiseExpensesData);
      console.log(data?.data.categoryWiseExpensesData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    console.log(month);
    console.log(typeof month);
    getTotalExpensesAndAddedMoneyMutate({ month });
  }, []);

  const { data: todayExpensesData } = useQuery({
    queryFn: getTodayExpenses,
    queryKey: ['todayExpense'],
  });

  useEffect(() => {
    if (todayExpensesData?.success) {
      dispatch(setExpenses(todayExpensesData.data));
    }
  }, [todayExpensesData, dispatch]);

  return (
    <>
      <div className="dashboard_page_ flex flex-col justify-start items-start w-full gap-5">
        <div className="heading_dashboard_page flex justify-start items-start w-full">
          <h3 className="font-semibold text-lg text-left">
            {user && user?.name && (
              <>
                {' '}
                <span className="font-bold text-orange-800">
                  Welcome! {user.name}
                </span>
              </>
            )}{' '}
          </h3>
        </div>
        <div className="summarize_box_container flex flex-col justify-start items-start gap-4 bg-[#FFFEFE] rounded-md w-full p-4 px-5 shadow-sm">
          <h4 className="text-base font-semibold">
            Your Current Month Report
          </h4>
        </div>
        <SummarizeBoxes
          totalExpensesOfMonth={totalExpensesOfMonth}
          totalAddedMoneyOfMonth={totalAddedMoneyOfMonth}
          lastTotalExpenses={lastTotalExpenses}
        />
        <div className="visual_graph_container flex justify-center flex-col xl:flex-row items-center w-full gap-y-10 md:gap-5">
          <CategoryWiseExpensesChart
            totalExpensesOfMonth={totalExpensesOfMonth}
            CategoryWiseData={CategoryWiseData}
          />
          <CategoryWiseLineChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
