import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import useCategoryStats from './useCategoryStats';

// Define color map for category
const categoryColorMap: Record<string, string> = {
  Groceries: 'text-green-600 dark:text-green-400',
  'Housing & Utilities': 'text-blue-600 dark:text-blue-400',
  Medical: 'text-red-600 dark:text-red-400',
  Food: 'text-yellow-600 dark:text-yellow-400',
  Personal: 'text-pink-600 dark:text-pink-400',
  Educational: 'text-indigo-600 dark:text-indigo-400',
  Transportation: 'text-purple-600 dark:text-purple-400',
  Miscellaneous: 'text-gray-600 dark:text-gray-400',
};

interface PropTypes {
  filterMonthValue: string;
  filterYearValue: string;
}

const CategoryInsightsTable: React.FC<PropTypes> = ({
  filterMonthValue,
  filterYearValue,
}) => {
  const columnHelper = createColumnHelper<CategoryStats>();

  const columns = [
    columnHelper.display({
      id: 'index',
      header: '#',
      cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => {
        const category = info.getValue();
        const colorClass = categoryColorMap[category] || 'text-gray-500';
        return <span className={`${colorClass} font-medium`}>{category}</span>;
      },
    }),
    columnHelper.accessor('totalSpent', {
      header: 'Total Spent',
      cell: (info) => {
        const value = info.getValue();
        const color =
          value > 3000
            ? 'text-red-600 dark:text-red-400'
            : value > 1000
              ? 'text-orange-600 dark:text-orange-400'
              : 'text-green-600 dark:text-green-400';
        return <span className={`${color} font-semibold`}>₹{value}</span>;
      },
    }),
    columnHelper.accessor('expensePercent', {
      header: 'Expense %',
      cell: (info) => {
        const value = info.getValue();
        const allRows = info.table.getRowModel().rows.map((r) => r.original);
        const highest = Math.max(...allRows.map((r) => r.expensePercent));
        const lowest = Math.min(...allRows.map((r) => r.expensePercent));

        let styleClass = '';
        if (value === highest) {
          styleClass = 'text-[#dc3545] bg-[#f81f581a]';
        } else if (value === lowest) {
          styleClass = 'text-[#198754] bg-[#61ae4130]';
        } else {
          styleClass =
            value > 30
              ? 'text-red-600 dark:text-red-400'
              : value > 15
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-green-600 dark:text-green-400';
        }

        return (
          <span className={`${styleClass} rounded px-2 py-1 font-semibold`}>
            {value}%
          </span>
        );
      },
    }),

    columnHelper.accessor('transactionCount', {
      header: 'No. of Transactions',
      cell: (info) => (
        <span className="font-medium text-blue-700 dark:text-blue-300">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('avgExpense', {
      header: 'Avg Expense',
      cell: (info) => (
        <span className="font-medium text-cyan-700 dark:text-cyan-400">
          ₹{info.getValue().toFixed(2)}
        </span>
      ),
    }),
    columnHelper.accessor('maxExpense', {
      header: 'Max Expense',
      cell: (info) => (
        <span className="font-medium text-red-500 dark:text-red-300">
          ₹{info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('minExpense', {
      header: 'Min Expense',
      cell: (info) => (
        <span className="font-medium text-green-700 dark:text-green-300">
          ₹{info.getValue()}
        </span>
      ),
    }),
  ];

  type CategoryStats = {
    category: string;
    totalSpent: number;
    expensePercent: number;
    transactionCount: number;
    avgExpense: number;
    maxExpense: number;
    minExpense: number;
  };

  const rawStats = useCategoryStats(filterMonthValue, filterYearValue);
  const [categoryStatsData, setCategoryStatsData] = useState<CategoryStats[]>(
    []
  );
  // Sync once on load
  useEffect(() => {
    setCategoryStatsData(rawStats);
  }, [rawStats]);

  const table = useReactTable({
    data: categoryStatsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full rounded-md bg-bg_primary_light px-0 py-6 shadow-sm dark:bg-bg_primary_dark">
      {categoryStatsData.length === 0 ? (
        <div className="flex px-6 text-lg">No Expenses Found</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="flex w-full items-center justify-between gap-3 px-8 pb-5">
            <span className="text-lg font-medium">
              Your Categorized Expense Stats
            </span>
          </div>
          <div className="table_container min-w-full overflow-x-auto">
            <table className="min-w-full divide-y border-b border-border_dark">
              <thead className="dark:bg-bg_secondary_dark">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="whitespace-nowrap bg-gray-50 px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:bg-bg_primary_dark dark:text-gray-100 md:px-6 md:text-sm"
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
                      index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap px-4 py-2.5 text-xs text-gray-600 dark:text-gray-100 md:px-6 md:text-sm"
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
        </div>
      )}
    </div>
  );
};

export default CategoryInsightsTable;
