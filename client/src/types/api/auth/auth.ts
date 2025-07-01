export interface UserDetailsResType {
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
    accessToken: string;
    createdAt: string;
    lastLogin: Date;
    updatedAt: string;
    __v: number;
  };
  message: string;
  success: boolean;
}

export interface PocketMoneyResType {
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

export interface UserLogoutResType {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
}

export interface ChangeAvatarResType {
  statusCode: number;
  data: {
    avatar: string;
  };
  message: string;
  success: boolean;
}

export interface SendPassResetLinkResType {
  statusCode: number;
  data: string;
  message: string;
  success: boolean;
}

export interface ResetPasswordResType {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
}

export interface UserAccountVerifiedResType {
  statusCode: number;
  data: boolean;
  message: string;
  success: boolean;
}

export interface UpdateUserDetailsResType {
  statusCode: number;
  data: string;
  message: string;
  success: boolean;
}

export interface DeleteUserResType {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
}
