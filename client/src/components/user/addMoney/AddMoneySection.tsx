import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CirclePlus } from 'lucide-react';

const AddMoneySection = () => {
  return (
    <div className="add_expense_container flex flex-col justify-start items-start gap-4 bg-[#FFFEFE] rounded-md w-full p-4 px-5 shadow-sm">
      <h4 className="text-base font-semibold">Add Your Pocket Money</h4>
      <div className="flex justify-start flex-wrap flex-col items-start gap-3 md:gap-5 w-full">
        <div className="input_containers grid grid-cols-12 w-full lg:w-8/12 gap-3 md:gap-5">
          <div className="col-span-12 sm:col-span-6 w-full lg:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Add Money</p>
            <Input type="number" placeholder="Enter Money" />
          </div>
          <div className="col-span-12 sm:col-span-6 w-full lg:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Money Source</p>
            <Input type="text" placeholder="Enter Source" />
          </div>
        </div>
        <div className="action_buttons flex gap-4 justify-start flex-wrap items-center py-2">
          <Button variant={'outline'}>Cancel</Button>
          <Button className="bg-green-500">
            <CirclePlus className="h-5 w-5" /> &nbsp; Add Money
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMoneySection;
