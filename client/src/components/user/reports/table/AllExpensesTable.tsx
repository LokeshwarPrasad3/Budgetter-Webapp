import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getUserAllExpenses } from '@/services/expenses';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  getMonthInNumber,
  getLast7Days,
  monthsNames,
  prevYearsName,
  getLast7DaysTimelineMessage,
} from '@/utils/date/date';
import { ListFilter } from 'lucide-react';
import { setAllExpenses } from '@/features/expenses/expenses';
import toast from 'react-hot-toast';
import PDFExportComponent from '../../PDFExportComponent';

interface Product {
  name: string;
  price: number;
  category: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  sno: number;
  name: string;
  price: number;
  category: string;
  createdAt: string;
}

interface FlattenedExpense {
  user: string;
  date: string;
  product: Product;
}

const columnHelper = createColumnHelper<FlattenedExpense>();

// Define columns
const columns = [
  columnHelper.display({
    id: 'index',
    header: '#',
    cell: (info) => info.row.index + 1,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('product.name', {
    header: 'Product Name',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('product.price', {
    header: 'Price ₹',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('product.category', {
    header: 'Category',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('product.createdAt', {
    header: 'TIME',
    cell: (info) =>
      new Date(info.getValue<string>()).toLocaleString().split(',')[1],
    footer: (info) => info.column.id,
  }),
];

const AllExpensesTable: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [filterMonthValue, setFilterMonthValue] = useState<string>('all');
  const [filterYearValue, setFilterYearValue] = useState<string>('2025');
  const handlePopoverClose = (open: boolean) => {
    setIsPopoverOpen(open);
  };
  const [flattenProductsData, setFlattenProductsData] = useState<Expense[]>([]);
  const [PDFStatementTimeline, setPDFStatementTimeline] = useState<string>('');

  const dispatch = useDispatch();
  const [data, setData] = useState<FlattenedExpense[]>([]);

  // Get all expenses from the Redux store
  const allExpensesArray = useSelector(
    (state: any) => state.expenses.allExpenses
  );

  // Use useQuery to fetch data only when necessary
  const {
    data: allExpensesResData,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getUserAllExpenses,
    queryKey: ['getUserAllExpenses'],
    enabled: !allExpensesArray?.length, // Only fetch if no expenses in store
  });

  // Update Redux store with fetched data when available
  useEffect(() => {
    if (allExpensesResData?.success) {
      // console.log(allExpensesResData);
      dispatch(setAllExpenses(allExpensesResData.data)); // Ensure to access the correct data structure
    }
  }, [allExpensesResData, dispatch]); // Added dependencies

  // Flatten the expenses data to make each product a single row
  const flattenExpenses = (expenses: any[]): FlattenedExpense[] => {
    return expenses?.flatMap((expense) =>
      expense.products.map((product: any) => ({
        user: expense.user,
        date: expense.date,
        product: product,
      }))
    );
  };

  // Function filtered data & Provide combined products array
  const ExpensesProductsFlattenDataForPDF = (
    flattenedData: FlattenedExpense[],
    timeLineMessage: string
  ) => {
    const allProducts =
      flattenedData?.map((expense, index) => ({
        ...expense.product,
        sno: index + 1,
      })) ?? [];
    console.log('all wala ', allProducts);
    setFlattenProductsData(allProducts);
    setPDFStatementTimeline(timeLineMessage);
  };

  //1️⃣ get selected months filter data
  const getSelectedMonthExpenses = () => {
    // console.log(filterMonthValue, 'filteredm onth');
    const flattenedData = flattenExpenses(allExpensesArray);
    console.log('filtermonth', filterMonthValue);
    if (filterMonthValue === 'all') {
      return flattenedData;
    }
    const filteredMonthExpenseData = flattenedData?.filter(
      (dayExpenses) => dayExpenses.date?.slice(3, 5) === filterMonthValue
    );
    return filteredMonthExpenseData;
  };
  //1️⃣ get selected year filter data
  const getSelectedYearExpenses = () => {
    const flattenedData = flattenExpenses(allExpensesArray);
    if (filterYearValue === 'all') {
      return flattenedData;
    }
    const filteredYearExpenseData = flattenedData?.filter(
      (dayExpenses) => dayExpenses.date?.slice(6) === filterYearValue
    );
    return filteredYearExpenseData;
  };
  // 2️⃣ handle filtered month data
  const handleFilterMonthExpenses = (monthName: string) => {
    // get selecte year filter data
    const getFilteredYearExpenses: any = getSelectedYearExpenses();
    // console.log("all years data", getFilteredYearExpenses)
    // if month is all then return as it is
    if (monthName === 'all') {
      setFilterMonthValue('all');
      setData(getFilteredYearExpenses);
      return;
    }
    // if not all then calculate month number
    const monthInNumber = getMonthInNumber(monthName);
    setFilterMonthValue(monthInNumber);
    // filter selected month from year filtered data
    const filteredFinalMonthExpense = getFilteredYearExpenses?.filter(
      (dayExpenses: any) => dayExpenses.date?.slice(3, 5) === monthInNumber
    );
    // for pdf download data
    const timeLineMessage = `${monthName} ${filterYearValue}`;
    ExpensesProductsFlattenDataForPDF(
      filteredFinalMonthExpense,
      timeLineMessage
    );
    // console.log(filteredFinalMonthExpense);
    setData(filteredFinalMonthExpense);
  };

  // 2️⃣ handle filtered year data
  const handleFilterYearExpenses = (year: string) => {
    console.log('real selected value', year, filterYearValue);
    setFilterYearValue(year);
    // get month data filter
    // get selecte year filter data
    const getFilteredMonthExpenses: any = getSelectedMonthExpenses();
    console.log('all month data', getFilteredMonthExpenses);
    // filter selected month from year filtered data
    if (year === 'all') {
      setData(getFilteredMonthExpenses);
      return;
    }
    const filteredFinalYearExpense = getFilteredMonthExpenses?.filter(
      (dayExpenses: any) => dayExpenses.date?.slice(6) === year
    );
    // for pdf download data
    const timeLineMessage = `${filterMonthValue.toUpperCase()} ${year}`;
    ExpensesProductsFlattenDataForPDF(
      filteredFinalYearExpense,
      timeLineMessage
    );
    // console.log(filteredFinalYearExpense);
    setData(filteredFinalYearExpense);
  };

  // Filter last 7 days expenses
  const handleFilterExpensesTable = (open: boolean) => {
    setIsPopoverOpen(open);
    const getLast7DaysDates = getLast7Days();
    // console.log(getLast7DaysDates)
    // filter data which have month name
    const flattenedData = flattenExpenses(allExpensesArray);
    // console.log(flattenedData)
    const filteredLast7DaysExpenseData = flattenedData?.filter((dayExpenses) =>
      getLast7DaysDates.includes(dayExpenses.date)
    );
    // for pdf download data
    const timeLineMessage = getLast7DaysTimelineMessage();
    ExpensesProductsFlattenDataForPDF(
      filteredLast7DaysExpenseData,
      timeLineMessage
    );
    // console.log(filteredLast7DaysExpenseData);
    setData(filteredLast7DaysExpenseData);
  };

  // Show caetgories all expenses
  const handleShowAllCategoryWiseExpenses = (open: boolean) => {
    setIsPopoverOpen(open);
    toast.error('Feature is pending');
  };

  // If the data is available in the Redux store, flatten and set it
  useEffect(() => {
    if (allExpensesArray) {
      // get selecte year filter data
      const getFilteredMonthExpenses: any = getSelectedMonthExpenses();
      // filter selected month from year filtered data
      const filteredFinalYearExpense = getFilteredMonthExpenses?.filter(
        (dayExpenses: any) => dayExpenses.date?.slice(6) === filterYearValue
      );
      setData(filteredFinalYearExpense);
      // for pdf download data
      const timeLineMessage = `ALL Months of ${filterYearValue}`;
      ExpensesProductsFlattenDataForPDF(
        filteredFinalYearExpense,
        timeLineMessage
      );
    }
  }, [allExpensesArray]);

  useEffect(() => {
    if (!isLoading) {
      setHasLoaded(true);
    }
  }, [isLoading]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="allexpenses_table_container bg-[#ffffff] dark:bg-bg_primary_dark rounded-md w-full px-0 py-5 flex justify-center flex-col gap-4">
      <div className="filter_expense_containerr flex justify-between items-center gap-5 flex-wrap text-base px-5 sticky top-16 rounded-md py-3 bg-white dark:bg-bg_primary_dark ">
        <div className="left_sectionss flex justify-start items-center gap-3">
          <p className="font-semibold">Your All Expenses</p>
          {flattenProductsData.length !== 0 && (
            <div className="flex sm:hidden">
              <PDFExportComponent
                createdAt={PDFStatementTimeline}
                expenses={flattenProductsData}
              />
            </div>
          )}
        </div>
        <div className="filters flex justify-center gap-1 font-medium items-center">
          <span
            data-tooltip-id="header-tooltip"
            data-tooltip-content="Results Lenght"
            className="bg-pink-600 rounded-full cursor-pointer min-w-6 max-w-full w-full min-h-5 text-xs text-white p-1 flex justify-center items-center"
          >
            {data?.length}
          </span>
          <Popover onOpenChange={handlePopoverClose} open={isPopoverOpen}>
            <PopoverTrigger asChild>
              <span className="relative rounded-full hover:bg-[#f3f3f3] dark:hover:bg-slate-800 dark:text-white p-2 flex justify-center items-center">
                <ListFilter className="cursor-pointer w-5 h-5" />
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3 px-4">
              <div className="content_container flex flex-col gap-2">
                <p
                  className="cursor-pointer text-sm hover:scale-105"
                  onClick={() => handleFilterExpensesTable(false)}
                >
                  Last 7 Days
                </p>
                <p
                  className="cursor-pointer text-sm hover:scale-105"
                  onClick={() => handleShowAllCategoryWiseExpenses(false)}
                >
                  Show Category
                </p>
              </div>
            </PopoverContent>
          </Popover>
          {/* month */}
          <Select onValueChange={handleFilterMonthExpenses}>
            <SelectTrigger className="w-full mr-1">
              <SelectValue placeholder="All Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Month </SelectItem>
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
          <Select onValueChange={handleFilterYearExpenses}>
            <SelectTrigger className="w-full mr-1.5">
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
          {flattenProductsData.length !== 0 && (
            <div className="sm:flex hidden">
              <PDFExportComponent
                createdAt={PDFStatementTimeline}
                expenses={flattenProductsData}
              />
            </div>
          )}
        </div>
      </div>
      {/* {isLoading && (
        <div className="loading_effects text-semibold px-5 pb-5">
          🔴 <span className="font-bold">Loading......</span>
        </div>
      )} */}
      {isError && (
        <div className="loading_effects text-semibold px-5 pb-5">
          <span className="font-bold">Oops! Something Went Wrong 😊</span>
        </div>
      )}
      {isLoading && !hasLoaded ? (
        <div className="loading_effects text-semibold px-5 pb-5">
          <div className="loader"></div>
        </div>
      ) : hasLoaded && data.length === 0 ? (
        <div className="message_outer rounded-md w-full p-5 ">
          <div className="flex">No Expenses Found</div>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y border-b border-border_dark border-t border-gray-200 dark:border-border_dark">
            <thead className="dark:bg-bg_secondary_dark">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 text-left text-sm whitespace-nowrap font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {table.getRowModel()?.rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`dark:bg-bg_primary_dark dark:hover:bg-slate-800 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-100"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllExpensesTable;
