// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  // other state properties if any
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      state.token = action.payload.token;
      // update other state properties if needed
    },
    userLoggedOut(state) {
      state.token = null;
      // reset other state properties if needed
    }
  }
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
