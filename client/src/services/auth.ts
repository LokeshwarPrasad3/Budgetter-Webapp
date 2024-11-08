// services/auth.ts
import axios, { AxiosRequestConfig } from 'axios';
import { backendHostURL } from './api';
import Cookies from 'universal-cookie';
import { getCurrentAccessToken } from '@/utils/cookie/CookiesInfo';
const cookie = new Cookies();

// For User Registration
export interface RegisterCredentialsType {
  username: string;
  name: string;
  email: string;
  password: string;
}
export interface RegisterUserResponseType {
  statusCode: number;
  data: {
    _id: string;
    username: string;
    name: string;
    email: string;
    avatar: string;
    currentPocketMoney: string;
    isVerified: boolean;
    profession: string;
    dob: string;
    instagramLink: string;
    facebookLink: string;
    PocketMoneyHistory: [];
    accessToken: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  message: string;
  success: boolean;
}
export const registerUser = async (
  credentials: RegisterCredentialsType
): Promise<RegisterUserResponseType> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };

  const { data } = await axios.post<RegisterUserResponseType>(
    `${backendHostURL}/user/register`,
    credentials,
    config
  );
  return data;
};

// For User Login
export interface LoginCredentialsType {
  username: string;
  email: string;
  password: string;
}
export interface LoginUserResponseType {
  statusCode: number;
  data: {
    _id: string;
    username: string;
    name: string;
    email: string;
    avatar: string;
    currentPocketMoney: string;
        profession: string;
    dob: string;
    instagramLink: string;
    facebookLink: string;
    isVerified: boolean;
    accessToken: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    PocketMoneyHistory: [
      {
        date: string;
        amount: string;
        source: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
      },
    ];
  };
  message: string;
  success: boolean;
}
export const LoginUser = async (
  credentials: LoginCredentialsType
): Promise<LoginUserResponseType> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.post<LoginUserResponseType>(
    `${backendHostURL}/user/login`,
    credentials,
    config
  );
  return data;
};

// getting data by accesstoken
interface userDetailsType {
  statusCode: number;
  data: {
    _id: string;
    username: string;
    name: string;
    email: string;
    avatar: string;
    currentPocketMoney: string;
        profession: string;
    dob: string;
    instagramLink: string;
    facebookLink: string;
    accessToken: string;
    isVerified: boolean;
    PocketMoneyHistory: [
      {
        date: string;
        amount: string;
        source: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
      },
    ];
  } | null;
  message: string;
  success: boolean;
}
export const getCurrentUser = async (): Promise<userDetailsType> => {
  const token = cookie.get('accessToken');
  if (!token) {
    return {
      statusCode: 404,
      data: null,
      message: 'Access token is missing. Please log in.',
      success: false,
    };
  }
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.get<userDetailsType>(
    `${backendHostURL}/user/get-user-data`,
    config
  );
  return data;
};

// add your pocket money
interface AddedPocketMoneyRes {
  statusCode: number;
  data: {
    PocketMoneyHistory: [
      {
        date: string;
        amount: string;
        source: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
      },
    ];
    currentPocketMoney: string;
  };
  message: string;
  success: boolean;
}
interface AddPocketMoneyCredentialType {
  date: string;
  amount: string;
  source: string;
}
export const AddUserPocketMoney = async (
  credentials: AddPocketMoneyCredentialType
): Promise<AddedPocketMoneyRes> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.post<AddedPocketMoneyRes>(
    `${backendHostURL}/user/add-money`,
    credentials,
    config
  );
  return data;
};

// User Logout
interface UserLogoutRes {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
}
export const UserLogout = async (): Promise<UserLogoutRes> => {
  const token = getCurrentAccessToken();
  if (!token) {
    return {
      statusCode: 401,
      data: null,
      message: 'No token provided, logout failed.',
      success: false,
    };
  }
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.get<UserLogoutRes>(
    `${backendHostURL}/user/logout`,
    config
  );
  return data;
};

// change avatar
interface ChangeAvatarRes {
  statusCode: number;
  data: {
    avatar: string;
  };
  message: string;
  success: boolean;
}
export const changeUserAvatar = async (
  formData: FormData
): Promise<ChangeAvatarRes> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.post<ChangeAvatarRes>(
    `${backendHostURL}/user/change-avatar`,
    formData,
    config
  );
  return data;
};

// Send reset link for forgot account
interface SendResetLinkResType {
  statusCode: number;
  data: string;
  message: string;
  success: boolean;
}
interface SendResetLinkCredType {
  email: string;
}
export const SendResetLinkToUserEmail = async (
  credentials: SendResetLinkCredType
): Promise<SendResetLinkResType> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axios.post<SendResetLinkResType>(
    `${backendHostURL}/user/send-reset-link`,
    credentials,
    config
  );
  return data;
};

// Get User by their ID
interface ResetPasswordResType {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
}
interface ResetPasswordCredType {
  userId: string;
  newPassword: string;
}
export const ResetUserPassword = async (
  credentials: ResetPasswordCredType
): Promise<ResetPasswordResType> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(credentials);
  const { data } = await axios.patch<ResetPasswordResType>(
    `${backendHostURL}/user/reset-password`,
    credentials,
    config
  );
  return data;
};

// Get User account verified or not
interface UserAccountVerifiedResType {
  statusCode: number;
  data: boolean;
  message: string;
  success: boolean;
}
export const CheckUserAccountVerified = async (): Promise<UserAccountVerifiedResType> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.get<UserAccountVerifiedResType>(
    `${backendHostURL}/user/is-user-verified`,
    config
  );
  return data;
}; 

// Change User Details
interface UpdateUserDetailsRes {
  statusCode: number;
  data: string ;
  message: string;
  success: boolean;
}
interface UpdateUserDetailsCredType {
  name: string;
  dob: string;
  currentPassword: string;
  newPassword: string;
  instagramLink: string;
  facebookLink: string;
  profession: string;
}
export const updatedUserDetails = async (
  credentials: UpdateUserDetailsCredType
): Promise<UpdateUserDetailsRes> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.patch<UpdateUserDetailsRes>(
    `${backendHostURL}/user/change-user-details`,
    credentials,
    config
  );
  return data;
};
