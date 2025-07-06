import React, { useEffect, useState } from 'react';
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
import { ExpensesTableTypes } from '@/types/api/expenses/credentials';
import { getLabelColorStyle } from '@/utils/ui/utility';
import { formatDate, isDateToday } from '@/utils/date/date';

interface PropType {
  fromAddExpensePage: boolean;
  expensesDate: Date;
  storedExpenseDate: string;
}

const UserHistoryExpenseTable: React.FC<PropType> = ({
  fromAddExpensePage,
  expensesDate,
  storedExpenseDate,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<ExpensesTableTypes[]>([]);

  // Redux selectors
  const expensesDetailArray = useSelector((state: any) => state.user?.expenses);
  const allExpensesArray = useSelector(
    (state: any) => state.expenses.allExpenses
  );

  // Setup query, but do NOT auto-fetch (enabled: false)
  const { data: todayExpensesData, refetch: refetchTodayExpenses } = useQuery({
    queryFn: getTodayExpenses,
    queryKey: ['todayExpense'],
  });

  // Always set default data to today (from Redux store)
  useEffect(() => {
    if (isDateToday(expensesDate) && expensesDetailArray) {
      setData(expensesDetailArray);
    }
  }, [expensesDetailArray, expensesDate]);

  // If coming from Add Expense page, manually fetch today's expenses
  useEffect(() => {
    if (fromAddExpensePage && isDateToday(expensesDate)) {
      refetchTodayExpenses();
    }
  }, [fromAddExpensePage, expensesDate, refetchTodayExpenses]);

  // After fetching, set data and dispatch to Redux
  useEffect(() => {
    if (todayExpensesData?.success && fromAddExpensePage) {
      setData(todayExpensesData.data);
      dispatch(setExpenses(todayExpensesData.data));
    }
  }, [todayExpensesData, fromAddExpensePage]);

  // For other dates, filter from all expenses
  useEffect(() => {
    if (!fromAddExpensePage && !isDateToday(expensesDate)) {
      const matchedDay = allExpensesArray.find(
        (expense: { date: string }) => expense.date === formatDate(expensesDate)
      );
      if (matchedDay) {
        setData(matchedDay.products);
      } else {
        setData([]);
      }
    }
  }, [fromAddExpensePage, expensesDate, allExpensesArray]);

  const columnHelper = createColumnHelper<ExpensesTableTypes>();

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
      cell: (info) => {
        const row = info.row.original;
        return (
          <span className="flex items-center gap-1">
            {row.name}
            {row.label &&
              (() => {
                const style = getLabelColorStyle(row.label);
                return (
                  <span
                    style={{
                      color: style.color,
                      backgroundColor: style.backgroundColor,
                      border: `1px solid ${style.borderColor}`,
                    }}
                    className="relative -top-1 inline-flex h-4 w-fit items-center gap-1 rounded-sm px-1.5 text-[10px] font-medium"
                  >
                    {row.label}
                  </span>
                );
              })()}
          </span>
        );
      },
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
        {data?.length === 0 ? (
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
