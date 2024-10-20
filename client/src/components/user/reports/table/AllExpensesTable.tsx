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
import { getPreviousMonthsName } from '@/utils/date/date';
import { ListFilter } from 'lucide-react';
import { setAllExpenses } from '@/features/expenses/expenses';

interface Product {
  name: string;
  price: number;
  category: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
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
  const handlePopoverClose = (open: boolean) => {
    setIsPopoverOpen(open);
  };

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

  // If the data is available in the Redux store, flatten and set it
  useEffect(() => {
    if (allExpensesArray) {
      const flattenedData = flattenExpenses(allExpensesArray);
      setData(flattenedData);
    }
  }, [allExpensesArray]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="allexpenses_table_container bg-[#ffffff] rounded-md w-full px-0 py-5 flex justify-center flex-col">
      <div className="filter_expense_containerr flex justify-between items-center gap-5 flex-wrap text-base px-5 pb-4">
        <p className="font-semibold">Your All Expenses</p>
        <div className="filters flex justify-center gap-1 font-medium items-center">
          <Popover onOpenChange={handlePopoverClose} open={isPopoverOpen}>
            <PopoverTrigger asChild>
              <span className="relative rounded-full hover:bg-[#f3f3f3] p-2 flex justify-center items-center">
                <ListFilter className="cursor-pointer w-5 h-5" />
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3 px-4">
              <div className="content_container flex flex-col gap-2">
                <p
                  className="cursor-pointer text-sm hover:scale-105"
                  onClick={() => handlePopoverClose(false)}
                >
                  Last 7 Days
                </p>
                <p
                  className="cursor-pointer text-sm hover:scale-105"
                  onClick={() => handlePopoverClose(false)}
                >
                  Show Category
                </p>
              </div>
            </PopoverContent>
          </Popover>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Expenses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Expenses</SelectItem>
              <SelectGroup>
                {getPreviousMonthsName(2).map((monthName) => (
                  <SelectItem key={monthName} value={monthName}>
                    {monthName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading && (
        <div className="loading_effects text-semibold px-5 pb-5">
          🔴 <span className="font-bold">Loading......</span>
        </div>
      )}
      {isError && (
        <div className="loading_effects text-semibold px-5 pb-5">
          <span className="font-bold">Oops! Something Went Wrong 😊</span>
        </div>
      )}
      {data.length === 0 ? (
        <div className="message_outer bg-[#ffffff] rounded-md w-full p-5 ">
          <div className="flex">No Expenses Found</div>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 text-left text-sm whitespace-nowrap font-medium text-gray-500 uppercase tracking-wider"
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
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel()?.rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-4 whitespace-nowrap text-sm text-gray-500"
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
