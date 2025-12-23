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
    }),
    LedgerList: build.query({
      query: () => ({
        url: `${BaseUrl}/list`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateLedgerMutation, useLedgerListQuery } = ledgerApi;
