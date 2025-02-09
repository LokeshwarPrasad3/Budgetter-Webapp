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

    const sampleExpenses = [
      {
        sno: 1,
        expense_name: 'Groceries',
        price: '$50',
        category: 'Food',
        time: '2023-10-01',
      },
      {
        sno: 2,
        expense_name: 'Internet Bill',
        price: '$60',
        category: 'Utilities',
        time: '2023-10-05',
      },
      {
        sno: 3,
        expense_name: 'Movie Tickets',
        price: '$30',
        category: 'Entertainment',
        time: '2023-10-10',
      },
    ];

  return (
    <>
      <div className="message_outer bg-[#ffffff] rounded-md w-full px-0 py-5">
        {data.length === 0 ? (
          <div className="flex px-5">No Expenses Found</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <div className="flex px-5 pb-3">
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
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
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
      <PDFExportComponent
        userDetails={{
          name: 'John Doe',
          currentPocketMoney: '$500',
          DOB: '1990-01-01',
          email: 'john.doe@example.com',
          profession: 'Software Engineer',
        }}
        expenses={sampleExpenses}
      />
    </>
  );
};

export default UserHistoryExpenseTable;
