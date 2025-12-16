
import { baseApi } from "./baseApi"
const userUrl = "/user";


export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userUpdate: build.mutation({
        query: (userData) => (
          {
            url:`${userUrl}/update`,
            method: "POST",
            data: userData
        }
      )
    }),
    user: build.query({
      query: () => ({
        url: `${userUrl}`,
        method: "GET",
      }),
    }),
  }),
  
})

export const { useUserUpdateMutation,useUserQuery } = userApi