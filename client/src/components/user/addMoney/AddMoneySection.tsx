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
      console.log(data?.message);
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
    setPocketMoney('');
    setMoneySource('');
  };

  return (
    <div className="add_expense_container flex w-full flex-col items-start justify-start gap-4 rounded-md border border-border_light bg-bg_primary_light p-4 px-5 shadow-sm dark:border-border_dark dark:bg-bg_primary_dark">
      <h4 className="text-base font-semibold">Add Your Pocket Money</h4>
      <div className="flex w-full flex-col flex-wrap items-start justify-start gap-3 md:gap-5">
        <div className="input_containers grid w-full grid-cols-12 gap-3 md:gap-5 lg:w-8/12">
          <div className="input_section col-span-12 flex w-full flex-col items-start justify-start gap-1 sm:col-span-6 lg:col-span-3">
            <p className="text-sm">Add Money</p>
            <Input
              value={pocketMoney}
              onChange={(e) => setPocketMoney(e.target.value)}
              type="number"
              placeholder="Enter Money"
            />
          </div>
          <div className="input_section col-span-12 flex w-full flex-col items-start justify-start gap-1 sm:col-span-6 lg:col-span-3">
            <p className="text-sm">Money Source</p>
            <Input
              value={moneySource}
              onChange={(e) => setMoneySource(e.target.value)}
              type="text"
              placeholder="Enter Source"
            />
          </div>
        </div>
        <div className="action_buttons flex flex-wrap items-center justify-start gap-4 py-2">
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
