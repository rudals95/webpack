import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  userReducer: userSlice.reducer,
});

export const store = configureStore({ reducer: rootReducer });
