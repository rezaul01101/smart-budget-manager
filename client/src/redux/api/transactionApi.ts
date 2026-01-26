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
      invalidatesTags: ["ledger",'transaction','account'],
    }),
    updateTransaction: build.mutation({
      query: (data) => ({
        url: `${BaseUrl}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ledger",'transaction','account'],
    }),
    transactionList: build.query({
      query: (query?: string) => ({
        url: `${BaseUrl}/list${query}`,
        method: "GET",
      }),
      providesTags: ["transaction"],
    }),
    deleteTransaction: build.mutation({
      query: (id: number) => ({
        url: `${BaseUrl}/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ledger", "transaction", "account"],
    }),
  }),
});

export const { useCreateTransactionMutation, useTransactionListQuery,useDeleteTransactionMutation } = transactionApi;
