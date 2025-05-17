import React, { useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';

type PocketMoneyType = {
  _id: string;
  date: string;
  amount: string;
  source: string;
};

// Create column helper
const columnHelper = createColumnHelper<PocketMoneyType>();

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
  columnHelper.accessor('amount', {
    header: 'Amount',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('source', {
    header: 'Source',
    footer: (info) => info.column.id,
  }),
];

const PocketMoneyDetails: React.FC = () => {
  const [data, setData] = React.useState<PocketMoneyType[]>([]);
  const pocketMoneyTableData = useSelector((state: any) => {
    // console.log('here listen', state.user?.user.PocketMoneyHistory);
    return state.user?.user.PocketMoneyHistory;
  });

  useEffect(() => {
    setData([...pocketMoneyTableData].reverse());
  }, [pocketMoneyTableData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {data && data?.length === 0 ? (
        <div className="message_outer w-full rounded-md p-5">
          <div className="flex">Your Have Not Added Pocket Money</div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg border-border_dark dark:border">
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

export default PocketMoneyDetails;
