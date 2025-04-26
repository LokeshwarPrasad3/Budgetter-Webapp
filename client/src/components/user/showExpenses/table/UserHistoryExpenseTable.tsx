import React, { useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { getTodayDate } from '@/utils/date/date';
import PDFExportComponent from '../../PDFExportComponent';

type ExpensesTypes = {
  _id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
};

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
];

const UserHistoryExpenseTable: React.FC = () => {
  const [data, setData] = React.useState<ExpensesTypes[]>([]);
  const expensesDetailArray = useSelector((state: any) => {
    return state.user?.expenses;
  });

  useEffect(() => {
    if (expensesDetailArray) {
      setData(expensesDetailArray);
      // console.log('Date Expenses:', expensesDetailArray);
    }
  }, [expensesDetailArray]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="message_outer bg-bg_primary_light dark:bg-bg_primary_dark rounded-md w-full px-0 py-5">
        {data.length === 0 ? (
          <div className="flex px-5">No Expenses Found</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <div className="flex px-5 pb-3 justify-between w-full gap-3 items-center">
              <span>
                {(() => {
                  const createdAt = data[0]?.createdAt;
                  if (!createdAt) return null;

                  const formattedDate = createdAt
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-');

                  return formattedDate === getTodayDate()
                    ? 'Your Today Expenses'
                    : formattedDate;
                })()}
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
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider"
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
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-100"
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
