import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { MoreHorizontal, Check } from 'lucide-react';
import { useState } from 'react';

interface PropType {
  setChartFilter: (value: string) => void;
}

const ChartFilterOptions: React.FC<PropType> = ({ setChartFilter }) => {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('daily'); // Default selection

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="absolute right-0 top-0 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </PopoverTrigger>
      <PopoverContent className="relative right-6 w-28 rounded-lg bg-white p-0 shadow-md dark:bg-gray-800">
        <ul className="text-sm text-gray-700 dark:text-gray-300">
          {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((item) => {
            const isSelected = selectedFilter === item.toLowerCase();
            return (
              <li
                key={item}
                onClick={() => {
                  setChartFilter(item.toLowerCase());
                  setSelectedFilter(item.toLowerCase());
                  setOpen(false);
                }}
                className={`flex cursor-pointer items-center justify-between rounded-md border-b px-3 py-1 hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-gray-700`}
              >
                {item}
                {isSelected && (
                  <Check className="h-4 w-4 text-green-500" />
                )}{' '}
                {/* Checkmark Icon */}
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ChartFilterOptions;
