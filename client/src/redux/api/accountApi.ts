import { baseApi } from "./baseApi";
const BaseUrl = "/account";

export const accountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAccount: build.mutation({
      query: (data) => ({
        url: `${BaseUrl}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['account']
    }),
    updateAccount: build.mutation({
      query: (data) => ({
        url: `${BaseUrl}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['account']
    }),
    singleAccount: build.query({
      query: (id) => ({
        url: `${BaseUrl}/${Number(id)}`,
        method: "GET",
      }),
    }),
    accountList: build.query({
      query: () => ({
        url: `${BaseUrl}/list`,
        method: "GET",
      }),
      providesTags: ['account']
    }),
  }),
});

export const { useCreateAccountMutation, useAccountListQuery,useUpdateAccountMutation,useSingleAccountQuery } = accountApi;
