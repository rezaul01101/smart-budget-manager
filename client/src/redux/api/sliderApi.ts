
import { baseApi } from "./baseApi"
const url = "/slider";


export const sliderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sliderList: build.query({
      query: () => ({
        url: `${url}/list`,
        method: "GET",
      }),
    }),
  }),
  
})

export const { useSliderListQuery} = sliderApi