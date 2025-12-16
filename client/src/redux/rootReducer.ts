import { baseApi } from "./api/baseApi";
import userSlice from "./features/user/userSlice";


export const reducer = {
   [baseApi.reducerPath]: baseApi.reducer,
   user: userSlice
}
