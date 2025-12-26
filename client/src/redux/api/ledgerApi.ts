import { baseApi } from "./baseApi";
const BaseUrl = "/ledger";

export const ledgerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLedger: build.mutation({
      query: (data) => ({
        url: `${BaseUrl}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ledger"],
    }),
    LedgerList: build.query({
      query: (type) => ({
        url: `${BaseUrl}/list?type=${type}`,
        method: "GET",
      }),
      providesTags: ["ledger"],
    }),
  }),
});

export const { useCreateLedgerMutation, useLedgerListQuery } = ledgerApi;
