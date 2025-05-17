import React, { useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getTodayExpenses } from '@/services/expenses';
import { setExpenses } from '@/features/user/user';

type ExpensesTypes = {
  _id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
};

const columnHelper = createColumnHelper<ExpensesTypes>();

// Define columns
const columns = [
  // columnHelper.accessor('_id', {
  //   header: 'ID',
  //   footer: (info) => info.column.id,
  // }),
  columnHelper.display({
    id: 'index',
    header: '#',
    cell: (info) => info.row.index + 1,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('createdAt', {
    header: 'TIME',
    cell: (info) =>
      new Date(info.getValue<string>()).toLocaleString().split(',')[1],
    footer: (info) => info.column.id,
  }),
];

const UserHistoryExpenseTable: React.FC = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState<ExpensesTypes[]>([]);

  const { data: todayExpensesData } = useQuery({
    queryFn: getTodayExpenses,
    queryKey: ['todayExpense'],
  });

  useEffect(() => {
    if (todayExpensesData?.success) {
      setData(todayExpensesData.data);
      dispatch(setExpenses(todayExpensesData.data));
    }
  }, [todayExpensesData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {data.length === 0 ? (
        <div className="message_outer w-full rounded-md p-5">
          <div className="flex">No Expenses Found</div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y border-b border-border_dark">
            <thead className="dark:bg-bg_secondary_dark">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100"
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
                      className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-100"
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
    </>
  );
};

export default UserHistoryExpenseTable;
