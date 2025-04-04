import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Eye } from 'lucide-react';

interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  dateOfBirth: string;
  profession: string;
  instagramLink: string;
  facebookLink: string;
  currentPocketMoney: string;
  isVerified: boolean;
  LentMoneyHistory: any[];
  PocketMoneyHistory: any[];
  createdAt: string;
  updatedAt: string;
}

const IndividualUserDetails = ({ user }: { user: User }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          className="w-full mt-2 py-3 max-w-fit bg-gradient-to-r opacity-80 from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none"
        >
          <Eye className="w-5 h-5 mr-2" />
          Full Details
        </Button>
      </SheetTrigger>
      <SheetContent className="max-h-dvh overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">User Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold word_break">
                {user?.name || 'NA'}
              </h2>
              <p className="text-gray-500 dark:text-white word_break">
                @{user?.username || 'NA'}
              </p>
            </div>
          </div>

          {/* Main Info */}
          <div className="space-y-4 border-t pt-4">
            <div>
              <p className="text-gray-500 dark:text-white">Email</p>
              <p>{user?.email || 'NA'}</p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-white">Date of Birth</p>
              <p>{user?.dateOfBirth || 'NA'}</p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-white">Profession</p>
              <p>{user?.profession || 'NA'}</p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-white">
                Current Pocket Money
              </p>
              <p className="text-lg font-semibold">
                ₹{user?.currentPocketMoney || 'NA'}
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-white">Status</p>
              <p>{user?.isVerified ? 'Verified User' : 'Not Verified'}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t pt-4">
            <p className="text-gray-500 dark:text-white mb-2">Social Media</p>
            <div className="space-y-2">
              {user?.instagramLink ? (
                <a
                  href={user?.instagramLink}
                  className="block text-blue-600 hover:underline"
                >
                  Instagram Profile
                </a>
              ) : (
                <p className="text-gray-500 dark:text-white">NA</p>
              )}
              {user?.facebookLink ? (
                <a
                  href={user?.facebookLink}
                  className="block text-blue-600 hover:underline"
                >
                  Facebook Profile
                </a>
              ) : (
                <p className="text-gray-500 dark:text-white">NA</p>
              )}
            </div>
          </div>

          {/* History */}
          <div className="border-t pt-4">
            <p className="text-gray-500 dark:text-white mb-2">
              PocketMoney History
            </p>
            {user?.PocketMoneyHistory.length > 0 ? (
              <div className="space-y-2">
                {user?.PocketMoneyHistory?.map(
                  ({ date, amount, source }, index) => (
                    <div key={index} className="border p-2 rounded">
                      {date} - {source} - (₹{amount})
                    </div>
                  )
                )}
              </div>
            ) : (
              <p>No transaction history</p>
            )}
          </div>

          {/* Dates */}
          <div className="border-t pt-4 text-sm text-gray-500 dark:text-white">
            <p>
              Member since:{' '}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-GB')
                : 'NA'}
            </p>
            <p>
              Last updated:{' '}
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString('en-GB')
                : 'NA'}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default IndividualUserDetails;
