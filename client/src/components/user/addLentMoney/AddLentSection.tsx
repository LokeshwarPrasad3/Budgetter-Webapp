import { DatePicker } from '@/components/ui/DatePicker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { formatDate } from '@/utils/date/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLentMoney } from '@/services/lentmoney';
import { LentMoneyCredType } from '@/types/api/lentmoney/credentials';

const AddLentSection = () => {
  const queryClient = useQueryClient();
  const [inputDate, setInputDate] = useState<Date | undefined>(new Date());
  const [personName, setPersonName] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const { mutateAsync: addLentMoneyMutate, isPending } = useMutation({
    mutationFn: addLentMoney,
    onSuccess: (data) => {
      console.log(data?.message);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Lent Money Added Successfully!!');
      setPersonName('');
      setPrice('');
    },
    onError: (error) => {
      console.log('Error on add lent money', error);
      toast.error('Something went wrong!!');
    },
  });

  const handleAddLentMoney = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(inputDate, personName, price);
    if (parseInt(price) < 0) {
      toast.error('Money not be negative!!');
      return;
    }
    if (!inputDate || !personName || !price) {
      toast.error('Input Not be Empty!!');
      return;
    }
    // console.log(inputDate, personName, price);
    const formattedDate: string = formatDate(inputDate);
    console.log(formatDate(inputDate));
    const lentMoneyData: LentMoneyCredType = {
      date: formattedDate,
      personName,
      price: parseInt(price),
    };

    // Now pass this object to the mutation
    addLentMoneyMutate(lentMoneyData);
  };

  return (
    <div className="add_lent_container flex w-full flex-col items-start justify-start gap-4 rounded-md border border-border_light bg-bg_primary_light p-4 px-5 shadow-sm dark:border-border_dark dark:bg-bg_primary_dark">
      <h4 className="text-base font-semibold">Add Lent Money</h4>
      <div className="flex w-full flex-col flex-wrap items-start justify-start gap-3 md:gap-5">
        <div className="input_containers grid w-full max-w-5xl grid-cols-12 gap-3 md:gap-5">
          <div className="input_section col-span-12 flex w-full flex-col items-start justify-start gap-1 sm:col-span-6 xl:col-span-3">
            <p className="text-sm">Date of Lent</p>
            <DatePicker inputDate={inputDate} setInputDate={setInputDate} />
          </div>
          <div className="input_section col-span-12 flex w-full flex-col items-start justify-start gap-1 sm:col-span-6 xl:col-span-3">
            <p className="text-sm">Person Name</p>
            <Input
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              type="text"
              placeholder="Enter Person Name"
            />
          </div>
          <div className="input_section col-span-12 flex w-full flex-col items-start justify-start gap-1 sm:col-span-6 xl:col-span-3">
            <p className="text-sm">Lent Money</p>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Enter Money"
            />
          </div>
        </div>
        <div className="action_buttons flex items-center justify-start gap-4 py-2">
          <Button
            disabled={isPending}
            onClick={handleAddLentMoney}
            className="bg-blue-500"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Add Lent Money'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddLentSection;
