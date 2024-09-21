// services/auth.ts
import axios, { AxiosRequestConfig } from 'axios';

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
  };

  const { data } = await axios.post<RegisterUserResponseType>(
    'http://localhost:5000/api/user/register',
    credentials,
    config
  );
  return data;
};
