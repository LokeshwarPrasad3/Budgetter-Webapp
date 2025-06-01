import { getCurrentAccessToken } from '@/utils/cookie/CookiesInfo';
import axios, { AxiosRequestConfig } from 'axios';
import { backendHostURL } from './api';

// Get all app users
type User = {
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
interface AppUsersRes {
  statusCode: number;
  data: [User];
  message: string;
  success: boolean;
}

export const GetAppUsersDetails = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.get<AppUsersRes>(
    `${backendHostURL}/user/get-all-users`,
    config
  );
  return data;
};

// Send newsletter to all users
interface NewsletterRes {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
}
interface NewsletterCredType {
  emails: string[];
  subject: string;
  html: string;
}
export const SendNewsletter = async (credentials: NewsletterCredType) => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.post<NewsletterRes>(
    `${backendHostURL}/user/send-newsletter`,
    credentials,
    config
  );
  return data;
};