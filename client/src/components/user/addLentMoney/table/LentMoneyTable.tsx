import React, { useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { getUserAllLentMoney } from '@/services/lentmoney';
import ReceivedLentMoneyDialog from '../actions/ReceivedLentMoneyDialog';
import { useSelector } from 'react-redux';

type LentMoneyTypes = {
  _id: string;
  personName: string;
  price: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

const columnHelper = createColumnHelper<LentMoneyTypes>();

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
  columnHelper.accessor('personName', {
    header: 'Person Name',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    footer: (info) => info.column.id,
  }),
  columnHelper.display({
    id: 'action',
    header: 'Action',
    cell: (info) => {
      const rowData = info.row.original;
      return (
        <ReceivedLentMoneyDialog
          lentMoneyId={rowData._id}
          personName={rowData.personName}
        />
      );
    },
  }),
];

const LentMoneyTable: React.FC = () => {
  const [data, setData] = React.useState<LentMoneyTypes[]>([]);
  const LentMoneyHistoryTableData = useSelector((state: any) => {
    // console.log('here listen', state.user?.user.PocketMoneyHistory);
    return state.user?.user.LentMoneyHistory;
  });

  //   const { data: allLentMoneyData } = useQuery({
  //     queryFn: getUserAllLentMoney,
  //     queryKey: ['all-lent-money-records'],
  //   });
  //   useEffect(() => {
  //     if (allLentMoneyData?.success) {
  //       console.log(
  //         'all lent money data',
  //         allLentMoneyData?.data?.LentMoneyHistory
  //       );

  //       setData(allLentMoneyData.data.LentMoneyHistory);
  //     }
  //   }, [allLentMoneyData]);
  
  useEffect(() => {
    console.log(LentMoneyHistoryTableData);
    setData(LentMoneyHistoryTableData);
  }, [LentMoneyHistoryTableData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {data?.length === 0 ? (
        <div className="message_outer bg-[#ffffff] rounded-md w-full p-5 ">
          <div className="flex">No Records Found</div>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
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

export default LentMoneyTable;
