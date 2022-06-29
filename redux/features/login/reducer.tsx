import { createReducer } from "@reduxjs/toolkit";
import { postLogin } from "./actions";

export type LoginState = {
  data: any;
  pending: boolean;
  error: boolean;
  errorMessage: string;
};

type ErrorMessageType = {
  message: string;
};

const initialState: LoginState = {
  data: null,
  pending: false,
  error: false,
  errorMessage: "",
};

export const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(postLogin.pending, (state) => {
      state.pending = true;
    })
    .addCase(postLogin.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = payload;
      state.error = false;
      state.errorMessage = "";
    })
    .addCase(postLogin.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = (payload as ErrorMessageType).message;
    });
});

export default loginReducer;
