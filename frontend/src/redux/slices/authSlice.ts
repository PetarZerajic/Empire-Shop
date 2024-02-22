import { createSlice } from "@reduxjs/toolkit";
import { IUsers } from "../../interfaces/IUsers";

interface IAuthSlice {
  userInfo: IUsers | null;
}
const initialState: IAuthSlice = {
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
