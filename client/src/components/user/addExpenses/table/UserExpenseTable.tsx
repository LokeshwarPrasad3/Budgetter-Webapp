import React, { useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
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
  columnHelper.accessor('_id', {
    header: 'ID',
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
    cell: (info) => `${info.getValue<string>().split('T')[1]?.slice(0, 8)}`,
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
    </>
  );
};

export default UserHistoryExpenseTable;
