import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "../../const";
import { UserAuthData } from "../../types/types";

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, password }: UserAuthData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // make request to backend
      const response = await axios.post(
        BACKEND_API + "api/register/",
        { username, password },
        config
      );

      return {
        userInfo: (response?.data as any).user,
        userToken: (response?.data as any).token,
      };
    } catch (error: any) {
      if (error?.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        BACKEND_API + "api/login/",
        credentials,
        config
      );

      const user = await axios.get(BACKEND_API + "api/user/", {
        headers: {
          Authorization: "Token " + (response?.data as any).token,
        },
      });

      return {
        userInfo: user?.data as any,
        userToken: (response?.data as any).token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post(BACKEND_API + "api/logout/");
      return {
        userInfo: null,
        userToken: null,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const fetchUser = createAsyncThunk("auth/user", async (_, thunkAPI) => {
  try {
    const response = await axios.get(BACKEND_API + "api/user");
    console.log(response);
    return {
      userInfo: response.data,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: (error as Error).message });
  }
});
