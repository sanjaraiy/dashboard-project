import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  status: string; // 'active' or 'inactive'
  region: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  currentPage: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  currentPage: 1,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setUsers, setLoading, setPage } = userSlice.actions;
export default userSlice.reducer;
