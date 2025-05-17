import { useState } from 'react';
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Trash2,
  UserX,
} from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { deleteUserAccount } from '@/services/auth';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const DeleteAccountDialog = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const { mutateAsync: DeleteUserMutate, isPending } = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: (data) => {
      console.log(data?.message);
      cookie.remove('accessToken', { path: '/' });
      toast.success('Account Deleted Successfully');
      toast.success('Account Deleted Successfully');
      setTimeout((): void => {
        navigate('/');
      }, 2000);
    },
    onError: (err) => {
      console.log('Error during delete account', err);
      toast.error('Invalid Password');
    },
  });

  const handleDelete = () => {
    if (password.length < 6 || !password) {
      toast.error('Please Enter Valid Password!');
      return;
    }
    DeleteUserMutate({ password });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <UserX className="mr-2 h-4 w-4" />
          Delete My Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-destructive dark:text-red-300">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription className="pt-2 text-slate-700">
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="relative py-4">
          <Label
            htmlFor="password"
            className="mb-2 flex items-center text-sm font-medium"
          >
            <Lock className="mr-2 h-4 w-4" />
            Confirm your password
          </Label>
          <Input
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full"
          />
          <span
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute bottom-[18px] right-0.5 flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            {isPasswordVisible ? (
              <Eye className="h-[18px] w-[18px]" />
            ) : (
              <EyeOff className="h-[18px] w-[18px]" />
            )}
          </span>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-0 sm:space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              setPassword('');
            }}
            className="w-full flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="w-full flex-1"
            disabled={!password || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                <Trash2 className="mr-1.5 h-4 w-4 text-white" />
                Delete Account
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
