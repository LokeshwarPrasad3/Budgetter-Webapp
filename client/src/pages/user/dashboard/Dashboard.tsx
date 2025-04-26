import SummarizeBoxes from '@/components/user/dashbaord/SummarizeBoxes';
import CategoryWiseExpensesChart from '@/components/user/dashbaord/charts/CategoryWiseExpensesChart';
import CategoryWiseLineChart from '@/components/user/dashbaord/charts/CategoryWiseLineChart';
import { getTotalExpensesAndAddedMoneyInMonth } from '@/services/reports';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  monthsNames,
  prevYearsName,
  getMonthInNumber,
  getCurrentMonth,
} from '@/utils/date/date';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const [totalExpensesOfMonth, setTotalExpensesOfMonth] = useState<number>(0);
  const [totalAddedMoneyOfMonth, setTotalAddedMoneyOfMonth] =
    useState<number>(0);
  const [lastTotalExpenses, setlastTotalExpenses] = useState<number>(0);
  const [totalLentMoney, setTotalLentMoney] = useState<number>(0);
  const [filterMonthValue, setFilterMonthValue] =
    useState<string>(getCurrentMonth());
  const [filterYearValue, setFilterYearValue] = useState<string>(
    new Date().getFullYear().toString()
  );

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

  const { mutateAsync: getTotalExpensesAndAddedMoneyMutate, isPending } =
    useMutation({
      mutationFn: getTotalExpensesAndAddedMoneyInMonth,
      onSuccess: (data) => {
        setTotalExpensesOfMonth(data?.data.totalExpenses);
        setTotalAddedMoneyOfMonth(data?.data.totalAddedMoney);
        setlastTotalExpenses(data?.data.lastTotalExpenses);
        setTotalLentMoney(data?.data.totalLentMoney);
        setCategoryWiseData(data?.data.categoryWiseExpensesData);
        // console.log(data?.data.categoryWiseExpensesData);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  useEffect(() => {
    const currentMonthInNumber = (new Date().getMonth() + 1).toString().padStart(2, '0');
    getTotalExpensesAndAddedMoneyMutate({
      month: currentMonthInNumber,
      year: filterYearValue,
    });
  }, []);

  const handleDashboardFilterMonthExpenses = (month: string) => {
    if (!month) {
      toast.error('Please Select Month!!');
      return;
    }
    const monthInNum = getMonthInNumber(month);
    console.log('real selected value', month, filterMonthValue, monthInNum);
    setFilterMonthValue(month);
    getTotalExpensesAndAddedMoneyMutate({
      month: monthInNum,
      year: filterYearValue,
    });
  };
  const handleDashboardFilterYearExpenses = (year: string) => {
    if (!year) {
      toast.error('Please Select Year!!');
      return;
    }
    console.log('real selected value', year, filterMonthValue);
    getTotalExpensesAndAddedMoneyMutate({ month: filterMonthValue, year });
    setFilterYearValue(year);
  };

  return (
    <>
      <div className="dashboard_page_ flex flex-col justify-start items-start w-full gap-5">
        <div className="heading_dashboard_page flex justify-start items-start w-full">
          <h3 className="font-semibold text-lg text-left">
            {user && user?.name && (
              <>
                {' '}
                <span className="font-bold text-text_heading_light dark:text-text_primary_dark">
                  Welcome! {user.name}
                </span>
              </>
            )}{' '}
          </h3>
        </div>
        <div className="summarize_box_container flex justify-center sm:justify-between flex-wrap items-center gap-y-2.5 gap-x-4 bg-bg_primary_light dark:bg-bg_primary_dark rounded-md border border-border_light dark:border-border_dark w-full p-4 px-5 shadow-sm">
          <h4 className="text-base font-semibold">
            Your {filterMonthValue} Month Report
          </h4>
          <div className="filters flex justify-center gap-2 font-medium items-center">
            <p className="whitespace-nowrap mr-1">Filter Report</p>
            {/* month */}
            <Select onValueChange={handleDashboardFilterMonthExpenses}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={filterMonthValue} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {monthsNames.map((monthName) => (
                    <SelectItem key={monthName} value={monthName}>
                      {monthName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* year */}
            <Select onValueChange={handleDashboardFilterYearExpenses}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={filterYearValue} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Year</SelectItem>
                <SelectGroup>
                  {prevYearsName.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SummarizeBoxes
          totalExpensesOfMonth={totalExpensesOfMonth}
          totalAddedMoneyOfMonth={totalAddedMoneyOfMonth}
          lastTotalExpenses={lastTotalExpenses}
          totalLentMoney={totalLentMoney}
          isPending={isPending}
        />
        <div className="visual_graph_container grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <CategoryWiseExpensesChart
            totalExpensesOfMonth={totalExpensesOfMonth}
            CategoryWiseData={CategoryWiseData}
            isPending={isPending}
          />
          <CategoryWiseLineChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
