export interface RegisterCredentialsType {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentialsType {
  username: string;
  email: string;
  password: string;
}

export interface SignupGoogleCredentialsType {
  token: string;
}

export interface AddPocketMoneyCredentialType {
  date: string;
  amount: string;
  source: string;
}

export interface SendResetLinkCredType {
  email: string;
}

export interface ResetPasswordCredType {
  userId: string;
  newPassword: string;
}

export interface DeleteUserCredType {
  password: string;
}

export interface UpdateUserDetailsCredType {
  name: string;
  dob: string;
  currentPassword: string;
  newPassword: string;
  instagramLink: string;
  facebookLink: string;
  profession: string;
}

export interface contactFormCredentialsType {
  name: string;
  email: string;
  message: string;
}
