import React from 'react';
import { useSelector } from 'react-redux';
import UserCard from './Cards/UserCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { GetAppUsersDetails } from '@/services/adminAccess';

const AppUsersCards: React.FC = () => {
  // current loggedin user
  const user = useSelector((state: any) => state.user.user);

  // get all app users
  const { data } = useQuery({
    queryKey: ['appusers'],
    queryFn: () => GetAppUsersDetails(),
  });

  return (
    <>
      <div className="dashboard_page_ flex flex-col justify-start items-start w-full gap-5">
        <div className="heading_dashboard_page flex justify-start items-start w-full">
          <h3 className="font-semibold text-lg text-left">
            {user && user?.name && (
              <>
                {' '}
                <span className="font-bold text-orange-800">
                  Welcome! {user.name} [Admin]
                </span>
              </>
            )}{' '}
          </h3>
        </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 w-full shadow-none border-cyan-300"
            />
          </div>
        <div className="users_cards_container user_cards_section w-full rounded-md grid grid-cols-12 gap-6 h-full">
          {data?.data?.map((user, index) => (
            <React.Fragment key={index}>
              <UserCard user={user} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppUsersCards;
