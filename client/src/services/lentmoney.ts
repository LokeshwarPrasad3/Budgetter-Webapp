import axios, { AxiosRequestConfig } from 'axios';
import { backendHostURL } from './api';
import { getCurrentAccessToken } from '@/utils/cookie/CookiesInfo';

//✅ ADD LENT MONEY
interface AddLentMoneyResTypes {
  statusCode: number;
  data: {
    TotalLentMoney: number;
    currentPocketMoney: number;
  };
  message: string;
  success: boolean;
}
interface LentMoneyCredentialsType {
  personName: string;
  date: string;
  price: number;
}

export const addLentMoney = async (
  credentials: LentMoneyCredentialsType
): Promise<AddLentMoneyResTypes> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.post<AddLentMoneyResTypes>(
    `${backendHostURL}/user/add-lent-money`,
    credentials,
    config
  );
  return data;
};

//✅ UPDATE RECEIVED MONEY FROM LENT PERSON
interface ReceivedLentMoneyRes {
  statusCode: number;
  data: {
    currentPocketMoney: number;
  };
  message: string;
  success: boolean;
}
interface ReceivedLentMoneyCredType {
  lentMoneyId: string;
}
export const updateReceivedLentMoney = async (
  credentials: ReceivedLentMoneyCredType
): Promise<ReceivedLentMoneyRes> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.post<ReceivedLentMoneyRes>(
    `${backendHostURL}/user/received-lent-money`,
    credentials,
    config
  );
  return data;
};

//✅ SHOW-ALL LENT MONEY
interface AllLentMoneyRes {
  statusCode: number;
  data: {
    LentMoneyHistory: [
      {
        _id: string;
        personName: string;
        price: string;
        date: string;
        createdAt: string;
        updatedAt: string;
      },
    ];
  };
  message: string;
  success: boolean;
}
export const getUserAllLentMoney = async (): Promise<AllLentMoneyRes> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.get<AllLentMoneyRes>(
    `${backendHostURL}/user/get-all-lent-money`,
    config
  );
  return data;
};
