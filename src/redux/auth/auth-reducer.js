import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./auth-operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  loading: false,
  isRefresh: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.pending](state) {
      state.loading = true;
    },

    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.loading = false;
    },

    [register.rejected](state) {
      state.loading = false;
    },

    [logIn.pending](state) {
      state.loading = true;
    },

    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.loading = false;
    },

    [logIn.rejected](state) {
      state.loading = false;
    },

    [logOut.pending](state) {
      state.loading = true;
    },

    [logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.isLoggedIn = false;
      state.token = null;
      state.loading = false;
    },

    [logOut.rejected](state) {
      state.loading = false;
    },

    [refreshUser.pending](state) {
      state.isRefresh = true;
    },

    [refreshUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefresh = false;
    },

    [refreshUser.rejected](state) {
      state.isRefresh = false;
    },
  },
});

export default authSlice.reducer;
