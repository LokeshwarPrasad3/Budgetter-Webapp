import { useState } from 'react';
import { Check, CheckCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateReceivedLentMoney } from '@/services/lentmoney';

interface ReceivedLentMoneyDialogPropType {
  lentMoneyId: string;
  personName: string;
}

const ReceivedLentMoneyDialog: React.FC<ReceivedLentMoneyDialogPropType> = ({
  lentMoneyId,
  personName,
}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: DeleteLentRecordMutate, isPending } = useMutation({
    mutationFn: updateReceivedLentMoney,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Lent Record Deleted Successfully');
      setIsOpen(false);
    },
    onError: (err) => {
      console.log('Error during delete account', err);
      toast.error('Something went wrong!!');
    },
  });

  const handleConfirm = () => {
    if (!lentMoneyId) {
      toast.error('Lent Id is not null!');
      return;
    }
    DeleteLentRecordMutate({ lentMoneyId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="action_button">
          <button className="h-fit w-fit rounded-xl border-none bg-[#61ae41] px-2.5 py-0.5 text-xs capitalize text-white">
            money receved
            <i className="ri-checkbox-circle-line ml-0.5 text-yellow-100"></i>
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-primary">
            <CheckCircle className="mr-2 h-5 w-5" />
            Confirm Money Received
          </DialogTitle>
          <DialogDescription className="pt-2 text-center text-slate-700">
            Are you sure you’ve received the money from {personName}? This will
            remove the entry and update your balance
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 sm:gap-0 sm:space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full flex-1 dark:hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleConfirm}
            className="w-full flex-1 dark:hover:text-white"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Confirm
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceivedLentMoneyDialog;
