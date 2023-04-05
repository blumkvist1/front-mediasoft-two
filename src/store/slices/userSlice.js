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
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.isAuth = false;
      state.user = null;
      state.userInfo = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser, removeUser, setUserInfo } = userSlice.actions;

export default userSlice;
