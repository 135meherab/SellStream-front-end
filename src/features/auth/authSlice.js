// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('auth') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      state.token = action.payload.token;
    },
    userLoggedOut(state) {
      state.token = null;
    }
  }
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
