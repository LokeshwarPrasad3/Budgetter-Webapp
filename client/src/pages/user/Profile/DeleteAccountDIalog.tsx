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
            <AlertTriangle className="w-5 h-5 mr-2" />
            Delete Account
          </DialogTitle>
          <DialogDescription className="pt-2 text-slate-700">
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 relative">
          <Label
            htmlFor="password"
            className="text-sm font-medium flex items-center mb-2"
          >
            <Lock className="w-4 h-4 mr-2" />
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
            className="absolute bottom-[18px] flex justify-center items-center right-0.5 h-8 w-8 hover:bg-slate-100 rounded-full cursor-pointer select-none text-slate-500"
          >
            {isPasswordVisible ? (
              <Eye className=" h-[18px] w-[18px]" />
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
            className="flex-1 w-full"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="flex-1 w-full"
            disabled={!password || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                <Trash2 className="w-4 text-white h-4 mr-1.5" />
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
