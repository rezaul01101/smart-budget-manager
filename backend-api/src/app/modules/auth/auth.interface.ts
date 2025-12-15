export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type IUserOtpCheck = {
  email: string;
  otp: string;
};
export type UpdatePassword = {
  email: string;
  otp: string;
  password:string;
};
