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
    updateLedger: build.mutation({
      query: (data) => ({
        url: `${BaseUrl}/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ledger"],
    }),
    LedgerList: build.query({
      query: (query) => ({
        url: `${BaseUrl}/list?${query}`,
        method: "GET",
      }),
      providesTags: ["ledger"],
    }),
    SingleLedger: build.query({
      query: (id) => ({
        url: `${BaseUrl}/${Number(id)}`,
        method: "GET",
      }),
    }),
    deleteLedger: build.mutation({
      query: (id) => ({
        url: `${BaseUrl}/${Number(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ledger","transaction"],
    }),
  }),
});

export const { useCreateLedgerMutation, useLedgerListQuery, useSingleLedgerQuery,useUpdateLedgerMutation,useDeleteLedgerMutation } = ledgerApi;
