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
      query: ({id, ...data}) => ({
        url: `${BaseUrl}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['account', 'transaction']
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
    deleteAccount: build.mutation({
      query: (id) => ({
        url: `${BaseUrl}/${Number(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: ['account', 'transaction']
    }),
  }),
});

export const { useCreateAccountMutation, useAccountListQuery,useUpdateAccountMutation,useSingleAccountQuery,useDeleteAccountMutation, } = accountApi;
