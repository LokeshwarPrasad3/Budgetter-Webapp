// services/auth.ts
import axios, { AxiosRequestConfig } from 'axios';

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
    PocketMoneyHistory: [];
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
    },
    withCredentials: true,
  };

  const { data } = await axios.post<RegisterUserResponseType>(
    'http://localhost:5000/api/user/register',
    credentials,
    config
  );
  return data;
};

// For User Login
export interface LoginCredentialsType {
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
    isVerified: boolean;
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
    },
    withCredentials: true,
  };
  const { data } = await axios.post<LoginUserResponseType>(
    'http://localhost:5000/api/user/login',
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
export const getCurrentUser = async (): Promise<userDetailsType> => {
  const config: AxiosRequestConfig = {
    withCredentials: true,
  };
  const { data } = await axios.get<userDetailsType>(
    'http://localhost:5000/api/user/get-user-data',
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
    },
    withCredentials: true,
  };
  const { data } = await axios.post<AddedPocketMoneyRes>(
    'http://localhost:5000/api/user/add-money',
    credentials,
    config
  );
  return data;
};
