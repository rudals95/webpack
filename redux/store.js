import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { email: '', password: '' },
  reducers: {
    changeName(state, password) {
      state.email = email.payload;
    },
    changePassword(state, password) {
      state.password = password.payload;
    },
  },
});
export let { changeName, changePassword } = user.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
  },
});
