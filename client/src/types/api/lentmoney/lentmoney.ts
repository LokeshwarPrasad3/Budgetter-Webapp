export interface LentMoneyItem {
  _id: string;
  personName: string;
  price: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddLentMoneyResType {
  statusCode: number;
  data: {
    TotalLentMoney: number;
    currentPocketMoney: number;
  };
  message: string;
  success: boolean;
}

export interface ReceivedLentMoneyResType {
  statusCode: number;
  data: {
    currentPocketMoney: number;
  };
  message: string;
  success: boolean;
}

export interface AllLentMoneyResType {
  statusCode: number;
  data: {
    LentMoneyHistory: LentMoneyItem[];
  };
  message: string;
  success: boolean;
}
