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
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const [isPasswordCollapsibleOpen, setIsPasswordCollapsibleOpen] =
    useState<boolean>(false);

  // Assuming you have the user data in your redux store
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>(
    'https://i.ibb.co/cDvPNm5/360-F-864477167-q-Srg-Ao5j-QHc-PYacblj-ZXu-FPVHy-Q9-QOln.webp'
  );
  // const [dob, setDOB] = useState<Date>(new Date());
  const [facebookURL, setFacebookURL] = useState<string>('');
  const [instagramURL, setInstagramURL] = useState<string>('');
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const { name, username, email, avatar } = user;
    setName(name);
    setUsername(username);
    setEmail(email);
    setProfileImage(avatar);
  }, [user]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.success('Feature is Pending!!');
  };

  return (
    <div className="add_expense_container flex flex-col items-center gap-4 bg-[#FFFEFE] rounded-md max-w-4xl w-full px-4 py-5 sm:p-7 shadow-sm">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
          <AvatarImage src={profileImage} alt="Profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          size="sm"
          className="w-40 bg-transparent hover:bg-[##f1f5f9] relative overflow-hidden"
        >
          <Camera className="mr-2 h-4 w-4 cursor-pointer" />
          <span className="cursor-pointer">Change Image</span>
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
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                placeholder="Username"
                className="pl-10 w-full"
                value={username}
              />
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
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Email"
                className="pl-10 w-full"
                value={email}
              />
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
                // onChange={(e) => setDOB(e.target.value)}
                // value={dob}
              />
            </div>
          </div>

          {/* Current Pocket Money */}
          <div className="space-y-2 w-full">
            <Label>Current Pocket Money</Label>
            <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
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
              <Input type="password" placeholder="Current Password" />
              <Input type="password" placeholder="New Password" />
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
                onChange={(e) => setInstagramURL(e.target.value)}
                value={instagramURL}
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
                onChange={(e) => setFacebookURL(e.target.value)}
                value={facebookURL}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSaveChanges} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
