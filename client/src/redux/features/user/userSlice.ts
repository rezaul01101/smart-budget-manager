import { createSlice } from "@reduxjs/toolkit";
interface UserStateType {
  userInfo: {
    id?: number;
    name?: string;
    email?: string;
    avatar?: string;
    lat?: string;
    exp?: string;
  };
}
const initialState: UserStateType = {
  userInfo: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
