
import { baseApi } from "./baseApi"
const url = "/product";


export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    productCreate: build.mutation({
        query: (data) => (
          {
            url:`${url}/create`,
            method: "POST",
            data,
            contentType: "multipart/form-data"
        }
      )
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
  
})

export const { useProductCreateMutation, useProductListQuery,useProductDeleteMutation,useProductDetailsQuery} = productApi