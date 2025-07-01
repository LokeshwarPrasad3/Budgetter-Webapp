import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import React, { useState } from 'react';

type ExpensesTypes = {
  _id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
};

interface ViewCategoryExpensesDialogPropType {
  category: string;
  fullExpenses: ExpensesTypes[];
}

const ViewCategoryExpensesDialog: React.FC<
  ViewCategoryExpensesDialogPropType
> = ({ category, fullExpenses }) => {
  const [open, setOpen] = useState<boolean>(false);

  const columnHelper = createColumnHelper<ExpensesTypes>();

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
    columnHelper.accessor('createdAt', {
      header: 'TIME',
      cell: (info) =>
        new Date(info.getValue<string>()).toLocaleString().split(',')[1],
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: fullExpenses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button
          data-tooltip-id="header-tooltip"
          data-tooltip-content="View Expenses"
          data-tooltip-place="right"
          className="flex w-fit cursor-pointer items-center justify-center rounded-full bg-slate-100 p-1.5 text-green-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          <Eye className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="mx-auto w-[97%] max-w-2xl rounded-lg p-0 pb-5">
        <DialogTitle className="hidden"></DialogTitle>
        <h4 className="p-5 pb-0 text-base font-medium">
          Your{' '}
          <span className="font-bold text-green-800 dark:text-green-400">
            {' '}
            {category}
          </span>{' '}
          Expenses
        </h4>
        <div className="table_container max-h-[80vh] min-w-full max-w-full overflow-x-auto overflow-y-auto">
          <table className="min-w-full divide-y border-b border-t border-border_dark">
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
      </DialogContent>
    </Dialog>
  );
};

export default ViewCategoryExpensesDialog;
