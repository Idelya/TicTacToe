import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../types/types";
import { fetchUser, loginUser, logoutUser, registerUser } from "./userActions";

type State = {
  loading: boolean;
  userInfo: UserData | null;
  userToken: null | string;
  error: null | string;
  success: boolean;
};

const initialState: State = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.success = true;
      state.userInfo = payload.userInfo;
      state.userToken = payload.userToken;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = "Error";
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.success = true;
      state.userInfo = payload.userInfo;
      state.userToken = payload.userToken;
    });
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = "Error";
    });
    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = "Error";
    });
    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = null;
      state.userToken = null;
    });
    builder.addCase(logoutUser.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      state.userInfo = null;
      state.error = "Error";
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload.userInfo;
    });
    builder.addCase(fetchUser.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
  },
});
export default userSlice.reducer;
