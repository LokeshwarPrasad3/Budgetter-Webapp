import React, { useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDispatch, useSelector } from 'react-redux';
import PDFExportComponent from '../../PDFExportComponent';
import EditExpensesDialog from '../actions/EditExpensesDialog';
import DeleteExpensesDialog from '../actions/DeleteExpensesDialog';
import { getTodayExpenses } from '@/services/expenses';
import { useQuery } from '@tanstack/react-query';
import { setExpenses } from '@/features/user/user';

type ExpensesTypes = {
  _id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
};

interface PropType {
  expensesDate: Date;
  storedExpenseDate: string;
}

const UserHistoryExpenseTable: React.FC<PropType> = ({
  expensesDate,
  storedExpenseDate,
}) => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState<ExpensesTypes[]>([]);
  // get bydefault today expenses
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

  // get expenses from redux store
  const expensesDetailArray = useSelector((state: any) => {
    return state.user?.expenses;
  });

  useEffect(() => {
    if (expensesDetailArray) {
      setData(expensesDetailArray);
    }
  }, [expensesDetailArray]);

  const columnHelper = createColumnHelper<ExpensesTypes>();

  // Define columns
  const columns = [
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
    columnHelper.display({
      id: 'Action',
      header: 'Action',
      cell: (info) => {
        return (
          <div className="flex w-full items-center justify-start space-x-2">
            <EditExpensesDialog
              expensesDate={expensesDate}
              storedExpenseDate={storedExpenseDate}
              info={info.row.original}
            />
            <DeleteExpensesDialog
              storedExpenseDate={storedExpenseDate}
              info={info.row.original}
            />
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="message_outer w-full rounded-md bg-bg_primary_light px-0 py-5 dark:bg-bg_primary_dark">
        {data.length === 0 ? (
          <div className="flex px-5">No Expenses Found</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="flex w-full items-center justify-between gap-3 px-5 pb-3">
              <span className="text-base font-medium">
                Your {storedExpenseDate} Expenses
              </span>
              <PDFExportComponent
                createdAt={new Date(data[0]?.createdAt)
                  .toISOString()
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('-')}
                expenses={expensesDetailArray}
              />
            </div>
            <table className="min-w-full divide-y border-b border-border_dark">
              <thead className="dark:bg-bg_secondary_dark">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-2.5 text-left text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-100"
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
                {table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`dark:bg-bg_primary_dark dark:hover:bg-slate-800 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap px-6 py-2.5 text-sm text-gray-500 dark:text-gray-100"
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

export default UserHistoryExpenseTable;
