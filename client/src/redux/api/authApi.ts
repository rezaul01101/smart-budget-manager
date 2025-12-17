import { storeAccessToken } from "../../utils/token";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["user"],
    }),
    refreshToken: build.mutation({
      query: () => ({
        url: `${AUTH_URL}/refresh-token`,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        storeAccessToken(data.data.accessToken);
      },
    }),
  }),
});

export const { useUserLoginMutation,useRefreshTokenMutation } = authApi;
