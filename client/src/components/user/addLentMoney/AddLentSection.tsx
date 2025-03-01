import { DatePicker } from '@/components/ui/DatePicker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { formatDate } from '@/utils/date/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLentMoney } from '@/services/lentmoney';

interface LentMoneyCredentialsType {
  personName: string;
  date: string;
  price: number;
}

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
    const lentMoneyData: LentMoneyCredentialsType = {
      date: formattedDate,
      personName,
      price: parseInt(price),
    };

    // Now pass this object to the mutation
    addLentMoneyMutate(lentMoneyData);
  };

  return (
    <div className="add_lent_container flex flex-col justify-start items-start gap-4 bg-bg_primary_light dark:bg-bg_primary_dark rounded-md border border-border_light dark:border-border_dark w-full p-4 px-5 shadow-sm">
      <h4 className="text-base font-semibold">Add Lent Money</h4>
      <div className="flex justify-start flex-wrap flex-col items-start gap-3 md:gap-5 w-full">
        <div className="input_containers grid grid-cols-12 w-full max-w-5xl gap-3 md:gap-5">
          <div className="col-span-12 sm:col-span-6 w-full xl:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Date of Lent</p>
            <DatePicker inputDate={inputDate} setInputDate={setInputDate} />
          </div>
          <div className="col-span-12 sm:col-span-6 w-full xl:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Person Name</p>
            <Input
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              type="text"
              placeholder="Enter Person Name"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 w-full xl:col-span-3 input_section flex justify-start flex-col items-start gap-1">
            <p className="text-sm">Lent Money</p>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Enter Money"
            />
          </div>
        </div>
        <div className="action_buttons flex gap-4 justify-start items-center py-2">
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
