import axios from 'axios';
import {
  AddLentMoneyResType,
  AllLentMoneyResType,
  ReceivedLentMoneyResType,
} from '@/types/api/lentmoney/lentmoney';
import {
  LentMoneyCredType,
  ReceivedLentMoneyCredType,
} from '@/types/api/lentmoney/credentials';
import { apiURL } from '@/lib/http';

//✅ ADD LENT MONEY
export const addLentMoney = async (
  credentials: LentMoneyCredType
): Promise<AddLentMoneyResType> => {
  const { data } = await apiURL.post<AddLentMoneyResType>(
    `/user/add-lent-money`,
    credentials
  );
  return data;
};

//✅ UPDATE RECEIVED MONEY FROM LENT PERSON
export const updateReceivedLentMoney = async (
  credentials: ReceivedLentMoneyCredType
): Promise<ReceivedLentMoneyResType> => {
  const { data } = await apiURL.post<ReceivedLentMoneyResType>(
    `/user/received-lent-money`,
    credentials
  );
  return data;
};

//✅ SHOW-ALL LENT MONEY
export const getUserAllLentMoney = async (): Promise<AllLentMoneyResType> => {
  const { data } = await axios.get<AllLentMoneyResType>(
    `/user/get-all-lent-money`
  );
  return data;
};
