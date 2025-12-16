
import { baseApi } from "./baseApi"
const CategoryUrl = "/category";


export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    categoryCreate: build.mutation({
        query: (categoryData) => (
          {
            url:`${CategoryUrl}/create`,
            method: "POST",
            data: categoryData
        }
      )
    }),
    categoryList: build.query({
      query: () => ({
        url: `${CategoryUrl}/list`,
        method: "GET",
      }),
    }),
    categoryDelete: build.mutation({
      query: (id) => ({
        url: `${CategoryUrl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  
})

export const { useCategoryCreateMutation,useCategoryListQuery,useCategoryDeleteMutation} = categoryApi