import IndividualUserDetails from '../IndividualUserDetails';

interface UserCardProps {
  user: {
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
    LentMoneyHistory: [];
    PocketMoneyHistory: [];
    createdAt: string;
    updatedAt: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const {
    avatar,
    username,
    name,
    email,
    currentPocketMoney,
    isVerified,
    LentMoneyHistory,
  } = user;

  return (
    <div className="user_card_container col-span-12 md:col-span-12 lg:col-span-6 2xl:col-span-3 rounded-2xl flex flex-col items-center gap-2 p-5 bg-white dark:bg-bg_secondary_dark dark:border border-[#6a718533]">
      <div className="user_detail flex flex-col gap-3 justify-center items-center">
        <div className="user_profiles relative inline-block rounded-full bg-gradient-to-br from-theme-default to-transparent p-[2px]">
          <div className="relative rounded-full dark:bg-[#262932] bg-white p-[5px]">
            <img
              alt="User's profile"
              loading="lazy"
              width="68"
              height="68"
              decoding="async"
              className="h-[68px] rounded-full"
              src={avatar || 'https://i.ibb.co/ymqwMZ2N/Rri-Zq-Bv-400x400.jpg'}
              crossOrigin="anonymous"
              style={{ color: 'transparent' }}
            />
          </div>
        </div>
        <div className="details flex flex-col items-center gap-0">
          <span className="text-sm font-medium text-black ">@{username}</span>
          <span className="font-medium text-sm text-[#3A3A3A]">{name}</span>
          <span className="text-sm dark:font-medium text-[#3A3A3A]">
            {email}
          </span>
        </div>
      </div>
      <ul className="flex items-center justify-center ">
        <li className="flex flex-col items-center px-4 py-0 relative gap-0">
          <h5 className="text-base dark:text-[#888888] font-semibold">
            {currentPocketMoney}
          </h5>
          <span className="text-sm font-medium text-[#888888] text-center flex flex-col leading-4 justify-center items-center">
            <span>Pocket</span>
            <span>Money</span>
          </span>
          <div className="absolute right-0 top-2/4 h-5 w-px -translate-y-1/2 dark:bg-[#504e4e] bg-gray-300"></div>
        </li>
        <li className="flex flex-col items-center px-4 py-0 relative gap-0">
          <h5 className="text-base dark:text-[#888888] font-semibold">
            {Number(isVerified)}
          </h5>
          <span className="text-sm font-medium text-[#888888] text-center flex flex-col leading-4 justify-center items-center">
            <span>Verified</span>
            <span>User</span>
          </span>
          <div className="absolute right-0 top-2/4 h-5 w-px -translate-y-1/2 dark:bg-[#504e4e] bg-gray-300"></div>
        </li>
        <li className="flex flex-col items-center px-4 py-0 gap-0">
          <h5 className="text-base dark:text-[#888888] font-semibold">
            {LentMoneyHistory.length}
          </h5>
          <span className="text-sm font-medium text-[#888888] text-center flex flex-col leading-4 justify-center items-center">
            <span>Total</span>
            <span>Lent</span>
          </span>
        </li>
      </ul>
      <IndividualUserDetails user={user} />
      
    </div>
  );
};

export default UserCard;
