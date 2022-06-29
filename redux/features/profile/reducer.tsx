import { createReducer } from "@reduxjs/toolkit";
// import { postProfile, updateInfo } from "./actions";
import { postProfile } from "./actions";

export type ProfileState = {
  data: any;
  pending: boolean;
  error: boolean;
  errorMessage: string;
};

type ErrorMessageType = {
  message: string;
};

const initialState: ProfileState = {
  data: null,
  pending: false,
  error: false,
  errorMessage: "",
};

export const profileReducer = createReducer(initialState, (builder) => {
  builder
    // .addCase(updateInfo, (state, { payload }) => {
    //   state.pending = false;
    //   state.errorMessage = "";
    //   state.error = false;
    //   state.data = payload;
    // })
    .addCase(postProfile.pending, (state) => {
      state.pending = true;
    })
    .addCase(postProfile.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = payload;
      state.error = false;
      state.errorMessage = "";
    })
    .addCase(postProfile.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = (payload as ErrorMessageType).message;
    });
});

export default profileReducer;
