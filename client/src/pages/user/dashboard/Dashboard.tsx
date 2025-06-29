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
import CategoryInsightsTable from '@/components/user/dashbaord/table/CategoryInsightsTable';
import { CategoryWiseExpensesData } from '@/types/api/reports/reports';

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

  const [CategoryWiseData, setCategoryWiseData] =
    useState<CategoryWiseExpensesData>();

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
    const currentMonthInNumber = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0');
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
      <div className="dashboard_page_ flex w-full flex-col items-start justify-start gap-5">
        <div className="heading_dashboard_page flex w-full items-start justify-start">
          <h3 className="text-left text-lg font-semibold">
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
        <div className="summarize_box_container flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2.5 rounded-md border border-border_light bg-bg_primary_light p-4 px-5 shadow-sm dark:border-border_dark dark:bg-bg_primary_dark sm:justify-between">
          <h4 className="text-base font-semibold">
            Your {filterMonthValue} Month Report
          </h4>
          <div className="filters flex items-center justify-center gap-2 font-medium">
            <p className="mr-1 whitespace-nowrap">Filter Report</p>
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
        <div className="visual_graph_container grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          <CategoryWiseExpensesChart
            totalExpensesOfMonth={totalExpensesOfMonth}
            CategoryWiseData={CategoryWiseData}
            isPending={isPending}
          />
          <CategoryWiseLineChart />
        </div>
        <div className="category_insights_container mb-10 w-full">
          <CategoryInsightsTable
            filterMonthValue={filterMonthValue}
            filterYearValue={filterYearValue}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
