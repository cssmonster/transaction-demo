import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const selectProfileData = (state: RootState) => state.profileData;

export const profileSelector = createSelector(
  selectProfileData,
  (state) => state
);
