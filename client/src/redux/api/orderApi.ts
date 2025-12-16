import { baseApi } from "./baseApi";
const url = "/order";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    orderCreate: build.mutation({
      query: (data) => ({
        url: `${url}/create`,
        method: "POST",
        data,
      }),
    }),
    productList: build.query({
      query: () => ({
        url: `${url}/list`,
        method: "GET",
      }),
    }),
    productDetails: build.query({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "GET",
      }),
    }),
    productDelete: build.mutation({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useOrderCreateMutation,
  useProductListQuery,
  useProductDeleteMutation,
  useProductDetailsQuery,
} = orderApi;
