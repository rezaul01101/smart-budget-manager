import { storeAccessToken } from "../../utils/token";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["ledger", "transaction"],
    }),
    userLogout: build.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST", 
        credentials: "include", 
      }),
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    verifyOtp: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/otp-verify`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    updatePassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/update-password`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"],
    }),
    userRegister: build.mutation({
      query: (registerData) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: registerData,
      }),
    }),
    refreshToken: build.mutation({
      query: () => ({
        url: `${AUTH_URL}/refresh-token`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["user"],
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        storeAccessToken(data.data.accessToken);
      },
    }),
  }),
});

export const {
  useUserLoginMutation,
  useRefreshTokenMutation,
  useUserLogoutMutation,
  useUserRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useUpdatePasswordMutation
} = authApi;
