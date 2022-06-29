import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

import axios from "network/axiosConfig";
import { _setCookie } from "utils/cookies";
import { IProfile } from "type/interface";

// export const updateInfo = createAction("profile/updateInfo");

export const postProfile = createAsyncThunk(
  "profile",
  async (body: IProfile, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/profile", body);
      // _setCookie("accessToken", response.data.accessToken, EXPIRED_DAYS);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
