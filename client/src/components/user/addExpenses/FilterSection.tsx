import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';

const FilterSection = () => {
  return (
    <div className="add_expense_container flex flex-col justify-start items-start gap-4 bg-[#FFFEFE] rounded-md w-full p-4 px-5 shadow-sm">
      <h4 className="text-base font-semibold">Add Your Expenses</h4>
      <div className="flex justify-start flex-wrap flex-col items-start gap-3 md:gap-5 w-full">
        <div className="input_containers grid grid-cols-12 w-full lg:w-8/12 gap-3 md:gap-5">
          <div className="col-span-12 sm:col-span-6 w-full lg:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Date of Expense</p>
            <DatePicker />
          </div>
          <div className="col-span-12 sm:col-span-6 w-full lg:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Name of Expense</p>
            <Input type="text" placeholder="Enter Expense" />
          </div>
          <div className="col-span-12 sm:col-span-6 w-full lg:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Expenses Category</p>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Housing & Utilities</SelectItem>
                  <SelectItem value="banana">Food</SelectItem>
                  <SelectItem value="blueberry">Groceries</SelectItem>
                  <SelectItem value="grapes">Personal Care</SelectItem>
                  <SelectItem value="pineapple">Miscellaneous</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-12 sm:col-span-6 w-full lg:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Expense Price</p>
            <Input type="number" placeholder="Enter Price" />
          </div>
        </div>
        <div className="action_buttons flex gap-4 justify-start items-center py-2">
          <Button className="bg-green-500">
            <CirclePlus className="h-5 w-5" /> &nbsp; Add New
          </Button>
          <Button className="bg-blue-500">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
