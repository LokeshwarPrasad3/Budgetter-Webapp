import { useState } from 'react';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
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
import { deleteUserExpense } from '@/services/expenses';
import toast from 'react-hot-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDispatch } from 'react-redux';
import { deleteFilteredExpense } from '@/features/user/user';
import { deleteExpensesFromAllCollection } from '@/features/expenses/expenses';

interface DeleteExpensesDialogPropType {
  storedExpenseDate: string;
  info: {
    _id: string;
    name: string;
    price: number;
    category: string;
    createdAt: string;
    updatedAt: string;
  };
}

const DeleteExpensesDialog: React.FC<DeleteExpensesDialogPropType> = ({
  storedExpenseDate,
  info,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdatePriceToPocketMoney, setIsUpdatePriceToPocketMoney] =
    useState<boolean>(true);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutateAsync: deleteExpenseMutate, isPending } = useMutation({
    mutationFn: deleteUserExpense,
    onSuccess: (data, cred) => {
      console.log(data?.message);
      toast.success('Successfully expense deleted!!');
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      dispatch(deleteFilteredExpense({ id: cred?.expenseId }));
      dispatch(
        deleteExpensesFromAllCollection({
          id: cred?.expenseId,
          expenseDate: cred?.expenseDate,
        })
      );
    },
    onError: (error) => {
      console.log(error);
      toast.error('Unable to delete expense!!');
    },
  });

  const handleDelete = () => {
    deleteExpenseMutate({
      expenseId: info?._id,
      expenseDate: storedExpenseDate,
      isAddPriceToPocketMoney: isUpdatePriceToPocketMoney,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-red-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
          <Trash2 className="h-4 w-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="overflow-visible">
        <DialogHeader>
          <DialogTitle className="flex items-center text-destructive dark:text-red-300">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Delete Expense
          </DialogTitle>
          <DialogDescription className="pt-2 text-slate-700">
            Are you sure you want to remove your expense? <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="content_here mb-1 flex items-center justify-start gap-1.5">
          <Checkbox
            id="updatePrice"
            checked={isUpdatePriceToPocketMoney}
            onCheckedChange={(checked) =>
              setIsUpdatePriceToPocketMoney(checked === true)
            }
          />
          <Label htmlFor="updatePrice" className="cursor-pointer">
            Update Price to Pocket Money??
            <span className="font-semibold text-green-700">
              {isUpdatePriceToPocketMoney ? ` + ${info?.price}₹ ` : ''}
            </span>
          </Label>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-0 sm:space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full flex-1"
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="w-full flex-1"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-1.5 h-4 w-4 text-white" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExpensesDialog;
