import { baseApi } from "./api/baseApi";
import productSlice from "./features/product/productSlice";
import userSlice from "./features/user/userSlice";


export const reducer = {
   [baseApi.reducerPath]: baseApi.reducer,
   user: userSlice,
   product:productSlice
}
