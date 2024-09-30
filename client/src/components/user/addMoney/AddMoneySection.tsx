import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AddUserPocketMoney } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CirclePlus, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { getTodayDate } from '@/utils/date/date';

const AddMoneySection = () => {
  const queryClient = useQueryClient();
  const [pocketMoney, setPocketMoney] = useState<string>('');
  const [moneySource, setMoneySource] = useState<string>('');

  const { mutateAsync: AddUserMoneyMutate, isPending } = useMutation({
    mutationFn: AddUserPocketMoney,
    onSuccess: (data) => {
      console.log('Added pocket Money data', data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      console.log('Error during add money', err);
    },
  });

  const handleAddPocketMoney = () => {
    if (pocketMoney === '' || moneySource === '') {
      alert('Please fill in all fields');
      return;
    }
    const todayDate = getTodayDate();
    AddUserMoneyMutate({
      date: todayDate,
      amount: pocketMoney,
      source: moneySource,
    });
    setPocketMoney("");
    setMoneySource("");
  };

  return (
    <div className="add_expense_container flex flex-col justify-start items-start gap-4 bg-[#FFFEFE] rounded-md w-full p-4 px-5 shadow-sm">
      <h4 className="text-base font-semibold">Add Your Pocket Money</h4>
      <div className="flex justify-start flex-wrap flex-col items-start gap-3 md:gap-5 w-full">
        <div className="input_containers grid grid-cols-12 w-full lg:w-8/12 gap-3 md:gap-5">
          <div className="col-span-12 sm:col-span-6 w-full lg:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Add Money</p>
            <Input
              value={pocketMoney}
              onChange={(e) => setPocketMoney(e.target.value)}
              type="number"
              placeholder="Enter Money"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 w-full lg:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Money Source</p>
            <Input
              value={moneySource}
              onChange={(e) => setMoneySource(e.target.value)}
              type="text"
              placeholder="Enter Source"
            />
          </div>
        </div>
        <div className="action_buttons flex gap-4 justify-start flex-wrap items-center py-2">
          <Button variant={'outline'}>Cancel</Button>
          <Button onClick={handleAddPocketMoney} className="bg-green-500">
            <CirclePlus className="h-5 w-5" /> &nbsp;
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Add Money'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMoneySection;
