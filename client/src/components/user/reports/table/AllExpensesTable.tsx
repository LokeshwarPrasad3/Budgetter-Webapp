import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
// import { useQuery } from '@tanstack/react-query';
// import { getUserAllExpenses } from '@/services/expenses';
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
import { ListFilter, Search, X } from 'lucide-react';
// import { setAllExpenses } from '@/features/expenses/expenses';
import toast from 'react-hot-toast';
import PDFExportComponent from '../../PDFExportComponent';
import { Input } from '@/components/ui/input';
import { ExpenseProduct } from '@/types/api/expenses/expenses';

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
  product: ExpenseProduct;
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
  // const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [filterMonthValue, setFilterMonthValue] = useState<string>('all');
  const [filterYearValue, setFilterYearValue] = useState<string>('2025');
  const handlePopoverClose = (open: boolean) => {
    setIsPopoverOpen(open);
  };
  const [flattenProductsData, setFlattenProductsData] = useState<Expense[]>([]);
  const [PDFStatementTimeline, setPDFStatementTimeline] = useState<string>('');
  const [filterSearchText, setFilterSearchText] = useState<string>('');

  // const dispatch = useDispatch();
  const [data, setData] = useState<FlattenedExpense[]>([]);

  // Get all expenses from the Redux store
  const allExpensesArray = useSelector(
    (state: any) => state.expenses.allExpenses
  );

  // Use useQuery to fetch data only when necessary
  // const {
  //   data: allExpensesResData,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryFn: getUserAllExpenses,
  //   queryKey: ['getUserAllExpenses'],
  //   enabled: !allExpensesArray?.length, // Only fetch if no expenses in store
  // });

  // // Update Redux store with fetched data when available
  // useEffect(() => {
  //   if (allExpensesResData?.success) {
  //     // console.log(allExpensesResData);
  //     dispatch(setAllExpenses(allExpensesResData.data)); // Ensure to access the correct data structure
  //   }
  // }, [allExpensesResData, dispatch]); // Added dependencies

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

  // Function filtered data & Provide combined products array and set values for pdf download
  const ExpensesProductsFlattenDataForPDF = (
    flattenedData: FlattenedExpense[],
    timeLineMessage: string
  ) => {
    const allProducts =
      flattenedData?.map((expense, index) => ({
        ...expense.product,
        sno: index + 1,
      })) ?? [];
    setFlattenProductsData(allProducts);
    setPDFStatementTimeline(timeLineMessage);
  };

  //1️⃣ get selected months filter data
  const getSelectedMonthExpenses = () => {
    // console.log(filterMonthValue, 'filteredm onth');
    const flattenedData = flattenExpenses(allExpensesArray);
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
    // console.log('real selected value', year, filterYearValue);
    setFilterYearValue(year);
    // get month data filter
    // get selecte year filter data
    const getFilteredMonthExpenses: any = getSelectedMonthExpenses();
    // console.log('all month data', getFilteredMonthExpenses);
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

  // Handle filtered by text search
  const handleFilterSearchExpenses = (searchText: string) => {
    setFilterMonthValue('all');
    handleFilterYearExpenses('all');
    setFilterSearchText(searchText);
    const flattenedData = flattenExpenses(allExpensesArray);
    const filteredSearchExpenseData = flattenedData?.filter((dayExpenses) =>
      dayExpenses.product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    // update for pdf download data values
    const timeLineMessage = `Search: ${searchText}`;
    ExpensesProductsFlattenDataForPDF(
      filteredSearchExpenseData,
      timeLineMessage
    );
    setData(filteredSearchExpenseData);
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

  // useEffect(() => {
  //   if (!isLoading) {
  //     setHasLoaded(true);
  //   }
  // }, [isLoading]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="allexpenses_table_container flex w-full flex-col justify-center gap-4 rounded-md bg-[#ffffff] px-0 py-5 dark:bg-bg_primary_dark">
      <div className="filter_expense_containerr sticky top-16 flex flex-wrap items-center justify-between gap-5 rounded-md bg-white px-5 py-3 text-base dark:bg-bg_primary_dark">
        <div className="left_sectionss flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:flex-nowrap sm:justify-start">
          <p className="whitespace-nowrap font-semibold">Your All Expenses</p>
          {flattenProductsData.length !== 0 && (
            <div className="flex sm:hidden">
              <PDFExportComponent
                createdAt={PDFStatementTimeline}
                expenses={flattenProductsData}
              />
            </div>
          )}
          <div className="relative w-full">
            <Input
              value={filterSearchText}
              onChange={(e) => handleFilterSearchExpenses(e.target.value)}
              type="text"
              className="pr-9 sm:w-72"
              placeholder="Search Expense"
            />
            {!filterSearchText ? (
              <Search className="absolute right-2.5 top-2.5 h-4 w-4" />
            ) : (
              <button
                onClick={() => handleFilterSearchExpenses('')}
                className="absolute right-2 top-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-slate-100 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="filters flex items-center justify-center gap-1 font-medium">
          <span
            data-tooltip-id="header-tooltip"
            data-tooltip-content="Results Lenght"
            className="flex min-h-5 w-full min-w-6 max-w-full cursor-pointer items-center justify-center rounded-full bg-pink-600 p-1 text-xs text-white"
          >
            {data?.length}
          </span>
          <Popover onOpenChange={handlePopoverClose} open={isPopoverOpen}>
            <PopoverTrigger asChild>
              <span className="relative flex items-center justify-center rounded-full p-2 hover:bg-[#f3f3f3] dark:text-white dark:hover:bg-slate-800">
                <ListFilter className="h-5 w-5 cursor-pointer" />
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
            <SelectTrigger className="mr-1 w-full">
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
            <SelectTrigger className="mr-1.5 w-full">
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
            <div className="hidden sm:flex">
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
      {/* {isError && (
        <div className="loading_effects text-semibold px-5 pb-5">
          <span className="font-bold">Oops! Something Went Wrong 😊</span>
        </div>
      )} */}
      {/* {!allExpensesArray && !hasLoaded ? (
        <div className="loading_effects text-semibold px-5 pb-5">
          <div className="loader"></div>
        </div>
      ) : hasLoaded && data.length === 0 ? (
        <div className="message_outer w-full rounded-md p-5">
          <div className="flex">No Expenses Found</div>
        </div>
      ) : ( */}
      {data && data.length !== 0 && (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y border-b border-t border-border_dark border-gray-200 dark:border-border_dark">
            <thead className="dark:bg-bg_secondary_dark">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap p-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100"
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
                      className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-100"
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

      {/* )} */}
    </div>
  );
};

export default AllExpensesTable;
