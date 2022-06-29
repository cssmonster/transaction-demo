import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { loginReducer } from "./features/login/reducer";
import { profileReducer } from "./features/profile/reducer";

export const store = configureStore({
  reducer: {
    loginData: loginReducer,
    profileData: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
