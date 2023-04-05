import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {},
  userInfo: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.userInfo = action.payload.userInfo;
    },
    removeUser: (state) => {
      state.isAuth = false;
      state.user = null;
      state.userInfo = null;
    },
  },
});

export const { setUser, removeUsert } = userSlice.actions;

export default userSlice.reducer;
