// import { axiosBaseQuery } from '@/src/helpers/axios/axiosBaseQuery'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getAccessToken } from "../../utils/token";
import { getAPIBaseUrl } from "../../helpers/config/envConfig";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getAPIBaseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["user",'ledger','transaction'],
});
