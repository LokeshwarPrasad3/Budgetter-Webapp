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

// Sample data
// const defaultData: PocketMoneyType[] = [
//   {
//     sno: 1,
//     date: '22-09-2024',
//     money: '200',
//     source: 'Salary',
//   },
//   {
//     sno: 2,
//     date: '22-09-2024',
//     money: '200',
//     source: 'Salary',
//   },
//   {
//     sno: 3,
//     date: '22-09-2024',
//     money: '200',
//     source: 'Salary',
//   },
//   {
//     sno: 4,
//     date: '22-09-2024',
//     money: '200',
//     source: 'Salary',
//   },
//   {
//     sno: 5,
//     date: '22-09-2024',
//     money: '200',
//     source: 'Salary',
//   },
//   {
//     sno: 6,
//     date: '22-09-2024',
//     money: '200',
//     source: 'Salary',
//   },
//   {
//     sno: 7,
//     date: '22-09-2024',
//     money: '200',
//     source: 'Salary',
//   },
//   {
//     sno: 8,
//     date: '22-09-2024',
//     money: '200',
//     source: 'Salary',
//   },
//   {
//     sno: 9,
//     date: '22-09-2024',
//     money: '200',
//     source: 'Salary',
//   },
//   {
//     sno: 10,
//     date: '22-09-2024',
//     money: '200',
//     source: 'Salary',
//   },
// ];

// Create column helper
const columnHelper = createColumnHelper<PocketMoneyType>();

// Define columns
const columns = [
  columnHelper.accessor('_id', {
    header: 'ID',
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
    console.log('Redux State: ', state);
    return state.user?.user?.PocketMoneyHistory;
  });

  // const getCurrentPocketMoneyHistory = useCallback((): PocketMoneyType[] => {
  //   return pocketMoneyTableData || [];
  // }, []);

  useEffect(() => {
    if (pocketMoneyTableData) {
      // const pocketMoneyData: PocketMoneyType[] = getCurrentPocketMoneyHistory();
      // console.log('Pocket Money Data:', pocketMoneyData);
      setData(pocketMoneyTableData);
      console.log('Pocket Money Data:', pocketMoneyTableData);
    }
  }, [pocketMoneyTableData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {data.length === 0 ? (
        <div className="message_outer bg-[#ffffff] rounded-md w-full p-5 ">
          <div className="flex">Your Have Not Added Pocket Money</div>
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
    </>
  );
};

export default PocketMoneyDetails;
