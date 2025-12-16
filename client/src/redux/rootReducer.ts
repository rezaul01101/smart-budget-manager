import { baseApi } from "./api/baseApi";
import userSlice from "./features/user/userSlice";
import authSlice from "./features/authSlice";


export const reducer = {
   auth: authSlice,
   user: userSlice,
   [baseApi.reducerPath]: baseApi.reducer,
}
