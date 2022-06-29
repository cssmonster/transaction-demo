import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "network/axiosConfig";
import { _setCookie } from "utils/cookies";

const EXPIRED_DAYS = 30;

interface ILoginData {
  password: string;
}
export const postLogin = createAsyncThunk(
  "login",
  async (body: ILoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/login", body);
      _setCookie("accessToken", response.data.accessToken, EXPIRED_DAYS);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
