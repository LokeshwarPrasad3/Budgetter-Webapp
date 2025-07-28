// services/auth.ts
import Cookies from 'universal-cookie';
const cookie = new Cookies();
import {
  ChangeAvatarResType,
  ContactFormResType,
  DeleteUserResType,
  PocketMoneyResType,
  ResetPasswordResType,
  SendPassResetLinkResType,
  UpdateUserDetailsResType,
  UserAccountVerifiedResType,
  UserDetailsResType,
  UserLogoutResType,
} from '@/types/api/auth/auth';
import {
  AddPocketMoneyCredentialType,
  contactFormCredentialsType,
  DeleteUserCredType,
  LoginCredentialsType,
  RegisterCredentialsType,
  ResetPasswordCredType,
  SendResetLinkCredType,
  SignupGoogleCredentialsType,
  UpdateUserDetailsCredType,
} from '@/types/api/auth/credentials';
import { apiURL } from '@/lib/http';
import axios, { AxiosRequestConfig } from 'axios';
import { backendHostURL, contactFormServerHostURL } from './api';
import { getCurrentAccessToken } from '@/utils/cookie/CookiesInfo';

// For User Registration through email password form
export const registerUser = async (
  credentials: RegisterCredentialsType
): Promise<UserDetailsResType> => {
  const { data } = await apiURL.post<UserDetailsResType>(
    `/user/register`,
    credentials
  );
  return data;
};

// For User Login through email password form
export const LoginUser = async (
  credentials: LoginCredentialsType
): Promise<UserDetailsResType> => {
  const { data } = await apiURL.post<UserDetailsResType>(
    `/user/login`,
    credentials
  );
  return data;
};

// Signup with google authentication
export const SignupWithGoogle = async (
  credentials: SignupGoogleCredentialsType
): Promise<UserDetailsResType> => {
  const { data } = await apiURL.post<UserDetailsResType>(
    `/user/google-login`,
    credentials
  );
  return data;
};

// Getting current user details
export const getCurrentUser = async (): Promise<UserDetailsResType> => {
  const token = cookie.get('accessToken');
  if (!token) {
    throw new Error('Access token is missing. Please log in.');
  }
  const { data } = await apiURL.get<UserDetailsResType>('/user/get-user-data');
  return data;
};

// Add Pocket Money to User Account
export const AddUserPocketMoney = async (
  credentials: AddPocketMoneyCredentialType
): Promise<PocketMoneyResType> => {
  const { data } = await apiURL.post<PocketMoneyResType>(
    '/user/add-money',
    credentials
  );
  return data;
};

// User Logout
export const UserLogout = async (): Promise<UserLogoutResType> => {
  const { data } = await apiURL.get<UserLogoutResType>('/user/logout');
  return data;
};

// Change User Avatar
export const changeUserAvatar = async (
  formData: FormData
): Promise<ChangeAvatarResType> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${getCurrentAccessToken()}`,
    },
  };
  const { data } = await axios.post<ChangeAvatarResType>(
    `${backendHostURL}/user/change-avatar`,
    formData,
    config
  );
  return data;
};

// Send Reset Password Link to User Email
export const SendResetLinkToUserEmail = async (
  credentials: SendResetLinkCredType
): Promise<SendPassResetLinkResType> => {
  const { data } = await apiURL.post<SendPassResetLinkResType>(
    `/user/send-reset-link`,
    credentials
  );
  return data;
};

// Reset User Password
export const ResetUserPassword = async (
  credentials: ResetPasswordCredType
): Promise<ResetPasswordResType> => {
  const { data } = await apiURL.patch<ResetPasswordResType>(
    `/user/reset-password`,
    credentials
  );
  return data;
};

// Check if User Account is Verified
export const CheckUserAccountVerified =
  async (): Promise<UserAccountVerifiedResType> => {
    const { data } = await apiURL.get<UserAccountVerifiedResType>(
      `/user/is-user-verified`
    );
    return data;
  };

// Update User Details
export const updatedUserDetails = async (
  credentials: UpdateUserDetailsCredType
): Promise<UpdateUserDetailsResType> => {
  const { data } = await apiURL.patch<UpdateUserDetailsResType>(
    `/user/change-user-details`,
    credentials
  );
  return data;
};

// Delete User Account
export const deleteUserAccount = async (
  credentials: DeleteUserCredType
): Promise<DeleteUserResType> => {
  const { data } = await apiURL.delete<DeleteUserResType>(
    '/user/delete-account',
    {
      data: credentials,
    }
  );

  return data;
};

// Send contact form message
export const submitContactForm = async (
  credentials: contactFormCredentialsType
): Promise<ContactFormResType> => {
  const { data } = await axios.post<ContactFormResType>(
    contactFormServerHostURL,
    credentials
  );
  return data;
};