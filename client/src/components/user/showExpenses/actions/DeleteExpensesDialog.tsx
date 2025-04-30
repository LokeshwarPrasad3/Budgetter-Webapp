import { useState } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
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

const DeleteExpensesDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log('Expense deleted');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-red-400 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
          <Trash2 className="h-4 w-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl overflow-visible">
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
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="w-full flex-1"
          >
            <Trash2 className="mr-1.5 h-4 w-4 text-white" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExpensesDialog;
