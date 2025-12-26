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
      invalidatesTags: ["ledger"],
    }),
    transactionList: build.query({
      query: (query: string) => ({
        url: `${BaseUrl}/list${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateTransactionMutation, useTransactionListQuery } = transactionApi;
