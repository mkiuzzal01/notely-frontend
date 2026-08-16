import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type TUser = {
  id: string;
  role?: string;
  iat?: number;
  exp?: number;
  email?: string;
  name?: string;
  [key: string]: unknown;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUser: (state, action: PayloadAction<Partial<TUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, updateUser, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;