import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getUserAllExpenses } from '@/services/expenses';
import { setExpenses } from '@/features/user/user';
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
  // columnHelper.accessor('product._id', {
  //   header: 'Product ID',
  //   cell: (info) => info.getValue<string>().slice(-10),
  //   footer: (info) => info.column.id,
  // }),
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
  const handlePopoverClose = (open:boolean) => {
    setIsPopoverOpen(open);
  }
  const dispatch = useDispatch();
  const [data, setData] = React.useState<FlattenedExpense[]>([]);

  const { data: allExpensesData } = useQuery({
    queryFn: getUserAllExpenses,
    queryKey: ['all-expenses'],
  });

  // Flatten the data to make each product a single row
  const flattenExpenses = (expenses: any[]): FlattenedExpense[] => {
    return expenses.flatMap((expense) =>
      expense.products.map((product: any) => ({
        user: expense.user,
        date: expense.date,
        product: product,
      }))
    );
  };

  useEffect(() => {
    if (allExpensesData?.success) {
      const flattenedData = flattenExpenses(allExpensesData.data);
      setData(flattenedData);
      dispatch(setExpenses(allExpensesData.data)); // original data for redux store
    }
  }, [allExpensesData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="allexpenses_table_container bg-[#ffffff] rounded-md w-full px-0 py-5 flex justify-center flex-col">
        <div className="filter_expense_containerr flex justify-between items-center gap-5 flex-wrap text-base px-5 pb-5">
          <p className="font-semibold">Your All Time Expenses</p>
          <div className="filters flex justify-center gap-3 font-medium items-center">
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
                  >Last 7 Days
                  </p>
                  <p
                    className="cursor-pointer text-sm hover:scale-105"
                    onClick={() => handlePopoverClose(false)}
                  >Show Category
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
                    <SelectItem value={monthName}>{monthName}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
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
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
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
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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
    </>
  );
};

export default AllExpensesTable;
