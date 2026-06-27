import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'staff';
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectLoading = (state: { user: UserState }) => state.user.loading;
export const selectError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;