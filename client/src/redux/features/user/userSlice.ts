import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo:{},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeUserInfo } = userSlice.actions;

export default userSlice.reducer;