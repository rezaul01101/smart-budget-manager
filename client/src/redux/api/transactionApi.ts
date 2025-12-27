import { baseApi } from "./baseApi";
const BaseUrl = "/transaction";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTransaction: build.mutation({
      query: (data) => ({
        url: `${BaseUrl}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ledger",'transaction'],
    }),
    updateTransaction: build.mutation({
      query: (data) => ({
        url: `${BaseUrl}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ledger",'transaction'],
    }),
    transactionList: build.query({
      query: (query?: string) => ({
        url: `${BaseUrl}/list${query}`,
        method: "GET",
      }),
      providesTags: ["transaction"],
    }),
  }),
});

export const { useCreateTransactionMutation, useTransactionListQuery } = transactionApi;
