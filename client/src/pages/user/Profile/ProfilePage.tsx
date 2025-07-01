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
  Settings2,
  Clock,
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
import DeleteAccountDialog from './DeleteAccountDIalog';
import SpinWheel from '@/components/layout/SpinWheel';

const ProfilePage: React.FC = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isPasswordCollapsibleOpen, setIsPasswordCollapsibleOpen] =
    useState<boolean>(false);
  const [isAdvanceOptionOpen, setIsAdvanceOptionOpen] =
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
  const [memberSince, setMemberSince] = useState<string>('');
  const [lastLogin, setLastLogin] = useState<Date>(new Date());
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
      createdAt,
      lastLogin,
    } = user;
    setName(name);
    setUsername(username);
    setEmail(email);
    setProfileImage(avatar);
    setProfession(profession);
    setDOB(dob);
    setInstagramLink(instagramLink);
    setFacebookLink(facebookLink);
    setMemberSince(createdAt);
    setLastLogin(lastLogin);
    console.log('laste login is ', lastLogin);
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
    <div className="profile_page_ page_height_without_header flex h-full w-full flex-col items-start justify-start gap-4">
      <div className="heading_dashboard_page flex w-full items-start justify-start">
        <h3 className="text-left text-lg font-semibold">
          <span className="font-bold text-text_heading_light dark:text-text_primary_dark">
            Welcome! {name}
          </span>
        </h3>
      </div>
      <div className="profile_content_container col-span-12 grid h-full w-full max-w-full grid-cols-12 gap-4 rounded-md">
        <div className="col-span-12 flex h-full flex-col items-center justify-between space-y-4 rounded-lg bg-bg_primary_light p-6 shadow-sm dark:bg-bg_primary_dark lg:col-span-4 lg:p-7">
          <div className="basic_user_profile_details flex flex-col items-center space-y-4 shadow-sm">
            <Avatar className="h-24 w-24 shadow-sm sm:h-32 sm:w-32">
              <AvatarImage src={profileImage} alt="Profile" />
              <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              disabled={isPending}
              className="relative w-40 overflow-hidden bg-transparent hover:bg-[##f1f5f9]"
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
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Button>
          </div>
          <div className="information_details_user rounded-lg space-y-1 w-fit flex flex-col justify-center items-start">
            {/* member since */}
            {memberSince && (
              <div className="flex items-center gap-3 justify-between rounded-md bg-white shadow-sm dark:bg-bg_primary_dark">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-blue-100/50 p-2 dark:bg-blue-900/20">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Member Since</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                  {new Date(memberSince).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}
            {/* last active date */}
            {lastLogin && (
              <div className="flex items-center gap-3 justify-between rounded-md shadow-sm ">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100/50 p-2 dark:bg-green-900/20">
                    <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Active</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                  {new Date(lastLogin).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>
          <SpinWheel />
          <div className="advance_option_container">
            {/* delete account */}
            <Collapsible
              open={isAdvanceOptionOpen}
              onOpenChange={setIsAdvanceOptionOpen}
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Advance Options
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-2">
                <div className="grid grid-cols-1 gap-4">
                  <DeleteAccountDialog />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        <div className="col-span-12 flex h-full w-full flex-col space-y-6 rounded-lg bg-bg_primary_light p-6 shadow-sm dark:bg-bg_primary_dark lg:col-span-8 lg:p-7 lg:pb-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            {/* Username */}
            <div className="w-full space-y-2">
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
              <div className="flex h-9 cursor-not-allowed items-center space-x-2 rounded bg-gray-100 p-2 dark:bg-bg_secondary_dark">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{username}</span>
              </div>
            </div>

            {/* Full Name */}
            <div className="w-full space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  onChange={(e) => setName(e.target.value)}
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10"
                  value={name}
                />
              </div>
            </div>

            {/* Email */}
            <div className="w-full space-y-2">
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
              <div className="flex h-9 cursor-not-allowed items-center space-x-2 rounded bg-gray-100 p-2 dark:bg-bg_secondary_dark">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{email}</span>
              </div>
            </div>

            {/* Profession */}
            <div className="w-full space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="profession"
                  type="text"
                  placeholder="Profession"
                  className="w-full pl-10"
                  onChange={(e) => setProfession(e.target.value)}
                  value={profession}
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="w-full space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  className="w-full pl-10"
                  onChange={(e) => setDOB(e.target.value)}
                  value={dob}
                />
              </div>
            </div>

            {/* Current Pocket Money */}
            <div className="w-full space-y-2">
              <Label>Current Pocket Money</Label>
              <div className="flex h-9 cursor-not-allowed items-center space-x-2 rounded bg-gray-100 p-2 dark:bg-bg_secondary_dark">
                <IndianRupee className="h-4 w-4 text-gray-400" />
                <span>{user?.currentPocketMoney || 0}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Instagram */}
            <div className="w-full space-y-2">
              <Label htmlFor="instagramProfile">Instagram</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="instagramProfile"
                  type="text"
                  placeholder="Instagram"
                  className="w-full pl-10"
                  onChange={(e) => setInstagramLink(e.target.value)}
                  value={instagramLink}
                />
              </div>
            </div>

            {/* Facebook */}
            <div className="w-full space-y-2">
              <Label htmlFor="facebookProfile">Facebook</Label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="facebookProfile"
                  type="text"
                  placeholder="Facebook"
                  className="w-full pl-10"
                  onChange={(e) => setFacebookLink(e.target.value)}
                  value={facebookLink}
                />
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
            <CollapsibleContent className="mt-2 space-y-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

          {/* Save Button */}
          <div className="button-container flex w-full items-end justify-end">
            <Button
              disabled={isUserUpdating}
              onClick={handleSaveChanges}
              className="mt-2 w-36 bg-[#289288] hover:bg-[#289288]/90"
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
      </div>
    </div>
  );
};

export default ProfilePage;
