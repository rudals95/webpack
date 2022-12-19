import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    _id: '',
    username: '',
    email: '',
    role: '',
    accessToken: '',
    refreshToken: '',
    isLogin: false,
  },
};
const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: () => {},
});
export default userSlice;
export const { setLogin } = userSlice.actions;
