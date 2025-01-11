import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Camera,
  User,
  Mail,
  Briefcase,
  Calendar,
  Lock,
  Instagram,
  Facebook,
  Save,
  IndianRupee,
  Loader2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeUserAvatar, updatedUserDetails } from '@/services/auth';
import { setUser } from '@/features/user/user';

const ProfilePage: React.FC = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isPasswordCollapsibleOpen, setIsPasswordCollapsibleOpen] =
    useState<boolean>(false);

  // Assuming you have the user data in your redux store
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dob, setDOB] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>(
    'https://i.ibb.co/cDvPNm5/360-F-864477167-q-Srg-Ao5j-QHc-PYacblj-ZXu-FPVHy-Q9-QOln.webp'
  );
  // const [dob, setDOB] = useState<Date>(new Date());
  const [facebookLink, setFacebookLink] = useState<string>('');
  const [instagramLink, setInstagramLink] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const {
      name,
      username,
      email,
      avatar,
      profession,
      dob,
      instagramLink,
      facebookLink,
    } = user;
    setName(name);
    setUsername(username);
    setEmail(email);
    setProfileImage(avatar);
    setProfession(profession);
    setDOB(dob);
    setInstagramLink(instagramLink);
    setFacebookLink(facebookLink);
    // console.log(
    //   name,
    //   username,
    //   email,
    //   avatar,
    //   profession,
    //   dob,
    //   instagramLink,
    //   facebookLink
    // );
  }, [user]);

  // Mutate Function for Avatar Change
  const { mutateAsync: changeAvatarMutate, isPending } = useMutation({
    mutationFn: changeUserAvatar,
    onSuccess: (data) => {
      console.log('avatar changed ', data.message);
      dispatch(setUser({ ...user, avatar: data.data.avatar }));
      toast.success('Avatar Changed Successfully!!');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Something went wrong!!');
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      // console.log('file is ', file);
      // Prepare a formdata
      const formData = new FormData();
      formData.append('avatar', file);
      changeAvatarMutate(formData);
    }
  };

  // Change user details
  const { mutateAsync: updateUserDetailsMutate, isPending: isUserUpdating } =
    useMutation({
      mutationFn: updatedUserDetails,
      onSuccess: (data) => {
        console.log('User Updated Successfully', data.message);
        toast.success('User Details Updated Successfully!!');
        queryClient.invalidateQueries({ queryKey: ['user'] });
        setCurrentPassword('');
        setNewPassword('');
      },
      onError: (error) => {
        console.log(error);
        toast.error('Something went wrong!!');
      },
    });

  const handleSaveChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // const [day, month, year] = dob.split('-');
    // const dobDate = `${year}-${month}-${day}`;
    // console.log(name, dobDate, instagramLink, facebookLink, profession, currentPassword, newPassword);
    if (name.length < 6) {
      toast.error('Name must be at least 6 length!!');
      return;
    }
    // currentPassword, newPassword must be same
    if (
      (currentPassword === '' && newPassword !== '') ||
      (currentPassword !== '' && newPassword === '')
    ) {
      toast.error('Provide both password fields!!');
      return;
    }
    updateUserDetailsMutate({
      name,
      dob,
      instagramLink,
      facebookLink,
      profession,
      currentPassword,
      newPassword,
    });
  };

  return (
    <div className="add_expense_container flex flex-col items-center gap-4 bg-[#FFFEFE] rounded-md max-w-4xl w-full px-4 py-5 sm:p-7 shadow-sm">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 shadow-sm">
          <AvatarImage src={profileImage} alt="Profile" />
          <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          className="w-40 bg-transparent hover:bg-[##f1f5f9] relative overflow-hidden"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4 cursor-pointer" />
              <span className="cursor-pointer">Change Image</span>
            </>
          )}
          <Input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
            accept="image/*"
          />
        </Button>
      </div>

      <div className="space-y-6 flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Username */}
          <div className="space-y-2 w-full">
            <Label htmlFor="username">Username</Label>
            {/* <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                placeholder="Username"
                className="pl-10 w-full"
                value={username}
              />
            </div> */}
            <div className="flex items-center h-9 cursor-not-allowed space-x-2 bg-gray-100 p-2 rounded">
              <User className="text-gray-400 h-4 w-4" />
              <span className="text-sm">{username}</span>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2 w-full">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                onChange={(e) => setName(e.target.value)}
                id="fullName"
                type="text"
                placeholder="Full Name"
                className="pl-10 w-full"
                value={name}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 w-full">
            <Label htmlFor="email">Email</Label>
            {/* <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Email"
                className="pl-10 w-full"
                value={email}
              />
            </div> */}
            <div className="flex items-center cursor-not-allowed h-9 space-x-2 bg-gray-100 p-2 rounded">
              <Mail className="text-gray-400 h-4 w-4" />
              <span className="text-sm">{email}</span>
            </div>
          </div>

          {/* Profession */}
          <div className="space-y-2 w-full">
            <Label htmlFor="profession">Profession</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="profession"
                type="text"
                placeholder="Profession"
                className="pl-10 w-full"
                onChange={(e) => setProfession(e.target.value)}
                value={profession}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2 w-full">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="dateOfBirth"
                type="date"
                className="pl-10 w-full"
                onChange={(e) => setDOB(e.target.value)}
                value={dob}
              />
            </div>
          </div>

          {/* Current Pocket Money */}
          <div className="space-y-2 w-full">
            <Label>Current Pocket Money</Label>
            <div className="flex items-center space-x-2 cursor-not-allowed h-9 bg-gray-100 p-2 rounded">
              <IndianRupee className="text-gray-400 h-4 w-4" />
              <span>{user?.currentPocketMoney || 0}</span>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <Collapsible
          open={isPasswordCollapsibleOpen}
          onOpenChange={setIsPasswordCollapsibleOpen}
        >
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
                placeholder="Current Password"
              />
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="New Password"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Instagram */}
          <div className="space-y-2 w-full">
            <Label htmlFor="instagramProfile">Instagram</Label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="instagramProfile"
                type="text"
                placeholder="Instagram"
                className="pl-10 w-full"
                onChange={(e) => setInstagramLink(e.target.value)}
                value={instagramLink}
              />
            </div>
          </div>

          {/* Facebook */}
          <div className="space-y-2 w-full">
            <Label htmlFor="facebookProfile">Facebook</Label>
            <div className="relative">
              <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="facebookProfile"
                type="text"
                placeholder="Facebook"
                className="pl-10 w-full"
                onChange={(e) => setFacebookLink(e.target.value)}
                value={facebookLink}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          disabled={isUserUpdating}
          onClick={handleSaveChanges}
          className="w-full"
        >
          {isUserUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <Save
                className={`mr-2 h-4 w-4 ${isUserUpdating ? 'cursor-not-allowed' : 'cursor-pointer'} `}
              />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
