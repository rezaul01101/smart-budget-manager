import { baseApi } from "./baseApi";
const BaseUrl = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    passwordReset: build.mutation({
      query: (data) => ({
        url: `${BaseUrl}/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${BaseUrl}/update-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { usePasswordResetMutation, useUpdateProfileMutation } = userApi;
