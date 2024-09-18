import React, { useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Expense = {
  sno: number;
  expenseName: string;
  category: string;
  price: number;
  balance: number;
  message: string;
};

// Sample data
const defaultData: Expense[] = [
  {
    sno: 1,
    expenseName: 'Groceries',
    category: 'Food',
    price: 50,
    balance: 1000,
    message: 'Weekly groceries',
  },
  {
    sno: 2,
    expenseName: 'Electricity Bill',
    category: 'Utilities',
    price: 75,
    balance: 925,
    message: 'Monthly electricity bill',
  },
  {
    sno: 3,
    expenseName: 'Internet Subscription',
    category: 'Utilities',
    price: 40,
    balance: 885,
    message: 'Monthly internet subscription',
  },
  {
    sno: 4,
    expenseName: 'Gym Membership',
    category: 'Fitness',
    price: 30,
    balance: 855,
    message: 'Monthly gym membership',
  },
  {
    sno: 5,
    expenseName: 'Dining Out',
    category: 'Food',
    price: 60,
    balance: 795,
    message: 'Dinner at restaurant',
  },
  {
    sno: 6,
    expenseName: 'Movies',
    category: 'Entertainment',
    price: 20,
    balance: 775,
    message: 'Movie tickets',
  },
  {
    sno: 7,
    expenseName: 'Books',
    category: 'Education',
    price: 45,
    balance: 730,
    message: 'New books',
  },
  {
    sno: 8,
    expenseName: 'Transportation',
    category: 'Travel',
    price: 25,
    balance: 705,
    message: 'Monthly bus pass',
  },
  {
    sno: 9,
    expenseName: 'Healthcare',
    category: 'Medical',
    price: 80,
    balance: 625,
    message: 'Doctor visit',
  },
  {
    sno: 10,
    expenseName: 'Gifts',
    category: 'Miscellaneous',
    price: 100,
    balance: 525,
    message: 'Birthday gifts',
  },
];

// Create column helper
const columnHelper = createColumnHelper<Expense>();

// Define columns
const columns = [
  columnHelper.accessor('sno', {
    header: 'Sno',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('expenseName', {
    header: 'Expense Name',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => `$${info.getValue<number>().toFixed(2)}`,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('balance', {
    header: 'Balance',
    cell: (info) => `$${info.getValue<number>().toFixed(2)}`,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('message', {
    header: 'Message',
    footer: (info) => info.column.id,
  }),
];

const UserHistoryExpenseTable: React.FC = () => {
  const [data, setData] = React.useState<Expense[]>(defaultData);
   useEffect(() => {
     setData(data);
   }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHistoryExpenseTable;
