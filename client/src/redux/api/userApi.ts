import { baseApi } from "./baseApi";
const BaseUrl = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    passwordReset: build.mutation({
      query: (data) => ({
        url: `${BaseUrl}/reset-password`,
        method: "POST",
        body: data,
      })
    }),
  }),
});

export const { usePasswordResetMutation } = userApi;
