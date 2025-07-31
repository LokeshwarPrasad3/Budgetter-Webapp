export type User = {
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
export interface AppUsersResType {
  statusCode: number;
  data: [User];
  message: string;
  success: boolean;
}

export interface NewsletterResType {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
}
