import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const selectLoginData = (state: RootState) => state.loginData;

export const locaginSelector = createSelector(
  selectLoginData,
  (state) => state
);
